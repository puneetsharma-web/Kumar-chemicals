import { useEffect, useRef, useState } from "react";
import {
  ShieldCheck,
  Award,
  Building2,
  Eye,
  Target,
  Warehouse,
  Truck,
  FlaskConical,
  Flame,
  Scale,
  ClipboardCheck,
  FileCheck2,
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

function GlassCard({ children, style = {}, className = "" }) {
  return (
    <div
      className={className}
      style={{
        background: T.glass,
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
        border: `1px solid ${T.glassBorder}`,
        borderRadius: 24,
        boxShadow: "0 20px 50px rgba(18, 15, 13, 0.03)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="about-eyebrow">
      <span className="about-eyebrow-line" />

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

export default function About() {
  const [modal, setModal] = useState(false);

  const [hRef, hRev] = useReveal();
  const [sRef, sRev] = useReveal();
  const [fRef, fRev] = useReveal();
  const [iRef, iRev] = useReveal();

  const timeline = [
    {
      year: "2002",
      title: "Inception & Distribution Rights",
      desc: "Formed a regional distribution post in Northern India, securing primary dealership clearances for essential raw technical solvents and foundational processing spirits.",
    },
    {
      year: "2010",
      title: "Heavy Containment Deployment",
      desc: "Upgraded capital infrastructure with highly secure containment tanks specifically custom-lined for corrosive industrial process acids and technical liquid assets.",
    },
    {
      year: "2018",
      title: "Logistics Fleet Automation",
      desc: "Inaugurated dedicated company-controlled transport tanker fleets to guarantee zero cross-contamination risk across major domestic industrial zones.",
    },
    {
      year: "2026",
      title: "Digital Compliance Integration",
      desc: "Implemented smart material safety tracking systems, linking CoA documents and batch data sheets directly to customer procurement terminals.",
    },
  ];

  return (
    <div className="about-page">
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
          overflow-x: hidden;
          width: 100%;
        }

        img {
          max-width: 100%;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        .about-page {
          width: 100%;
          min-height: 100vh;
          background: ${T.ivory};
          color: ${T.ink};
          font-family: ${SANS};
          overflow-x: hidden;
        }

        .about-container {
          width: min(100% - 48px, ${W});
          margin: 0 auto;
        }

        .about-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .about-eyebrow-line {
          width: 32px;
          height: 1px;
          background: ${T.accent};
          flex-shrink: 0;
        }

        .about-hero {
          padding: 220px 0 120px;
          background:
            linear-gradient(
              180deg,
              rgba(243, 236, 224, 0.4) 0%,
              transparent 100%
            ),
            ${T.ivory};
          border-bottom: 1px solid ${T.line};
        }

        .about-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
          gap: 60px;
          align-items: center;
        }

        .about-hero-content {
          min-width: 0;
          max-width: 840px;
        }

        .about-hero-title {
          font-family: ${SERIF};
          font-size: clamp(46px, 5.5vw, 76px);
          font-weight: 500;
          line-height: 1.08;
          color: ${T.ink};
          letter-spacing: -0.03em;
          margin: 0 0 32px;
        }

        .about-hero-description {
          font-size: 19px;
          line-height: 1.8;
          color: ${T.ink2};
          font-weight: 400;
          margin: 0;
        }

        .about-hero-image {
          width: 100%;
          height: 260px;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid ${T.line};
        }

        .about-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .about-section-philosophy {
          padding: 140px 0;
          background: ${T.ivory2};
        }

        .about-philosophy-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
          gap: 90px;
          align-items: start;
        }

        .about-section-title {
          font-family: ${SERIF};
          font-size: clamp(36px, 4.5vw, 54px);
          font-weight: 500;
          color: ${T.ink};
          line-height: 1.15;
          margin: 0 0 28px;
          letter-spacing: -0.02em;
        }

        .about-body-text {
          font-size: 16px;
          line-height: 1.8;
          color: ${T.ink2};
          margin: 0;
        }

        .about-value-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 40px;
        }

        .about-value-card {
          padding: 32px;
          background: ${T.white};
        }

        .about-value-inner {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .about-value-icon {
          color: ${T.accent};
          flex-shrink: 0;
          margin-top: 2px;
        }

        .about-value-title {
          font-family: ${SERIF};
          font-size: 22px;
          font-weight: 600;
          margin: 0 0 6px;
          color: ${T.ink};
        }

        .about-value-description {
          font-size: 14px;
          color: ${T.muted};
          line-height: 1.6;
          margin: 0;
        }

        .about-timeline {
          display: flex;
          flex-direction: column;
          margin-top: 12px;
        }

        .timeline-node {
          position: relative;
          display: flex;
          gap: 24px;
          padding-bottom: 44px;
        }

        .timeline-node::before {
          content: "";
          position: absolute;
          left: 15px;
          top: 32px;
          bottom: -32px;
          width: 1px;
          background: ${T.line};
        }

        .timeline-node:last-child {
          padding-bottom: 0;
        }

        .timeline-node:last-child::before {
          display: none;
        }

        .timeline-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${T.white};
          border: 2px solid ${T.accent};
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .timeline-dot-inner {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${T.accent};
        }

        .timeline-content {
          min-width: 0;
        }

        .timeline-year {
          display: inline-block;
          font-family: ${MONO};
          font-size: 11px;
          font-weight: 600;
          color: ${T.accent};
          background: ${T.accentLight};
          padding: 3px 10px;
          border-radius: 6px;
        }

        .timeline-title {
          font-family: ${SERIF};
          font-size: 23px;
          font-weight: 600;
          color: ${T.ink};
          margin: 10px 0 6px;
        }

        .timeline-description {
          font-size: 14.5px;
          color: ${T.ink2};
          line-height: 1.65;
          margin: 0;
        }

        .about-founder {
          padding: 140px 0;
          background: ${T.ivory};
          border-bottom: 1px solid ${T.line};
        }

        .about-founder-card {
          padding: 54px;
          display: grid;
          grid-template-columns: minmax(300px, 0.85fr) minmax(0, 1.15fr);
          gap: 64px;
          align-items: center;
          background: ${T.white};
        }

        .about-founder-image {
          width: 100%;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid ${T.line};
        }

        .about-founder-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .about-founder-quote {
          font-family: ${SERIF};
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 500;
          color: ${T.ink};
          letter-spacing: -0.02em;
          margin: 0 0 24px;
          line-height: 1.15;
        }

        .about-founder-description {
          font-size: 16px;
          color: ${T.ink2};
          line-height: 1.8;
          margin: 0 0 24px;
        }

        .about-founder-signature {
          border-top: 1px solid ${T.line};
          padding-top: 24px;
        }

        .about-founder-name {
          font-family: ${SERIF};
          font-size: 26px;
          font-weight: 600;
          color: ${T.ink};
          margin: 0;
        }

        .about-founder-role {
          font-family: ${MONO};
          font-size: 11px;
          color: ${T.accent};
          margin-top: 4px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .about-mission {
          padding: 120px 0;
          background: ${T.ivory2};
        }

        .about-mission-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 32px;
        }

        .about-mission-card {
          padding: 48px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          background: ${T.white};
        }

        .about-mission-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .about-mission-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: ${T.accentLight};
          color: ${T.accent};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .about-mission-image {
          width: 80px;
          height: 60px;
          object-fit: cover;
          border-radius: 12px;
          flex-shrink: 0;
        }

        .about-mission-title {
          font-family: ${SERIF};
          font-size: 28px;
          font-weight: 600;
          color: ${T.ink};
          margin: 0 0 12px;
        }

        .about-mission-description {
          font-size: 15.5px;
          color: ${T.ink2};
          line-height: 1.8;
          margin: 0;
        }

        .about-infrastructure {
          padding: 140px 0;
          background: ${T.ivory};
        }

        .about-infra-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 60px;
          gap: 40px;
        }

        .about-infra-title {
          font-family: ${SERIF};
          font-size: clamp(36px, 4.5vw, 58px);
          font-weight: 500;
          color: ${T.ink};
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }

        .about-infra-intro {
          color: ${T.muted};
          font-size: 16px;
          max-width: 440px;
          line-height: 1.7;
          margin: 0;
        }

        .about-infra-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 40px;
        }

        .infra-card {
          overflow: hidden;
          position: relative;
          border-radius: 24px;
          height: 440px;
          border: 1px solid ${T.line};
        }

        .infra-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 900ms cubic-bezier(.16,1,.3,1);
        }

        .infra-card:hover .infra-img {
          transform: scale(1.05);
        }

        .infra-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(18, 15, 13, 0.85),
            transparent 50%
          );
          padding: 32px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }

        .infra-overlay-title {
          font-family: ${SERIF};
          font-size: 26px;
          color: ${T.white};
          font-weight: 500;
          margin: 0;
        }

        .infra-overlay-subtitle {
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          font-family: ${MONO};
          margin: 4px 0 0;
        }

        .infra-spec-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          padding: 0 8px;
          margin-top: 24px;
        }

        .spec-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: ${T.ink2};
          line-height: 1.5;
          min-width: 0;
        }

        .spec-item-icon {
          color: ${T.accent};
          margin-top: 3px;
          flex-shrink: 0;
        }

        .about-compliance {
          padding: 100px 0 150px;
          background: ${T.ivory2};
          border-top: 1px solid ${T.line};
        }

        .about-compliance-heading {
          text-align: center;
          margin-bottom: 64px;
        }

        .about-compliance-title {
          font-family: ${SERIF};
          font-size: clamp(34px, 4vw, 42px);
          font-weight: 500;
          color: ${T.ink};
          letter-spacing: -0.01em;
          margin: 0;
        }

        .about-compliance-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        .about-compliance-card {
          display: flex;
          gap: 20px;
          background: ${T.white};
          padding: 32px;
          border-radius: 20px;
          border: 1px solid ${T.line};
        }

        .about-compliance-icon {
          color: ${T.accent};
          flex-shrink: 0;
        }

        .about-compliance-card-title {
          font-family: ${SERIF};
          font-size: 21px;
          font-weight: 600;
          margin: 0;
        }

        .about-compliance-card-description {
          font-size: 13.5px;
          color: ${T.muted};
          margin: 4px 0 0;
          line-height: 1.5;
        }

        @media (max-width: 1100px) {
          .about-container {
            width: min(100% - 40px, ${W});
          }

          .about-hero {
            padding: 170px 0 90px;
          }

          .about-hero-grid {
            grid-template-columns: minmax(0, 1fr) minmax(280px, 0.75fr);
            gap: 40px;
          }

          .about-philosophy-grid {
            gap: 50px;
          }

          .about-founder-card {
            gap: 40px;
            padding: 40px;
          }

          .about-mission-card {
            padding: 36px;
          }

          .about-infra-grid {
            gap: 28px;
          }

          .about-compliance-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .about-hero {
            padding: 130px 0 80px;
          }

          .about-hero-grid {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .about-hero-image {
            height: 340px;
          }

          .about-section-philosophy {
            padding: 100px 0;
          }

          .about-philosophy-grid {
            grid-template-columns: 1fr;
            gap: 70px;
          }

          .about-founder {
            padding: 100px 0;
          }

          .about-founder-card {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .about-founder-image {
            height: 460px;
          }

          .about-mission {
            padding: 90px 0;
          }

          .about-infrastructure {
            padding: 100px 0;
          }

          .about-infra-heading {
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: 45px;
          }

          .about-infra-intro {
            max-width: 650px;
          }

          .about-infra-grid {
            grid-template-columns: 1fr;
          }

          .about-compliance {
            padding: 80px 0 100px;
          }
        }

        @media (max-width: 680px) {
          .about-container {
            width: min(100% - 32px, ${W});
          }

          .about-eyebrow {
            gap: 8px;
            margin-bottom: 14px;
          }

          .about-eyebrow-line {
            width: 24px;
          }

          .about-hero {
            padding: 105px 0 60px;
          }

          .about-hero-title {
            font-size: clamp(40px, 12vw, 58px);
            line-height: 1.04;
            margin-bottom: 22px;
          }

          .about-hero-title br {
            display: none;
          }

          .about-hero-description {
            font-size: 16px;
            line-height: 1.7;
          }

          .about-hero-image {
            height: 230px;
            border-radius: 18px;
          }

          .about-section-philosophy {
            padding: 75px 0;
          }

          .about-section-title {
            font-size: clamp(34px, 10vw, 46px);
            margin-bottom: 20px;
          }

          .about-body-text {
            font-size: 15px;
            line-height: 1.7;
          }

          .about-value-list {
            margin-top: 30px;
          }

          .about-value-card {
            padding: 22px;
            border-radius: 18px;
          }

          .about-value-inner {
            gap: 14px;
          }

          .about-value-title {
            font-size: 21px;
          }

          .about-value-description {
            font-size: 13.5px;
          }

          .about-timeline {
            margin-top: 0;
          }

          .timeline-node {
            gap: 16px;
            padding-bottom: 34px;
          }

          .timeline-node::before {
            left: 14px;
            top: 30px;
            bottom: -24px;
          }

          .timeline-dot {
            width: 30px;
            height: 30px;
          }

          .timeline-dot-inner {
            width: 8px;
            height: 8px;
          }

          .timeline-title {
            font-size: 21px;
          }

          .timeline-description {
            font-size: 13.5px;
            line-height: 1.6;
          }

          .about-founder {
            padding: 75px 0;
          }

          .about-founder-card {
            padding: 20px;
            border-radius: 20px;
            gap: 30px;
          }

          .about-founder-image {
            height: 330px;
            border-radius: 16px;
          }

          .about-founder-quote {
            font-size: clamp(31px, 9vw, 42px);
            margin-bottom: 18px;
          }

          .about-founder-description {
            font-size: 14.5px;
            line-height: 1.7;
          }

          .about-founder-name {
            font-size: 23px;
          }

          .about-mission {
            padding: 70px 0;
          }

          .about-mission-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .about-mission-card {
            padding: 24px;
            border-radius: 20px;
          }

          .about-mission-top {
            gap: 12px;
          }

          .about-mission-image {
            width: 70px;
            height: 52px;
          }

          .about-mission-title {
            font-size: 25px;
          }

          .about-mission-description {
            font-size: 14px;
            line-height: 1.7;
          }

          .about-infrastructure {
            padding: 75px 0;
          }

          .about-infra-heading {
            margin-bottom: 35px;
          }

          .about-infra-title {
            font-size: clamp(35px, 10vw, 48px);
          }

          .about-infra-intro {
            font-size: 14px;
          }

          .about-infra-grid {
            gap: 42px;
          }

          .infra-card {
            height: 310px;
            border-radius: 18px;
          }

          .infra-overlay {
            padding: 20px;
          }

          .infra-overlay-title {
            font-size: 22px;
          }

          .infra-overlay-subtitle {
            font-size: 10px;
          }

          .infra-spec-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 0;
          }

          .spec-item {
            font-size: 13px;
          }

          .about-compliance {
            padding: 70px 0 85px;
          }

          .about-compliance-heading {
            margin-bottom: 40px;
          }

          .about-compliance-title {
            font-size: 32px;
            line-height: 1.1;
          }

          .about-compliance-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .about-compliance-card {
            padding: 22px;
            gap: 15px;
            border-radius: 17px;
          }

          .about-compliance-card-title {
            font-size: 20px;
          }
        }

        @media (max-width: 400px) {
          .about-container {
            width: calc(100% - 24px);
          }

          .about-hero {
            padding-top: 90px;
          }

          .about-hero-title {
            font-size: 38px;
          }

          .about-hero-image {
            height: 200px;
          }

          .about-value-card,
          .about-mission-card,
          .about-founder-card {
            padding: 18px;
          }

          .about-founder-image {
            height: 280px;
          }

          .infra-card {
            height: 270px;
          }

          .infra-overlay {
            padding: 16px;
          }

          .infra-overlay-title {
            font-size: 19px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .infra-img {
            transition: none;
          }
        }
      `}</style>

      <Navbar onGetQuote={() => setModal(true)} />

      {/* HERO */}
      <section ref={hRef} className="about-hero">
        <div className="about-container" style={hRev}>
          <div className="about-hero-grid">
            <div className="about-hero-content">
              <Eyebrow>Enterprise Core Profile</Eyebrow>

              <h1 className="about-hero-title">
                Securing supply grids with{" "}
                <span style={{ fontStyle: "italic", color: T.accent }}>
                  fractional precision
                </span>
                .
              </h1>

              <p className="about-hero-description">
                Kumar Chemicals functions as an analytical partner for heavy
                chemical distribution. Moving away from standard unverified
                marketplace loops, we engineer dedicated refinery-to-gate
                industrial sourcing channels that fulfill strict parameters
                of purity, safety, and logistical continuity.
              </p>
            </div>

            <div className="about-hero-image">
              <img
                src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&q=80"
                alt="Analytical chemical testing instruments"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section ref={sRef} className="about-section-philosophy">
        <div className="about-container" style={sRev}>
          <div className="about-philosophy-grid">
            <div>
              <Eyebrow>Operational Philosophy</Eyebrow>

              <h2 className="about-section-title">
                Eliminating vulnerability from industrial procurement.
              </h2>

              <p className="about-body-text">
                Industrial manufacturing suffers when raw batch composition
                fluctuates. We combat this variance by strictly maintaining
                fully isolated processing ecosystems and executing rigorous,
                direct analytical checks across all chemical groups.
              </p>

              <div className="about-value-list">
                <GlassCard
                  className="about-value-card"
                  style={{ background: T.white }}
                >
                  <div className="about-value-inner">
                    <Scale className="about-value-icon" size={24} />

                    <div>
                      <h4 className="about-value-title">
                        Refinery-Direct Verification
                      </h4>

                      <p className="about-value-description">
                        We completely bypass third-party trading desks. 100% of
                        our inventory profiles are sourced straight from
                        primary domestic refineries and foundational
                        international synthesized imports to isolate pricing
                        stability.
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard
                  className="about-value-card"
                  style={{ background: T.white }}
                >
                  <div className="about-value-inner">
                    <FlaskConical className="about-value-icon" size={24} />

                    <div>
                      <h4 className="about-value-title">
                        On-Site Analytical Laboratory
                      </h4>

                      <p className="about-value-description">
                        Every inbound and outbound container faces stringent
                        checks at our terminal. We cross-verify density
                        benchmarks, moisture trace variables, and distillation
                        range profiles prior to assigning sealing rings.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            <div className="about-timeline">
              {timeline.map((node, i) => (
                <div className="timeline-node" key={i}>
                  <div className="timeline-dot">
                    <div className="timeline-dot-inner" />
                  </div>

                  <div className="timeline-content">
                    <span className="timeline-year">{node.year}</span>

                    <h3 className="timeline-title">{node.title}</h3>

                    <p className="timeline-description">{node.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section ref={fRef} className="about-founder">
        <div className="about-container" style={fRev}>
          <GlassCard className="about-founder-card">
            <div className="about-founder-image">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                alt="Kumar Chemicals Executive Leadership"
              />
            </div>

            <div>
              <Eyebrow>The Founding Directive</Eyebrow>

              <h2 className="about-founder-quote">
                “In chemical logistics, confidence isn't negotiated—it's
                engineered batch by batch.”
              </h2>

              <p className="about-founder-description">
                Kumar Chemicals was built on a foundational promise: that
                industrial operations should never have to compromise on
                component purity or operational clarity. By treating supply
                metrics as an exact engineering discipline rather than
                transactional trade, we have fostered generation-spanning
                partnerships with chemical engineers and procurement
                directors nationwide.
              </p>

              <div className="about-founder-signature">
                <h4 className="about-founder-name">
                  Founder & Managing Director
                </h4>

                <p className="about-founder-role">
                  Kumar Chemicals Corporate Board
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <div className="about-container">
          <div className="about-mission-grid">
            <GlassCard
              className="about-mission-card"
              style={{ background: T.white }}
            >
              <div className="about-mission-top">
                <div className="about-mission-icon">
                  <Target size={24} />
                </div>

                <img
                  className="about-mission-image"
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&q=80"
                  alt="Precision manufacturing process"
                />
              </div>

              <div>
                <h3 className="about-mission-title">
                  The Corporate Mission
                </h3>

                <p className="about-mission-description">
                  To relentlessly secure, optimize, and streamline heavy
                  chemical cargo channels through unyielding verification
                  standards, ensuring processing safety and baseline
                  consistency for heavy industrial complexes.
                </p>
              </div>
            </GlassCard>

            <GlassCard
              className="about-mission-card"
              style={{ background: T.white }}
            >
              <div className="about-mission-top">
                <div className="about-mission-icon">
                  <Eye size={24} />
                </div>

                <img
                  className="about-mission-image"
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&q=80"
                  alt="Planning logistics operations"
                />
              </div>

              <div>
                <h3 className="about-mission-title">
                  The Sourcing Vision
                </h3>

                <p className="about-mission-description">
                  To set the baseline paradigm for transparent technical
                  procurement across India, leveraging high-performance
                  technology grids to eliminate lead-time friction, variable
                  supply gaps, and residue anomalies.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section ref={iRef} className="about-infrastructure">
        <div className="about-container" style={iRev}>
          <div className="about-infra-heading">
            <div>
              <Eyebrow>Terminal Specifications</Eyebrow>

              <h2 className="about-infra-title">
                High-capacity logistics.
                <br />
                Isolated structural zones.
              </h2>
            </div>

            <p className="about-infra-intro">
              Our physical terminal hubs are built with strict safety
              barriers, avoiding cross-contamination and providing structural
              cargo protection for every product class.
            </p>
          </div>

          <div className="about-infra-grid">
            {/* STORAGE */}
            <div>
              <div className="infra-card">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80"
                  alt="Industrial Storage Depot"
                  className="infra-img"
                />

                <div className="infra-overlay">
                  <div>
                    <h4 className="infra-overlay-title">
                      Bulk Material Storage Terminal
                    </h4>

                    <p className="infra-overlay-subtitle">
                      Una Main Terminal Node // Facility Block A
                    </p>
                  </div>

                  <Warehouse size={26} color={T.accent} />
                </div>
              </div>

              <div className="infra-spec-grid">
                <div className="spec-item">
                  <ClipboardCheck
                    size={16}
                    className="spec-item-icon"
                  />

                  <span>
                    <strong>Dedicated Containment:</strong> Stainless steel
                    SUS316L and custom polymer-lined storage tanks for
                    corrosive process elements.
                  </span>
                </div>

                <div className="spec-item">
                  <Flame size={16} className="spec-item-icon" />

                  <span>
                    <strong>HSSE Safety Controls:</strong> Full perimeter
                    containment dikes alongside automatic specialized
                    foam-induction suppression networks.
                  </span>
                </div>
              </div>
            </div>

            {/* FLEET */}
            <div>
              <div className="infra-card">
                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80"
                  alt="Logistics Container Fleet"
                  className="infra-img"
                />

                <div className="infra-overlay">
                  <div>
                    <h4 className="infra-overlay-title">
                      High-Capacity Dedicated Fleet
                    </h4>

                    <p className="infra-overlay-subtitle">
                      Tanker Allotments // Inter-State Distribution
                    </p>
                  </div>

                  <Truck size={26} color={T.accent} />
                </div>
              </div>

              <div className="infra-spec-grid">
                <div className="spec-item">
                  <FileCheck2
                    size={16}
                    className="spec-item-icon"
                  />

                  <span>
                    <strong>Zero-Contamination Guarantee:</strong> Dedicated
                    strict vessel routing schedules completely eliminate
                    product-to-product changeover risks.
                  </span>
                </div>

                <div className="spec-item">
                  <ShieldCheck
                    size={16}
                    className="spec-item-icon"
                  />

                  <span>
                    <strong>GPS Telematics Tracking:</strong> Real-time
                    location parameters combined with thermal telemetry
                    updates across all chemical dispatches.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="about-compliance">
        <div className="about-container">
          <div className="about-compliance-heading">
            <Eyebrow>Verified Authority</Eyebrow>

            <h2 className="about-compliance-title">
              Regulatory Compliance Credentials
            </h2>
          </div>

          <div className="about-compliance-grid">
            <div className="about-compliance-card">
              <Award
                className="about-compliance-icon"
                size={36}
              />

              <div>
                <h4 className="about-compliance-card-title">
                  GST Verified Registration
                </h4>

                <p className="about-compliance-card-description">
                  Full compliance clearings across every state border
                  checkpoint, offering seamless fiscal transport mapping.
                </p>
              </div>
            </div>

            <div className="about-compliance-card">
              <ShieldCheck
                className="about-compliance-icon"
                size={36}
              />

              <div>
                <h4 className="about-compliance-card-title">
                  MSDS & GHS Alignment
                </h4>

                <p className="about-compliance-card-description">
                  Comprehensive technical sheets provided with all
                  assignments, ensuring safety compliance for on-site
                  handovers.
                </p>
              </div>
            </div>

            <div className="about-compliance-card">
              <Building2
                className="about-compliance-icon"
                size={36}
              />

              <div>
                <h4 className="about-compliance-card-title">
                  Batch Certificate of Analysis
                </h4>

                <p className="about-compliance-card-description">
                  Direct documentation trace logs verifying purity ratios,
                  density indicators, and distillation limits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <WhatsAppButton />

      <EnquiryModal
        isOpen={modal}
        onClose={() => setModal(false)}
      />
    </div>
  );
}