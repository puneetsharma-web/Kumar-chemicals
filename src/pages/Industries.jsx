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
  CheckCircle2,
  FileText,
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
  lineStrong: "rgba(13, 12, 11, 0.12)",
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace`;

/**
 * NOTE FOR PUNEET: I've grounded every spec, grade, packaging size and
 * application below in how these chemicals are actually bought and used —
 * but swap in your real stocked grades, pack sizes and depot details
 * wherever they differ from what's here. Treat this as the correct
 * *shape* of real content, not verified copy.
 */
const PREMIUM_INDUSTRIES = [
  {
    id: "pharma",
    index: "01",
    name: "Pharmaceuticals & Fine Chemicals",
    tagline: "REACTOR-GRADE ACIDS, ALKALIS & SOLVENTS",
    icon: <Building2 size={20} />,
    blurb:
      "IP/BP-grade caustic soda, hydrochloric acid and isopropyl alcohol for pH correction, crystallisation and reactor washdown — every batch shipped with a certificate of analysis for your QA file.",
    metrics: [
      "Grades: IP · BP · AR · LR",
      "UN Class 8 — Corrosive",
      "COA with every batch",
    ],
    applications: [
      "pH correction during API synthesis",
      "Solvent recovery & crystallisation",
      "Reactor and vessel washdown",
    ],
    packaging: "35kg carboys · 250kg MS drums · 12–16 KL tanker",
    bgImage:
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=1200&q=90",
    linkedProducts: [
      "Caustic Soda Lye 32% (Pharma Grade)",
      "Hydrochloric Acid 30% (AR Grade)",
      "Isopropyl Alcohol 99.9% (IP Grade)",
    ],
  },
  {
    id: "paints",
    index: "02",
    name: "Paints, Inks & Coatings",
    tagline: "SOLVENTS FOR VISCOSITY & CURE CONTROL",
    icon: <Paintbrush size={20} />,
    blurb:
      "Mineral turpentine oil, toluene and N.C. thinners sized to your line's evaporation rate — the same solvents that decide how a coat levels, dries and sands.",
    metrics: [
      "Flash Point: 4–40°C range",
      "UN Class 3 — Flammable Liquid",
      "Batch-to-batch colour ≤ 10 APHA",
    ],
    applications: [
      "Thinning & viscosity control for spray lines",
      "Gravure and flexo ink formulation",
      "Cleaning solvent for equipment changeovers",
    ],
    packaging: "165kg / 210L drums · ISO tanker on bulk orders",
    bgImage:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&q=90",
    linkedProducts: [
      "Mineral Turpentine Oil",
      "Toluene (Premium Grade)",
      "N.C. Thinner (Rapid Cure)",
    ],
  },
  {
    id: "textile",
    index: "03",
    name: "Textile Processing & Dyeing",
    tagline: "MERCERIZING, BLEACHING & DYE-BATH CHEMICALS",
    icon: <Scissors size={24} />,
    blurb:
      "Caustic soda flakes for mercerizing cotton, 50% hydrogen peroxide for bleaching, Glauber's salt for dye uptake — the standard wet-processing chemistry, stocked at the concentrations mills actually run.",
    metrics: [
      "Caustic: 99% flakes / 48% lye",
      "H₂O₂: 35% & 50% w/w",
      "Glauber's Salt: 99% anhydrous",
    ],
    applications: [
      "Mercerizing cotton fibre",
      "Peroxide bleaching before dyeing",
      "Dye-bath pH buffering & levelling",
    ],
    packaging: "50kg HDPE bags · 35kg carboys · tanker on request",
    bgImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=90",
    linkedProducts: [
      "Caustic Soda Flakes 99%",
      "Hydrogen Peroxide 50%",
      "Sodium Sulphate Anhydrous (Glauber's Salt)",
    ],
  },
  {
    id: "rubber",
    index: "04",
    name: "Rubber & Elastomers",
    tagline: "COAGULATION ACIDS & PROCESS CHEMICALS",
    icon: <Layers size={20} />,
    blurb:
      "98% sulphuric acid for latex coagulation and sulphamic acid for descaling process equipment — supplied in the concentrations that match your coagulation bath chemistry, not a generic industrial grade.",
    metrics: [
      "H₂SO₄: 98% Technical Grade",
      "UN Class 8 — Corrosive",
      "Sulphamic Acid: 99.5% min",
    ],
    applications: [
      "Latex coagulation bath",
      "Acid washing of rubber compounds",
      "Descaling of process vessels & pipework",
    ],
    packaging: "35kg carboys · tanker (bulk coagulant supply)",
    bgImage:
      "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1200&q=90",
    linkedProducts: [
      "Sulphuric Acid 98% (Technical)",
      "Sulphamic Acid (Technical Grade)",
      "Toluene (Extraction Solvent)",
    ],
  },
  {
    id: "paper",
    index: "05",
    name: "Paper & Pulp",
    tagline: "PULPING, BLEACHING & SIZING CHEMICALS",
    icon: <FileText size={20} />,
    blurb:
      "Caustic soda for the pulping liquor, hydrogen peroxide for chlorine-free bleaching, alum for sizing — the chemistry that runs quietly behind every ream, stocked for mills that can't afford a line stoppage.",
    metrics: [
      "Caustic: 48% lye for Kraft liquor",
      "H₂O₂: ECF/TCF bleaching grade",
      "Alum: 17% Al₂O₃ min",
    ],
    applications: [
      "Kraft pulping liquor makeup",
      "Chlorine-free (ECF/TCF) bleaching",
      "Paper sizing & retention aid dosing",
    ],
    packaging: "50kg bags · 35kg carboys · bulk tanker for mill supply",
    bgImage:
      "https://images.unsplash.com/photo-1586953135184-33a86d90bfea?w=1200&q=90",
    linkedProducts: [
      "Caustic Soda Lye 48% (Pulping Grade)",
      "Hydrogen Peroxide 50% (Bleaching Grade)",
      "Aluminium Sulphate (Alum, Non-Ferric)",
    ],
  },
];

const METRIC_SLIDES = [
  {
    num: "2002",
    label: "IN OPERATION SINCE",
    title: "Two decades supplying industrial chemicals from Una, HP.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
  },
  {
    num: "COA",
    label: "EVERY CONSIGNMENT",
    title: "Certificate of analysis shipped with every batch.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  {
    num: "16KL",
    label: "TANKER DELIVERY",
    title: "Bulk tanker supply for high-volume plant orders.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
  },
  {
    num: "UN",
    label: "HAZARD-CLASS PACKAGING",
    title: "Packed and labelled to UN/IMDG transport standards.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  },
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
    setCarouselIndex(
      (prev) => (prev + 1) % METRIC_SLIDES.length
    );
  };

  const prevSlide = () => {
    setCarouselIndex(
      (prev) =>
        (prev - 1 + METRIC_SLIDES.length) %
        METRIC_SLIDES.length
    );
  };

  return (
    <div
      style={{
        background: T.white,
        color: T.ink,
        fontFamily: SANS,
        overflowX: "hidden",
      }}
    >
      <style>{`
        .console-trigger {
          padding: 28px 40px;
          border-bottom: 1px solid ${T.line};
          cursor: pointer;
          transition: all 400ms cubic-bezier(.16,1,.3,1);
          position: relative;
          background: ${T.white};
        }

        .console-trigger:hover,
        .console-trigger.active {
          background: ${T.ivory};
          padding-left: 48px;
        }

        .console-trigger::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0;
          background: ${T.accent};
          transition: width 250ms ease;
        }

        .console-trigger.active::before,
        .console-trigger:hover::before {
          width: 4px;
        }

        .immersive-screen-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition:
            transform 1.5s cubic-bezier(.16,1,.3,1),
            opacity 350ms ease;
          opacity: ${fade ? 0.95 : 0.2};
          transform: ${fade ? "scale(1)" : "scale(1.05)"};
        }

        .focal-track-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 440px;
          overflow: hidden;
          margin-top: 20px;
        }

        .focal-card {
          position: absolute;
          width: 380px;
          height: 340px;
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 20px;
          padding: 28px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 600ms cubic-bezier(.16,1,.3,1);
          opacity: 0;
          pointer-events: none;
        }

        .focal-card.center-focus {
          opacity: 1;
          transform: translateX(0) scale(1.05) translateY(-10px);
          z-index: 10;
          pointer-events: auto;
          border-color: ${T.ink};
          box-shadow: 0 30px 60px rgba(13,12,11,0.06);
        }

        .focal-card.left-blur {
          opacity: 0.35;
          transform:
            translateX(-340px)
            scale(0.88)
            translateY(10px);
          z-index: 4;
          filter: blur(6px);
          pointer-events: auto;
          cursor: pointer;
        }

        .focal-card.right-blur {
          opacity: 0.35;
          transform:
            translateX(340px)
            scale(0.88)
            translateY(10px);
          z-index: 4;
          filter: blur(6px);
          pointer-events: auto;
          cursor: pointer;
        }

        .focal-img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 12px;
          margin-top: 14px;
          filter: grayscale(1);
          transition: all 0.4s ease;
        }

        .center-focus .focal-img {
          filter: grayscale(0);
        }

        .pill-tag {
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 999px;
          background: ${T.white};
          border: 1px solid ${T.lineStrong};
          white-space: nowrap;
        }

        .action-link-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 12px 18px;
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-link-btn:hover {
          background: ${T.ink};
          color: ${T.white};
          border-color: ${T.ink};
        }

        .application-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          line-height: 1.5;
          color: ${T.ink2};
        }

        .application-item::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: ${T.accent};
          margin-top: 8px;
          flex-shrink: 0;
        }

        .packaging-note {
          font-family: ${MONO};
          font-size: 11px;
          color: ${T.muted};
          border-top: 1px solid ${T.line};
          padding-top: 12px;
          margin-top: 4px;
        }

        .industries-shell {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .industry-hero-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          gap: 80px;
          align-items: end;
        }

        .industry-console {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          min-height: 680px;
        }

        .console-sidebar {
          border-right: 1px solid ${T.line};
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .console-main {
          display: flex;
          flex-direction: column;
          background: ${T.ivory};
          position: relative;
        }

        .console-image {
          height: 300px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid ${T.lineStrong};
        }

        .console-content {
          padding: 32px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
        }

        .metric-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .metric-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }

        .metric-right {
          border-left: 2px solid ${T.accent};
          padding-left: 48px;
        }

        @media (max-width: 1100px) {
          .industries-shell {
            padding: 0 28px;
          }

          .industry-hero-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .industry-console {
            grid-template-columns: 1fr;
          }

          .console-sidebar {
            border-right: none;
            border-bottom: 1px solid ${T.line};
          }

          .console-main {
            min-height: 650px;
          }

          .metric-main-grid {
            gap: 60px;
          }
        }

        @media (max-width: 700px) {
          .industries-shell {
            padding: 0 20px;
          }

          .industry-hero {
            padding-top: 140px !important;
            padding-bottom: 65px !important;
          }

          .industry-hero h1 {
            font-size: clamp(42px, 11vw, 58px) !important;
            line-height: 1.05 !important;
            margin-bottom: 20px !important;
          }

          .industry-hero-grid {
            gap: 15px;
          }

          .industry-console {
            display: block;
            min-height: 0;
          }

          .console-sidebar {
            display: block;
          }

          .console-sidebar-header {
            padding: 22px 20px 10px !important;
          }

          .console-trigger {
            padding: 22px 20px;
          }

          .console-trigger:hover,
          .console-trigger.active {
            padding-left: 25px;
          }

          .console-trigger h3 {
            font-size: 21px !important;
            line-height: 1.2 !important;
            margin: 5px 0 0 !important;
          }

          .console-trigger > div:first-child {
            gap: 14px !important;
          }

          .console-trigger > div:last-child {
            right: 20px !important;
          }

          .console-main {
            min-height: 0;
          }

          .console-image {
            height: 260px;
          }

          .console-image-content {
            left: 20px !important;
            right: 20px !important;
            bottom: 20px !important;
          }

          .console-image-content h4 {
            font-size: 21px !important;
          }

          .pill-tag {
            font-size: 8px;
            padding: 5px 9px;
          }

          .console-content {
            padding: 24px 20px 30px;
          }

          .console-content p {
            font-size: 18px !important;
          }

          .industry-metrics {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }

          .industry-metric-item {
            padding: 11px 13px !important;
          }

          .industry-metric-item span {
            font-size: 9px !important;
          }

          .metric-section {
            padding: 70px 0 !important;
          }

          .metric-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 25px;
          }

          .metric-header h2 {
            font-size: 31px !important;
          }

          .metric-controls {
            align-self: flex-end;
          }

          .metric-controls button {
            width: 42px !important;
            height: 42px !important;
          }

          .focal-track-wrapper {
            min-height: 390px;
            margin-top: 10px;
          }

          .focal-card {
            width: calc(100vw - 50px);
            max-width: 380px;
            height: 330px;
            padding: 23px;
          }

          .focal-card.center-focus {
            transform: translateX(0) scale(1);
          }

          .focal-card.left-blur {
            transform:
              translateX(-115%)
              scale(0.82)
              translateY(10px);
            opacity: 0.15;
            filter: blur(5px);
          }

          .focal-card.right-blur {
            transform:
              translateX(115%)
              scale(0.82)
              translateY(10px);
            opacity: 0.15;
            filter: blur(5px);
          }

          .focal-img {
            height: 115px;
          }

          .metric-main-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .metric-right {
            border-left: none;
            border-top: 2px solid ${T.accent};
            padding-left: 0;
            padding-top: 30px;
          }

          .logistics-section {
            padding: 75px 0 !important;
          }

          .logistics-section h2 {
            font-size: 35px !important;
          }

          .logistics-button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 420px) {
          .industries-shell {
            padding: 0 16px;
          }

          .console-trigger {
            padding: 20px 16px;
          }

          .console-trigger:hover,
          .console-trigger.active {
            padding-left: 21px;
          }

          .console-trigger > div:last-child {
            right: 16px !important;
          }

          .console-trigger h3 {
            font-size: 19px !important;
            max-width: 245px;
          }

          .console-trigger span {
            font-size: 8px !important;
          }

          .console-image {
            height: 230px;
          }

          .console-content {
            padding: 22px 16px 26px;
          }

          .pill-tag {
            display: none;
          }

          .focal-card {
            width: calc(100vw - 32px);
            height: 320px;
            padding: 20px;
          }

          .focal-card.left-blur,
          .focal-card.right-blur {
            opacity: 0;
          }

          .metric-header h2 {
            font-size: 29px !important;
          }

          .logistics-section h2 {
            font-size: 31px !important;
          }
        }
      `}</style>

      <Navbar onGetQuote={() => navigate("/products")} />

      {/* HERO */}
      <section
        className="industry-hero"
        style={{
          paddingTop: "200px",
          paddingBottom: "80px",
          borderBottom: `1px solid ${T.line}`,
          background: `linear-gradient(
            180deg,
            ${T.ivory} 0%,
            ${T.white} 100%
          )`,
        }}
      >
        <div className="industries-shell">
          <div className="industry-hero-grid">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <Fingerprint
                  size={14}
                  style={{ color: T.accent }}
                />

                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: T.accent,
                    fontWeight: 700,
                  }}
                >
                  SECTOR-WISE SPECIFICATIONS
                </span>
              </div>

              <h1
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(42px, 5.5vw, 68px)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  margin: "0 0 20px",
                  color:"black"
                }}
              >
                Built for what each{" "}
                <span
                  style={{
                    fontStyle: "italic",
                    color: T.accent,
                  }}
                >
                  plant actually runs on
                </span>
                .
              </h1>
            </div>

            <div style={{ paddingBottom: "8px" }}>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: "1.65",
                  color: T.muted,
                  margin: 0,
                }}
              >
                Every industry below runs on a different mix of acids,
                alkalis and solvents, at different grades and concentrations.
                Pick your sector to see exactly what we stock for it — grade,
                packaging and where it's actually used on your line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRY CONSOLE */}
      <section
        style={{
          borderBottom: `1px solid ${T.line}`,
          background: T.white,
        }}
      >
        <div className="industry-console">
          {/* LEFT */}
          <div className="console-sidebar">
            <div
              className="console-sidebar-header"
              style={{
                padding: "24px 40px 12px",
                opacity: 0.5,
                fontFamily: MONO,
                fontSize: "10px",
                letterSpacing: "0.15em",
              }}
            >
              SELECT YOUR INDUSTRY //
            </div>

            {PREMIUM_INDUSTRIES.map((ind, i) => (
              <div
                key={ind.id}
                className={`console-trigger ${
                  active === i ? "active" : ""
                }`}
                onMouseEnter={() => handleActiveChange(i)}
                onClick={() => handleActiveChange(i)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "12px",
                      color:
                        active === i ? T.accent : T.muted,
                      fontWeight: 600,
                      marginTop: "2px",
                    }}
                  >
                    {ind.index}
                  </span>

                  <div>
                    <span
                      style={{
                        display: "block",
                        fontFamily: MONO,
                        fontSize: "9px",
                        color: T.accent,
                        letterSpacing: "0.1em",
                        fontWeight: 700,
                        marginBottom: "2px",
                      }}
                    >
                      {ind.tagline}
                    </span>

                    <h3
                      style={{
                        fontFamily: SERIF,
                        fontSize: "26px",
                        fontWeight: 400,
                        color: T.ink,
                        lineHeight: "1.15",
                        margin: "5px 0 0",
                      }}
                    >
                      {ind.name}
                    </h3>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: "40px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: active === i ? 1 : 0,
                    transition: "all 0.3s ease",
                    color: T.accent,
                  }}
                >
                  <Zap size={16} fill={T.accent} />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="console-main">
            <div className="console-image">
              <img
                src={PREMIUM_INDUSTRIES[active].bgImage}
                alt={`${PREMIUM_INDUSTRIES[active].name} facility`}
                className="immersive-screen-img"
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(13,12,11,0.6) 100%)",
                }}
              />

              <div
                className="console-image-content"
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "32px",
                  right: "32px",
                  color: T.white,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: 20,
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      color: T.sand,
                      display: "block",
                      marginBottom: "2px",
                    }}
                  >
                    CURRENTLY VIEWING
                  </span>

                  <h4
                    style={{
                      fontFamily: SERIF,
                      fontSize: "24px",
                      fontWeight: 400,
                      margin: 0,
                    }}
                  >
                    {PREMIUM_INDUSTRIES[active].name}
                  </h4>
                </div>

                <div
                  className="pill-tag"
                  style={{
                    background: T.ink,
                    color: T.white,
                    border: "none",
                  }}
                >
                  Sector {PREMIUM_INDUSTRIES[active].index}
                </div>
              </div>
            </div>

            <div className="console-content">
              <div
                style={{
                  transition: "all 300ms ease",
                  opacity: fade ? 1 : 0,
                  transform: fade
                    ? "translateY(0)"
                    : "translateY(8px)",
                }}
              >
                <p
                  style={{
                    fontFamily: SERIF,
                    fontSize: "19px",
                    lineHeight: "1.45",
                    color: T.ink2,
                    fontStyle: "italic",
                    margin: "0 0 20px",
                  }}
                >
                  "{PREMIUM_INDUSTRIES[active].blurb}"
                </p>

                <div
                  className="industry-metrics"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    marginBottom: "22px",
                  }}
                >
                  {PREMIUM_INDUSTRIES[active].metrics.map(
                    (metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="industry-metric-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "12px 16px",
                          background: T.white,
                          border: `1px solid ${T.line}`,
                          borderRadius: "8px",
                        }}
                      >
                        <CheckCircle2
                          size={14}
                          style={{ color: T.accent, flexShrink: 0 }}
                        />

                        <span
                          style={{
                            fontFamily: MONO,
                            fontSize: "11px",
                            fontWeight: 600,
                          }}
                        >
                          {metric}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <span
                  style={{
                    display: "block",
                    fontFamily: MONO,
                    fontSize: "10px",
                    color: T.muted,
                    fontWeight: 700,
                    marginBottom: "10px",
                    letterSpacing: "0.05em",
                  }}
                >
                  WHERE THIS IS USED:
                </span>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    marginBottom: "8px",
                  }}
                >
                  {PREMIUM_INDUSTRIES[active].applications.map(
                    (app, aIdx) => (
                      <div key={aIdx} className="application-item">
                        {app}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div
                style={{
                  transition: "all 300ms ease",
                  opacity: fade ? 1 : 0,
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: MONO,
                    fontSize: "10px",
                    color: T.muted,
                    fontWeight: 700,
                    marginBottom: "12px",
                    letterSpacing: "0.05em",
                  }}
                >
                  PRODUCTS WE SUPPLY FOR THIS SECTOR:
                </span>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  {PREMIUM_INDUSTRIES[
                    active
                  ].linkedProducts.map((prodName, pIdx) => (
                    <div
                      key={pIdx}
                      className="action-link-btn"
                      onClick={() => navigate("/products")}
                    >
                      <span>{prodName}</span>

                      <ArrowUpRight
                        size={14}
                        style={{
                          color: T.accent,
                          flexShrink: 0,
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="packaging-note">
                  PACKAGING & SUPPLY: {PREMIUM_INDUSTRIES[active].packaging}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section
        className="metric-section"
        style={{
          padding: "100px 0",
          background: T.ivory,
          overflow: "hidden",
          borderBottom: `1px solid ${T.line}`,
        }}
      >
        <div className="industries-shell">
          <div className="metric-header">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: T.ivory2,
                  padding: "5px 12px",
                  borderRadius: "999px",
                  marginBottom: "12px",
                  border: `1px solid ${T.lineStrong}`,
                }}
              >
                <Boxes
                  size={12}
                  style={{ color: T.accent }}
                />

                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    fontFamily: MONO,
                    color: T.ink,
                  }}
                >
                  WHY BUYERS STAY WITH US
                </span>
              </div>

              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: "38px",
                  fontWeight: 400,
                  color: T.ink,
                  maxWidth: "550px",
                  lineHeight: "1.15",
                  margin: 0,
                }}
              >
                Consistent supply. No plant downtime.
              </h2>
            </div>

            <div
              className="metric-controls"
              style={{
                display: "flex",
                gap: "8px",
                zIndex: 20,
              }}
            >
              <button
                onClick={prevSlide}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: `1px solid ${T.lineStrong}`,
                  background: T.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextSlide}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  border: `1px solid ${T.lineStrong}`,
                  background: T.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="focal-track-wrapper">
            {METRIC_SLIDES.map((slide, sIdx) => {
              let cardClass = "";

              if (sIdx === carouselIndex) {
                cardClass = "center-focus";
              } else if (
                sIdx ===
                (carouselIndex - 1 + METRIC_SLIDES.length) %
                  METRIC_SLIDES.length
              ) {
                cardClass = "left-blur";
              } else if (
                sIdx ===
                (carouselIndex + 1) %
                  METRIC_SLIDES.length
              ) {
                cardClass = "right-blur";
              }

              return (
                <div
                  key={sIdx}
                  className={`focal-card ${cardClass}`}
                  onClick={() => {
                    if (cardClass === "left-blur") {
                      prevSlide();
                    }

                    if (cardClass === "right-blur") {
                      nextSlide();
                    }
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "10px",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "44px",
                          fontFamily: SERIF,
                          color: T.accent,
                          fontWeight: 400,
                          lineHeight: 1,
                        }}
                      >
                        {slide.num}
                      </span>

                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: "9px",
                          color: T.muted,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {slide.label}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontFamily: SANS,
                        fontSize: "16px",
                        fontWeight: 600,
                        color: T.ink,
                        lineHeight: "1.35",
                        margin: 0,
                      }}
                    >
                      {slide.title}
                    </h4>
                  </div>

                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="focal-img"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOGISTICS */}
      <section
        className="logistics-section"
        style={{
          padding: "120px 0",
          background: T.white,
        }}
      >
        <div className="industries-shell">
          <div className="metric-main-grid">
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <Cpu
                  size={16}
                  style={{ color: T.accent }}
                />

                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: T.accent,
                    fontWeight: 700,
                  }}
                >
                  SUPPLY RELIABILITY
                </span>
              </div>

              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: "42px",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  margin: "0 0 20px",
                }}
              >
                Stock held close to where you need it.
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  color: T.muted,
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                Since 2002, we've supplied acids, alkalis and industrial
                solvents to manufacturers across Himachal Pradesh and Punjab
                from our base in Una. Regular buyers get scheduled top-ups
                instead of one-off orders, so a delayed shipment doesn't mean
                a stopped line.
              </p>
            </div>

            <div className="metric-right">
              <div style={{ marginBottom: "36px" }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "11px",
                    color: T.accent,
                    fontWeight: 700,
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  CUSTOM CONCENTRATIONS & PACK SIZES
                </span>

                <p
                  style={{
                    fontSize: "14px",
                    color: T.ink2,
                    lineHeight: "1.55",
                    margin: 0,
                  }}
                >
                  Need a specific concentration, a different pack size, or a
                  chemical outside this list? Tell us your process and we'll
                  source or blend to match it — including bulk tanker
                  quantities.
                </p>
              </div>

              <button
                className="logistics-button"
                onClick={() => navigate("/products")}
                style={{
                  background: T.ink,
                  color: T.white,
                  border: "none",
                  padding: "18px 36px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>View Full Product Catalog</span>

                <ArrowUpRight
                  size={14}
                  style={{ color: T.sand }}
                />
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