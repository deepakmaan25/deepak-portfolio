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
    subtitle: 'Social Polling App — 0 to 1',
    description: 'Designed the complete product experience for a social polling startup from scratch.',
    tags: ['Product Design', '2024', 'Mobile + Web', 'Figma · Whimsical'],
    status: 'SHIPPED',
    metrics: [
      { value: '0→1', label: 'product built from scratch' },
      { value: '3',   label: 'core flows designed' },
      { value: '2',   label: 'rounds of user testing' },
    ],
    bg: 'hsl(30,100%,95%)',
    accentBg: '#FEF3E2',
    sections: [
      { id: 'tldr',       label: 'TL;DR' },
      { id: 'problem',    label: 'Problem' },
      { id: 'process',    label: 'Process' },
      { id: 'design',     label: 'Design decisions' },
      { id: 'outcome',    label: 'Outcome' },
    ],
    content: [
      {
        id: 'tldr',
        heading: 'TL;DR',
        body: `Buzztro is a social polling platform that lets users create, share, and engage with polls across topics. I designed the full product from 0 to 1 — from the initial concept through research, information architecture, and high-fidelity screens.\n\nThe challenge was making polls feel social and engaging without the noise and friction of existing platforms. The goal: make it feel like a conversation, not a survey.`,
        highlight: null,
        quote: null,
        image: null,
      },
      {
        id: 'problem',
        heading: 'Problem',
        body: `Polls exist everywhere — Twitter, Instagram Stories, Google Forms. But none of them treat polling as a primary experience. They're either too shallow (2-option Instagram polls) or too sterile (Google Forms).\n\nBuzztro wanted to own the middle ground: casual enough to use daily, structured enough to surface interesting data.`,
        highlight: 'The brief was simple: make polls feel like hanging out with friends, not filling out a form.',
        quote: {
          text: 'I want to see what my friends think about things, but Instagram polls are too basic and Forms feel like homework.',
          attribution: 'User interview participant, age 22',
        },
        image: null,
      },
      {
        id: 'process',
        heading: 'Design process',
        body: `I started with competitive analysis — Twitter polls, Instagram Stories, Slido, Pol.is. Each had a clear failure mode: too limited, too anonymous, too enterprise, too complex.\n\nFrom there I ran 8 user interviews to understand how people already share opinions online, what stops them, and what makes them engage with other people's opinions.\n\nInformation architecture came next — mapping the core flows: creating a poll, voting, seeing results, sharing. The key decision was whether to make the feed chronological or algorithm-driven. We went chronological for the MVP to keep trust high and complexity low.\n\nWireframes in Whimsical, then high-fidelity in Figma. Two rounds of usability testing with 5 users each.`,
        highlight: null,
        quote: null,
        image: '/src/assets/case-study-2.jpg',
      },
      {
        id: 'design',
        heading: 'Key design decisions',
        body: `**Poll creation** — Kept to 3 steps maximum. Title, options, audience. No multi-page forms. The hardest decision was whether to allow images in options — we kept it text-only for v1 to reduce friction.\n\n**Results reveal** — Results only show after you vote. This prevents anchoring — where seeing existing results changes how you vote. Users loved this in testing.\n\n**Pool progress bar** — A visual indicator showing how full each answer option is getting, updating in real time. Made polls feel alive. This became the most-noticed feature in testing.\n\n**Profile and follow** — Kept minimal. Name, bio, your polls, your votes. No algorithmic recommendations in v1 — just chronological following feed.\n\n**Share mechanics** — Each poll generates a unique link and a shareable image. The image includes the question and current result distribution — designed to be screenshot-worthy.`,
        highlight: 'Results only show after you vote. One constraint that changed how the whole product felt.',
        quote: {
          text: 'I didn\'t realize I wanted to see results after voting until I used it. Now I can\'t imagine it the other way.',
          attribution: 'Usability test participant',
        },
        image: '/src/assets/case-study-2.jpg',
      },
      {
        id: 'outcome',
        heading: 'Outcome',
        body: `The product shipped with the core polling flow, profile system, and feed. The pool progress bar and results-after-voting mechanic both survived into production unchanged.\n\nTwo rounds of usability testing validated the core flow — users completed poll creation in under 60 seconds on first try, and the voting flow had zero confusion in both rounds.\n\nThe founder referenced the results-reveal mechanic as a key differentiator in investor conversations.`,
        highlight: null,
        quote: null,
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
                { label: 'Role', value: 'UX Research Intern' },
                { label: 'Tools', value: cs.tags[3] },
                { label: 'Platform', value: cs.tags[2] },
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
