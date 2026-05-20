import Hero from "@/components/Hero";
import ProofBar from "@/components/ProofBar";
import ToolsMarquee from "@/components/ToolsMarquee";
import CaseStudies from "@/components/CaseStudies";
import Shipped from "@/components/Shipped";
import About from "@/components/About";
import CreativeSide from "@/components/CreativeSide";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main id="main-content">
        <Hero />
        <ProofBar />
        <ToolsMarquee />
        <CaseStudies />
        <Shipped />
        <About />
        <CreativeSide />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
