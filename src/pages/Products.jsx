import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowUpRight,
  Boxes,
  Droplet,
  Wrench,
  PackageCheck,
  ShieldCheck,
  CheckCircle2,
  MessageSquareText,
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
  line: "rgba(18, 15, 13, 0.08)",
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace`;
const W = "1320px";

/* ============================================================
   REAL PRODUCT IMAGE URLS
============================================================ */

const FALLBACK_IMAGE =
  "https://hoachathaiphong.vn/images/attachment/6712isopropyl-alcohol-ipa-han-quoc.jpg";

/* ------------------------------------------------------------
   INDUSTRIAL CHEMICALS
------------------------------------------------------------ */

const IMG_CAUSTIC_LYE =
  "https://www.dynachem.in/wp-content/uploads/2023/02/caustic-soda-lye.jpg";

const IMG_CAUSTIC_FLAKES =
  "https://www.alvikachemicals.com/wp-content/uploads/2023/09/Sodium-Hydroxide-Caustic-Flakes.jpg";

const IMG_SODA_ASH =
  "https://jodiabaazar.com/cdn/shop/products/ICI-SodaAsh-Light.png?v=1771232450&width=1445";

const IMG_SODIUM_SULFATE =
  "https://5.imimg.com/data5/SELLER/Default/2023/7/326339604/LP/AX/KK/17579917/sodium-sulphate-50-kg-bag-1000x1000.jpg";

const IMG_H2O2 =
  "https://cdn.prod.website-files.com/5fc264e52c5b618261de20fd/6646c6a08d811bc68bbc1d0f_HP50FG200L-HydrogenPeroxide50.jpg";

const IMG_HCL =
  "https://www.wintersunchemical.com/cdn/shop/files/08-022-03.jpg?v=1735941968";

const IMG_SULFAMIC =
  "https://cpimg.tistatic.com/09921401/b/4/Sulfamic-Acid-Powder..jpg";

const IMG_SULFURIC =
  "https://cavinresource.com/wp-content/uploads/2025/04/Buy-Bulk-Sulphuric-Acid-Cavin-Resource-Malaysia.jpg";

/* ------------------------------------------------------------
   SOLVENTS
------------------------------------------------------------ */

const IMG_IPA =
  "https://hoachathaiphong.vn/images/attachment/6712isopropyl-alcohol-ipa-han-quoc.jpg";

const IMG_ETHANOL =
  "https://greenfield.com/wp-content/uploads/2021/09/111000200DM55M_1.jpg";

const IMG_TOLUENE =
  "https://orvagclf.com/cdn/shop/products/6497bb3b8164702ef41227f616c353b8.png?v=1695789285";

const IMG_ACETONE =
  "https://prodepot.com.au/wp-content/uploads/2025/01/Aceton160kg-edited2.jpg";

const IMG_BUTYL_ACETATE =
  "https://www.chemieshop24.ch/media/2a/1f/15/1635936642/Butylacetat_1000451510000.jpg?ts=1695196134";

const IMG_ETHYLENE_GLYCOL =
  "https://cpimg.tistatic.com/10587563/b/4/200-Kg-Ethylene-Glycol..jpg";

/* ------------------------------------------------------------
   ETP TREATMENT CHEMICALS
------------------------------------------------------------ */

const IMG_PAC_LIQUID =
  "https://dynakeylab.com/wp-content/uploads/2022/01/pac-liquid-1.png";

const IMG_PAC_POWDER =
  "https://5.imimg.com/data5/SELLER/Default/2023/5/305977093/IE/YV/DO/18897342/poly-aluminium-chloride-powder-1000x1000.jpg";

const IMG_ALUM =
  "https://cdn11.bigcommerce.com/s-9aklphzoxx/images/stencil/1280w/products/157/563/AluminumSulfate_Bag__59621.1755900144.jpg?c=1";

const IMG_POLYMER =
  "https://cpimg.tistatic.com/09457435/b/4/Polyelectrolyte-Flocculant-Chemical.jpg";

const IMG_COLOR_REMOVAL =
  "https://5.imimg.com/data5/SELLER/Default/2023/1/NG/CP/OU/11567716/color-removal-agent-1000x1000.jpg";

const IMG_HYPOCHLORITE =
  "https://masterchem.fi/wp-content/uploads/2020/08/Sodium-hypochlorite-200l-MaterChem.jpg";

/* ------------------------------------------------------------
   THINNERS & PAINT
------------------------------------------------------------ */

const IMG_MTO =
  "https://static.wixstatic.com/media/531925_1a78534478784bc48a32691f0e682ee6~mv2.png/v1/fill/w_1024%2Ch_1024%2Cal_c%2Cq_90%2Cenc_avif%2Cquality_auto/531925_1a78534478784bc48a32691f0e682ee6~mv2.png";

const IMG_TURPENTINE =
  "https://www.mitre10.co.nz/medias/sys_master/productimages/h21/hee/8834266562590/Mitre10-1500x1500_362146xlg/Mitre10-1500x1500-362146xlg.jpg";

const IMG_NC_THINNER =
  "https://5.imimg.com/data5/SELLER/Default/2025/8/535772053/PV/CM/AD/3510605/thinner-nc-1000x1000.png";

const IMG_DECO_THINNER =
  "https://www.ironlinkdistributors.com.au/cdn/shop/files/gp_thinner_20L.png?v=1771665577&width=900";

const IMG_CLEANING_THINNER =
  "https://www.ironlinkdistributors.com.au/cdn/shop/files/gp_thinner_20L.png?v=1771665577&width=900";

const IMG_LACQUER_THINNER =
  "https://jaeautoelectrical.com.au/cdn/shop/files/kQ-TRsGxHO-YzpyT-mp_IQ_453x453.jpg?v=1722765144";

const IMG_FURNITURE_THINNER =
  "https://www.ironlinkdistributors.com.au/cdn/shop/files/gp_thinner_20L.png?v=1771665577&width=900";

const IMG_OIL_PAINT =
  "https://5.imimg.com/data5/SELLER/Default/2023/6/313692784/EA/QO/YS/13041960/oil-based-paint-1000x1000.jpg";

const IMG_MELAMINE =
  "https://cpimg.tistatic.com/5820533/b/4/melamine-woodkeeper.jpg";

const IMG_LACQUER_PAINT =
  "https://5.imimg.com/data5/SELLER/Default/2023/6/313692784/EA/QO/YS/13041960/oil-based-paint-1000x1000.jpg";

const IMG_DECO_PAINT =
  "https://5.imimg.com/data5/SELLER/Default/2023/6/313692784/EA/QO/YS/13041960/oil-based-paint-1000x1000.jpg";

/* ============================================================
   IMAGE COMPONENT
============================================================ */

function ProductImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) {
          setImageSrc(FALLBACK_IMAGE);
        }
      }}
    />
  );
}

/* ============================================================
   PRODUCTS
============================================================ */

const RAW_PRODUCTS = [
  {
    id: 1,
    name: "Caustic Lye",
    category: "Industrial Chemicals",
    spec: "NaOH Liquid | Available in Tanker / 50L / 200L Drums",
    cas: "1310-73-2 (Liquid)",
    img: IMG_CAUSTIC_LYE,
  },
  {
    id: 2,
    name: "Caustic Soda Flakes",
    category: "Industrial Chemicals",
    spec: "NaOH 99% | 25kg HDPE Bags",
    cas: "1310-73-2 (Flakes)",
    img: IMG_CAUSTIC_FLAKES,
  },
  {
    id: 3,
    name: "Soda Ash",
    category: "Industrial Chemicals",
    spec: "Light / Dense Grade | 50kg Bags",
    cas: "497-19-8",
    img: IMG_SODA_ASH,
  },
  {
    id: 4,
    name: "Sodium Sulfate (Glauber's Salt)",
    category: "Industrial Chemicals",
    spec: "High Purity Crystals | 50kg Bags",
    cas: "7727-73-3",
    img: IMG_SODIUM_SULFATE,
  },
  {
    id: 5,
    name: "Hydrogen Peroxide",
    category: "Industrial Chemicals",
    spec: "50% Solution | Carboys / Drums",
    cas: "7722-84-1",
    img: IMG_H2O2,
  },
  {
    id: 6,
    name: "Hydrochloric Acid (HCl)",
    category: "Industrial Chemicals",
    spec: "30–35% | Carboys / Tankers",
    cas: "7647-01-0",
    img: IMG_HCL,
  },
  {
    id: 7,
    name: "Sulfamic Acid",
    category: "Industrial Chemicals",
    spec: "Descaling Grade | 25kg Bags",
    cas: "5329-14-6",
    img: IMG_SULFAMIC,
  },
  {
    id: 8,
    name: "Sulfuric Acid",
    category: "Industrial Chemicals",
    spec: "98% Concentration | Tanker Supply",
    cas: "7664-93-9",
    img: IMG_SULFURIC,
  },

  /* SOLVENTS */

  {
    id: 9,
    name: "Isopropyl Alcohol (IPA)",
    category: "Solvents",
    spec: "99% / 70% | 160kg Drums",
    cas: "67-63-0",
    img: IMG_IPA,
  },
  {
    id: 10,
    name: "Ethanol / Ethyl Alcohol",
    category: "Solvents",
    spec: "Industrial Grade | Bulk / Drums",
    cas: "64-17-5",
    img: IMG_ETHANOL,
  },
  {
    id: 11,
    name: "Toluene",
    category: "Solvents",
    spec: "Industrial Solvent | 200L Drums",
    cas: "108-88-3",
    img: IMG_TOLUENE,
  },
  {
    id: 12,
    name: "Liquid Acetone",
    category: "Solvents",
    spec: "Industrial Grade | 160kg Drums",
    cas: "67-64-1",
    img: IMG_ACETONE,
  },
  {
    id: 13,
    name: "Liquid Butyl / Butyl Acetate",
    category: "Solvents",
    spec: "Industrial Solvent | Bulk Drums",
    cas: "123-86-4",
    img: IMG_BUTYL_ACETATE,
  },
  {
    id: 14,
    name: "Liquid Ethylene Glycol",
    category: "Solvents",
    spec: "Technical Grade | 200L Drums",
    cas: "107-21-1",
    img: IMG_ETHYLENE_GLYCOL,
  },

  /* ETP */

  {
    id: 15,
    name: "PAC Liquid (Poly Aluminum Chloride)",
    category: "ETP Treatment Chemicals",
    spec: "18% Al₂O₃ | Ready to use | 200L Drums",
    cas: "1327-41-9",
    img: IMG_PAC_LIQUID,
  },
  {
    id: 16,
    name: "PAC Powder (Poly Aluminum Chloride)",
    category: "ETP Treatment Chemicals",
    spec: "30% Al₂O₃ | High purity | 25kg Bags",
    cas: "1327-41-9",
    img: IMG_PAC_POWDER,
  },
  {
    id: 17,
    name: "Alum (Aluminum Sulfate)",
    category: "ETP Treatment Chemicals",
    spec: "Water Treatment Grade | 50kg Bags",
    cas: "10043-01-3",
    img: IMG_ALUM,
  },
  {
    id: 18,
    name: "Polymer / Polyelectrolyte",
    category: "ETP Treatment Chemicals",
    spec: "Flocculant | ETP / STP use | Powder / Liquid",
    cas: "ETP-POLY",
    img: IMG_POLYMER,
  },
  {
    id: 19,
    name: "Color Removal Chemical",
    category: "ETP Treatment Chemicals",
    spec: "Decolorizing Agent | Liquid Form | Industrial ETP",
    cas: "ETP-CR",
    img: IMG_COLOR_REMOVAL,
  },
  {
    id: 20,
    name: "Hypochlorite / Liquid Chlorine",
    category: "ETP Treatment Chemicals",
    spec: "Disinfectant | Can / Drum packing",
    cas: "7681-52-9",
    img: IMG_HYPOCHLORITE,
  },

  /* THINNERS & PAINT */

  {
    id: 21,
    name: "Mineral Turpentine Oil (MTO)",
    category: "Thinners & Paint Linings",
    spec: "Loose / Drums / Bottles | Paint dilution base",
    cas: "MTO",
    img: IMG_MTO,
  },
  {
    id: 22,
    name: "Commercial Turpentine Oil",
    category: "Thinners & Paint Linings",
    spec: "Bulk / Packaged | Economy grade",
    cas: "Turpentine",
    img: IMG_TURPENTINE,
  },
  {
    id: 23,
    name: "NC Thinner (Nitrocellulose)",
    category: "Thinners & Paint Linings",
    spec: "Fast Dry | Furniture & Coating use | Loose / Can",
    cas: "NC",
    img: IMG_NC_THINNER,
  },
  {
    id: 24,
    name: "Deco Thinner",
    category: "Thinners & Paint Linings",
    spec: "Decorative Paint Thinning | Premium finish",
    cas: "Thinner-DECO",
    img: IMG_DECO_THINNER,
  },
  {
    id: 25,
    name: "Cleaning Thinner",
    category: "Thinners & Paint Linings",
    spec: "Machine & Line Cleaning | High potency flush",
    cas: "Thinner-CL",
    img: IMG_CLEANING_THINNER,
  },
  {
    id: 26,
    name: "Lacquer Thinner",
    category: "Thinners & Paint Linings",
    spec: "High Gloss Finishing | Furniture / Metal",
    cas: "LAC",
    img: IMG_LACQUER_THINNER,
  },
  {
    id: 27,
    name: "Furniture & Industrial Thinners",
    category: "Thinners & Paint Linings",
    spec: "All-purpose blending | Loose / Drum / Can",
    cas: "Thinner-Gen",
    img: IMG_FURNITURE_THINNER,
  },
  {
    id: 28,
    name: "Oil-Based Paint",
    category: "Thinners & Paint Linings",
    spec: "Industrial & Deco | 1L / 4L / 20L Tins",
    cas: "Paint-Oil",
    img: IMG_OIL_PAINT,
  },
  {
    id: 29,
    name: "Melamine Paint",
    category: "Thinners & Paint Linings",
    spec: "Wood Finish | High durability | 1L / 4L Tins",
    cas: "Melamine",
    img: IMG_MELAMINE,
  },
  {
    id: 30,
    name: "Lacquer Paint & Sealer",
    category: "Thinners & Paint Linings",
    spec: "Premium finish | Structural sealer | Industrial",
    cas: "Lacquer-Sealer",
    img: IMG_LACQUER_PAINT,
  },
  {
    id: 31,
    name: "Deco Paint",
    category: "Thinners & Paint Linings",
    spec: "Decorative Grade | Interior / Exterior finish",
    cas: "Deco-Paint",
    img: IMG_DECO_PAINT,
  },
];

/* ============================================================
   ETP SERVICES
============================================================ */

const ETP_SERVICES = [
  {
    id: "s1",
    title: "Turnkey ETP Plant Setup",
    desc: "Comprehensive engineering, hardware installation, and scaling of custom ETP plant environments configured to your exact output load.",
    asset: "Complete Engineering Execution",
  },
  {
    id: "s2",
    title: "ETP Waste Water Solutions",
    desc: "Chemical adjustment analysis and customized remediation systems targeting complex discharge compliance issues.",
    asset: "Compliance Resolution Analysis",
  },
  {
    id: "s3",
    title: "ETP Management & Expert Providers",
    desc: "Full-scale managed facility operations, regular audits, and dedicated chemical balancing supervision by expert engineers.",
    asset: "Operational Asset Supervision",
  },
];

/* ============================================================
   CATEGORIES
============================================================ */

const CATEGORIES = [
  "All Inventory",
  "Industrial Chemicals",
  "Solvents",
  "ETP Treatment Chemicals",
  "Thinners & Paint Linings",
];

/* ============================================================
   PRODUCTS PAGE
============================================================ */

export default function Products() {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelected] = useState("");
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All Inventory");
  const [catalogView, setView] = useState("materials");

  /* ==========================================================
     FILTER PRODUCTS
  ========================================================== */

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();

    return RAW_PRODUCTS.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(s) ||
        p.cas.toLowerCase().includes(s) ||
        p.spec.toLowerCase().includes(s);

      const matchesCategory =
        activeCat === "All Inventory" || p.category === activeCat;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCat]);

  /* ==========================================================
     ENQUIRY
  ========================================================== */

  const open = (name) => {
    setSelected(name);
    setModal(true);
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
           CATEGORY BUTTONS
        ===================================================== */

        .cat-tab {
          font-family: ${SANS};
          font-size: 14px;
          font-weight: 500;
          padding: 12px 24px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 300ms cubic-bezier(.16,1,.3,1);
          border: 1px solid ${T.line};
          background: ${T.white};
          color: ${T.ink2};
          white-space: nowrap;
        }

        .cat-tab:hover {
          border-color: ${T.accent};
          color: ${T.accent};
        }

        .cat-tab.active {
          background: ${T.ink};
          color: ${T.white};
          border-color: ${T.ink};
        }

        /* =====================================================
           VIEW TABS
        ===================================================== */

        .vtb {
          font-family: ${SANS};
          font-size: 15px;
          font-weight: 600;
          padding: 14px 28px;
          border: none;
          cursor: pointer;
          background: transparent;
          transition: all 300ms ease;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 2px solid transparent;
          color: ${T.muted};
          white-space: nowrap;
        }

        .vtb:hover {
          color: ${T.ink};
        }

        .vtb.active {
          color: ${T.accent};
          border-bottom-color: ${T.accent};
        }

        /* =====================================================
           PRODUCT CARD
        ===================================================== */

        .prod-card {
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition:
            transform 400ms cubic-bezier(.16,1,.3,1),
            box-shadow 400ms ease,
            border-color 400ms ease;
          cursor: pointer;
        }

        .prod-card:hover {
          transform: translateY(-6px);
          border-color: ${T.accent};
          box-shadow: 0 20px 40px rgba(18,15,13,0.08);
        }

        .prod-image-wrap {
          width: 100%;
          height: 230px;
          position: relative;
          overflow: hidden;
          background: #eee8de;
        }

        .prod-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.5s cubic-bezier(.16,1,.3,1);
        }

        .prod-card:hover .prod-image-wrap img {
          transform: scale(1.045);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(18,15,13,0.08),
              transparent 45%,
              rgba(18,15,13,0.15)
            );
          pointer-events: none;
        }

        /* =====================================================
           ENQUIRY BUTTON
        ===================================================== */

        .enq-btn {
          width: 100%;
          background: ${T.ivory2};
          color: ${T.ink};
          border: 1px solid ${T.line};
          padding: 14px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 200ms ease;
          margin-top: auto;
          font-family: ${SANS};
        }

        .enq-btn:hover {
          background: ${T.accent};
          color: ${T.white};
          border-color: ${T.accent};
        }

        /* =====================================================
           TOP CUSTOM CHEMICAL MESSAGE
        ===================================================== */

        .hero-custom-box {
          margin-top: 24px;
          padding: 18px 20px;
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 14px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .hero-custom-icon {
          width: 40px;
          height: 40px;
          min-width: 40px;
          border-radius: 10px;
          background: ${T.ivory2};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${T.accent};
        }

        .hero-custom-title {
          font-size: 13.5px;
          font-weight: 700;
          color: ${T.ink};
          margin-bottom: 4px;
        }

        .hero-custom-text {
          font-size: 13px;
          line-height: 1.55;
          color: ${T.muted};
        }

        .hero-custom-button {
          margin-top: 14px;
          padding: 13px 18px;
          border-radius: 11px;
          border: 1px solid ${T.ink};
          background: ${T.ink};
          color: ${T.white};
          font-family: ${SANS};
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: all 200ms ease;
        }

        .hero-custom-button:hover {
          background: ${T.accent};
          border-color: ${T.accent};
          transform: translateY(-2px);
        }

        /* =====================================================
           OTHER CHEMICALS CTA
        ===================================================== */

        .other-chemicals-section {
          margin-top: 64px;
          background: ${T.ink};
          border-radius: 24px;
          padding: 52px 56px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .other-chemicals-section::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: rgba(197,131,67,0.12);
          right: -130px;
          top: -190px;
          pointer-events: none;
        }

        .other-chemicals-section::after {
          content: "";
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.07);
          right: 110px;
          bottom: -170px;
          pointer-events: none;
        }

        .other-chemicals-content {
          position: relative;
          z-index: 2;
          max-width: 760px;
        }

        .other-chemicals-label {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: ${MONO};
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${T.accent};
          margin-bottom: 14px;
        }

        .other-chemicals-label span {
          width: 22px;
          height: 1px;
          background: ${T.accent};
        }

        .other-chemicals-title {
          font-family: ${SERIF};
          font-size: clamp(30px, 4vw, 44px);
          line-height: 1.1;
          font-weight: 500;
          color: ${T.white};
          margin: 0 0 14px;
          letter-spacing: -0.02em;
        }

        .other-chemicals-title em {
          color: ${T.accent};
          font-style: italic;
        }

        .other-chemicals-text {
          color: rgba(255,255,255,0.68);
          font-size: 15px;
          line-height: 1.7;
          margin: 0;
          max-width: 720px;
        }

        .other-chemicals-button {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          border: 1px solid ${T.accent};
          background: ${T.accent};
          color: ${T.white};
          padding: 15px 22px;
          border-radius: 12px;
          font-family: ${SANS};
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 220ms ease;
          white-space: nowrap;
        }

        .other-chemicals-button:hover {
          background: ${T.white};
          color: ${T.ink};
          border-color: ${T.white};
          transform: translateY(-2px);
        }

        /* =====================================================
           SEARCH
        ===================================================== */

        .search-input::placeholder {
          color: ${T.muted};
        }

        /* =====================================================
           CATEGORY SCROLL
        ===================================================== */

        .category-scroll {
          scrollbar-width: thin;
        }

        .category-scroll::-webkit-scrollbar {
          height: 4px;
        }

        .category-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .category-scroll::-webkit-scrollbar-thumb {
          background: rgba(18,15,13,.12);
          border-radius: 99px;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          .distribution-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          .hero-image {
            height: 330px !important;
          }

          .other-chemicals-section {
            flex-direction: column;
            align-items: flex-start;
            padding: 42px 38px;
          }

          .other-chemicals-button {
            width: 100%;
          }
        }

        @media (max-width: 650px) {
          .vtb {
            padding: 13px 14px;
            font-size: 13px;
          }

          .prod-image-wrap {
            height: 220px;
          }

          .products-grid {
            grid-template-columns: 1fr !important;
          }

          .hero-custom-box {
            padding: 16px;
          }

          .hero-custom-icon {
            width: 36px;
            height: 36px;
            min-width: 36px;
          }

          .hero-custom-text {
            font-size: 12.5px;
          }

          .hero-custom-button {
            width: 100%;
            justify-content: center;
          }

          .other-chemicals-section {
            margin-top: 46px;
            padding: 34px 24px;
            border-radius: 20px;
          }

          .other-chemicals-title {
            font-size: 32px;
          }

          .other-chemicals-text {
            font-size: 14px;
          }
        }

      `}</style>

      {/* ======================================================
          NAVBAR
      ====================================================== */}

      <Navbar
        onGetQuote={() => open("General Supply Requirement")}
      />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        style={{
          padding: "180px 0 80px",
          background: `linear-gradient(
            180deg,
            rgba(243,236,224,0.6) 0%,
            transparent 100%
          ), ${T.ivory}`,
          borderBottom: `1px solid ${T.line}`,
        }}
      >
        <div
          style={{
            maxWidth: W,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
              alignItems: "center",
            }}
          >
            {/* ==================================================
                HERO LEFT
            ================================================== */}

            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 1,
                    background: T.accent,
                  }}
                />

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
                  Enterprise Material Portfolio
                </span>
              </div>

              <h1
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(36px,4.5vw,56px)",
                  fontWeight: 500,
                  lineHeight: 1.15,
                  color: T.ink,
                  letterSpacing: "-0.02em",
                  marginBottom: 20,
                }}
              >
                Industrial raw materials and
                <br />

                <span
                  style={{
                    fontStyle: "italic",
                    color: T.accent,
                  }}
                >
                  custom packing solutions
                </span>
                .
              </h1>

              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: "1.7",
                  color: T.muted,
                  margin: 0,
                }}
              >
                From industrial chemicals and solvents to ETP treatment
                compounds and premium paints — delivered certified and
                on time, tailored to your exact requirements.
              </p>

              {/* ==================================================
                  IMPORTANT NEW MESSAGE
              ================================================== */}

              <div className="hero-custom-box">
                <div className="hero-custom-icon">
                  <Boxes size={19} />
                </div>

                <div>
                  <div className="hero-custom-title">
                    Looking for something not listed?
                  </div>

                  <div className="hero-custom-text">
                    This catalogue highlights our key products, but our
                    supply range extends beyond the materials shown here.
                    Tell us what chemical or raw material you need and
                    we’ll check availability and sourcing options.
                  </div>
                </div>
              </div>

              <button
                className="hero-custom-button"
                onClick={() =>
                  open("Custom / Other Chemical Requirement")
                }
              >
                Ask About Other Chemicals
                <ArrowUpRight size={14} />
              </button>
            </div>

            {/* ==================================================
                HERO IMAGE
            ================================================== */}

            <div
              className="hero-image"
              style={{
                position: "relative",
                width: "100%",
                height: "400px",
                borderRadius: "24px",
                overflow: "hidden",
                border: `1px solid ${T.line}`,
                boxShadow: "0 30px 60px rgba(18,15,13,0.04)",
                background: T.ivory2,
              }}
            >
              <ProductImage
                src={IMG_IPA}
                alt="Industrial chemical drum"
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top,rgba(18,15,13,0.45) 0%,transparent 55%)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: 26,
                  bottom: 24,
                  color: T.white,
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    marginBottom: 5,
                    opacity: 0.8,
                  }}
                >
                  INDUSTRIAL MATERIALS
                </div>

                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 30,
                    fontWeight: 600,
                  }}
                >
                  Certified Materials
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          STICKY CATALOG NAV
      ====================================================== */}

      <section
        style={{
          background: T.white,
          borderBottom: `1px solid ${T.line}`,
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: W,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: `1px solid rgba(18,15,13,0.05)`,
              overflowX: "auto",
            }}
          >
            <button
              className={`vtb ${
                catalogView === "materials" ? "active" : ""
              }`}
              onClick={() => {
                setView("materials");
                setActiveCat("All Inventory");
              }}
            >
              <Droplet size={16} />
              Chemicals & Compounds
            </button>

            <button
              className={`vtb ${
                catalogView === "etp-services" ? "active" : ""
              }`}
              onClick={() => setView("etp-services")}
            >
              <Wrench size={16} />
              ETP Plant & Engineering Services
            </button>
          </div>

          {catalogView === "materials" && (
            <div
              style={{
                padding: "24px 0",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* SEARCH */}

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "600px",
                }}
              >
                <Search
                  size={18}
                  style={{
                    position: "absolute",
                    left: "18px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: T.muted,
                  }}
                />

                <input
                  className="search-input"
                  type="text"
                  placeholder="Search by chemical name (e.g. IPA, PAC, MTO)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "16px 24px 16px 48px",
                    borderRadius: "12px",
                    border: `1px solid ${T.line}`,
                    background: T.ivory,
                    fontFamily: SANS,
                    fontSize: "14.5px",
                    color: T.ink,
                    outline: "none",
                  }}
                />
              </div>

              {/* CATEGORIES */}

              <div
                className="category-scroll"
                style={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "auto",
                  paddingBottom: "4px",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`cat-tab ${
                      activeCat === cat ? "active" : ""
                    }`}
                    onClick={() => setActiveCat(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          PRODUCT GRID
      ====================================================== */}

      <section
        style={{
          padding: "80px 0",
          background: T.ivory,
          minHeight: "500px",
        }}
      >
        <div
          style={{
            maxWidth: W,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          {catalogView === "materials" ? (
            <>
              {filtered.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "80px 0",
                    border: `1px dashed ${T.line}`,
                    borderRadius: "20px",
                    background: T.white,
                  }}
                >
                  <Boxes
                    size={40}
                    style={{
                      color: T.muted,
                      marginBottom: "12px",
                    }}
                  />

                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontSize: "22px",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    No materials match your query
                  </h3>

                  <p
                    style={{
                      color: T.muted,
                      fontSize: "14px",
                      marginTop: "8px",
                    }}
                  >
                    Can't find what you're looking for? Send us your
                    requirement and we'll check availability.
                  </p>

                  <button
                    className="other-chemicals-button"
                    style={{
                      marginTop: "24px",
                    }}
                    onClick={() =>
                      open("Custom / Other Chemical Requirement")
                    }
                  >
                    Ask About Another Chemical
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              ) : (
                <div
                  className="products-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(290px, 1fr))",
                    gap: "28px",
                  }}
                >
                  {filtered.map((p) => (
                    <div
                      key={p.id}
                      className="prod-card"
                      onClick={() => navigate(`/products/${p.id}`)}
                    >
                      {/* PRODUCT IMAGE */}

                      <div className="prod-image-wrap">
                        <ProductImage
                          src={p.img}
                          alt={`${p.name} industrial product`}
                        />

                        <div className="image-overlay" />

                        <span
                          style={{
                            position: "absolute",
                            left: "14px",
                            top: "14px",
                            background: T.ink,
                            color: T.white,
                            fontFamily: MONO,
                            fontSize: "10px",
                            padding: "5px 9px",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {p.category}
                        </span>
                      </div>

                      {/* PRODUCT INFO */}

                      <div
                        style={{
                          padding: "24px",
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span
                          style={{
                            fontFamily: MONO,
                            fontSize: "11px",
                            color: T.accent,
                            fontWeight: 500,
                            marginBottom: "4px",
                          }}
                        >
                          {p.cas}
                        </span>

                        <h3
                          style={{
                            fontFamily: SERIF,
                            fontSize: "22px",
                            fontWeight: 600,
                            color: T.ink,
                            marginBottom: "10px",
                            cursor: "pointer",
                            lineHeight: "1.2",
                          }}
                          onClick={() =>
                            navigate(`/products/${p.id}`)
                          }
                        >
                          {p.name}
                        </h3>

                        <p
                          style={{
                            fontSize: "13.5px",
                            color: T.muted,
                            lineHeight: "1.55",
                            marginBottom: "20px",
                          }}
                        >
                          {p.spec}
                        </p>

                        <button
                          className="enq-btn"
                          onClick={() => open(p.name)}
                        >
                          Submit Requirements
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ==================================================
                  LARGE CUSTOM SOURCING CTA
              ================================================== */}

              <div className="other-chemicals-section">
                <div className="other-chemicals-content">
                  <div className="other-chemicals-label">
                    <span />
                    Looking for something else?
                  </div>

                  <h2 className="other-chemicals-title">
                    Don't see your chemical <em>listed?</em>
                  </h2>

                  <p className="other-chemicals-text">
                    Our listed products represent only part of our
                    supply capabilities. We also source and supply
                    other industrial chemicals, solvents, raw materials
                    and specialty requirements based on availability.
                    Tell us what you need — product name, specification,
                    quantity or application — and our team will check
                    the requirement for you.
                  </p>
                </div>

                <button
                  className="other-chemicals-button"
                  onClick={() =>
                    open("Custom / Other Chemical Requirement")
                  }
                >
                  <MessageSquareText size={17} />
                  Send Your Requirement
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </>
          ) : (
            /* ==================================================
               ETP SERVICES
            ================================================== */

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(360px,1fr))",
                gap: "32px",
              }}
            >
              {ETP_SERVICES.map((s) => (
                <div
                  key={s.id}
                  style={{
                    background: T.white,
                    border: `1px solid ${T.line}`,
                    borderRadius: "20px",
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: "11px",
                        color: T.accent,
                        display: "block",
                        marginBottom: "12px",
                        fontWeight: 500,
                        textTransform: "uppercase",
                      }}
                    >
                      {s.asset}
                    </span>

                    <h3
                      style={{
                        fontFamily: SERIF,
                        fontSize: "28px",
                        fontWeight: 500,
                        marginBottom: "16px",
                        color: T.ink,
                      }}
                    >
                      {s.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "14.5px",
                        color: T.muted,
                        lineHeight: "1.6",
                        marginBottom: "32px",
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>

                  <button
                    className="enq-btn"
                    style={{
                      background: T.ink,
                      color: T.white,
                    }}
                    onClick={() => open(s.title)}
                  >
                    Connect with Technical Consultant
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          DISTRIBUTION SECTION
      ====================================================== */}

      <section
        style={{
          padding: "100px 0",
          background: T.ivory2,
          borderTop: `1px solid ${T.line}`,
        }}
      >
        <div
          style={{
            maxWidth: W,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <div
            className="distribution-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 1,
                    background: T.accent,
                  }}
                />

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
                  Flexible Fulfillment
                </span>
              </div>

              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: "38px",
                  fontWeight: 500,
                  lineHeight: 1.15,
                  marginBottom: "20px",
                  color: T.ink,
                }}
              >
                Logistics matching your production scale.
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  color: T.ink2,
                  lineHeight: "1.7",
                  marginBottom: "28px",
                }}
              >
                Bulk tankers, precision cans, bottles, or HDPE bags —
                we pack and dispatch exactly to your specification. All
                shipments come with GST invoice and batch documentation.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {[
                  "Loose tanker, drums, cans, bottles — all packing available.",
                  "All materials shipped with GST invoice & legal documentation.",
                ].map((text) => (
                  <div
                    key={text}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      style={{
                        color: T.accent,
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    />

                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gap: "20px",
              }}
            >
              {/* CUSTOM SOURCING */}

              <div
                style={{
                  background: T.white,
                  padding: "32px",
                  borderRadius: "16px",
                  border: `1px solid ${T.line}`,
                }}
              >
                <PackageCheck
                  size={26}
                  style={{
                    color: T.accent,
                    marginBottom: "14px",
                  }}
                />

                <h4
                  style={{
                    fontFamily: SERIF,
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  Custom Chemical Sourcing
                </h4>

                <p
                  style={{
                    fontSize: "13.5px",
                    color: T.muted,
                    lineHeight: "1.5",
                    marginBottom: "18px",
                  }}
                >
                  Don't see your specific requirement? Send us the
                  product name and specification — we source and supply
                  based on your requirement.
                </p>

                <button
                  className="enq-btn"
                  onClick={() =>
                    open("Custom / Other Chemical Requirement")
                  }
                >
                  Ask About a Chemical
                  <ArrowUpRight size={14} />
                </button>
              </div>

              {/* ETP COMPLIANCE */}

              <div
                style={{
                  background: T.white,
                  padding: "32px",
                  borderRadius: "16px",
                  border: `1px solid ${T.line}`,
                }}
              >
                <ShieldCheck
                  size={26}
                  style={{
                    color: T.accent,
                    marginBottom: "14px",
                  }}
                />

                <h4
                  style={{
                    fontFamily: SERIF,
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  ETP Compliance Assurance
                </h4>

                <p
                  style={{
                    fontSize: "13.5px",
                    color: T.muted,
                    lineHeight: "1.5",
                  }}
                >
                  Our ETP chemicals and experts ensure full regulatory
                  compliance with state pollution control boards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />

      <WhatsAppButton />

      {/* ======================================================
          ENQUIRY MODAL
      ====================================================== */}

      <EnquiryModal
        isOpen={modal}
        onClose={() => setModal(false)}
        prefillProduct={selectedProduct}
      />
    </div>
  );
}