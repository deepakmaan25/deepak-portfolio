import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ToolsMarquee from "@/components/ToolsMarquee";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <ToolsMarquee />
        <CaseStudies />
        <About />
        <Testimonials />
        <Process />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
