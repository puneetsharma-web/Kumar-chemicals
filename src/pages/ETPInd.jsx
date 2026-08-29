import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlaskConical,
  Waves,
  Filter,
  Wind,
  Layers3,
  Droplets,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  HardHat,
  Microscope,
  ClipboardCheck,
  UserCog,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const T = {
  white: "#FFFFFF",
  ivory: "#FBFBFA",
  ivory2: "#F4F3EF",
  ink: "#0D0C0B",
  ink2: "#1C1A18",
  muted: "#8A8172",
  teal: "#2F6F63",
  tealLight: "#7FB3A8",
  murk: "#8A6D4A",
  line: "rgba(13, 12, 11, 0.06)",
  lineStrong: "rgba(13, 12, 11, 0.12)",
  lineOnDark: "rgba(255, 255, 255, 0.1)",
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace`;

/**
 * NOTE FOR PUNEET: stages, chemicals and roles reflect how a standard
 * industrial ETP actually runs. Swap in your real stocked products,
 * grades, and any plants you already supply in the
 * Baddi-Barotiwala-Nalagarh belt. Discharge figures are the Indian
 * CPCB *general* standard for inland surface water — a specific
 * plant's consent-to-operate limit from the State Pollution Control
 * Board can be tighter, so that distinction is called out rather
 * than presented as universal.
 */
const ETP_STAGES = [
  {
    index: "01",
    name: "Screening & Equalization",
    icon: <Filter size={18} />,
    blurb:
      "Raw effluent swings in flow and strength hour to hour. Screens pull out solids first; an equalization tank blends batches so nothing downstream gets hit by a sudden dye or acid discharge.",
    chemicals: ["Antifoam / defoamer (silicone-based)", "Bleaching powder — odour control"],
    purpose: "Dosing here is minimal — mainly antifoam for high-foaming effluent (textile, dairy, detergent units).",
  },
  {
    index: "02",
    name: "pH Neutralization",
    icon: <FlaskConical size={18} />,
    blurb:
      "Effluent arrives anywhere from pH 2 to pH 12 depending on the process it came from. Biological treatment only works in a narrow band, so this gets corrected first.",
    chemicals: ["Hydrated lime — raises pH", "Caustic soda lye 48% — raises pH", "Sulphuric acid 98% — lowers pH"],
    purpose: "Dosed via pH-controlled pumps, targeting pH 6.5–8.5 before the effluent moves to coagulation.",
  },
  {
    index: "03",
    name: "Coagulation & Flocculation",
    icon: <Waves size={18} />,
    blurb:
      "A coagulant neutralises the charge on suspended particles so they clump; a flocculant binds those clumps into floc heavy enough to settle out.",
    chemicals: ["Alum (aluminium sulphate)", "Poly aluminium chloride (PAC)", "Ferric chloride / ferrous sulphate", "Polyelectrolyte — flocculant aid"],
    purpose: "Dosage is set by jar testing each batch — a dye house and a pharma unit need very different coagulant strength.",
  },
  {
    index: "04",
    name: "Biological Treatment",
    icon: <Layers3 size={18} />,
    blurb:
      "Aerobic (activated sludge) or anaerobic (UASB) processes use bacteria to break down dissolved organic load — most of the BOD and COD reduction happens here.",
    chemicals: ["Urea & DAP — nutrient dosing", "Sodium bicarbonate — alkalinity", "Antifoam — aeration tank foaming"],
    purpose: "Get the BOD:N:P ratio wrong and the bacterial culture either starves or bulks, and treatment efficiency drops.",
  },
  {
    index: "05",
    name: "Tertiary Polishing",
    icon: <Wind size={18} />,
    blurb:
      "Sand filtration removes remaining fine solids; activated carbon strips colour and odour; disinfection kills pathogens before discharge or reuse.",
    chemicals: ["Activated carbon — colour & odour removal", "Sodium / calcium hypochlorite — disinfection", "Sodium metabisulphite — dechlorination"],
    purpose: "This stage decides whether treated water can be reused for gardening/cooling, or only clears the bar for surface discharge.",
  },
  {
    index: "06",
    name: "Sludge Dewatering",
    icon: <Droplets size={18} />,
    blurb:
      "Every stage above produces sludge. Conditioning it properly decides whether it presses into disposable cake or clogs the whole system.",
    chemicals: ["Cationic polyelectrolyte — sludge conditioning", "Lime — sludge stabilization"],
    purpose: "Correctly conditioned sludge dewaters to 20–30% solids in a filter press, cutting the volume hauled out for disposal.",
  },
];

const ROLES = [
  { icon: <HardHat size={18} />, title: "ETP In-Charge", blurb: "Owns daily plant performance — sets dosing rates, tracks quality, decides when a stage needs adjustment." },
  { icon: <UserCog size={18} />, title: "ETP Operator", blurb: "Runs the dosing pumps, aerators and filter press on shift — usually first to spot foaming, colour, or a clarifier not settling." },
  { icon: <Microscope size={18} />, title: "Lab Chemist", blurb: "Runs jar tests to fix coagulant dose, tracks BOD/COD/TSS/pH daily so dosing gets corrected before a bad batch reaches the outlet." },
  { icon: <ClipboardCheck size={18} />, title: "Compliance Officer", blurb: "Manages consent-to-operate renewals and State Pollution Control Board reporting — the paperwork that keeps the plant legally running." },
];

const DISCHARGE_NORMS = [
  { param: "pH", limit: "5.5 – 9.0" },
  { param: "Suspended solids", limit: "≤ 100 mg/l" },
  { param: "Oil & grease", limit: "≤ 10 mg/l" },
  { param: "BOD (3 days, 27°C)", limit: "≤ 30 mg/l*" },
];

export default function ETPSolutions() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  return (
    <div style={{ background: T.white, color: T.ink, fontFamily: SANS, overflowX: "hidden" }}>
      <style>{`
        .etp2-shell {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ---- clarifier / sedimentation visual (built in CSS, not a video file) ---- */
        .clarifier-wrap {
          position: relative;
          width: 100%;
          max-width: 440px;
        }

        .clarifier-tank {
          position: relative;
          width: 100%;
          height: 340px;
          clip-path: polygon(4% 0%, 96% 0%, 96% 60%, 58% 100%, 42% 100%, 4% 60%);
          background: linear-gradient(180deg, #DCE6E2 0%, #B9CBC5 100%);
          overflow: hidden;
          border: 1px solid ${T.lineStrong};
        }

        .clarifier-murk {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(138,109,74,0.7) 0%, rgba(138,109,74,0.08) 100%);
          animation: clarify 9s ease-in-out infinite;
        }

        @keyframes clarify {
          0%   { opacity: 1; }
          55%  { opacity: 0.12; }
          88%  { opacity: 0.12; }
          100% { opacity: 1; }
        }

        .sed-particle {
          position: absolute;
          top: 6%;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #6B4E33;
          animation: settle 9s linear infinite;
          opacity: 0;
        }

        @keyframes settle {
          0%   { transform: translateY(0); opacity: 0; }
          6%   { opacity: 0.9; }
          62%  { transform: translateY(255px); opacity: 0.9; }
          78%  { transform: translateY(270px); opacity: 0.5; }
          92%  { transform: translateY(270px); opacity: 0; }
          100% { transform: translateY(270px); opacity: 0; }
        }

        .clarifier-sludge {
          position: absolute;
          left: 38%;
          right: 38%;
          bottom: 0;
          height: 6%;
          background: #4E3A26;
          animation: sludgeGrow 9s ease-in-out infinite;
        }

        @keyframes sludgeGrow {
          0%, 8%   { height: 6%; }
          65%      { height: 24%; }
          85%,100% { height: 6%; }
        }

        .clarifier-caption {
          font-family: ${MONO};
          font-size: 10px;
          color: ${T.muted};
          letter-spacing: 0.05em;
          margin-top: 12px;
          text-align: center;
        }

        /* ---- pipeline flow diagram ---- */
        .flow-track {
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: 4px;
          padding-top: 10px;
          overflow-x: auto;
        }

        .flow-track::before {
          content: '';
          position: absolute;
          left: 30px;
          right: 30px;
          top: 34px;
          height: 1px;
          background: repeating-linear-gradient(
            90deg,
            ${T.lineOnDark} 0,
            ${T.lineOnDark} 6px,
            transparent 6px,
            transparent 12px
          );
        }

        .flow-node {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          flex: 1;
          min-width: 90px;
          padding: 0 4px;
          background: none;
          border: none;
        }

        .flow-node-dot {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${T.ink2};
          border: 1px solid ${T.lineOnDark};
          color: ${T.tealLight};
          transition: all 300ms cubic-bezier(.16,1,.3,1);
        }

        .flow-node.active .flow-node-dot {
          background: ${T.teal};
          border-color: ${T.teal};
          color: ${T.white};
          transform: scale(1.12);
        }

        .flow-node-label {
          font-family: ${MONO};
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          text-align: center;
          line-height: 1.3;
          transition: color 300ms ease;
        }

        .flow-node.active .flow-node-label {
          color: ${T.white};
        }

        .flow-detail-card {
          background: ${T.white};
          border-radius: 18px;
          padding: 36px;
          margin-top: 40px;
        }

        .chem-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: ${T.ivory};
          border: 1px solid ${T.line};
          border-radius: 8px;
          font-family: ${MONO};
          font-size: 11px;
          font-weight: 600;
        }

        /* ---- roles: numbered stacked list, not a card grid ---- */
        .role-row {
          display: grid;
          grid-template-columns: 60px 200px 1fr;
          gap: 24px;
          align-items: start;
          padding: 22px 0;
          border-bottom: 1px solid ${T.line};
        }

        .role-row:first-child { border-top: 1px solid ${T.line}; }

        /* ---- norms strip ---- */
        .norms-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid ${T.line};
          border-radius: 14px;
          overflow: hidden;
        }

        .norms-cell {
          padding: 20px;
          border-right: 1px solid ${T.line};
          text-align: center;
        }

        .norms-cell:last-child { border-right: none; }

        @media (max-width: 980px) {
          .etp-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .role-row { grid-template-columns: 40px 1fr; }
          .role-row > div:nth-child(2) { grid-column: 2; }
          .role-row > div:nth-child(3) { grid-column: 2; }
          .norms-strip { grid-template-columns: 1fr 1fr; }
          .norms-cell:nth-child(2) { border-right: none; }
        }

        @media (max-width: 700px) {
          .etp2-shell { padding: 0 20px; }
          .etp-hero-section { padding-top: 140px !important; padding-bottom: 60px !important; }
          .etp-hero-section h1 { font-size: clamp(36px, 10vw, 52px) !important; }
          .flow-detail-card { padding: 24px; margin-top: 28px; }
          .flow-node-label { display: none; }
        }
      `}</style>

      <Navbar onGetQuote={() => navigate("/products")} />

      {/* HERO — text + our own sedimentation visual, no stock photo */}
      <section
        className="etp-hero-section"
        style={{
          paddingTop: "200px",
          paddingBottom: "90px",
          borderBottom: `1px solid ${T.line}`,
          background: `linear-gradient(180deg, ${T.ivory} 0%, ${T.white} 100%)`,
        }}
      >
        <div className="etp2-shell">
          <div
            className="etp-hero-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 0.85fr", gap: 70, alignItems: "center" }}
          >
            <div>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: T.teal,
                  fontWeight: 700,
                  display: "block",
                  marginBottom: 18,
                }}
              >
                ETP CHEMICAL SUPPLY
              </span>

              <h1
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(42px, 5vw, 62px)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                  margin: "0 0 22px",
                  color: "black",
                }}
              >
                What settles out{" "}
                <span style={{ fontStyle: "italic", color: T.teal }}>is the point</span>.
              </h1>

              <p style={{ fontSize: "15px", lineHeight: "1.7", color: T.muted, margin: "0 0 28px", maxWidth: 460 }}>
                An effluent treatment plant is a chain of dosing points —
                acid, alkali, coagulant, nutrient, disinfectant — each one
                pulling something different out of the water. We supply that
                chain for manufacturers across the Baddi-Barotiwala-Nalagarh
                belt.
              </p>

              <div
                onClick={() => navigate("/products")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  color: T.ink,
                  cursor: "pointer",
                  borderBottom: `1px solid ${T.ink}`,
                  paddingBottom: 3,
                }}
              >
                <span>See the treatment train below</span>
                <ArrowRight size={13} />
              </div>
            </div>

            <div className="clarifier-wrap" style={{ margin: "0 auto" }}>
              <div className="clarifier-tank">
                <div className="clarifier-murk" />
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className="sed-particle"
                    style={{
                      left: `${8 + (i * 5) % 84}%`,
                      animationDelay: `${(i % 9) * 0.55}s`,
                    }}
                  />
                ))}
                <div className="clarifier-sludge" />
              </div>
              <div className="clarifier-caption">
                COAGULATION & SETTLING, SCHEMATIC — SOLIDS DROP OUT AS SLUDGE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PIPELINE — dark blueprint-style flow diagram */}
      <section style={{ background: T.ink, padding: "90px 0" }}>
        <div className="etp2-shell">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: T.tealLight,
              fontWeight: 700,
              display: "block",
              marginBottom: 14,
            }}
          >
            THE TREATMENT TRAIN
          </span>

          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "32px",
              fontWeight: 400,
              color: T.white,
              margin: "0 0 44px",
              maxWidth: 560,
              lineHeight: 1.25,
            }}
          >
            Six stages, six different dosing jobs. Tap one to see what goes in.
          </h2>

          <div className="flow-track">
            {ETP_STAGES.map((stage, i) => (
              <button
                key={i}
                className={`flow-node ${active === i ? "active" : ""}`}
                onClick={() => setActive(i)}
              >
                <div className="flow-node-dot">{stage.icon}</div>
                <span className="flow-node-label">{stage.name}</span>
              </button>
            ))}
          </div>

          <div className="flow-detail-card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 700,
                  color: T.teal,
                  background: T.ivory2,
                  padding: "4px 10px",
                  borderRadius: 999,
                }}
              >
                STAGE {ETP_STAGES[active].index}
              </span>
              <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 400, margin: 0 }}>
                {ETP_STAGES[active].name}
              </h3>
            </div>

            <p
              style={{
                fontFamily: SERIF,
                fontSize: 18,
                fontStyle: "italic",
                color: T.ink2,
                lineHeight: 1.5,
                margin: "0 0 22px",
                maxWidth: 700,
              }}
            >
              "{ETP_STAGES[active].blurb}"
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
              {ETP_STAGES[active].chemicals.map((chem, cIdx) => (
                <div key={cIdx} className="chem-pill">
                  <CheckCircle2 size={13} style={{ color: T.teal, flexShrink: 0 }} />
                  <span>{chem}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, margin: 0 }}>
              {ETP_STAGES[active].purpose}
            </p>
          </div>
        </div>
      </section>

      {/* PLANT PHOTOS — smaller, secondary */}
      <section style={{ padding: "80px 0", borderBottom: `1px solid ${T.line}` }}>
        <div className="etp2-shell">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.15em",
              color: T.muted,
              fontWeight: 700,
              display: "block",
              marginBottom: 20,
            }}
          >
            WHAT THE TANKS ACTUALLY LOOK LIKE
          </span>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
            <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${T.line}`, minHeight: 300 }}>
              <img
                src="https://images.unsplash.com/photo-1533163238111-4a7ced54f2e4?w=1200&q=85"
                alt="Aerial view of circular and rectangular effluent treatment tanks"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${T.line}`, minHeight: 300 }}>
              <img
                src="https://images.unsplash.com/photo-1622322977781-76f2247964b7?w=900&q=85"
                alt="Aerial view of an effluent treatment plant"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ROLES — numbered list, not a card grid */}
      <section style={{ padding: "80px 0", background: T.ivory, borderBottom: `1px solid ${T.line}` }}>
        <div className="etp2-shell">
          <h2 style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 400, margin: "0 0 8px" }}>
            Who's actually dosing this
          </h2>
          <p style={{ fontSize: 14, color: T.muted, margin: "0 0 10px" }}>
            The chemicals matter, but so does who's running the plant day to day.
          </p>

          <div>
            {ROLES.map((role, i) => (
              <div key={i} className="role-row">
                <span style={{ fontFamily: MONO, fontSize: 20, color: T.teal, fontWeight: 700 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: T.teal }}>{role.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{role.title}</span>
                </div>
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, margin: 0 }}>{role.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCHARGE NORMS + CTA */}
      <section style={{ padding: "90px 0" }}>
        <div className="etp2-shell">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: T.teal,
              fontWeight: 700,
              display: "block",
              marginBottom: 16,
            }}
          >
            WHAT "TREATED" ACTUALLY MEANS
          </span>

          <h2 style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 400, margin: "0 0 24px", maxWidth: 620 , color:"black"}}>
            General discharge limits, for reference.
          </h2>

          <div className="norms-strip" style={{ marginBottom: 12 }}>
            {DISCHARGE_NORMS.map((row, i) => (
              <div key={i} className="norms-cell">
                <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color: T.teal, marginBottom: 6 }}>
                  {row.limit}
                </div>
                <div style={{ fontSize: 12, color: T.muted }}>{row.param}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: T.muted, fontFamily: MONO, margin: "0 0 40px" }}>
            *Indian CPCB general standard, inland surface water. Your plant's actual
            consent-to-operate limit from the State Pollution Control Board may be
            tighter — talk to us about dosing to your specific consent order.
          </p>

          <button
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
            <span>View ETP Chemical Catalog</span>
            <ArrowUpRight size={14} style={{ color: T.tealLight }} />
          </button>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}