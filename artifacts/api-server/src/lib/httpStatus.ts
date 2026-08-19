/**
 * Named HTTP status codes for every `res.status(...)` call in this server.
 * A magic number like `503` reads fine next to its message, but greps for
 * "where do we answer unauthorized" or "which routes ever 5xx" have nothing
 * to search for — this makes those codes greppable and self-documenting at
 * the call site (`HttpStatus.SERVICE_UNAVAILABLE` vs `503`).
 */
export class HttpStatus {
  static readonly OK = 200;
  static readonly BAD_REQUEST = 400;
  static readonly UNAUTHORIZED = 401;
  static readonly NOT_FOUND = 404;
  static readonly REQUEST_ENTITY_TOO_LARGE = 413;
  static readonly TOO_MANY_REQUESTS = 429;
  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly BAD_GATEWAY = 502;
  static readonly SERVICE_UNAVAILABLE = 503;
  static readonly GATEWAY_TIMEOUT = 504;

  private constructor() {
    // Static-only: this class is a namespace for constants, never instantiated.
  }
}
