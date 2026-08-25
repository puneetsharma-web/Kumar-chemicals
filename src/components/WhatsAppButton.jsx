import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Enquiry modal — triggered from any "Get a Quote" / "Enquire Now" button.
// Form is visual-only for now (no backend yet) — shows a success state on submit.
export default function EnquiryModal({ isOpen, onClose, prefillProduct = "" }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    product: prefillProduct,
    quantity: "",
    message: "",
  });

  useEffect(() => {
    setForm((f) => ({ ...f, product: prefillProduct }));
  }, [prefillProduct]);

  useEffect(() => {
    if (!isOpen) setSubmitted(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to backend once available
    console.log("Enquiry submitted:", form);
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#F7F5F2] p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-[#6B7280] transition-colors hover:text-[#14181F]"
        >
          <X size={22} />
        </button>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF6B35]/10">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="font-[Manrope] text-xl font-bold text-[#14181F]">
              Enquiry sent
            </h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              Thanks for reaching out. Our team will get back to you shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-lg bg-[#14181F] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#14181F]/90"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-[Manrope] text-xl font-bold text-[#14181F] sm:text-2xl">
              Get a Quote
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">
              Tell us what you need — we'll get back with availability and pricing.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                <Field label="Company Name" name="company" value={form.company} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
              </div>
              <Field label="Product / Service" name="product" value={form.product} onChange={handleChange} />
              <Field label="Quantity" name="quantity" value={form.quantity} onChange={handleChange} />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#14181F]">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-[#14181F] outline-none transition-colors focus:border-[#FF6B35]"
                  placeholder="Any specific requirement or packaging preference..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-[#FF6B35] to-[#E63946] px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Send Enquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, required = false }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[#14181F]">
        {label} {required && <span className="text-[#E63946]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-[#14181F] outline-none transition-colors focus:border-[#FF6B35]"
      />
    </div>
  );
}