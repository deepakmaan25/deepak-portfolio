import { motion } from "framer-motion";

const items = [
  "User Research", "Wireframing", "Prototyping", "Figma",
  "Usability Testing", "Design Systems", "Information Architecture", "Interaction Design",
];

const ToolsMarquee = () => {
  return (
    <section className="py-4 border-y border-border overflow-hidden">
      <div className="flex">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="type-caption text-muted-foreground px-6">{item}</span>
              <span className="text-border text-[6px]">◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsMarquee;
