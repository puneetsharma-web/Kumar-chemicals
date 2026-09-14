import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  Factory,
  FlaskConical,
  Gauge,
  Layers3,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Waves,
  Wrench,
  Recycle,
  Send,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import EnquiryModal from "../components/EnquiryModal";

/* ============================================================
   THEME
============================================================ */

const T = {
  ivory: "#F9F7F2",
  ivory2: "#F3ECE0",
  sand: "#EBDCC5",
  ink: "#120F0D",
  ink2: "#2F2720",
  muted: "#7A6E5D",
  white: "#FFFFFF",
  accent: "#C58343",
  line: "rgba(18,15,13,0.09)",
  green: "#496652",
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace";
const W = "1320px";

/* ============================================================
   HERO IMAGE
============================================================ */

const HERO_IMAGE =
  "https://www.thermaxglobal.com/wp-content/uploads/2024/02/water-and-waste-solutions.jpg";

/* ============================================================
   TREATMENT PROBLEMS
============================================================ */

const PROBLEMS = [
  {
    icon: <Waves size={22} />,
    number: "01",
    title: "High COD / BOD",
    text: "Biological and advanced treatment strategies for elevated organic loading.",
  },
  {
    icon: <Gauge size={22} />,
    number: "02",
    title: "High TDS",
    text: "Membrane and concentration systems for difficult dissolved-solids loads.",
  },
  {
    icon: <FlaskConical size={22} />,
    number: "03",
    title: "pH & Chemical Load",
    text: "Neutralization and physico-chemical treatment designed around process chemistry.",
  },
  {
    icon: <Droplets size={22} />,
    number: "04",
    title: "Oil & Grease",
    text: "Separation and flotation strategies for oily industrial wastewater.",
  },
  {
    icon: <Layers3 size={22} />,
    number: "05",
    title: "Colour & Organics",
    text: "Adsorption, oxidation and specialty treatment approaches.",
  },
  {
    icon: <Recycle size={22} />,
    number: "06",
    title: "Water Reuse",
    text: "Tertiary and membrane treatment for recycling treated water back into operations.",
  },
];

/* ============================================================
   TREATMENT TRAIN
============================================================ */

const TREATMENT_TRAIN = [
  {
    step: "01",
    title: "Screening",
    text: "Remove larger solids before downstream treatment.",
  },
  {
    step: "02",
    title: "Equalization",
    text: "Balance hydraulic and pollutant loading variations.",
  },
  {
    step: "03",
    title: "pH Correction",
    text: "Create suitable chemistry for downstream treatment.",
  },
  {
    step: "04",
    title: "Coagulation",
    text: "Destabilize suspended and colloidal matter.",
  },
  {
    step: "05",
    title: "Flocculation",
    text: "Build settleable or floatable flocs.",
  },
  {
    step: "06",
    title: "Biological Treatment",
    text: "Reduce biodegradable organic loading.",
  },
  {
    step: "07",
    title: "Clarification",
    text: "Separate treated water from biological solids.",
  },
  {
    step: "08",
    title: "Tertiary Treatment",
    text: "Polish water for discharge or reuse.",
  },
  {
    step: "09",
    title: "RO / Advanced Treatment",
    text: "Target dissolved solids and reuse requirements.",
  },
  {
    step: "10",
    title: "Reuse / ZLD",
    text: "Recover water or move toward zero liquid discharge.",
  },
];

/* ============================================================
   TECHNOLOGIES
============================================================ */

const TECHNOLOGIES = [
  {
    category: "PRELIMINARY",
    title: "Screening & Separation",
    items: [
      "Bar Screening",
      "Fine Screening",
      "Oil & Grease Separation",
      "Grit Removal",
    ],
  },
  {
    category: "PHYSICO-CHEMICAL",
    title: "Chemical Treatment",
    items: [
      "Neutralization",
      "Coagulation",
      "Flocculation",
      "Clarification",
      "DAF",
    ],
  },
  {
    category: "BIOLOGICAL",
    title: "Biological Treatment",
    items: [
      "MBBR",
      "SBR",
      "Activated Sludge",
      "MBR",
      "Anaerobic Treatment",
    ],
  },
  {
    category: "TERTIARY",
    title: "Polishing & Reuse",
    items: [
      "PSF",
      "ACF",
      "UF",
      "RO",
      "UV / Ozone",
    ],
  },
  {
    category: "ADVANCED",
    title: "High-TDS / ZLD",
    items: [
      "RO",
      "MEE",
      "ATFD",
      "Evaporation",
      "Crystallization",
    ],
  },
];

/* ============================================================
   INDUSTRIES
============================================================ */

const INDUSTRIES = [
  {
    title: "Chemical Manufacturing",
    tag: "Complex Chemistry",
    text: "Treatment strategies for variable pH, COD, TDS, colour and specialty contaminants.",
  },
  {
    title: "Pharmaceutical",
    tag: "High-Sensitivity Effluent",
    text: "Flexible treatment trains for variable organic loads and process wastewater.",
  },
  {
    title: "Textile & Dyeing",
    tag: "Colour + COD",
    text: "Physico-chemical, biological and polishing approaches for coloured wastewater.",
  },
  {
    title: "Food & Beverage",
    tag: "Organic Load",
    text: "Biological treatment and polishing for high biodegradable wastewater.",
  },
  {
    title: "Metal & Engineering",
    tag: "Metals + Oil",
    text: "Chemical precipitation, separation and polishing for industrial process effluent.",
  },
  {
    title: "Paper & Pulp",
    tag: "High Organic Load",
    text: "Integrated treatment for solids, organics and process-related contaminants.",
  },
];

/* ============================================================
   ENGINEERING SERVICES
============================================================ */

const ENGINEERING_SERVICES = [
  {
    icon: <ClipboardCheck size={22} />,
    number: "01",
    title: "Site Survey & Effluent Study",
    text: "Understand process conditions, existing infrastructure, wastewater sources and operating constraints.",
  },
  {
    icon: <FlaskConical size={22} />,
    number: "02",
    title: "Wastewater Characterization",
    text: "Review flow, pH, COD, BOD, TDS, suspended solids and other available analytical parameters.",
  },
  {
    icon: <Layers3 size={22} />,
    number: "03",
    title: "Process Design",
    text: "Develop the treatment train around the actual wastewater profile and desired outlet quality.",
  },
  {
    icon: <Settings2 size={22} />,
    number: "04",
    title: "Detailed Engineering",
    text: "PFDs, P&IDs, equipment selection, layouts, piping interfaces and engineering documentation.",
  },
  {
    icon: <Factory size={22} />,
    number: "05",
    title: "Plant Execution",
    text: "Equipment, installation, integration and site execution for new or upgraded treatment systems.",
  },
  {
    icon: <Gauge size={22} />,
    number: "06",
    title: "Commissioning & Optimization",
    text: "Start-up support, process stabilization, troubleshooting and performance optimization.",
  },
  {
    icon: <Wrench size={22} />,
    number: "07",
    title: "Plant Upgrade",
    text: "Improve existing ETP capacity, performance, chemical consumption or treatment quality.",
  },
  {
    icon: <Recycle size={22} />,
    number: "08",
    title: "O&M Support",
    text: "Operational assistance, chemical optimization, maintenance and process monitoring.",
  },
];

/* ============================================================
   PLANT UPGRADE ISSUES
============================================================ */

const UPGRADE_ISSUES = [
  "Outlet quality is not consistently achieved",
  "ETP capacity is below current production demand",
  "Chemical consumption is too high",
  "Excess sludge is being generated",
  "Power consumption is increasing",
  "Existing RO system is underperforming",
  "Plant needs water reuse capability",
  "New production line is being added",
];

/* ============================================================
   MAIN PAGE
============================================================ */

export default function ETPEngineering() {
  const [modal, setModal] = useState(false);
  const [selectedService, setSelectedService] =
    useState("");

  const [form, setForm] = useState({
    industry: "",
    flow: "",
    cod: "",
    bod: "",
    tds: "",
    ph: "",
    objective: "",
    contact: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const openEnquiry = (service) => {
    setSelectedService(service);
    setModal(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitAssessment = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      setForm({
        industry: "",
        flow: "",
        cod: "",
        bod: "",
        tds: "",
        ph: "",
        objective: "",
        contact: "",
      });
    }, 4500);
  };

  return (
    <div className="etp-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .etp-page {
          min-height: 100vh;
          background: ${T.ivory};
          color: ${T.ink};
          font-family: ${SANS};
          overflow-x: hidden;
        }

        .etp-container {
          width: min(${W}, calc(100% - 48px));
          margin: 0 auto;
        }

        button,
        input,
        select,
        textarea {
          font-family: inherit;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .etp-hero {
          padding: 155px 0 80px;
          background: ${T.ink};
          color: ${T.white};
          position: relative;
          overflow: hidden;
        }

        .etp-hero::before {
          content: "";
          position: absolute;
          width: 650px;
          height: 650px;
          right: -260px;
          top: -320px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.08);
        }

        .etp-hero::after {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          right: -130px;
          top: -190px;
          border-radius: 50%;
          background: rgba(197,131,67,.11);
        }

        .etp-hero-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr .9fr;
          gap: 75px;
          align-items: center;
        }

        .etp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: ${MONO};
          color: ${T.accent};
          font-size: 10px;
          letter-spacing: .18em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .etp-eyebrow-line {
          width: 27px;
          height: 1px;
          background: ${T.accent};
        }

        .etp-hero-title {
          font-family: ${SERIF};
          font-size: clamp(49px,5.4vw,79px);
          font-weight: 500;
          line-height: .98;
          letter-spacing: -.04em;
          margin: 0 0 26px;
        }

        .etp-hero-title em {
          color: ${T.accent};
          font-style: italic;
        }

        .etp-hero-copy {
          color: rgba(255,255,255,.66);
          max-width: 650px;
          font-size: 15.5px;
          line-height: 1.75;
          margin: 0 0 28px;
        }

        .etp-hero-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .etp-button {
          border: 1px solid ${T.accent};
          background: ${T.accent};
          color: ${T.white};
          padding: 14px 19px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          transition: .2s ease;
        }

        .etp-button:hover {
          background: ${T.white};
          color: ${T.ink};
          border-color: ${T.white};
          transform: translateY(-2px);
        }

        .etp-button.outline {
          background: transparent;
          color: ${T.white};
          border-color: rgba(255,255,255,.2);
        }

        .etp-button.outline:hover {
          background: rgba(255,255,255,.08);
          border-color: rgba(255,255,255,.5);
          color: ${T.white};
        }

        /* =====================================================
           HERO VISUAL
        ===================================================== */

        .etp-hero-visual {
          position: relative;
          height: 480px;
          border-radius: 27px;
          overflow: hidden;
          background: #29241f;
          border: 1px solid rgba(255,255,255,.08);
        }

        .etp-hero-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: .64;
        }

        .etp-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(18,15,13,.08),
              rgba(18,15,13,.76)
            );
        }

        .etp-visual-label {
          position: absolute;
          top: 24px;
          left: 24px;
          padding: 7px 10px;
          border-radius: 5px;
          background: rgba(18,15,13,.75);
          color: ${T.white};
          font-family: ${MONO};
          font-size: 9px;
          letter-spacing: .1em;
        }

        .etp-visual-caption {
          position: absolute;
          left: 27px;
          bottom: 27px;
          right: 27px;
        }

        .etp-visual-caption span {
          display: block;
          font-family: ${MONO};
          font-size: 9px;
          color: ${T.accent};
          letter-spacing: .16em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .etp-visual-caption h3 {
          font-family: ${SERIF};
          font-size: 34px;
          font-weight: 500;
          margin: 0;
          line-height: 1;
        }

        /* =====================================================
           PROBLEM SECTION
        ===================================================== */

        .problem-section {
          padding: 90px 0;
          background: ${T.ivory};
        }

        .problem-heading {
          max-width: 700px;
          margin-bottom: 38px;
        }

        .kicker {
          font-family: ${MONO};
          color: ${T.accent};
          font-size: 9px;
          letter-spacing: .18em;
          text-transform: uppercase;
          margin-bottom: 11px;
        }

        .section-title {
          font-family: ${SERIF};
          font-weight: 500;
          font-size: clamp(38px,4vw,55px);
          line-height: 1.03;
          letter-spacing: -.03em;
          margin: 0;
        }

        .section-copy {
          color: ${T.muted};
          font-size: 14px;
          line-height: 1.7;
          margin: 14px 0 0;
          max-width: 650px;
        }

        .problem-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 14px;
        }

        .problem-card {
          padding: 27px;
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 18px;
          min-height: 205px;
          transition: .25s ease;
        }

        .problem-card:hover {
          transform: translateY(-4px);
          border-color: rgba(197,131,67,.45);
          box-shadow: 0 18px 40px rgba(18,15,13,.06);
        }

        .problem-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 35px;
        }

        .problem-icon {
          width: 42px;
          height: 42px;
          border-radius: 11px;
          background: ${T.ivory2};
          color: ${T.accent};
          display: grid;
          place-items: center;
        }

        .problem-number {
          font-family: ${MONO};
          font-size: 9px;
          color: ${T.muted};
        }

        .problem-card h3 {
          font-family: ${SERIF};
          font-size: 25px;
          font-weight: 600;
          margin: 0 0 7px;
        }

        .problem-card p {
          font-size: 12px;
          color: ${T.muted};
          line-height: 1.6;
          margin: 0;
        }

        /* =====================================================
           TREATMENT TRAIN
        ===================================================== */

        .train-section {
          padding: 95px 0;
          background: ${T.ivory2};
          border-top: 1px solid ${T.line};
          border-bottom: 1px solid ${T.line};
        }

        .train-header {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 60px;
          align-items: end;
          margin-bottom: 42px;
        }

        .train-note {
          border-left: 2px solid ${T.accent};
          padding-left: 17px;
          color: ${T.muted};
          font-size: 13px;
          line-height: 1.65;
        }

        .train-flow {
          display: grid;
          grid-template-columns: repeat(5,1fr);
          gap: 10px;
        }

        .train-step {
          position: relative;
          background: ${T.white};
          border: 1px solid ${T.line};
          padding: 22px 18px 24px;
          min-height: 180px;
          border-radius: 14px;
        }

        .train-step:nth-child(n+6) {
          margin-top: 0;
        }

        .train-step::after {
          content: "→";
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          color: ${T.accent};
          background: ${T.ivory2};
          width: 20px;
          text-align: center;
          z-index: 2;
        }

        .train-step:nth-child(5)::after,
        .train-step:nth-child(10)::after {
          display: none;
        }

        .train-number {
          font-family: ${MONO};
          font-size: 9px;
          color: ${T.accent};
          margin-bottom: 30px;
        }

        .train-step h4 {
          font-family: ${SERIF};
          font-size: 22px;
          margin: 0 0 7px;
        }

        .train-step p {
          font-size: 10.5px;
          line-height: 1.5;
          color: ${T.muted};
          margin: 0;
        }

        .train-result {
          margin-top: 25px;
          border-radius: 18px;
          background: ${T.ink};
          color: ${T.white};
          padding: 26px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 18px;
        }

        .train-result-icon {
          width: 48px;
          height: 48px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          background: rgba(197,131,67,.14);
          color: ${T.accent};
        }

        .train-result strong {
          display: block;
          font-family: ${SERIF};
          font-size: 24px;
          margin-bottom: 3px;
        }

        .train-result span {
          font-size: 11px;
          color: rgba(255,255,255,.57);
        }

        /* =====================================================
           TECHNOLOGIES
        ===================================================== */

        .technology-section {
          padding: 95px 0;
          background: ${T.ivory};
        }

        .technology-grid {
          display: grid;
          grid-template-columns: repeat(5,1fr);
          gap: 12px;
          margin-top: 40px;
        }

        .technology-card {
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 17px;
          padding: 25px 20px;
        }

        .technology-card > span {
          font-family: ${MONO};
          font-size: 8px;
          color: ${T.accent};
          letter-spacing: .14em;
        }

        .technology-card h3 {
          font-family: ${SERIF};
          font-size: 23px;
          line-height: 1.1;
          margin: 11px 0 20px;
        }

        .technology-card ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }

        .technology-card li {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          padding: 7px 0;
          border-top: 1px solid ${T.line};
          font-size: 10.5px;
          color: ${T.muted};
        }

        .technology-card li svg {
          color: ${T.accent};
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* =====================================================
           INDUSTRIES
        ===================================================== */

        .industry-section {
          padding: 95px 0;
          background: ${T.ink};
          color: ${T.white};
        }

        .industry-grid {
          margin-top: 40px;
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 12px;
        }

        .industry-card {
          padding: 28px;
          min-height: 205px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.035);
          border-radius: 17px;
          transition: .25s ease;
        }

        .industry-card:hover {
          border-color: rgba(197,131,67,.5);
          background: rgba(197,131,67,.06);
          transform: translateY(-4px);
        }

        .industry-tag {
          color: ${T.accent};
          font-family: ${MONO};
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: .12em;
        }

        .industry-card h3 {
          font-family: ${SERIF};
          font-size: 27px;
          font-weight: 500;
          margin: 40px 0 8px;
        }

        .industry-card p {
          color: rgba(255,255,255,.55);
          font-size: 11.5px;
          line-height: 1.6;
          margin: 0;
        }

        /* =====================================================
           ENGINEERING
        ===================================================== */

        .engineering-section {
          padding: 100px 0;
          background: ${T.ivory2};
        }

        .engineering-header {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 70px;
          align-items: end;
          margin-bottom: 45px;
        }

        .engineering-header p {
          color: ${T.muted};
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }

        .engineering-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 13px;
        }

        .engineering-card {
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 17px;
          padding: 24px;
          min-height: 240px;
          display: flex;
          flex-direction: column;
        }

        .engineering-icon {
          width: 43px;
          height: 43px;
          border-radius: 11px;
          background: ${T.ivory2};
          color: ${T.accent};
          display: grid;
          place-items: center;
          margin-bottom: 24px;
        }

        .engineering-number {
          font-family: ${MONO};
          font-size: 8px;
          color: ${T.muted};
          margin-bottom: 8px;
        }

        .engineering-card h3 {
          font-family: ${SERIF};
          font-size: 23px;
          line-height: 1.1;
          margin: 0 0 8px;
        }

        .engineering-card p {
          color: ${T.muted};
          font-size: 10.5px;
          line-height: 1.6;
          margin: 0;
        }

        /* =====================================================
           UPGRADE
        ===================================================== */

        .upgrade-section {
          padding: 95px 0;
          background: ${T.ivory};
        }

        .upgrade-box {
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 25px;
          overflow: hidden;
          display: grid;
          grid-template-columns: .9fr 1.1fr;
        }

        .upgrade-copy {
          padding: 55px;
          background: ${T.ink};
          color: ${T.white};
        }

        .upgrade-copy h2 {
          font-family: ${SERIF};
          font-weight: 500;
          font-size: 47px;
          line-height: 1.02;
          margin: 0 0 18px;
        }

        .upgrade-copy h2 em {
          color: ${T.accent};
          font-style: italic;
        }

        .upgrade-copy p {
          color: rgba(255,255,255,.58);
          font-size: 12px;
          line-height: 1.7;
          margin: 0 0 27px;
        }

        .upgrade-list {
          padding: 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 11px;
          align-content: center;
        }

        .upgrade-item {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          color: ${T.ink2};
          font-size: 11px;
          line-height: 1.45;
        }

        .upgrade-item svg {
          color: ${T.accent};
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* =====================================================
           ASSESSMENT
        ===================================================== */

        .assessment-section {
          padding: 100px 0;
          background: ${T.ivory2};
          border-top: 1px solid ${T.line};
        }

        .assessment-grid {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 70px;
          align-items: start;
        }

        .assessment-copy h2 {
          font-family: ${SERIF};
          font-size: 50px;
          font-weight: 500;
          line-height: 1;
          margin: 0 0 17px;
        }

        .assessment-copy h2 em {
          color: ${T.accent};
          font-style: italic;
        }

        .assessment-copy p {
          color: ${T.muted};
          font-size: 13px;
          line-height: 1.7;
          margin: 0 0 27px;
        }

        .assessment-points {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .assessment-point {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
        }

        .assessment-point svg {
          color: ${T.accent};
        }

        .assessment-form {
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 21px;
          padding: 30px;
          box-shadow: 0 20px 45px rgba(18,15,13,.04);
        }

        .form-heading {
          margin-bottom: 23px;
        }

        .form-heading span {
          font-family: ${MONO};
          color: ${T.accent};
          font-size: 8px;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .form-heading h3 {
          font-family: ${SERIF};
          font-size: 31px;
          margin: 8px 0 0;
          font-weight: 600;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field.full {
          grid-column: 1 / -1;
        }

        .form-field label {
          font-family: ${MONO};
          color: ${T.muted};
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        .form-field input,
        .form-field select,
        .form-field textarea {
          border: 1px solid ${T.line};
          background: ${T.ivory};
          border-radius: 9px;
          padding: 12px;
          outline: none;
          color: ${T.ink};
          font-size: 11.5px;
        }

        .form-field textarea {
          min-height: 85px;
          resize: vertical;
        }

        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          border-color: ${T.accent};
        }

        .assessment-submit {
          margin-top: 15px;
          width: 100%;
          border: 1px solid ${T.ink};
          background: ${T.ink};
          color: ${T.white};
          border-radius: 10px;
          padding: 14px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          transition: .2s ease;
        }

        .assessment-submit:hover {
          background: ${T.accent};
          border-color: ${T.accent};
        }

        .form-success {
          padding: 30px;
          border-radius: 13px;
          background: rgba(73,102,82,.08);
          border: 1px solid rgba(73,102,82,.18);
          color: ${T.green};
          text-align: center;
        }

        .form-success svg {
          margin-bottom: 10px;
        }

        .form-success h3 {
          font-family: ${SERIF};
          font-size: 27px;
          margin: 0 0 7px;
        }

        .form-success p {
          margin: 0;
          font-size: 11px;
          line-height: 1.6;
        }

        /* =====================================================
           FINAL CTA
        ===================================================== */

        .final-cta {
          padding: 85px 0;
          background: ${T.ink};
          text-align: center;
          color: ${T.white};
        }

        .final-cta .kicker {
          margin-bottom: 13px;
        }

        .final-cta h2 {
          font-family: ${SERIF};
          font-size: clamp(43px,5vw,65px);
          font-weight: 500;
          line-height: 1;
          margin: 0 auto 15px;
          max-width: 800px;
        }

        .final-cta h2 em {
          color: ${T.accent};
          font-style: italic;
        }

        .final-cta p {
          max-width: 610px;
          margin: 0 auto 25px;
          color: rgba(255,255,255,.56);
          font-size: 13px;
          line-height: 1.7;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {
          .etp-hero-grid,
          .train-header,
          .engineering-header,
          .assessment-grid {
            grid-template-columns: 1fr;
          }

          .problem-grid {
            grid-template-columns: repeat(2,1fr);
          }

          .technology-grid {
            grid-template-columns: repeat(3,1fr);
          }

          .engineering-grid {
            grid-template-columns: repeat(2,1fr);
          }

          .upgrade-box {
            grid-template-columns: 1fr;
          }

          .train-flow {
            grid-template-columns: repeat(3,1fr);
          }

          .train-step::after {
            display: none;
          }
        }

        @media (max-width: 750px) {
          .etp-container {
            width: min(100% - 32px, ${W});
          }

          .etp-hero {
            padding: 120px 0 55px;
          }

          .etp-hero-title {
            font-size: 52px;
          }

          .etp-hero-visual {
            height: 350px;
          }

          .problem-grid,
          .industry-grid,
          .technology-grid,
          .engineering-grid {
            grid-template-columns: 1fr;
          }

          .train-flow {
            grid-template-columns: 1fr;
          }

          .train-step {
            min-height: auto;
          }

          .train-result {
            grid-template-columns: auto 1fr;
          }

          .train-result .etp-button {
            grid-column: 1 / -1;
          }

          .upgrade-copy {
            padding: 35px 27px;
          }

          .upgrade-copy h2 {
            font-size: 39px;
          }

          .upgrade-list {
            padding: 30px 25px;
            grid-template-columns: 1fr;
          }

          .assessment-copy h2 {
            font-size: 42px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-field.full {
            grid-column: auto;
          }
        }

        @media (max-width: 500px) {
          .etp-hero-actions {
            flex-direction: column;
          }

          .etp-button {
            width: 100%;
          }

          .etp-hero-title {
            font-size: 47px;
          }

          .etp-hero-visual {
            height: 300px;
          }

          .assessment-form {
            padding: 21px;
          }
        }
      `}</style>

      <Navbar
        onGetQuote={() =>
          openEnquiry("ETP / Engineering Requirement")
        }
      />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="etp-hero">
        <div className="etp-container">
          <div className="etp-hero-grid">
            <div>
              <div className="etp-eyebrow">
                <span className="etp-eyebrow-line" />
                ETP & Water Solutions
              </div>

              <h1 className="etp-hero-title">
                Industrial effluent.
                <br />
                Engineered for
                <br />
                <em>better water.</em>
              </h1>

              <p className="etp-hero-copy">
                Design, engineering and treatment solutions for
                industrial wastewater — from process
                characterization and treatment selection to
                plant execution, upgrades, commissioning and
                operational support.
              </p>

              <div className="etp-hero-actions">
                <button
                  className="etp-button"
                  onClick={() =>
                    document
                      .getElementById("assessment")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  Discuss Your Effluent
                  <ArrowUpRight size={15} />
                </button>

                <button
                  className="etp-button outline"
                  onClick={() =>
                    document
                      .getElementById("technologies")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  Explore Treatment Technologies
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            <div className="etp-hero-visual">
              <img
                src={HERO_IMAGE}
                alt="Industrial water treatment plant"
              />

              <div className="etp-hero-overlay" />

              <div className="etp-visual-label">
                ENGINEERING + WATER
              </div>

              <div className="etp-visual-caption">
                <span>From wastewater profile to plant performance</span>

                <h3>
                  Treatment engineered around the
                  process.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          PROBLEM FIRST
      ====================================================== */}

      <section className="problem-section">
        <div className="etp-container">
          <div className="problem-heading">
            <div className="kicker">
              Start with the problem
            </div>

            <h2 className="section-title">
              What does your wastewater need to do better?
            </h2>

            <p className="section-copy">
              You don't need to know the treatment technology
              before contacting us. Start with the operating
              problem — we can work backward toward the
              appropriate treatment approach.
            </p>
          </div>

          <div className="problem-grid">
            {PROBLEMS.map((problem) => (
              <div
                className="problem-card"
                key={problem.number}
              >
                <div className="problem-top">
                  <div className="problem-icon">
                    {problem.icon}
                  </div>

                  <div className="problem-number">
                    {problem.number}
                  </div>
                </div>

                <h3>{problem.title}</h3>

                <p>{problem.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          TREATMENT TRAIN
      ====================================================== */}

      <section className="train-section">
        <div className="etp-container">
          <div className="train-header">
            <div>
              <div className="kicker">
                Typical treatment architecture
              </div>

              <h2 className="section-title">
                From raw effluent to treated water.
              </h2>
            </div>

            <div className="train-note">
              No two industrial effluent streams are identical.
              The treatment train should be selected from the
              wastewater characteristics, flow, desired outlet
              quality, reuse target and operating constraints.
            </div>
          </div>

          <div className="train-flow">
            {TREATMENT_TRAIN.map((item) => (
              <div
                className="train-step"
                key={item.step}
              >
                <div className="train-number">
                  {item.step}
                </div>

                <h4>{item.title}</h4>

                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="train-result">
            <div className="train-result-icon">
              <Recycle size={23} />
            </div>

            <div>
              <strong>
                Treated water / reuse / ZLD
              </strong>

              <span>
                The final treatment objective determines the
                downstream polishing and recovery architecture.
              </span>
            </div>

            <button
              className="etp-button"
              onClick={() =>
                openEnquiry("ETP Treatment Train Discussion")
              }
            >
              Talk to an Engineer
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================
          TECHNOLOGIES
      ====================================================== */}

      <section
        className="technology-section"
        id="technologies"
      >
        <div className="etp-container">
          <div>
            <div className="kicker">
              Treatment technologies
            </div>

            <h2 className="section-title">
              The right process, not a fixed package.
            </h2>

            <p className="section-copy">
              Treatment technologies can be combined and
              sequenced according to wastewater characteristics,
              operating conditions and the required outcome.
            </p>
          </div>

          <div className="technology-grid">
            {TECHNOLOGIES.map((technology) => (
              <div
                className="technology-card"
                key={technology.title}
              >
                <span>{technology.category}</span>

                <h3>{technology.title}</h3>

                <ul>
                  {technology.items.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={12} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          INDUSTRIES
      ====================================================== */}

      <section className="industry-section">
        <div className="etp-container">
          <div>
            <div className="kicker">
              Applications
            </div>

            <h2 className="section-title">
              Built around industrial reality.
            </h2>

            <p
              className="section-copy"
              style={{
                color: "rgba(255,255,255,.56)",
              }}
            >
              Different industries create different wastewater
              challenges. The engineering approach should start
              with the process that generates the effluent.
            </p>
          </div>

          <div className="industry-grid">
            {INDUSTRIES.map((industry) => (
              <div
                className="industry-card"
                key={industry.title}
              >
                <div className="industry-tag">
                  {industry.tag}
                </div>

                <h3>{industry.title}</h3>

                <p>{industry.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          ENGINEERING SERVICES
      ====================================================== */}

      <section className="engineering-section">
        <div className="etp-container">
          <div className="engineering-header">
            <div>
              <div className="kicker">
                Engineering services
              </div>

              <h2 className="section-title">
                From study to operating plant.
              </h2>
            </div>

            <p>
              Engineering doesn't stop when the equipment arrives.
              The scope can extend from initial site assessment and
              process design through detailed engineering,
              installation, commissioning, optimization, plant
              upgrades and operational support.
            </p>
          </div>

          <div className="engineering-grid">
            {ENGINEERING_SERVICES.map((service) => (
              <div
                className="engineering-card"
                key={service.number}
              >
                <div className="engineering-icon">
                  {service.icon}
                </div>

                <div className="engineering-number">
                  {service.number} / ENGINEERING
                </div>

                <h3>{service.title}</h3>

                <p>{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          EXISTING PLANT UPGRADE
      ====================================================== */}

      <section className="upgrade-section">
        <div className="etp-container">
          <div className="upgrade-box">
            <div className="upgrade-copy">
              <div className="kicker">
                Existing ETP?
              </div>

              <h2>
                Your plant may need an
                <em> upgrade.</em>
              </h2>

              <p>
                Before replacing an entire treatment system,
                diagnose what is actually limiting performance.
                Existing plants can often be improved through
                process modification, additional treatment,
                automation, capacity expansion or better
                chemical control.
              </p>

              <button
                className="etp-button"
                onClick={() =>
                  openEnquiry("Existing ETP Upgrade Assessment")
                }
              >
                Assess My Existing Plant
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="upgrade-list">
              {UPGRADE_ISSUES.map((issue) => (
                <div
                  className="upgrade-item"
                  key={issue}
                >
                  <CheckCircle2 size={15} />
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          EFFLUENT ASSESSMENT
      ====================================================== */}

      <section
        className="assessment-section"
        id="assessment"
      >
        <div className="etp-container">
          <div className="assessment-grid">
            <div className="assessment-copy">
              <div className="kicker">
                Engineering assessment
              </div>

              <h2>
                Tell us about your
                <em> effluent.</em>
              </h2>

              <p>
                You don't need to prepare a perfect engineering
                brief. Give us the parameters you have. The more
                information available, the easier it is to
                understand the treatment challenge.
              </p>

              <div className="assessment-points">
                <div className="assessment-point">
                  <CheckCircle2 size={14} />
                  <span>Industry and process</span>
                </div>

                <div className="assessment-point">
                  <CheckCircle2 size={14} />
                  <span>Daily wastewater flow</span>
                </div>

                <div className="assessment-point">
                  <CheckCircle2 size={14} />
                  <span>Available lab parameters</span>
                </div>

                <div className="assessment-point">
                  <CheckCircle2 size={14} />
                  <span>Discharge / reuse objective</span>
                </div>

                <div className="assessment-point">
                  <CheckCircle2 size={14} />
                  <span>Existing plant information</span>
                </div>
              </div>
            </div>

            <form
              className="assessment-form"
              onSubmit={submitAssessment}
            >
              {submitted ? (
                <div className="form-success">
                  <CheckCircle2 size={30} />

                  <h3>
                    Requirement received.
                  </h3>

                  <p>
                    Your preliminary wastewater information has
                    been captured. The next step is technical
                    review of the requirement.
                  </p>
                </div>
              ) : (
                <>
                  <div className="form-heading">
                    <span>
                      PRELIMINARY INFORMATION
                    </span>

                    <h3>
                      Start an engineering discussion.
                    </h3>
                  </div>

                  <div className="form-grid">
                    <div className="form-field">
                      <label>Industry</label>

                      <select
                        name="industry"
                        value={form.industry}
                        onChange={handleInput}
                        required
                      >
                        <option value="">
                          Select industry
                        </option>

                        <option>
                          Chemical Manufacturing
                        </option>

                        <option>
                          Pharmaceutical
                        </option>

                        <option>
                          Textile & Dyeing
                        </option>

                        <option>
                          Food & Beverage
                        </option>

                        <option>
                          Metal & Engineering
                        </option>

                        <option>
                          Paper & Pulp
                        </option>

                        <option>
                          Other
                        </option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>
                        Effluent Flow / CMD
                      </label>

                      <input
                        name="flow"
                        value={form.flow}
                        onChange={handleInput}
                        placeholder="e.g. 500"
                      />
                    </div>

                    <div className="form-field">
                      <label>COD / mg/L</label>

                      <input
                        name="cod"
                        value={form.cod}
                        onChange={handleInput}
                        placeholder="If available"
                      />
                    </div>

                    <div className="form-field">
                      <label>BOD / mg/L</label>

                      <input
                        name="bod"
                        value={form.bod}
                        onChange={handleInput}
                        placeholder="If available"
                      />
                    </div>

                    <div className="form-field">
                      <label>TDS / mg/L</label>

                      <input
                        name="tds"
                        value={form.tds}
                        onChange={handleInput}
                        placeholder="If available"
                      />
                    </div>

                    <div className="form-field">
                      <label>pH</label>

                      <input
                        name="ph"
                        value={form.ph}
                        onChange={handleInput}
                        placeholder="e.g. 6.8"
                      />
                    </div>

                    <div className="form-field full">
                      <label>
                        Primary objective
                      </label>

                      <select
                        name="objective"
                        value={form.objective}
                        onChange={handleInput}
                        required
                      >
                        <option value="">
                          Select objective
                        </option>

                        <option>
                          Compliance / Discharge
                        </option>

                        <option>
                          Water Reuse
                        </option>

                        <option>
                          ZLD
                        </option>

                        <option>
                          Existing Plant Upgrade
                        </option>

                        <option>
                          Capacity Expansion
                        </option>

                        <option>
                          Reduce Operating Cost
                        </option>
                      </select>
                    </div>

                    <div className="form-field full">
                      <label>
                        Contact / Requirement
                      </label>

                      <textarea
                        name="contact"
                        value={form.contact}
                        onChange={handleInput}
                        placeholder="Tell us anything else that may help — existing ETP, production change, current issue, desired outcome..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="assessment-submit"
                  >
                    <Send size={14} />
                    Submit Engineering Requirement
                    <ArrowUpRight size={14} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ======================================================
          FINAL CTA
      ====================================================== */}

      <section className="final-cta">
        <div className="etp-container">
          <div className="kicker">
            Start with the problem
          </div>

          <h2>
            Let's turn your wastewater challenge into an
            <em> engineering brief.</em>
          </h2>

          <p>
            Whether you're planning a new ETP, upgrading an
            existing plant or looking for a water-reuse strategy,
            start with the information you have.
          </p>

          <button
            className="etp-button"
            onClick={() =>
              openEnquiry("ETP / Engineering Consultation")
            }
          >
            Speak With the Technical Team
            <ArrowUpRight size={15} />
          </button>
        </div>
      </section>

      <Footer />

      <WhatsAppButton />

      <EnquiryModal
        isOpen={modal}
        onClose={() => setModal(false)}
        prefillProduct={selectedService}
      />
    </div>
  );
}
