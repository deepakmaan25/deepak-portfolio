import Hero from "@/components/Hero";
import ProofBar from "@/components/ProofBar";
import ToolsMarquee from "@/components/ToolsMarquee";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import CreativeSide from "@/components/CreativeSide";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <ProofBar />
        <ToolsMarquee />
        <CaseStudies />
        <About />
        <CreativeSide />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
