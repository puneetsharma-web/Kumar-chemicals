import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Paintbrush, 
  Scissors, 
  Layers, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Fingerprint,
  Zap,
  Cpu,
  Boxes,
  CheckCircle2
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const T = {
  white: "#FFFFFF",
  ivory: "#FBFBFA",
  ivory2: "#F4F3EF",
  sand: "#E6DEC9",
  ink: "#0D0C0B",
  ink2: "#1C1A18",
  muted: "#8A8172",
  accent: "#B87333", 
  line: "rgba(13, 12, 11, 0.06)",
  lineStrong: "rgba(13, 12, 11, 0.12)"
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace`;

const PREMIUM_INDUSTRIES = [
  {
    id: "pharma",
    index: "01",
    name: "Pharmaceuticals & APIs",
    tagline: "HIGH-PURITY REACTION VEHICLES",
    icon: <Building2 size={20} />,
    blurb: "Calibrated strictly for complex therapeutic compounding, crystallization matrix manipulation, and highly monitored regional extraction setups.",
    metrics: ["Purity Limit: 99.98%", "Thermal Threshold: -20° to 140°C", "Class 8 Catalytic"],
    bgImage: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=1200&q=90",
    linkedProducts: ["Caustic Lye (Pure Base)", "Hydrochloric Acid (Fine)", "Isopropyl Alcohol (Electronic)"]
  },
  {
    id: "paints",
    index: "02",
    name: "Paints & Structural Coatings",
    tagline: "SURFACE ATOMIZATION SOLUTIONS",
    icon: <Paintbrush size={20} />,
    blurb: "Refined aromatic hydrocarbons and multi-stage thinning agents engineered to govern surface evaporation metrics across automotive setups.",
    metrics: ["Volatile Core Spread", "Evaporation Index: Rapid", "Class 3 Flammable Matrix"],
    bgImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=90",
    linkedProducts: ["Mineral Turpentine Oil", "Toluene Premium", "N.C. Thinners Rapid"]
  },
  {
    id: "textile",
    index: "03",
    name: "Textile & Mercerization",
    tagline: "HEAVY ALKALI PROCESSING CIRCUITS",
    icon: <Scissors size={24} />,
    blurb: "Macro fiber tensioning agents and structural molecular oxidation systems configured for automated high-volume textile scouring.",
    metrics: ["High Alkaline Buffering", "Active Compound: 99% Flakes", "Oxidation Vector Secure"],
    bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=90",
    linkedProducts: ["Caustic Soda Flakes", "Sodium Sulfate Anhydrous", "Hydrogen Peroxide Bleach"]
  },
  {
    id: "rubber",
    index: "04",
    name: "Rubber & Advanced Elastomers",
    tagline: "VULCANIZATION MATRIX ACCELERATORS",
    icon: <Layers size={20} />,
    blurb: "Precision sulfur-donor catalyst sequences and chemical processing acids designed to stabilize elastomer elasticity chains under high mechanical heat.",
    metrics: ["Heavy Catalytic Load", "Elastic Retention Limit: Max", "Class 8 Corrosive Base"],
    bgImage: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1200&q=90",
    linkedProducts: ["Sulfuric Acid 98%", "Sulfamic Acid Tech", "Toluene Extraction Solvent"]
  }
];

const METRIC_SLIDES = [
  {
    num: "99.9%",
    label: "BATCH PURITY ASSURANCE",
    title: "Zero-variance chemical tracking protocols.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
  },
  {
    num: "24HR",
    label: "LOGISTICAL CONTINUITY",
    title: "Custom tankers & local backup buffer depots.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80"
  },
  {
    num: "ETP",
    label: "REGULATORY COMPLIANCE",
    title: "Formulated for state board green metrics.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80"
  },
  {
    num: "100%",
    label: "SATELLITE TRACEABILITY",
    title: "Real-time verification batch ledger logs.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
  }
];

export default function Industries() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(1); 

  const handleActiveChange = (idx) => {
    if (idx === active) return;
    setFade(false);
    setTimeout(() => {
      setActive(idx);
      setFade(true);
    }, 180);
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % METRIC_SLIDES.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + METRIC_SLIDES.length) % METRIC_SLIDES.length);
  };

  return (
    <div style={{ background: T.white, color: T.ink, fontFamily: SANS, overflowX: "hidden" }}>
      <style>{`
        /* Compact, Tight Console Rows */
        .console-trigger {
          padding: 28px 40px; border-bottom: 1px solid ${T.line}; cursor: pointer;
          transition: all 400ms cubic-bezier(.16,1,.3,1); position: relative; background: ${T.white};
        }
        .console-trigger:hover, .console-trigger.active {
          background: ${T.ivory}; padding-left: 48px;
        }
        .console-trigger::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 0;
          background: ${T.accent}; transition: width 250ms ease;
        }
        .console-trigger.active::before, .console-trigger:hover::before {
          width: 4px;
        }

        .immersive-screen-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 1.5s cubic-bezier(.16,1,.3,1), opacity 350ms ease;
          opacity: ${fade ? 0.95 : 0.2};
          transform: ${fade ? "scale(1)" : "scale(1.05)"};
        }

        /* Optimized & Scaled Premium Focal Slider */
        .focal-track-wrapper {
          position: relative; display: flex; justify-content: center; align-items: center;
          width: 100%; min-height: 440px; overflow: hidden; margin-top: 20px;
        }
        .focal-card {
          position: absolute; width: 380px; height: 340px; background: ${T.white};
          border: 1px solid ${T.line}; border-radius: 20px; padding: 28px;
          display: flex; flex-direction: column; justify-content: space-between;
          transition: all 600ms cubic-bezier(.16,1,.3,1); opacity: 0; pointer-events: none;
        }
        
        .focal-card.center-focus {
          opacity: 1; transform: translateX(0) scale(1.05) translateY(-10px); z-index: 10;
          pointer-events: auto; border-color: ${T.ink};
          box-shadow: 0 30px 60px rgba(13,12,11,0.06);
        }
        .focal-card.left-blur {
          opacity: 0.35; transform: translateX(-340px) scale(0.88) translateY(10px); z-index: 4;
          filter: blur(6px); pointer-events: auto; cursor: pointer;
        }
        .focal-card.right-blur {
          opacity: 0.35; transform: translateX(340px) scale(0.88) translateY(10px); z-index: 4;
          filter: blur(6px); pointer-events: auto; cursor: pointer;
        }

        .focal-img {
          width: 100%; height: 120px; object-fit: cover; border-radius: 12px;
          margin-top: 14px; filter: grayscale(1); transition: all 0.4s ease;
        }
        .center-focus .focal-img { filter: grayscale(0); }

        .pill-tag {
          font-family: MONO; font-size: 10px; font-weight: 600; padding: 5px 12px;
          border-radius: 999px; background: ${T.white}; border: 1px solid ${T.lineStrong};
        }
        .action-link-btn {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 18px; background: ${T.white}; border: 1px solid ${T.line};
          border-radius: 10px; font-size: 13px; fontWeight: 600; cursor: pointer; transition: all 0.2s ease;
        }
        .action-link-btn:hover {
          background: ${T.ink}; color: ${T.white}; border-color: ${T.ink};
        }
      `}</style>

      <Navbar onGetQuote={() => navigate("/products")} />

      {/* ==========================================================================
         SECTION 1: HERO OVERVIEW
      ========================================================================== */}
      <section style={{ paddingTop: "200px", paddingBottom: "80px", borderBottom: `1px solid ${T.line}`, background: `linear-gradient(180deg, ${T.ivory} 0%, ${T.white} 100%)` }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.6fr", gap: "80px", alignItems: "end" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Fingerprint size={14} style={{ color: T.accent }} />
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: T.accent, fontWeight: 700 }}>
                  SYSTEM OPERATION CORE
                </span>
              </div>
              <h1 style={{ fontFamily: SERIF, fontSize: "clamp(42px, 5.5vw, 68px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
                High-capacity fulfillment built for <span style={{ fontStyle: "italic", color: T.accent }}>complex pipelines</span>.
              </h1>
            </div>
            <div style={{ paddingBottom: "8px" }}>
              <p style={{ fontSize: "15px", lineHeight: "1.6.5", color: T.muted, margin: 0 }}>
                Kumar Chemicals translates severe material specifications into fluid supply execution. Interact with our live sector console blueprint to align technical profiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         SECTION 2: OPTIMIZED LIVE CONSOLE / APP-STYLE APPLICATION MATRIX
      ========================================================================== */}
      <section style={{ borderBottom: `1px solid ${T.line}`, background: T.white }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", minHeight: "680px" }}>
          
          {/* LEFT CONSOLE TRIGGERS (TIGHTENED & PROPORTIONAL) */}
          <div style={{ borderRight: `1px solid ${T.line}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ padding: "24px 40px 12px", opacity: 0.5, fontFamily: MONO, fontSize: "10px", letterSpacing: "0.15em" }}>
              SELECT OPERATIONAL DIVISION //
            </div>
            {PREMIUM_INDUSTRIES.map((ind, i) => (
              <div 
                key={ind.id}
                className={`console-trigger ${active === i ? "active" : ""}`}
                onMouseEnter={() => handleActiveChange(i)}
                onClick={() => handleActiveChange(i)}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                  <span style={{ fontFamily: MONO, fontSize: "12px", color: active === i ? T.accent : T.muted, fontWeight: 600, marginTop: "2px" }}>
                    {ind.index}
                  </span>
                  <div>
                    <span style={{ display: "block", fontFamily: MONO, fontSize: "9px", color: T.accent, letterSpacing: "0.1em", fontWeight: 700, marginBottom: "2px" }}>
                      {ind.tagline}
                    </span>
                    <h3 style={{ fontFamily: SERIF, fontSize: "26px", fontWeight: 400, color: T.ink, lineHeight: "1.15" }}>
                      {ind.name}
                    </h3>
                  </div>
                </div>
                <div style={{ position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", opacity: active === i ? 1 : 0, transition: "all 0.3s ease", color: T.accent }}>
                  <Zap size={16} fill={T.accent} />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SCREEN PERFECT COGNITIVE VIEW (SCALED FOR FULL VISIBILITY) */}
          <div style={{ display: "flex", flexDirection: "column", background: T.ivory, position: "relative" }}>
            
            {/* Visual Viewport Banner */}
            <div style={{ height: "300px", position: "relative", overflow: "hidden", borderBottom: `1px solid ${T.lineStrong}` }}>
              <img 
                src={PREMIUM_INDUSTRIES[active].bgImage} 
                alt="Active sector layout view" 
                className="immersive-screen-img"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(13,12,11,0.6) 100%)" }} />
              
              <div style={{ position: "absolute", bottom: "24px", left: "32px", right: "32px", color: T.white, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <span style={{ fontFamily: MONO, fontSize: "10px", letterSpacing: "0.2em", color: T.sand, display: "block", marginBottom: "2px" }}>LIVE DIVISION APPARATUS</span>
                  <h4 style={{ fontFamily: SERIF, fontSize: "24px", fontWeight: 400, margin: 0 }}>{PREMIUM_INDUSTRIES[active].name}</h4>
                </div>
                <div className="pill-tag" style={{ background: T.ink, color: T.white, border: "none" }}>
                  Active Node // {PREMIUM_INDUSTRIES[active].index}
                </div>
              </div>
            </div>

            {/* Micro Technical Specs frame */}
            <div style={{ padding: "32px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              
              <div style={{ transition: "all 300ms ease", opacity: fade ? 1 : 0, transform: fade ? "translateY(0)" : "translateY(8px)" }}>
                <p style={{ fontFamily: SERIF, fontSize: "20px", lineHeight: "1.45", color: T.ink2, fontStyle: "italic", margin: "0 0 24px 0" }}>
                  "{PREMIUM_INDUSTRIES[active].blurb}"
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
                  {PREMIUM_INDUSTRIES[active].metrics.map((metric, mIdx) => (
                    <div key={mIdx} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: T.white, border: `1px solid ${T.line}`, borderRadius: "8px" }}>
                      <CheckCircle2 size={14} style={{ color: T.accent }} />
                      <span style={{ fontFamily: MONO, fontSize: "11px", fontWeight: 600 }}>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Rows */}
              <div style={{ transition: "all 300ms ease", opacity: fade ? 1 : 0 }}>
                <span style={{ display: "block", fontFamily: MONO, fontSize: "10px", color: T.muted, fontWeight: 700, marginBottom: "12px", letterSpacing: "0.05em" }}>
                  STOWED BULK ASSETS READY FOR DEPLOYMENT:
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {PREMIUM_INDUSTRIES[active].linkedProducts.map((prodName, pIdx) => (
                    <div key={pIdx} className="action-link-btn" onClick={() => navigate("/products")}>
                      <span style={{ fontWeight: 600 }}>{prodName}</span>
                      <ArrowUpRight size={14} style={{ color: T.accent }} />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================================
         SECTION 3: RE-SCALED HIGH-END EDITORIAL FOCAL CAROUSEL (SMALLER & SLEEK)
      ========================================================================== */}
      <section style={{ padding: "100px 0", background: T.ivory, overflow: "hidden", borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 32px" }}>
          
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "16px" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.ivory2, padding: "5px 12px", borderRadius: "999px", marginBottom: "12px", border: `1px solid ${T.lineStrong}` }}>
                <Boxes size={12} style={{ color: T.accent }} />
                <span style={{ fontSize: "10px", fontWeight: 700, fontFamily: MONO, color: T.ink }}>INFRASTRUCTURE BENCHMARKS</span>
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: "38px", fontWeight: 400, color: T.ink, maxWidth: "550px", lineHeight: "1.15" }}>
                Algorithmic continuity. No plant interruptions.
              </h2>
            </div>
            
            {/* Minimal controls */}
            <div style={{ display: "flex", gap: "8px", zIndex: 20 }}>
              <button 
                onClick={prevSlide}
                style={{ width: "48px", height: "48px", borderRadius: "50%", border: `1px solid ${T.lineStrong}`, background: T.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={nextSlide}
                style={{ width: "48px", height: "48px", borderRadius: "50%", border: `1px solid ${T.lineStrong}`, background: T.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Scaled Focal Viewport Frame */}
          <div className="focal-track-wrapper">
            {METRIC_SLIDES.map((slide, sIdx) => {
              let cardClass = "";
              if (sIdx === carouselIndex) {
                cardClass = "center-focus";
              } else if (sIdx === (carouselIndex - 1 + METRIC_SLIDES.length) % METRIC_SLIDES.length) {
                cardClass = "left-blur";
              } else if (sIdx === (carouselIndex + 1) % METRIC_SLIDES.length) {
                cardClass = "right-blur";
              }

              return (
                <div 
                  key={sIdx} 
                  className={`focal-card ${cardClass}`}
                  onClick={() => {
                    if (cardClass === "left-blur") prevSlide();
                    if (cardClass === "right-blur") nextSlide();
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "44px", fontFamily: SERIF, color: T.accent, fontWeight: 400, lineHeight: 1 }}>{slide.num}</span>
                      <span style={{ fontFamily: MONO, fontSize: "9px", color: T.muted, fontWeight: 700, letterSpacing: "0.1em" }}>{slide.label}</span>
                    </div>
                    <h4 style={{ fontFamily: SANS, fontSize: "16px", fontWeight: 600, color: T.ink, lineHeight: "1.35", margin: 0 }}>
                      {slide.title}
                    </h4>
                  </div>
                  <img src={slide.img} alt={slide.title} className="focal-img" />
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==========================================================================
         SECTION 4: LOGISTICAL ASSURANCE MAP ACCENT
      ========================================================================== */}
      <section style={{ padding: "120px 0", background: T.white }}>
        <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Cpu size={16} style={{ color: T.accent }} />
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: T.accent, fontWeight: 700 }}>
                  SECURE SOURCING PIPELINE
                </span>
              </div>
              <h2 style={{ fontFamily: SERIF, fontSize: "42px", fontWeight: 400, lineHeight: 1.15, marginBottom: "20px" }}>
                Strict multi-depot consignment delivery.
              </h2>
              <p style={{ fontSize: "15px", color: T.muted, lineHeight: "1.7", marginBottom: "0" }}>
                We protect commercial plant parameters from volatile delivery blockages. By deploying dedicated chemical tankers and holding extensive security stocks at key logistical nodes, we ensure high-output manufacturing lines remain uninterrupted during peak consumption frames.
              </p>
            </div>

            <div style={{ borderLeft: `2px solid ${T.accent}`, paddingLeft: "48px" }}>
              <div style={{ marginBottom: "36px" }}>
                <span style={{ fontFamily: MONO, fontSize: "11px", color: T.accent, fontWeight: 700, display: "block", marginBottom: "6px" }}>B2B CUSTOM PROPERTY TUNING</span>
                <p style={{ fontSize: "14px", color: T.ink2, lineHeight: "1.55", margin: 0 }}>
                  If your chemical parsing framework mandates non-standard acid densities or highly specific alkali concentration levels, our laboratory team adapts molecular properties to seamlessly fit your existing setup.
                </p>
              </div>
              <button 
                onClick={() => navigate("/products")}
                style={{ background: T.ink, color: T.white, border: "none", padding: "18px 36px", borderRadius: "12px", fontWeight: 600, fontSize: "14px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", transition: "background 0.2s" }}
              >
                <span>Initialize Catalog Access</span>
                <ArrowUpRight size={14} style={{ color: T.sand }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}