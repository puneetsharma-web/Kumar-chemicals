import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Globe2,
  Sparkles,
  ArrowUpRight,
  SendHorizontal,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

/* =========================================================
   CONTACT / BUSINESS CONFIG
========================================================= */

const CONTACT = {
  companyName: "Kumar Chemicals Corporation",

  address: {
    line1: "Kotla Kalan, Near Industrial Area",
    line2: "Una, Himachal Pradesh – 174303",
    country: "India",
  },

  phones: [
    {
      number: "9015262110",
      display: "+91 90152 62110",
    },
    {
      number: "9816912519",
      display: "+91 98169 12519",
    },
  ],

  emails: [
    "kumarchemichals@gmail.com",
    "ppuunneettsshhaarrmmaa@gmail.com",
  ],

  whatsappNumbers: [
    "919015262110",
    "919816912519",
  ],
};

/* =========================================================
   API CONFIG
========================================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://kumar-chemicals.onrender.com";

const ENQUIRY_ENDPOINT = `${API_BASE_URL}/api/enquiries`;

/* =========================================================
   THEME
========================================================= */

const T = {
  white: "#FFFFFF",
  ivory: "#FBFBFA",
  rawSilk: "#F5F3EF",
  clay: "#E4DFD5",
  ink: "#0D0C0B",
  inkSubtle: "#1C1A18",
  charcoal: "#2A2825",
  copper: "#B87333",
  copperLight: "rgba(184, 115, 51, 0.15)",
  copperGlow: "rgba(184, 115, 51, 0.04)",
  line: "rgba(13, 12, 11, 0.07)",
  lineStrong: "rgba(13, 12, 11, 0.15)",
  success: "#15803D",
  successBg: "#F0FDF4",
  error: "#B42318",
  errorBg: "#FEF3F2",
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace`;

/* =========================================================
   HELPERS
========================================================= */

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const createInitialForm = () => ({
  company: "",
  name: "",
  email: "",
  phone: "",
  enquiryType: "Product Enquiry",
  product: "",
  quantity: 10,
  deliveryLocation: "",
  requiredDate: "",
  notes: "",
});

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Contact() {
  const [activeTab, setActiveTab] = useState("domestic");

  const [form, setForm] = useState(createInitialForm());

  const [focusedField, setFocusedField] = useState(null);

  const [formSuccess, setFormSuccess] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [formError, setFormError] = useState("");

  /* =======================================================
     UPDATE FORM
  ======================================================= */

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (formError) {
      setFormError("");
    }

    if (formSuccess) {
      setFormSuccess(false);
    }
  };

  /* =======================================================
     TONNAGE
  ======================================================= */

  const adjustTonnage = (amount) => {
    setForm((previous) => ({
      ...previous,
      quantity: Math.min(
        500,
        Math.max(1, Number(previous.quantity || 0) + amount)
      ),
    }));
  };

  /* =======================================================
     WHATSAPP
  ======================================================= */

  const createWhatsAppMessage = () => {
    const market =
      activeTab === "domestic"
        ? "Domestic / India"
        : "International";

    return `Hello Kumar Chemicals,

I would like to submit a procurement enquiry.

Company: ${form.company || "Not provided"}
Representative: ${form.name || "Not provided"}
Email: ${form.email || "Not provided"}
Phone: ${form.phone || "Not provided"}

Market: ${market}

Product: ${form.product || "Not specified"}
Estimated Quantity: ${form.quantity || "Not specified"} MT
Delivery Location: ${
      form.deliveryLocation || "Not specified"
    }
Required Delivery Date: ${
      form.requiredDate || "Not specified"
    }

Additional Requirements:
${form.notes || "None"}

Thank you.`;
  };

  const openWhatsApp = (whatsappNumber) => {
    const message = encodeURIComponent(
      createWhatsAppMessage()
    );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const executeWhatsAppPipeline = () => {
    openWhatsApp(CONTACT.whatsappNumbers[0]);
  };

  /* =======================================================
     FORM VALIDATION
  ======================================================= */

  const validateForm = () => {
    if (!form.company.trim()) {
      return "Please enter your company name.";
    }

    if (!form.name.trim()) {
      return "Please enter your name.";
    }

    if (!form.email.trim()) {
      return "Please enter your email address.";
    }

    if (!form.phone.trim()) {
      return "Please enter your phone number.";
    }

    if (!form.product.trim()) {
      return "Please enter the product you are enquiring about.";
    }

    if (!form.quantity || Number(form.quantity) < 1) {
      return "Please enter a valid quantity.";
    }

    return "";
  };

  /* =======================================================
     SUBMIT FORM
  ======================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setFormError("");

    const validationError = validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          company: form.company.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),

          enquiry_type: form.enquiryType,

          product: form.product.trim(),

          quantity: `${form.quantity} MT`,

          delivery_location:
            form.deliveryLocation.trim() || null,

          required_date:
            form.requiredDate || null,

          message: form.notes.trim() || null,

          market:
            activeTab === "domestic"
              ? "Domestic / India"
              : "International",
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to submit your enquiry. Please try again."
        );
      }

      console.log(
        "Enquiry successfully submitted:",
        data
      );

      setFormSuccess(true);

      setForm(createInitialForm());

      setFocusedField(null);
    } catch (error) {
      console.error(
        "Enquiry submission failed:",
        error
      );

      setFormError(
        error.message ||
          "Something went wrong while submitting your enquiry."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =======================================================
     RESET FORM
  ======================================================= */

  const resetForm = () => {
    setForm(createInitialForm());
    setFormError("");
    setFormSuccess(false);
    setFocusedField(null);
  };

  /* =======================================================
     INPUT COMPONENT
     
     FIX:
     The label now sits in a dedicated top area.
     It no longer overlaps the input placeholder/value.
  ======================================================= */

  const renderInput = ({
    field,
    label,
    type = "text",
    placeholder = "",
    required = false,
  }) => {
    const value = form[field];

    return (
      <div
        className={`interactive-input-wrapper ${
          focusedField === field ? "focused" : ""
        } ${value ? "has-value" : ""}`}
      >
        <label
          htmlFor={`contact-${field}`}
          className="floating-label"
        >
          {label}

          {required && (
            <span className="required-mark">
              {" "}
              *
            </span>
          )}
        </label>

        <input
          id={`contact-${field}`}
          type={type}
          required={required}
          className="interactive-input"
          placeholder={placeholder}
          value={value}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
          onChange={(e) =>
            updateForm(field, e.target.value)
          }
        />
      </div>
    );
  };

  return (
    <div
      style={{
        background: T.ivory,
        color: T.ink,
        fontFamily: SANS,
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <style>{`

        * {
          box-sizing: border-box;
        }

        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes floatGlow {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.4;
          }

          50% {
            transform: translateY(-15px) scale(1.05);
            opacity: 0.6;
          }
        }

        @keyframes textReveal {
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .kinetic-reveal {
          opacity: 0;
          transform: translateY(30px);
          animation:
            textReveal
            0.8s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        /* =====================================================
           INPUT FIX
        ===================================================== */

        .interactive-input-wrapper {
          position: relative;

          /*
            IMPORTANT:
            Extra top padding creates a separate space
            for the label so it can never overlap text.
          */
          padding: 26px 0 10px;

          border-bottom:
            2px solid ${T.lineStrong};

          transition:
            border-color 0.3s ease,
            transform 0.3s ease;

          min-height: 72px;
        }

        .interactive-input-wrapper.focused {
          border-bottom-color: ${T.copper};
        }

        .interactive-input {
          width: 100%;

          display: block;

          background: transparent;

          border: none;

          font-family: ${SANS};

          font-size: 16px;

          line-height: 1.5;

          color: ${T.ink};

          outline: none;

          padding: 0;

          margin: 0;

          box-sizing: border-box;
        }

        .interactive-input::placeholder {
          color: #A49B8D;

          opacity: 0.7;
        }

        .interactive-input:focus::placeholder {
          opacity: 0.5;
        }

        .interactive-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /*
          LABEL FIX

          Instead of placing the label over the input,
          it permanently occupies the top section.

          This completely eliminates overlap.
        */

        .floating-label {
          position: absolute;

          left: 0;

          top: 7px;

          z-index: 2;

          display: block;

          font-family: ${MONO};

          font-size: 10px;

          line-height: 1.2;

          color: #8A8172;

          letter-spacing: 0.1em;

          font-weight: 700;

          pointer-events: none;

          background: ${T.ivory};

          padding: 0 4px 0 0;

          transition:
            color 0.3s ease,
            transform 0.3s ease;

          max-width: 100%;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        .interactive-input-wrapper.focused
          .floating-label {

          color: ${T.copper};

          transform: translateY(-1px);
        }

        .interactive-input-wrapper.has-value
          .floating-label {

          color: #8A8172;
        }

        .interactive-input-wrapper.has-value.focused
          .floating-label {

          color: ${T.copper};
        }

        .required-mark {
          color: ${T.copper};
        }

        /* =====================================================
           TEXTAREA
        ===================================================== */

        textarea.interactive-input {
          min-height: 100px;

          resize: vertical;

          line-height: 1.5;
        }

        /* =====================================================
           SELECT / DATE FIELDS
        ===================================================== */

        .static-label-field {
          position: relative;

          border-bottom:
            2px solid ${T.lineStrong};

          padding:
            26px 0 10px;

          min-height: 72px;

          transition:
            border-color 0.3s ease;
        }

        .static-label-field:focus-within {
          border-bottom-color: ${T.copper};
        }

        .static-field-label {
          position: absolute;

          left: 0;

          top: 7px;

          z-index: 2;

          font-family: ${MONO};

          font-size: 10px;

          line-height: 1.2;

          color: ${T.copper};

          letter-spacing: 0.1em;

          font-weight: 700;

          pointer-events: none;

          background: ${T.ivory};

          padding-right: 4px;
        }

        .static-field-control {
          width: 100%;

          border: none;

          outline: none;

          background: transparent;

          font-family: ${SANS};

          font-size: 16px;

          line-height: 1.5;

          color: ${T.ink};

          padding: 0;

          margin: 0;

          cursor: pointer;
        }

        /* =====================================================
           PILLS
        ===================================================== */

        .pill-toggle {
          padding: 10px 24px;

          border-radius: 4px;

          font-family: ${MONO};

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 0.1em;

          cursor: pointer;

          transition: all 0.3s ease;

          border: 1px solid transparent;

          background: transparent;

          color: #8A8172;

          white-space: nowrap;
        }

        .pill-toggle:hover {
          color: ${T.ink};
        }

        .pill-toggle.active {
          background: ${T.ink};

          color: ${T.white};
        }

        /* =====================================================
           WHATSAPP CARD
        ===================================================== */

        .whatsapp-hq-card {
          background:
            linear-gradient(
              135deg,
              #0D0C0B 0%,
              #1C1A18 100%
            );

          border-radius: 24px;

          padding: 40px;

          position: relative;

          overflow: hidden;

          box-shadow:
            0 30px 60px
            rgba(13,12,11,0.12);
        }

        .whatsapp-hq-card::before {
          content: '';

          position: absolute;

          top: -50%;

          right: -20%;

          width: 300px;

          height: 300px;

          background:
            radial-gradient(
              circle,
              rgba(37,211,102,0.15) 0%,
              transparent 70%
            );

          animation:
            floatGlow
            8s
            infinite
            ease-in-out;

          pointer-events: none;
        }

        /* =====================================================
           BUTTONS
        ===================================================== */

        .btn-magnetic {
          background: ${T.white};

          color: ${T.ink};

          padding: 18px 32px;

          border-radius: 100px;

          font-size: 14px;

          font-weight: 600;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 12px;

          cursor: pointer;

          transition: all 0.4s ease;

          border:
            1px solid ${T.lineStrong};

          box-shadow:
            0 4px 20px
            rgba(0,0,0,0.02);
        }

        .btn-magnetic:hover:not(:disabled) {
          background: ${T.ink};

          color: ${T.white};

          transform: translateY(-3px);

          box-shadow:
            0 20px 40px
            rgba(13,12,11,0.15);

          border-color: ${T.ink};
        }

        .btn-magnetic:disabled {
          opacity: 0.65;

          cursor: not-allowed;
        }

        .btn-wa-action {
          background: #25D366;

          color: ${T.white};

          padding: 18px 36px;

          border-radius: 100px;

          font-size: 14px;

          font-weight: 700;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 12px;

          cursor: pointer;

          transition: all 0.3s ease;

          border: none;

          box-shadow:
            0 10px 30px
            rgba(37,211,102,0.3);

          white-space: nowrap;
        }

        .btn-wa-action:hover {
          background: #20ba59;

          transform:
            translateY(-2px)
            scale(1.02);

          box-shadow:
            0 15px 35px
            rgba(37,211,102,0.4);
        }

        .btn-wa-small {
          background: #25D366;

          color: white;

          border: none;

          border-radius: 999px;

          padding: 9px 14px;

          display: inline-flex;

          align-items: center;

          gap: 7px;

          font-family: ${MONO};

          font-size: 10px;

          font-weight: 700;

          cursor: pointer;

          transition: all 0.25s ease;
        }

        .btn-wa-small:hover {
          background: #20ba59;

          transform: translateY(-1px);
        }

        /* =====================================================
           CONTACT LINKS
        ===================================================== */

        .contact-link {
          color: ${T.ink};

          text-decoration: none;

          transition: color 0.2s ease;

          overflow-wrap: anywhere;
        }

        .contact-link:hover {
          color: ${T.copper};
        }

        /* =====================================================
           MAP
        ===================================================== */

        .map-frame-wrapper {
          width: 100%;

          height: 500px;

          min-height: 0;

          position: relative;

          border-radius: 24px;

          overflow: hidden;

          border:
            1px solid ${T.lineStrong};

          box-shadow:
            0 20px 50px
            rgba(0,0,0,0.05);
        }

        /* =====================================================
           LAYOUT
        ===================================================== */

        .contact-shell {
          max-width: 1440px;

          margin: 0 auto;

          padding-left: 40px;

          padding-right: 40px;
        }

        .contact-hero-grid {
          display: grid;

          grid-template-columns:
            1.2fr 0.8fr;

          gap: 60px;

          align-items: flex-end;
        }

        .whatsapp-grid {
          display: grid;

          grid-template-columns:
            1.3fr 0.7fr;

          gap: 40px;

          align-items: center;
        }

        .contact-main-grid {
          display: grid;

          grid-template-columns:
            1.1fr 0.9fr;

          gap: 100px;

          align-items: start;
        }

        .form-two-col {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 40px;
        }

        .contact-info-column {
          padding-left: 20px;

          border-left:
            1px solid ${T.line};
        }

        .map-grid {
          display: grid;

          grid-template-columns:
            0.6fr 1.4fr;

          gap: 60px;

          align-items: center;
        }

        /* =====================================================
           ALERTS
        ===================================================== */

        .alert-box {
          display: flex;

          align-items: flex-start;

          gap: 10px;

          padding: 14px 16px;

          border-radius: 10px;

          font-size: 13px;

          line-height: 1.5;
        }

        .success-box {
          background: ${T.successBg};

          border:
            1px solid rgba(21,128,61,0.15);

          color: ${T.success};
        }

        .error-box {
          background: ${T.errorBg};

          border:
            1px solid rgba(180,35,24,0.15);

          color: ${T.error};
        }

        /* =====================================================
           CONTACT DETAILS
        ===================================================== */

        .contact-detail-row {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 14px;

          flex-wrap: wrap;
        }

        .contact-detail-main {
          min-width: 0;
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1100px) {

          .contact-shell {
            padding-left: 28px;

            padding-right: 28px;
          }

          .contact-hero-grid {
            grid-template-columns: 1fr;

            gap: 30px;
          }

          .whatsapp-grid {
            grid-template-columns: 1fr;

            gap: 30px;
          }

          .whatsapp-grid > div:last-child {
            justify-content: flex-start !important;
          }

          .contact-main-grid {
            grid-template-columns: 1fr;

            gap: 70px;
          }

          .contact-info-column {
            padding-left: 0;

            padding-top: 40px;

            border-left: none;

            border-top:
              1px solid ${T.line};
          }

          .map-grid {
            grid-template-columns: 1fr;

            gap: 40px;
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 700px) {

          .contact-shell {
            padding-left: 20px;

            padding-right: 20px;
          }

          .contact-hero {
            padding-top: 145px !important;

            padding-bottom: 70px !important;
          }

          .contact-hero-grid {
            gap: 24px;
          }

          .contact-hero h1 {
            font-size:
              clamp(
                42px,
                12vw,
                58px
              ) !important;
          }

          .desktop-break {
            display: none;
          }

          .whatsapp-section {
            padding-bottom: 35px !important;
          }

          .whatsapp-hq-card {
            padding: 28px 22px;

            border-radius: 20px;
          }

          .whatsapp-grid {
            gap: 25px;
          }

          .whatsapp-grid h2 {
            font-size: 30px !important;
          }

          .btn-wa-action {
            width: 100%;

            padding: 16px 20px;

            font-size: 13px;
          }

          .contact-main-section {
            padding-bottom: 80px !important;
          }

          .contact-main-grid {
            gap: 60px;
          }

          .form-header {
            align-items: flex-start !important;

            flex-direction: column;

            gap: 20px;
          }

          .form-header > div {
            width: 100%;

            overflow-x: auto;
          }

          .pill-toggle {
            padding: 9px 15px;

            font-size: 9px;
          }

          .form-two-col {
            grid-template-columns: 1fr;

            gap: 36px;
          }

          .interactive-input {
            font-size: 15px;
          }

          .interactive-input-wrapper {
            padding-top: 25px;
          }

          .static-label-field {
            padding-top: 25px;
          }

          .volume-box {
            padding: 20px !important;
          }

          .volume-title {
            font-size: 9px !important;

            line-height: 1.4;

            max-width: 75%;
          }

          .map-section {
            padding: 60px 0 !important;
          }

          .map-frame-wrapper {
            height: 380px;

            border-radius: 18px;
          }

          .map-grid h3 {
            font-size: 32px !important;
          }

          .contact-info-column {
            padding-top: 35px;
          }

          .phone-number {
            font-size: 15px !important;
          }

          .phone-description {
            display: block;

            margin-left: 0 !important;

            margin-top: 4px;
          }
        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 420px) {

          .contact-shell {
            padding-left: 16px;

            padding-right: 16px;
          }

          .contact-hero {
            padding-top: 130px !important;
          }

          .secure-pill {
            max-width: 100%;

            padding: 7px 12px !important;
          }

          .secure-pill span {
            font-size: 8px !important;
          }

          .whatsapp-hq-card {
            padding: 24px 18px;
          }

          .status-row {
            flex-wrap: wrap;
          }

          .status-response {
            width: 100%;

            margin-top: 3px;
          }

          .btn-magnetic {
            padding: 16px 20px;

            font-size: 13px;
          }

          .map-frame-wrapper {
            height: 320px;
          }

          .contact-detail-row {
            align-items: flex-start;

            flex-direction: column;
          }
        }

      `}</style>

      <Navbar onGetQuote={() => {}} />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="contact-hero"
        style={{
          paddingTop: "240px",
          paddingBottom: "120px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            width: "600px",
            height: "600px",
            maxWidth: "80vw",
            background:
              `radial-gradient(
                circle,
                ${T.copperGlow} 0%,
                transparent 70%
              )`,
            pointerEvents: "none",
            zIndex: -1,
          }}
        />

        <div className="contact-shell">

          <div className="contact-hero-grid">

            <div className="kinetic-reveal">

              <div
                className="secure-pill"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: "24px",
                  background: T.white,
                  padding: "8px 16px",
                  borderRadius: "100px",
                  border:
                    `1px solid ${T.line}`,
                  maxWidth: "100%",
                }}
              >
                <Sparkles
                  size={13}
                  style={{
                    color: T.copper,
                    flexShrink: 0,
                  }}
                />

                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: T.copper,
                    fontWeight: 700,
                  }}
                >
                  SECURE SUPPLY CHANNELS
                </span>
              </div>

              <h1
                style={{
                  fontFamily: SERIF,
                  fontSize:
                    "clamp(48px, 6vw, 84px)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  margin: 0,
                  color: "black",
                }}
              >
                Let's construct your{" "}

                <br className="desktop-break" />

                <span
                  style={{
                    fontStyle: "italic",
                    fontFamily: SERIF,
                    color: T.copper,
                  }}
                >
                  compound pipeline
                </span>
                .
              </h1>

            </div>

            <div
              className="kinetic-reveal"
              style={{
                animationDelay: "0.15s",
                paddingBottom: "15px",
              }}
            >
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: "16px",
                  lineHeight: "1.6",
                  color: T.charcoal,
                  margin: 0,
                  maxWidth: "380px",
                }}
              >
                Connect directly with{" "}
                {CONTACT.companyName} for product
                requirements, bulk quantities, pricing,
                delivery and supply enquiries.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          WHATSAPP
      ====================================================== */}

      <section
        className="whatsapp-section"
        style={{
          paddingBottom: "60px",
        }}
      >
        <div className="contact-shell">

          <div
            className="whatsapp-hq-card kinetic-reveal"
            style={{
              animationDelay: "0.3s",
            }}
          >
            <div className="whatsapp-grid">

              <div>

                <div
                  className="status-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >

                  <span
                    style={{
                      background:
                        "rgba(37,211,102,0.15)",
                      color: "#25D366",
                      padding: "6px 14px",
                      borderRadius: "100px",
                      fontSize: "11px",
                      fontFamily: MONO,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    WHATSAPP PROCUREMENT CHANNEL
                  </span>

                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#25D366",
                      flexShrink: 0,
                    }}
                  />

                </div>

                <h2
                  style={{
                    fontFamily: SERIF,
                    fontSize:
                      "clamp(28px, 3vw, 40px)",
                    fontWeight: 400,
                    color: T.white,
                    margin: "0 0 12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Talk to Kumar Chemicals
                  directly on WhatsApp.
                </h2>

                <p
                  style={{
                    color: "#A8A195",
                    fontSize: "15px",
                    lineHeight: "1.6",
                    margin: 0,
                    maxWidth: "750px",
                  }}
                >
                  Send your product requirement,
                  quantity and delivery details
                  directly to our WhatsApp numbers.
                </p>

              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="btn-wa-action"
                  type="button"
                  onClick={executeWhatsAppPipeline}
                >
                  <MessageCircle size={18} />

                  <span>
                    Open WhatsApp
                  </span>

                  <ArrowUpRight size={18} />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          MAIN FORM
      ====================================================== */}

      <section
        className="contact-main-section"
        style={{
          paddingBottom: "140px",
        }}
      >
        <div className="contact-shell">

          <div className="contact-main-grid">

            {/* =================================================
                FORM
            ================================================== */}

            <div>

              <div
                className="form-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "48px",
                  borderBottom:
                    `1px solid ${T.line}`,
                  paddingBottom: "20px",
                }}
              >

                <h3
                  style={{
                    fontFamily: SERIF,
                    fontSize: "24px",
                    fontWeight: 400,
                    margin: 0,
                  }}
                >
                  Send an Enquiry
                </h3>

                <div
                  style={{
                    background: T.rawSilk,
                    padding: "4px",
                    borderRadius: "6px",
                    display: "flex",
                    gap: "4px",
                  }}
                >

                  <button
                    type="button"
                    className={`pill-toggle ${
                      activeTab === "domestic"
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveTab("domestic")
                    }
                  >
                    DOMESTIC (INDIA)
                  </button>

                  <button
                    type="button"
                    className={`pill-toggle ${
                      activeTab === "international"
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveTab("international")
                    }
                  >
                    INTERNATIONAL
                  </button>

                </div>

              </div>

              {/* SUCCESS */}

              {formSuccess && (
                <div
                  className="alert-box success-box"
                  style={{
                    marginBottom: "30px",
                  }}
                >
                  <CheckCircle2
                    size={18}
                    style={{
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  />

                  <div>

                    <strong>
                      Enquiry submitted successfully.
                    </strong>

                    <div
                      style={{
                        marginTop: 4,
                      }}
                    >
                      Thank you. Your requirement has
                      been sent to our team.
                    </div>

                  </div>
                </div>
              )}

              {/* ERROR */}

              {formError && (
                <div
                  className="alert-box error-box"
                  style={{
                    marginBottom: "30px",
                  }}
                >
                  <AlertCircle
                    size={18}
                    style={{
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  />

                  <span>{formError}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "36px",
                }}
              >

                {/* COMPANY */}

                {renderInput({
                  field: "company",
                  label:
                    "ENTERPRISE OR CORPORATE ENTITY",
                  placeholder:
                    "e.g. ABC Pharmaceuticals Pvt Ltd",
                  required: true,
                })}

                {/* NAME + EMAIL */}

                <div className="form-two-col">

                  {renderInput({
                    field: "name",
                    label:
                      "REPRESENTATIVE NAME",
                    placeholder:
                      "Your full name",
                    required: true,
                  })}

                  {renderInput({
                    field: "email",
                    label:
                      "OFFICIAL EMAIL",
                    type: "email",
                    placeholder:
                      "name@company.com",
                    required: true,
                  })}

                </div>

                {/* PHONE */}

                {renderInput({
                  field: "phone",
                  label:
                    "DIRECT PHONE / MOBILE",
                  type: "tel",
                  placeholder:
                    "+91 XXXXX XXXXX",
                  required: true,
                })}

                {/* =================================================
                    ENQUIRY TYPE
                ================================================== */}

                <div className="static-label-field">

                  <label className="static-field-label">
                    ENQUIRY TYPE
                  </label>

                  <select
                    value={form.enquiryType}
                    onChange={(e) =>
                      updateForm(
                        "enquiryType",
                        e.target.value
                      )
                    }
                    className="static-field-control"
                  >
                    <option value="Product Enquiry">
                      Product Enquiry
                    </option>

                    <option value="Price Enquiry">
                      Price Enquiry
                    </option>

                    <option value="Bulk Order">
                      Bulk Order
                    </option>

                    <option value="Sample Request">
                      Sample Request
                    </option>

                    <option value="General Enquiry">
                      General Enquiry
                    </option>

                    <option value="Custom Requirement">
                      Custom Requirement
                    </option>
                  </select>

                </div>

                {/* PRODUCT */}

                {renderInput({
                  field: "product",
                  label:
                    "PRODUCT / CHEMICAL REQUIRED",
                  placeholder:
                    "e.g. Isopropyl Alcohol 99%",
                  required: true,
                })}

                {/* =================================================
                    QUANTITY
                ================================================== */}

                <div
                  className="volume-box"
                  style={{
                    background: T.rawSilk,
                    padding: "24px",
                    borderRadius: "16px",
                    border:
                      `1px solid ${T.line}`,
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                      gap: 20,
                      marginBottom: "16px",
                    }}
                  >

                    <span
                      className="volume-title"
                      style={{
                        fontFamily: MONO,
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#8A8172",
                        letterSpacing: "0.05em",
                      }}
                    >
                      ESTIMATED QUANTITY
                    </span>

                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: "14px",
                        fontWeight: 700,
                        color: T.copper,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {form.quantity} MT
                    </span>

                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        adjustTonnage(-5)
                      }
                      style={{
                        background: T.white,
                        border:
                          `1px solid ${T.lineStrong}`,
                        width: "36px",
                        height: "36px",
                        minWidth: "36px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        cursor: "pointer",
                      }}
                    >
                      <Minus size={14} />
                    </button>

                    <input
                      type="range"
                      min="1"
                      max="500"
                      value={form.quantity}
                      onChange={(e) =>
                        updateForm(
                          "quantity",
                          parseInt(
                            e.target.value,
                            10
                          )
                        )
                      }
                      style={{
                        flex: 1,
                        accentColor: T.copper,
                        cursor: "ew-resize",
                        minWidth: 0,
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        adjustTonnage(5)
                      }
                      style={{
                        background: T.white,
                        border:
                          `1px solid ${T.lineStrong}`,
                        width: "36px",
                        height: "36px",
                        minWidth: "36px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={14} />
                    </button>

                  </div>

                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={form.quantity}
                    onChange={(e) =>
                      updateForm(
                        "quantity",
                        Math.min(
                          500,
                          Math.max(
                            1,
                            Number(
                              e.target.value || 1
                            )
                          )
                        )
                      )
                    }
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      border:
                        `1px solid ${T.lineStrong}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontFamily: MONO,
                      background: T.white,
                      outline: "none",
                    }}
                  />

                </div>

                {/* DELIVERY LOCATION */}

                {renderInput({
                  field: "deliveryLocation",
                  label:
                    "DELIVERY LOCATION",
                  placeholder:
                    "e.g. Baddi, Himachal Pradesh",
                })}

                {/* =================================================
                    REQUIRED DATE
                ================================================== */}

                <div className="static-label-field">

                  <label className="static-field-label">
                    REQUIRED DELIVERY DATE
                  </label>

                  <input
                    type="date"
                    min={getToday()}
                    value={form.requiredDate}
                    onChange={(e) =>
                      updateForm(
                        "requiredDate",
                        e.target.value
                      )
                    }
                    className="static-field-control"
                  />

                </div>

                {/* =================================================
                    NOTES
                ================================================== */}

                <div
                  className={`interactive-input-wrapper ${
                    focusedField === "notes"
                      ? "focused"
                      : ""
                  } ${
                    form.notes
                      ? "has-value"
                      : ""
                  }`}
                >

                  <label className="floating-label">
                    ADDITIONAL REQUIREMENTS
                  </label>

                  <textarea
                    id="contact-notes"
                    className="interactive-input"
                    placeholder="Packaging, grade, specifications, delivery requirements, deadlines, etc."
                    value={form.notes}
                    rows={4}
                    onFocus={() =>
                      setFocusedField("notes")
                    }
                    onBlur={() =>
                      setFocusedField(null)
                    }
                    onChange={(e) =>
                      updateForm(
                        "notes",
                        e.target.value
                      )
                    }
                    style={{
                      resize: "vertical",
                      minHeight: "100px",
                      lineHeight: 1.5,
                    }}
                  />

                </div>

                {/* =================================================
                    SUBMIT
                ================================================== */}

                <button
                  type="submit"
                  className="btn-magnetic"
                  disabled={submitting}
                  style={{
                    width: "100%",
                  }}
                >

                  {submitting ? (
                    <>
                      <Loader2
                        size={16}
                        style={{
                          animation:
                            "spin 1s linear infinite",
                        }}
                      />

                      <span>
                        Submitting Enquiry...
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        Submit Enquiry
                      </span>

                      <SendHorizontal
                        size={16}
                      />
                    </>
                  )}

                </button>

                {/* =================================================
                    WHATSAPP ALTERNATIVE
                ================================================== */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    paddingTop: "4px",
                  }}
                >

                  <div
                    style={{
                      textAlign: "center",
                      color: "#8A8172",
                      fontSize: "11px",
                      fontFamily: MONO,
                      letterSpacing: "0.05em",
                    }}
                  >
                    OR CONTINUE DIRECTLY ON WHATSAPP
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "1fr 1fr",
                      gap: "10px",
                    }}
                  >

                    <button
                      type="button"
                      className="btn-wa-small"
                      style={{
                        justifyContent:
                          "center",
                      }}
                      onClick={() =>
                        openWhatsApp(
                          CONTACT.whatsappNumbers[0]
                        )
                      }
                    >
                      <MessageCircle
                        size={14}
                      />

                      +91 90152 62110
                    </button>

                    <button
                      type="button"
                      className="btn-wa-small"
                      style={{
                        justifyContent:
                          "center",
                      }}
                      onClick={() =>
                        openWhatsApp(
                          CONTACT.whatsappNumbers[1]
                        )
                      }
                    >
                      <MessageCircle
                        size={14}
                      />

                      +91 98169 12519
                    </button>

                  </div>

                </div>

              </form>

            </div>

            {/* =================================================
                CONTACT INFORMATION
            ================================================== */}

            <div className="contact-info-column">

              {/* COMPANY */}

              <div
                style={{
                  marginBottom: "56px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >

                  <Building2
                    size={16}
                    style={{
                      color: T.copper,
                    }}
                  />

                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#8A8172",
                    }}
                  >
                    COMPANY
                  </span>

                </div>

                <h4
                  style={{
                    fontFamily: SERIF,
                    fontSize: "26px",
                    fontWeight: 400,
                    margin: "0 0 12px",
                    lineHeight: "1.2",
                  }}
                >
                  {CONTACT.companyName}
                </h4>

                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    color: T.charcoal,
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {CONTACT.address.line1}

                  <br />

                  {CONTACT.address.line2}

                  <br />

                  {CONTACT.address.country}
                </p>

              </div>

              {/* PHONE */}

              <div
                style={{
                  marginBottom: "56px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >

                  <Phone
                    size={16}
                    style={{
                      color: T.copper,
                    }}
                  />

                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#8A8172",
                    }}
                  >
                    CALL US
                  </span>

                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >

                  {CONTACT.phones.map(
                    (phone) => (
                      <div
                        className="contact-detail-row"
                        key={phone.number}
                      >

                        <div className="contact-detail-main">

                          <a
                            href={`tel:+91${phone.number}`}
                            className="contact-link"
                            style={{
                              fontSize: "18px",
                              fontFamily: MONO,
                              fontWeight: 600,
                            }}
                          >
                            {phone.display}
                          </a>

                        </div>

                        <a
                          href={`tel:+91${phone.number}`}
                          style={{
                            textDecoration:
                              "none",
                            background:
                              T.rawSilk,
                            color: T.ink,
                            padding:
                              "7px 12px",
                            borderRadius:
                              "999px",
                            fontFamily: MONO,
                            fontSize: "10px",
                            fontWeight: 700,
                          }}
                        >
                          CALL
                        </a>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* WHATSAPP */}

              <div
                style={{
                  marginBottom: "56px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >

                  <MessageCircle
                    size={16}
                    style={{
                      color: "#25D366",
                    }}
                  />

                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#8A8172",
                    }}
                  >
                    WHATSAPP
                  </span>

                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >

                  {CONTACT.phones.map(
                    (phone, index) => (
                      <div
                        className="contact-detail-row"
                        key={`wa-${phone.number}`}
                      >

                        <a
                          href={`https://wa.me/${CONTACT.whatsappNumbers[index]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-link"
                          style={{
                            fontSize: "17px",
                            fontFamily: MONO,
                            fontWeight: 600,
                          }}
                        >
                          {phone.display}
                        </a>

                        <button
                          type="button"
                          className="btn-wa-small"
                          onClick={() =>
                            openWhatsApp(
                              CONTACT
                                .whatsappNumbers[
                                index
                              ]
                            )
                          }
                        >

                          <MessageCircle
                            size={13}
                          />

                          CHAT

                        </button>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* EMAIL */}

              <div
                style={{
                  marginBottom: "56px",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >

                  <Mail
                    size={16}
                    style={{
                      color: T.copper,
                    }}
                  />

                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#8A8172",
                    }}
                  >
                    EMAIL
                  </span>

                </div>

                <p
                  style={{
                    fontSize: "15px",
                    fontFamily: MONO,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >

                  {CONTACT.emails.map(
                    (email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="contact-link"
                        style={{
                          borderBottom:
                            `1px solid ${T.lineStrong}`,
                          width: "fit-content",
                          maxWidth: "100%",
                        }}
                      >
                        {email}
                      </a>
                    )
                  )}

                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          MAP
      ====================================================== */}

      <section
        className="map-section"
        style={{
          background: T.white,
          padding: "80px 0",
        }}
      >
        <div className="contact-shell">

          <div className="map-grid">

            <div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >

                <Globe2
                  size={14}
                  style={{
                    color: T.copper,
                  }}
                />

                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: "10px",
                    color: T.copper,
                    letterSpacing: "0.15em",
                    fontWeight: 700,
                  }}
                >
                  LOCATION
                </span>

              </div>

              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "36px",
                  fontWeight: 400,
                  margin: "0 0 16px",
                  lineHeight: "1.15",
                }}
              >
                Strategically positioned
                logistics.
              </h3>

              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#8A8172",
                  margin: 0,
                }}
              >
                {CONTACT.companyName} is located
                in Kotla Kalan, Una, Himachal
                Pradesh.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginTop: "22px",
                  color: T.charcoal,
                }}
              >

                <MapPin
                  size={17}
                  style={{
                    color: T.copper,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                />

                <span
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.5,
                  }}
                >
                  {CONTACT.address.line1}

                  <br />

                  {CONTACT.address.line2}

                  <br />

                  {CONTACT.address.country}
                </span>

              </div>

            </div>

            <div className="map-frame-wrapper">

              <iframe
                title={`${CONTACT.companyName} Location Map`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.544778103445!2d76.28424267632948!3d31.48169197423184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391adb3b1ea0d4a3%3A0xcd50ecfa645511b0!2sKotla%20Kalan%2C%20Una%2C%20Himachal%20Pradesh%20174303!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  filter:
                    "grayscale(0.9) contrast(1.15) brightness(0.96)",
                }}
                allowFullScreen
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