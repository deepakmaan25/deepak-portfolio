import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const f  = "'Overused Grotesk', Inter, system-ui, sans-serif"
const fs = "'IBM Plex Serif', Georgia, serif"

export const ARTICLES = [
  {
    slug: 'how-i-design-and-ship',
    date: 'May 15, 2025',
    readTime: '4 min read',
    title: 'How I design and ship without a handoff',
    excerpt: "I design in Figma, then write the React and TypeScript myself. No translation loss, no back-and-forth. Here's what that workflow actually looks like day to day.",
    sections: [
      { id: 'the-problem',  label: 'The problem' },
      { id: 'the-workflow', label: 'The workflow' },
      { id: 'tradeoffs',    label: 'Tradeoffs' },
      { id: 'takeaway',     label: 'Takeaway' },
    ],
    content: [
      {
        id: 'the-problem',
        heading: 'The problem with handoffs',
        body: `Most design processes have a gap between the Figma file and what gets built. Designs lose fidelity. Interactions get simplified. Spacing drifts. The designer files a Jira ticket and hopes for the best.\n\nI got tired of that gap. So I closed it.`,
        highlight: null,
        quote: null,
      },
      {
        id: 'the-workflow',
        heading: 'The workflow',
        body: `I design in Figma until the interaction feels right — not just the layout, but the motion, the hover states, the edge cases. Then I open VS Code and build it.\n\nI use React and TypeScript. Tailwind for most styling. Framer Motion for anything that needs to feel alive. Claude Code helps me move fast on boilerplate and catches bugs I miss at 1am.`,
        highlight: 'The best way to make sure your design ships correctly is to ship it yourself.',
        quote: null,
      },
      {
        id: 'tradeoffs',
        heading: 'Tradeoffs',
        body: `This only works if you keep the scope tight. I don't try to build everything — I build the core interactions that would get lost in a handoff. The rest is standard components.\n\nIt also takes longer upfront. Learning to read TypeScript errors, understanding why a flex container is misbehaving — that's real time. But the output is closer to what I imagined.`,
        highlight: null,
        quote: null,
      },
      {
        id: 'takeaway',
        heading: 'Takeaway',
        body: `You don't need to be a senior engineer. You need enough to close the gap.\n\nIf you're a designer who's curious about code, start with one component. Build the thing you keep watching engineers simplify.`,
        highlight: null,
        quote: null,
      },
    ],
  },
  {
    slug: 'ux-research-lessons',
    date: 'March 8, 2025',
    readTime: '5 min read',
    title: 'What 10 user interviews taught me about research',
    excerpt: "Running research at Tech Japan taught me that the most important skill isn't asking the right questions — it's listening for what users don't say.",
    sections: [
      { id: 'context',    label: 'Context' },
      { id: 'findings',   label: 'Key findings' },
      { id: 'method',     label: 'What worked' },
      { id: 'reflection', label: 'Reflection' },
    ],
    content: [
      {
        id: 'context',
        heading: 'Context',
        body: `I ran 10 user interviews across IIT campuses for Tech Japan — a platform connecting students with Japanese companies. The brief was simple: find out why qualified students weren't completing applications.`,
        highlight: null,
        quote: null,
      },
      {
        id: 'findings',
        heading: 'Key findings',
        body: `The biggest drop-off wasn't the application itself. It was a broken company link — clicking a company name threw an error. Several users stopped and wondered if the company was even real.\n\nThat's not a UX problem. That's a trust problem. And no amount of UI polish fixes a trust problem.`,
        highlight: 'The single thing most likely to make a user close the tab wasn\'t bad design — it was a broken link at exactly the wrong moment.',
        quote: {
          text: "While clicking on a company's link, it takes you to a new page but you can't see any meaningful data — it shows an error every time. It leads to doubting the company's legitimacy.",
          attribution: 'IIT student, 4th year',
        },
      },
      {
        id: 'method',
        heading: 'What worked',
        body: `I started each interview with the same question: "Walk me through the last time you used the platform." Not what do you like, not what would you change — just: show me what you actually did.\n\nPeople reveal things in walkthroughs they'd never say in response to a direct question.`,
        highlight: null,
        quote: null,
      },
      {
        id: 'reflection',
        heading: 'Reflection',
        body: `Research is most useful when it changes what you build. We fixed the broken links first — before any visual redesign. That single fix removed the moment users questioned the legitimacy of the whole platform.\n\nStart with the thing that breaks trust. Everything else is polish.`,
        highlight: null,
        quote: null,
      },
    ],
  },
  {
    slug: 'design-systems-thinking',
    date: 'January 22, 2025',
    readTime: '3 min read',
    title: 'Why I built a design system for a side project',
    excerpt: "Kairo started as a component library for my own use. Building it taught me more about design decisions than any case study I've read.",
    sections: [
      { id: 'why',       label: 'Why bother' },
      { id: 'process',   label: 'The process' },
      { id: 'learnings', label: 'Learnings' },
    ],
    content: [
      {
        id: 'why',
        heading: 'Why bother building a system for a side project',
        body: `Most design system advice is written for teams. Shared tokens, governance, contribution models. None of that applies when you're one person with a Figma file and a laptop.\n\nBut I built Kairo anyway — not because I needed a system, but because I wanted to understand how decisions at the component level affect everything above it.`,
        highlight: null,
        quote: null,
      },
      {
        id: 'process',
        heading: 'The process',
        body: `I started with spacing. Not components, not colors — just spacing. Forcing every element to sit on an 8px grid made every layout decision easier. When something felt off, I could point to the grid and fix it in one change.\n\nColors came second. I defined semantic tokens — not blue-500 but accent, muted, destructive. Naming things by role instead of value made it easy to change the actual color without hunting through 40 components.`,
        highlight: null,
        quote: null,
      },
      {
        id: 'learnings',
        heading: 'Learnings',
        body: `The most useful thing I built was the type scale. Not the scale itself — the act of building it. Deciding what display, body, and caption meant for my projects forced me to think about hierarchy in a way I hadn't before.\n\nBuild the system for one project you actually care about. The constraints are real, the feedback is immediate, and you'll carry the thinking into everything after.`,
        highlight: 'Build the system for one project you actually care about.',
        quote: null,
      },
    ],
  },
]

export default function WritingsPage() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,300;1,300;1,400&display=swap');`}</style>
      <main style={{ backgroundColor: 'hsl(0,0%,98%)', minHeight: '100vh', fontFamily: f }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '120px 32px 80px' }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }} style={{ marginBottom: 48 }}>
            <h1 style={{ fontFamily: f, fontSize: 'clamp(2.2rem,4vw,3rem)', fontWeight: 700, letterSpacing: '-0.025em', color: 'hsl(0,0%,8%)', margin: '0 0 12px' }}>
              Writings
            </h1>
            <p style={{ fontFamily: fs, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem,1.5vw,1.15rem)', color: 'hsl(0,0%,45%)', margin: 0, lineHeight: 1.6 }}>
              Notes on shipping, <em>vibe coding,</em> and the work in between.
            </p>
          </motion.div>

          <div style={{ height: 1, background: 'hsl(0,0%,90%)', marginBottom: 0 }} />

          {/* Articles */}
          {ARTICLES.map((article, i) => (
            <motion.div key={article.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.4, 0, 0.2, 1] }}>
              <Link to={`/writings/${article.slug}`} style={{ display: 'block', textDecoration: 'none', padding: '32px 0', transition: 'opacity 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,50%)', fontWeight: 400 }}>{article.date}</span>
                  <span style={{ width: 28, height: 1, background: 'hsl(0,0%,78%)' }} />
                  <span style={{ fontFamily: f, fontSize: 12, color: 'hsl(0,0%,55%)' }}>{article.readTime}</span>
                </div>
                <h2 style={{ fontFamily: f, fontSize: 'clamp(1.1rem,2vw,1.45rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'hsl(0,0%,8%)', margin: '0 0 10px' }}>
                  {article.title}
                </h2>
                <p style={{ fontFamily: f, fontSize: 15, color: 'hsl(0,0%,42%)', lineHeight: 1.65, margin: 0, maxWidth: 580 }}>
                  {article.excerpt}
                </p>
              </Link>
              {i < ARTICLES.length - 1 && <div style={{ height: 1, background: 'hsl(0,0%,90%)' }} />}
            </motion.div>
          ))}

          <div style={{ height: 1, background: 'hsl(0,0%,90%)', marginTop: 0 }} />
        </div>
      </main>
    </>
  )
}
