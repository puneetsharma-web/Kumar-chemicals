import { useState, useEffect } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Building2, 
  Globe2,
  Sparkles,
  Layers,
  ArrowUpRight,
  SendHorizontal,
  Plus,
  Minus
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const T = {
  white: "#FFFFFF",
  ivory: "#FBFBFA",
  rawSilk: "#F5F3EF",
  clay: "#E4DFD5",
  ink: "#0D0C0B",
  inkSubtle: "#1C1A18",
  charcoal: "#2A2825",
  copper: "#B87333", // Master accent architectural copper
  copperLight: "rgba(184, 115, 51, 0.15)",
  copperGlow: "rgba(184, 115, 51, 0.04)",
  line: "rgba(13, 12, 11, 0.07)",
  lineStrong: "rgba(13, 12, 11, 0.15)"
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace`;

export default function Contact() {
  const [activeTab, setActiveTab] = useState("domestic"); // domestic | international
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    metricTonnes: 10,
    compoundType: "Technical Grade",
    notes: ""
  });
  const [focusedField, setFocusedField] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

  // Micro-interaction for tonnage slider adjustment
  const adjustTonnage = (amount) => {
    setForm(p => ({ ...p, metricTonnes: Math.max(1, p.metricTonnes + amount) }));
  };

  const executeWhatsAppPipeline = () => {
    const customMsg = encodeURIComponent(
      `[B2B PRIORITY CHANNEL]: Requesting rapid dispatch evaluation for ${form.company || "Enterprise Account"}. Compound Matrix: ${form.compoundType}, Target Yield: ${form.metricTonnes} MT.`
    );
    window.open(`https://wa.me/919816023773?text=${customMsg}`, "_blank");
  };

  return (
    <div style={{ background: T.ivory, color: T.ink, fontFamily: SANS, overflowX: "hidden" }}>
      {/* Dynamic Keyframe & Structural Aesthetic Overrides */}
      <style>{`
        @keyframes subtlePan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatGlow {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-15px) scale(1.05); opacity: 0.6; }
        }
        @keyframes textReveal {
          to { transform: translateY(0); opacity: 1; }
        }

        .kinetic-reveal {
          opacity: 0; transform: translateY(30px);
          animation: textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .interactive-input-wrapper {
          position: relative; border-bottom: 2px solid ${T.lineStrong};
          padding: 12px 0; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .interactive-input-wrapper.focused {
          border-bottom-color: ${T.copper};
        }
        .interactive-input {
          width: 100%; background: transparent; border: none;
          font-family: ${SANS}; font-size: 16px; color: ${T.ink};
          outline: none; padding-top: 8px;
        }
        .floating-label {
          position: absolute; left: 0; top: 16px; font-family: MONO;
          font-size: 11px; color: #8A8172; letter-spacing: 0.1em;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); pointer-events: none;
        }
        .interactive-input-wrapper.focused .floating-label,
        .interactive-input-wrapper.has-value .floating-label {
          top: -10px; font-size: 10px; color: ${T.copper}; font-weight: 700;
        }

        .pill-toggle {
          padding: 10px 24px; border-radius: 4px; font-family: ${MONO};
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid transparent; background: transparent; color: #8A8172;
        }
        .pill-toggle.active {
          background: ${T.ink}; color: ${T.white};
        }

        .whatsapp-hq-card {
          background: linear-gradient(135deg, #0D0C0B 0%, #1C1A18 100%);
          border-radius: 24px; padding: 40px; position: relative; overflow: hidden;
          box-shadow: 0 30px 60px rgba(13,12,11,0.12);
        }
        .whatsapp-hq-card::before {
          content: ''; position: absolute; top: -50%; right: -20%;
          width: 300px; height: 300px; background: radial-gradient(circle, rgba(37,211,102,0.15) 0%, transparent 70%);
          animation: floatGlow 8s infinite ease-in-out; pointer-events: none;
        }

        .btn-magnetic {
          background: ${T.white}; color: ${T.ink}; padding: 18px 32px;
          border-radius: 100px; font-size: 14px; font-weight: 600; display: inline-flex;
          align-items: center; gap: 12px; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid ${T.lineStrong}; box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }
        .btn-magnetic:hover {
          background: ${T.ink}; color: ${T.white}; transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(13,12,11,0.15); border-color: ${T.ink};
        }

        .btn-wa-action {
          background: #25D366; color: ${T.white}; padding: 18px 36px;
          border-radius: 100px; font-size: 14px; font-weight: 700; display: inline-flex;
          align-items: center; gap: 12px; cursor: pointer; transition: all 0.3s ease;
          border: none; box-shadow: 0 10px 30px rgba(37,211,102,0.3);
        }
        .btn-wa-action:hover {
          background: #20ba59; transform: translateY(-2px) scale(1.02);
          box-shadow: 0 15px 35px rgba(37,211,102,0.4);
        }

        .map-frame-wrapper {
          width: 100%; height: 100%; min-height: 500px; position: relative;
          border-radius: 24px; overflow: hidden; border: 1px solid ${T.lineStrong};
          box-shadow: 0 20px 50px rgba(0,0,0,0.05);
        }
      `}</style>

      <Navbar onGetQuote={() => {}} />

      {/* ==========================================================================
         1. KINETIC ARCHITECTURAL HERO
      ========================================================================== */}
      <section style={{ paddingTop: "240px", paddingBottom: "120px", position: "relative", zIndex: 2 }}>
        {/* Soft atmospheric gradient anchor points */}
        <div style={{ position: "absolute", top: 0, left: "10%", width: "600px", height: "600px", background: `radial-gradient(circle, ${T.copperGlow} 0%, transparent 70%)`, pointerEvents: "none", zIndex: -1 }} />
        
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "60px", alignItems: "flex-end" }}>
            
            <div className="kinetic-reveal">
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "24px", background: T.white, padding: "8px 16px", borderRadius: "100px", border: `1px solid ${T.line}` }}>
                <Sparkles size={13} style={{ color: T.copper }} />
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.copper, fontWeight: 700 }}>
                  SECURE SUPPLY CHANNELS
                </span>
              </div>
              <h1 style={{ fontFamily: SERIF, fontSize: "clamp(48px, 6vw, 84px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0 }}>
                Let's construct your <br />
                <span style={{ fontStyle: "italic", fontFamily: SERIF, color: T.copper }}>compound pipeline</span>.
              </h1>
            </div>

            <div className="kinetic-reveal" style={{ animationDelay: "0.15s", paddingBottom: "15px" }}>
              <p style={{ fontFamily: SANS, fontSize: "16px", lineHeight: "1.6", color: T.charcoal, margin: 0, maxWidth: "380px" }}>
                Connect directly with our specialized chemical synthesis and logistics deployment matrix in Himachal Pradesh.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
         2. HIGH-CONVERTING B2B ELITE WHATSAPP PORTAL
      ========================================================================== */}
      <section style={{ paddingBottom: "60px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          
          <div className="whatsapp-hq-card kinetic-reveal" style={{ animationDelay: "0.3s" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "40px", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <span style={{ background: "rgba(37,211,102,0.15)", color: "#25D366", padding: "6px 14px", borderRadius: "100px", fontSize: "11px", fontFamily: MONO, fontWeight: 700, letterSpacing: "0.05em" }}>
                    FAST-TRACK NORTH INDIA DESK
                  </span>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#25D366" }} />
                  <span style={{ fontSize: "12px", color: "#A8A195", fontFamily: MONO }}>AVERAGE RESPONSE: &lt; 4 MINS</span>
                </div>
                
                <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400, color: T.white, margin: "0 0 12px 0", letterSpacing: "-0.01em" }}>
                  Accelerate Procurement via WhatsApp Business Direct
                </h2>
                <p style={{ color: "#A8A195", fontSize: "15px", lineHeight: "1.6", margin: 0, maxWidth: "750px" }}>
                  Skip standard corporate ticketing queues. Instantly unlock volumetric commercial quotes, custom density specifications, and automated logistical freight routes for your contract timelines.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-wa-action" onClick={executeWhatsAppPipeline}>
                  <span>Initialize Procurement Chat</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================================
         3. SPLIT MAIN PLATFORM: HIGH-AESTHETIC FORM & ADDRESS TELEMETRY
      ========================================================================== */}
      <section style={{ paddingBottom: "140px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "100px", alignItems: "start" }}>
            
            {/* LEFT FRAMEWORK: INTERACTIVE DIGITAL RFQ CONSOLE */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px", borderBottom: `1px solid ${T.line}`, paddingBottom: "20px" }}>
                <h3 style={{ fontFamily: SERIF, fontSize: "24px", fontWeight: 400, margin: 0 }}>Digital Inquiry Matrix</h3>
                
                <div style={{ background: T.rawSilk, padding: "4px", borderRadius: "6px", display: "flex", gap: "4px" }}>
                  <button className={`pill-toggle ${activeTab === "domestic" ? "active" : ""}`} onClick={() => setActiveTab("domestic")}>DOMESTIC (INDIA)</button>
                  <button className={`pill-toggle ${activeTab === "international" ? "active" : ""}`} onClick={() => setActiveTab("international")}>INTERNATIONAL</button>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setFormSuccess(true); }} style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
                
                {/* Field Block */}
                <div className={`interactive-input-wrapper ${focusedField === "company" ? "focused" : ""} ${form.company ? "has-value" : ""}`}>
                  <label className="floating-label">ENTERPRISE OR CORPORATE ENTITY</label>
                  <input 
                    type="text" required className="interactive-input" 
                    onFocus={() => setFocusedField("company")} onBlur={() => setFocusedField(null)}
                    value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                  />
                </div>

                {/* Two Column Interactive Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                  <div className={`interactive-input-wrapper ${focusedField === "name" ? "focused" : ""} ${form.name ? "has-value" : ""}`}>
                    <label className="floating-label">REPRESENTATIVE NAME</label>
                    <input 
                      type="text" required className="interactive-input" 
                      onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                      value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div className={`interactive-input-wrapper ${focusedField === "email" ? "focused" : ""} ${form.email ? "has-value" : ""}`}>
                    <label className="floating-label">OFFICIAL EMAIL</label>
                    <input 
                      type="email" required className="interactive-input" 
                      onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                      value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className={`interactive-input-wrapper ${focusedField === "phone" ? "focused" : ""} ${form.phone ? "has-value" : ""}`}>
                  <label className="floating-label">SECURE DIRECT CALL SIGN / MOBILE</label>
                  <input 
                    type="tel" required className="interactive-input" 
                    onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>

                {/* Advanced Micro-interaction: Volumetric Scale Controller */}
                <div style={{ background: T.rawSilk, padding: "24px", borderRadius: "16px", border: `1px solid ${T.line}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontFamily: MONO, fontSize: "11px", fontWeight: 700, color: "#8A8172", letterSpacing: "0.05em" }}>ESTIMATED TARGET VOLUME REQUIREMENT</span>
                    <span style={{ fontFamily: MONO, fontSize: "14px", fontWeight: 700, color: T.copper }}>{form.metricTonnes} MT</span>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <button type="button" onClick={() => adjustTonnage(-5)} style={{ background: T.white, border: `1px solid ${T.lineStrong}`, width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Minus size={14} /></button>
                    <input 
                      type="range" min="1" max="500" style={{ flex: 1, accentColor: T.copper, cursor: "ew-resize" }}
                      value={form.metricTonnes} onChange={e => setForm({...form, metricTonnes: parseInt(e.target.value)})}
                    />
                    <button type="button" onClick={() => adjustTonnage(5)} style={{ background: T.white, border: `1px solid ${T.lineStrong}`, width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={14} /></button>
                  </div>
                </div>

                <div className={`interactive-input-wrapper ${focusedField === "notes" ? "focused" : ""} ${form.notes ? "has-value" : ""}`}>
                  <label className="floating-label">COMPOUND MATRIX PROFILE SPECS & PARAMETERS</label>
                  <input 
                    type="text" className="interactive-input" 
                    onFocus={() => setFocusedField("notes")} onBlur={() => setFocusedField(null)}
                    placeholder="e.g. Pure Grade, specific density variables, requested delivery windows..."
                    value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                  />
                </div>

                <div>
                  <button type="submit" className="btn-magnetic" style={{ width: "100%", justifyContent: "center" }}>
                    <span>Transmit Requirements Matrix</span>
                    <SendHorizontal size={16} />
                  </button>
                </div>

                {formSuccess && (
                  <div style={{ padding: "16px", background: T.ink, color: T.white, borderRadius: "8px", fontSize: "13px", fontFamily: MONO, textAlign: "center" }}>
                    SYSTEM STATUS // TRANSMISSION SECURED. CORRESPONDENCE LOCKED WITHIN 2 HOURS.
                  </div>
                )}

              </form>
            </div>

            {/* RIGHT FRAMEWORK: THE INDUSTRIAL TELEMETRY COLUMN */}
            <div style={{ paddingLeft: "20px", borderLeft: `1px solid ${T.line}` }}>
              
              {/* Telemetry Block 1: Address */}
              <div style={{ marginBottom: "56px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <Building2 size={16} style={{ color: T.copper }} />
                  <span style={{ fontFamily: MONO, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#8A8172" }}>MANUFACTURING HEADQUARTERS</span>
                </div>
                <h4 style={{ fontFamily: SERIF, fontSize: "26px", fontWeight: 400, margin: "0 0 12px 0", lineHeight: "1.2" }}>
                  Kumar Chemicals Corporation
                </h4>
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: T.charcoal, fontWeight: 500, margin: 0 }}>
                  Kotla Kalan, Near Industrial Area, Una,<br />
                  Himachal Pradesh – 174303, India
                </p>
              </div>

              {/* Telemetry Block 2: Audio Pipeline */}
              <div style={{ marginBottom: "56px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <Phone size={16} style={{ color: T.copper }} />
                  <span style={{ fontFamily: MONO, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#8A8172" }}>VOICE ENCRYPTED CHANNELS</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <span style={{ fontSize: "18px", fontFamily: MONO, fontWeight: 600 }}>+91 98160 23773</span>
                    <span style={{ fontSize: "12px", color: "#8A8172", marginLeft: "12px" }}>— Procurement Directorate</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "18px", fontFamily: MONO, fontWeight: 600 }}>+91 94180 23773</span>
                    <span style={{ fontSize: "12px", color: "#8A8172", marginLeft: "12px" }}>— Plant Production Infrastructure</span>
                  </div>
                </div>
              </div>

              {/* Telemetry Block 3: Digital Box */}
              <div style={{ marginBottom: "56px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <Mail size={16} style={{ color: T.copper }} />
                  <span style={{ fontFamily: MONO, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#8A8172" }}>DIGITAL INTAKE REPOSITORIES</span>
                </div>
                <p style={{ fontSize: "16px", fontFamily: MONO, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                  <a href="mailto:info@kumarchemicals.com" style={{ color: T.ink, textDecoration: "none", borderBottom: `1px solid ${T.lineStrong}`, width: "fit-content" }}>info@kumarchemicals.com</a>
                  <a href="mailto:sales@kumarchemicals.com" style={{ color: T.ink, textDecoration: "none", borderBottom: `1px solid ${T.lineStrong}`, width: "fit-content" }}>sales@kumarchemicals.com</a>
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
         4. HIGH-AESTHETIC STYLED ARCHITECTURAL GEOMATRIC SYSTEM (MAP)
      ========================================================================== */}
      <section style={{ background: T.white, padding: "80px 0" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "0.6fr 1.4fr", gap: "60px", alignItems: "center" }}>
            
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Globe2 size={14} style={{ color: T.copper }} />
                <span style={{ fontFamily: MONO, fontSize: "10px", color: T.copper, letterSpacing: "0.15em", fontWeight: 700 }}>GEOGRAPHIC ANCHOR</span>
              </div>
              <h3 style={{ fontFamily: SERIF, fontSize: "36px", fontWeight: 400, margin: "0 0 16px 0", lineHeight: "1.15" }}>
                Strategically positioned logistics.
              </h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#8A8172", margin: 0 }}>
                Our production plant in Kotla Kalan, Una leverages immediate vehicular access to major highway corridors, optimizing rapid bulk container transport across northern industrial manufacturing zones.
              </p>
            </div>

            <div className="map-frame-wrapper">
              <iframe 
                title="Kumar Chemicals Corporation Facility Grid Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.544778103445!2d76.28424267632948!3d31.48169197423184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391adb3b1ea0d4a3%3A0xcd50ecfa645511b0!2sKotla%20Kalan%2C%20Una%2C%20Himachal%20Pradesh%20174303!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: "absolute", top: 0, left: 0, filter: "grayscale(0.9) contrast(1.15) brightness(0.96)" }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}