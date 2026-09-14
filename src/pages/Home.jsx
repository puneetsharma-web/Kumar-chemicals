import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
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
  Minus,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import EnquiryModal from "../components/EnquiryModal";

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
    items: [
      "Isopropyl Alcohol",
      "Pure Acetone",
      "NC Thinner",
      "Acetyl Acetone",
    ],
    img: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRxxxHoGcqv5kegpBdRa8ij-3jeSlWhl1H5UZtXWobqu8V9fQ6iOtS_yHZ5gbHGPs7NwY1_rZAwBExIBhA",
  },
  {
    id: "industrial",
    no: "02",
    category: "Industrial Chemicals",
    title: "Core Industrial Inputs",
    desc: "Highly stable caustic soda flakes, soda ash, and processing compounds optimized for large scale manufacturing plants.",
    items: [
      "Caustic Soda Flakes",
      "Soda Ash Light",
      "Ethylene Glycol",
      "Liquid Glucose",
    ],
    img: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTM0uMDGFCP_hMD-D5aqRtrmvUgFbaxSMi2kgQgyFZDvFSyNp2y_RidgfFjcB_d-Sg90XOzxPT01WRVYa4",
  },
  {
    id: "acids",
    no: "03",
    category: "Acids & Catalysts",
    title: "Process Catalysts",
    desc: "Certified technical process acids supplied in heavy-duty tamper-proof containment with strict regulatory documentation.",
    items: [
      "Sulfuric Acid",
      "Nitric Acid",
      "Technical HCl",
      "Citric Acid Anhydrous",
    ],
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: "etp",
    no: "04",
    category: "ETP Solutions",
    title: "Treatment Solutions",
    desc: "High-charge density PAC liquids and crystalline powder configurations for stringent chemical effluent management.",
    items: [
      "PAC Liquid 10%",
      "PAC Powder 30%",
      "Hydrogen Peroxide",
      "Ferrous Sulphate",
    ],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDitbcmcXr-cHon9FxfMdX-wStA76nIlPRwGhKgGcmI73Xiig8ztmv5SQ&s=10",
  },
];

const CATALOGUE = [
  {
    category: "Solvents & Spirits",
    items: [
      "Isopropyl Alcohol (IPA)",
      "Pure Acetone",
      "Premium NC Thinner",
      "Acetyl Acetone",
      "MTO Turpentine",
    ],
  },
  {
    category: "Industrial Alkali & Salts",
    items: [
      "Caustic Soda Flakes (Rayon Grade)",
      "Soda Ash Dense/Light",
      "Mono Ethylene Glycol",
      "Liquid Glucose High-Maltose",
      "Sodium Sulphate Anhydrous",
    ],
  },
  {
    category: "Acids & Industrial pH Regulators",
    items: [
      "Sulfuric Acid 98%",
      "Nitric Acid Technical",
      "Glacial Acetic Acid",
      "Hydrochloric Acid 32%",
      "Citric Acid Monohydrate",
    ],
  },
  {
    category: "Premium Protective Coatings",
    items: [
      "Industrial Oil Paints",
      "Melamine Clear Coating",
      "High-Gloss Lacquer Paint",
      "NC Primer Paint",
      "Heavy Duty PU Paints",
    ],
  },
  {
    category: "Effluent Treatment (ETP)",
    items: [
      "Polyaluminum Chloride Liquid",
      "PAC Powder Grade",
      "Hydrogen Peroxide (H₂O₂) 50%",
      "Ferrous Sulphate Crystals",
      "Hydrated Lime Powder",
    ],
  },
  {
    category: "Specialty Formulations",
    items: [
      "Polyols for PU",
      "Wacker Silicone Fluids",
      "Sodium Silicate Liquid",
      "Titanium Dioxide Rutile",
      "Active Zinc Oxide",
    ],
  },
];

const CERTIFICATIONS = [
  {
    icon: <ShieldCheck size={28} />,
    title: "MSDS Compliant",
    desc: "Full Material Safety Data Sheet alignment for guaranteed safe handler protocols.",
  },
  {
    icon: <Award size={28} />,
    title: "COA Validation",
    desc: "Certificate of Analysis issued per batch detailing exact structural purity indices.",
  },
  {
    icon: <FileText size={28} />,
    title: "GST & Import Cleared",
    desc: "Fully structured corporate billing with transparent tax and duty tracking.",
  },
  {
    icon: <Truck size={28} />,
    title: "Customized Freight",
    desc: "Tanker allotments and custom packaging ranging from 25kg to heavy ISO tanks.",
  },
];

const FAQS = [
  {
    q: "What are your standard logistics lead times for bulk orders?",
    a: "For established regional supply corridors, dispatches leave our terminal within 24–48 hours. Custom formulations or long-haul interstate freights typically range between 4–7 business days depending on specific container allocation parameters.",
  },
  {
    q: "Do you supply testing samples prior to contract execution?",
    a: "Yes. Procurement officers can request fully validated laboratory samples accompanied by their corresponding COA sheets to run internal purity checks before finalizing commercial freight batches.",
  },
  {
    q: "How are volatile or highly corrosive chemicals packaged?",
    a: "We strictly adhere to international tamper-proof heavy containment guidelines. Items are handled using specialized high-density polymer drums, composite IBCs, or stainless steel ISO tankers under controlled atmospheres.",
  },
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
    const element = ref.current;

    if (!element) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    obs.observe(element);

    return () => obs.disconnect();
  }, []);

  return [
    ref,
    {
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(24px)",
      transition:
        "opacity 1000ms cubic-bezier(.16,1,.3,1), transform 1000ms cubic-bezier(.16,1,.3,1)",
    },
  ];
}

function GlassCard({
  children,
  style = {},
  className = "",
}) {
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
    <div className="home-eyebrow">
      <span className="home-eyebrow-line" />

      <span
        style={{
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: T.accent,
          fontWeight: 500,
        }}
      >
        {children}
      </span>
    </div>
  );
}

/* HERO */

function Hero({ onQuote }) {
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} className="home-hero">
      <div className="hero-bg-art" />

      <div className="home-container home-hero-container" style={reveal}>
        <div className="home-hero-grid">
          <div className="home-hero-content">
            <Eyebrow>Established 2002 · Pan India Network</Eyebrow>

            <h1 className="home-hero-title">
              Industrial Purity.
              <br />
              <span style={{ fontStyle: "italic", color: T.accent }}>
                Architected
              </span>{" "}
              for Scale.
              <span style={{ fontStyle: "italic", color: T.accent }}>
                {" "}
                20+
              </span>{" "}
              years of trust.
            </h1>

            <p className="home-hero-description">
              Premium supply pipelines for ultra-pure solvents, complex
              processing acids, and industrial compounds. Engineered for
              direct factory procurement and strict compliance tracking.
            </p>

            <div className="home-hero-buttons">
              <button
                onClick={onQuote}
                className="action-btn action-btn-dark"
              >
                Instant Procurement Desk
                <ShoppingBag size={16} />
              </button>

              <a
                href="#portfolio"
                className="action-btn action-btn-light"
              >
                Explore Portfolio
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="home-stats">
              {[
                ["24Y+", "Market Authority"],
                ["50+", "Pure Compounds"],
                ["50+", "Pure Compounds"],
                ["100%", "MSDS Verified"],
              ].map(([val, lbl]) => (
                <div className="home-stat" key={lbl}>
                  <div className="home-stat-value">{val}</div>

                  <div className="home-stat-label">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual-area">
            <div className="hero-image-wrapper">
              <img
                src="https://media.istockphoto.com/id/471824724/photo/factory-industrial-plant.webp?a=1&b=1&s=612x612&w=0&k=20&c=gWXuwD7XTdUyZ1xpXugousvLqGFu4mbG6DlPJ6j-XAc="
                alt="Premium Chemical Processing"
                className="hero-img"
              />
            </div>

            <GlassCard className="hero-floating-card">
              <div className="hero-floating-top">
                <div className="hero-live">
                  <span className="live-dot" />

                  <span>
                    Active Dispatch Terminal
                  </span>
                </div>
              </div>

              <div className="hero-floating-title">
                Fast-Track Cargo Initialization
              </div>

              <button
                onClick={onQuote}
                className="glass-inner-btn"
              >
                <span>Request Sample Quote</span>
                <ArrowUpRight size={16} />
              </button>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* MARQUEE */

function PremiumMarquee() {
  const items = [
    "PAN-INDIA LOGISTICS INFRASTRUCTURE",
    "TAMPER-PROOF HEAVY CONTAINMENT",
    "BATCH PURITY VALIDATION CERTIFICATES",
    "GST VERIFIED CORPORATE",
  ];

  return (
    <section className="premium-marquee">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {[...Array(3)].map((_, outer) => (
            <div className="marquee-group" key={outer}>
              {items.map((text, inner) => (
                <div className="marquee-item" key={inner}>
                  <span className="marquee-dot" />

                  <span>{text}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* INTRO */

function Intro() {
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} className="home-intro">
      <div className="home-container" style={reveal}>
        <div className="home-intro-grid">
          <div>
            <Eyebrow>Strategic Alliance</Eyebrow>

            <p className="home-intro-label">
              RELIABLE PIPELINES FOR PROCUREMENT EXECUTIVES & PLANT
              OPERATION MANAGERS.
            </p>
          </div>

          <div>
            <h2 className="home-intro-title">
              Balancing raw industrial performance with strict documentation
              compliance.
            </h2>

            <p className="home-intro-description">
              Since inception, our distribution metrics have focused purely on
              end-to-end supply chain transparency. We clear out delivery
              obstacles, stabilize pricing matrices, and secure predictable
              lead times.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* PRODUCTS */

function ProductShowcase({ onQuote }) {
  const [active, setActive] = useState(0);
  const [ref, reveal] = useReveal();

  const currentProduct = PRODUCTS[active];

  return (
    <section
      id="portfolio"
      ref={ref}
      className="product-showcase"
    >
      <div className="home-container" style={reveal}>
        <div className="section-heading-row">
          <div>
            <Eyebrow>Interactive Showcase</Eyebrow>

            <h2 className="section-title">
              Impeccable Compounds.
              <br />
              Tell us what you need.
            </h2>
          </div>

          <p className="section-intro-text">
            Every chemical segment is mapped to real-time industrial
            applications. Choose a product division below to explore core
            inputs.
          </p>
        </div>

        <div className="product-showcase-grid">
          <div className="showcase-nav">
            {PRODUCTS.map((item, idx) => {
              const isSelected = active === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => setActive(idx)}
                  className={`showcase-nav-card ${
                    isSelected ? "active" : ""
                  }`}
                >
                  <div className="showcase-nav-left">
                    <span
                      className="showcase-number"
                      style={{
                        color: isSelected ? T.accent : T.muted,
                      }}
                    >
                      {item.no}
                    </span>

                    <h4>{item.category}</h4>
                  </div>

                  <ArrowRight
                    size={18}
                    style={{
                      transform: isSelected
                        ? "translateX(4px)"
                        : "none",
                      color: isSelected
                        ? T.accent
                        : T.muted,
                    }}
                  />
                </div>
              );
            })}
          </div>

          <GlassCard className="product-detail-card">
            <div className="product-image-container">
              <img
                src={currentProduct.img}
                alt={currentProduct.title}
                className="dynamic-showcase-img"
              />

              <span className="category-badge">
                {currentProduct.category}
              </span>
            </div>

            <div className="product-detail-content">
              <h3>{currentProduct.title}</h3>

              <p>{currentProduct.desc}</p>

              <div className="compound-tags">
                {currentProduct.items.map((compound) => (
                  <span className="compound-tag" key={compound}>
                    {compound}
                  </span>
                ))}
              </div>

              <button
                onClick={onQuote}
                className="order-now-btn"
              >
                <span>Enquire Category</span>
                <Send size={14} />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

/* QUALITY */

function QualityCompliance() {
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} className="quality-section">
      <div className="home-container" style={reveal}>
        <div className="quality-heading">
          <Eyebrow>Verification Architecture</Eyebrow>

          <h2 className="quality-title">
            Zero Compromise. Zero Residue.
          </h2>

          <p>
            Our infrastructure maintains multi-tier corporate audit checks to
            guarantee processing stability.
          </p>
        </div>

        <div className="quality-grid">
          {CERTIFICATIONS.map((item, idx) => (
            <GlassCard
              key={idx}
              className="quality-card"
            >
              <div className="quality-icon">
                {item.icon}
              </div>

              <div>
                <h3>{item.title}</h3>

                <p>{item.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* REVIEWS */

function Reviews() {
  const [cur, setCur] = useState(0);
  const [ref, reveal] = useReveal();

  const rv = REVIEWS[cur];

  return (
    <section ref={ref} className="reviews-section">
      <div className="home-container" style={reveal}>
        <div className="reviews-inner">
          <Eyebrow>Client Feedbacks</Eyebrow>

          <div className="review-content" key={cur}>
            <p className="review-text">
              “{rv.text}”
            </p>

            <div className="review-divider" />

            <div className="review-name">
              {rv.name}
            </div>

            <div className="review-meta">
              {rv.location} · {rv.product}
            </div>
          </div>

          <div className="review-controls">
            <button
              onClick={() =>
                setCur(
                  (c) =>
                    (c - 1 + REVIEWS.length) %
                    REVIEWS.length
                )
              }
              className="nav-circle-btn"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() =>
                setCur(
                  (c) =>
                    (c + 1) %
                    REVIEWS.length
                )
              }
              className="nav-circle-btn"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CATALOGUE */

function Catalogue({ onQuote }) {
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} className="catalogue-section">
      <div className="home-container" style={reveal}>
        <div className="catalogue-heading">
          <div>
            <Eyebrow>Comprehensive Sourcing</Eyebrow>

            <h2 className="catalogue-title">
              Product Matrix.
            </h2>
          </div>

          <p>
            Review our ongoing industrial core catalog. If you require
            specialized compound configurations, our desk offers immediate
            customized turnarounds.
          </p>
        </div>

        <div className="catalogue-grid">
          {CATALOGUE.map((cat, idx) => (
            <GlassCard
              key={cat.category}
              className="matrix-card"
            >
              <div>
                <div className="matrix-top">
                  <span>
                    DIVISION // 0{idx + 1}
                  </span>

                  <Layers
                    size={16}
                    color={T.muted}
                  />
                </div>

                <h3>{cat.category}</h3>

                <div className="matrix-tags">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="matrix-tag"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="matrix-bottom">
                <button
                  onClick={onQuote}
                  className="matrix-order-btn"
                >
                  Order Sample
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FAQ */

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} className="faq-section">
      <div
        className="faq-container"
        style={reveal}
      >
        <div className="faq-heading">
          <Eyebrow>Procurement Intelligence</Eyebrow>

          <h2>FAQ Desk</h2>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <GlassCard
                key={idx}
                className={`faq-card ${
                  isOpen ? "open" : ""
                }`}
              >
                <button
                  className="faq-question"
                  onClick={() =>
                    setOpenIdx(
                      isOpen ? null : idx
                    )
                  }
                  aria-expanded={isOpen}
                >
                  <h3>{faq.q}</h3>

                  <div className="faq-icon">
                    {isOpen ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>
                </button>

                <div
                  className={`faq-answer ${
                    isOpen ? "visible" : ""
                  }`}
                >
                  <p>{faq.a}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* CTA */

function CTA({ onQuote }) {
  const [ref, reveal] = useReveal();

  return (
    <section ref={ref} className="cta-section">
      <div className="cta-glow" />

      <div
        className="home-container cta-content"
        style={reveal}
      >
        <h2>
          Initiate Freight Estimates.
        </h2>

        <p>
          Transmit your exact manufacturing metrics, container allocation
          sizes, and priority deadlines to our technical team for immediate
          fulfillment scheduling.
        </p>

        <div className="cta-buttons">
          <button
            onClick={onQuote}
            className="action-btn-gold"
          >
            Request Allocation
            <ArrowRight size={16} />
          </button>

          <a
            href="tel:+919999999999"
            className="cta-phone"
          >
            Call Desk Officer
            <Phone size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ROOT */

export default function Home() {
  const [modal, setModal] = useState(false);

  return (
    <div className="home-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          padding: 0;
          background: ${T.ivory};
          overflow-x: hidden;
          width: 100%;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        button {
          border: none;
          cursor: pointer;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        img {
          max-width: 100%;
        }

        .home-page {
          width: 100%;
          min-height: 100vh;
          background: ${T.ivory};
          color: ${T.ink};
          font-family: ${SANS};
          overflow-x: hidden;
        }

        .home-container {
          width: min(100% - 48px, ${W});
          margin: 0 auto;
        }

        .home-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .home-eyebrow-line {
          width: 32px;
          height: 1px;
          background: ${T.accent};
          flex-shrink: 0;
        }

        /* HERO */

        .home-hero {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(243,236,224,0.6),
              transparent 50%
            ),
            ${T.ivory};
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .hero-bg-art {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(
              ${T.line} 1.5px,
              transparent 1.5px
            );
          background-size: 48px 48px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent
          );
          opacity: 0.6;
          pointer-events: none;
        }

        .home-hero-container {
          position: relative;
          z-index: 2;
          padding: 140px 0 100px;
        }

        .home-hero-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.1fr)
            minmax(320px, 0.9fr);
          gap: 60px;
          align-items: center;
        }

        .home-hero-content {
          min-width: 0;
        }

        .home-hero-title {
          font-family: ${SERIF};
          font-size: clamp(42px, 5vw, 76px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: ${T.ink};
          margin: 0 0 24px;
        }

        .home-hero-description {
          max-width: 540px;
          font-family: ${SANS};
          font-size: 18px;
          line-height: 1.75;
          color: ${T.ink2};
          margin: 0 0 38px;
        }

        .home-hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 50px;
        }

        .action-btn {
          min-height: 56px;
          padding: 16px 28px;
          border-radius: 999px;
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 250ms ease;
          text-align: center;
        }

        .action-btn-dark {
          background: ${T.ink};
          color: ${T.white};
        }

        .action-btn-light {
          background: ${T.white};
          color: ${T.ink};
          border: 1px solid ${T.line};
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 15px 30px rgba(18,15,13,0.1);
        }

        .action-btn-dark:hover {
          background: ${T.accent};
        }

        .home-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 25px;
          border-top: 1px solid ${T.line};
          padding-top: 30px;
          max-width: 500px;
        }

        .home-stat-value {
          font-family: ${SERIF};
          font-size: 28px;
          color: ${T.ink};
          font-weight: 600;
        }

        .home-stat-label {
          font-family: ${MONO};
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${T.muted};
          margin-top: 4px;
        }

        .hero-visual-area {
          position: relative;
          height: 600px;
          min-width: 0;
        }

        .hero-image-wrapper {
          width: 100%;
          height: 85%;
          border-radius: 40px;
          overflow: hidden;
          box-shadow:
            0 40px 80px rgba(18,15,13,0.12);
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.02);
          animation:
            slowZoom 20s infinite alternate ease-in-out;
        }

        .hero-floating-card {
          position: absolute;
          bottom: -10px;
          left: -40px;
          right: 40px;
          padding: 32px;
        }

        .hero-floating-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .hero-live {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: ${MONO};
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${T.accent};
          font-weight: 600;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background: #4CAF50;
          border-radius: 50%;
          animation: pulse 2s infinite;
          flex-shrink: 0;
        }

        .hero-floating-title {
          font-family: ${SERIF};
          font-size: 24px;
          font-weight: 600;
          color: ${T.ink};
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .glass-inner-btn {
          width: 100%;
          padding: 16px;
          background: ${T.ink};
          color: ${T.white};
          border-radius: 14px;
          font-family: ${SANS};
          font-weight: 600;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          transition: all 250ms ease;
        }

        .glass-inner-btn:hover {
          background: ${T.accent};
        }

        /* MARQUEE */

        .premium-marquee {
          background: ${T.ivory};
          border-top: 1px solid ${T.line};
          border-bottom: 1px solid ${T.line};
          overflow: hidden;
          position: relative;
        }

        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          padding: 26px 0;
        }

        .marquee-content {
          display: flex;
          width: max-content;
          animation:
            infiniteTicker 40s linear infinite;
        }

        .marquee-group {
          display: inline-flex;
          gap: 54px;
          align-items: center;
          padding-right: 54px;
          flex-shrink: 0;
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          white-space: nowrap;
          font-family: ${MONO};
          font-size: 11px;
          letter-spacing: 0.18em;
          color: ${T.muted};
          font-weight: 500;
        }

        .marquee-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${T.accent};
          flex-shrink: 0;
        }

        /* INTRO */

        .home-intro {
          background: ${T.ivory};
          padding: 120px 0;
        }

        .home-intro-grid {
          display: grid;
          grid-template-columns:
            minmax(240px, 0.8fr)
            minmax(0, 1.2fr);
          gap: 80px;
        }

        .home-intro-label {
          font-family: ${MONO};
          color: ${T.muted};
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1.8;
          margin: 0;
        }

        .home-intro-title {
          font-family: ${SERIF};
          font-size: clamp(32px, 4.5vw, 64px);
          font-weight: 500;
          line-height: 1.1;
          color: ${T.ink};
          margin: 0 0 32px;
        }

        .home-intro-description {
          font-family: ${SANS};
          font-size: 17px;
          line-height: 1.85;
          color: ${T.ink2};
          margin: 0;
        }

        /* PRODUCT SHOWCASE */

        .product-showcase {
          background: ${T.ivory2};
          padding: 120px 0;
          position: relative;
        }

        .section-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 64px;
          flex-wrap: wrap;
          gap: 30px;
        }

        .section-title {
          font-family: ${SERIF};
          font-size: clamp(34px, 4.2vw, 62px);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: ${T.ink};
          line-height: 1.05;
          margin: 0;
        }

        .section-intro-text {
          font-family: ${SANS};
          font-size: 16px;
          color: ${T.ink2};
          max-width: 440px;
          line-height: 1.7;
          margin: 0;
        }

        .product-showcase-grid {
          display: grid;
          grid-template-columns:
            minmax(280px, 1fr)
            minmax(0, 1.1fr);
          gap: 50px;
          align-items: start;
        }

        .showcase-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .showcase-nav-card {
          background: rgba(255,255,255,0.2);
          border: 1px solid ${T.glassBorder};
          border-radius: 20px;
          padding: 24px 30px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          transition:
            all 300ms cubic-bezier(.16,1,.3,1);
        }

        .showcase-nav-card:hover {
          transform: translateY(-2px);
        }

        .showcase-nav-card.active {
          background: ${T.white};
          border-color: ${T.accent};
        }

        .showcase-nav-left {
          display: flex;
          align-items: center;
          gap: 24px;
          min-width: 0;
        }

        .showcase-number {
          font-family: ${MONO};
          font-size: 13px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .showcase-nav-card h4 {
          font-family: ${SERIF};
          font-size: 22px;
          font-weight: 600;
          color: ${T.ink};
          margin: 0;
        }

        .product-detail-card {
          padding: 0;
          overflow: hidden;
        }

        .product-image-container {
          height: 320px;
          overflow: hidden;
          position: relative;
        }

        .dynamic-showcase-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .category-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(10px);
          padding: 6px 14px;
          border-radius: 999px;
          font-family: ${MONO};
          font-size: 11px;
          color: ${T.ink};
          font-weight: 600;
        }

        .product-detail-content {
          padding: 40px;
        }

        .product-detail-content h3 {
          font-family: ${SERIF};
          font-size: 32px;
          font-weight: 600;
          color: ${T.ink};
          margin: 0 0 12px;
        }

        .product-detail-content p {
          font-family: ${SANS};
          font-size: 15px;
          color: ${T.ink2};
          margin: 0 0 24px;
          line-height: 1.7;
        }

        .compound-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 36px;
        }

        .compound-tag {
          padding: 8px 16px;
          background: ${T.ivory};
          border: 1px solid ${T.line};
          border-radius: 999px;
          font-family: ${SANS};
          font-size: 13px;
          color: ${T.ink2};
        }

        .order-now-btn {
          padding: 14px 28px;
          background: transparent;
          border: 1px solid ${T.ink};
          color: ${T.ink};
          border-radius: 999px;
          font-family: ${SANS};
          font-weight: 600;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 250ms;
        }

        .order-now-btn:hover {
          background: ${T.ink};
          color: ${T.white};
        }

        /* QUALITY */

        .quality-section {
          background: ${T.ivory};
          padding: 120px 0;
          border-top: 1px solid ${T.line};
        }

        .quality-heading {
          text-align: center;
          margin-bottom: 64px;
        }

        .quality-title {
          font-family: ${SERIF};
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 500;
          color: ${T.ink};
          margin: 0;
        }

        .quality-heading p {
          font-family: ${SANS};
          font-size: 16px;
          color: ${T.muted};
          max-width: 550px;
          margin: 16px auto 0;
          line-height: 1.7;
        }

        .quality-grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 24px;
        }

        .quality-card {
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .quality-icon {
          color: ${T.accent};
          background: ${T.accentLight};
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quality-card h3 {
          font-family: ${SERIF};
          font-size: 22px;
          font-weight: 600;
          color: ${T.ink};
          margin: 0 0 10px;
        }

        .quality-card p {
          font-family: ${SANS};
          font-size: 14px;
          color: ${T.ink2};
          line-height: 1.6;
          margin: 0;
        }

        /* REVIEWS */

        .reviews-section {
          background: ${T.ivory2};
          padding: 120px 0;
        }

        .reviews-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .review-content {
          min-height: 240px;
        }

        .review-text {
          font-family: ${SERIF};
          font-size: clamp(26px, 3.5vw, 46px);
          line-height: 1.25;
          color: ${T.ink};
          font-weight: 500;
          margin: 0 0 34px;
        }

        .review-divider {
          width: 40px;
          height: 1px;
          background: ${T.accent};
          margin: 0 auto 20px;
        }

        .review-name {
          font-family: ${SANS};
          font-size: 16px;
          font-weight: 600;
          color: ${T.ink};
        }

        .review-meta {
          font-family: ${MONO};
          font-size: 11px;
          color: ${T.muted};
          margin-top: 4px;
        }

        .review-controls {
          display: inline-flex;
          gap: 10px;
          align-items: center;
          padding: 8px;
          border: 1px solid ${T.line};
          border-radius: 999px;
          background: rgba(255,255,255,0.45);
          margin-top: 40px;
        }

        .nav-circle-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${T.white};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 4px 10px rgba(0,0,0,0.05);
        }

        /* CATALOGUE */

        .catalogue-section {
          background: ${T.ivory};
          padding: 120px 0;
        }

        .catalogue-heading {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);
          gap: 60px;
          margin-bottom: 70px;
          align-items: end;
        }

        .catalogue-title {
          font-family: ${SERIF};
          font-size: clamp(34px, 4.2vw, 62px);
          font-weight: 500;
          color: ${T.ink};
          margin: 0;
        }

        .catalogue-heading > p {
          font-family: ${SANS};
          font-size: 16px;
          color: ${T.ink2};
          line-height: 1.7;
          margin: 0;
        }

        .catalogue-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .matrix-card {
          padding: 36px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 300px;
          transition:
            all 350ms cubic-bezier(.16,1,.3,1);
        }

        .matrix-card:hover {
          transform: translateY(-4px);
          border-color: ${T.accent} !important;
          box-shadow:
            0 30px 60px rgba(18,15,13,0.06);
        }

        .matrix-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .matrix-top span {
          font-family: ${MONO};
          font-size: 11px;
          color: ${T.accent};
          font-weight: 600;
        }

        .matrix-card h3 {
          font-family: ${SERIF};
          font-size: 26px;
          font-weight: 600;
          color: ${T.ink};
          margin: 0 0 20px;
        }

        .matrix-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .matrix-tag {
          padding: 6px 12px;
          background: rgba(255,255,255,0.6);
          border: 1px solid ${T.line};
          border-radius: 8px;
          font-family: ${SANS};
          font-size: 12px;
          color: ${T.ink2};
        }

        .matrix-bottom {
          border-top: 1px solid ${T.line};
          margin-top: 30px;
          padding-top: 20px;
          display: flex;
          justify-content: flex-end;
        }

        .matrix-order-btn {
          font-family: ${SANS};
          font-size: 13px;
          font-weight: 600;
          color: ${T.accent};
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
        }

        /* FAQ */

        .faq-section {
          background: ${T.ivory2};
          padding: 120px 0;
          border-top: 1px solid ${T.line};
        }

        .faq-container {
          width: min(100% - 48px, 840px);
          margin: 0 auto;
        }

        .faq-heading {
          text-align: center;
          margin-bottom: 54px;
        }

        .faq-heading h2 {
          font-family: ${SERIF};
          font-size: clamp(32px, 4.2vw, 52px);
          font-weight: 500;
          color: ${T.ink};
          margin: 0;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-card {
          padding: 24px 32px;
          border-radius: 16px;
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          background: transparent;
          color: inherit;
          text-align: left;
          padding: 0;
        }

        .faq-question h3 {
          font-family: ${SERIF};
          font-size: 20px;
          font-weight: 600;
          color: ${T.ink};
          margin: 0;
          line-height: 1.35;
        }

        .faq-icon {
          color: ${T.accent};
          flex-shrink: 0;
        }

        .faq-answer {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition:
            grid-template-rows 300ms ease,
            opacity 300ms ease;
        }

        .faq-answer.visible {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        .faq-answer p {
          min-height: 0;
          overflow: hidden;
          font-family: ${SANS};
          font-size: 15px;
          color: ${T.ink2};
          line-height: 1.7;
          border-top: 1px solid ${T.line};
          padding-top: 16px;
          margin: 16px 0 0;
        }

        /* CTA */

        .cta-section {
          background: ${T.ink};
          color: ${T.white};
          padding: 140px 0;
          position: relative;
          overflow: hidden;
        }

        .cta-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 20% 10%,
              rgba(197, 131, 67, 0.15),
              transparent 35%
            );
        }

        .cta-content {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .cta-content h2 {
          font-family: ${SERIF};
          font-size: clamp(38px, 5.5vw, 80px);
          font-weight: 500;
          line-height: 1.05;
          margin: 0 0 30px;
          color: wheat;
        }

        .cta-content > p {
          max-width: 580px;
          margin: 0 auto 40px;
          font-family: ${SANS};
          font-size: 17px;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .action-btn-gold {
          min-height: 56px;
          padding: 16px 28px;
          background: ${T.accent};
          color: ${T.white};
          border-radius: 999px;
          font-family: ${SANS};
          font-weight: 600;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 250ms;
        }

        .action-btn-gold:hover {
          background: ${T.white};
          color: ${T.ink};
          transform: translateY(-2px);
        }

        .cta-phone {
          min-height: 56px;
          padding: 16px 28px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 600;
        }

        /* ANIMATIONS */

        @keyframes infiniteTicker {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }

        @keyframes slowZoom {
          from {
            transform: scale(1.01);
          }

          to {
            transform: scale(1.07);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }

          50% {
            opacity: 1;
          }
        }

        /* TABLET */

        @media (max-width: 1100px) {
          .home-container {
            width: min(100% - 40px, ${W});
          }

          .home-hero-container {
            padding: 120px 0 80px;
          }

          .home-hero-grid {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(280px, 0.75fr);
            gap: 40px;
          }

          .hero-visual-area {
            height: 520px;
          }

          .hero-floating-card {
            left: -20px;
            right: 20px;
            padding: 26px;
          }

          .quality-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .product-showcase-grid {
            gap: 30px;
          }
        }

        /* SMALL TABLET */

        @media (max-width: 900px) {
          .home-hero {
            min-height: auto;
          }

          .home-hero-container {
            padding: 120px 0 80px;
          }

          .home-hero-grid {
            grid-template-columns: 1fr;
          }

          .home-hero-description {
            max-width: 700px;
          }

          .hero-visual-area {
            height: 460px;
          }

          .hero-image-wrapper {
            height: 100%;
            border-radius: 30px;
          }

          .hero-floating-card {
            left: 30px;
            right: 30px;
            bottom: -30px;
          }

          .home-intro-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .product-showcase-grid {
            grid-template-columns: 1fr;
          }

          .showcase-nav {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .catalogue-heading {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .catalogue-grid {
            grid-template-columns: 1fr;
          }
        }

        /* MOBILE */

        @media (max-width: 680px) {
          .home-container {
            width: calc(100% - 32px);
          }

          .home-eyebrow {
            gap: 8px;
            margin-bottom: 14px;
          }

          .home-eyebrow-line {
            width: 24px;
          }

          .home-hero-container {
            padding: 95px 0 70px;
          }

          .home-hero-title {
            font-size: clamp(39px, 11.5vw, 55px);
            line-height: 1.03;
            letter-spacing: -0.035em;
            margin-bottom: 20px;
          }

          .home-hero-title br {
            display: none;
          }

          .home-hero-description {
            font-size: 15.5px;
            line-height: 1.7;
            margin-bottom: 28px;
          }

          .home-hero-buttons {
            flex-direction: column;
            gap: 10px;
            margin-bottom: 35px;
          }

          .action-btn {
            width: 100%;
            min-height: 54px;
            padding: 15px 20px;
          }

          .home-stats {
            max-width: none;
            gap: 12px;
            padding-top: 22px;
          }

          .home-stat-value {
            font-size: 24px;
          }

          .home-stat-label {
            font-size: 8px;
            line-height: 1.4;
          }

          .hero-visual-area {
            height: 330px;
            margin-top: 10px;
          }

          .hero-image-wrapper {
            height: 100%;
            border-radius: 22px;
          }

          .hero-floating-card {
            left: 12px;
            right: 12px;
            bottom: -65px;
            padding: 18px;
            border-radius: 18px;
          }

          .hero-floating-top {
            margin-bottom: 8px;
          }

          .hero-live {
            font-size: 8px;
            letter-spacing: 0.1em;
          }

          .hero-floating-title {
            font-size: 20px;
            margin-bottom: 10px;
          }

          .glass-inner-btn {
            padding: 13px;
            font-size: 12px;
          }

          .marquee-wrapper {
            padding: 20px 0;
          }

          .marquee-item {
            font-size: 9px;
          }

          .marquee-group {
            gap: 35px;
            padding-right: 35px;
          }

          .home-intro {
            padding: 90px 0 75px;
          }

          .home-intro-title {
            font-size: clamp(34px, 9.5vw, 48px);
            margin-bottom: 22px;
          }

          .home-intro-description {
            font-size: 15px;
            line-height: 1.7;
          }

          .home-intro-label {
            font-size: 10px;
          }

          .product-showcase {
            padding: 75px 0;
          }

          .section-heading-row {
            margin-bottom: 38px;
          }

          .section-title {
            font-size: clamp(34px, 10vw, 48px);
          }

          .section-intro-text {
            font-size: 14px;
          }

          .showcase-nav {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .showcase-nav-card {
            padding: 18px;
            border-radius: 16px;
          }

          .showcase-nav-left {
            gap: 15px;
          }

          .showcase-nav-card h4 {
            font-size: 20px;
          }

          .showcase-number {
            font-size: 11px;
          }

          .product-image-container {
            height: 230px;
          }

          .category-badge {
            top: 12px;
            right: 12px;
            padding: 5px 10px;
            font-size: 9px;
          }

          .product-detail-content {
            padding: 24px;
          }

          .product-detail-content h3 {
            font-size: 27px;
          }

          .product-detail-content p {
            font-size: 14px;
          }

          .compound-tags {
            gap: 7px;
            margin-bottom: 25px;
          }

          .compound-tag {
            padding: 7px 11px;
            font-size: 11px;
          }

          .order-now-btn {
            width: 100%;
            justify-content: center;
          }

          .quality-section {
            padding: 75px 0;
          }

          .quality-heading {
            margin-bottom: 40px;
          }

          .quality-title {
            font-size: 34px;
            line-height: 1.08;
          }

          .quality-heading p {
            font-size: 14px;
          }

          .quality-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .quality-card {
            padding: 23px;
            border-radius: 18px;
          }

          .quality-icon {
            width: 50px;
            height: 50px;
          }

          .quality-card h3 {
            font-size: 21px;
          }

          .quality-card p {
            font-size: 13px;
          }

          .reviews-section {
            padding: 75px 0;
          }

          .review-content {
            min-height: 300px;
          }

          .review-text {
            font-size: 28px;
            line-height: 1.2;
          }

          .review-meta {
            font-size: 9px;
            line-height: 1.5;
          }

          .catalogue-section {
            padding: 75px 0;
          }

          .catalogue-heading {
            margin-bottom: 40px;
          }

          .catalogue-title {
            font-size: 44px;
          }

          .catalogue-heading > p {
            font-size: 14px;
          }

          .catalogue-grid {
            gap: 14px;
          }

          .matrix-card {
            padding: 23px;
            min-height: 270px;
            border-radius: 18px;
          }

          .matrix-card h3 {
            font-size: 24px;
          }

          .matrix-tag {
            font-size: 11px;
            padding: 6px 9px;
          }

          .faq-section {
            padding: 75px 0;
          }

          .faq-container {
            width: calc(100% - 32px);
          }

          .faq-heading {
            margin-bottom: 38px;
          }

          .faq-heading h2 {
            font-size: 38px;
          }

          .faq-list {
            gap: 10px;
          }

          .faq-card {
            padding: 19px;
            border-radius: 15px;
          }

          .faq-question {
            gap: 12px;
          }

          .faq-question h3 {
            font-size: 18px;
            line-height: 1.3;
          }

          .faq-answer p {
            font-size: 13.5px;
            line-height: 1.65;
          }

          .cta-section {
            padding: 90px 0;
          }

          .cta-content h2 {
            font-size: clamp(40px, 12vw, 58px);
            margin-bottom: 22px;
          }

          .cta-content > p {
            font-size: 14px;
            line-height: 1.7;
            margin-bottom: 28px;
          }

          .cta-buttons {
            flex-direction: column;
            gap: 10px;
          }

          .action-btn-gold,
          .cta-phone {
            width: 100%;
            min-height: 54px;
          }
        }

        @media (max-width: 400px) {
          .home-container {
            width: calc(100% - 24px);
          }

          .home-hero-title {
            font-size: 38px;
          }

          .home-stats {
            gap: 8px;
          }

          .home-stat-value {
            font-size: 22px;
          }

          .home-stat-label {
            font-size: 7px;
          }

          .hero-visual-area {
            height: 285px;
          }

          .hero-floating-card {
            bottom: -70px;
          }

          .hero-floating-title {
            font-size: 18px;
          }

          .section-title {
            font-size: 35px;
          }

          .product-detail-content {
            padding: 20px;
          }

          .quality-card {
            padding: 20px;
          }

          .matrix-card {
            padding: 20px;
          }

          .faq-container {
            width: calc(100% - 24px);
          }

          .faq-question h3 {
            font-size: 17px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-img,
          .marquee-content,
          .live-dot {
            animation: none;
          }
        }
      `}</style>

      <Navbar onGetQuote={() => setModal(true)} />

      <Hero onQuote={() => setModal(true)} />

      <PremiumMarquee />

      <Intro />

      <ProductShowcase
        onQuote={() => setModal(true)}
      />

      <QualityCompliance />

      <Reviews />

      <Catalogue
        onQuote={() => setModal(true)}
      />

      <FAQSection />

      <CTA onQuote={() => setModal(true)} />

      <Footer />

      <WhatsAppButton />

      <EnquiryModal
        isOpen={modal}
        onClose={() => setModal(false)}
      />
    </div>
  );
}
