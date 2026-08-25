import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { 
  ArrowLeft, 
  ShieldCheck, 
  FileText, 
  Scale, 
  Layers, 
  Truck, 
  Send,
  Boxes,
  ArrowUpRight
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const T = {
  ivory: "#F9F7F2",
  ivory2: "#F3ECE0",
  sand: "#EBDCC5",
  ink: "#120F0D",
  ink2: "#2F2720",
  muted: "#7A6E5D",
  white: "#FFFFFF",
  accent: "#C58343", 
  line: "rgba(18, 15, 13, 0.08)",
  success: "#4A6B53"
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace`;
const W = "1320px";

// Comprehensive Master Dataset mapping extended dynamic parameters
const MASTER_PRODUCTS = [
  { 
    id: 1, 
    name: "Caustic Lye", 
    category: "Industrial Chemicals", 
    cas: "1310-73-2 (Liquid)", 
    purity: "47% - 50% Aqueous Solution Standard",
    packaging: "Tankers / IBC Containers / Custom Carboys",
    moq: "5 Metric Tons or Tanker Load",
    img: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?w=800&q=80",
    applications: ["Pulp & Paper Bleaching", "Chemical Neutralization Matrix", "Alumina Refinery Processing", "Water Remediation Plants"],
    description: "Highly alkaline liquid asset used extensively across process industries for acid-base stabilization, gas scrubbing, and organic synthesis processing."
  },
  { 
    id: 2, 
    name: "Caustic Soda Flakes", 
    category: "Industrial Chemicals", 
    cas: "1310-73-2 (Flakes)", 
    purity: "≥ 99.0% Active Content Matrix",
    packaging: "25kg PP/PE Laminated Moisture-Proof Bags",
    moq: "1 Metric Ton / 40 Bags",
    img: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&q=80",
    applications: ["Soap & Detergent Saponification", "Textile Mercerization", "Industrial Metal Cleaning", "Biodiesel Catalyst Formulation"],
    description: "Premium crystalline dry alkali base engineered for rapid dissociation. Features high purity specs designed to protect downstream processing valves from scaling."
  },
  { 
    id: 3, 
    name: "Soda Ash", 
    category: "Industrial Chemicals", 
    cas: "497-19-8", 
    purity: "≥ 99.2% Light / Dense Standard",
    packaging: "50kg Bags / 1000kg Bulk Jumbo Carriers",
    moq: "2 Metric Tons",
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
    applications: ["Glass Melting Batch Operations", "Detergent Builder Compounds", "Ph Modification Controls", "Water Softening Circuits"],
    description: "Refined sodium carbonate composition acting as a crucial fluxing factor in float glass manufacturing lines and an economical electrolyte builder in washing powders."
  },
  { 
    id: 18, 
    name: "N.C. Thinners (Nitrocellulose)", 
    category: "Thinners & Paint Linings", 
    cas: "Thinner-NC Matrix", 
    purity: "Premium Technical Soluble Grade",
    packaging: "Loose Tankers / 200L Metal Drums / 5L Cans / 1L Bottles",
    moq: "500 Liters / Custom Pack Assortments",
    img: "https://images.unsplash.com/photo-1592061333361-b1fe343e5e23?w=800&q=80",
    applications: ["Automotive Refinishing Lakcers", "Premium Wood Furniture Glossing", "Industrial Spray Equipment Purging", "Quick-Dry Primer Reduction"],
    description: "Expertly balanced blend of active, latent, and diluent organic solvents designed specifically to thin nitrocellulose lacquers down for high-performance atomized spray lines."
  }
  // Add additional fallback references from your core catalog array directly here...
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Form submission management states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", volume: "", note: "" });

  // Locate product object matched against dynamic URL parameter
  const product = useMemo(() => {
    return MASTER_PRODUCTS.find(p => p.id === parseInt(id)) || MASTER_PRODUCTS[0];
  }, [id]);

  // Compute related entries belonging to the same grouping class
  const relatedProducts = useMemo(() => {
    return MASTER_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", company: "", volume: "", note: "" });
    }, 4000);
  };

  return (
    <div style={{ background: T.ivory, color: T.ink, fontFamily: SANS, overflowX: "hidden" }}>
      <style>{`
        .spec-item {
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 0; border-bottom: 1px solid ${T.line};
        }
        .spec-label { font-size: 14px; color: ${T.muted}; display: flex; align-items: center; gap: 10px; }
        .spec-val { font-family: ${MONO}; font-size: 14px; fontWeight: 600; color: ${T.ink}; text-align: right; }
        
        .app-chip {
          background: ${T.white}; border: 1px solid ${T.line}; padding: 10px 18px;
          border-radius: 8px; font-size: 14px; color: ${T.ink2}; font-weight: 500;
        }

        .input-node {
          width: 100%; padding: 14px 18px; borderRadius: 10px; border: 1px solid ${T.line};
          background: ${T.ivory}; fontFamily: ${SANS}; fontSize: 14px; outline: none; transition: border 0.2s ease;
        }
        .input-node:focus { border-color: ${T.accent}; }

        .rel-card {
          background: ${T.white}; border: 1px solid ${T.line}; border-radius: 16px; padding: 24px;
          display: flex; flex-direction: column; gap: 16px; transition: all 300ms ease; cursor: pointer;
        }
        .rel-card:hover { border-color: ${T.accent}; transform: translateY(-4px); }
      `}</style>

      <Navbar onGetQuote={() => {}} />

      {/* ==========================================================================
         BACK ANCHOR PANEL
      ========================================================================== */}
      <div style={{ maxWidth: W, margin: "0 auto", padding: "140px 24px 20px" }}>
        <button 
          onClick={() => navigate("/products")}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "none", cursor: "pointer", color: T.muted, fontSize: "14px", fontWeight: 500 }}
        >
          <ArrowLeft size={16} />
          <span>Return to Material Catalog</span>
        </button>
      </div>

      {/* ==========================================================================
         CORE TECHNICAL BRIEF SPECIFICATION GRID
      ========================================================================== */}
      <section style={{ padding: "20px 0 100px" }}>
        <div style={{ maxWidth: W, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "64px", alignItems: "start" }}>
            
            {/* Left Column: Visual Identity & Industrial Profile Details */}
            <div>
              <div style={{ width: "100%", height: "460px", borderRadius: "24px", overflow: "hidden", border: `1px solid ${T.line}`, marginBottom: "40px" }}>
                <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              <span style={{ fontFamily: MONO, fontSize: "11px", color: T.accent, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                {product.category}
              </span>
              <h1 style={{ fontFamily: SERIF, fontSize: "48px", fontWeight: 500, color: T.ink, marginBottom: "20px", lineHeight: "1.15" }}>
                {product.name}
              </h1>
              <p style={{ fontSize: "16px", color: T.muted, lineHeight: "1.7", marginBottom: "40px" }}>
                {product.description}
              </p>

              {/* Core Industry Processing Allocations */}
              <h3 style={{ fontFamily: SERIF, fontSize: "24px", fontWeight: 600, marginBottom: "20px" }}>Target Engineering Sectors</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {product.applications.map((app, idx) => (
                  <span key={idx} className="app-chip">{app}</span>
                ))}
              </div>
            </div>

            {/* Right Column: Parameters Matrix & Real-time Sourcing Terminal */}
            <div style={{ position: "sticky", top: "120px", display: "flex", flexDirection: "column", gap: "40px" }}>
              
              {/* Product Chemical Specifications Matrix Card */}
              <div style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: "20px", padding: "36px" }}>
                <h3 style={{ fontFamily: SERIF, fontSize: "22px", fontWeight: 600, marginBottom: "12px" }}>Technical Parameters Matrix</h3>
                
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="spec-item">
                    <span className="spec-label"><Layers size={15} style={{ color: T.accent }} /> CAS Registry ID</span>
                    <span className="spec-val">{product.cas}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label"><Scale size={15} style={{ color: T.accent }} /> Target Purity Grade</span>
                    <span className="spec-val">{product.purity}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label"><Truck size={15} style={{ color: T.accent }} /> Dispatch Packaging Matrix</span>
                    <span className="spec-val">{product.packaging}</span>
                  </div>
                  <div className="spec-item" style={{ borderBottom: "none" }}>
                    <span className="spec-label"><FileText size={15} style={{ color: T.accent }} /> Minimum Order Volume (MOQ)</span>
                    <span className="spec-val" style={{ color: T.accent }}>{product.moq}</span>
                  </div>
                </div>
              </div>

              {/* Inline B2B Custom Procurement Request Form */}
              <div style={{ background: T.ivory2, borderRadius: "20px", padding: "36px", border: `1px solid ${T.line}` }}>
                <h4 style={{ fontFamily: SERIF, fontSize: "22px", fontWeight: 600, marginBottom: "4px" }}>Contract Sourcing Desk</h4>
                <p style={{ fontSize: "13.5px", color: T.muted, marginBottom: "24px" }}>Submit your corporate delivery timelines to receive a certified lot quota analysis.</p>

                {formSubmitted ? (
                  <div style={{ background: "rgba(74, 107, 83, 0.1)", border: `1px solid ${T.success}`, color: T.success, borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                    <ShieldCheck size={32} style={{ margin: "0 auto 10px", display: "block" }} />
                    <h5 style={{ fontWeight: 600, marginBottom: "4px" }}>Specification Request Logged</h5>
                    <p style={{ fontSize: "13px" }}>Our dispatch manager will forward standard lot pricing directly to your procurement team shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      <input type="text" name="name" required placeholder="Your Name" className="input-node" value={formData.name} onChange={handleInputChange} />
                      <input type="text" name="company" required placeholder="Company Entity" className="input-node" value={formData.company} onChange={handleInputChange} />
                    </div>
                    <input type="email" name="email" required placeholder="Corporate Email Address" className="input-node" value={formData.email} onChange={handleInputChange} />
                    <input type="text" name="volume" required placeholder={`Target Consignment Volume (e.g. ${product.moq})`} className="input-node" value={formData.volume} onChange={handleInputChange} />
                    <textarea name="note" rows={3} placeholder="State special logistical needs (e.g., loose tanker tracking or bottle custom packing sizes)..." className="input-node" style={{ resize: "none" }} value={formData.note} onChange={handleInputChange} />
                    
                    <button type="submit" style={{ width: "100%", background: T.ink, color: T.white, padding: "16px", borderRadius: "10px", border: "none", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
                      <span>Request Lot Allocation Quote</span>
                      <Send size={14} />
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         RELATED INVENTORY CROSS-REFERENCE BAR
      ========================================================================== */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: "80px 0 120px", background: T.white, borderTop: `1px solid ${T.line}` }}>
          <div style={{ maxWidth: W, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
              <Boxes size={22} style={{ color: T.accent }} />
              <h3 style={{ fontFamily: SERIF, fontSize: "28px", fontWeight: 500 }}>Cross-Referenced Materials</h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
              {relatedProducts.map((p) => (
                <div key={p.id} className="rel-card" onClick={() => navigate(`/products/${p.id}`)}>
                  <div style={{ fontFamily: MONO, fontSize: "11px", color: T.accent }}>CAS: {p.cas}</div>
                  <h4 style={{ fontFamily: SERIF, fontSize: "22px", fontWeight: 600, margin: "-6px 0 4px" }}>{p.name}</h4>
                  <p style={{ fontSize: "13.5px", color: T.muted, lineHeight: "1.5" }}>{p.description.substring(0, 90)}...</p>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 600, color: T.ink, marginTop: "auto", paddingTop: "10px" }}>
                    <span>Inspect Parameters</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
}