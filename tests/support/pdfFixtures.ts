import zlib from 'node:zlib';
import { pdfFromText } from '@academy/lib/resumePdf';

/**
 * PDFs to feed the résumé uploader.
 *
 * The interesting one is `imageOnlyPdf`: a page that carries a picture and no
 * text layer, which is what a scanner produces and what the site's own
 * rasterising fallback produced before it learnt to embed a font. Such a file
 * looks like a résumé to a human and is empty to every machine that reads one,
 * so the uploader has to tell its reader that specifically.
 *
 * It is assembled here byte by byte rather than with jsPDF. jsPDF is a
 * dependency of the academy, not of this package, and the image path would drag
 * in a PNG encoder as well; a fixture that needs nothing but the standard
 * library cannot be broken by either.
 */

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** The single-page A4 the builders lay out to, in PDF points. */
const PAGE_WIDTH_PT = 595;
const PAGE_HEIGHT_PT = 842;

/** A greyish square, so a rendered fixture looks like a scan rather than a bug. */
const IMAGE_RGB: readonly [number, number, number] = [210, 210, 210];
const IMAGE_SIZE_PX = 8;

/**
 * A PDF object, as `buildPdf` wants it: everything after `N 0 obj` and before
 * `endobj`, including the stream when there is one.
 */
type PdfObject = string | { dict: string; stream: Buffer };

/** Serialises objects into a PDF with a cross-reference table that points at them. */
function buildPdf(objects: readonly PdfObject[]): Buffer {
  const header = Buffer.from('%PDF-1.4\n');
  const chunks: Buffer[] = [header];
  const offsets: number[] = [];
  let offset = header.length;

  objects.forEach((object, index) => {
    offsets.push(offset);
    const body =
      typeof object === 'string'
        ? Buffer.from(`${index + 1} 0 obj\n${object}\nendobj\n`)
        : Buffer.concat([
            Buffer.from(`${index + 1} 0 obj\n${object.dict}\nstream\n`),
            object.stream,
            Buffer.from('\nendstream\nendobj\n'),
          ]);
    chunks.push(body);
    offset += body.length;
  });

  // Entry zero is the head of the free list, and every offset is written as the
  // fixed 20-byte record the format requires.
  const xref = [
    `xref\n0 ${objects.length + 1}\n`,
    '0000000000 65535 f \n',
    ...offsets.map(at => `${String(at).padStart(10, '0')} 00000 n \n`),
  ].join('');
  chunks.push(
    Buffer.from(
      `${xref}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF\n`,
    ),
  );
  return Buffer.concat(chunks);
}

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

const crc32 = (bytes: Buffer): number => {
  let c = 0xffffffff;
  for (const byte of bytes) c = CRC_TABLE[(c ^ byte) & 0xff]! ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

function pngChunk(type: string, data: Buffer): Buffer {
  const tag = Buffer.from(type, 'ascii');
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([tag, data])));
  return Buffer.concat([length, tag, data, crc]);
}

/** A solid-colour 8-bit RGB PNG. */
function solidPng(size: number, [r, g, b]: readonly [number, number, number]): Buffer {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8; // bit depth
  header[9] = 2; // colour type: truecolour

  // Each scanline is prefixed with its filter type, and 0 means "stored as is".
  const stride = 1 + size * 3;
  const raw = Buffer.alloc(size * stride);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const at = y * stride + 1 + x * 3;
      raw[at] = r;
      raw[at + 1] = g;
      raw[at + 2] = b;
    }
  }

  return Buffer.concat([
    PNG_SIGNATURE,
    pngChunk('IHDR', header),
    pngChunk('IDAT', zlib.deflateSync(raw)),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

/**
 * A résumé that is a picture of a résumé: one page, one full-bleed image, no
 * text operators anywhere, so a text extractor comes back with nothing.
 *
 * The image is embedded as a PNG rather than as raw samples so that the file
 * exercises the same decode path as one that came out of a scanner.
 */
export function imageOnlyPdf(): Buffer {
  const png = solidPng(IMAGE_SIZE_PX, IMAGE_RGB);
  // `cm` scales the unit square the image is drawn into up to the whole page.
  const content = Buffer.from(`q ${PAGE_WIDTH_PT} 0 0 ${PAGE_HEIGHT_PT} 0 0 cm /Im0 Do Q`);
  return buildPdf([
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R ' +
      `/MediaBox [0 0 ${PAGE_WIDTH_PT} ${PAGE_HEIGHT_PT}] ` +
      '/Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>',
    { dict: `<< /Length ${content.length} >>`, stream: content },
    {
      dict:
        '<< /Type /XObject /Subtype /Image ' +
        `/Width ${IMAGE_SIZE_PX} /Height ${IMAGE_SIZE_PX} ` +
        '/ColorSpace /DeviceRGB /BitsPerComponent 8 ' +
        `/Filter /FlateDecode /DecodeParms << /Predictor 15 /Colors 3 /BitsPerComponent 8 /Columns ${IMAGE_SIZE_PX} >> ` +
        `/Length ${png.length} >>`,
      // The PNG's IDAT payload is a zlib stream of predictor-filtered rows,
      // which is exactly what /FlateDecode with /Predictor 15 expects, so the
      // pixels can be handed over without transcoding.
      stream: extractPngPixels(png),
    },
  ]);
}

/** The zlib-compressed pixel data of a PNG, concatenated across its IDAT chunks. */
function extractPngPixels(png: Buffer): Buffer {
  const parts: Buffer[] = [];
  let at = PNG_SIGNATURE.length;
  while (at < png.length) {
    const length = png.readUInt32BE(at);
    const type = png.toString('ascii', at + 4, at + 8);
    if (type === 'IDAT') parts.push(png.subarray(at + 8, at + 8 + length));
    at += 12 + length;
  }
  return Buffer.concat(parts);
}

/**
 * A résumé with a real text layer, built by the site's own exporter so the
 * fixture and the thing it stands in for cannot drift apart.
 */
export async function textPdf(text: string): Promise<Buffer> {
  const pdf = await pdfFromText(text);
  return Buffer.from(pdf.output('arraybuffer'));
}

/** Roughly how many of the exporter's lines fit on one page, rounded down. */
const LINES_PER_PAGE = 50;

/**
 * A text résumé long enough to run past `pages` pages, for exercising anything
 * that counts its way through a document. The exporter decides where the breaks
 * fall, so this only guarantees "at least", and callers should read the real
 * total out of the file rather than assume it.
 */
export function longResumeText(pages: number): string {
  return Array.from(
    { length: pages * LINES_PER_PAGE },
    (_, i) => `Automated the release regression suite for milestone ${i + 1}.`,
  ).join('\n');
}
