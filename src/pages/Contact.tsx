import Layout from '../components/Layout';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function Contact() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-green-primary islamic-pattern py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-[36px] font-extrabold mb-4">تواصل معنا</h1>
          <div className="flex items-center justify-center gap-2 text-[14px] opacity-70">
            <span>الرئيسية</span>
            <span>/</span>
            <span className="text-gold-custom">اتصل بنا</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Form */}
           <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                 <h2 className="text-[24px] font-bold text-text-dark mb-8 border-r-4 border-green-primary pr-4">أرسل لنا استفسارك</h2>
                 <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="flex flex-col gap-2">
                          <label className="text-[14px] font-bold text-text-dark">الاسم الكامل <span className="text-red-500">*</span></label>
                          <input type="text" placeholder="أدخل اسمك هنا" className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-green-primary" required />
                       </div>
                       <div className="flex flex-col gap-2">
                          <label className="text-[14px] font-bold text-text-dark">البريد الإلكتروني <span className="text-red-500">*</span></label>
                          <input type="email" placeholder="example@mail.com" className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-green-primary" required />
                       </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                       <label className="text-[14px] font-bold text-text-dark">الموضوع <span className="text-red-500">*</span></label>
                       <select className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-green-primary appearance-none cursor-pointer">
                          <option>استفسار عام</option>
                          <option>فرصة استثمارية</option>
                          <option>طلب عضوية</option>
                          <option>شراكة استراتيجية</option>
                          <option>أخرى</option>
                       </select>
                    </div>

                    <div className="flex flex-col gap-2">
                       <label className="text-[14px] font-bold text-text-dark">الرسالة <span className="text-red-500">*</span></label>
                       <textarea rows={6} placeholder="اكتب تفاصيل استفسارك هنا..." className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-[14px] outline-none focus:border-green-primary resize-none" required></textarea>
                    </div>

                    <button className="bg-green-primary text-white px-10 py-4 rounded-xl text-[16px] font-bold hover:bg-green-dark transition-all flex items-center justify-center gap-3 shadow-lg w-full md:w-fit">
                       <span>إرسال الرسالة</span>
                       <Send size={18} />
                    </button>
                 </form>
              </div>
           </div>

           {/* Info Sidebar */}
           <div className="lg:col-span-1 order-1 lg:order-2 space-y-6">
              <div className="bg-green-primary islamic-pattern rounded-2xl p-8 text-white">
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
                          <Phone size={22} className="text-gold-custom" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[12px] opacity-60 mb-1">اتصل بنا (هاتف / واتساب)</span>
                          <span className="text-[16px] font-bold" dir="ltr">+20 123 456 7890</span>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                          <Mail size={22} className="text-gold-custom" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[12px] opacity-60 mb-1">البريد الإلكتروني</span>
                          <span className="text-[16px] font-bold">info@sebc-eg.com</span>
                       </div>
                    </div>

                    <div className="flex items-start gap-4 border-t border-white/10 pt-8">
                       <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                          <Clock size={22} className="text-gold-custom" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[12px] opacity-60 mb-1">ساعات العمل الرسمية</span>
                          <span className="text-[15px] font-medium">الأحد — الخميس <br /> 09:00 ص — 05:00 م</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-2xl h-[300px] flex items-center justify-center text-text-muted border border-gray-200 overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2666&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 grayscale" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center animate-pulse">
                    <MapPin size={48} className="text-green-primary mb-2" />
                    <span className="text-[14px] font-bold">خريطة الموقع التفاعلية</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
}
