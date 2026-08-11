import { clearSessionCookie } from '../_lib/auth';
import type { ApiRequest, ApiResponse } from '../_lib/http';
import { adminHeaders } from '../_lib/http';

export default async function handler(request: ApiRequest, response: ApiResponse) {
  adminHeaders(response);
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, message: 'طريقة الطلب غير مدعومة.' });
  }
  clearSessionCookie(request, response);
  return response.status(200).json({ success: true });
}
