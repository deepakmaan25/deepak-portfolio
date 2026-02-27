import { Linkedin, Mail, ArrowUp } from "lucide-react";

const Contact = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" style={{ background: '#0C0C0F' }}>
      {/* Top section */}
      <div className="px-6 max-w-site mx-auto pt-16 pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <h3 className="text-[22px] font-bold text-white mb-1">Deepak Maan</h3>
            <p className="text-[14px] mb-4" style={{ color: '#666666' }}>Product Designer</p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="LinkedIn" className="transition-colors" style={{ color: '#666666' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>
                <Linkedin size={20} />
              </a>
              <a href="mailto:hello@deepakmaan.com" aria-label="Email" className="transition-colors" style={{ color: '#666666' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}>
                <Mail size={20} />
              </a>
            </div>
          </div>
          {/* Right */}
          <div className="md:text-right">
            <p className="text-[18px] font-bold text-white mb-3">Have a project in mind?</p>
            <a
              href="mailto:hello@deepakmaan.com"
              className="text-[20px] underline-offset-4 hover:underline transition-colors block mb-2"
              style={{ color: '#818CF8' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#818CF8'}
            >
              hello@deepakmaan.com
            </a>
            <p className="text-[13px]" style={{ color: '#666666' }}>Open to full-time & freelance</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="px-6 max-w-site mx-auto">
        <div style={{ borderTop: '1px solid #1A1A1A', margin: '0 0 20px' }} />
      </div>

      {/* Bottom bar */}
      <div className="px-6 max-w-site mx-auto pb-8 flex items-center justify-between">
        <span className="text-[12px]" style={{ color: '#444444' }}>
          Designed & built by Deepak Maan · 2025
        </span>
        <button
          onClick={scrollToTop}
          className="text-[12px] transition-colors flex items-center gap-1 cursor-pointer"
          style={{ color: '#444444' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#444444'}
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
};

export default Contact;
