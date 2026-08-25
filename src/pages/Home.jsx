import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
  ShoppingBag,
  Send,
  ShieldCheck,
  Award,
  FileText,
  Truck,
  Plus,
  Minus
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import EnquiryModal from "../components/EnquiryModal";

/* ==========================================================================
   ULTRA-PREMIUM REFINED GLASS SYSTEM
========================================================================== */
const T = {
  ivory: "#F9F7F2",
  ivory2: "#F3ECE0",
  sand: "#EBDCC5",
  ink: "#120F0D",
  ink2: "#2F2720",
  muted: "#7A6E5D",
  white: "#FFFFFF",
  accent: "#C58343", 
  accentLight: "rgba(197, 131, 67, 0.08)",
  glass: "rgba(255, 255, 255, 0.45)",
  glassDark: "rgba(18, 15, 13, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.6)",
  line: "rgba(18, 15, 13, 0.08)",
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace`;

const W = "1320px";

const PRODUCTS = [
  {
    id: "solvents",
    no: "01",
    category: "Solvents",
    title: "High-Purity Solvents",
    desc: "ACS & Pharma grade IPA, acetone, and custom NC thinners engineered for zero residue manufacturing requirements.",
    items: ["Isopropyl Alcohol", "Pure Acetone", "NC Thinner", "Acetyl Acetone"],
    img: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRxxxHoGcqv5kegpBdRa8ij-3jeSlWhl1H5UZtXWobqu8V9fQ6iOtS_yHZ5gbHGPs7NwY1_rZAwBExIBhA",
  },
  {
    id: "industrial",
    no: "02",
    category: "Industrial Chemicals",
    title: "Core Industrial Inputs",
    desc: "Highly stable caustic soda flakes, soda ash, and processing compounds optimized for large scale manufacturing plants.",
    items: ["Caustic Soda Flakes", "Soda Ash Light", "Ethylene Glycol", "Liquid Glucose"],
    img: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTM0uMDGFCP_hMD-D5aqRtrmvUgFbaxSMi2kgQgyFZDvFSyNp2y_RidgfFjcB_d-Sg90XOzxPT01WRVYa4",
  },
  {
    id: "acids",
    no: "03",
    category: "Acids & Catalysts",
    title: "Process Catalysts",
    desc: "Certified technical process acids supplied in heavy-duty tamper-proof containment with strict regulatory documentation.",
    items: ["Sulfuric Acid", "Nitric Acid", "Technical HCl", "Citric Acid Anhydrous"],
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "etp",
    no: "04",
    category: "ETP Solutions",
    title: "Treatment Solutions",
    desc: "High-charge density PAC liquids and crystalline powder configurations for stringent chemical effluent management.",
    items: ["PAC Liquid 10%", "PAC Powder 30%", "Hydrogen Peroxide", "Ferrous Sulphate"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDitbcmcXr-cHon9FxfMdX-wStA76nIlPRwGhKgGcmI73Xiig8ztmv5SQ&s=10",
  },
];
const CATALOGUE = [
  {
    category: "Solvents & Spirits",
    items: ["Isopropyl Alcohol (IPA)", "Pure Acetone", "Premium NC Thinner", "Acetyl Acetone", "MTO Turpentine"],
  },
  {
    category: "Industrial Alkali & Salts",
    items: ["Caustic Soda Flakes (Rayon Grade)", "Soda Ash Dense/Light", "Mono Ethylene Glycol", "Liquid Glucose High-Maltose", "Sodium Sulphate Anhydrous"],
  },
  {
    category: "Acids & Industrial pH Regulators",
    items: ["Sulfuric Acid 98%", "Nitric Acid Technical", "Glacial Acetic Acid", "Hydrochloric Acid 32%", "Citric Acid Monohydrate"],
  },
  {
    category: "Premium Protective Coatings",
    items: ["Industrial Oil Paints", "Melamine Clear Coating", "High-Gloss Lacquer Paint", "NC Primer Paint", "Heavy Duty PU Paints"],
  },
  {
    category: "Effluent Treatment (ETP)",
    items: ["Polyaluminum Chloride Liquid", "PAC Powder Grade", "Hydrogen Peroxide (H₂O₂) 50%", "Ferrous Sulphate Crystals", "Hydrated Lime Powder"],
  },
  {
    category: "Specialty Formulations",
    items: ["Polyols for PU", "Wacker Silicone Fluids", "Sodium Silicate Liquid", "Titanium Dioxide Rutile", "Active Zinc Oxide"],
  },
];

const CERTIFICATIONS = [
  { icon: <ShieldCheck size={28} />, title: "MSDS Compliant", desc: "Full Material Safety Data Sheet alignment for guaranteed safe handler protocols." },
  { icon: <Award size={28} />, title: "COA Validation", desc: "Certificate of Analysis issued per batch detailing exact structural purity indices." },
  { icon: <FileText size={28} />, title: "GST & Import Cleared", desc: "Fully structured corporate billing with transparent tax and duty tracking." },
  { icon: <Truck size={28} />, title: "Customized Freight", desc: "Tanker allotments and custom packaging ranging from 25kg to heavy ISO tanks." },
];

const FAQS = [
  { q: "What are your standard logistics lead times for bulk orders?", a: "For established regional supply corridors, dispatches leave our terminal within 24–48 hours. Custom formulations or long-haul interstate freights typically range between 4–7 business days depending on specific container allocation parameters." },
  { q: "Do you supply testing samples prior to contract execution?", a: "Yes. Procurement officers can request fully validated laboratory samples همراه with their corresponding COA sheets to run internal purity checks before finalizing commercial freight batches." },
  { q: "How are volatile or highly corrosive chemicals packaged?", a: "We strictly adhere to international tamper-proof heavy containment guidelines. Items are handled using specialized high-density polymer Drums, composite ibcs, or stainless steel ISO tankers under controlled atmospheres." }
];

const REVIEWS = [
  {
    text: "Kumar Chemicals redefined our bulk solvent sourcing. The purity validation profiles arrive before the delivery trucks do.",
    name: "Kothule Vijay",
    location: "Goa Manufacturing Hub",
    product: "High-Purity IPA Supply",
  },
  {
    text: "Uncompromising consistency across batch orders. Their logistics team handles regulatory documentation flawlessly.",
    name: "Shadab Khan",
    location: "Bhopal Enterprise Unit",
    product: "Bulk Caustic Soda",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [
    ref,
    {
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 1000ms cubic-bezier(.16,1,.3,1), transform 1000ms cubic-bezier(.16,1,.3,1)",
    },
  ];
}

function GlassCard({ children, style, className }) {
  return (
    <div
      className={className}
      style={{
        background: T.glass,
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
        border: `1px solid ${T.glassBorder}`,
        borderRadius: 24,
        boxShadow: "0 20px 50px rgba(18, 15, 13, 0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <span style={{ width: 32, height: 1, background: T.accent }} />
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.accent, fontWeight: 500 }}>
        {children}
      </span>
    </div>
  );
}

/* ==========================================================================
   1. HERO SECTION
========================================================================== */
function Hero({ onQuote }) {
  const [ref, reveal] = useReveal();

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        background: `radial-gradient(circle at 80% 20%, rgba(243,236,224,0.6), transparent 50%), ${T.ivory}`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="hero-bg-art" />
      <div
        style={{
          maxWidth: W,
          margin: "0 auto",
          width: "100%",
          padding: "140px 64px 100px",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 60,
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          ...reveal,
        }}
      >
        <div>
          <Eyebrow>Established 2002 · Pan India Network</Eyebrow>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(42px, 5vw, 76px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: T.ink,
              marginBottom: 24,
            }}
          >
            Industrial Purity.<br />
            <span style={{ fontStyle: "italic", color: T.accent }}>Architected</span> for Scale.
            <span style={{ fontStyle: "italic", color: T.accent }}> 20+</span> years of trust.

          </h1>
          <p style={{ maxWidth: 540, fontFamily: SANS, fontSize: 18, lineHeight: 1.75, color: T.ink2, marginBottom: 38 }}>
            Premium supply pipelines for ultra-pure solvents, complex processing acids, and industrial compounds. Engineered for direct factory procurement and strict compliance tracking.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 50 }}>
            <button onClick={onQuote} className="action-btn dark" style={{ padding: "18px 36px", background: T.ink, color: T.white, borderRadius: 999, fontFamily: SANS, fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 12 }}>
              Instant Procurement Desk <ShoppingBag size={16} />
            </button>
            <a href="#portfolio" className="action-btn light" style={{ padding: "18px 36px", background: T.white, color: T.ink, borderRadius: 999, border: `1px solid ${T.line}`, fontFamily: SANS, fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 12 }}>
              Explore Portfolio <ArrowRight size={16} />
            </a>
          </div>

          <div style={{ display: "flex", gap: 40, borderTop: `1px solid ${T.line}`, paddingTop: 30, maxWidth: 500 }}>
            {[["24Y+", "Market Authority"], ["50+", "Pure Compounds"], ["100%", "MSDS Verified"]].map(([val, lbl]) => (
              <div key={lbl}>
                <div style={{ fontFamily: SERIF, fontSize: 28, color: T.ink, fontWeight: 600 }}>{val}</div>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted, marginTop: 4 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", height: 600 }} className="hero-visual-area">
          <div className="hero-image-wrapper">
            <img src="https://media.istockphoto.com/id/471824724/photo/factory-industrial-plant.webp?a=1&b=1&s=612x612&w=0&k=20&c=gWXuwD7XTdUyZ1xpXugousvLqGFu4mbG6DlPJ6j-XAc=" alt="Premium Chemical Processing" className="hero-img" />
          </div>
          <GlassCard style={{ position: "absolute", bottom: -10, left: -40, right: 40, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="live-dot" />
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: T.accent, fontWeight: 600 }}>
                  Active Dispatch Terminal
                </span>
              </div>
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 600, color: T.ink, marginBottom: 8, lineHeight: 1.2 }}>
              Fast-Track Cargo Initialization
            </div>
            <button onClick={onQuote} className="glass-inner-btn">
              <span>Request Sample Quote</span> <ArrowUpRight size={16} />
            </button>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   2. REFINED PREMIUM MARQUEE (MATCHING IMAGE image_84a5c4.png)
========================================================================== */
function PremiumMarquee() {
  const items = [
    "PAN-INDIA LOGISTICS INFRASTRUCTURE",
    "TAMPER-PROOF HEAVY CONTAINMENT",
    "BATCH PURITY VALIDATION CERTIFICATES",
    "GST VERIFIED CORPORATE"
  ];

  return (
    <section style={{ background: T.ivory, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, overflow: "hidden", position: "relative" }}>
      <div className="marquee-wrapper" style={{ display: "flex", width: "100%", overflow: "hidden", padding: "26px 0" }}>
        <div className="marquee-content" style={{ display: "flex", shrink: 0, gap: 50, whiteSpace: "nowrap" }}>
          {[...Array(3)].map((_, outer) => (
            <div key={outer} style={{ display: "inline-flex", gap: 54, alignItems: "center" }}>
              {items.map((text, inner) => (
                <div key={inner} style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
                  <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: T.accent }} />
                  <span style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.18em", color: T.muted, fontWeight: 500 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   3. EDITORIAL INTRO SECTION
========================================================================== */
function Intro() {
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} style={{ background: T.ivory, padding: "120px 0" }}>
      <div style={{ maxWidth: W, margin: "0 auto", padding: "0 64px", display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 80, ...reveal }}>
        <div>
          <Eyebrow>Strategic Alliance</Eyebrow>
          <p style={{ fontFamily: MONO, color: T.muted, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.8 }}>
            RELIABLE PIPELINES FOR PROCUREMENT EXECUTIVES & PLANT OPERATION MANAGERS.
          </p>
        </div>
        <div>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 500, lineHeight: 1.1, color: T.ink, marginBottom: 32 }}>
            Balancing raw industrial performance with strict documentation compliance.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 17, lineHeight: 1.85, color: T.ink2 }}>
            Since inception, our distribution metrics have focused purely on end-to-end supply chain transparency. We clear out delivery obstacles, stabilize pricing matrices, and secure predictable lead times.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   4. PRODUCT SHOWCASE SECTION
========================================================================== */
function ProductShowcase({ onQuote }) {
  const [active, setActive] = useState(0);
  const [ref, reveal] = useReveal();
  const currentProduct = PRODUCTS[active];

  return (
    <section id="portfolio" ref={ref} style={{ background: T.ivory2, padding: "120px 0", position: "relative" }}>
      <div style={{ maxWidth: W, margin: "0 auto", padding: "0 64px", ...reveal }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 30 }}>
          <div>
            <Eyebrow>Interactive Showcase</Eyebrow>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 4.2vw, 62px)", fontWeight: 500, letterSpacing: "-0.03em", color: T.ink, lineHeight: 1.05 }}>
              Impeccable Compounds.<br />Tell us what you need.
            </h2>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 16, color: T.ink2, maxWidth: 440, lineHeight: 1.7 }}>
            Every chemical segment is mapped to real-time industrial applications. Choose a product division below to explore core inputs.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 50, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PRODUCTS.map((item, idx) => {
              const isSelected = active === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActive(idx)}
                  className={`showcase-nav-card ${isSelected ? "active" : ""}`}
                  style={{
                    background: isSelected ? T.white : "rgba(255,255,255,0.2)",
                    border: `1px solid ${isSelected ? T.accent : T.glassBorder}`,
                    borderRadius: 20,
                    padding: "24px 30px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all 300ms cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <span style={{ fontFamily: MONO, fontSize: 13, color: isSelected ? T.accent : T.muted, fontWeight: 600 }}>{item.no}</span>
                    <h4 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: T.ink }}>{item.category}</h4>
                  </div>
                  <ArrowRight size={18} style={{ transform: isSelected ? "translateX(4px)" : "none", color: isSelected ? T.accent : T.muted, transition: "transform 250ms" }} />
                </div>
              );
            })}
          </div>

          <GlassCard style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 320, overflow: "hidden", position: "relative" }}>
              <img src={currentProduct.img} alt={currentProduct.title} className="dynamic-showcase-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <span className="category-badge">{currentProduct.category}</span>
            </div>
            <div style={{ padding: 40 }}>
              <h3 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 600, color: T.ink, marginBottom: 12 }}>{currentProduct.title}</h3>
              <p style={{ fontFamily: SANS, fontSize: 15, color: T.ink2, marginBottom: 24, lineHeight: 1.7 }}>{currentProduct.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
                {currentProduct.items.map((c) => <span key={c} className="compound-tag">{c}</span>)}
              </div>
              <button onClick={onQuote} className="order-now-btn">
                <span>Enquire Category</span> <Send size={14} />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   NEW SECTION: COMPLIANCE & QUALITY MATRIX 
========================================================================== */
function QualityCompliance() {
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} style={{ background: T.ivory, padding: "120px 0", borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: W, margin: "0 auto", padding: "0 64px", ...reveal }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Eyebrow>Verification Architecture</Eyebrow>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 500, color: T.ink }}>
            Zero Compromise. Zero Residue.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: 16, color: T.muted, maxWidth: 550, margin: "16px auto 0" }}>
            Our infrastructure maintains multi-tier corporate audit checks to guarantee processing stability.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {CERTIFICATIONS.map((item, idx) => (
            <GlassCard key={idx} style={{ padding: 36, display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ color: T.accent, background: T.accentLight, width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifycontent: "center" }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 600, color: T.ink, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: SANS, fontSize: 14, color: T.ink2, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   5. REVIEWS SECTION
========================================================================== */
function Reviews() {
  const [cur, setCur] = useState(0);
  const [ref, reveal] = useReveal();
  const rv = REVIEWS[cur];

  return (
    <section ref={ref} style={{ background: T.ivory2, padding: "120px 0" }}>
      <div style={{ maxWidth: W, margin: "0 auto", padding: "0 64px", ...reveal }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Eyebrow>Client Appraisals</Eyebrow>
          <div key={cur} style={{ minHeight: 240 }} className="review-fade">
            <p style={{ fontFamily: SERIF, fontSize: "clamp(26px, 3.5vw, 46px)", lineHeight: 1.25, color: T.ink, fontWeight: 500, marginBottom: 34 }}>
              “{rv.text}”
            </p>
            <div style={{ width: 40, height: 1, background: T.accent, margin: "0 auto 20px" }} />
            <div style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, color: T.ink }}>{rv.name}</div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: T.muted, marginTop: 4 }}>{rv.location} · {rv.product}</div>
          </div>

          <div style={{ display: "inline-flex", gap: 10, alignItems: "center", padding: 8, border: `1px solid ${T.line}`, borderRadius: 999, background: "rgba(255,255,255,0.45)", marginTop: 40 }}>
            <button onClick={() => setCur((c) => (c - 1 + REVIEWS.length) % REVIEWS.length)} className="nav-circle-btn"><ChevronLeft size={16} /></button>
            <button onClick={() => setCur((c) => (c + 1) % REVIEWS.length)} className="nav-circle-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. CATALOGUE SECTION
========================================================================== */
function Catalogue({ onQuote }) {
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} style={{ background: T.ivory, padding: "120px 0" }}>
      <div style={{ maxWidth: W, margin: "0 auto", padding: "0 64px", ...reveal }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 70, alignItems: "end" }}>
          <div>
            <Eyebrow>Comprehensive Sourcing</Eyebrow>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 4.2vw, 62px)", fontWeight: 500, color: T.ink }}>
              Product Matrix.
            </h2>
          </div>
          <p style={{ fontFamily: SANS, fontSize: 16, color: T.ink2, lineHeight: 1.7 }}>
            Review our ongoing industrial core catalog. If you require specialized compound configurations, our desk offers immediate customized turnarounds.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {CATALOGUE.map((cat, idx) => (
            <GlassCard key={cat.category} style={{ padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between" }} className="matrix-card">
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: T.accent, fontWeight: 600 }}>DIVISION // 0{idx + 1}</span>
                  <Layers size={16} style={{ color: T.muted }} />
                </div>
                <h3 style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 600, color: T.ink, marginBottom: 20 }}>{cat.category}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {cat.items.map((item) => <span key={item} className="matrix-tag">{item}</span>)}
                </div>
              </div>
              <div style={{ borderTop: `1px solid ${T.line}`, marginTop: 30, paddingTop: 20, display: "flex", justifyContent: "flex-end" }}>
                <button onClick={onQuote} className="matrix-order-btn">Order Sample <ArrowUpRight size={14} /></button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   NEW SECTION: FREQUENTLY ASKED LOGISTICS QUESTIONS
========================================================================== */
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} style={{ background: T.ivory2, padding: "120px 0", borderTop: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "0 24px", ...reveal }}>
        <div style={{ textAlign: "center", marginBottom: 54 }}>
          <Eyebrow>Procurement Intelligence</Eyebrow>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px, 4.2vw, 52px)", fontWeight: 500, color: T.ink }}>
            FAQ Desk
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <GlassCard key={idx} style={{ padding: "24px 32px", borderRadius: 16, cursor: "pointer" }}>
                <div onClick={() => setOpenIdx(isOpen ? null : idx)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 600, color: T.ink }}>{faq.q}</h3>
                  <div style={{ color: T.accent }}>{isOpen ? <Minus size={18} /> : <Plus size={18} />}</div>
                </div>
                <div style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "all 300ms ease", marginTop: isOpen ? 16 : 0 }}>
                  <p style={{ fontFamily: SANS, fontSize: 15, color: T.ink2, lineHeight: 1.7, borderTop: `1px solid ${T.line}`, paddingTop: 16 }}>
                    {faq.a}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. CTA SECTION
========================================================================== */
function CTA({ onQuote }) {
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} style={{ background: T.ink, color: T.white, padding: "140px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 10%, rgba(197, 131, 67, 0.15), transparent 35%)" }} />
      <div style={{ maxWidth: W, margin: "0 auto", padding: "0 64px", textAlign: "center", position: "relative", zIndex: 2, ...reveal }}>
        <h2 style={{ fontFamily: SERIF, fontSize: "clamp(38px, 5.5vw, 80px)", fontWeight: 500, lineHeight: 1.05, marginBottom: 30 , color:'wheat'}}>
          Initiate Freight Estimates.
        </h2>
        <p style={{ maxWidth: 580, margin: "0 auto 40px", fontFamily: SANS, fontSize: 17, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
          Transmit your exact manufacturing metrics, container allocation sizes, and priority deadlines to our technical team for immediate fulfillment scheduling.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <button onClick={onQuote} className="action-btn-gold">Request Allocation <ArrowRight size={16} /></button>
          <a href="tel:+919999999999" style={{ padding: "18px 36px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", gap: 10, fontFamily: SANS, fontSize: 14, fontWeight: 600 }}>
            Call Desk Officer <Phone size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   ROOT RENDERING & CUSTOM STYLESHEET
========================================================================== */
export default function Home() {
  const [modal, setModal] = useState(false);

  return (
    <div style={{ background: T.ivory, color: T.ink, fontFamily: SANS, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${T.ivory}; overflow-x: hidden; width: 100%; }
        button { border: none; background: none; font-family: inherit; cursor: pointer; }
        a { color: inherit; text-decoration: none; }

        .hero-bg-art {
          position: absolute; inset: 0;
          background-image: radial-gradient(${T.line} 1.5px, transparent 1.5px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, black, transparent);
          opacity: 0.6; pointer-events: none;
        }

        .hero-image-wrapper {
          width: 100%; height: 85%;
          border-radius: 40px; overflow: hidden;
          box-shadow: 0 40px 80px rgba(18,15,13,0.12);
        }

        .hero-img {
          width: 100%; height: 100%; object-fit: cover;
          transform: scale(1.02); animation: slowZoom 20s infinite alternate ease-in-out;
        }

        .live-dot {
          width: 8px; height: 8px; background: #4CAF50; border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .glass-inner-btn {
          width: 100%; padding: 16px; background: ${T.ink}; color: ${T.white};
          border-radius: 14px; font-family: ${SANS}; font-weight: 600; font-size: 14px;
          display: flex; justify-content: center; align-items: center; gap: 8px;
          transition: all 250ms ease;
        }
        .glass-inner-btn:hover { background: ${T.accent}; }

        /* INFINITE TICKER MARQUEE EFFECT */
        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
        }
        .marquee-content {
          display: flex;
          animation: infiniteTicker 40s linear infinite;
        }
        @keyframes infiniteTicker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }

        .showcase-nav-card:hover { transform: translateY(-2px); }
        .showcase-nav-card.active { border-color: ${T.accent} !important; }

        .category-badge {
          position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.85);
          backdrop-filter: blur(10px); padding: 6px 14px; border-radius: 999px;
          font-family: ${MONO}; font-size: 11px; color: ${T.ink}; font-weight: 600;
        }

        .compound-tag {
          padding: 8px 16px; background: ${T.ivory}; border: 1px solid ${T.line};
          border-radius: 999px; font-family: ${SANS}; font-size: 13px; color: ${T.ink2};
        }

        .order-now-btn {
          padding: 14px 28px; background: transparent; border: 1px solid ${T.ink};
          color: ${T.ink}; border-radius: 999px; font-family: ${SANS}; font-weight: 600;
          font-size: 14px; display: flex; align-items: center; gap: 8px; transition: all 250ms;
        }
        .order-now-btn:hover { background: ${T.ink}; color: ${T.white}; }

        .matrix-card { transition: all 350ms cubic-bezier(.16,1,.3,1); }
        .matrix-card:hover { transform: translateY(-4px); border-color: ${T.accent} !important; box-shadow: 0 30px 60px rgba(18,15,13,0.06); }

        .matrix-tag {
          padding: 6px 12px; background: rgba(255,255,255,0.6); border: 1px solid ${T.line};
          border-radius: 8px; font-family: ${SANS}; font-size: 12px; color: ${T.ink2};
        }

        .matrix-order-btn {
          font-family: ${SANS}; font-size: 13px; font-weight: 600; color: ${T.accent};
          display: flex; align-items: center; gap: 6px; transition: color 200ms;
        }

        .nav-circle-btn {
          width: 40px; height: 40px; border-radius: 50%; background: ${T.white};
          display: inline-flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }

        .action-btn { transition: all 250ms ease; }
        .action-btn:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(18,15,13,0.1); }
        .action-btn.dark:hover { background: ${T.accent} !important; }

        .action-btn-gold {
          padding: 18px 36px; background: ${T.accent}; color: ${T.white}; border-radius: 999px;
          font-family: ${SANS}; font-weight: 600; font-size: 14px; display: inline-flex;
          align-items: center; gap: 10px; transition: all 250ms;
        }
        .action-btn-gold:hover { background: ${T.white}; color: ${T.ink}; transform: translateY(-2px); }

        @keyframes slowZoom { from { transform: scale(1.01); } to { transform: scale(1.07); } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }

        @media (max-width: 980px) {
          section { padding: 80px 0 !important; }
          section > div { padding-left: 24px !important; padding-right: 24px !important; }
          .hero-visual-area { display: none; }
          div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar onGetQuote={() => setModal(true)} />

      <Hero onQuote={() => setModal(true)} />
      <PremiumMarquee />
      <Intro />
      <ProductShowcase onQuote={() => setModal(true)} />
      <QualityCompliance />
      <Reviews />
      <Catalogue onQuote={() => setModal(true)} />
      <FAQSection />
      <CTA onQuote={() => setModal(true)} />

      <Footer />
      <WhatsAppButton />

      <EnquiryModal isOpen={modal} onClose={() => setModal(false)} />
    </div>
  );
}