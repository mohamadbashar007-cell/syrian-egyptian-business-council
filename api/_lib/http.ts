export interface ApiRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}

export interface ApiResponse {
  setHeader(name: string, value: string | string[]): void;
  status(code: number): ApiResponse;
  json(body: Record<string, unknown>): void;
  end?(): void;
}

function firstHeader(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function clientAddress(request: ApiRequest) {
  return request.socket?.remoteAddress || 'unknown';
}

export function hasTrustedOrigin(request: ApiRequest) {
  const fetchSite = firstHeader(request.headers['sec-fetch-site']);
  if (fetchSite && !['same-origin', 'none'].includes(fetchSite.toLowerCase())) return false;

  const origin = firstHeader(request.headers.origin);
  if (!origin) return true;

  const host = firstHeader(request.headers.host)?.toLowerCase();
  if (!host) return false;
  try {
    return new URL(origin).host.toLowerCase() === host;
  } catch {
    return false;
  }
}

export function requireTrustedOrigin(request: ApiRequest, response: ApiResponse) {
  if (hasTrustedOrigin(request)) return true;
  response.status(403).json({ success: false, message: 'تم رفض الطلب لأنه صادر من موقع غير موثوق.' });
  return false;
}

export function readJsonBody<T>(request: ApiRequest): T {
  if (typeof request.body === 'string') return JSON.parse(request.body) as T;
  return (request.body ?? {}) as T;
}

export function noStore(response: ApiResponse) {
  response.setHeader('Cache-Control', 'no-store, max-age=0');
  response.setHeader('X-Content-Type-Options', 'nosniff');
}

export function adminHeaders(response: ApiResponse) {
  noStore(response);
  response.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
}
