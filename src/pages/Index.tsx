import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProofBar from "@/components/ProofBar";
import ToolsMarquee from "@/components/ToolsMarquee";
import Work from "@/components/Work";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <ProofBar />
        <ToolsMarquee />
        <Work />
        <Process />
        <About />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
