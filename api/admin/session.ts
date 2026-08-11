import { authIsConfigured, hasValidSession } from '../_lib/auth';
import type { ApiRequest, ApiResponse } from '../_lib/http';
import { adminHeaders } from '../_lib/http';

export default async function handler(request: ApiRequest, response: ApiResponse) {
  adminHeaders(response);
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ success: false, message: 'طريقة الطلب غير مدعومة.' });
  }
  if (!authIsConfigured()) return response.status(503).json({ success: false, configured: false });
  return response.status(hasValidSession(request) ? 200 : 401).json({ success: hasValidSession(request), configured: true });
}
