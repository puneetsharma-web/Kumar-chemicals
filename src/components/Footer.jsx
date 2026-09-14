import { Layers, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

// Synchronized color scheme
const T = {
  ivory: "#F9F7F2",
  ink: "#120F0D",
  ink2: "#2F2720",
  muted: "#7A6E5D",
  white: "#FFFFFF",
  accent: "#C58343", 
  line: "rgba(255, 255, 255, 0.08)",
};

const SANS = `"DM Sans", "Inter", sans-serif`;
const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const MONO = `"DM Mono", "Courier New", monospace`;

// Dynamic hardcoded fallback if categories import is modularly adjusted
const FALLBACK_CATEGORIES = [
  { id: "solvents", name: "High-Purity Solvents" },
  { id: "industrial", name: "Industrial Chemicals" },
  { id: "acids", name: "Process Catalysts" },
  { id: "etp", name: "ETP Solutions" }
];

export default function Footer() {
  return (
    <footer 
      style={{ 
        background: T.ink, 
        color: T.white, 
        padding: "100px 0 40px", 
        fontFamily: SANS,
        borderTop: `1px solid rgba(255,255,255,0.05)`
      }}
    >
      <style>{`
        .footer-link {
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          font-size: 14px;
          transition: all 250ms ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 0;
        }
        .footer-link:hover {
          color: ${T.accent};
          transform: translateX(2px);
        }
        .footer-static-item {
          color: rgba(255, 255, 255, 0.55);
          font-size: 14px;
          padding: 4px 0;
        }
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px" }}>
        <div 
          className="footer-grid" 
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.7fr 1.1fr 1fr",
            gap: "40px",
            marginBottom: "80px"
          }}
        >
          {/* Column 1: Brand Info */}
          <div>
            <h3 style={{ fontFamily: SERIF, fontSize: "28px", fontWeight: 500, marginBottom: "16px", letterSpacing: "-0.02em" }}>
              Kumar <span style={{ fontStyle: "italic", color: T.accent }}>Chemicals</span>
            </h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: "1.6", maxWidth: "240px" }}>
              Architecting secure, high-purity industrial supply channels across India since 2002.
            </p>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <h4 style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: T.accent, textTransform: "uppercase" }}>
              Navigation
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <a href="/" className="footer-link">Corporate Home</a>
              <a href="/about" className="footer-link">Our Legacy</a>
              <a href="/products" className="footer-link">Chemical Catalog</a>
              <a href="/industries" className="footer-link">Sectors Served</a>
            </div>
          </div>

          {/* Column 3: Industrial Divisions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <h4 style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: T.accent, textTransform: "uppercase" }}>
              Core Matrices
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {FALLBACK_CATEGORIES.map((c) => (
                <div key={c.id} className="footer-static-item" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact Information */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <h4 style={{ fontFamily: MONO, fontSize: "11px", letterSpacing: "0.15em", color: T.accent, textTransform: "uppercase" }}>
              Procurement Terminal
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MapPin size={16} style={{ marginTop: "3px", color: T.accent, flexShrink: 0 }} />
                <span>HQ: Una, Himachal Pradesh, India</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Phone size={16} style={{ color: T.accent, flexShrink: 0 }} />
                <span>+91 9015262110</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Mail size={16} style={{ color: T.accent, flexShrink: 0 }} />
                <span>desk@kumarchemicals.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Closing Sub-footer Row */}
        <div 
          style={{ 
            borderTop: `1px solid ${T.line}`, 
            paddingTop: "30px", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)"
          }}
        >
          <div>© 2026 Kumar Chemicals. All rights reserved globally.</div>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Regulatory Documentation</a>
            <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Data Handling Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
