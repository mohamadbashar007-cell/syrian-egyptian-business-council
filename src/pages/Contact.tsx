import Layout from '../components/Layout';
import { AlertCircle, CheckCircle2, LoaderCircle, MapPin, Mail, Send, Facebook, Instagram, Linkedin } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { FormEvent, useState } from 'react';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitStatus === 'sending') return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setSubmitStatus('sending');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) throw new Error(result.message || 'تعذّر إرسال الرسالة.');

      setSubmitStatus('success');
      setStatusMessage(result.message || 'تم إرسال رسالتك بنجاح.');
      form.reset();
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'تعذّر إرسال الرسالة. يرجى المحاولة لاحقًا.');
    }
  };

  return (
    <Layout>
      <PageHero eyebrow="اتصل بنا" title="نستمع إلى فرصتك" description="فريق المجلس جاهز لاستقبال استفسارات المستثمرين وبناء مسار واضح للشراكات الجديدة." />

      <div className="container mx-auto px-4 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Form */}
           <Reveal direction="right" className="order-2 lg:order-1 lg:col-span-2">
              <div className="premium-card rounded-3xl bg-white p-6 md:p-9">
                 <h2 className="text-[24px] font-bold text-text-dark mb-8 border-r-4 border-green-primary pr-4">أرسل لنا استفسارك</h2>
                 <form className="relative space-y-6" onSubmit={handleSubmit}>
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                       <label htmlFor="website">الموقع الإلكتروني</label>
                       <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="flex flex-col gap-2">
                          <label className="text-[14px] font-bold text-text-dark">الاسم الكامل <span className="text-red-500">*</span></label>
                          <input name="name" type="text" minLength={2} maxLength={100} placeholder="أدخل اسمك هنا" className="rounded-xl border border-gray-200 bg-gray-bg p-3.5 text-[14px] outline-none transition-all focus:border-green-primary focus:bg-white focus:ring-4 focus:ring-green-primary/5" required />
                       </div>
                       <div className="flex flex-col gap-2">
                          <label className="text-[14px] font-bold text-text-dark">البريد الإلكتروني <span className="text-red-500">*</span></label>
                          <input name="email" type="email" maxLength={160} placeholder="example@mail.com" className="rounded-xl border border-gray-200 bg-gray-bg p-3.5 text-[14px] outline-none transition-all focus:border-green-primary focus:bg-white focus:ring-4 focus:ring-green-primary/5" required />
                       </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                       <label className="text-[14px] font-bold text-text-dark">الموضوع <span className="text-red-500">*</span></label>
                       <select name="subject" className="cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-bg p-3.5 text-[14px] outline-none transition-all focus:border-green-primary focus:bg-white focus:ring-4 focus:ring-green-primary/5" required>
                          <option>استفسار عام</option>
                          <option>فرصة استثمارية</option>
                          <option>طلب عضوية</option>
                          <option>شراكة استراتيجية</option>
                          <option>أخرى</option>
                       </select>
                    </div>

                    <div className="flex flex-col gap-2">
                       <label className="text-[14px] font-bold text-text-dark">الرسالة <span className="text-red-500">*</span></label>
                       <textarea name="message" rows={6} minLength={10} maxLength={5000} placeholder="اكتب تفاصيل استفسارك هنا..." className="resize-none rounded-xl border border-gray-200 bg-gray-bg p-3.5 text-[14px] outline-none transition-all focus:border-green-primary focus:bg-white focus:ring-4 focus:ring-green-primary/5" required></textarea>
                    </div>

                    {submitStatus !== 'idle' && submitStatus !== 'sending' && (
                       <div role="status" aria-live="polite" className={`flex items-center gap-3 rounded-xl border p-4 text-[13px] font-bold ${submitStatus === 'success' ? 'border-green-primary/20 bg-green-light text-green-primary' : 'border-red-200 bg-red-50 text-red-700'}`}>
                          {submitStatus === 'success' ? <CheckCircle2 size={19} /> : <AlertCircle size={19} />}
                          {statusMessage}
                       </div>
                    )}

                    <button type="submit" disabled={submitStatus === 'sending'} className="flex w-full items-center justify-center gap-3 rounded-full bg-green-primary px-10 py-4 text-[15px] font-extrabold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-green-dark disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 md:w-fit">
                       <span>{submitStatus === 'sending' ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}</span>
                       {submitStatus === 'sending' ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                 </form>
              </div>
           </Reveal>

           {/* Info Sidebar */}
           <Reveal direction="left" delay={0.1} className="order-1 space-y-6 lg:order-2 lg:col-span-1">
              <div className="rounded-3xl bg-green-dark p-8 text-white shadow-2xl islamic-pattern">
                 <h3 className="text-[20px] font-bold mb-8 border-b border-white/20 pb-4">بيانات التواصل المباشر</h3>
                 <div className="space-y-8">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                          <MapPin size={22} className="text-gold-custom" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[12px] opacity-60 mb-1">المكتب الرئيسي</span>
                          <span className="text-[15px] font-medium leading-relaxed">جمهورية مصر العربية، القاهرة <br /> مدينة السادس من أكتوبر - الحي المتميز</span>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                          <Mail size={22} className="text-gold-custom" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[12px] opacity-60 mb-1">البريد الإلكتروني</span>
                          <a href="mailto:info@segybc.com" dir="ltr" className="text-[16px] font-bold transition-colors hover:text-gold-custom">info@segybc.com</a>
                       </div>
                    </div>

                    <div className="border-t border-white/10 pt-7">
                       <span className="mb-4 block text-[12px] text-white/60">تابع المجلس على منصاته الرسمية</span>
                       <div className="flex gap-3">
                          <a href="https://www.facebook.com/profile.php?id=61589328063895" target="_blank" rel="noreferrer" aria-label="فيسبوك" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:-translate-y-1 hover:border-gold-custom hover:bg-gold-custom hover:text-green-dark">
                             <Facebook size={18} />
                          </a>
                          <a href="https://www.instagram.com/segybc/" target="_blank" rel="noreferrer" aria-label="إنستغرام" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:-translate-y-1 hover:border-gold-custom hover:bg-gold-custom hover:text-green-dark">
                             <Instagram size={18} />
                          </a>
                          <a href="https://www.linkedin.com/company/segybc" target="_blank" rel="noreferrer" aria-label="لينكدإن" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:-translate-y-1 hover:border-gold-custom hover:bg-gold-custom hover:text-green-dark">
                             <Linkedin size={18} />
                          </a>
                       </div>
                    </div>

                 </div>
              </div>
           </Reveal>
        </div>
      </div>
    </Layout>
  );
}
