import { councilActivities } from './activities';

export type NewsCategory = 'أخبار المجلس' | 'فعاليات' | 'بيانات صحفية' | 'استثمار';

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: NewsCategory;
  summary: string;
  content?: string[];
  image: string;
  sourceUrl?: string;
  featured?: boolean;
}

const categoryMap: Record<string, NewsCategory> = {
  معارض: 'فعاليات',
  'زيارات رسمية': 'أخبار المجلس',
  اجتماعات: 'أخبار المجلس',
};

export const fallbackNews: NewsItem[] = [
  ...councilActivities.map((activity, index) => ({
    id: activity.id,
    title: activity.title,
    date: activity.date,
    category: categoryMap[activity.category],
    summary: activity.summary,
    content: activity.content,
    image: activity.image,
    sourceUrl: activity.sourceUrl,
    featured: index === 0,
  })),
  {
    id: 6,
    title: 'تشكيل مجلس الأعمال السوري المصري لتعزيز الشراكة الاقتصادية',
    date: '2026-05-03',
    category: 'بيانات صحفية',
    summary:
      'أصدر وزير الاقتصاد والصناعة الدكتور نضال الشعار القرار رقم 83 لعام 2026 بتشكيل مجلس الأعمال السوري المصري، بهدف توسيع التعاون الاقتصادي وفتح آفاق جديدة للتجارة والاستثمار بين البلدين.',
    content: [
      'أصدر وزير الاقتصاد والصناعة الدكتور نضال الشعار القرار رقم 83 لعام 2026 القاضي بتشكيل مجلس الأعمال السوري المصري، في خطوة تهدف إلى تطوير التعاون الاقتصادي بين سوريا ومصر.',
      'يعمل المجلس على تفعيل دور القطاع الخاص وبناء قنوات مباشرة بين رجال الأعمال في البلدين، بما يدعم التبادل التجاري ويوسع فرص الاستثمار ويسهم في تحقيق تكامل اقتصادي أكثر فاعلية.',
    ],
    image:
      'https://media.licdn.com/dms/image/v2/D4E22AQFpS4xInGeHHA/feedshare-image-high-res/B4EZ.9KRKGJYAU-/0/1785585013759?e=2147483647&v=beta&t=3D1X7T8I2cwY8ZN787K6sY9EYmHzQKynSMtZiVrhzL4',
    sourceUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7489286372009357313',
  },
];

export async function loadNews(): Promise<NewsItem[]> {
  try {
    const apiResponse = await fetch('/api/news', { cache: 'no-store' });
    if (apiResponse.ok) {
      const result = (await apiResponse.json()) as { news?: NewsItem[] };
      if (Array.isArray(result.news) && result.news.length > 0) {
        return result.news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
    }

    const response = await fetch(`${import.meta.env.BASE_URL}content/news.json`, { cache: 'no-store' });
    if (!response.ok) return fallbackNews;

    const news = (await response.json()) as NewsItem[];
    if (!Array.isArray(news) || news.length === 0) return fallbackNews;

    return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return fallbackNews;
  }
}
