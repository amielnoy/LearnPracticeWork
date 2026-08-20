/**
 * Turning improved résumé text into a PDF file.
 *
 * The text builders live in `resumePdf.ts`; what is here is the choice between
 * them and the rasterising fallback, which is separate because it is the only
 * one that renders a temporary DOM node to do its work.
 */
import { isRtlText, linkifyHtml } from './domUtils';
import { pdfFromText, pdfFromRtlText, type JsPdfInstance } from './resumePdf';

const HOLDER_WIDTH_PX = 794;

/**
 * Picks the builder for the text's direction. Hebrew goes through the embedded
 * font so the PDF carries selectable text an ATS can read; if that font cannot
 * be fetched we fall back to rasterising rather than emitting a PDF with no
 * Hebrew glyphs in it at all.
 */
export async function buildResumePdf(text: string): Promise<JsPdfInstance> {
  if (!isRtlText(text)) return await pdfFromText(text);
  try {
    return await pdfFromRtlText(text);
  } catch {
    return pdfFromCanvas(text);
  }
}

/** A filename that every desktop filesystem will accept. */
export function resumeFilename(role: string): string {
  return (
    ('Resume - ' + role)
      .replace(/[\\/:*?"<>|]+/g, '-')
      .trim()
      .slice(0, 80) + '.pdf'
  );
}

export async function pdfFromCanvas(text: string): Promise<JsPdfInstance> {
  const { default: html2canvas } = await import('html2canvas');
  const holder = document.createElement('div');
  holder.dir = 'rtl';
  holder.innerHTML = linkifyHtml(text);
  holder.style.cssText =
    `position:fixed;left:-9999px;top:0;width:${HOLDER_WIDTH_PX}px;background:#fff;color:#222;` +
    "padding:48px;font-family:'Segoe UI','Heebo',Arial,sans-serif;font-size:14px;line-height:1.6;" +
    'white-space:pre-wrap;word-wrap:break-word;';
  document.body.appendChild(holder);
  try {
    const holderRect = holder.getBoundingClientRect();
    const linkRects = [...holder.querySelectorAll('a')].map(a => {
      const r = a.getBoundingClientRect();
      return {
        href: a.getAttribute('href'),
        x: r.left - holderRect.left,
        y: r.top - holderRect.top,
        w: r.width,
        h: r.height,
      };
    });
    const canvas = await html2canvas(holder, { scale: 2, backgroundColor: '#ffffff' });
    const pdf = await pdfFromText('');
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgH = (canvas.height * pageW) / canvas.width;
    const imgData = canvas.toDataURL('image/png');
    let heightLeft = imgH,
      position = 0,
      pageCount = 1;
    pdf.addImage(imgData, 'PNG', 0, position, pageW, imgH);
    heightLeft -= pageH;
    while (heightLeft > 0) {
      position -= pageH;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pageW, imgH);
      heightLeft -= pageH;
      pageCount++;
    }
    const mmPerPx = pageW / HOLDER_WIDTH_PX;
    for (const l of linkRects) {
      const yAbs = l.y * mmPerPx;
      const page = Math.min(pageCount - 1, Math.floor(yAbs / pageH));
      pdf.setPage(page + 1);
      pdf.link(l.x * mmPerPx, yAbs - page * pageH, l.w * mmPerPx, l.h * mmPerPx, { url: l.href });
    }
    return pdf;
  } finally {
    holder.remove();
  }
}
