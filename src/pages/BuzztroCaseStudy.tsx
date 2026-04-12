import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// ---------- Shared primitives (match CaseStudyDetail.tsx conventions) ----------

type ImageSlotProps = {
  src?: string;
  ratio?: string;
  caption?: string;
  alt?: string;
};

const ImageSlot = ({ src, ratio = "16/9", caption, alt = "" }: ImageSlotProps) => (
  <figure className="my-10">
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]"
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-[Aileron] text-xs uppercase tracking-[0.2em] text-white/30">
            {alt || "Image placeholder"}
          </span>
        </div>
      )}
    </div>
    {caption && (
      <figcaption className="mt-3 text-center font-[Aileron] text-sm text-white/50">
        {caption}
      </figcaption>
    )}
  </figure>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 font-[Aileron] text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
    {children}
  </p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-[Unbounded] text-3xl font-bold text-white md:text-4xl">
    {children}
  </h2>
);

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-[Unbounded] text-xl font-bold text-white md:text-2xl">
    {children}
  </h3>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="font-[Aileron] text-lg leading-relaxed text-white/80">{children}</p>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="font-[Aileron] text-base leading-relaxed text-white/70">{children}</p>
);

const Pullquote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="my-8 border-l-2 border-indigo-500 bg-white/[0.02] px-6 py-5">
    <p className="font-[Aileron] text-lg italic leading-relaxed text-white/80">
      {children}
    </p>
  </blockquote>
);

// ---------- Page ----------

export default function BuzztroCaseStudy() {
  return (
    <div className="min-h-screen bg-[#0C0C0F] text-white">
      {/* Back nav */}
      <div className="mx-auto max-w-4xl px-6 pt-24 md:pt-32">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-[Aileron] text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to work
        </Link>
      </div>

      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl px-6 pt-10 pb-16 md:pt-16 md:pb-24"
      >
        <SectionLabel>Case Study · E-commerce</SectionLabel>
        <h1 className="font-[Unbounded] text-4xl font-bold leading-tight text-white md:text-6xl">
          Buzztro — designing a{" "}
          <span className="font-extrabold text-indigo-400">collective buying</span>{" "}
          shopping experience
        </h1>
        <p className="mt-6 max-w-2xl font-[Aileron] text-lg text-white/70 md:text-xl">
          A group-buying e-commerce platform where a product-driven community
          pre-books items to unlock lower prices. Led end-to-end design as the
          solo designer, from zero to shipped.
        </p>

        {/* Meta grid */}
        <dl className="mt-12 grid grid-cols-2 gap-y-6 gap-x-8 border-t border-white/10 pt-8 md:grid-cols-4">
          <div>
            <dt className="font-[Aileron] text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Role
            </dt>
            <dd className="mt-2 font-[Aileron] text-sm text-white/90">
              Lead Product Designer
              <br />
              <span className="text-white/50">Freelance · Solo</span>
            </dd>
          </div>
          <div>
            <dt className="font-[Aileron] text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Timeline
            </dt>
            <dd className="mt-2 font-[Aileron] text-sm text-white/90">
              Early 2024
              <br />
              <span className="text-white/50">2 months</span>
            </dd>
          </div>
          <div>
            <dt className="font-[Aileron] text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Platform
            </dt>
            <dd className="mt-2 font-[Aileron] text-sm text-white/90">
              Web
              <br />
              <span className="text-white/50">Desktop + Mobile</span>
            </dd>
          </div>
          <div>
            <dt className="font-[Aileron] text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Team
            </dt>
            <dd className="mt-2 font-[Aileron] text-sm text-white/90">
              Founder
              <br />
              <span className="text-white/50">Direct collaboration</span>
            </dd>
          </div>
        </dl>
      </motion.header>

      {/* Hero image */}
      <div className="mx-auto max-w-6xl px-6">
        <ImageSlot
          src="/buzztro/hero.png"
          ratio="16/9"
          alt="Buzztro hero — PDP, checkout, and order screens across web and mobile"
        />
      </div>

      {/* ----------------- EXECUTIVE SUMMARY ----------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SectionLabel>Executive Summary</SectionLabel>
        <H2>Turning a pricing mechanic into a product</H2>

        <div className="mt-8 space-y-6">
          <div>
            <H3>The problem</H3>
            <Body>
              Buzztro's core idea was collective buying — shoppers pool demand
              so that when enough people commit, the unit price drops and
              everyone wins. The mechanic works on paper, but nobody on the
              team had seen this pattern land cleanly in the Indian market.
              Pinduoduo had scaled it aggressively in China, Meesho and
              DealShare had circled the space here, but none translated
              directly. The risk: the pool mechanic either feels confusing
              ("why is the price changing?"), pushy ("join now or lose it"),
              or invisible (users shop like it's a normal store and miss the
              benefit entirely).
            </Body>
          </div>

          <div>
            <H3>The solution</H3>
            <Body>
              I designed the full buying experience around pool progress as
              the unifying metaphor — a single visual language that follows
              the user from the product card through PDP, booking checkout,
              order checkout, and post-purchase status. The price isn't fixed,
              it's a live consequence of how many people have joined, and the
              UI lets you feel that at every step without becoming a pressure
              tactic.
            </Body>
          </div>

          <div>
            <H3>My role</H3>
            <Body>
              Solo designer on a 2-month contract, reporting directly to the
              founder. Competitor research, information architecture, flows,
              wireframes, high-fidelity design, and the light design system
              that held it together. Shipped to production and ran for
              several months before the company paused on funding.
            </Body>
          </div>
        </div>
      </section>

      {/* ----------------- UNDERSTANDING THE PROBLEM ----------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SectionLabel>Understanding the Problem</SectionLabel>
        <H2>What collective buying actually asks of a shopper</H2>

        <div className="mt-6 space-y-5">
          <Lead>
            A regular e-commerce checkout is a transaction. Collective buying
            isn't — it's a commitment with a conditional outcome. That single
            difference rewrites almost every pattern the user expects.
          </Lead>

          <Body>
            I spent the first week mapping how group-buying platforms handle
            this across markets — Pinduoduo, Meesho, DealShare, Groupon in
            its original deal-of-the-day era, and adjacent patterns from
            Kickstarter where people are also committing to something that
            might not happen. I was looking less at their visual style and
            more at which moments they explained, which they hid, and where
            users dropped off in public teardowns and Baymard-style checkout
            research.
          </Body>

          <H3>Three things I kept seeing break</H3>

          <Body>
            <strong className="text-white">1. The price doesn't match the label.</strong>{" "}
            On most group-buy platforms, the card shows a discounted price,
            but that price is conditional — you only get it if the pool
            fills. When users noticed this at checkout, trust collapsed. The
            fix had to be further upstream: the discount should never look
            like a promise until it actually is one.
          </Body>

          <Body>
            <strong className="text-white">2. The pool status is buried.</strong>{" "}
            How many people have joined? How many more are needed? When does
            the pool close? These are the questions that decide whether a
            user commits, and they were routinely hidden behind a tap or shown
            only after add-to-cart. Users should see the pool state on the
            card, before they even click in.
          </Body>

          <Body>
            <strong className="text-white">3. Post-purchase is an afterthought.</strong>{" "}
            A pool either fills or it doesn't. Most platforms treat the
            "waiting" state as an edge case and ship generic order-confirmed
            screens. But for a collective buy, the waiting state is the
            product — that's where the shopper lives for hours or days. It
            needed its own design, not a fallback.
          </Body>
        </div>

        <Pullquote>
          "The price isn't a number on the card. It's a promise the platform
          can only keep if the community keeps it first. The design has to
          make that feel exciting, not scary."
        </Pullquote>
      </section>

      {/* ----------------- DESIGN APPROACH ----------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SectionLabel>Design Approach</SectionLabel>
        <H2>One metaphor, followed end to end</H2>

        <Lead>
          The principle I committed to early: pool progress should be the
          single most visible element on any Buzztro screen where a product
          exists. Not the discount, not the CTA, not the photo — the gauge.
        </Lead>

        <div className="mt-6 space-y-5">
          <Body>
            This sounds obvious in hindsight, but it wasn't the founder's
            starting instinct and it wasn't what most competitors were
            doing. Most group-buy platforms hero the discounted price and
            treat the pool as supporting information. I inverted it: the
            price is the consequence, the pool is the cause, and the cause
            should lead.
          </Body>

          <Body>
            Three design principles came out of that:
          </Body>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <p className="font-[Unbounded] text-sm font-bold text-indigo-400">
                01
              </p>
              <H3>Show the state, not the sell</H3>
              <Body>
                Every product surface shows pool progress first. Users
                always know where they stand before they see what it costs.
              </Body>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <p className="font-[Unbounded] text-sm font-bold text-indigo-400">
                02
              </p>
              <H3>Urgency without pressure</H3>
              <Body>
                No flashing timers, no red everything. Pool progress uses
                an amber timer badge and a yellow arc so it rewards, not
                stresses.
              </Body>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <p className="font-[Unbounded] text-sm font-bold text-indigo-400">
                03
              </p>
              <H3>Commit, don't transact</H3>
              <Body>
                Checkout language shifts from "Buy now" to "Join the price
                drop." Small, deliberate, and signals what the user is
                actually doing.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SOLUTION 1 — PRODUCT CARD ----------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SectionLabel>Solution 01</SectionLabel>
        <H2>The product card — pool progress as the primary signal</H2>

        <Body>
          The card is the workhorse of any e-commerce UI. On Buzztro, it had
          to carry three things a normal card doesn't: current pool fill,
          the conditional price it unlocks, and how close you are to that
          next price tier.
        </Body>

        <Body>
          I tested a few configurations — a circular progress ring, a stacked
          layout with the bar below the CTA, and a minimal variant that hid
          the progress until hover. The version that shipped places the
          current price prominently, a drop percentage indicator, and a
          compact progress bar. A "Prebook Now" CTA sits below, encouraging
          users to join without explaining the full mechanic — the PDP does
          that.
        </Body>

        <Body>
          The trade-off: cards became taller than a standard grid card by
          about 40px. I pushed back on the founder's first instinct to
          shrink them, because shrinking kills the thing the entire business
          model depends on. If the progress indicator isn't readable, the
          product isn't Buzztro anymore — it's a worse Amazon.
        </Body>

        <ImageSlot
          src="/buzztro/card-system.png"
          ratio="4/5"
          caption="Product card system — price drop states, progress indicators, and the yellow accent that signals active pools"
        />
      </section>

      {/* ----------------- SOLUTION 2 — PDP ----------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SectionLabel>Solution 02</SectionLabel>
        <H2>The product detail page — making the group mechanic the hero</H2>

        <Body>
          On a standard PDP, the hierarchy is: image, title, price, CTA,
          everything else. On Buzztro, "price" isn't a static value. I
          reworked the hierarchy into a three-column layout: product imagery
          on the left, product details and CTAs in the middle, and the
          circular progress gauge as the entire right column.
        </Body>

        <Body>
          The{" "}
          <strong className="text-white">circular progress gauge</strong>{" "}
          is the hero element — a large arc that fills with yellow as more
          buyers join the pool. Around the circle, price tiers are labeled
          (₹1,299 → ₹999 → ₹899 → ₹699), showing exactly where the
          current pool sits and what price unlocks next. The center displays
          the current price in bold, with a line underneath reading "4
          reservations left to ₹699!" This single component replaced
          paragraphs of explainer copy.
        </Body>

        <Pullquote>
          "The gauge was the moment the concept clicked. Before I drew it,
          we were writing paragraphs to explain group buying. After, we
          deleted most of that copy."
        </Pullquote>

        <Body>
          Below the fold, the PDP returns to familiar e-commerce patterns —
          image gallery with thumbnails, size and material selectors,
          expandable product description, and a "How it works" accordion.
          Once the user understands the mechanic, the rest of the experience
          should feel boringly familiar, because trust compounds on
          familiarity.
        </Body>

        <ImageSlot
          src="/buzztro/pdp-overview.png"
          ratio="16/9"
          caption="PDP Desktop — product imagery, circular gauge with price tiers, dual CTAs (Buy now vs. Join the price drop)"
        />

        <ImageSlot
          src="/buzztro/pdp-mobile.png"
          ratio="4/5"
          caption="PDP Mobile — stacked layout with gauge below product info, prebook CTA at bottom"
        />

        <ImageSlot
          src="/buzztro/pdp-states.png"
          ratio="16/9"
          caption="The circular gauge across states — price tier progression as the pool fills from 0% to 100%"
        />
      </section>

      {/* ----------------- SOLUTION 3 — BOOKING CHECKOUT ----------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SectionLabel>Solution 03</SectionLabel>
        <H2>Booking checkout — making commitment feel different from transaction</H2>

        <Body>
          The booking checkout is Buzztro's signature flow. Users aren't
          buying the product yet — they're reserving a spot in the pool with
          a small booking amount (₹100). The checkout shows the product with
          its current gauge progress (60% filled), the booking amount with
          quantity controls, and a clear 4-step "How Price Drop Works"
          explainer.
        </Body>

        <Body>
          That explainer was the single most reviewed piece of content in
          the project. Four steps: Start by pre-booking → Pay a fractional
          amount beforehand → Order Prebooked → Order Placed when lowest
          price is reached. If it was confusing, the entire trust story fell
          apart. We iterated the language three times before it tested clean.
        </Body>

        <Body>
          The CTA reads "PAY ₹100" — not "Place order" or "Confirm." It
          names the exact commitment. Below it, a note about using Buzztro
          Wallet balance for partial payment adds a retention hook without
          feeling manipulative.
        </Body>

        <ImageSlot
          src="/buzztro/booking-checkout-desktop.png"
          ratio="16/9"
          caption="Booking Checkout — Desktop. Product with gauge, booking amount, and the 4-step explainer that replaced paragraphs of copy."
        />

        <ImageSlot
          src="/buzztro/booking-checkout-mobile.png"
          ratio="4/5"
          caption="Booking Checkout — Mobile. Same information density, stacked vertically with the explainer steps prominent."
        />
      </section>

      {/* ----------------- SOLUTION 4 — ORDER CHECKOUT ----------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SectionLabel>Solution 04</SectionLabel>
        <H2>Order checkout — a flow that earns trust at every step</H2>

        <Body>
          When the pool reaches its target, users complete their purchase
          through a more traditional checkout. The flow supports both guest
          and returning users, with saved address selection via a modal
          overlay.
        </Body>

        <Body>
          The order summary sits on the right throughout, showing the
          product, quantity, booking amount already paid, delivery charges,
          and the final total. Payment supports both COD and online, with
          the green "PAY" CTA anchored at the bottom. The Buzztro-specific
          addition: a note about wallet balance from previous bookings that
          can offset the total.
        </Body>

        <Body>
          The confirmation screen splits into two variants: "Payment
          Successful" for direct purchases, and "Booking Successful" for
          pre-booked orders. Both show a clear summary with order ID,
          amount, date, and payment method — but the booking variant
          includes a "My Bookings" link instead of "Order Details,"
          directing users to the right section of their account.
        </Body>

        <ImageSlot
          src="/buzztro/checkout-address.png"
          ratio="16/9"
          caption="Step 1 — Address selection with saved addresses and order summary sidebar."
        />

        <ImageSlot
          src="/buzztro/checkout-payment.png"
          ratio="16/9"
          caption="Step 2 — Payment methods (COD + Online) with wallet balance integration."
        />

        <ImageSlot
          src="/buzztro/checkout-confirmation.png"
          ratio="16/9"
          caption="Confirmation — Payment Successful and Booking Successful variants."
        />
      </section>

      {/* ----------------- SOLUTION 5 — POST-PURCHASE ----------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SectionLabel>Solution 05</SectionLabel>
        <H2>The waiting state — designed as a product, not an edge case</H2>

        <Body>
          This was the section I spent the most time on relative to how
          little attention it gets in typical e-commerce work. Between
          "payment complete" and "order shipped," a Buzztro customer lives
          in a waiting state that can last hours or days. If that waiting
          state feels empty, users assume something broke. If it feels
          alive, they tell friends.
        </Body>

        <Body>
          The order waiting screen shows the live pool fill as a progress
          bar with "80% filled · 4 more people needed," a price breakdown
          showing current price vs. target price and potential savings, and
          a prominent "Share to fill the pool faster" CTA. That share
          action isn't a growth hack bolted on — it's the most useful thing
          a user can actually do in that moment.
        </Body>

        <Body>
          Below the share CTA, a single sentence does critical trust work:
          "If the pool doesn't fill, your ₹899 is refunded automatically."
          No asterisks, no terms-and-conditions link. Just the promise.
        </Body>

        <ImageSlot
          src="/buzztro/order-waiting.png"
          ratio="16/9"
          caption="Waiting state — pool progress, price breakdown, share CTA, and the refund guarantee that prevents anxiety."
        />

        <Body>
          The order details screen for completed purchases shows the full
          journey: product details, shipping address, a step-by-step order
          status tracker (Placed → Processing → Shipped → Delivered), and
          a detailed payment breakdown with item price, taxes, shipping,
          and total.
        </Body>

        <ImageSlot
          src="/buzztro/order-details.png"
          ratio="16/9"
          caption="Order Details — complete order summary with status tracking and payment breakdown."
        />
      </section>

      {/* ----------------- DESIGN SYSTEM ----------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SectionLabel>Design System</SectionLabel>
        <H2>A small, consistent set of tokens</H2>

        <Body>
          The scope didn't call for a full design system, but 40+ screens
          without one would have collapsed under the first round of
          changes. I set up the essentials: a color scale anchored by
          Buzztro yellow (#FDB801) for active states and green (#249B3E)
          for CTAs and success, a type ramp using Plus Jakarta Sans for
          body and Poppins for display, spacing tokens, and reusable
          components for the progress gauge, product cards, checkout
          summary, and form inputs.
        </Body>

        <Body>
          The discipline paid off twice. Once during the build, when the
          developer could reuse components without asking questions. And
          again in the final week, when the founder requested a
          last-minute category page that I was able to assemble in an
          afternoon because every piece already existed.
        </Body>

        <ImageSlot
          src="/buzztro/design-system.png"
          ratio="16/9"
          caption="Color palette, type ramp, and the reusable components — gauge, cards, buttons, inputs, checkout summary"
        />
      </section>

      {/* ----------------- REFLECTION ----------------- */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <SectionLabel>Reflection</SectionLabel>
        <H2>What I took away</H2>

        <Lead>
          Buzztro was the first project where I owned every screen of a
          shipped product from zero. Two months, one designer, one
          founder, no safety net.
        </Lead>

        <div className="mt-6 space-y-5">
          <Body>
            <strong className="text-white">
              Pick the one idea and follow it everywhere.
            </strong>{" "}
            The circular progress gauge wasn't just a component — it was
            the thesis of the entire product. Once I committed to making it
            the primary signal on every surface, every other decision got
            easier. Hierarchy questions became "does this compete with the
            gauge?" Copy questions became "does this explain the gauge or
            distract from it?" A single strong principle resolves a
            hundred small debates.
          </Body>

          <Body>
            <strong className="text-white">
              Novelty only where it earns its place.
            </strong>{" "}
            Buzztro is a new kind of shopping, but most of the PDP still
            looks like a normal PDP. That was deliberate. Users already
            know how to buy things online — I didn't need to reinvent
            image galleries or size selectors. I needed to make the one
            new thing understandable and trustworthy. Everything else
            should feel boringly familiar, because trust compounds on
            familiarity.
          </Body>

          <Body>
            <strong className="text-white">
              The post-purchase state is the product.
            </strong>{" "}
            I nearly made the mistake of treating the waiting state as an
            edge case. It would have been the biggest miss in the project.
            For a platform where the purchase is conditional, the hours or
            days after checkout are where the actual experience lives —
            and where the user either becomes a repeat customer or writes
            a one-star review.
          </Body>

          <Body>
            <strong className="text-white">
              Working directly with a founder is fast and unforgiving.
            </strong>{" "}
            There's no PM layer to translate, no design review committee
            to negotiate with. Decisions happen in minutes and ship in
            days. That's a gift when you've done the thinking and a trap
            when you haven't. I learned to front-load the reasoning —
            competitor teardowns, pattern references, explicit trade-offs
            — so that when it was time to decide, we were deciding on
            substance, not taste.
          </Body>
        </div>

        <H3>If I had more time</H3>
        <Body>
          The onboarding flow never got the attention it deserved. A
          first-time user lands on a product page and has to infer the
          entire mechanic from the gauge — which works for attentive
          shoppers and fails everyone else. A proper first-run explainer,
          ideally woven into the first PDP visit rather than a blocking
          modal, was the first thing on the v2 list.
        </Body>
        <Body>
          The other gap was social proof in the waiting state. Showing
          who else had joined the pool — even just avatars and city names
          — would have turned the waiting screen from a solo moment into
          a shared one, which is the whole point of collective buying.
        </Body>
      </section>

      {/* ----------------- FOOTER META ----------------- */}
      <section className="mx-auto max-w-3xl border-t border-white/10 px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-[Aileron] text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Tools
            </p>
            <p className="mt-2 font-[Aileron] text-sm text-white/80">
              Figma, Photoshop, Whimsical
            </p>
          </div>
          <div>
            <p className="font-[Aileron] text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Scope
            </p>
            <p className="mt-2 font-[Aileron] text-sm text-white/80">
              40+ screens · End-to-end flow
            </p>
          </div>
          <div>
            <p className="font-[Aileron] text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Status
            </p>
            <p className="mt-2 font-[Aileron] text-sm text-white/80">
              Shipped to production
            </p>
          </div>
        </div>

        <a
          href="https://www.figma.com/design/T4xn1kOKZ9YKSSrnSS6Kcb/Buzztro-PDP"
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-2 font-[Aileron] text-sm text-indigo-400 transition-colors hover:text-indigo-300"
        >
          View the Figma file
          <ExternalLink className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}
