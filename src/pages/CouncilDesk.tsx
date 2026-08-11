import {
  AlertCircle,
  CheckCircle2,
  Edit3,
  Eye,
  ImagePlus,
  LoaderCircle,
  LogOut,
  Newspaper,
  Plus,
  Save,
  ShieldCheck,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import { ChangeEvent, FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import BrandMark from '../components/BrandMark';
import { fallbackNews, loadNews, NewsCategory, NewsItem } from '../data/news';

type Screen = 'checking' | 'login' | 'ready';
type Notice = { type: 'success' | 'error'; text: string } | null;

interface Draft {
  id?: number;
  title: string;
  date: string;
  category: NewsCategory;
  summary: string;
  content: string;
  image: string;
  sourceUrl: string;
  featured: boolean;
}

const categories: NewsCategory[] = ['أخبار المجلس', 'فعاليات', 'بيانات صحفية', 'استثمار'];
const fieldClass = 'w-full rounded-xl border border-border-subtle bg-gray-bg px-4 py-3 text-[14px] text-text-dark outline-none transition focus:border-green-primary focus:bg-white focus:ring-4 focus:ring-green-primary/10';

function today() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function emptyDraft(): Draft {
  return {
    title: '',
    date: today(),
    category: 'أخبار المجلس',
    summary: '',
    content: '',
    image: '',
    sourceUrl: '',
    featured: false,
  };
}

function itemToDraft(item: NewsItem): Draft {
  return {
    ...item,
    content: (item.content || []).join('\n\n'),
    sourceUrl: item.sourceUrl || '',
    featured: Boolean(item.featured),
  };
}

async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { credentials: 'same-origin', ...options });
  let result: (T & { message?: string }) | null = null;
  try {
    result = (await response.json()) as T & { message?: string };
  } catch {
    // The friendly message below handles non-JSON hosting errors.
  }
  if (!response.ok) throw new Error(result?.message || 'تعذّر تنفيذ العملية.');
  return result as T;
}

function dataUrlFromBlob(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('تعذّر قراءة الصورة.'));
    reader.readAsDataURL(blob);
  });
}

async function prepareImage(file: File) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('اختر صورة JPG أو PNG أو WebP.');
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1800 / bitmap.width, 1200 / bitmap.height);
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('تعذّرت معالجة الصورة.');
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.86));
  if (!blob || blob.size > 3 * 1024 * 1024) throw new Error('الصورة كبيرة جداً. جرّب صورة أصغر.');
  return dataUrlFromBlob(blob);
}

export default function CouncilDesk() {
  const [screen, setScreen] = useState<Screen>('checking');
  const [password, setPassword] = useState('');
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [pendingImage, setPendingImage] = useState<{ data: string; filename: string } | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [busy, setBusy] = useState(false);
  const [imageBusy, setImageBusy] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobots = robots?.content;
    document.title = 'إدارة المركز الإعلامي';
    if (robots) robots.content = 'noindex,nofollow,noarchive';

    api<{ success: boolean }>('/api/admin/session')
      .then(async () => {
        setNews(await loadNews());
        setScreen('ready');
      })
      .catch(() => setScreen('login'));

    return () => {
      document.title = previousTitle;
      if (robots && previousRobots) robots.content = previousRobots;
    };
  }, []);

  const previewImage = pendingImage?.data || draft.image;
  const isEditing = draft.id !== undefined;
  const orderedNews = useMemo(
    () => [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [news],
  );

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      await api('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      setPassword('');
      setNews(await loadNews());
      setScreen('ready');
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'تعذّر تسجيل الدخول.' });
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    await api('/api/admin/logout', { method: 'POST' }).catch(() => undefined);
    setScreen('login');
    setDraft(emptyDraft());
    setNotice(null);
  };

  const chooseImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageBusy(true);
    setNotice(null);
    try {
      const data = await prepareImage(file);
      setPendingImage({ data, filename: file.name });
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'تعذّرت معالجة الصورة.' });
    } finally {
      setImageBusy(false);
      event.target.value = '';
    }
  };

  const persist = async (items: NewsItem[]) => {
    const result = await api<{ news: NewsItem[] }>('/api/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ news: items }),
    });
    setNews(result.news);
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (!previewImage) {
      setNotice({ type: 'error', text: 'اختر صورة للخبر أولاً.' });
      return;
    }

    setBusy(true);
    setNotice(null);
    try {
      let image = draft.image;
      if (pendingImage) {
        const uploaded = await api<{ url: string }>('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: pendingImage.data, filename: pendingImage.filename }),
        });
        image = uploaded.url;
      }

      const id = draft.id ?? Math.max(0, ...news.map((item) => item.id)) + 1;
      const item: NewsItem = {
        id,
        title: draft.title.trim(),
        date: draft.date,
        category: draft.category,
        summary: draft.summary.trim(),
        content: draft.content.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
        image,
        ...(draft.sourceUrl.trim() ? { sourceUrl: draft.sourceUrl.trim() } : {}),
        ...(draft.featured ? { featured: true } : {}),
      };
      const withoutCurrent = news.filter((entry) => entry.id !== id).map((entry) => (
        draft.featured && entry.featured ? { ...entry, featured: undefined } : entry
      ));
      await persist([item, ...withoutCurrent]);
      setDraft(emptyDraft());
      setPendingImage(null);
      setNotice({ type: 'success', text: isEditing ? 'تم تحديث الخبر وظهر على الموقع.' : 'تم نشر الخبر وظهر على الموقع.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'تعذّر حفظ الخبر.';
      setNotice({ type: 'error', text: message });
      if (message.includes('الجلسة')) setScreen('login');
    } finally {
      setBusy(false);
    }
  };

  const edit = (item: NewsItem) => {
    setDraft(itemToDraft(item));
    setPendingImage(null);
    setNotice(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (item: NewsItem) => {
    if (!window.confirm(`هل تريد حذف خبر «${item.title}» نهائياً من الموقع؟`)) return;
    setBusy(true);
    setNotice(null);
    try {
      await persist(news.filter((entry) => entry.id !== item.id));
      if (draft.id === item.id) setDraft(emptyDraft());
      setNotice({ type: 'success', text: 'تم حذف الخبر من الموقع.' });
    } catch (error) {
      setNotice({ type: 'error', text: error instanceof Error ? error.message : 'تعذّر حذف الخبر.' });
    } finally {
      setBusy(false);
    }
  };

  if (screen === 'checking') {
    return <div className="grid min-h-screen place-items-center bg-green-dark text-white"><LoaderCircle className="animate-spin text-gold-custom" size={32} /></div>;
  }

  if (screen === 'login') {
    return (
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-green-dark px-4 py-12 text-white islamic-pattern">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(197,162,83,.18),transparent_32rem),linear-gradient(135deg,rgba(7,60,43,.7),rgba(3,27,19,.96))]" />
        <form onSubmit={login} className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white p-7 text-text-dark shadow-2xl md:p-9">
          <div className="mb-7 flex items-center gap-4 border-b border-border-subtle pb-6">
            <BrandMark compact />
            <div><span className="text-[11px] font-extrabold text-gold-custom">دخول خاص</span><h1 className="text-[21px] font-black">إدارة المركز الإعلامي</h1></div>
          </div>
          <label htmlFor="admin-password" className="mb-2 block text-[13px] font-extrabold">كلمة المرور</label>
          <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={fieldClass} autoComplete="current-password" autoFocus required />
          {notice && <NoticeBox notice={notice} />}
          <button type="submit" disabled={busy} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-green-primary px-6 py-3.5 text-[14px] font-extrabold text-white transition hover:bg-green-dark disabled:opacity-60">
            {busy ? <LoaderCircle className="animate-spin" size={18} /> : <ShieldCheck size={18} />}{busy ? 'جارٍ التحقق...' : 'دخول آمن'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-bg">
      <header className="border-b border-white/10 bg-green-dark text-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4 md:px-10">
          <div className="flex items-center gap-3"><BrandMark compact /><div><span className="text-[10px] font-bold text-gold-custom">لوحة خاصة</span><h1 className="text-[16px] font-black md:text-[19px]">إدارة أخبار المجلس</h1></div></div>
          <button onClick={logout} className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[12px] font-bold transition hover:border-gold-custom hover:text-gold-custom"><LogOut size={16} /> خروج</button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 md:px-10 md:py-12">
        {notice && <div className="mb-6"><NoticeBox notice={notice} /></div>}
        <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_390px]">
          <section className="rounded-3xl border border-border-subtle bg-white p-5 shadow-[0_24px_60px_-42px_rgba(7,60,43,.55)] md:p-8">
            <div className="mb-7 flex items-start justify-between gap-4 border-b border-border-subtle pb-5">
              <div><span className="section-kicker">المركز الإعلامي</span><h2 className="mt-2 text-[24px] font-black">{isEditing ? 'تعديل الخبر' : 'إضافة خبر جديد'}</h2></div>
              {isEditing && <button onClick={() => { setDraft(emptyDraft()); setPendingImage(null); }} className="grid h-10 w-10 place-items-center rounded-full border border-border-subtle text-text-muted hover:border-red-200 hover:text-red-600" aria-label="إلغاء التعديل"><X size={18} /></button>}
            </div>

            <form onSubmit={save} className="space-y-5">
              <Field label="عنوان الخبر"><input className={fieldClass} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} maxLength={180} required /></Field>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="التاريخ"><input type="date" className={fieldClass} value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} required /></Field>
                <Field label="التصنيف"><select className={fieldClass} value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as NewsCategory })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></Field>
              </div>
              <Field label="الملخص القصير" hint="يظهر في بطاقة الخبر وفي مقدمة التفاصيل"><textarea className={`${fieldClass} resize-y`} rows={4} value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} minLength={10} maxLength={700} required /></Field>
              <Field label="تفاصيل الخبر" hint="افصل بين كل فقرة والتي تليها بسطر فارغ"><textarea className={`${fieldClass} resize-y`} rows={9} value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} maxLength={50_000} /></Field>

              <Field label="صورة الخبر" hint="تُضغط الصورة تلقائياً قبل الرفع للحفاظ على سرعة الموقع">
                <label className="group flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border-subtle bg-gray-bg text-center transition hover:border-green-primary hover:bg-green-light">
                  {previewImage ? <img src={previewImage} alt="معاينة صورة الخبر" className="h-56 w-full object-cover" /> : <><ImagePlus size={34} className="mb-3 text-green-primary" /><span className="text-[13px] font-extrabold">اضغط لاختيار الصورة</span><span className="mt-1 text-[11px] text-text-muted">JPG أو PNG أو WebP</span></>}
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={chooseImage} className="sr-only" />
                </label>
                {imageBusy && <span className="mt-2 flex items-center gap-2 text-[12px] font-bold text-green-primary"><LoaderCircle className="animate-spin" size={15} /> جارٍ تجهيز الصورة...</span>}
              </Field>

              <Field label="رابط منشور لينكدإن" hint="اختياري — يظهر كرابط للمصدر الرسمي"><input type="url" dir="ltr" className={fieldClass} value={draft.sourceUrl} onChange={(event) => setDraft({ ...draft, sourceUrl: event.target.value })} placeholder="https://www.linkedin.com/..." /></Field>
              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-gray-bg p-4">
                <span><b className="flex items-center gap-2 text-[14px]"><Star size={17} className="text-gold-custom" /> إظهار كخبر مميّز</b><small className="mt-1 block text-[11px] text-text-muted">سيظهر بأولوية في واجهة الصفحة الرئيسية</small></span>
                <input type="checkbox" checked={draft.featured} onChange={(event) => setDraft({ ...draft, featured: event.target.checked })} className="h-5 w-5 accent-green-primary" />
              </label>
              <button type="submit" disabled={busy || imageBusy} className="flex w-full items-center justify-center gap-2 rounded-full bg-green-primary px-7 py-4 text-[14px] font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-dark disabled:cursor-wait disabled:opacity-60">
                {busy ? <LoaderCircle className="animate-spin" size={18} /> : isEditing ? <Save size={18} /> : <Plus size={18} />}{busy ? 'جارٍ الحفظ والنشر...' : isEditing ? 'حفظ التعديلات' : 'نشر الخبر'}
              </button>
            </form>
          </section>

          <aside className="space-y-6 xl:sticky xl:top-6">
            <section className="overflow-hidden rounded-3xl border border-border-subtle bg-white shadow-[0_24px_60px_-42px_rgba(7,60,43,.55)]">
              <div className="flex items-center gap-2 border-b border-border-subtle px-5 py-4"><Eye size={17} className="text-green-primary" /><h2 className="text-[14px] font-black">معاينة البطاقة</h2></div>
              <div className="p-5"><div className="overflow-hidden rounded-2xl border border-border-subtle bg-white">
                <div className="aspect-[16/10] bg-gray-bg">{previewImage ? <img src={previewImage} alt="" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-text-muted"><Newspaper size={32} /></div>}</div>
                <div className="p-5"><div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-bold"><span className="text-gold-custom">{draft.category}</span><span className="text-text-muted">{draft.date}</span></div><h3 className="line-clamp-2 text-[16px] font-black leading-7">{draft.title || 'عنوان الخبر سيظهر هنا'}</h3><p className="mt-2 line-clamp-3 text-[12px] leading-6 text-text-muted">{draft.summary || 'ملخص الخبر سيظهر هنا بنفس شكل بطاقات الأخبار في الموقع.'}</p></div>
              </div></div>
            </section>
          </aside>
        </div>

        <section className="mt-8 rounded-3xl border border-border-subtle bg-white p-5 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4"><div><span className="section-kicker">المحتوى المنشور</span><h2 className="mt-2 text-[22px] font-black">الأخبار الحالية <span className="text-[14px] text-text-muted">({news.length})</span></h2></div><button onClick={() => { setDraft(emptyDraft()); setPendingImage(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 rounded-full bg-green-light px-4 py-2.5 text-[12px] font-extrabold text-green-primary"><Plus size={16} /> خبر جديد</button></div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {orderedNews.map((item) => <article key={item.id} className="overflow-hidden rounded-2xl border border-border-subtle bg-gray-bg"><div className="aspect-[16/9] overflow-hidden"><img src={item.image} alt="" className="h-full w-full object-cover" /></div><div className="p-4"><div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-bold"><span className="text-gold-custom">{item.category}</span><span className="text-text-muted">{item.date}</span></div><h3 className="line-clamp-2 min-h-14 text-[14px] font-black leading-7">{item.title}</h3>{item.featured && <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-gold-custom/15 px-2.5 py-1 text-[10px] font-extrabold text-[#8b6c24]"><Star size={11} /> مميّز</span>}<div className="mt-4 grid grid-cols-2 gap-2 border-t border-border-subtle pt-4"><button disabled={busy} onClick={() => edit(item)} className="flex items-center justify-center gap-2 rounded-full border border-green-primary px-3 py-2 text-[11px] font-extrabold text-green-primary hover:bg-green-primary hover:text-white"><Edit3 size={14} /> تعديل</button><button disabled={busy} onClick={() => remove(item)} className="flex items-center justify-center gap-2 rounded-full border border-red-200 px-3 py-2 text-[11px] font-extrabold text-red-600 hover:bg-red-600 hover:text-white"><Trash2 size={14} /> حذف</button></div></div></article>)}
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block text-[13px] font-extrabold">{label}</span>{children}{hint && <small className="mt-1.5 block text-[11px] leading-5 text-text-muted">{hint}</small>}</label>;
}

function NoticeBox({ notice }: { notice: Exclude<Notice, null> }) {
  return <div role="status" className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-[12px] font-bold leading-6 ${notice.type === 'success' ? 'border-green-primary/20 bg-green-light text-green-primary' : 'border-red-200 bg-red-50 text-red-700'}`}>{notice.type === 'success' ? <CheckCircle2 className="mt-0.5 shrink-0" size={18} /> : <AlertCircle className="mt-0.5 shrink-0" size={18} />}{notice.text}</div>;
}
