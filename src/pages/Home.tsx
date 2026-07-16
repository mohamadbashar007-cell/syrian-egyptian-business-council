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
      
      <div className="container mx-auto flex flex-col gap-12 px-4 py-14 md:px-10">
        <Services />
        <DecreeSection />
      </div>

      <MediaCenter />
      <AboutSection />
    </Layout>
  );
}
