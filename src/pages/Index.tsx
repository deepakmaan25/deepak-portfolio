import Hero from "@/components/Hero";
import ProofBar from "@/components/ProofBar";
import ToolsMarquee from "@/components/ToolsMarquee";
import CaseStudies from "@/components/CaseStudies";
import CreativeSide from "@/components/CreativeSide";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <ProofBar />
        <ToolsMarquee />
        <CaseStudies />
        <CreativeSide />
        <About />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
