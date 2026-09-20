import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnquiryModal from "../components/EnquiryModal";

import tankView from "../assets/Videos/tank-view.mp4";
import jarSettle from "../assets/Videos/jar-settle.mp4";
import founderImage from "../assets/founder.png";
import heroImage from "../assets/hero.png";

const T = {
  copper: "#B85A2A",
  copperDark: "#94431B",
  emerald: "#496652",
  ivory: "#F9F7F2",
  ivory2: "#F3ECE0",
  ink: "#120F0D",
  ink2: "#2F2720",
  muted: "#71685D",
  mutedLight: "#8B8175",
};

export default function ETPInd() {
  const [activePersona, setActivePersona] = useState("Industry");
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --------------------------------------------------
  // ONE COMMON FUNCTION FOR EVERY QUOTE / ENQUIRY BUTTON
  // --------------------------------------------------
  const openEnquiry = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    setShowEnquiry(true);
  };

  const closeEnquiry = () => {
    setShowEnquiry(false);
  };

  const personas = [
    {
      id: "Industry",
      title: "Industry",
      text: "For factories and process industries looking to improve wastewater treatment, compliance and operating efficiency.",
    },
    {
      id: "ETP Operator",
      title: "ETP Operator",
      text: "For plant operators who need practical treatment chemistry, predictable performance and easier day-to-day operation.",
    },
    {
      id: "Consultant",
      title: "Consultant",
      text: "For consultants and technical teams designing or improving industrial wastewater treatment systems.",
    },
    {
      id: "Procurement",
      title: "Procurement",
      text: "For procurement teams looking for dependable chemical supply, technical support and consistent quality.",
    },
  ];

  const metrics = [
    {
      number: "01",
      title: "CLARITY",
      text: "Treatment starts with understanding what is actually present in the wastewater.",
    },
    {
      number: "02",
      title: "SEPARATION",
      text: "Suspended solids, colour, oil and other contaminants are conditioned so they can be separated effectively.",
    },
    {
      number: "03",
      title: "CONTROL",
      text: "The objective is a controlled treatment process rather than simply adding more chemicals.",
    },
    {
      number: "04",
      title: "COMPLIANCE",
      text: "Better treatment supports cleaner discharge, operational consistency and environmental responsibility.",
    },
  ];

  const treatmentSteps = [
    {
      no: "01",
      title: "Characterise",
      text: "Understand the wastewater, its contaminants and the treatment objective.",
    },
    {
      no: "02",
      title: "Condition",
      text: "Select the chemistry required to destabilise and condition contaminants.",
    },
    {
      no: "03",
      title: "Separate",
      text: "Allow solids and conditioned contaminants to separate through the treatment process.",
    },
    {
      no: "04",
      title: "Polish",
      text: "Continue treatment where required to achieve the desired water quality.",
    },
  ];

  const activePersonaData =
    personas.find((item) => item.id === activePersona) || personas[0];

  return (
    <main className="etp-page">
      <style>{`
        .etp-page {
          --ivory: ${T.ivory};
          --ivory-2: ${T.ivory2};
          --ink: ${T.ink};
          --ink-2: ${T.ink2};
          --muted: ${T.muted};
          --muted-light: ${T.mutedLight};
          --emerald: ${T.emerald};
          --copper: ${T.copper};
          --copper-dark: ${T.copperDark};
          --line: rgba(184, 90, 42, 0.18);
          --line-dark: rgba(18, 15, 13, 0.12);

          width: 100%;
          min-height: 100vh;
          background: var(--ivory);
          color: var(--ink);
          font-family: "DM Sans", Arial, sans-serif;
          overflow-x: hidden;
        }

        .etp-page *,
        .etp-page *::before,
        .etp-page *::after {
          box-sizing: border-box;
        }

        .etp-page button,
        .etp-page input,
        .etp-page textarea,
        .etp-page select {
          font-family: inherit;
        }

        .etp-container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        /* HERO */

        .etp-hero {
          position: relative;
          min-height: 720px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #111412;
        }

        .etp-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .etp-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(12, 10, 8, 0.9) 0%,
              rgba(18, 15, 13, 0.72) 45%,
              rgba(18, 15, 13, 0.38) 75%,
              rgba(12, 10, 8, 0.52) 100%
            );
        }

        .etp-hero-content {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          padding: 150px 0 110px;
        }

        .etp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
          color: #ebd3c8;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .etp-eyebrow::before {
          content: "";
          width: 30px;
          height: 1px;
          background: ${T.copper};
          flex-shrink: 0;
        }

        .etp-hero h1 {
          max-width: 850px;
          margin: 0;
          color: #ffffff;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(56px, 7vw, 98px);
          font-weight: 500;
          line-height: 0.9;
          letter-spacing: -0.045em;
        }

        .copper-text {
          font-style: italic;
          color: ${T.copper};
          background: linear-gradient(
            135deg,
            #d87c4a 0%,
            ${T.copper} 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .etp-hero-copy {
          max-width: 620px;
          margin: 32px 0 0;
          color: rgba(255, 255, 255, 0.84);
          font-size: 17px;
          line-height: 1.75;
        }

        .etp-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 36px;
        }

        .etp-button {
          min-height: 50px;
          padding: 0 22px;
          border: 1px solid transparent;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition:
            transform 180ms ease,
            background 180ms ease,
            border-color 180ms ease;
          text-decoration: none;
        }

        .etp-button-primary {
          color: #ffffff;
          background: ${T.copper};
          border-color: ${T.copper};
        }

        .etp-button-primary:hover {
          background: ${T.copperDark};
          border-color: ${T.copperDark};
          transform: translateY(-1px);
        }

        .etp-button-light {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(8px);
        }

        .etp-button-light:hover {
          background: rgba(255, 255, 255, 0.16);
        }

        .etp-hero-bottom {
          position: absolute;
          z-index: 2;
          left: 0;
          right: 0;
          bottom: 28px;
        }

        .etp-hero-bottom-inner {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          color: rgba(255, 255, 255, 0.7);
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* GENERAL SECTIONS */

        .etp-section {
          padding: 105px 0;
        }

        .etp-section-soft {
          background: var(--ivory-2);
        }

        .etp-section-header {
          max-width: 800px;
          margin-bottom: 55px;
        }

        .etp-label {
          margin-bottom: 18px;
          color: ${T.copper};
          font-family: "DM Mono", monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .etp-section h2 {
          margin: 0;
          color: var(--ink);
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(43px, 5vw, 68px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.035em;
        }

        .etp-lead {
          max-width: 710px;
          margin-top: 24px;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.8;
        }

        /* PERSONAS */

        .persona-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 70px;
          align-items: start;
        }

        .persona-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .persona-pill {
          width: 100%;
          min-height: 58px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          border: 1px solid var(--line);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.38);
          color: var(--ink-2);
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            transform 180ms ease;
        }

        .persona-pill span:last-child {
          color: var(--muted-light);
          font-family: "DM Mono", monospace;
          font-size: 10px;
        }

        .persona-pill:hover {
          border-color: rgba(184, 90, 42, 0.45);
          background: #fffdf9;
          transform: translateX(2px);
        }

        .persona-pill.active {
          color: #ffffff;
          background: ${T.copper};
          border-color: ${T.copper};
        }

        .persona-pill.active span:last-child {
          color: rgba(255, 255, 255, 0.8);
        }

        .persona-detail {
          min-height: 260px;
          padding: 45px;
          border: 1px solid var(--line);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.55);
        }

        .persona-detail-number {
          color: ${T.copper};
          font-family: "DM Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .persona-detail h3 {
          margin: 20px 0 15px;
          color: var(--ink);
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 42px;
          font-weight: 500;
          line-height: 1;
        }

        .persona-detail p {
          max-width: 600px;
          margin: 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.8;
        }

        /* MEANING */

        .meaning-intro {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 80px;
          align-items: end;
          margin-bottom: 55px;
        }

        .meaning-intro .etp-lead {
          margin-top: 0;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .metric-card {
          min-height: 270px;
          padding: 28px 24px;
          border: 1px solid var(--line);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.58);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease;
        }

        .metric-card:hover {
          transform: translateY(-3px);
          border-color: rgba(184, 90, 42, 0.45);
          background: #fffdfa;
        }

        .metric-number {
          color: ${T.copper};
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
        }

        .metric-card h3 {
          margin: 70px 0 14px;
          color: var(--ink);
          font-family: "DM Sans", Arial, sans-serif;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        .metric-card p {
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.7;
        }

        /* VIDEO */

        .story-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 70px;
          align-items: center;
        }

        .story-video {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          border-radius: 22px;
          background: #d9d2c6;
          border: 1px solid var(--line);
        }

        .story-video video {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .story-copy h2 {
          max-width: 600px;
        }

        .story-copy p {
          max-width: 590px;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.85;
        }

        .story-copy p:first-of-type {
          margin-top: 28px;
        }

        .story-copy p + p {
          margin-top: 15px;
        }

        /* PROCESS */

        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .process-card {
          padding: 30px 24px;
          min-height: 260px;
          border-top: 2px solid ${T.copper};
          border-bottom: 1px solid var(--line);
          background: rgba(255, 255, 255, 0.35);
        }

        .process-number {
          color: ${T.copper};
          font-family: "DM Mono", monospace;
          font-size: 11px;
        }

        .process-card h3 {
          margin: 65px 0 13px;
          color: var(--ink);
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 31px;
          font-weight: 500;
        }

        .process-card p {
          margin: 0;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.7;
        }

        /* FOUNDER */

        .founder-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        .founder-image-wrap {
          position: relative;
        }

        .founder-image {
          width: 100%;
          max-height: 560px;
          display: block;
          object-fit: cover;
          border-radius: 20px;
          border: 1px solid var(--line);
        }

        .founder-copy blockquote {
          margin: 30px 0;
          color: var(--ink);
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(31px, 3.4vw, 48px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.025em;
        }

        .founder-copy p {
          max-width: 650px;
          margin: 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.85;
        }

        .founder-signature {
          margin-top: 30px;
          color: ${T.copper};
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* APPLICATION */

        .application-section {
          padding-top: 0;
        }

        .application-card {
          position: relative;
          min-height: 530px;
          overflow: hidden;
          border-radius: 24px;
          background: #1c1815;
        }

        .application-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .application-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(20, 15, 12, 0.9),
              rgba(20, 15, 12, 0.55),
              rgba(20, 15, 12, 0.16)
            );
        }

        .application-content {
          position: relative;
          z-index: 2;
          max-width: 610px;
          padding: 80px;
        }

        .application-content .etp-label {
          color: #ebd3c8;
        }

        .application-content h2 {
          color: #ffffff;
        }

        .application-content p {
          margin: 25px 0 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 15px;
          line-height: 1.8;
        }

        .application-content .etp-button {
          margin-top: 30px;
        }

        /* FINAL CTA */

        .final-cta {
          padding: 110px 0;
          text-align: center;
          background: var(--ivory-2);
          border-top: 1px solid var(--line);
        }

        .final-cta h2 {
          max-width: 800px;
          margin: 0 auto;
          color: var(--ink);
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(45px, 6vw, 76px);
          font-weight: 500;
          line-height: 0.96;
          letter-spacing: -0.04em;
        }

        .final-cta p {
          max-width: 570px;
          margin: 25px auto 0;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.8;
        }

        .final-cta .etp-button {
          margin-top: 30px;
        }

        /* RESPONSIVE */

        @media (max-width: 1000px) {
          .metric-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .persona-grid,
          .story-grid,
          .founder-grid {
            gap: 45px;
          }

          .meaning-intro {
            gap: 40px;
          }
        }

        @media (max-width: 760px) {
          .etp-container {
            width: min(100% - 28px, 600px);
          }

          .etp-section {
            padding: 75px 0;
          }

          .etp-hero {
            min-height: 680px;
          }

          .etp-hero-content {
            width: calc(100% - 28px);
            padding: 125px 0 90px;
          }

          .etp-hero h1 {
            font-size: clamp(52px, 15vw, 78px);
          }

          .etp-hero-copy {
            font-size: 15px;
          }

          .etp-hero-bottom {
            display: none;
          }

          .persona-grid,
          .meaning-intro,
          .story-grid,
          .founder-grid {
            grid-template-columns: 1fr;
          }

          .persona-detail {
            min-height: auto;
            padding: 30px;
          }

          .metric-grid,
          .process-grid {
            grid-template-columns: 1fr;
          }

          .metric-card {
            min-height: 220px;
          }

          .metric-card h3 {
            margin-top: 45px;
          }

          .process-card {
            min-height: 220px;
          }

          .process-card h3 {
            margin-top: 45px;
          }

          .application-card {
            min-height: 600px;
            border-radius: 18px;
          }

          .application-content {
            padding: 45px 30px;
          }

          .founder-grid {
            gap: 35px;
          }

          .founder-image {
            max-height: 480px;
          }
        }

        @media (max-width: 480px) {
          .etp-hero {
            min-height: 650px;
          }

          .etp-hero h1 {
            font-size: 51px;
          }

          .etp-hero-copy {
            font-size: 14px;
          }

          .etp-hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .etp-button {
            width: 100%;
          }

          .etp-section h2 {
            font-size: 43px;
          }

          .persona-detail h3 {
            font-size: 36px;
          }

          .application-content {
            padding: 40px 24px;
          }

          .application-card {
            min-height: 650px;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="etp-hero">
        <video
          className="etp-hero-video"
          src={tankView}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        <div className="etp-hero-overlay" />

        <div className="etp-hero-content">
          <div className="etp-eyebrow">
            Industrial wastewater treatment
          </div>

          <h1>
            Water treatment
            <br />
            <span className="copper-text">
              without the guesswork.
            </span>
          </h1>

          <p className="etp-hero-copy">
            Industrial wastewater is not one-size-fits-all. Effective
            treatment starts with understanding the water, choosing the right
            chemistry and controlling the process from start to finish.
          </p>

          <div className="etp-hero-actions">
            {/* QUOTE BUTTON 1 */}
            <button
              type="button"
              className="etp-button etp-button-primary"
              onClick={openEnquiry}
            >
              Get a Quote
            </button>

            <a
              href="#what-treated-means"
              className="etp-button etp-button-light"
            >
              Understand treatment
            </a>
          </div>
        </div>

        <div className="etp-hero-bottom">
          <div className="etp-hero-bottom-inner">
            <span>ETP / INDUSTRIAL CHEMISTRY</span>
            <span>01 — TREATMENT SYSTEMS</span>
          </div>
        </div>
      </section>

      {/* INTRO / PERSONAS */}
      <section className="etp-section">
        <div className="etp-container">
          <div className="etp-section-header">
            <div className="etp-label">
              Built around the process
            </div>

            <h2>
              Different problems.
              <br />
              <span className="copper-text">
                One treatment objective.
              </span>
            </h2>

            <p className="etp-lead">
              Whether you operate an ETP, manage procurement or design
              treatment systems, the requirement is ultimately the same:
              consistent treatment chemistry that works with the process,
              rather than against it.
            </p>
          </div>

          <div className="persona-grid">
            <div className="persona-list">
              {personas.map((persona, index) => (
                <button
                  key={persona.id}
                  type="button"
                  className={`persona-pill ${
                    activePersona === persona.id ? "active" : ""
                  }`}
                  onClick={() => setActivePersona(persona.id)}
                >
                  <span>{persona.title}</span>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>

            <div className="persona-detail">
              <div className="persona-detail-number">
                {String(
                  personas.findIndex(
                    (item) => item.id === activePersona
                  ) + 1
                ).padStart(2, "0")}
                {" / "}
                {String(personas.length).padStart(2, "0")}
              </div>

              <h3>{activePersonaData.title}</h3>

              <p>{activePersonaData.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TREATED MEANS */}
      <section
        id="what-treated-means"
        className="etp-section etp-section-soft"
      >
        <div className="etp-container">
          <div className="meaning-intro">
            <div>
              <div className="etp-label">
                The treatment equation
              </div>

              <h2>
                What{" "}
                <span className="copper-text">
                  "treated"
                </span>{" "}
                means.
              </h2>
            </div>

            <p className="etp-lead">
              Treatment is not simply about adding chemicals to wastewater.
              It is about changing the behaviour of contaminants so that the
              system can remove them effectively.
            </p>
          </div>

          <div className="metric-grid">
            {metrics.map((metric) => (
              <article
                className="metric-card"
                key={metric.number}
              >
                <div className="metric-number">
                  {metric.number}
                </div>

                <h3>{metric.title}</h3>

                <p>{metric.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO STORY */}
      <section className="etp-section">
        <div className="etp-container">
          <div className="story-grid">
            <div className="story-video">
              <video
                src={jarSettle}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
              />
            </div>

            <div className="story-copy">
              <div className="etp-label">
                See the chemistry working
              </div>

              <h2>
                From invisible chemistry
                <br />
                <span className="copper-text">
                  to visible separation.
                </span>
              </h2>

              <p>
                Coagulation and flocculation help transform unstable,
                dispersed contaminants into larger particles that can be
                separated from the water.
              </p>

              <p>
                The result is not just a clearer tank. It is a treatment
                process that becomes easier to observe, control and optimise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="process"
        className="etp-section etp-section-soft"
      >
        <div className="etp-container">
          <div className="etp-section-header">
            <div className="etp-label">
              A practical treatment framework
            </div>

            <h2>
              Four stages.
              <br />
              <span className="copper-text">
                One controlled process.
              </span>
            </h2>
          </div>

          <div className="process-grid">
            {treatmentSteps.map((step) => (
              <article
                className="process-card"
                key={step.no}
              >
                <div className="process-number">
                  {step.no}
                </div>

                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section id="about" className="etp-section">
        <div className="etp-container">
          <div className="founder-grid">
            <div className="founder-image-wrap">
              <img
                src={founderImage}
                alt="Founder of Kumar Chemicals"
                className="founder-image"
              />
            </div>

            <div className="founder-copy">
              <div className="etp-label">
                The founding directive
              </div>

              <blockquote>
                “Good treatment chemistry should make the process clearer,
                more predictable and easier to control.”
              </blockquote>

              <p>
                Our approach is built around practical industrial treatment:
                understanding the application first, selecting chemistry
                accordingly and supporting the process beyond simply
                supplying a drum or bag of chemicals.
              </p>

              <div className="founder-signature">
                Kumar Chemicals — Industrial Chemistry
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION */}
      <section
        id="solutions"
        className="etp-section application-section"
      >
        <div className="etp-container">
          <div className="application-card">
            <img
              src={heroImage}
              alt="Industrial wastewater treatment"
            />

            <div className="application-overlay" />

            <div className="application-content">
              <div className="etp-label">
                Beyond standard products
              </div>

              <h2>
                Tell us what your
                <br />
                <span className="copper-text">
                  water needs.
                </span>
              </h2>

              <p>
                Need a specific ETP chemical, treatment recommendation or
                something that is not listed in our catalogue? Send us the
                requirement. We can discuss the application and available
                treatment options.
              </p>

              {/* QUOTE BUTTON 2 */}
              <button
                type="button"
                className="etp-button etp-button-primary"
                onClick={openEnquiry}
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="etp-container">
          <h2>
            Your wastewater is
            <br />
            <span className="copper-text">
              specific.
            </span>
            <br />
            Your treatment should be too.
          </h2>

          <p>
            Share your wastewater treatment requirement with our team and
            let's understand what the process actually needs.
          </p>

          {/* QUOTE BUTTON 3 */}
          <button
            type="button"
            className="etp-button etp-button-primary"
            onClick={openEnquiry}
          >
            Get a Quote
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* ENQUIRY MODAL */}
      {showEnquiry && (
        <EnquiryModal
          prefillProduct="ETP Treatment Chemicals / Wastewater Treatment"
          onClose={closeEnquiry}
        />
      )}
    </main>
  );
}

