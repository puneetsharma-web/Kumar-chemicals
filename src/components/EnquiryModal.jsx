import { useState, useEffect } from "react";
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
  accentLight: "rgba(197, 131, 67, 0.06)",
  glass: "rgba(255, 255, 255, 0.92)",
  glassBorder: "rgba(255, 255, 255, 0.8)",
  line: "rgba(18, 15, 13, 0.1)",
  error: "#B42318",
  errorBg: "#FEF3F2",
};

const SANS = `"DM Sans", "Inter", sans-serif`;
const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const MONO = `"DM Mono", "Courier New", monospace`;

export default function EnquiryModal({
  isOpen,
  onClose,
  prefillProduct = "",
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
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

  // Keep product synchronized with the product selected outside the modal
  useEffect(() => {
    setForm((currentForm) => ({
      ...currentForm,
      product: prefillProduct,
    }));
  }, [prefillProduct]);

  // Reset submission/error state whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setSubmitting(false);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    // Remove error once user starts correcting the form
    if (error) {
      setError("");
    }
  };

  // ===============================
  // RESET FORM
  // ===============================
  const resetForm = () => {
    setForm({
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

    setSubmitted(false);
    setSubmitting(false);
    setError("");
  };

  // ===============================
  // CLOSE MODAL
  // ===============================
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // ===============================
  // SUBMIT ENQUIRY
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/enquiries",
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
        submitError.message ||
          "We could not submit your enquiry right now. Please try again."
      );
    }
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(18, 15, 13, 0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        zIndex: 2000,
        fontFamily: SANS,
        overflowY: "auto",
      }}
    >
      <style>{`
        .modal-input {
          width: 100%;
          box-sizing: border-box;
          padding: 12px 16px;
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 10px;
          font-family: ${SANS};
          font-size: 14px;
          color: ${T.ink};
          outline: none;
          transition: all 200ms ease;
        }

        .modal-input::placeholder {
          color: #A69C90;
        }

        .modal-input:focus {
          border-color: ${T.accent};
          box-shadow: 0 0 0 3px ${T.accentLight};
        }

        .modal-label {
          font-family: ${MONO};
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: ${T.muted};
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .modal-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .modal-select {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          box-sizing: border-box;
          padding: 12px 16px;
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 10px;
          font-family: ${SANS};
          font-size: 14px;
          color: ${T.ink};
          outline: none;
          cursor: pointer;
          transition: all 200ms ease;
        }

        .modal-select:focus {
          border-color: ${T.accent};
          box-shadow: 0 0 0 3px ${T.accentLight};
        }

        .modal-submit {
          width: 100%;
          padding: 16px;
          background: ${T.accent};
          color: ${T.white};
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: ${SANS};
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 200ms ease;
        }

        .modal-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(0.96);
        }

        .modal-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .modal-error {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 18px;
          padding: 12px 14px;
          background: ${T.errorBg};
          border: 1px solid rgba(180, 35, 24, 0.15);
          border-radius: 10px;
          color: ${T.error};
          font-size: 13px;
          line-height: 1.5;
        }

        .modal-error-icon {
          flex-shrink: 0;
          margin-top: 1px;
        }

        .modal-required {
          color: ${T.accent};
        }

        @media (max-width: 580px) {
          .modal-row {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }

        @media (max-width: 600px) {
          .modal-container {
            padding: 30px 22px !important;
            border-radius: 22px !important;
          }
        }
      `}</style>

      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: T.glass,
          border: `1px solid ${T.glassBorder}`,
          padding: "44px",
          borderRadius: "28px",
          width: "100%",
          maxWidth: "580px",
          position: "relative",
          boxShadow:
            "0 30px 70px rgba(18, 15, 13, 0.15)",
          margin: "auto",
        }}
      >
        {/* ===============================
            CLOSE BUTTON
        =============================== */}

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close enquiry form"
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: T.white,
            border: `1px solid ${T.line}`,
            color: T.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 200ms",
          }}
        >
          <X size={16} />
        </button>

        {/* ===============================
            SUCCESS VIEW
        =============================== */}

        {submitted ? (
          <div
            style={{
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                color: "#4CAF50",
                display: "inline-flex",
                marginBottom: "20px",
              }}
            >
              <CheckCircle2
                size={56}
                strokeWidth={1.5}
              />
            </div>

            <h3
              style={{
                fontFamily: SERIF,
                fontSize: "32px",
                fontWeight: 500,
                color: T.ink,
                marginBottom: "12px",
              }}
            >
              Enquiry Received
            </h3>

            <p
              style={{
                color: T.muted,
                fontSize: "15px",
                lineHeight: "1.6",
                maxWidth: "380px",
                margin: "0 auto 32px",
              }}
            >
              Thank you for your enquiry. Our team has
              received your requirements and will get in
              touch with you shortly.
            </p>

            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: "14px 32px",
                background: T.ink,
                color: T.white,
                border: "none",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: SANS,
              }}
            >
              Return to Website
            </button>
          </div>
        ) : (
          <>
            {/* ===============================
                HEADER
            =============================== */}

            <div style={{ marginBottom: "28px" }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: T.accent,
                  textTransform: "uppercase",
                }}
              >
                SECURE PIPELINE ACCESS
              </span>

              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "32px",
                  fontWeight: 500,
                  color: T.ink,
                  marginTop: "4px",
                  marginBottom: "0",
                }}
              >
                Request a Quote
              </h3>

              <p
                style={{
                  marginTop: "8px",
                  marginBottom: 0,
                  color: T.muted,
                  fontSize: "13px",
                  lineHeight: "1.5",
                }}
              >
                Tell us what you need and our team will
                contact you with availability and pricing.
              </p>
            </div>

            {/* ===============================
                FORM
            =============================== */}

            <form onSubmit={handleSubmit}>
              {/* NAME + COMPANY */}

              <div className="modal-row">
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

              <div className="modal-row">
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

              <div className="modal-row">
                <div>
                  <label className="modal-label">
                    Enquiry Type
                  </label>

                  <select
                    name="enquiry_type"
                    value={form.enquiry_type}
                    onChange={handleChange}
                    className="modal-select"
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

              <div className="modal-row">
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

              <div
                style={{
                  marginBottom: "16px",
                }}
              >
                <label className="modal-label">
                  Required Delivery Date
                </label>

                <input
                  type="date"
                  name="required_date"
                  value={form.required_date}
                  onChange={handleChange}
                  className="modal-input"
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                />
              </div>

              {/* MESSAGE */}

              <div
                style={{
                  marginBottom: "20px",
                }}
              >
                <label className="modal-label">
                  Additional Requirements
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="modal-input"
                  placeholder="Tell us about delivery requirements, packaging, specifications, deadlines or anything else we should know..."
                  style={{
                    minHeight: "90px",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* ERROR */}

              {error && (
                <div className="modal-error">
                  <AlertCircle
                    size={17}
                    className="modal-error-icon"
                  />

                  <span>{error}</span>
                </div>
              )}

              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                className="modal-submit"
                disabled={submitting}
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

                    <Send size={14} />
                  </>
                )}
              </button>

              {/* SECURITY MESSAGE */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginTop: "18px",
                  color: T.muted,
                  fontSize: "11px",
                  fontFamily: MONO,
                  textAlign: "center",
                }}
              >
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


// ==========================================
// REUSABLE INPUT FIELD
// ==========================================

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div style={{ minWidth: 0 }}>
      <label className="modal-label">
        {label}

        {required && (
          <span className="modal-required">
            {" "}
            *
          </span>
        )}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="modal-input"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}