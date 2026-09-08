import { useEffect, useState } from "react";
import {
  X,
  Send,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

const T = {
  ivory: "#F9F7F2",
  ink: "#120F0D",
  ink2: "#2F2720",
  muted: "#7A6E5D",
  white: "#FFFFFF",
  accent: "#C58343",
  accentLight: "rgba(197, 131, 67, 0.08)",
  glass: "rgba(255, 255, 255, 0.96)",
  glassBorder: "rgba(255, 255, 255, 0.85)",
  line: "rgba(18, 15, 13, 0.10)",
  error: "#B42318",
  errorBg: "#FEF3F2",
};

const SANS = `"DM Sans", "Inter", sans-serif`;
const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const MONO = `"DM Mono", "Courier New", monospace`;

const createInitialForm = (prefillProduct = "") => ({
  name: "",
  company: "",
  phone: "",
  email: "",
  enquiry_type: "General Enquiry",
  product: prefillProduct,
  quantity: "",
  delivery_location: "",
  required_date: "",
  message: "",
});

export default function EnquiryModal({
  isOpen,
  onClose,
  prefillProduct = "",
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState(() =>
    createInitialForm(prefillProduct)
  );

  // Sync selected product from outside the modal
  useEffect(() => {
    setForm((current) => ({
      ...current,
      product: prefillProduct,
    }));
  }, [prefillProduct]);

  // Reset modal state whenever it closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setSubmitting(false);
      setError("");
    }
  }, [isOpen]);

  // Prevent background page from scrolling while modal is open
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const resetForm = () => {
    setForm(createInitialForm(prefillProduct));
    setSubmitted(false);
    setSubmitting(false);
    setError("");
  };

  const handleClose = () => {
    if (submitting) {
      return;
    }

    resetForm();
    onClose();
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        "https://kumar-chemicals.onrender.com/api/enquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            company: form.company.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),

            enquiry_type:
              form.enquiry_type || "General Enquiry",

            product: form.product.trim(),
            quantity: form.quantity.trim(),

            delivery_location:
              form.delivery_location.trim() || null,

            required_date:
              form.required_date || null,

            message:
              form.message.trim() || null,
          }),
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to submit enquiry."
        );
      }

      console.log(
        "Enquiry successfully submitted:",
        data
      );

      setSubmitted(true);
      setSubmitting(false);
    } catch (submitError) {
      console.error(
        "Enquiry submission failed:",
        submitError
      );

      setSubmitting(false);

      setError(
        submitError?.message ||
          "We could not submit your enquiry right now. Please try again."
      );
    }
  };

  const today = new Date()
    .toISOString()
    .split("T")[0];

  return (
    <div
      className="enquiry-modal-overlay"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Request a Quote"
    >
      <style>{`
        @keyframes enquiry-spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .enquiry-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(18, 15, 13, 0.48);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          overflow-y: auto;
          box-sizing: border-box;
          font-family: ${SANS};
        }

        .enquiry-modal-container {
          position: relative;
          width: 100%;
          max-width: 620px;
          max-height: calc(100vh - 48px);
          overflow-y: auto;
          box-sizing: border-box;
          padding: 42px;
          margin: auto;
          background: ${T.glass};
          border: 1px solid ${T.glassBorder};
          border-radius: 28px;
          box-shadow:
            0 30px 80px rgba(18, 15, 13, 0.20),
            0 8px 30px rgba(18, 15, 13, 0.08);
          scrollbar-width: thin;
          scrollbar-color: ${T.accent} transparent;
        }

        .enquiry-modal-container::-webkit-scrollbar {
          width: 5px;
        }

        .enquiry-modal-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .enquiry-modal-container::-webkit-scrollbar-thumb {
          background: ${T.accent};
          border-radius: 20px;
        }

        .enquiry-close-button {
          position: absolute;
          top: 22px;
          right: 22px;
          width: 38px;
          height: 38px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid ${T.line};
          background: ${T.white};
          color: ${T.ink};
          cursor: pointer;
          transition:
            transform 200ms ease,
            background 200ms ease,
            color 200ms ease;
        }

        .enquiry-close-button:hover {
          background: ${T.ink};
          color: ${T.white};
          transform: rotate(90deg);
        }

        .enquiry-header {
          margin-bottom: 28px;
          padding-right: 45px;
        }

        .enquiry-eyebrow {
          display: block;
          margin-bottom: 6px;
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          line-height: 1.4;
          text-transform: uppercase;
          color: ${T.accent};
        }

        .enquiry-title {
          margin: 0;
          font-family: ${SERIF};
          font-size: 36px;
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: ${T.ink};
        }

        .enquiry-description {
          max-width: 470px;
          margin: 9px 0 0;
          font-family: ${SANS};
          font-size: 13px;
          line-height: 1.6;
          color: ${T.muted};
        }

        .enquiry-form {
          width: 100%;
        }

        .enquiry-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .enquiry-field {
          min-width: 0;
        }

        .enquiry-label {
          display: block;
          margin-bottom: 7px;
          font-family: ${MONO};
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.06em;
          line-height: 1.4;
          text-transform: uppercase;
          color: ${T.muted};
        }

        .enquiry-required {
          color: ${T.accent};
        }

        .enquiry-input,
        .enquiry-select,
        .enquiry-textarea {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid ${T.line};
          border-radius: 10px;
          outline: none;
          background: ${T.white};
          color: ${T.ink};
          font-family: ${SANS};
          font-size: 14px;
          line-height: 1.4;
          transition:
            border-color 200ms ease,
            box-shadow 200ms ease,
            background 200ms ease;
        }

        .enquiry-input,
        .enquiry-select {
          min-height: 46px;
          padding: 11px 14px;
        }

        .enquiry-textarea {
          min-height: 105px;
          padding: 12px 14px;
          resize: vertical;
        }

        .enquiry-input::placeholder,
        .enquiry-textarea::placeholder {
          color: #A69C90;
          opacity: 1;
        }

        .enquiry-input:focus,
        .enquiry-select:focus,
        .enquiry-textarea:focus {
          border-color: ${T.accent};
          box-shadow:
            0 0 0 3px ${T.accentLight};
        }

        .enquiry-select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          background-image:
            linear-gradient(45deg, transparent 50%, ${T.muted} 50%),
            linear-gradient(135deg, ${T.muted} 50%, transparent 50%);
          background-position:
            calc(100% - 18px) 20px,
            calc(100% - 13px) 20px;
          background-size:
            5px 5px,
            5px 5px;
          background-repeat: no-repeat;
        }

        .enquiry-date-wrapper {
          margin-bottom: 16px;
        }

        .enquiry-message-wrapper {
          margin-bottom: 20px;
        }

        .enquiry-error {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          box-sizing: border-box;
          width: 100%;
          margin-bottom: 18px;
          padding: 12px 14px;
          border: 1px solid rgba(180, 35, 24, 0.15);
          border-radius: 10px;
          background: ${T.errorBg};
          color: ${T.error};
          font-family: ${SANS};
          font-size: 13px;
          line-height: 1.5;
        }

        .enquiry-error-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .enquiry-submit {
          width: 100%;
          min-height: 52px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          border-radius: 12px;
          background: ${T.accent};
          color: ${T.white};
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 600;
          line-height: 1;
          cursor: pointer;
          transition:
            transform 200ms ease,
            filter 200ms ease,
            box-shadow 200ms ease;
        }

        .enquiry-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(0.96);
          box-shadow:
            0 10px 24px rgba(197, 131, 67, 0.18);
        }

        .enquiry-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .enquiry-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .enquiry-spinner {
          animation: enquiry-spin 1s linear infinite;
        }

        .enquiry-security {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 17px;
          text-align: center;
          font-family: ${MONO};
          font-size: 10px;
          line-height: 1.4;
          color: ${T.muted};
        }

        .enquiry-success {
          padding: 24px 5px 8px;
          text-align: center;
        }

        .enquiry-success-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          color: #4CAF50;
        }

        .enquiry-success-title {
          margin: 0;
          font-family: ${SERIF};
          font-size: 38px;
          font-weight: 500;
          line-height: 1.05;
          color: ${T.ink};
        }

        .enquiry-success-text {
          max-width: 390px;
          margin: 12px auto 28px;
          font-family: ${SANS};
          font-size: 14px;
          line-height: 1.65;
          color: ${T.muted};
        }

        .enquiry-return-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 26px;
          border: none;
          border-radius: 999px;
          background: ${T.ink};
          color: ${T.white};
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition:
            background 200ms ease,
            transform 200ms ease;
        }

        .enquiry-return-button:hover {
          background: ${T.accent};
          transform: translateY(-1px);
        }

        @media (max-width: 700px) {
          .enquiry-modal-overlay {
            align-items: center;
            padding: 16px;
          }

          .enquiry-modal-container {
            max-height: calc(100vh - 32px);
            padding: 34px 24px 26px;
            border-radius: 22px;
          }

          .enquiry-close-button {
            top: 16px;
            right: 16px;
            width: 36px;
            height: 36px;
          }

          .enquiry-header {
            padding-right: 38px;
            margin-bottom: 24px;
          }

          .enquiry-title {
            font-size: 32px;
          }

          .enquiry-row {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 16px;
          }
        }

        @media (max-width: 480px) {
          .enquiry-modal-overlay {
            align-items: flex-start;
            padding: 10px;
          }

          .enquiry-modal-container {
            max-height: calc(100vh - 20px);
            padding: 30px 18px 22px;
            border-radius: 18px;
          }

          .enquiry-close-button {
            top: 13px;
            right: 13px;
            width: 34px;
            height: 34px;
          }

          .enquiry-header {
            padding-right: 35px;
            margin-bottom: 22px;
          }

          .enquiry-eyebrow {
            font-size: 9px;
          }

          .enquiry-title {
            font-size: 29px;
          }

          .enquiry-description {
            font-size: 12px;
          }

          .enquiry-input,
          .enquiry-select,
          .enquiry-textarea {
            font-size: 13px;
          }

          .enquiry-input,
          .enquiry-select {
            min-height: 44px;
          }

          .enquiry-textarea {
            min-height: 100px;
          }

          .enquiry-submit {
            min-height: 50px;
          }

          .enquiry-security {
            font-size: 9px;
          }

          .enquiry-success-title {
            font-size: 32px;
          }

          .enquiry-success-text {
            font-size: 13px;
          }
        }

        @media (max-width: 350px) {
          .enquiry-modal-container {
            padding-left: 14px;
            padding-right: 14px;
          }

          .enquiry-title {
            font-size: 26px;
          }
        }
      `}</style>

      <div
        className="enquiry-modal-container"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="enquiry-close-button"
          onClick={handleClose}
          aria-label="Close enquiry form"
          disabled={submitting}
        >
          <X size={17} strokeWidth={1.8} />
        </button>

        {submitted ? (
          <div className="enquiry-success">
            <div className="enquiry-success-icon">
              <CheckCircle2
                size={60}
                strokeWidth={1.4}
              />
            </div>

            <h2 className="enquiry-success-title">
              Enquiry Received
            </h2>

            <p className="enquiry-success-text">
              Thank you for your enquiry. Our team has
              received your requirements and will get in
              touch with you shortly.
            </p>

            <button
              type="button"
              className="enquiry-return-button"
              onClick={handleClose}
            >
              Return to Website
            </button>
          </div>
        ) : (
          <>
            <div className="enquiry-header">
              <span className="enquiry-eyebrow">
                Secure Pipeline Access
              </span>

              <h2 className="enquiry-title">
                Request a Quote
              </h2>

              <p className="enquiry-description">
                Tell us what you need and our team will
                contact you with availability and pricing.
              </p>
            </div>

            <form
              className="enquiry-form"
              onSubmit={handleSubmit}
            >
              {/* NAME + COMPANY */}
              <div className="enquiry-row">
                <Field
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                />

                <Field
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="e.g. Alpha Labs Pvt Ltd"
                  required
                />
              </div>

              {/* PHONE + EMAIL */}
              <div className="enquiry-row">
                <Field
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />

                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                />
              </div>

              {/* ENQUIRY TYPE + PRODUCT */}
              <div className="enquiry-row">
                <div className="enquiry-field">
                  <label
                    htmlFor="enquiry_type"
                    className="enquiry-label"
                  >
                    Enquiry Type
                  </label>

                  <select
                    id="enquiry_type"
                    name="enquiry_type"
                    value={form.enquiry_type}
                    onChange={handleChange}
                    className="enquiry-select"
                  >
                    <option value="General Enquiry">
                      General Enquiry
                    </option>

                    <option value="Bulk Order">
                      Bulk Order
                    </option>

                    <option value="Product Enquiry">
                      Product Enquiry
                    </option>

                    <option value="Price Enquiry">
                      Price Enquiry
                    </option>

                    <option value="Sample Request">
                      Sample Request
                    </option>

                    <option value="Custom Requirement">
                      Custom Requirement
                    </option>
                  </select>
                </div>

                <Field
                  label="Product"
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                  placeholder="e.g. Isopropyl Alcohol 99%"
                  required
                />
              </div>

              {/* QUANTITY + DELIVERY LOCATION */}
              <div className="enquiry-row">
                <Field
                  label="Required Quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 5000 Liters"
                  required
                />

                <Field
                  label="Delivery Location"
                  name="delivery_location"
                  value={form.delivery_location}
                  onChange={handleChange}
                  placeholder="e.g. Baddi, Himachal Pradesh"
                />
              </div>

              {/* REQUIRED DATE */}
              <div className="enquiry-date-wrapper">
                <label
                  htmlFor="required_date"
                  className="enquiry-label"
                >
                  Required Delivery Date
                </label>

                <input
                  id="required_date"
                  type="date"
                  name="required_date"
                  value={form.required_date}
                  onChange={handleChange}
                  className="enquiry-input"
                  min={today}
                />
              </div>

              {/* MESSAGE */}
              <div className="enquiry-message-wrapper">
                <label
                  htmlFor="message"
                  className="enquiry-label"
                >
                  Additional Requirements
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="enquiry-textarea"
                  placeholder="Tell us about delivery requirements, packaging, specifications, deadlines or anything else we should know..."
                />
              </div>

              {/* ERROR */}
              {error && (
                <div
                  className="enquiry-error"
                  role="alert"
                >
                  <AlertCircle
                    size={17}
                    className="enquiry-error-icon"
                  />

                  <span>{error}</span>
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="enquiry-submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2
                      size={17}
                      className="enquiry-spinner"
                    />

                    <span>
                      Submitting Enquiry...
                    </span>
                  </>
                ) : (
                  <>
                    <span>Submit Enquiry</span>
                    <Send size={15} />
                  </>
                )}
              </button>

              {/* SECURITY */}
              <div className="enquiry-security">
                <ShieldCheck
                  size={14}
                  style={{
                    color: "#4CAF50",
                    flexShrink: 0,
                  }}
                />

                <span>
                  Your enquiry is securely transmitted.
                </span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  const inputId = `enquiry-${name}`;

  return (
    <div className="enquiry-field">
      <label
        htmlFor={inputId}
        className="enquiry-label"
      >
        {label}

        {required && (
          <span className="enquiry-required">
            {" "}
            *
          </span>
        )}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="enquiry-input"
        placeholder={placeholder}
        required={required}
        autoComplete={
          name === "name"
            ? "name"
            : name === "company"
            ? "organization"
            : name === "phone"
            ? "tel"
            : name === "email"
            ? "email"
            : "off"
        }
      />
    </div>
  );
}