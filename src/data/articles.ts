// src/data/articles.ts
export interface Article {
  slug: string
  title: string
  subtitle: string
  date: string
  readTime: string
  tag: string
  body: string
}

export const ARTICLES: Article[] = [
  {
    slug: 'ikea-ux',
    title: 'How IKEA earns €26 billion a year through deliberate UX',
    subtitle: 'Every decision in the IKEA experience - from the app to the store maze - is engineered. None of it is accidental.',
    date: 'Feb 2025',
    readTime: '5 min',
    tag: 'UX Design',
    body: `Most people think IKEA sells furniture. It doesn't. It sells a billion-dollar UX system where every touchpoint is engineered to lower resistance and raise desire.

Here's how it works.

**The AR room preview**

IKEA Kreativ lets you point your phone camera at your actual room and place furniture inside it before buying. Not a showroom. Not a catalogue. Your room. This single feature removes the biggest obstacle in furniture buying - the fear of getting it wrong - and it does so by collapsing the distance between imagination and reality.

**Discovery designed around moods, not SKUs**

Most e-commerce makes you search by product category. IKEA's app lets you browse by room, style, and mood. You're not looking for a sofa - you're looking for what your living room could feel like. The navigation is built around aspiration, not inventory.

**Cognitive load, done deliberately**

Don't Make Me Think is a design principle. IKEA made it a product standard. Three clicks to any product. One CTA per screen. No competing actions. Every decision in the digital flow is made for you until the moment you need to make one.

**The store as a designed system**

The IKEA store maze isn't an accident. It's a one-way labyrinth designed to route you past every product in the store. The average trip intended as a €10 run becomes €85 spent. Dwell time averages 47 minutes. Items bought are 3.8x what customers planned to buy.

This is environmental UX at scale. The store is the interface.

**The omnichannel loop**

The app saves your in-store visit. The store completes what the app started. They're not separate channels - they're one continuous experience with a shared memory. Most retail is still trying to figure out how to make this work. IKEA built it into the system architecture.

**The AI layer**

Style quiz, room generator, personalised suggestions. The AI isn't layered on top as a feature - it's woven into the discovery flow. It makes personalisation feel effortless rather than configurational.

What IKEA built is a case study in designing the entire customer journey as a single coherent system. The app, the store, the return policy, the meatballs in the cafeteria - all of it is UX. €26 billion a year says it's working.`,
  },
  {
    slug: 'ai-middle-path',
    title: 'The AI middle path most designers are missing',
    subtitle: 'Using AI to go faster on generic output doesn\'t make you better. It makes you more efficient at producing slop.',
    date: 'Mar 2025',
    readTime: '4 min',
    tag: 'AI + Design',
    body: `There are two kinds of designers using AI right now.

The first group is using it to go faster. Same briefs, same outputs, same thinking - but 3x the velocity. They're producing more. Most of it is forgettable.

The second group is smaller, quieter, and building a structural advantage. They're using AI for the mechanical layer - component generation, token naming, variant management, the parts that eat time without requiring taste - while doubling down on the things AI statistically averages away: judgment, perspective, specificity.

**Why AI generates median output by design**

AI learns from the aggregate of everything it's seen. That's not a bug - it's the architecture. It produces the statistical center of the internet's design output. And the statistical center of design output is, by definition, forgettable.

The designers who win aren't the ones who make AI go faster. They're the ones who use AI as speed infrastructure underneath original thinking.

**What the middle path looks like in practice**

Use AI to generate 10 variations in seconds. Then apply taste to pick the one that's actually interesting - and judgment to know why it's interesting. Use it to handle component scaffolding so you spend your hours on what the component means, not what it looks like. Use it to compress exploration time so more of your day is spent on the decisions that require you specifically.

The trap is outsourcing the thinking, not the execution. AI can't know what the right problem is. It can't carry a point of view. It can't make the call that breaks the rule for a reason. That's the work.

**The compounding advantage**

Designers who treat AI as a speed layer beneath original thinking will produce more original work faster. Designers who treat AI as a thinking layer will produce more generic work faster. The output looks similar for a while. Then it doesn't.

The middle path isn't about using AI less. It's about being precise about what you're asking it to do.`,
  },
  {
    slug: 'agentic-ux',
    title: 'Your product now has two types of users. You\'re only designing for one.',
    subtitle: 'AI agents navigate digital products on behalf of humans. Everything Jensen Huang described at GTC 2026 is a design problem. We\'re not treating it like one.',
    date: 'Mar 2025',
    readTime: '6 min',
    tag: 'AI + Design',
    body: `At GTC 2026, Jensen Huang described a world where AI agents navigate digital products on behalf of humans. He outlined agents that browse, click, extract, and act - performing tasks across software that was built for human eyes and human hands.

He never mentioned design. But everything he described is a design problem.

**Products now have two user types**

Human users need the emotional, visual, contextual layer. They need interfaces that feel clear, trustworthy, and satisfying. They read microcopy. They notice hierarchy. They feel friction.

AI agents don't see the UI. They need structured data, clean APIs, predictable error states, and explicit permission scopes. They experience your product as a set of inputs and outputs. How it looks is irrelevant. Whether it behaves consistently is everything.

We're still designing as if only humans use our products. That assumption expired.

**Six patterns for agentic UX**

Agent-readable content structure - information hierarchy built for machines, not just eyes. Agents need to extract meaning from your product. If meaning is only conveyed visually, agents will fail.

Error state design as critical path - when an agent encounters an error, it has no intuition for what "try again later" means. Error states need machine-readable signals, not just human-readable copy.

Trust and permission flows - agents need explicit scopes. Humans need to understand what they've authorised. These are two different design problems in the same flow.

Agent user stories - "As an agent, I need to..." should sit alongside "As a user, I want to..." in your design process. If you haven't written one, you haven't designed for agents.

Multi-step orchestration UX - agents perform sequences that span sessions and systems. Designing for a single task in a single session is no longer enough.

Graceful degradation - what happens when the agent fails, goes off-script, or encounters an unexpected state? That's not an edge case. It's the critical path.

**What you can do before your team asks why you didn't**

Audit your product for machine-readability. Write one agent user story per core flow. Design your error states first. Document your data structure for API consumers. Add explicit permission and scope UI to any integration point. Then test your product with an actual agent.

The products that will work well in an agentic world are the ones being built for both types of users right now. Most aren't.`,
  },
  {
    slug: 'craft-vs-slop',
    title: 'The slop bucket is overflowing. Craft is the differentiator.',
    subtitle: 'AI democratised production. Volume is now infinite. Generic output is penalised harder than ever because there\'s more of it competing for the same attention.',
    date: 'Apr 2025',
    readTime: '4 min',
    tag: 'Design Thinking',
    body: `There's a branding project by Winny Tapajós called Amazonia. Each letter in the wordmark was traced from actual satellite images of the Amazon river. Every shape carries geographic meaning. It's one of the most specific pieces of visual work I've seen in years.

Give ChatGPT or Grok the same brief and you get word-art, clipart, generic ornaments. Technically competent. Completely soulless.

Fifteen years ago that output would have been good enough. Now it fills the slop bucket.

**What the slop era actually means**

AI democratised production. Anyone can make something that looks like design. Volume is now infinite. And because volume is infinite, attention has become the genuinely scarce resource.

Generic output used to compete with other generic output. Now it competes with everything. The noise floor rose. The bar for being noticed rose with it.

**What separates craft from slop**

Intentionality - every decision has a reason you can articulate. Not "it looked right" but what it's doing and why it's doing it here.

Specificity - details that couldn't have been generated, because they came from specific knowledge about a specific context. The Amazonia letterforms couldn't exist without someone knowing what the Amazon river looks like from space.

Restraint - knowing what to remove. Most generated output keeps everything. Craft removes until what's left is exactly what should be there.

Texture - the feeling that a human made choices. Not polish. Choices. You can sense the difference.

Originality - reference points that aren't the median of the internet. If your inspiration is "the top results when I searched this topic," you'll produce the top results when someone else searches this topic.

**The compounding effect**

The slop era doesn't hurt careful makers. It advantages them. When the volume of generic output doubles, the value of non-generic output doubles with it. Craft is now the differentiator precisely because it's harder to automate.

The question isn't whether to use the tools. It's whether to use them for the thinking or just the execution. One makes you faster at producing slop. The other makes you faster at producing work that couldn't have been made any other way.`,
  },
  {
    slug: 'volvo-ycc-inclusive-design',
    title: 'Volvo gave an all-female team a blank brief. They designed for everyone.',
    subtitle: 'The 2004 YCC concept car didn\'t design a "woman\'s car." It solved problems the industry had spent decades pretending didn\'t exist.',
    date: 'Apr 2025',
    readTime: '5 min',
    tag: 'UX Design',
    body: `In 2004, Volvo gave an all-female design team a blank brief. No constraints. Build whatever you think should exist.

They didn't build a "woman's car." They built a better car. And in doing so, they exposed how many problems the standard car industry had been systematically ignoring.

**The decisions**

No hood. You shouldn't need to open it - maintenance is the brand's problem, not yours. The car tells you what it needs. The mechanic handles it. You never pop the hood. This isn't a feature for women. It's a feature for anyone who has ever looked at an engine and felt like they were supposed to understand something they don't.

Seat and steering wheel adjust simultaneously when you open the door. The car remembers your profile and configures itself before you sit down. Personalisation is automatic, not a manual task you perform every time you get in.

Easy-clean upholstery, storage designed around actual bags, ambient lighting calibrated for visibility. Every detail came from observing how people actually use cars - not how the industry assumed people use cars.

**What inclusive design actually means**

The auto industry's standard crash test dummy is male, average height, average weight. Most safety systems - airbag deployment, seatbelt geometry, headrest positioning - are calibrated for that dummy. Women are 47% more likely to be seriously injured in a car crash because the safety infrastructure wasn't designed with their body dimensions in mind.

The YCC didn't fix that. But it asked the right question: who are we not designing for, and what would it look like if we did?

The answer, almost universally, is: a better product for everyone.

**The pattern holds everywhere**

Curb cuts were designed for wheelchair users. Runners, cyclists, parents with strollers, and delivery workers use them daily. Closed captions were designed for the deaf. Everyone watching on mute at 2am uses them. Designing for the edge case, the underserved user, the body or context the standard doesn't account for - it consistently produces solutions that improve the product for people who never needed them to.

The YCC concept sold. The production car never came. The lessons have been applied in pieces across the industry, slowly.

The brief that produced it - design for people the industry doesn't usually design for - is available to anyone building products right now.`,
  },
  {
    slug: 'end-of-dashboards',
    title: 'Dashboards are dying. Design systems are being disrupted. Same reason.',
    subtitle: 'When something becomes effortless to make, it loses its value. AI made dashboards effortless. The implications run deeper than most teams are willing to follow.',
    date: 'May 2025',
    readTime: '5 min',
    tag: 'Design Systems',
    body: `AI can generate a functional dashboard from a prompt in under 30 seconds. Data grid, chart components, filter panel, KPI cards at the top. It follows the conventions because it learned from the conventions.

The output is indistinguishable from what a junior designer would spend two days building.

That's not a problem for the junior designer's time. It's a problem for the dashboard's value.

**The dashboard was never the point**

We built an entire design discipline around visualising data in grids because it was technically hard. Connecting a database, mapping relationships, building reusable chart components - it required skill. The skill added value.

Now it doesn't. The prompt adds value. The output is commodity.

The dashboard was always just a container for a question someone needed answered. We spent years perfecting the container. The question is what actually matters.

The products that survive the next five years will be the ones that surface the right insight in the right context without making you navigate to a dashboard to find it. Contextual. Proactive. Specific. Not another data grid.

**Design systems face the same disruption**

AI can consume a design system and produce technically correct output. Correct tokens. Correct spacing. Correct component usage.

What it can't do is know when to break the rule - and more importantly, why. Design systems codify decisions. They don't codify judgment. The reasoning behind the decision, the context that makes the rule right in one situation and wrong in another - that's not in the component library.

The future isn't better design systems. It's design systems that carry the reasoning alongside the components. Systems written as if they'll be used by someone who has never met your team - because they will be.

**What comes after**

Dashboards get replaced by contextual surfaces that push relevant information to the right moment. Design systems evolve from component libraries into documented thinking - why decisions were made, what they were trading off, when to deviate.

Both shifts require the same thing: more craft, more judgment, more specificity. Less template-filling. The things AI can't automate are exactly the things that become more valuable when everything else is automated.`,
  },
  {
    slug: 'ux-writing-rules',
    title: '13 UX writing rules that separate copy people read from copy people ignore',
    subtitle: 'Words do measurable work in interfaces. Most of them are doing the wrong work.',
    date: 'May 2025',
    readTime: '6 min',
    tag: 'UX Writing',
    body: `Most interface copy is written by designers who are thinking about the layout, developers who are thinking about the state, or PMs who are thinking about the feature. Nobody is thinking about what the words are doing to the person reading them.

Here are 13 rules that change that.

**1. Clarity over cleverness**

"Get started" beats "Embark on your journey." Say what it does. If you have to choose between sounding smart and being understood, be understood. Every time.

**2. Write for scanning, not reading**

Users read about 20% of a page. Structure everything else for the 80% who are scanning. Headers, short paragraphs, front-loaded sentences. Design for how people actually behave, not how you wish they would.

**3. Active voice**

"Your card was declined" puts the failure on the card. "We couldn't process your payment" owns it. Agency in your copy signals honesty and builds trust.

**4. Specific CTAs**

"Download the Q3 report" beats "Click here." Name the action and the object. Never make the user guess what happens next.

**5. Useful error messages**

"Something went wrong" is useless. "We couldn't save - check your connection and try again" is useful. Error messages are the most important copy in your product. Most get the least attention.

**6. Onboarding sets the register**

Your first-use copy establishes the emotional tone for the entire product relationship. It's not a tutorial. It's the first impression in a conversation that will last years. Write it accordingly.

**7. Empty states are design moments**

"No messages yet" is a void. "Start a conversation - your network is waiting" is an invitation. The empty state is the moment before engagement. Use it.

**8. Microcopy builds trust**

The word "secure" near a payment field increases conversion. Words do measurable work. The smallest copy decisions compound across millions of interactions.

**9. Respect the stakes in confirmation dialogs**

"Are you sure?" is a generic interruption. "This will permanently delete 3 years of data. Are you ready?" respects what the user is about to do. Match the weight of your copy to the weight of the action.

**10. Translate jargon**

"Sync" means nothing to half your users. "Update across all your devices" means exactly what it does. Default to the plain version. Jargon is a shortcut you're taking at the user's expense.

**11. Social proof needs specificity**

"Used by 10,000 designers" is a number. "Used by teams at Airbnb, Figma, and Stripe" is a signal. Specificity converts.

**12. Ditch the placeholder**

Placeholder text disappears when users need it most - when they're typing. Labels exist for a reason. Use them.

**13. Tone consistency under pressure**

Your error state tone should match your onboarding tone. Products that go formal when things break feel untrustworthy. The personality of a product is only real if it holds under stress.

Google's "Safer with Google" tooltip - 23 words - applies 10 of these simultaneously. That's not an accident.`,
  },
  {
    slug: 'design-system-ai-training-data',
    title: 'Your design system became AI training data. Did you write it for that?',
    subtitle: 'AI used our design system correctly, followed every documented rule, and still produced the wrong output. The system was followed perfectly. That was the problem.',
    date: 'May 2025',
    readTime: '5 min',
    tag: 'Design Systems',
    body: `We asked AI to build a PM dashboard using our design system. It followed every rule we'd documented. Correct tokens, correct spacing, correct component usage across the board.

The output was wrong.

Dense. Hierarchically flat. Technically inside the rules but missing everything the rules were trying to produce. The AI had learned the syntax of our system. It hadn't learned what the system was for.

That's not an AI failure. It's a documentation failure.

**What changed**

Before AI, your design system was used by people who had context. They'd sat in the meetings. They understood the product. They could infer from the examples what the rules were really trying to protect.

AI has none of that. It reads what's written. If intent isn't written down, intent doesn't exist.

The system that was fine for humans is insufficient for machines. Most teams haven't updated it.

**Five shifts that matter**

From guides to carriers of craft - encode taste, not just rules. "Use 8px spacing between elements" is a rule. "We use tighter spacing in data-dense contexts to reduce scroll distance, and looser spacing in onboarding flows to reduce cognitive load" is craft. The second one teaches. The first one just constrains.

Exploration needs rails - AI generates 10 variations in seconds. Without guardrails, those variations are noise. The system needs to define what "good" looks like before the generation starts, not after.

Write the system for AI too - what designers infer from context, AI doesn't know. Constraints, intent, the reasoning behind decisions - these need to be explicit. Not assumed.

Governance moves upstream - the scope expands from maintaining a component library to governing how all builders, including AI, contribute to the product. That's a different job than most design system teams were hired to do.

Maintenance becomes continuous - stop asking "is the library updated" and start asking "does it reflect our latest decisions." Those are different questions with different cadences.

**The number that stuck**

32% of designers trust AI output without review. 69% of designers report satisfaction with AI tools versus 82% of developers. The designers are closer to the problem - they know when the output is wrong. But the rate at which they're catching it isn't keeping up with the rate at which it's being generated.

Write your system as if it will be used by someone who has never met your team. Because it will.`,
  },
  {
    slug: 'linkedin-is-broken',
    title: 'LinkedIn is broken in ways that should embarrass everyone who built it',
    subtitle: 'Ghost jobs, fake profiles, hustle porn, and a feature that penalises job seekers for needing jobs. A platform that promised professional infrastructure and delivered something else entirely.',
    date: 'Jun 2025',
    readTime: '6 min',
    tag: 'Industry',
    body: `LinkedIn has 1 billion users and a structural integrity problem nobody wants to say out loud.

Let's say it.

**Ghost jobs**

40% of companies admitted to posting fake job listings in 2025. The reasons: collecting résumés speculatively, appearing in growth mode for investors, running market research on available talent without intent to hire. Zombie listings stay active for months. The platform applies no penalty.

The person applying for that role spent 45 minutes on the application. LinkedIn's algorithm rewarded the company for the engagement.

**Fake profiles**

LinkedIn removed 85.5 million fake accounts in the first half of 2023. Their own transparency report. The uses are well-documented: recruiting scams, pig-butchering investment fraud where a fake persona builds trust over weeks before pitching a crypto scheme, competitive intelligence through fake recruiter profiles.

The platform knows. The number exists because they measured it.

**Hustle porn**

The algorithm rewards emotional, personal, high-engagement content. Professionals learned this. They now manufacture vulnerability for reach. Authenticity has been A/B tested into a content strategy.

The feed became Instagram's vanity, Twitter's outrage, and a TED Talk's self-seriousness compressed into a single scroll. The professional conversation that might have happened here migrated to newsletters, private Slacks, and Discord servers where the algorithm can't touch it.

**The Open to Work penalty**

Adding the green banner to your profile - the feature LinkedIn built to help job seekers - signals to hiring managers that you're less desirable. The logic: if they were good, someone would have hired them already. LinkedIn knows this. They built a private version visible only to recruiters. That tells you everything.

**The India layer**

In India, LinkedIn profiles became social credibility signals that extend well beyond employment. Marriage match potential. Family standing. Life stability. The platform wasn't designed for this use case. It happened anyway, because a public professional profile in a social context carries more weight than LinkedIn's product team anticipated.

**What it's still good for**

Warm introductions when someone knows the person you're trying to reach. Being found passively by recruiters actively searching your skill set. Company research before an interview. Niche professional communities where substantive conversations still happen, mostly in comments rather than posts.

The infrastructure LinkedIn was supposed to build - transparent hiring, genuine professional networking, accessible career development - still doesn't exist. We needed it. We got Instagram with a blue blazer.`,
  },
]
