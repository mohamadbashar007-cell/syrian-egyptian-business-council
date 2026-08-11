import type { ApiRequest, ApiResponse } from './_lib/http';
import { noStore } from './_lib/http';
import { loadStoredNews } from './_lib/news-store';

export default async function handler(request: ApiRequest, response: ApiResponse) {
  noStore(response);
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ success: false, message: 'طريقة الطلب غير مدعومة.' });
  }

  try {
    const news = await loadStoredNews();
    if (!news?.length) return response.status(404).json({ success: false, message: 'لا توجد أخبار مخزنة بعد.' });
    return response.status(200).json({ success: true, news });
  } catch {
    return response.status(503).json({ success: false, message: 'تعذّر تحميل الأخبار المحدثة.' });
  }
}
