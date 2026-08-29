import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

// ============================================================
// NAVIGATION
// ============================================================

const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "ETP Solutions",
    href: "/ETPInd",
  },
  {
    label: "Industries",
    href: "/industries",
  },
  {
    label: "Contact",
    href: "/contact",
  }
];

// ============================================================
// DESIGN SYSTEM
// ============================================================

const T = {
  ink: "#120F0D",
  white: "#FFFFFF",
  accent: "#C58343",
  glass: "rgba(255, 255, 255, 0.72)",
  glassMobile: "rgba(249, 247, 242, 0.98)",
  glassBorder: "rgba(255, 255, 255, 0.65)",
  line: "rgba(18, 15, 13, 0.07)",
};

const SANS = `"DM Sans", "Inter", sans-serif`;

// ============================================================
// NAVBAR
// ============================================================

export default function Navbar({ onGetQuote }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ==========================================================
  // SCROLL DETECTION
  // ==========================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==========================================================
  // PREVENT BODY SCROLL WHEN MENU IS OPEN
  // ==========================================================

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ==========================================================
  // CLOSE MENU ON RESIZE
  // ==========================================================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ==========================================================
  // QUOTE HANDLER
  // ==========================================================

  const handleQuote = () => {
    setOpen(false);

    if (typeof onGetQuote === "function") {
      onGetQuote();
    }
  };

  return (
    <header
      className={`kc-navbar ${
        scrolled ? "kc-navbar-scrolled" : ""
      }`}
    >

      <style>{`

        /* ======================================================
           NAVBAR BASE
        ====================================================== */

        .kc-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;

          background: ${T.glass};

          backdrop-filter: blur(24px) saturate(130%);
          -webkit-backdrop-filter: blur(24px) saturate(130%);

          border-bottom: 1px solid transparent;

          box-shadow: none;

          transition:
            background 300ms ease,
            border-color 300ms ease,
            box-shadow 300ms ease;
          
          font-family: ${SANS};
        }

        .kc-navbar-scrolled {
          border-bottom: 1px solid ${T.line};
          box-shadow: 0 10px 35px rgba(18,15,13,0.035);
        }

        /* ======================================================
           NAV CONTAINER
        ====================================================== */

        .kc-navbar-container {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;

          padding: 20px 32px;

          box-sizing: border-box;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;

          transition: padding 300ms ease;
        }

        .kc-navbar-scrolled .kc-navbar-container {
          padding-top: 14px;
          padding-bottom: 14px;
        }

        /* ======================================================
           BRAND
        ====================================================== */

        .kc-navbar-brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;

          text-decoration: none;

          flex-shrink: 0;
        }

        .kc-navbar-logo {
          width: 40px;
          height: 40px;
          display: block;
        }

        .kc-navbar-brand-name {
          font-family: ${SANS};
          font-size: 18px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.025em;
          color: ${T.ink};
          white-space: nowrap;
        }

        .kc-navbar-brand-name span {
          color: ${T.accent};
          font-weight: 400;
          font-style: italic;
        }

        /* ======================================================
           DESKTOP NAVIGATION
        ====================================================== */

        .kc-navbar-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          flex: 1;
        }

        .kc-navbar-link {
          position: relative;

          display: inline-flex;
          align-items: center;

          padding: 7px 0;

          color: ${T.ink};
          opacity: 0.78;

          font-family: ${SANS};
          font-size: 13px;
          font-weight: 500;

          text-decoration: none;

          white-space: nowrap;

          transition:
            color 200ms ease,
            opacity 200ms ease;
        }

        .kc-navbar-link::after {
          content: "";

          position: absolute;

          left: 0;
          bottom: 0;

          width: 0;
          height: 1px;

          background: ${T.accent};

          transition: width 250ms cubic-bezier(.16,1,.3,1);
        }

        .kc-navbar-link:hover {
          color: ${T.accent};
          opacity: 1;
        }

        .kc-navbar-link:hover::after {
          width: 100%;
        }

        /* ======================================================
           DESKTOP QUOTE BUTTON
        ====================================================== */

        .kc-navbar-action {
          flex-shrink: 0;
        }

        .kc-navbar-quote {
          border: none;

          background: ${T.ink};
          color: ${T.white};

          padding: 12px 20px;

          min-height: 42px;

          border-radius: 999px;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;

          font-family: ${SANS};
          font-size: 12px;
          font-weight: 600;

          white-space: nowrap;

          cursor: pointer;

          transition:
            background 200ms ease,
            transform 200ms ease,
            box-shadow 200ms ease;
        }

        .kc-navbar-quote:hover {
          background: ${T.accent};

          transform: translateY(-1px);

          box-shadow:
            0 10px 25px rgba(197,131,67,0.18);
        }

        /* ======================================================
           MOBILE BUTTON
        ====================================================== */

        .kc-navbar-mobile-button {
          display: none;

          width: 42px;
          height: 42px;

          padding: 0;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          border: 1px solid ${T.line};

          background: rgba(255,255,255,0.55);

          color: ${T.ink};

          cursor: pointer;

          flex-shrink: 0;

          transition:
            background 200ms ease,
            transform 200ms ease;
        }

        .kc-navbar-mobile-button:hover {
          background: rgba(255,255,255,0.9);
        }

        .kc-navbar-mobile-button:active {
          transform: scale(0.95);
        }

        /* ======================================================
           MOBILE MENU
        ====================================================== */

        .kc-mobile-menu {
          position: fixed;

          top: 0;
          left: 0;

          width: 100%;
          height: 100dvh;

          min-height: 100vh;

          background: ${T.glassMobile};

          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);

          z-index: 998;

          padding:
            105px
            32px
            35px;

          box-sizing: border-box;

          overflow-y: auto;

          animation: kcMobileMenuIn 300ms
            cubic-bezier(.16,1,.3,1);
        }

        @keyframes kcMobileMenuIn {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .kc-mobile-menu-inner {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;

          display: flex;
          flex-direction: column;
        }

        /* ======================================================
           MOBILE LINKS
        ====================================================== */

        .kc-mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;

          width: 100%;

          padding: 18px 0;

          border-bottom: 1px solid ${T.line};

          color: ${T.ink};

          font-family: ${SANS};
          font-size: 23px;
          font-weight: 500;

          text-decoration: none;

          transition:
            color 200ms ease,
            padding-left 200ms ease;
        }

        .kc-mobile-link:hover {
          color: ${T.accent};
          padding-left: 5px;
        }

        .kc-mobile-link-icon {
          color: ${T.accent};
          flex-shrink: 0;
        }

        /* ======================================================
           MOBILE QUOTE
        ====================================================== */

        .kc-mobile-quote {
          width: 100%;

          margin-top: 36px;

          padding: 17px 20px;

          border: none;

          border-radius: 14px;

          background: ${T.ink};
          color: ${T.white};

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          font-family: ${SANS};
          font-size: 14px;
          font-weight: 600;

          cursor: pointer;

          transition:
            background 200ms ease,
            transform 200ms ease;
        }

        .kc-mobile-quote:hover {
          background: ${T.accent};
          transform: translateY(-1px);
        }

        /* ======================================================
           TABLET
        ====================================================== */

        @media (max-width: 1100px) {

          .kc-navbar-container {
            padding-left: 26px;
            padding-right: 26px;
          }

          .kc-navbar-links {
            gap: 21px;
          }

          .kc-navbar-link {
            font-size: 12px;
          }

          .kc-navbar-brand-name {
            font-size: 17px;
          }

          .kc-navbar-logo {
            width: 38px;
            height: 38px;
          }

        }

        /* ======================================================
           MOBILE / TABLET
        ====================================================== */

        @media (max-width: 900px) {

          .kc-navbar-container {
            padding: 15px 22px;
          }

          .kc-navbar-scrolled .kc-navbar-container {
            padding-top: 12px;
            padding-bottom: 12px;
          }

          .kc-navbar-links,
          .kc-navbar-action {
            display: none;
          }

          .kc-navbar-mobile-button {
            display: flex;
          }

        }

        /* ======================================================
           SMALL MOBILE
        ====================================================== */

        @media (max-width: 560px) {

          .kc-navbar-container {
            padding-left: 18px;
            padding-right: 18px;
          }

          .kc-navbar-brand {
            gap: 9px;
          }

          .kc-navbar-logo {
            width: 36px;
            height: 36px;
          }

          .kc-navbar-brand-name {
            font-size: 16px;
          }

          .kc-navbar-mobile-button {
            width: 40px;
            height: 40px;
          }

          .kc-mobile-menu {
            padding-left: 22px;
            padding-right: 22px;
            padding-top: 95px;
          }

          .kc-mobile-link {
            font-size: 21px;
            padding: 16px 0;
          }

          .kc-mobile-quote {
            margin-top: 30px;
          }

        }

        /* ======================================================
           VERY SMALL PHONES
        ====================================================== */

        @media (max-width: 380px) {

          .kc-navbar-container {
            padding-left: 14px;
            padding-right: 14px;
          }

          .kc-navbar-brand-name {
            font-size: 15px;
          }

          .kc-navbar-logo {
            width: 34px;
            height: 34px;
          }

          .kc-mobile-menu {
            padding-left: 18px;
            padding-right: 18px;
          }

          .kc-mobile-link {
            font-size: 20px;
          }

        }

        /* ======================================================
           REDUCED MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {

          .kc-navbar,
          .kc-navbar-container,
          .kc-navbar-link,
          .kc-navbar-link::after,
          .kc-navbar-quote,
          .kc-mobile-link,
          .kc-mobile-quote {
            transition: none !important;
          }

          .kc-mobile-menu {
            animation: none !important;
          }

        }

      `}</style>

      {/* ========================================================
          NAVBAR CONTAINER
      ======================================================== */}

      <div className="kc-navbar-container">

        {/* ======================================================
            BRAND
        ====================================================== */}

        <a
          href="/"
          className="kc-navbar-brand"
          aria-label="Kumar Chemicals Home"
        >

          <svg
            viewBox="0 0 100 100"
            className="kc-navbar-logo"
            role="img"
            aria-label="Kumar Chemicals logo"
          >

            <defs>

              <radialGradient
                id="kcFlameGradient"
                cx="50%"
                cy="65%"
                r="50%"
                fx="40%"
                fy="55%"
              >
                <stop
                  offset="0%"
                  stopColor="#FFF"
                />

                <stop
                  offset="25%"
                  stopColor="#FFCDD2"
                />

                <stop
                  offset="55%"
                  stopColor="#FF3D00"
                />

                <stop
                  offset="85%"
                  stopColor="#D84315"
                />

                <stop
                  offset="100%"
                  stopColor="#C58343"
                />

              </radialGradient>

            </defs>

            <path
              d="
                M 50,5
                C 55,20 62,28 62,38
                C 62,55 45,68 45,52
                C 45,43 53,41 49,34
                C 44,26 34,35 30,48
                C 24,65 38,88 56,88
                C 76,88 84,70 80,52
                C 77,38 64,22 50,5
                Z
              "
              fill="url(#kcFlameGradient)"
            />

          </svg>

          <span className="kc-navbar-brand-name">
            Kumar{" "}
            <span>
              Chemicals
            </span>
          </span>

        </a>

        {/* ======================================================
            DESKTOP LINKS
        ====================================================== */}

        <nav
          className="kc-navbar-links"
          aria-label="Primary navigation"
        >

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="kc-navbar-link"
            >
              {link.label}
            </a>
          ))}

        </nav>

        {/* ======================================================
            DESKTOP QUOTE
        ====================================================== */}

        <div className="kc-navbar-action">

          <button
            type="button"
            onClick={handleQuote}
            className="kc-navbar-quote"
          >

            <span>
              Get Quote
            </span>

            <ArrowUpRight size={14} />

          </button>

        </div>

        {/* ======================================================
            MOBILE TOGGLE
        ====================================================== */}

        <button
          type="button"
          className="kc-navbar-mobile-button"
          onClick={() => setOpen((previous) => !previous)}
          aria-label={
            open
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={open}
        >

          {open ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}

        </button>

      </div>

      {/* ========================================================
          MOBILE MENU
      ======================================================== */}

      {open && (

        <div
          className="kc-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >

          <div className="kc-mobile-menu-inner">

            {NAV_LINKS.map((link) => (

              <a
                key={link.href}
                href={link.href}
                className="kc-mobile-link"
                onClick={() => setOpen(false)}
              >

                <span>
                  {link.label}
                </span>

                <ArrowUpRight
                  size={18}
                  className="kc-mobile-link-icon"
                />

              </a>

            ))}

            <button
              type="button"
              className="kc-mobile-quote"
              onClick={handleQuote}
            >

              <span>
                Initialize Allocation Request
              </span>

              <ArrowUpRight size={18} />

            </button>

          </div>

        </div>

      )}

    </header>
  );
}