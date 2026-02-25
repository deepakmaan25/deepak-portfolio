import { motion } from "framer-motion";

const items = [
  "Maze", "Notion", "FigJam", "Miro", "After Effects",
  "Claude", "Figma", "ChatGPT", "Midjourney", "Photoshop",
];

const ToolsMarquee = () => {
  return (
    <section className="py-4 border-y border-border overflow-hidden bg-background">
      <div className="flex">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
