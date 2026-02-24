import { motion } from "framer-motion";

const tools = [
  "Figma", "ChatGPT", "Midjourney", "Photoshop", "Illustrator",
  "Procreate", "Framer", "Maze", "Notion", "FigJam",
  "Miro", "After Effects", "Claude",
];

const ToolsMarquee = () => {
  return (
    <section className="py-5 border-y border-border overflow-hidden">
      <div className="flex">
        <motion.div
          className="flex gap-8 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...tools, ...tools].map((tool, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="type-caption text-muted-foreground">
                {tool}
              </span>
              <span className="text-border text-[8px]">●</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
