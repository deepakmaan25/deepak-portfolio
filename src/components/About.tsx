import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-[120px] max-md:py-16">
      <div className="px-6 lg:px-8 max-w-site mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1fr_320px] gap-16 lg:gap-24 items-start"
        >
          {/* Left: Text */}
          <div>
            <p className="type-caption text-muted-foreground mb-3">About Me</p>
            <h2 className="type-h2 text-foreground mb-8">
              A designer who thinks in systems
            </h2>

            <div className="space-y-4 type-body text-muted-foreground max-w-xl">
              <p>
                I'm Deepak — a product designer who obsesses over the gap between how products work and how people actually experience them. I believe great design is 80% listening and 20% making.
              </p>
              <p>
                I'm currently open to junior product design roles and freelance collaborations.
              </p>
            </div>

            {/* Skills as inline text */}
            <p className="type-body text-foreground mt-8">
              Figma · FigJam · Maze · Notion · Miro · Framer · Principle
            </p>

            {/* CTA */}
            <a
              href="#"
              className="inline-flex items-center mt-8 px-6 h-12 border border-border text-foreground type-body font-medium rounded-md hover:bg-secondary transition-colors"
            >
              Download Résumé
            </a>
          </div>

          {/* Right: Photo placeholder */}
          <div className="w-full max-w-[320px] mx-auto lg:mx-0">
            <div className="aspect-square rounded-lg bg-secondary border border-border flex items-center justify-center">
              <span className="type-caption text-muted-foreground">Photo</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
