import { motion } from "framer-motion";

const tools = [
  "Figma", "ChatGPT", "Midjourney", "Adobe Photoshop", "Illustrator", 
  "Procreate", "Framer", "Maze", "Notion", "FigJam",
  "Miro", "Principle", "After Effects", "Cursor", "Claude",
];

const ToolsMarquee = () => {
  return (
    <section className="py-6 border-y border-border overflow-hidden bg-charcoal">
      <div className="flex">
        <motion.div
          className="flex gap-8 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...tools, ...tools].map((tool, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-body text-sm font-medium tracking-wider uppercase text-cream/60">
                {tool}
              </span>
              <span className="text-terracotta/40 text-xs">◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
