import { useState } from "react";

// ─── EDDY OUT BRAND PALETTE (matched from eddyoutenv.com) ───────────────────
const C = {
  darkGreen:  "#2C4A2E",
  midGreen:   "#3D6B40",
  sage:       "#5C8A5F",
  lightSage:  "#8AB88D",
  mint:       "#B5D4B7",
  cream:      "#F5F1E8",
  offWhite:   "#FAF8F3",
  sand:       "#EDE8DC",
  tan:        "#D4C9B0",
  gold:       "#C9A84C",
  rust:       "#A85C38",
  charcoal:   "#2A2A2A",
  textMed:    "#444",
  textLight:  "#666",
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const graCategories = [
  {
    name: "Energy",
    icon: "⚡",
    color: C.rust,
    examples: ["ENERGY STAR appliances", "LED lighting switchover", "Smart thermostats & HVAC optimization", "Renewable energy sourcing or solar"],
    whyItMatters: "Typically the highest-cost and highest-impact category for most restaurants.",
    trackingTip: "Start by pulling 3 months of utility bills — we'll use those to establish a baseline and identify which equipment is driving cost.",
  },
  {
    name: "Water",
    icon: "💧",
    color: "#4a6a8a",
    examples: ["Low-flow pre-rinse spray valves", "High-efficiency dishwashers", "Leak detection & repair program", "Water-efficient ice machines"],
    whyItMatters: "Small operational changes here often pay for themselves within months.",
    trackingTip: "A water bill and a walk-through of your fixtures is all we need. If you already have low-flow hardware, we'll document the model numbers for GRA.",
  },
  {
    name: "Waste",
    icon: "♻️",
    color: C.midGreen,
    examples: ["Food waste tracking & composting", "Recycling program implementation", "Surplus food donation program", "Cooking oil recycling"],
    whyItMatters: "Strong overlap with cost savings — less wasted food = lower food cost.",
    trackingTip: "Even a rough estimate of your compost or recycling haul frequency is a great start. We'll set up a simple weekly log that takes under 5 minutes.",
  },
  {
    name: "Reusables & Disposables",
    icon: "🥡",
    color: "#7a6a3a",
    examples: ["Compostable to-go containers", "Reusable serviceware programs", "Eliminating single-use plastics", "Sustainable packaging sourcing"],
    whyItMatters: "High visibility to customers — they notice what you hand them.",
    trackingTip: "Hold onto a recent packaging invoice or supplier order. We'll review what you're using and note what's already compostable or reusable for GRA documentation.",
  },
  {
    name: "Chemicals & Pollution",
    icon: "🧪",
    color: "#6a4a7a",
    examples: ["Green-certified cleaning products", "Integrated pest management", "Grease trap maintenance", "Non-toxic sanitizers"],
    whyItMatters: "Protects staff health and the local watershed — a big deal near Bozeman's waterways.",
    trackingTip: "A list of your current cleaning and sanitizing products is the starting point. Brands, product names, or Safety Data Sheets all work. We'll cross-reference against GRA's approved list.",
  },
  {
    name: "Food",
    icon: "🥕",
    color: "#8a5a2a",
    examples: ["Local & regional sourcing", "Organic & sustainable ingredients", "Plant-forward menu options", "Sustainable seafood choices"],
    whyItMatters: "Bozeman restaurants already lead here — this is where most of you get your points.",
    trackingTip: "A list of your current suppliers — even just their names and what you buy — is enough to start. We'll map out what's local, organic, or sustainable and quantify it for GRA.",
  },
  {
    name: "Building & Furnishing",
    icon: "🏗️",
    color: "#4a5a6a",
    examples: ["Reclaimed or FSC-certified materials", "Low-VOC paints & finishes", "Energy-efficient windows", "Green construction practices"],
    whyItMatters: "Applies primarily to buildouts and renovations — great for growing restaurants.",
    trackingTip: "If you've done any recent renovations, receipts or contractor notes help. Even knowing you used reclaimed wood or low-VOC paint is worth documenting — that's points.",
  },
  {
    name: "Education & Transparency",
    icon: "📋",
    color: C.darkGreen,
    examples: ["Staff sustainability training", "Public sustainability reporting", "Menu sustainability messaging", "Community engagement programs"],
    whyItMatters: "Often the easiest points to earn — and the most visible to your guests.",
    trackingTip: "If you already talk about sourcing on your menu or train staff on sustainability, that counts. We'll help you write it up in the format GRA needs — it's usually just a short description.",
  },
];

const badges = [
  { name: "Zero Waste", icon: "🗑️", desc: "Diverts 90%+ of waste from landfill through composting, recycling, and donation." },
  { name: "Clean Chemicals", icon: "🧴", desc: "Uses only green-certified cleaning and sanitizing products." },
  { name: "Vegan", icon: "🌱", desc: "100% plant-based menu with no animal products." },
  { name: "Vegetarian", icon: "🥗", desc: "100% vegetarian menu with no meat or fish." },
  { name: "Sustainable Seafood", icon: "🐟", desc: "All seafood sourced from sustainable, certified fisheries." },
  { name: "SustainaBuild™", icon: "🏛️", desc: "Building and furnishings meet GRA's green construction standards." },
];

const certLevels = [
  { level: "1 Star", points: "100+", color: C.lightSage, text: C.darkGreen },
  { level: "2 Stars", points: "175+", color: C.sage, text: "#fff" },
  { level: "3 Stars", points: "250+", color: C.midGreen, text: "#fff" },
  { level: "4 Stars", points: "350+", color: C.darkGreen, text: "#fff" },
];

const wasteSteps = [
  { step: "1", title: "Waste Audit", desc: "We weigh and categorize your kitchen's waste over 1–2 weeks. Food scraps, packaging, recyclables, cooking oil — everything gets counted.", action: "Baseline established", trackingTip: "Already keeping any kind of waste log? Even rough estimates or haul receipts are a great head start — bring whatever you have." },
  { step: "2", title: "FIFO & Inventory Review", desc: "First In, First Out inventory practices reduce spoilage. We review ordering volumes, storage, and prep yields to cut waste before it happens.", action: "Prevention plan", trackingTip: "If you're already doing FIFO, that's a certification-ready practice — we just need to document that it's a formal, trained procedure in your kitchen." },
  { step: "3", title: "Composting Setup", desc: "We connect you with Gallatin Valley composting services and set up back-of-house separation. Montana has no state mandate, but your GRA score rewards it.", action: "Composting active", trackingTip: "Already composting? Excellent. We'll need your hauler's name, pickup frequency, and an estimate of volume per week. A haul receipt works perfectly." },
  { step: "4", title: "Donation Program", desc: "Surplus edible food goes to local food banks or organizations instead of the bin. Federal liability protection and tax deductions apply.", action: "Donation active", trackingTip: "Already donating? Make sure you're getting written receipts from the recipient organization — that's what unlocks the federal tax deduction under IRC §170(e)(3)." },
  { step: "5", title: "Recycling & Oil Recovery", desc: "Cardboard, glass, aluminum, cooking oil — we set up hauler relationships and staff protocols for full material recovery.", action: "Full diversion", trackingTip: "If you're already recycling cardboard or using an oil pickup service, note which hauler and roughly how often. That data directly earns GreenPoints™." },
  { step: "6", title: "Document & Certify", desc: "We compile your diversion rates, tonnage, and programs into GRA-ready documentation. This is the paperwork that earns GreenPoints™.", action: "GRA ready", trackingTip: "This is where everything you've been doing quietly pays off publicly. We turn your practices into a formal record the GRA can score." },
];

const incentives = [
  {
    category: "Federal – Food Donation",
    color: C.darkGreen,
    items: [
      {
        name: "Enhanced Food Donation Deduction (IRC §170(e)(3))",
        desc: "Restaurants can deduct up to twice the cost basis of donated food inventory — for example, food costing $100 to produce can yield up to a $200 deduction. Available to all business types (C-corps, S-corps, LLCs, sole props). Applies to donations to qualified 501(c)(3) organizations.",
        type: "Tax Deduction",
      },
      {
        name: "Bill Emerson Good Samaritan Food Donation Act",
        desc: "Federal liability protection for restaurants that donate food in good faith to nonprofits. All 50 states honor it. No legal exposure for good-faith donations that meet health standards. Removes the biggest barrier to restaurant food donation.",
        type: "Liability Protection",
      },
    ],
  },
  {
    category: "Federal – Energy & Building",
    color: C.midGreen,
    items: [
      {
        name: "Section 179D Commercial Building Energy Deduction",
        desc: "Tax deduction for commercial buildings that meet energy reduction requirements — up to $5 per sq. ft. Applies to lighting, HVAC, and building envelope improvements. Relevant for restaurant buildouts and significant energy upgrades.",
        type: "Tax Deduction",
      },
      {
        name: "Solar Investment Tax Credit (ITC)",
        desc: "30% federal tax credit on the cost of solar panel installation for commercial properties. Montana averages 5 hours of daily sunlight — solar is viable and well-supported. Pairs directly with GRA's Energy category points.",
        type: "Tax Credit",
      },
    ],
  },
  {
    category: "Montana – State Programs",
    color: C.sage,
    items: [
      {
        name: "Alternative Energy Revolving Loan Program",
        desc: "Low-interest loans up to $40,000 for Montana small businesses installing alternative energy or conservation systems. Fixed interest rates, up to 10-year repayment. Administered by the Montana Department of Environmental Quality.",
        type: "Low-Interest Loan",
      },
      {
        name: "Commercial Property Assessed Clean Energy (C-PACE)",
        desc: "Montana's C-PACE program finances energy efficiency and renewable energy improvements for commercial properties. Repaid through a property assessment — no upfront capital required. Available to restaurant owners who own their building.",
        type: "Financing Program",
      },
    ],
  },
  {
    category: "Important Note",
    color: C.tan,
    isNote: true,
    note: "Montana no longer offers state-level income tax credits specifically for energy upgrades. Federal programs are currently the primary source of financial incentives. We stay current on these programs and will identify every applicable incentive for your specific operation as part of our engagement.",
  },
];

const tiers = [
  {
    name: "Baseline Assessment",
    icon: "🌱",
    price: "$800 – $1,200",
    tagline: "Know where you stand",
    desc: "Not ready to commit to full certification? That's fine. Start here. We come to you, look at everything honestly, and give you a real picture of your sustainability baseline and what certification would take.",
    deliverables: [
      "Full on-site audit across all 8 GRA categories",
      "Written gap analysis report with GreenPoints™ estimate",
      "Waste baseline assessment (volumes by category)",
      "Prioritized action roadmap — highest impact, lowest cost first",
      "1-hour findings conversation with your team",
    ],
    outcome: "You'll know exactly where you stand and what's possible.",
  },
  {
    name: "Certification Path",
    icon: "🌿",
    price: "$2,200 – $3,500",
    tagline: "Let's get you certified",
    featured: true,
    desc: "We handle the full GRA certification process alongside you — the planning, the waste programs, the vendor sourcing, the paperwork, and the application. You run your restaurant.",
    deliverables: [
      "Everything in Baseline Assessment",
      "Custom waste reduction plan (composting, donation, recycling)",
      "Staff sustainability training session",
      "Local Bozeman vendor & supplier recommendations",
      "Full GRA application prep and submission support",
      "Two follow-up visits during implementation",
    ],
    outcome: "Certified Green Restaurant® status, documented and submitted.",
  },
  {
    name: "Certify & Grow",
    icon: "🌾",
    price: "$4,500 – $6,500",
    tagline: "Turn it into real impact",
    desc: "Certification is only valuable if people know about it. This package takes you through the full process and then helps you turn that credential into customers, press, and community recognition.",
    deliverables: [
      "Everything in Certification Path",
      "End-to-end GRA certification management",
      "Marketing toolkit — window signage, social graphics, menu badge",
      "Press release + Bozeman media outreach",
      "Customer engagement campaign",
      "6-month post-certification check-in & progress report",
    ],
    outcome: "Certified, visible, and growing a loyal sustainability-conscious customer base.",
  },
];

const process = [
  { n: "01", t: "We Talk", d: "Free 30-minute call. No pitch, no pressure. We want to hear about your restaurant — what you're already doing, what matters to you, what's realistic." },
  { n: "02", t: "We Visit", d: "On-site audit across all 8 GRA categories plus a waste walkthrough. We see the kitchen, the loading dock, the supply orders — everything." },
  { n: "03", t: "We Report", d: "Within one week you have a clear written report: your GreenPoints™ estimate, your strongest areas, your gaps, and a roadmap that's specific to your operation." },
  { n: "04", t: "We Improve", d: "We work alongside your team — waste programs, supplier swaps, staff training, documentation. You're never left to figure it out alone." },
  { n: "05", t: "We Certify", d: "We manage the GRA application from start to finish. You sign off; we handle the details." },
  { n: "06", t: "We Celebrate", d: "Then we help you tell that story — to your customers, your community, and the Bozeman press." },
];

// ─── APP ─────────────────────────────────────────────────────────────────────

// ─── ALREADY DOING COMPONENT ─────────────────────────────────────────────────
function AlreadyDoing({ category, trackingTip }) {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{
      background: checked ? `${C.midGreen}18` : `${C.gold}12`,
      border: `1px solid ${checked ? C.lightSage : C.gold}55`,
      borderRadius: 8,
      padding: "12px 14px",
      marginTop: 12,
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
    }}>
      <button
        onClick={() => setChecked(!checked)}
        style={{
          width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 1,
          border: `2px solid ${checked ? C.midGreen : C.gold}`,
          background: checked ? C.midGreen : "transparent",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, color: "#fff", fontWeight: 700,
        }}
      >{checked ? "✓" : ""}</button>
      <div style={{ flex: 1 }}>
        <p className="dm" style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 500, color: checked ? C.darkGreen : "#7a6010" }}>
          {checked ? `Nice — you're already doing this in ${category}.` : `Already doing some of this in ${category}?`}
        </p>
        <p className="dm" style={{ margin: 0, fontSize: 12, color: C.textMed, lineHeight: 1.6, fontWeight: 300 }}>
          {checked
            ? `That's great news — and it counts. ${trackingTip}`
            : `Check the box if you are. That's the starting point. ${trackingTip}`}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("overview");
  const [openCat, setOpenCat] = useState(null);
  const [openIncentive, setOpenIncentive] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const tabs = [
    { id: "overview",    label: "Overview" },
    { id: "whoWeAre",    label: "Who We Are" },
    { id: "gra",         label: "GRA Certification" },
    { id: "waste",       label: "Waste Roadmap" },
    { id: "incentives",  label: "Financial Incentives" },
    { id: "services",    label: "Services & Pricing" },
    { id: "contact",     label: "Contact" },
  ];

  const faqs = [
    { q: "We already source locally and compost. Are we close?", a: "You're probably closer than you think — and that's our favorite kind of conversation to have. Local sourcing and composting are two of the most impactful GRA categories. We'll audit what you have, estimate your GreenPoints™, and tell you honestly what gap remains. Many Bozeman restaurants are 1–2 operational changes away from 1-Star certification." },
    { q: "Do we have to spend money on equipment or renovations?", a: "Rarely, and never as a prerequisite. The GRA system is points-based — there are many paths to certification. We identify the highest-impact, lowest-cost improvements specific to your restaurant. Most clients certify through operational and procurement changes alone." },
    { q: "How long does certification take?", a: "Typically 3–6 months from first audit to certified status. It depends on your starting point and how quickly changes can be implemented. We keep the process moving and do the heavy lifting so you're not stuck on paperwork." },
    { q: "What financial benefits are actually available to us?", a: "The most concrete near-term benefit for most restaurants is the enhanced food donation tax deduction (IRC §170(e)(3)) — up to 2x the cost basis of donated food inventory. Energy upgrades may qualify for the federal Section 179D deduction or the Montana C-PACE financing program. We review all applicable incentives for your specific operation as part of our engagement." },
    { q: "Is there a Bozeman-specific certification?", a: "Not yet — but it's something we're actively developing. A Bozeman Sustainable Dining designation would complement GRA certification with local visibility and community map placement. If you're interested in being part of shaping that, let us know." },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.offWhite, color: C.charcoal, minHeight: "100vh" }}>
      <style>{`
        
        * { box-sizing: border-box; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .pf { font-family: 'Playfair Display', Georgia, serif; }
        .card { transition: box-shadow .18s, transform .18s; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.09); }
        .tab-btn { background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .acc-btn { width: 100%; background: none; border: none; cursor: pointer; text-align: left; padding: 0; font-family: 'DM Sans', sans-serif; }
        .pill { display:inline-block; border-radius:20px; padding:3px 12px; font-size:11px; font-weight:600; font-family:'DM Sans',sans-serif; }
      `}</style>

      {/* TOP NAV */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${C.tan}`, padding: "12px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>🌿</span>
        <span className="dm" style={{ fontWeight: 800, fontSize: 20, color: C.darkGreen, letterSpacing: "-0.02em" }}>Green Forks</span>
        <span className="dm" style={{ fontSize: 14, color: C.sage, fontWeight: 500 }}>by Eddy Out</span>
        <span className="dm" style={{ fontSize: 12, color: C.textLight, marginLeft: 2 }}>· Sustainability Consulting · Bozeman, MT</span>
      </div>

      {/* HERO */}
      <div style={{ background: C.darkGreen, padding: "72px 24px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 25% 70%, ${C.midGreen}55 0%, transparent 55%), radial-gradient(ellipse at 75% 20%, ${C.sage}33 0%, transparent 50%)` }} />
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
          <p className="dm" style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.lightSage, marginBottom: 20, fontWeight: 600 }}>
            Green Forks by Eddy Out · Bozeman, Montana
          </p>
          <h1 className="dm" style={{ fontSize: "clamp(28px, 5vw, 50px)", fontWeight: 800, color: C.cream, margin: "0 0 18px", lineHeight: 1.15 }}>
            You're already doing the work.<br />
            <em style={{ color: C.mint }}>Let's get you recognized for it.</em>
          </h1>
          <p className="dm" style={{ fontSize: 16, lineHeight: 1.8, color: "#b8d4c0", maxWidth: 520, margin: "0 auto 36px", fontWeight: 300 }}>
            We are Eddy Out Sustainability Consulting — an independent consultancy born and built in Bozeman. We help local restaurants earn Green Restaurant Association certification and access the financial incentives that come with it, at a price that actually makes sense.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {["Built in Bozeman", "By Eddy Out LLC", "GRA Certification Support", "Flat-Rate Pricing"].map(t => (
              <span key={t} className="dm" style={{ background: "#ffffff15", border: `1px solid #ffffff25`, borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "#d4ead9", fontWeight: 400 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* RECOGNITION BAND */}
      <div style={{ background: C.sand, borderBottom: `1px solid ${C.tan}`, padding: "28px 24px", textAlign: "center" }}>
        <p className="dm" style={{ fontSize: 17, fontStyle: "italic", color: C.darkGreen, margin: "0 0 8px", fontWeight: 400, lineHeight: 1.65 }}>
          "Bozeman's restaurant community is already leading on sustainability — farm-to-table sourcing, composting, community partnerships, local supply chains. We exist to help you document it, formalize it, and get the recognition you deserve."
        </p>
        <p className="dm" style={{ fontSize: 13, color: C.textLight, margin: 0 }}>— Garrett Wright, Principal Consultant</p>
      </div>

      {/* TAB NAV */}
      <nav style={{ background: C.darkGreen, borderBottom: `2px solid ${C.midGreen}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px", display: "flex", overflowX: "auto" }}>
          {tabs.map(t => (
            <button key={t.id} className="tab-btn" onClick={() => setTab(t.id)} style={{
              color: tab === t.id ? C.gold : "#a0c4ae",
              borderBottom: tab === t.id ? `2px solid ${C.gold}` : "2px solid transparent",
              padding: "13px 16px",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              transition: "color .2s",
            }}>{t.label}</button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── WHO WE ARE ── */}
        {tab === "whoWeAre" && (
          <div>
            <SH title="Who We Are" sub="Eddy Out Sustainability Consulting is a locally-owned firm dedicated to helping Bozeman's restaurant community document and formalize their sustainability practices." />

            <div style={{ marginTop: 28, background: `${C.midGreen}15`, border: `1px solid ${C.lightSage}`, borderRadius: 10, padding: "20px 24px" }}>
              <p className="dm" style={{ margin: 0, fontSize: 14, color: C.darkGreen, lineHeight: 1.8, fontWeight: 300 }}>
                We understand Bozeman's restaurant scene. Our team brings experience in sustainability consulting, local sourcing, and the Green Restaurant Association certification process. We're here to help you turn what you're already doing into formal, recognized, credentialed certification — and to identify the financial incentives available along the way.
              </p>
            </div>

            <div style={{ marginTop: 32 }}>
              <h3 className="dm" style={{ fontSize: 22, fontWeight: 700, color: C.darkGreen, marginBottom: 20 }}>Our Team</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                {[
                  {
                    name: "Garrett Wright",
                    title: "Principal Consultant",
                    email: "garrett@eddyoutenv.com",
                    icon: "👨‍💼",
                    bio: "Garrett leads Eddy Out's restaurant sustainability consulting practice. He works with Bozeman restaurants to map their GRA certification path, optimize waste reduction, and access federal and state sustainability incentives.",
                  },
                  {
                    name: "Hazel Baur",
                    title: "Sustainability Consultant",
                    email: "hazel@eddyoutenv.com",
                    icon: "👩‍💼",
                    bio: "Hazel specializes in waste audits, supplier sourcing, and GRA documentation. She brings hands-on experience from the local food and composting sectors and knows Bozeman's restaurant community.",
                  },
                ].map((member, i) => (
                  <div key={i} style={{ background: "#fff", border: `1px solid ${C.tan}`, borderRadius: 12, padding: "24px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>{member.icon}</div>
                    <h4 className="dm" style={{ fontSize: 18, fontWeight: 700, color: C.darkGreen, margin: "0 0 3px" }}>{member.name}</h4>
                    <p className="dm" style={{ fontSize: 13, color: C.sage, margin: "0 0 12px", fontWeight: 500 }}>{member.title}</p>
                    <p className="dm" style={{ fontSize: 13, color: C.textMed, lineHeight: 1.6, margin: "0 0 14px", fontWeight: 300 }}>{member.bio}</p>
                    <div style={{ borderTop: `1px solid ${C.tan}`, paddingTop: 12, marginTop: 14 }}>
                      <a href={`mailto:${member.email}`} style={{ color: C.midGreen, textDecoration: "none", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{member.email}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 32, background: C.darkGreen, borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
              <h3 className="dm" style={{ fontSize: 20, fontWeight: 700, color: C.cream, margin: "0 0 10px" }}>Built in Bozeman, for Bozeman</h3>
              <p className="dm" style={{ fontSize: 14, color: "#b8d4c0", lineHeight: 1.7, fontWeight: 300, margin: "0 0 10px" }}>
                Eddy Out Sustainability Consulting is locally owned and operated. We eat at local restaurants, we shop at local farmers markets, and we're invested in Bozeman's food community. That's not just marketing — it shapes how we work.
              </p>
              <p className="dm" style={{ fontSize: 13, color: C.lightSage, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                eddyoutenv.com · Bozeman, Montana
              </p>
            </div>
          </div>
        )}

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div>
            <SH title="What We Do" sub="A straightforward, local approach to sustainability certification." />

            <div style={{ marginTop: 24, background: `${C.midGreen}15`, border: `1px solid ${C.lightSage}`, borderRadius: 10, padding: "16px 20px" }}>
              <p className="dm" style={{ margin: 0, fontSize: 14, color: C.darkGreen, lineHeight: 1.8 }}>
                <strong>Chances are, you're already doing a lot of this.</strong> Bozeman restaurants have been composting, sourcing locally, and cutting waste long before it was a marketing trend. Green Fork's job isn't to tell you what to do — it's to look at what you're already doing, help you track it in a way that makes sense for your operation, and turn it into a formal certification that your customers and community can recognize.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginTop: 24 }}>
              {[
                { icon: "🏔️", t: "We're from here", d: "Green Fork is a service of Eddy Out, built right here in Bozeman. We know the local farms, the suppliers, the community, and what sustainability actually looks like in a Montana kitchen." },
                { icon: "📋", t: "GRA expertise", d: "We guide you through every step of Green Restaurant Association certification — the gold standard for food service sustainability since 1990." },
                { icon: "♻️", t: "Waste reduction first", d: "We build practical waste reduction plans that reduce your costs and earn you the GreenPoints™ needed for certification." },
                { icon: "💰", t: "Real financial returns", d: "From food donation tax deductions to Montana energy financing programs, we identify every financial incentive available to your operation." },
              ].map((w, i) => (
                <div key={i} className="card" style={{ background: "#fff", border: `1px solid ${C.tan}`, borderRadius: 10, padding: "22px 18px" }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{w.icon}</div>
                  <h3 className="dm" style={{ fontSize: 14, fontWeight: 600, margin: "0 0 6px", color: C.darkGreen }}>{w.t}</h3>
                  <p className="dm" style={{ fontSize: 13, lineHeight: 1.65, color: C.textLight, margin: 0, fontWeight: 300 }}>{w.d}</p>
                </div>
              ))}
            </div>

            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 32 }}>
              {[
                { stat: "8", label: "GRA certification categories we assess" },
                { stat: "4", label: "Certification levels you can achieve" },
                { stat: "6", label: "Specialty badges including Vegan & Zero Waste" },
                { stat: "2×", label: "Food cost basis you can deduct when donating surplus" },
              ].map((s, i) => (
                <div key={i} style={{ background: C.darkGreen, borderRadius: 10, padding: "20px 16px", textAlign: "center" }}>
                  <div className="dm" style={{ fontSize: 38, fontWeight: 800, color: C.gold, lineHeight: 1, marginBottom: 6 }}>{s.stat}</div>
                  <p className="dm" style={{ fontSize: 12, color: C.mint, margin: 0, lineHeight: 1.5, fontWeight: 300 }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Process */}
            <div style={{ marginTop: 40 }}>
              <h3 className="dm" style={{ fontSize: 22, fontWeight: 700, color: C.darkGreen, marginBottom: 20 }}>How it works</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {process.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 18, position: "relative" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div className="dm" style={{ width: 36, height: 36, borderRadius: "50%", background: i < 2 ? C.darkGreen : i < 4 ? C.midGreen : C.gold, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 }}>{p.n}</div>
                      {i < process.length - 1 && <div style={{ width: 1, flexGrow: 1, background: C.tan, minHeight: 24 }} />}
                    </div>
                    <div style={{ paddingBottom: 22, paddingTop: 6 }}>
                      <h4 className="dm" style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: C.darkGreen }}>{p.t}</h4>
                      <p className="dm" style={{ margin: 0, fontSize: 13, color: C.textMed, lineHeight: 1.6, fontWeight: 300 }}>{p.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div style={{ marginTop: 40 }}>
              <h3 className="dm" style={{ fontSize: 22, fontWeight: 700, color: C.darkGreen, marginBottom: 16 }}>Questions we hear from Bozeman restaurants</h3>
              {faqs.map((f, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${C.tan}` }}>
                  <button className="acc-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ padding: "16px 0", display: "flex", justifyContent: "space-between", gap: 14, alignItems: "center" }}>
                    <span className="dm" style={{ fontSize: 14, fontWeight: 500, color: C.darkGreen, lineHeight: 1.4 }}>{f.q}</span>
                    <span style={{ fontSize: 20, color: C.sage, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform .2s", display: "inline-block" }}>+</span>
                  </button>
                  {openFaq === i && <p className="dm" style={{ margin: "0 0 16px", fontSize: 13, lineHeight: 1.75, color: C.textMed, fontWeight: 300 }}>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── GRA CERTIFICATION ── */}
        {tab === "gra" && (
          <div>
            <SH title="GRA Certification Framework" sub="The Green Restaurant Association has been greening restaurants since 1990. Here's exactly what they measure — and how we help you score in each area." />

            {/* Certification levels */}
            <div style={{ marginTop: 28 }}>
              <h3 className="dm" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.sage, marginBottom: 14 }}>Four Certification Levels</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {certLevels.map((l, i) => (
                  <div key={i} style={{ background: l.color, borderRadius: 8, padding: "16px 12px", textAlign: "center" }}>
                    <div className="dm" style={{ fontSize: 22, color: l.text, marginBottom: 4 }}>{"⭐".repeat(i + 1)}</div>
                    <div className="dm" style={{ fontSize: 13, fontWeight: 600, color: l.text, marginBottom: 2 }}>{l.level}</div>
                    <div className="dm" style={{ fontSize: 11, color: l.text, opacity: 0.85 }}>{l.points} GreenPoints™</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialty badges */}
            <div style={{ marginTop: 28 }}>
              <h3 className="dm" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.sage, marginBottom: 14 }}>Six Specialty Badges</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                {badges.map((b, i) => (
                  <div key={i} className="card" style={{ background: "#fff", border: `1px solid ${C.tan}`, borderRadius: 8, padding: "14px 14px" }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{b.icon}</div>
                    <div className="dm" style={{ fontSize: 13, fontWeight: 600, color: C.darkGreen, marginBottom: 4 }}>{b.name}</div>
                    <div className="dm" style={{ fontSize: 12, color: C.textLight, lineHeight: 1.55, fontWeight: 300 }}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8 categories accordion */}
            <div style={{ marginTop: 32 }}>
              <h3 className="dm" style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: C.sage, marginBottom: 10 }}>The Eight GreenPoints™ Categories</h3>
              <div style={{ background: `${C.gold}15`, border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "12px 16px", marginBottom: 14 }}>
                <p className="dm" style={{ margin: 0, fontSize: 13, color: C.charcoal, lineHeight: 1.7 }}>
                  <strong style={{ color: C.darkGreen }}>You might already be doing some or all of this.</strong> Open any category and check the box if it applies to you — it's a quick way to start mapping what's already in place before we even visit. The more you've checked, the closer you probably already are.
                </p>
              </div>
              {graCategories.map((cat, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${C.tan}` }}>
                  <button className="acc-btn" onClick={() => setOpenCat(openCat === i ? null : i)} style={{ padding: "14px 0", display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 22, width: 32 }}>{cat.icon}</span>
                      <span className="dm" style={{ fontSize: 15, fontWeight: 500, color: C.darkGreen }}>{cat.name}</span>
                    </div>
                    <span style={{ fontSize: 20, color: C.sage, flexShrink: 0, transform: openCat === i ? "rotate(45deg)" : "none", transition: "transform .2s", display: "inline-block" }}>+</span>
                  </button>
                  {openCat === i && (
                    <div style={{ paddingBottom: 18 }}>
                      <div style={{ background: `${cat.color}12`, borderLeft: `3px solid ${cat.color}`, padding: "10px 14px", borderRadius: "0 6px 6px 0", marginBottom: 12 }}>
                        <p className="dm" style={{ margin: 0, fontSize: 13, color: C.textMed, fontStyle: "italic", fontWeight: 300 }}>{cat.whyItMatters}</p>
                      </div>
                      <p className="dm" style={{ fontSize: 12, fontWeight: 600, color: C.sage, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Examples of ways to earn points</p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8, marginBottom: 4 }}>
                        {cat.examples.map((ex, j) => (
                          <div key={j} className="dm" style={{ display: "flex", gap: 8, fontSize: 13, color: C.textMed, alignItems: "flex-start", fontWeight: 300 }}>
                            <span style={{ color: cat.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{ex}
                          </div>
                        ))}
                      </div>
                      <AlreadyDoing category={cat.name} trackingTip={cat.trackingTip} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28, background: `${C.midGreen}15`, border: `1px solid ${C.lightSage}`, borderRadius: 10, padding: "18px 20px" }}>
              <p className="dm" style={{ margin: 0, fontSize: 14, color: C.darkGreen, lineHeight: 1.7 }}>
                <strong>Our role:</strong> We calculate your estimated GreenPoints™ during the initial audit, identify your strongest categories (often Food and Waste for Bozeman restaurants), and build a plan to close the gap to your target certification level — with zero unnecessary spending.
              </p>
            </div>
          </div>
        )}

        {/* ── WASTE ROADMAP ── */}
        {tab === "waste" && (
          <div>
            <SH title="Waste Reduction Roadmap" sub="Waste reduction is the most direct path to GRA certification — and the one with the clearest cost savings. Here's how we build your program." />

            <div style={{ marginTop: 28, background: C.darkGreen, borderRadius: 10, padding: "20px 24px" }}>
              <p className="dm" style={{ color: C.mint, fontSize: 14, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                The US food service sector discards an estimated <strong style={{ color: C.gold }}>22–33 billion pounds of food annually</strong>. For a restaurant your size, food waste typically represents 4–10% of total food cost — money sitting in your dumpster. Our waste program pays for itself.
              </p>
            </div>

            <div style={{ marginTop: 16, background: `${C.gold}15`, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: "14px 18px" }}>
              <p className="dm" style={{ margin: 0, fontSize: 13, color: C.charcoal, lineHeight: 1.7 }}>
                <strong style={{ color: C.darkGreen }}>You might already be doing some or all of this.</strong> That's genuinely great — and it counts toward certification. The checkboxes in each step below are a simple way to flag what's already in place so we know exactly where to start and what just needs to be documented properly.
              </p>
            </div>

            <div style={{ marginTop: 28, position: "relative" }}>
              <div style={{ position: "absolute", left: 17, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${C.midGreen}, ${C.gold})`, borderRadius: 2 }} />
              {wasteSteps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 20, marginBottom: 24, position: "relative" }}>
                  <div className="dm" style={{ width: 36, height: 36, borderRadius: "50%", background: i < 2 ? C.darkGreen : i < 4 ? C.midGreen : C.gold, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0, zIndex: 1 }}>{s.step}</div>
                  <div style={{ background: "#fff", borderRadius: 10, padding: "16px 18px", flex: 1, border: `1px solid ${C.tan}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
                      <h3 className="dm" style={{ fontSize: 15, fontWeight: 600, color: C.darkGreen, margin: 0 }}>{s.title}</h3>
                      <span className="pill" style={{ background: `${C.midGreen}18`, color: C.darkGreen }}>{s.action}</span>
                    </div>
                    <p className="dm" style={{ margin: 0, fontSize: 13, color: C.textMed, lineHeight: 1.65, fontWeight: 300 }}>{s.desc}</p>
                    <AlreadyDoing category={s.title} trackingTip={s.trackingTip} />
                  </div>
                </div>
              ))}
            </div>

            {/* EPA Food Recovery Hierarchy */}
            <div style={{ marginTop: 28, background: "#fff", border: `1px solid ${C.tan}`, borderRadius: 10, padding: "20px 22px" }}>
              <h3 className="dm" style={{ fontSize: 14, fontWeight: 600, color: C.darkGreen, margin: "0 0 14px" }}>EPA Food Recovery Hierarchy — Our Framework</h3>
              <p className="dm" style={{ fontSize: 13, color: C.textLight, margin: "0 0 14px", fontWeight: 300, lineHeight: 1.6 }}>The EPA's preferred order of food waste management — we work through these from top to bottom:</p>
              {[
                { rank: "1st", action: "Source Reduction", desc: "Menu engineering, portion right-sizing, demand forecasting — reduce waste before it's created." },
                { rank: "2nd", action: "Feed People", desc: "Donate surplus edible food to local food banks. Federal liability protection + tax deductions apply." },
                { rank: "3rd", action: "Feed Animals", desc: "Scraps to local farms. Montana has active farm connections we can facilitate." },
                { rank: "4th", action: "Industrial Uses", desc: "Cooking oil recycling into biodiesel — active programs in Gallatin Valley." },
                { rank: "5th", action: "Composting", desc: "Food scraps to compost. Earns GRA GreenPoints™ and diverts significant landfill volume." },
                { rank: "Last", action: "Landfill / Incineration", desc: "What we're working to minimize — and what the GRA certification system rewards reducing." },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
                  <span className="pill" style={{ background: i === 0 ? C.darkGreen : i < 3 ? C.midGreen : i < 5 ? C.sage : C.tan, color: i < 5 ? "#fff" : C.textMed, flexShrink: 0, marginTop: 1 }}>{r.rank}</span>
                  <div>
                    <span className="dm" style={{ fontSize: 13, fontWeight: 600, color: C.darkGreen }}>{r.action}: </span>
                    <span className="dm" style={{ fontSize: 13, color: C.textMed, fontWeight: 300 }}>{r.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FINANCIAL INCENTIVES ── */}
        {tab === "incentives" && (
          <div>
            <SH title="Financial Incentives" sub="Real programs available to Montana restaurants right now. We identify every applicable incentive during our engagement." />

            <div style={{ marginTop: 28, background: `${C.gold}18`, border: `1px solid ${C.gold}55`, borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
              <p className="dm" style={{ margin: 0, fontSize: 13, color: C.charcoal, lineHeight: 1.7 }}>
                <strong style={{ color: C.darkGreen }}>You might already be eligible for some of these.</strong> If you're donating food, you may already qualify for the federal deduction — you just might not be claiming it. If you've done any energy upgrades, those could apply to Section 179D. We review your situation and connect the dots.
              </p>
            </div>

            <div style={{ background: `#f5eedd`, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: "14px 18px", marginBottom: 24 }}>
              <p className="dm" style={{ margin: 0, fontSize: 13, color: C.charcoal, lineHeight: 1.7 }}>
                <strong style={{ color: C.darkGreen }}>Important context:</strong> Montana no longer offers state-level income tax credits specifically for energy upgrades. Federal programs are currently the primary source of financial incentives for restaurant sustainability investments. We stay current on all available programs and will identify every dollar available to your specific operation.
              </p>
            </div>

            {incentives.map((section, i) => (
              !section.isNote && (
                <div key={i} style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 4, height: 24, background: section.color, borderRadius: 2 }} />
                    <h3 className="dm" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: section.color, margin: 0 }}>{section.category}</h3>
                  </div>
                  {section.items.map((item, j) => (
                    <div key={j} style={{ background: "#fff", border: `1px solid ${C.tan}`, borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
                      <button className="acc-btn" onClick={() => setOpenIncentive(openIncentive === `${i}-${j}` ? null : `${i}-${j}`)} style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                          <span className="pill" style={{ background: `${section.color}20`, color: section.color, flexShrink: 0 }}>{item.type}</span>
                          <span className="dm" style={{ fontSize: 14, fontWeight: 500, color: C.darkGreen }}>{item.name}</span>
                        </div>
                        <span style={{ fontSize: 18, color: C.sage, flexShrink: 0, transform: openIncentive === `${i}-${j}` ? "rotate(45deg)" : "none", transition: "transform .2s", display: "inline-block" }}>+</span>
                      </button>
                      {openIncentive === `${i}-${j}` && (
                        <div style={{ borderTop: `1px solid ${C.tan}`, padding: "14px 18px", background: C.offWhite }}>
                          <p className="dm" style={{ margin: 0, fontSize: 13, color: C.textMed, lineHeight: 1.75, fontWeight: 300 }}>{item.desc}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            ))}

            <div style={{ background: C.sand, border: `1px solid ${C.tan}`, borderRadius: 10, padding: "18px 20px" }}>
              <p className="dm" style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 600, color: C.darkGreen }}>A note on tax advice</p>
              <p className="dm" style={{ margin: 0, fontSize: 13, color: C.textLight, lineHeight: 1.7, fontWeight: 300 }}>Green Fork identifies applicable programs and give you the information you need to act on them. For final tax strategy, we recommend working with a Montana CPA familiar with small business incentives. We're happy to refer you to local professionals we trust.</p>
            </div>
          </div>
        )}

        {/* ── SERVICES & PRICING ── */}
        {tab === "services" && (
          <div>
            <SH title="Services & Pricing" sub="Three flat-rate packages. No hourly billing. No surprises. One price covers everything from first audit to final certification." />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 28 }}>
              {tiers.map((tier, i) => (
                <div key={i} style={{
                  background: tier.featured ? C.darkGreen : "#fff",
                  border: tier.featured ? `2px solid ${C.gold}` : `1px solid ${C.tan}`,
                  borderRadius: 12,
                  padding: "26px 22px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  {tier.featured && (
                    <div className="dm" style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: C.gold, color: C.darkGreen, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", padding: "3px 14px", borderRadius: 12, whiteSpace: "nowrap" }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{tier.icon}</div>
                  <h3 className="dm" style={{ fontSize: 20, fontWeight: 700, margin: "0 0 3px", color: tier.featured ? C.cream : C.darkGreen }}>{tier.name}</h3>
                  <p className="dm" style={{ fontSize: 12, margin: "0 0 10px", color: tier.featured ? C.lightSage : C.sage, fontStyle: "italic", fontWeight: 300 }}>{tier.tagline}</p>
                  <p className="dm" style={{ fontSize: 13, lineHeight: 1.65, color: tier.featured ? "#b8d4c0" : C.textMed, margin: "0 0 14px", fontWeight: 300, flexGrow: 1 }}>{tier.desc}</p>
                  <div className="dm" style={{ fontSize: 18, fontWeight: 600, color: tier.featured ? C.gold : C.darkGreen, marginBottom: 14, letterSpacing: "-0.01em" }}>{tier.price}</div>
                  <div style={{ borderTop: `1px solid ${tier.featured ? "#ffffff20" : C.tan}`, paddingTop: 14 }}>
                    {tier.deliverables.map((d, j) => (
                      <div key={j} className="dm" style={{ display: "flex", gap: 8, marginBottom: 7, fontSize: 12, lineHeight: 1.5, color: tier.featured ? "#c8dece" : C.textMed, fontWeight: 300, alignItems: "flex-start" }}>
                        <span style={{ color: tier.featured ? C.lightSage : C.midGreen, flexShrink: 0, fontWeight: 700 }}>✓</span>{d}
                      </div>
                    ))}
                    <div style={{ marginTop: 14, padding: "10px 12px", background: tier.featured ? "#ffffff15" : `${C.midGreen}10`, borderRadius: 6 }}>
                      <p className="dm" style={{ margin: 0, fontSize: 12, color: tier.featured ? C.mint : C.darkGreen, fontStyle: "italic", fontWeight: 300, lineHeight: 1.5 }}>
                        <strong>Outcome:</strong> {tier.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28, background: `${C.gold}15`, border: `1px solid ${C.gold}44`, borderRadius: 10, padding: "16px 20px" }}>
              <p className="dm" style={{ margin: 0, fontSize: 13, color: C.charcoal, lineHeight: 1.7 }}>
                <strong style={{ color: C.darkGreen }}>Pricing note:</strong> All packages are flat-rate — what you see is what you pay. Final pricing reflects restaurant size, operational complexity, and number of locations. Add-ons available for specialty GRA badges (Vegan, Zero Waste, Sustainable Seafood), annual re-certification support, and social media content packages.
              </p>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 36, background: C.darkGreen, borderRadius: 12, padding: "36px 32px", textAlign: "center" }}>
              <h2 className="dm" style={{ fontSize: 28, fontWeight: 800, color: C.cream, margin: "0 0 12px" }}>Ready to get your fork in the ground?</h2>
              <p className="dm" style={{ fontSize: 15, color: "#b8d4c0", lineHeight: 1.75, fontWeight: 300, margin: "0 0 28px", maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
                Free 30-minute call. No obligation. We'll tell you honestly where your restaurant stands and what it would actually take to get certified.
              </p>
              <div style={{ display: "inline-block", background: "#ffffff12", border: "1px solid #ffffff20", borderRadius: 10, padding: "20px 28px" }}>
                <div className="dm" style={{ fontSize: 18, fontWeight: 700, color: C.cream, marginBottom: 4 }}>Garrett Wright</div>
                <div className="dm" style={{ fontSize: 13, color: C.lightSage, marginBottom: 10, fontWeight: 300 }}>Principal Consultant · Eddy Out Sustainability Consulting</div>
                <div className="dm" style={{ fontSize: 13, color: C.gold }}>garrett@eddyoutenv.com</div>
                <div className="dm" style={{ fontSize: 12, color: C.lightSage, marginTop: 4 }}>eddyoutenv.com · Bozeman, Montana</div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTACT ── */}
        {tab === "contact" && (
          <div>
            <SH title="Get in Touch" sub="Let's talk about your restaurant's sustainability goals. Schedule a free 30-minute consultation or reach out directly." />

            <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {[
                {
                  name: "Garrett Wright",
                  title: "Principal Consultant",
                  email: "garrett@eddyoutenv.com",
                  role: "GRA Certification · Sustainability Strategy",
                  icon: "📅",
                  cta: "Schedule a Call",
                  link: "https://calendar.app.google/CkJPGH8vXZZiMxQL6",
                },
                {
                  name: "Hazel Baur",
                  title: "Sustainability Consultant",
                  email: "hazel@eddyoutenv.com",
                  role: "Waste Audits · Supplier Sourcing",
                  icon: "💬",
                  cta: "Email Hazel",
                  link: "mailto:hazel@eddyoutenv.com",
                },
              ].map((contact, i) => (
                <div key={i} style={{ background: "#fff", border: `1px solid ${C.tan}`, borderRadius: 12, padding: "28px 24px" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>{contact.icon}</div>
                  <h3 className="dm" style={{ fontSize: 18, fontWeight: 700, color: C.darkGreen, margin: "0 0 3px" }}>{contact.name}</h3>
                  <p className="dm" style={{ fontSize: 13, color: C.sage, margin: "0 0 4px", fontWeight: 500 }}>{contact.title}</p>
                  <p className="dm" style={{ fontSize: 12, color: C.textLight, margin: "0 0 16px", fontWeight: 300 }}>{contact.role}</p>
                  <div style={{ borderTop: `1px solid ${C.tan}`, paddingTop: 14, marginBottom: 16 }}>
                    <p className="dm" style={{ fontSize: 12, color: C.textMed, margin: "0 0 8px", fontWeight: 400 }}>Email</p>
                    <a href={`mailto:${contact.email}`} style={{ color: C.midGreen, textDecoration: "none", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 14 }}>{contact.email}</a>
                  </div>
                  <a href={contact.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", background: C.darkGreen, color: C.cream, textDecoration: "none", padding: "12px 16px", borderRadius: 8, textAlign: "center", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s" }}>{contact.cta}</a>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, background: `${C.midGreen}15`, border: `1px solid ${C.lightSage}`, borderRadius: 10, padding: "20px 24px" }}>
              <p className="dm" style={{ margin: 0, fontSize: 14, color: C.darkGreen, lineHeight: 1.8, fontWeight: 300 }}>
                <strong>Free 30-minute consultation.</strong> No obligation, no pitch. We'll listen to your restaurant's current practices, answer questions about GRA certification, and tell you honestly what it would take to get certified and start earning incentives.
              </p>
            </div>

            <div style={{ marginTop: 28, background: C.cream, border: `1px solid ${C.tan}`, borderRadius: 10, padding: "20px 24px" }}>
              <h3 className="dm" style={{ fontSize: 13, fontWeight: 600, color: C.darkGreen, margin: "0 0 8px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Our Location</h3>
              <p className="dm" style={{ margin: 0, fontSize: 13, color: C.textMed, lineHeight: 1.7, fontWeight: 300 }}>
                Eddy Out Sustainability Consulting<br />
                Bozeman, Montana<br />
                <br />
                We work with restaurants throughout Bozeman and the Gallatin Valley. Initial audits are conducted on-site at your restaurant.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function SH({ title, sub }) {
  return (
    <div style={{ borderBottom: `2px solid ${C.mint}`, paddingBottom: 18 }}>
      <h2 className="dm" style={{ fontSize: 30, fontWeight: 800, color: C.darkGreen, margin: "0 0 8px" }}>{title}</h2>
      {sub && <p className="dm" style={{ margin: 0, fontSize: 14, color: C.textLight, lineHeight: 1.6, maxWidth: 580, fontWeight: 300 }}>{sub}</p>}
    </div>
  );
}
