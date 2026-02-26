import { Linkedin, Mail, ArrowUp } from "lucide-react";

const Contact = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section id="contact" className="bg-foreground">
        {/* Top section */}
        <div className="px-6 max-w-site mx-auto pt-16 pb-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div>
              <h3 className="text-[24px] font-bold text-primary-foreground mb-2">Deepak Maan</h3>
              <p className="text-[14px] text-primary-foreground/40">Product Designer — Available for new opportunities</p>
            </div>
            {/* Right */}
            <div>
              <p className="text-[18px] font-bold text-primary-foreground mb-3">Have a project in mind?</p>
              <a
                href="mailto:deepak@email.com"
                className="text-[24px] text-primary-foreground hover:underline underline-offset-4 transition-all block mb-5"
              >
                deepak@email.com
              </a>
              <div className="flex items-center gap-4">
                <a href="#" aria-label="LinkedIn" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:deepak@email.com" aria-label="Email" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="px-6 max-w-site mx-auto">
          <div className="border-t" style={{ borderColor: "#1F1F1F" }} />
        </div>

        {/* Bottom bar */}
        <div className="px-6 max-w-site mx-auto py-5 flex items-center justify-between">
          <span className="text-[12px]" style={{ color: "#555555" }}>
            Designed & built by Deepak Maan · 2025
          </span>
          <button
            onClick={scrollToTop}
            className="text-[13px] text-primary-foreground/40 hover:text-primary-foreground transition-colors flex items-center gap-1"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </section>
    </>
  );
};

export default Contact;
