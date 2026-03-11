import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { AboutPreview } from '@/components/home/AboutPreview';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { ImportOrigins } from '@/components/home/ImportOrigins';
import { StrengthsSection } from '@/components/home/StrengthsSection';
import { Testimonials } from '@/components/home/Testimonials';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutPreview />
      <CategoryGrid />
      <ImportOrigins />
      <StrengthsSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
