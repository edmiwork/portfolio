import { Nav } from "@/components/Nav";
import { CosmicSpectrum } from "@/components/ui/cosmos-spectrum";
import { Logos } from "@/components/Logos";
import { ClientLogos } from "@/components/ClientLogos";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* 🔒 HEADER LOCKED — finalized, do not modify without explicit request */}
        <CosmicSpectrum
          color="original"
          blur
          title={site.name}
          subtitle="Visual Designer"
          titleClassName="font-foun uppercase tracking-[0.04em] leading-[0.9] text-[clamp(2.2rem,8vw,6rem)]"
        />

        {/* Opaque, higher-stacked wrapper scrolls over the hero's fixed layers.
            On mobile, pull it up so content appears soon after the spectrum
            finishes revealing (removes a near-full screen of dead black). */}
        <div className="relative z-30 bg-[var(--bg)] max-md:-mt-[35svh]">
          <About />
          <Logos />
          <ClientLogos />
          <Projects />
          <Services />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
