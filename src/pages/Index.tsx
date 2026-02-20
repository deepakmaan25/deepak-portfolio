import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <CaseStudies />
        <About />
        <Process />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
