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
