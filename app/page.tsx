import HeroContent from "@/components/Hero/HeroContent";
import BackgroundHero from "@/components/Hero/BackgroundHero";
import Introduction from "@/components/Introduction/Introduction";
import Details from "@/components/Details/Details";
import Location from "@/components/Gallery/Gallery"; // Renamed component but file is still Gallery.tsx
import Countdown from "@/components/Countdown/Countdown";
import DressCode from "@/components/DressCode/DressCode";
import BackgroundMusic from "@/components/ui/BackgroundMusic";


// Thin gold section separator — visible between major sections
function GoldSeparator() {
  return (
    <div className="relative z-10 py-0 overflow-hidden">
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(212,175,55,0.15) 20%, rgba(212,175,55,0.35) 50%, rgba(212,175,55,0.15) 80%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Hero section */}
      <section className="relative h-screen w-full overflow-hidden">
        <BackgroundHero />
        <HeroContent />
      </section>

      {/* Negative margin to ensure seamless blend with hero gradient */}
      <div className="-mt-1 relative z-10">
        <Introduction />
      </div>

      <GoldSeparator />

      <DressCode />

      <GoldSeparator />

      <Location />

      <GoldSeparator />

      <Countdown />

      <GoldSeparator />

      <footer className="py-12 bg-background relative text-center text-wedding-ivory/40 text-sm tracking-widest uppercase flex flex-col items-center gap-6 overflow-hidden">
        {/* Ambient glow in footer */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
        <BackgroundMusic />
        <p className="relative z-10">&copy; 2026 <span className="font-arabic">محمد &amp; آية</span></p>
      </footer>
    </main>
  );
}
