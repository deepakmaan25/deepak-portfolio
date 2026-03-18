import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import ProofBar from "@/components/ProofBar";
import ToolsMarquee from "@/components/ToolsMarquee";
import CaseStudies from "@/components/CaseStudies";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <ProofBar />
        <ToolsMarquee />
        <CaseStudies />
        <Process />
        <About />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
