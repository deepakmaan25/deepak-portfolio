import { Linkedin, Mail } from "lucide-react";

const Contact = () => {
  return (
    <>
      <section id="contact" className="py-24 md:py-[96px] bg-foreground">
        <div className="px-6 max-w-site mx-auto text-center">
          <p className="type-label text-muted-foreground/60 mb-4">GET IN TOUCH</p>
          <h2 className="text-[36px] font-bold text-primary-foreground mb-4">
            Let's build something great together.
          </h2>
          <p className="text-[16px] text-primary-foreground/60 mb-10 max-w-lg mx-auto">
            Open to full-time roles, freelance projects, and design conversations.
          </p>
          <a href="mailto:deepak.maan@email.com" className="text-[16px] text-primary-foreground hover:underline underline-offset-4 transition-all">
            Send me an email →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground border-t border-primary-foreground/10 py-12">
        <div className="px-6 max-w-site mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-[14px] text-primary-foreground/70">Deepak Maan — Product Designer</span>
            <div className="flex items-center gap-6">
              {["Work", "About", "Process", "Contact"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-[13px] text-primary-foreground/40 hover:text-primary-foreground transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-primary-foreground/50">Available for new opportunities</span>
              <a href="#" aria-label="LinkedIn" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors"><Linkedin size={16} /></a>
              <a href="mailto:deepak.maan@email.com" aria-label="Email" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors"><Mail size={16} /></a>
            </div>
          </div>
          <div className="text-center mt-8">
            <span className="text-[12px] text-primary-foreground/30">Designed & built by Deepak Maan · 2025</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
