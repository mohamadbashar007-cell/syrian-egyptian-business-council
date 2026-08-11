import { requireAdmin } from '../_lib/auth';
import type { ApiRequest, ApiResponse } from '../_lib/http';
import { adminHeaders, readJsonBody } from '../_lib/http';
import { saveStoredNews } from '../_lib/news-store';

interface SaveBody {
  news?: unknown;
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  adminHeaders(response);
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, message: 'طريقة الطلب غير مدعومة.' });
  }
  if (!requireAdmin(request, response)) return;

  try {
    const body = readJsonBody<SaveBody>(request);
    const news = await saveStoredNews(body.news);
    return response.status(200).json({ success: true, news });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'تعذّر حفظ الأخبار.';
    return response.status(400).json({ success: false, message });
  }
}
