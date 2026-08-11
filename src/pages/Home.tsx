import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Services from '../components/Services';
import DecreeSection from '../components/DecreeSection';
import MediaCenter from '../components/MediaCenter';
import AboutSection from '../components/AboutSection';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Services />
      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-green-light/70 blur-3xl" />
        <div className="container relative mx-auto px-4 md:px-10"><DecreeSection /></div>
      </section>
      <MediaCenter />
      <AboutSection />
    </Layout>
  );
}
