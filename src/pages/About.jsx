import { useEffect, useRef, useState } from "react";
import { 
  ShieldCheck, 
  Award, 
  Building2, 
  ArrowUpRight, 
  Eye, 
  Target, 
  Warehouse, 
  Truck,
  FlaskConical,
  Flame,
  Scale,
  ClipboardCheck,
  FileCheck2
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
  glassBorder: "rgba(255, 255, 255, 0.6)",
  line: "rgba(18, 15, 13, 0.08)",
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace`;
const W = "1320px";

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

  return [ref, {
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 1000ms cubic-bezier(.16,1,.3,1), transform 1000ms cubic-bezier(.16,1,.3,1)"
  }];
}

function GlassCard({ children, style }) {
  return (
    <div style={{
      background: T.glass,
      backdropFilter: "blur(20px) saturate(120%)",
      WebkitBackdropFilter: "blur(20px) saturate(120%)",
      border: `1px solid ${T.glassBorder}`,
      borderRadius: 24,
      boxShadow: "0 20px 50px rgba(18, 15, 13, 0.03)",
      ...style
    }}>{children}</div>
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

export default function About() {
  const [modal, setModal] = useState(false);
  const [hRef, hRev] = useReveal();
  const [sRef, sRev] = useReveal();
  const [fRef, fRev] = useReveal();
  const [iRef, iRev] = useReveal();

  return (
    <div style={{ background: T.ivory, color: T.ink, fontFamily: SANS, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .timeline-node::before {
          content: ''; position: absolute; left: 15px; top: 32px; bottom: -32px;
          width: 1px; background: ${T.line};
        }
        .timeline-node:last-child::before { display: none; }
        .infra-card { overflow: hidden; position: relative; border-radius: 24px; height: 440px; border: 1px solid ${T.line}; }
        .infra-img { width: 100%; height: 100%; object-fit: cover; transition: transform 900ms cubic-bezier(.16,1,.3,1); }
        .infra-card:hover .infra-img { transform: scale(1.05); }
        .spec-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: ${T.ink2}; line-height: 1.5; }
      `}</style>

      <Navbar onGetQuote={() => setModal(true)} />

      {/* ==========================================================================
         1. HERO SECTION WITH BACKGROUND ESSENCE
      ========================================================================== */}
      <section ref={hRef} style={{ padding: "220px 0 120px", background: `linear-gradient(180deg, rgba(243,236,224,0.4) 0%, transparent 100%), ${T.ivory}`, borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: W, margin: "0 auto", padding: "0 24px", ...hRev }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "60px", alignItems: "center" }}>
            <div style={{ maxWidth: "840px" }}>
              <Eyebrow>Enterprise Core Profile</Eyebrow>
              <h1 style={{ fontFamily: SERIF, fontSize: "clamp(46px, 5.5vw, 76px)", fontWeight: 500, lineHeight: 1.08, color: T.ink, letterSpacing: "-0.03em", marginBottom: 32 }}>
                Securing supply grids with <br />
                <span style={{ fontStyle: "italic", color: T.accent }}>fractional precision</span>.
              </h1>
              <p style={{ fontSize: "19px", lineHeight: "1.8", color: T.ink2, fontWeight: 400 }}>
                Kumar Chemicals functions as an analytical partner for heavy chemical distribution. Moving away from standard unverified marketplace loops, we engineer dedicated refinery-to-gate industrial sourcing channels that fulfill strict parameters of purity, safety, and logistical continuity.
              </p>
            </div>
            
            {/* Top Minimal Geometric Banner Image */}
            <div style={{ width: "100%", height: "260px", borderRadius: "24px", overflow: "hidden", border: `1px solid ${T.line}` }}>
{/* Change this section inside your top image block */}
<img 
  src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&q=80" 
  alt="Analytical chemical testing instruments" 
  style={{ width: "100%", height: "100%", objectFit: "cover" }} // Changed object-fit to objectFit
/>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         2. VALUE DEEP-DIVE & INTERACTIVE TRAJECTORY TIMELINE
      ========================================================================== */}
      <section ref={sRef} style={{ padding: "140px 0", background: T.ivory2 }}>
        <div style={{ maxWidth: W, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "90px", alignItems: "start", ...sRev }}>
          <div>
            <Eyebrow>Operational Philosophy</Eyebrow>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px, 4.5vw, 54px)", fontWeight: 500, color: T.ink, lineHeight: 1.15, marginBottom: 28, letterSpacing: "-0.02em" }}>
              Eliminating vulnerability from industrial procurement.
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.8", color: T.ink2, marginBottom: 40 }}>
              Industrial manufacturing suffers when raw batch composition fluctuates. We combat this variance by strictly maintaining fully isolated processing ecosystems and executing rigorous, direct analytical checks across all chemical groups.
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <GlassCard style={{ padding: "32px", background: T.white }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <Scale style={{ color: T.accent, flexShrink: 0 }} size={24} />
                  <div>
                    <h4 style={{ fontFamily: SERIF, fontSize: "22px", fontWeight: 600, marginBottom: "6px" }}>Refinery-Direct Verification</h4>
                    <p style={{ fontSize: "14px", color: T.muted, lineHeight: "1.6" }}>We completely bypass third-party trading desks. 100% of our inventory profiles are sourced straight from primary domestic refineries and foundational international synthesized imports to isolate pricing stability.</p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard style={{ padding: "32px", background: T.white }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <FlaskConical style={{ color: T.accent, flexShrink: 0 }} size={24} />
                  <div>
                    <h4 style={{ fontFamily: SERIF, fontSize: "22px", fontWeight: 600, marginBottom: "6px" }}>On-Site Analytical Laboratory</h4>
                    <p style={{ fontSize: "14px", color: T.muted, lineHeight: "1.6" }}>Every inbound and outbound container faces stringent checks at our terminal. We cross-verify density benchmarks, moisture trace variables, and distillation range profiles prior to assigning sealing rings.</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {/* Symmetrical Timeline System */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: "12px" }}>
            {[
              { year: "2002", title: "Inception & Distribution Rights", desc: "Formed a regional distribution post in Northern India, securing primary dealership clearances for essential raw technical solvents and foundational processing spirits." },
              { year: "2010", title: "Heavy Containment Deployment", desc: "Upgraded capital infrastructure with highly secure containment tanks specifically custom-lined for corrosive industrial process acids and technical liquid assets." },
              { year: "2018", title: "Logistics Fleet Automation", desc: "Inaugurated dedicated company-controlled transport tanker fleets to guarantee zero cross-contamination risk across major domestic industrial zones." },
              { year: "2026", title: "Digital Compliance Integration", desc: "Implemented smart material safety tracking systems, linking CoA documents and batch data sheets directly to customer procurement terminals." }
            ].map((node, i) => (
              <div key={i} className="timeline-node" style={{ position: "relative", display: "flex", gap: "24px", paddingBottom: "44px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: T.white, border: `2px solid ${T.accent}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, flexShrink: 0, marginTop: "2px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: T.accent }} />
                </div>
                <div>
                  <span style={{ fontFamily: MONO, fontSize: "11px", fontWeight: 600, color: T.accent, background: T.accentLight, padding: "3px 10px", borderRadius: "6px" }}>{node.year}</span>
                  <h3 style={{ fontFamily: SERIF, fontSize: "23px", fontWeight: 600, color: T.ink, marginTop: "10px", marginBottom: "6px" }}>{node.title}</h3>
                  <p style={{ fontSize: "14.5px", color: T.ink2, lineHeight: "1.65" }}>{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         3. FOUNDER SPOTLIGHT (ESTABLISHING INTERGENERATIONAL TRUST WITH FINE ART PORTRAIT IMAGES)
      ========================================================================== */}
      <section ref={fRef} style={{ padding: "140px 0", background: T.ivory, borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: W, margin: "0 auto", padding: "0 24px", ...fRev }}>
          <GlassCard style={{ padding: "54px", display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "64px", alignItems: "center", background: T.white }}>
            
            {/* High Quality Corporate Portrait Imagery */}
            <div style={{ width: "100%", height: "500px", borderRadius: "20px", overflow: "hidden", border: `1px solid ${T.line}` }}>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" 
                alt="Kumar Chemicals Executive Leadership" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Authoritative Leadership Statement */}
            <div>
              <Eyebrow>The Founding Directive</Eyebrow>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(34px, 4vw, 50px)", fontWeight: 500, color: T.ink, letterSpacing: "-0.02em", marginBottom: "24px", lineHeight: 1.15 }}>
                “In chemical logistics, confidence isn't negotiated—it's engineered batch by batch.”
              </h2>
              <p style={{ fontSize: "16px", color: T.ink2, lineHeight: "1.8", marginBottom: "24px" }}>
                Kumar Chemicals was built on a foundational promise: that industrial operations should never have to compromise on component purity or operational clarity. By treating supply metrics as an exact engineering discipline rather than transactional trade, we have fostered generation-spanning partnerships with chemical engineers and procurement directors nationwide.
              </p>
              <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: "24px" }}>
                <h4 style={{ fontFamily: SERIF, fontSize: "26px", fontWeight: 600, color: T.ink }}>Founder & Managing Director</h4>
                <p style={{ fontFamily: MONO, fontSize: "11px", color: T.accent, marginTop: "4px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>Kumar Chemicals Corporate Board</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ==========================================================================
         4. CORPORATE INTENT & MISSION MATRIX WITH IMAGES
      ========================================================================== */}
      <section style={{ padding: "120px 0", background: T.ivory2 }}>
        <div style={{ maxWidth: W, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          <GlassCard style={{ padding: "48px", display: "flex", flexDirection: "column", gap: "24px", background: T.white }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: T.accentLight, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Target size={24} />
              </div>
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&q=80" alt="Precision manufacturing process" style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "12px" }} />
            </div>
            <div>
              <h3 style={{ fontFamily: SERIF, fontSize: "28px", fontWeight: 600, color: T.ink, marginBottom: "12px" }}>The Corporate Mission</h3>
              <p style={{ fontSize: "15.5px", color: T.ink2, lineHeight: "1.8" }}>
                To relentlessly secure, optimize, and streamline heavy chemical cargo channels through unyielding verification standards, ensuring processing safety and baseline consistency for heavy industrial complexes.
              </p>
            </div>
          </GlassCard>

          <GlassCard style={{ padding: "48px", display: "flex", flexDirection: "column", gap: "24px", background: T.white }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: T.accentLight, color: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Eye size={24} />
              </div>
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&q=80" alt="Planning logistics operations" style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "12px" }} />
            </div>
            <div>
              <h3 style={{ fontFamily: SERIF, fontSize: "28px", fontWeight: 600, color: T.ink, marginBottom: "12px" }}>The Sourcing Vision</h3>
              <p style={{ fontSize: "15.5px", color: T.ink2, lineHeight: "1.8" }}>
                To set the baseline paradigm for transparent technical procurement across India, leveraging high-performance technology grids to eliminate lead-time friction, variable supply gaps, and residue anomalies.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ==========================================================================
         5. ARCHITECTURAL INFRASTRUCTURE SPECIFICATIONS
      ========================================================================== */}
      <section ref={iRef} style={{ padding: "140px 0", background: T.ivory }}>
        <div style={{ maxWidth: W, margin: "0 auto", padding: "0 24px", ...iRev }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <Eyebrow>Terminal Specifications</Eyebrow>
              <h2 style={{ fontFamily: SERIF, fontSize: "clamp(36px, 4.5vw, 58px)", fontWeight: 500, color: T.ink, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                High-capacity logistics.<br />Isolated structural zones.
              </h2>
            </div>
            <p style={{ color: T.muted, fontSize: "16px", maxWidth: "440px", lineHeight: "1.7" }}>
              Our physical terminal hubs are built with strict safety barriers, avoiding cross-contamination and providing structural cargo protection for every product class.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
            {/* Infrastructure Block 01 */}
            <div>
              <div className="infra-card" style={{ marginBottom: "24px" }}>
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80" alt="Industrial Storage Depot" className="infra-img" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(18,15,13,0.85), transparent 50%)", padding: "32px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <div>
                    <h4 style={{ fontFamily: SERIF, fontSize: "26px", color: T.white, fontWeight: 500 }}>Bulk Material Storage Terminal</h4>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontFamily: MONO, marginTop: "4px" }}>Una Main Terminal Node // Facility Block A</p>
                  </div>
                  <Warehouse size={26} style={{ color: T.accent }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "0 8px" }}>
                <div className="spec-item">
                  <ClipboardCheck size={16} style={{ color: T.accent, marginTop: "3px", flexShrink: 0 }} />
                  <span><strong>Dedicated Containment:</strong> Stainless steel SUS316L and custom polymer-lined storage tanks for corrosive process elements.</span>
                </div>
                <div className="spec-item">
                  <Flame size={16} style={{ color: T.accent, marginTop: "3px", flexShrink: 0 }} />
                  <span><strong>HSSE Safety Controls:</strong> Full perimeter containment dikes alongside automatic specialized foam-induction suppression networks.</span>
                </div>
              </div>
            </div>

            {/* Infrastructure Block 02 */}
            <div>
              <div className="infra-card" style={{ marginBottom: "24px" }}>
                <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80" alt="Logistics Container Fleet" className="infra-img" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(18,15,13,0.85), transparent 50%)", padding: "32px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <div>
                    <h4 style={{ fontFamily: SERIF, fontSize: "26px", color: T.white, fontWeight: 500 }}>High-Capacity Dedicated Fleet</h4>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontFamily: MONO, marginTop: "4px" }}>Tanker Allotments // Inter-State Distribution</p>
                  </div>
                  <Truck size={26} style={{ color: T.accent }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "0 8px" }}>
                <div className="spec-item">
                  <FileCheck2 size={16} style={{ color: T.accent, marginTop: "3px", flexShrink: 0 }} />
                  <span><strong>Zero-Contamination Guarantee:</strong> Dedicated strict vessel routing schedules completely eliminate product-to-product changeover risks.</span>
                </div>
                <div className="spec-item">
                  <ShieldCheck size={16} style={{ color: T.accent, marginTop: "3px", flexShrink: 0 }} />
                  <span><strong>GPS Telematics Tracking:</strong> Real-time location parameters combined with thermal telemetry updates across all chemical dispatches.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         6. COMPLIANCE STANDARDS & CERTIFICATION BADGES
      ========================================================================== */}
      <section style={{ padding: "100px 0 150px", background: T.ivory2, borderTop: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: W, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <Eyebrow>Verified Authority</Eyebrow>
            <h2 style={{ fontFamily: SERIF, fontSize: "42px", fontWeight: 500, color: T.ink, letterSpacing: "-0.01em" }}>Regulatory Compliance Credentials</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
            <div style={{ display: "flex", gap: "20px", background: T.white, padding: "32px", borderRadius: "20px", border: `1px solid ${T.line}` }}>
              <Award style={{ color: T.accent, flexShrink: 0 }} size={36} />
              <div>
                <h4 style={{ fontFamily: SERIF, fontSize: "21px", fontWeight: 600 }}>GST Verified Registration</h4>
                <p style={{ fontSize: "13.5px", color: T.muted, marginTop: "4px", lineHeight: "1.5" }}>Full compliance clearings across every state border checkpoint, offering seamless fiscal transport mapping.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", background: T.white, padding: "32px", borderRadius: "20px", border: `1px solid ${T.line}` }}>
              <ShieldCheck style={{ color: T.accent, flexShrink: 0 }} size={36} />
              <div>
                <h4 style={{ fontFamily: SERIF, fontSize: "21px", fontWeight: 600 }}>MSDS & GHS Alignment</h4>
                <p style={{ fontSize: "13.5px", color: T.muted, marginTop: "4px", lineHeight: "1.5" }}>Comprehensive technical sheets provided with all assignments, ensuring safety compliance for on-site handovers.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", background: T.white, padding: "32px", borderRadius: "20px", border: `1px solid ${T.line}` }}>
              <Building2 style={{ color: T.accent, flexShrink: 0 }} size={36} />
              <div>
                <h4 style={{ fontFamily: SERIF, fontSize: "21px", fontWeight: 600 }}>Batch Certificate of Analysis</h4>
                <p style={{ fontSize: "13.5px", color: T.muted, marginTop: "4px", lineHeight: "1.5" }}>Direct documentation trace logs verifying purity ratios, density indicators, and distillation limits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <EnquiryModal isOpen={modal} onClose={() => setModal(false)} />
    </div>
  );
}