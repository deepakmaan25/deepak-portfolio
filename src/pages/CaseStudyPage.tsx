import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useIsMobile } from '../hooks/useMediaQuery'

const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

// ─── Case study data ──────────────────────────────────────────────────────────
const CASE_STUDIES = {
  'tech-japan': {
    slug: 'tech-japan',
    category: 'Case study · UX Research',
    title: 'Tech Japan (Talendy)',
    subtitle: 'UX Research & Platform Redesign',
    description: 'Ran 10 user interviews across 6 IITs, documented 9 pain points, and shipped fixes to production.',
    tags: ['UX Research', 'Sep–Nov 2024 · 2 months', 'Web Platform', 'Figma · Google Forms'],
    status: 'SHIPPED',
    metrics: [
      { value: '80%', label: 'improved navigation' },
      { value: '70%', label: 'feature adoption in testing' },
      { value: '9',   label: 'pain points documented' },
    ],
    bg: 'hsl(222,100%,96%)',
    accentBg: '#E8F0FE',
    sections: [
      { id: 'tldr',        label: 'TL;DR' },
      { id: 'background',  label: 'Background' },
      { id: 'research',    label: 'Research' },
      { id: 'problems',    label: 'Problems found' },
      { id: 'solutions',   label: 'Solutions' },
      { id: 'outcome',     label: 'Outcome' },
    ],
    content: [
      {
        id: 'tldr',
        heading: 'TL;DR',
        body: `Tech Japan connects engineering students from IITs with Japanese companies. The platform had a real use case but the experience was letting it down — broken links, dark mode contrast failures, no way to manage multiple resumes, and post-application flow that moved entirely to WhatsApp.\n\nI spent two months researching these issues with 10 students, documented 9 distinct pain points, designed fixes for the most critical ones, and presented findings to the team. Several shipped to production during and after the internship.`,
        highlight: null,
        quote: null,
        image: null,
      },
      {
        id: 'background',
        heading: 'Background',
        body: `I was the sole researcher on this project. I recruited participants, ran the interviews, synthesized findings into something actionable, designed solutions in Figma, and presented to the team.\n\nIn parallel, I ran a rebranding survey as the company was transitioning from Tech Japan to Talendy, and designed a recruiter-side hiring dashboard as a parallel workstream.`,
        highlight: null,
        quote: {
          text: 'While clicking on a company\'s link, it takes you to a new page but you can\'t see any meaningful data — it shows an error every time. It leads to doubting the company\'s legitimacy.',
          attribution: 'IIT student, 4th year',
        },
        image: null,
      },
      {
        id: 'research',
        heading: 'Research approach',
        body: `I ran 1:1 interviews with 10 students from IIT Dhanbad, Roorkee, Guwahati, Delhi, Hyderabad, and Bombay — 8 final year, 2 pre-final year, all actively job hunting or recently placed.\n\nI chose IIT students because they're the platform's core users, and they've used enough polished products to notice when something feels off. I also collected 50+ survey responses alongside the interviews for the Talendy rebranding study, running both in parallel over two months.`,
        highlight: 'The most important signal wasn\'t what users said they wanted. It was the moment they stopped trusting the platform.',
        quote: {
          text: 'Once I apply, all communication happens on WhatsApp, which feels unprofessional. The flow kind of hinders.',
          attribution: 'IIT student, final year',
        },
        image: '/src/assets/case-study-1.jpg',
      },
      {
        id: 'problems',
        heading: 'Problems found',
        body: `Nine distinct pain points emerged across the platform. The most critical:\n\n**Dark mode contrast** — mentioned by 7 of 10 users. Text was unreadable on internship detail and company pages. It looked unfinished.\n\n**Broken company links** — mentioned by 6 users. For someone deciding whether to trust a company enough to apply, a 404 at that moment is fatal.\n\n**Job description layout** — mentioned by 4 users. A single unformatted block. Nobody could scan it.\n\n**WhatsApp handoff** — mentioned by 4 users. Post-application, everything moved to WhatsApp. Users flagged it as unprofessional and said the platform lost all visibility into what happened after someone applied.\n\n**Multiple resumes** — mentioned by 3 users. Students apply to design, dev, analytics, business. One resume slot doesn't work.`,
        highlight: null,
        quote: {
          text: 'I need to upload different resumes for different profiles. There\'s no way to do that here.',
          attribution: 'IIT student, pre-final year',
        },
        image: null,
      },
      {
        id: 'solutions',
        heading: 'Solutions designed',
        body: `**Job description layout** — Restructured from a single unformatted block into clearly labeled sections: role overview, requirements, company details, how to apply. Company links were also fixed to actually resolve.\n\n**Dark mode & accessibility** — Went through the platform in dark mode, identified contrast failures, and updated color values to meet WCAG 2.1 AA. One of the first fixes flagged for implementation.\n\n**Multiple resume management** — A resume library where users can upload and label multiple versions and choose the right one at the point of application.\n\n**Save All profile flow** — Single Save All action with unsaved-change indicators. Previously every section had to be saved separately — missing one meant losing that data.\n\n**Built-in communication tool** — In-platform messaging replacing the WhatsApp handoff. Status updates, document requests, direct messages with HRs, interview scheduling.`,
        highlight: 'The WhatsApp finding landed when I framed it as: you have zero visibility into what happens after someone applies.',
        quote: null,
        image: '/src/assets/case-study-1.jpg',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body: `After designing the solutions, I ran another round of testing with participants from the same pool.\n\n80% reported navigation felt easier, particularly around the job categorization and new layout. 70% actively used the resume management and communication features during the session without being prompted.\n\nSeveral fixes shipped to production during and after the internship — job description layout, dark mode fixes, Save All, and the communication tool.\n\nThe rebranding survey found 71% of respondents hadn't heard about the Tech Japan → Talendy rebrand at all. Almost all who had heard about it found out through peers, not official channels. That became a second set of recommendations around launch strategy.`,
        highlight: null,
        quote: null,
        image: null,
      },
    ],
  },

  'buzztro': {
    slug: 'buzztro',
    category: 'Case study · Product Design',
    title: 'Buzztro',
    subtitle: 'Collective Buying Platform',
    description: 'Designed the full buying experience for a collective buying platform where more buyers means a lower price.',
    tags: ['Product Design', '2024', 'Web (Desktop + Mobile)', 'Figma · Whimsical'],
    status: 'SHIPPED',
    metrics: [
      { value: '40+',   label: 'screens shipped' },
      { value: '5',     label: 'core flows' },
      { value: '8 wks', label: 'zero to production' },
    ],
    bg: 'hsl(22,100%,95%)',
    accentBg: '#FEF3E2',
    sections: [
      { id: 'tldr',      label: 'TL;DR' },
      { id: 'research',  label: 'Research' },
      { id: 'solutions', label: 'Solutions' },
      { id: 'outcome',   label: 'Outcome' },
    ],
    content: [
      {
        id: 'tldr',
        heading: 'TL;DR',
        body: `Buzztro's model is collective buying: shoppers pool demand so the price drops as more people commit. The mechanic is simple on paper. Making it feel trustworthy and rewarding rather than confusing or pressuring is the design problem.\n\nI designed the full buying experience around pool progress as the unifying metaphor. A single visual language that follows the user from product card through PDP, cart, checkout, and post-purchase. The price is a live consequence of how many people have joined.\n\nSolo designer on a 2-month contract, direct to founder. 40+ screens, 5 core flows, shipped to production in 8 weeks.`,
        highlight: null,
        quote: null,
        image: null,
      },
      {
        id: 'research',
        heading: 'Research',
        body: `Before opening Figma, I mapped how group-buying platforms handle the pool mechanic: Pinduoduo, Meesho, DealShare, and Groupon. Looking less at visual style and more at which moments they explained, which they hid, and where the experience broke down.\n\n**The price does not match the label.** Most platforms show a discounted price on the card, but that price is conditional. When users noticed this discrepancy at checkout, trust collapsed entirely. The fix had to happen upstream.\n\n**Pool status is buried.** How many people have joined? How many more are needed? These questions decide whether a user commits — and they were routinely hidden behind a tap or only shown after add-to-cart.\n\n**Post-purchase is an afterthought.** A pool either fills or it does not. For collective buying, waiting is the product — that's where the user lives for hours after payment. It needed its own design.`,
        highlight: "The design problem was not building an e-commerce app. It was making a conditional, community-driven pricing model feel trustworthy.",
        quote: {
          text: "The price is not a number on the card. It's a promise the platform can only keep if the community keeps it first.",
          attribution: 'Design principle, established in week 1',
        },
        image: null,
      },
      {
        id: 'solutions',
        heading: 'Solutions',
        body: `**The Product Card** — Pool progress sits beneath the product title, current price on one side, target discounted price on the other. 'X joined, Y more to unlock.' Cards became taller than standard. That is the right trade-off: if the progress indicator is not readable at a glance, the product is not Buzztro anymore.\n\n**Product Detail Page** — The circular gauge became the signature visual. One glance and the mechanic is understood without reading any copy. Below the fold: familiar e-commerce patterns. Novelty only where it earns its place.\n\n**Booking Checkout** — Paying today for something that ships only if the pool fills. Multi-step structure with persistent pool state visible throughout. CTA shifted from 'Pay now' to 'Pay and join the pool.'\n\n**Cart** — Per-item pool status, not a flat line-item list. Totals show two numbers: what you pay at current pool levels, and what you would pay if every pool fills.\n\n**Post-Purchase** — Live pool fill, countdown, and a share CTA. That share action is not a growth mechanic bolted on. It is the most useful thing a user can do in that moment. Two states fully designed: pool filled and pool failed.`,
        highlight: null,
        quote: null,
        image: '/src/assets/case-study-2.jpg',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body: `Buzztro launched and ran in production for several months. 40+ screens, 5 core flows shipped end-to-end in 8 weeks from a single designer working directly with the founder.\n\nThe biggest validation: the product worked. Users understood the pool mechanic without reading copy. The gauge did the explaining. The checkout flow held up. Post-purchase states handled the conditional nature without generating confusion.\n\nThe company eventually paused on funding — a market and timing reality, not a product one.`,
        highlight: null,
        quote: null,
        image: null,
      },
    ],
  },

  'zu-ai': {
    slug: 'zu-ai',
    category: 'Case study · Product Design',
    title: 'Zu-AI',
    subtitle: 'Chat Experience Redesign',
    description: 'Redesigned the AI chat experience for an AI tutoring app serving 100K+ students.',
    tags: ['Product Design', '2024', 'Mobile App (iOS/Android)', 'Figma · Microsoft Fluent 2'],
    status: 'SHIPPED',
    metrics: [
      { value: '40%',  label: 'faster scanning' },
      { value: '3x',   label: 'task completion' },
      { value: '50%',  label: 'less context-switching' },
    ],
    bg: 'hsl(260,60%,97%)',
    accentBg: '#F0EEFF',
    sections: [
      { id: 'tldr',      label: 'TL;DR' },
      { id: 'research',  label: 'Research' },
      { id: 'solutions', label: 'Solutions' },
      { id: 'outcome',   label: 'Outcome' },
    ],
    content: [
      {
        id: 'tldr',
        heading: 'TL;DR',
        body: `Zu-AI had 100K+ students using it as a learning tool. But the experience was not delivering — walls of unformatted text, no memory between sessions, no personalization, and no signal for when to trust what the AI said. Engagement was low. Sessions were getting abandoned.\n\nI redesigned the chat interface from the ground up in 2 weeks. Research with 33 participants (10 interviews, 23 survey responses). Hard constraint: could not touch the AI model. Every problem had to be solved at the interface layer.`,
        highlight: null,
        quote: null,
        image: null,
      },
      {
        id: 'research',
        heading: 'What I Found',
        body: `Started with 100+ app store reviews before any interviews — it gives signal to direct sessions toward real friction, not general impressions.\n\n**Information overload** — 60% of survey respondents. Responses arrived as long unbroken blocks of text with no headings, no visual hierarchy. Students were skimming and giving up.\n\n**No personalization** — 40% wanted the app to feel like it knew them. No memory between sessions. No dark mode, no text size controls, no way to adjust how the AI addressed you.\n\nSmaller issues that compounded: no visible encryption in settings, no disclaimer that the AI could be wrong, friction when switching subjects mid-session. Together they created an experience that felt untrustworthy and unfinished.`,
        highlight: "Information overload was the number one complaint — and none of it required changing the AI itself.",
        quote: {
          text: "I want to feel like I'm talking to a friend when I use it, but it feels too robotic.",
          attribution: 'Zu-AI user, survey response',
        },
        image: null,
      },
      {
        id: 'solutions',
        heading: 'Solutions',
        body: `**Chat Interface Redesign** — Restructured responses into digestible sections with clear headings and visual separators. Typography differentiates heading, body, and code blocks. Quick-action buttons added during testing after noticing users pausing between messages not because they were reading — but because they were figuring out what to ask next. They became the most-used feature.\n\n**ChatBot Dashboard** — Persistent conversation contexts, not temporary sessions. Visual cards per subject, quick-switch between threads, search for past explanations. Your study context should work the way your notes do.\n\n**Accessibility and Trust** — Dark/light mode, 4 text size presets, custom avatars, name personalization. And two trust features that almost did not make the cut: a visible encryption badge, and an inline disclaimer: 'AI can make mistakes — verify important information.' In testing, it was mentioned most positively. Designing for honesty, not perfection, is what makes a product feel safe.`,
        highlight: null,
        quote: null,
        image: '/src/assets/case-study-3.jpg',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body: `Testing with 5 users. The directional percentages are drawn from comparable apps and published usability research on structured versus unstructured text interfaces.\n\n40% faster information scanning. 3x improvement in task completion speed. 50% reduction in context-switching time during multi-topic study sessions.\n\nThe quick-action buttons were a last-minute addition and became the most-loved feature in testing. The disclaimer moment was the most unexpected: adding it almost as an afterthought, it became the thing users mentioned most positively.`,
        highlight: null,
        quote: {
          text: "Quick prompts are a game-changer. I don't have to think about what to ask next.",
          attribution: 'Zu-AI user, usability test',
        },
        image: null,
      },
    ],
  },

}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const cs = CASE_STUDIES[slug as keyof typeof CASE_STUDIES]
  const [activeSection, setActiveSection] = useState(cs?.sections[0]?.id ?? '')
  const isMobile = useIsMobile()

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  useEffect(() => {
    if (!cs) return
    const handleScroll = () => {
      for (let i = cs.sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(cs.sections[i].id)
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(cs.sections[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [cs])

  if (!cs) return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: f }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: 'hsl(0,0%,55%)', marginBottom: 16 }}>Case study not found.</p>
        <Link to="/#work" style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,8%)', textDecoration: 'underline' }}>← Back to work</Link>
      </div>
    </main>
  )

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');`}</style>
      <main style={{ backgroundColor: 'hsl(0,0%,98%)', minHeight: '100vh', fontFamily: f }}>

        {/* Top bar */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '14px 16px' : '18px 32px', borderBottom: '1px solid hsl(0,0%,92%)', background: 'rgba(250,250,248,0.92)', backdropFilter: 'blur(12px)' }}>
          <Link to="/#work" style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,45%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,45%)' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4L6 8l4 4"/></svg>
            Back
          </Link>
          {!isMobile && (
            <span style={{ fontFamily: f, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(0,0%,55%)' }}>
              {cs.category}
            </span>
          )}
          <span style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,55%)' }}>{cs.tags[1]}</span>
        </div>

        {/* Hero */}
        <div style={{ background: cs.bg, padding: isMobile ? '88px 20px 50px' : '120px 32px 80px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}>

              {/* Tags row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                <span style={{ padding: '5px 12px', borderRadius: 9999, background: 'hsl(0,0%,8%)', color: 'white', fontFamily: f, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em' }}>
                  {cs.status}
                </span>
                {cs.tags.map(tag => (
                  <span key={tag} style={{ padding: '5px 12px', borderRadius: 9999, background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)', color: 'hsl(0,0%,35%)', fontFamily: f, fontSize: 11 }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 style={{ fontFamily: f, fontSize: 'clamp(2.2rem,4.5vw,4rem)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, color: 'hsl(0,0%,8%)', margin: '0 0 16px', maxWidth: 700 }}>
                {cs.title}
                <span style={{ display: 'block', fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.4rem,3vw,2.4rem)', color: 'hsl(0,0%,35%)', marginTop: 8 }}>
                  {cs.subtitle}
                </span>
              </h1>

              {/* Metrics */}
              <div style={{ display: 'flex', gap: isMobile ? 28 : 48, marginTop: isMobile ? 32 : 48, flexWrap: 'wrap' }}>
                {cs.metrics.map(m => (
                  <div key={m.label}>
                    <div style={{ fontFamily: f, fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: 'hsl(0,0%,8%)' }}>{m.value}</div>
                    <div style={{ fontFamily: f, fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'hsl(0,0%,55%)', marginTop: 6 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content grid */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '50px 20px 80px' : '80px 32px 120px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? '36px 0' : '0 80px', alignItems: 'start' }}>

          {/* Sidebar — desktop only */}
          {!isMobile && (
          <aside style={{ position: 'sticky', top: 80 }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {cs.sections.map(s => (
                <button key={s.id}
                  onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: f, fontSize: 13, lineHeight: 1.5, color: activeSection === s.id ? 'hsl(0,0%,8%)' : 'hsl(0,0%,60%)', fontWeight: activeSection === s.id ? 600 : 400, background: 'none', border: 'none', cursor: 'pointer', padding: '5px 0', transition: 'color 0.15s' }}>
                  {s.label}
                </button>
              ))}
            </nav>

            {/* Divider */}
            <div style={{ height: 1, background: 'hsl(0,0%,90%)', margin: '28px 0' }} />

            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Role', value: cs.tags[0] },
                { label: 'Tools', value: cs.tags[3] || '' },
                { label: 'Platform', value: cs.tags[2] || '' },
              ].map(item => (
                <div key={item.label}>
                  <p style={{ fontFamily: f, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,55%)', margin: '0 0 3px' }}>{item.label}</p>
                  <p style={{ fontFamily: f, fontSize: 13, color: 'hsl(0,0%,25%)', margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </aside>
          )}

          {/* Article content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 48 : 72 }}>
            {cs.content.map((section, i) => (
              <motion.section key={section.id} id={section.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.45 }}
                style={{ scrollMarginTop: 100 }}>

                <h2 style={{ fontFamily: f, fontSize: 'clamp(1rem,1.6vw,1.25rem)', fontWeight: 700, letterSpacing: '-0.01em', color: 'hsl(0,0%,8%)', margin: '0 0 20px' }}>
                  {section.heading}
                </h2>

                {/* Body — parse **bold** and newlines */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {section.body.split('\n\n').map((para, j) => (
                    <p key={j} style={{ fontFamily: f, fontSize: isMobile ? 15 : 16, color: 'hsl(0,0%,25%)', lineHeight: isMobile ? 1.7 : 1.75, margin: 0 }}
                      dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </div>

                {/* Highlight */}
                {section.highlight && (
                  <div style={{ margin: '28px 0', padding: '20px 24px', borderLeft: '3px solid hsl(0,0%,8%)', background: 'hsl(0,0%,96%)' }}>
                    <p style={{ fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 17, color: 'hsl(0,0%,15%)', lineHeight: 1.65, margin: 0 }}>
                      <mark style={{ background: 'rgba(245,230,66,0.4)', color: 'inherit', padding: '0 3px', borderRadius: 3 }}>
                        {section.highlight}
                      </mark>
                    </p>
                  </div>
                )}

                {/* Quote */}
                {section.quote && (
                  <div style={{ margin: '28px 0', padding: '20px 24px', background: 'hsl(0,0%,97%)', border: '1px solid hsl(0,0%,90%)', borderRadius: 12 }}>
                    <p style={{ fontFamily: f, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(0,0%,55%)', margin: '0 0 12px' }}>User quote</p>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'hsl(0,0%,88%)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>😶</div>
                      <p style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,20%)', lineHeight: 1.65, margin: 0 }}>
                        "{section.quote.text}"
                      </p>
                    </div>
                    <p style={{ fontFamily: f, fontSize: 11, color: 'hsl(0,0%,55%)', margin: '10px 0 0', paddingLeft: 40 }}>— {section.quote.attribution}</p>
                  </div>
                )}

                {/* Image */}
                {section.image && (
                  <div style={{ margin: '32px 0', borderRadius: 16, overflow: 'hidden', background: cs.accentBg, aspectRatio: '16/9' }}>
                    <img src={section.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }} />
                  </div>
                )}
              </motion.section>
            ))}

            {/* Footer */}
            <div style={{ paddingTop: 32, borderTop: '1px solid hsl(0,0%,90%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/#work" style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,55%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,55%)' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 4L6 8l4 4"/></svg>
                All work
              </Link>
              {/* Next case study */}
              {(() => {
                const keys = Object.keys(CASE_STUDIES)
                const idx = keys.indexOf(slug ?? '')
                const nextKey = keys[idx + 1]
                if (!nextKey) return null
                const next = CASE_STUDIES[nextKey as keyof typeof CASE_STUDIES]
                return (
                  <Link to={`/case-study/${nextKey}`} style={{ fontFamily: f, fontSize: 14, color: 'hsl(0,0%,55%)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,8%)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,55%)' }}>
                    Next: {next.title}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4l4 4-4 4"/></svg>
                  </Link>
                )
              })()}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
