import { motion } from "framer-motion";

const items = [
  "Figma", "FigJam", "Maze", "Miro", "Notion",
  "After Effects", "Claude", "ChatGPT", "Midjourney",
  "Photoshop", "Illustrator",
];

const ToolsMarquee = () => {
  return (
    <section className="relative py-4 border-y border-border overflow-hidden bg-background">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, hsl(var(--background)), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, hsl(var(--background)), transparent)' }} />

      <div className="flex">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-[14px] text-muted-foreground px-6">{item}</span>
              <span className="text-muted-foreground/40 text-[6px]">●</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
