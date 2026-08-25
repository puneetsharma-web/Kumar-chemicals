import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" }, // Updated targeting link path
  { label: "Products", href: "/Products" },
  { label: "ETP Solutions", href: "/etp-solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

/* ==========================================================================
   DESIGN PALETTE LINKED TO DESIGN SYSTEM
========================================================================== */
const T = {
  ink: "#120F0D",
  white: "#FFFFFF",
  accent: "#C58343", // Liquid amber / copper accent
  glass: "rgba(255, 255, 255, 0.65)",
  glassMobile: "rgba(249, 247, 242, 0.96)",
  glassBorder: "rgba(255, 255, 255, 0.6)",
  line: "rgba(18, 15, 13, 0.06)",
};

const SANS = `"DM Sans", "Inter", sans-serif`;

export default function Navbar({ onGetQuote }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: T.glass,
        backdropFilter: "blur(24px) saturate(130%)",
        WebkitBackdropFilter: "blur(24px) saturate(130%)",
        borderBottom: scrolled ? `1px solid ${T.line}` : `1px solid transparent`,
        boxShadow: scrolled ? "0 10px 30px rgba(18, 15, 13, 0.02)" : "none",
        transition: "all 400ms cubic-bezier(.16,1,.3,1)",
        fontFamily: SANS,
      }}
    >
      <style>{`
        .nav-link {
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 500;
          color: ${T.ink};
          opacity: 0.8;
          text-decoration: none;
          position: relative;
          transition: all 250ms ease;
          padding: 6px 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: ${T.accent};
          transition: width 300ms cubic-bezier(.16,1,.3,1);
        }
        .nav-link:hover {
          opacity: 1;
          color: ${T.accent};
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-quote-btn {
          background: ${T.ink};
          color: ${T.white};
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 250ms ease;
        }
        .nav-quote-btn:hover {
          background: ${T.accent};
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(197, 131, 67, 0.15);
        }
        .mobile-link {
          font-size: 22px;
          font-weight: 500;
          color: ${T.ink};
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid ${T.line};
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media (max-width: 900px) {
          .desktop-nav-links, .desktop-action-btn { display: none !important; }
          .mobile-toggle-btn { display: flex !important; }
        }
      `}</style>

      <div 
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: scrolled ? "14px 24px" : "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "padding 400ms cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* Brand Identity Area - Vector Scaled Version for absolute clarity */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <svg 
            viewBox="0 0 100 100" 
            style={{ height: "40px", width: "40px" }}
            role="img"
            aria-label="Kumar Chemicals Flame Logo"
          >
            <defs>
              <radialGradient id="flameGrad" cx="50%" cy="65%" r="50%" fx="40%" fy="55%">
                <stop offset="0%" stopColor="#FFF" />
                <stop offset="25%" stopColor="#FFCDD2" />
                <stop offset="55%" stopColor="#FF3D00" />
                <stop offset="85%" stopColor="#D84315" />
                <stop offset="100%" stopColor="#C58343" />
              </radialGradient>
            </defs>
            {/* Smooth crisp mathematical rendering of the brand geometry */}
            <path 
              d="M 50,5 C 55,20 62,28 62,38 C 62,55 45,68 45,52 C 45,43 53,41 49,34 C 44,26 34,35 30,48 C 24,65 38,88 56,88 C 76,88 84,70 80,52 C 77,38 64,22 50,5 Z" 
              fill="url(#flameGrad)"
            />
          </svg>
          <span style={{ fontFamily: SANS, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", color: T.ink }}>
            Kumar <span style={{ color: T.accent, fontWeight: 400, fontStyle: "italic" }}>Chemicals</span>
          </span>
        </a>

        {/* Center Desktop Links */}
        <div className="desktop-nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Trigger Button */}
        <div className="desktop-action-btn">
          <button onClick={onGetQuote} className="nav-quote-btn">
            <span>Get Quote</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mobile Sidebar Trigger Toggle */}
        <button 
          className="mobile-toggle-btn"
          onClick={() => setOpen(!open)} 
          style={{ 
            display: "none", 
            alignItems: "center", 
            justifyContent: "center",
            width: 40, 
            height: 40, 
            borderRadius: "50%", 
            background: "rgba(255,255,255,0.5)",
            border: `1px solid ${T.line}`,
            color: T.ink,
            cursor: "pointer"
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Responsive Mobile Overlay Menu */}
      {open && (
        <div 
          style={{
            position: "fixed",
            top: "100%",
            left: 0,
            right: 0,
            height: "100vh",
            background: T.glassMobile,
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            padding: "40px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            boxShadow: "0 30px 60px rgba(18, 15, 13, 0.08)",
            borderTop: `1px solid ${T.line}`,
            zIndex: 999
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            {NAV_LINKS.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="mobile-link"
                onClick={() => setOpen(false)}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={16} style={{ color: T.accent }} />
              </a>
            ))}
          </div>

          <button 
            onClick={() => { setOpen(false); onGetQuote(); }} 
            style={{
              marginTop: 40,
              padding: "18px",
              background: T.ink,
              color: T.white,
              borderRadius: "14px",
              fontWeight: 600,
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8
            }}
          >
            <span>Initialize Allocation Request</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      )}
    </header>
  );
}