import HeroContent from "@/components/Hero/HeroContent";
import BackgroundHero from "@/components/Hero/BackgroundHero";
import Introduction from "@/components/Introduction/Introduction";
import Details from "@/components/Details/Details";
import Story from "@/components/Story/Story";
import Location from "@/components/Gallery/Gallery"; // Renamed component but file is still Gallery.tsx
import Countdown from "@/components/Countdown/Countdown";
import BackgroundMusic from "@/components/ui/BackgroundMusic";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <section className="relative h-screen w-full overflow-hidden">
        <BackgroundHero />
        <HeroContent />
      </section>

      {/* Negative margin to ensure seamless blend with hero gradient */}
      <div className="-mt-1 relative z-10">
        <Introduction />
      </div>

      <Story />
      <Location />
      <Countdown />

      <footer className="py-12 bg-wedding-navy text-center text-wedding-ivory/40 text-sm tracking-widest uppercase flex flex-col items-center gap-6">
        <BackgroundMusic />
        <p>&copy; 2026 <span className="font-great-victorian">Mohamed & Aya</span></p>
      </footer>
    </main>
  );
}
