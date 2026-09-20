import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowUpRight,
  Boxes,
  Droplet,
  FlaskConical,
  PackageCheck,
  ShieldCheck,
  Truck,
  FileCheck2,
  SlidersHorizontal,
  X,
  CheckCircle2,
  MessageSquareText,
  ChevronDown,
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
  soft: "rgba(197,131,67,0.10)",
  green: "#496652",
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace"`;
const W = "1320px";

/* ============================================================
   FALLBACK
============================================================ */

const FALLBACK_IMAGE =
  "https://hoachathaiphong.vn/images/attachment/6712isopropyl-alcohol-ipa-han-quoc.jpg";

/* ============================================================
   IMAGE LIBRARY
============================================================ */

const IMG = {
  causticLye:
    "https://www.dynachem.in/wp-content/uploads/2023/02/caustic-soda-lye.jpg",

  causticFlakes:
    "https://www.alvikachemicals.com/wp-content/uploads/2023/09/Sodium-Hydroxide-Caustic-Flakes.jpg",

  sodaAsh:
    "https://jodiabaazar.com/cdn/shop/products/ICI-SodaAsh-Light.png?v=1771232450&width=1445",

  sodiumSulfate:
    "https://5.imimg.com/data5/SELLER/Default/2023/7/326339604/LP/AX/KK/17579917/sodium-sulphate-50-kg-bag-1000x1000.jpg",

  peroxide:
    "https://cdn.prod.website-files.com/5fc264e52c5b618261de20fd/6646c6a08d811bc68bbc1d0f_HP50FG200L-HydrogenPeroxide50.jpg",

  hcl:
    "https://www.wintersunchemical.com/cdn/shop/files/08-022-03.jpg?v=1735941968",

  sulfamic:
    "https://cpimg.tistatic.com/09921401/b/4/Sulfamic-Acid-Powder..jpg",

  sulfuric:
    "https://cavinresource.com/wp-content/uploads/2025/04/Buy-Bulk-Sulphuric-Acid-Cavin-Resource-Malaysia.jpg",

  ipa:
    "https://hoachathaiphong.vn/images/attachment/6712isopropyl-alcohol-ipa-han-quoc.jpg",

  ethanol:
    "https://greenfield.com/wp-content/uploads/2021/09/111000200DM55M_1.jpg",

  toluene:
    "https://orvagclf.com/cdn/shop/products/6497bb3b8164702ef41227f616c353b8.png?v=1695789285",

  acetone:
    "https://prodepot.com.au/wp-content/uploads/2025/01/Aceton160kg-edited2.jpg",

  butylAcetate:
    "https://www.chemieshop24.ch/media/2a/1f/15/1635936642/Butylacetat_1000451510000.jpg?ts=1695196134",

  glycol:
    "https://cpimg.tistatic.com/10587563/b/4/200-Kg-Ethylene-Glycol..jpg",

  pacLiquid:
    "https://dynakeylab.com/wp-content/uploads/2022/01/pac-liquid-1.png",

  pacPowder:
    "https://5.imimg.com/data5/SELLER/Default/2023/5/305977093/IE/YV/DO/18897342/poly-aluminium-chloride-powder-1000x1000.jpg",

  alum:
    "https://cdn11.bigcommerce.com/s-9aklphzoxx/images/stencil/1280w/products/157/563/AluminumSulfate_Bag__59621.1755900144.jpg?c=1",

  polymer:
    "https://cpimg.tistatic.com/09457435/b/4/Polyelectrolyte-Flocculant-Chemical.jpg",

  colorRemoval:
    "https://5.imimg.com/data5/SELLER/Default/2023/1/NG/CP/OU/11567716/color-removal-agent-1000x1000.jpg",

  hypochlorite:
    "https://masterchem.fi/wp-content/uploads/2020/08/Sodium-hypochlorite-200l-MaterChem.jpg",

  mto:
    "https://static.wixstatic.com/media/531925_1a78534478784bc48a32691f0e682ee6~mv2.png/v1/fill/w_1024%2Ch_1024%2Cal_c%2Cq_90%2Cenc_avif%2Cquality_auto/531925_1a78534478784bc48a32691f0e682ee6~mv2.png",

  turpentine:
    "https://www.mitre10.co.nz/medias/sys_master/productimages/h21/hee/8834266562590/Mitre10-1500x1500_362146xlg/Mitre10-1500x1500-362146xlg.jpg",

  ncThinner:
    "https://5.imimg.com/data5/SELLER/Default/2025/8/535772053/PV/CM/AD/3510605/thinner-nc-1000x1000.png",

  thinner:
    "https://www.ironlinkdistributors.com.au/cdn/shop/files/gp_thinner_20L.png?v=1771665577&width=900",

  lacquer:
    "https://jaeautoelectrical.com.au/cdn/shop/files/kQ-TRsGxHO-YzpyT-mp_IQ_453x453.jpg?v=1722765144",

  oilPaint:
    "https://5.imimg.com/data5/SELLER/Default/2023/6/313692784/EA/QO/YS/13041960/oil-based-paint-1000x1000.jpg",

  melamine:
    "https://cpimg.tistatic.com/5820533/b/4/melamine-woodkeeper.jpg",
};

/* ============================================================
   IMAGE COMPONENT
============================================================ */

function ProductImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

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
   COMPLETE PRODUCT CATALOG
============================================================ */

const PRODUCTS = [
  /* ==========================================================
     INDUSTRIAL CHEMICALS
  ========================================================== */

  {
    id: 1,
    name: "Caustic Lye",
    category: "Industrial Chemicals",
    family: "Alkalis",
    cas: "1310-73-2",
    grade: "47–50% Aqueous Solution",
    packaging: "Tankers / IBC / Drums",
    spec: "NaOH Liquid",
    application: "Neutralization, pH adjustment, process chemistry",
    img: IMG.causticLye,
  },
  {
    id: 2,
    name: "Caustic Soda Flakes",
    category: "Industrial Chemicals",
    family: "Alkalis",
    cas: "1310-73-2",
    grade: "≥99% Industrial Grade",
    packaging: "25 kg Bags / Jumbo Bags",
    spec: "NaOH Flakes",
    application: "Chemical processing, cleaning, textile, manufacturing",
    img: IMG.causticFlakes,
  },
  {
    id: 3,
    name: "Soda Ash",
    category: "Industrial Chemicals",
    family: "Inorganic Chemicals",
    cas: "497-19-8",
    grade: "Light / Dense Grade",
    packaging: "50 kg Bags / Jumbo Bags",
    spec: "Sodium Carbonate",
    application: "Glass, detergents, water treatment, chemical processing",
    img: IMG.sodaAsh,
  },
  {
    id: 4,
    name: "Sodium Sulfate",
    category: "Industrial Chemicals",
    family: "Inorganic Chemicals",
    cas: "7727-73-3",
    grade: "Industrial / High Purity",
    packaging: "50 kg Bags / Jumbo Bags",
    spec: "Crystalline Sodium Sulfate",
    application: "Detergents, textile, pulp and paper",
    img: IMG.sodiumSulfate,
  },
  {
    id: 5,
    name: "Hydrogen Peroxide",
    category: "Industrial Chemicals",
    family: "Oxidizers",
    cas: "7722-84-1",
    grade: "Technical Grade",
    packaging: "Carboys / Drums / IBC",
    spec: "Peroxide Solution",
    application: "Oxidation, bleaching, water treatment",
    img: IMG.peroxide,
  },
  {
    id: 6,
    name: "Hydrochloric Acid",
    category: "Industrial Chemicals",
    family: "Acids",
    cas: "7647-01-0",
    grade: "30–35%",
    packaging: "Carboys / Drums / Tankers",
    spec: "HCl",
    application: "pH correction, metal treatment, process cleaning",
    img: IMG.hcl,
  },
  {
    id: 7,
    name: "Sulfamic Acid",
    category: "Industrial Chemicals",
    family: "Acids",
    cas: "5329-14-6",
    grade: "Industrial Descaling Grade",
    packaging: "25 kg Bags",
    spec: "Sulfamic Acid Powder",
    application: "Descaling, industrial cleaning",
    img: IMG.sulfamic,
  },
  {
    id: 8,
    name: "Sulfuric Acid",
    category: "Industrial Chemicals",
    family: "Acids",
    cas: "7664-93-9",
    grade: "98%",
    packaging: "Tankers / Compatible Bulk Containers",
    spec: "H₂SO₄",
    application: "Chemical manufacturing, pH adjustment, processing",
    img: IMG.sulfuric,
  },
  {
    id: 32,
    name: "Phosphoric Acid",
    category: "Industrial Chemicals",
    family: "Acids",
    cas: "7664-38-2",
    grade: "Technical Grade",
    packaging: "Drums / IBC / Bulk",
    spec: "H₃PO₄",
    application: "Fertilizers, phosphating, food and industrial processing",
    img: IMG.sulfuric,
  },
  {
    id: 33,
    name: "Nitric Acid",
    category: "Industrial Chemicals",
    family: "Acids",
    cas: "7697-37-2",
    grade: "Technical Grade",
    packaging: "Compatible Drums / Bulk",
    spec: "HNO₃",
    application: "Metal treatment, chemical manufacturing",
    img: IMG.hcl,
  },
  {
    id: 34,
    name: "Acetic Acid",
    category: "Industrial Chemicals",
    family: "Organic Acids",
    cas: "64-19-7",
    grade: "Industrial Grade",
    packaging: "Drums / IBC / Bulk",
    spec: "CH₃COOH",
    application: "Chemical processing, textiles, manufacturing",
    img: IMG.peroxide,
  },
  {
    id: 35,
    name: "Sodium Bicarbonate",
    category: "Industrial Chemicals",
    family: "Inorganic Chemicals",
    cas: "144-55-8",
    grade: "Industrial Grade",
    packaging: "25 / 50 kg Bags",
    spec: "NaHCO₃",
    application: "Neutralization, process chemistry, cleaning",
    img: IMG.sodaAsh,
  },
  {
    id: 36,
    name: "Potassium Hydroxide",
    category: "Industrial Chemicals",
    family: "Alkalis",
    cas: "1310-58-3",
    grade: "Flakes / Solution",
    packaging: "Bags / Drums / IBC",
    spec: "KOH",
    application: "Chemical manufacturing, soaps, process chemistry",
    img: IMG.causticFlakes,
  },

  /* ==========================================================
     SOLVENTS
  ========================================================== */

  {
    id: 9,
    name: "Isopropyl Alcohol",
    category: "Solvents",
    family: "Alcohols",
    cas: "67-63-0",
    grade: "99% / 70%",
    packaging: "160 kg Drums / IBC / Bulk",
    spec: "IPA",
    application: "Cleaning, coatings, pharma, electronics",
    img: IMG.ipa,
  },
  {
    id: 10,
    name: "Ethanol / Ethyl Alcohol",
    category: "Solvents",
    family: "Alcohols",
    cas: "64-17-5",
    grade: "Industrial Grade",
    packaging: "Drums / IBC / Bulk",
    spec: "Ethyl Alcohol",
    application: "Solvent, cleaning, formulation",
    img: IMG.ethanol,
  },
  {
    id: 11,
    name: "Toluene",
    category: "Solvents",
    family: "Aromatic Solvents",
    cas: "108-88-3",
    grade: "Industrial Solvent Grade",
    packaging: "200 L Drums / Bulk",
    spec: "Toluene",
    application: "Coatings, adhesives, chemical processing",
    img: IMG.toluene,
  },
  {
    id: 12,
    name: "Acetone",
    category: "Solvents",
    family: "Ketones",
    cas: "67-64-1",
    grade: "Industrial Grade",
    packaging: "160 kg Drums / IBC / Bulk",
    spec: "Acetone",
    application: "Cleaning, coatings, resins, manufacturing",
    img: IMG.acetone,
  },
  {
    id: 13,
    name: "Butyl Acetate",
    category: "Solvents",
    family: "Esters",
    cas: "123-86-4",
    grade: "Industrial Solvent Grade",
    packaging: "Drums / IBC / Bulk",
    spec: "n-Butyl Acetate",
    application: "Paints, coatings, inks and adhesives",
    img: IMG.butylAcetate,
  },
  {
    id: 14,
    name: "Ethylene Glycol",
    category: "Solvents",
    family: "Glycols",
    cas: "107-21-1",
    grade: "Technical Grade",
    packaging: "200 L Drums / IBC",
    spec: "MEG",
    application: "Heat transfer, resins, industrial formulations",
    img: IMG.glycol,
  },
  {
    id: 37,
    name: "Methanol",
    category: "Solvents",
    family: "Alcohols",
    cas: "67-56-1",
    grade: "Industrial Grade",
    packaging: "Drums / IBC / Bulk",
    spec: "Methyl Alcohol",
    application: "Solvent, chemical manufacturing, process applications",
    img: IMG.ethanol,
  },
  {
    id: 38,
    name: "Xylene",
    category: "Solvents",
    family: "Aromatic Solvents",
    cas: "1330-20-7",
    grade: "Mixed Xylene",
    packaging: "Drums / Bulk",
    spec: "Xylene",
    application: "Coatings, paints, adhesives and chemical processing",
    img: IMG.toluene,
  },
  {
    id: 39,
    name: "Methyl Ethyl Ketone",
    category: "Solvents",
    family: "Ketones",
    cas: "78-93-3",
    grade: "Industrial Grade",
    packaging: "Drums / IBC",
    spec: "MEK",
    application: "Coatings, adhesives, inks and industrial cleaning",
    img: IMG.acetone,
  },
  {
    id: 40,
    name: "Methyl Isobutyl Ketone",
    category: "Solvents",
    family: "Ketones",
    cas: "108-10-1",
    grade: "Industrial Grade",
    packaging: "Drums / IBC",
    spec: "MIBK",
    application: "Coatings, extraction, rubber and chemical processing",
    img: IMG.acetone,
  },

  /* ==========================================================
     ETP TREATMENT CHEMICALS
  ========================================================== */

  {
    id: 15,
    name: "PAC Liquid",
    category: "ETP Treatment Chemicals",
    family: "Coagulants",
    cas: "1327-41-9",
    grade: "Water Treatment Grade",
    packaging: "Drums / IBC / Bulk",
    spec: "Poly Aluminium Chloride",
    application: "Coagulation, clarification, ETP treatment",
    img: IMG.pacLiquid,
  },
  {
    id: 16,
    name: "PAC Powder",
    category: "ETP Treatment Chemicals",
    family: "Coagulants",
    cas: "1327-41-9",
    grade: "High Basicity / Industrial Grade",
    packaging: "25 kg Bags",
    spec: "Poly Aluminium Chloride Powder",
    application: "ETP, water treatment, clarification",
    img: IMG.pacPowder,
  },
  {
    id: 17,
    name: "Alum",
    category: "ETP Treatment Chemicals",
    family: "Coagulants",
    cas: "10043-01-3",
    grade: "Water Treatment Grade",
    packaging: "25 / 50 kg Bags",
    spec: "Aluminium Sulfate",
    application: "Coagulation and suspended solids removal",
    img: IMG.alum,
  },
  {
    id: 18,
    name: "Polyelectrolyte",
    category: "ETP Treatment Chemicals",
    family: "Flocculants",
    cas: "ETP-POLY",
    grade: "Cationic / Anionic / Non-Ionic",
    packaging: "25 kg Bags / Liquid Drums",
    spec: "Flocculant",
    application: "Flocculation, sludge dewatering, clarification",
    img: IMG.polymer,
  },
  {
    id: 19,
    name: "Colour Removal Agent",
    category: "ETP Treatment Chemicals",
    family: "Specialty Treatment",
    cas: "ETP-CR",
    grade: "Industrial ETP Grade",
    packaging: "Drums / IBC",
    spec: "Decolorizing Agent",
    application: "Colour reduction and wastewater treatment",
    img: IMG.colorRemoval,
  },
  {
    id: 20,
    name: "Sodium Hypochlorite",
    category: "ETP Treatment Chemicals",
    family: "Disinfection",
    cas: "7681-52-9",
    grade: "Industrial Grade",
    packaging: "Drums / IBC",
    spec: "NaOCl",
    application: "Disinfection and oxidation",
    img: IMG.hypochlorite,
  },
  {
    id: 41,
    name: "Ferric Chloride",
    category: "ETP Treatment Chemicals",
    family: "Coagulants",
    cas: "7705-08-0",
    grade: "Water Treatment Grade",
    packaging: "Drums / IBC / Bulk",
    spec: "FeCl₃",
    application: "Coagulation, phosphorus removal and clarification",
    img: IMG.pacLiquid,
  },
  {
    id: 42,
    name: "Ferrous Sulfate",
    category: "ETP Treatment Chemicals",
    family: "Treatment Chemicals",
    cas: "7720-78-7",
    grade: "Industrial Water Treatment Grade",
    packaging: "25 / 50 kg Bags",
    spec: "FeSO₄",
    application: "Coagulation, precipitation and process treatment",
    img: IMG.alum,
  },
  {
    id: 43,
    name: "Antiscalant",
    category: "ETP Treatment Chemicals",
    family: "Membrane Chemicals",
    cas: "RO-ANTISCALANT",
    grade: "RO / Membrane Grade",
    packaging: "25 / 50 kg Drums",
    spec: "Membrane Scale Inhibitor",
    application: "RO protection and scale control",
    img: IMG.polymer,
  },
  {
    id: 44,
    name: "Defoamer",
    category: "ETP Treatment Chemicals",
    family: "Process Chemicals",
    cas: "ETP-DEFOAMER",
    grade: "Industrial Grade",
    packaging: "Drums / IBC",
    spec: "Foam Control",
    application: "Foam suppression in process and wastewater systems",
    img: IMG.colorRemoval,
  },
  {
    id: 45,
    name: "Activated Carbon",
    category: "ETP Treatment Chemicals",
    family: "Adsorbents",
    cas: "7440-44-0",
    grade: "Water Treatment Grade",
    packaging: "25 kg Bags",
    spec: "Granular / Powdered Activated Carbon",
    application: "Colour, odour and organic removal",
    img: IMG.polymer,
  },

  /* ==========================================================
     THINNERS & PAINT
  ========================================================== */

  {
    id: 21,
    name: "Mineral Turpentine Oil",
    category: "Thinners & Paint Linings",
    family: "Thinners",
    cas: "MTO",
    grade: "Industrial Grade",
    packaging: "Loose / Drums / Bottles",
    spec: "MTO",
    application: "Paint dilution, coatings and cleaning",
    img: IMG.mto,
  },
  {
    id: 22,
    name: "Commercial Turpentine Oil",
    category: "Thinners & Paint Linings",
    family: "Thinners",
    cas: "TURPENTINE",
    grade: "Commercial Grade",
    packaging: "Drums / Bottles",
    spec: "Turpentine",
    application: "Paint and coating applications",
    img: IMG.turpentine,
  },
  {
    id: 23,
    name: "NC Thinner",
    category: "Thinners & Paint Linings",
    family: "Thinners",
    cas: "NC",
    grade: "Fast Dry Industrial Grade",
    packaging: "Loose / Cans / Drums",
    spec: "Nitrocellulose Thinner",
    application: "Furniture, coatings and fast-drying finishes",
    img: IMG.ncThinner,
  },
  {
    id: 24,
    name: "Decorative Paint Thinner",
    category: "Thinners & Paint Linings",
    family: "Thinners",
    cas: "THINNER-DECO",
    grade: "Decorative Coating Grade",
    packaging: "Cans / Drums",
    spec: "Decorative Paint Thinner",
    application: "Decorative and architectural coatings",
    img: IMG.thinner,
  },
  {
    id: 25,
    name: "Cleaning Thinner",
    category: "Thinners & Paint Linings",
    family: "Cleaning",
    cas: "THINNER-CL",
    grade: "Industrial Cleaning Grade",
    packaging: "Drums / Cans",
    spec: "Cleaning Solvent Blend",
    application: "Equipment, machine and line cleaning",
    img: IMG.thinner,
  },
  {
    id: 26,
    name: "Lacquer Thinner",
    category: "Thinners & Paint Linings",
    family: "Thinners",
    cas: "LAC",
    grade: "Industrial Finishing Grade",
    packaging: "Cans / Drums",
    spec: "Lacquer Solvent Blend",
    application: "Furniture, metal and high-gloss finishing",
    img: IMG.lacquer,
  },
  {
    id: 27,
    name: "Furniture & Industrial Thinner",
    category: "Thinners & Paint Linings",
    family: "Thinners",
    cas: "THINNER-GEN",
    grade: "General Industrial Grade",
    packaging: "Loose / Cans / Drums",
    spec: "General Purpose Thinner",
    application: "Furniture, coatings and industrial finishing",
    img: IMG.thinner,
  },
  {
    id: 28,
    name: "Oil-Based Paint",
    category: "Thinners & Paint Linings",
    family: "Paints",
    cas: "PAINT-OIL",
    grade: "Industrial / Decorative",
    packaging: "1 L / 4 L / 20 L",
    spec: "Oil-Based Coating",
    application: "Industrial and decorative surfaces",
    img: IMG.oilPaint,
  },
  {
    id: 29,
    name: "Melamine Paint",
    category: "Thinners & Paint Linings",
    family: "Paints",
    cas: "MELAMINE",
    grade: "Furniture Finish Grade",
    packaging: "1 L / 4 L",
    spec: "Melamine Coating",
    application: "Wood and furniture finishing",
    img: IMG.melamine,
  },
  {
    id: 30,
    name: "Lacquer Paint & Sealer",
    category: "Thinners & Paint Linings",
    family: "Paints",
    cas: "LACQUER-SEALER",
    grade: "Industrial Finishing Grade",
    packaging: "Cans / Drums",
    spec: "Lacquer Coating & Sealer",
    application: "Protective and decorative finishing",
    img: IMG.oilPaint,
  },
  {
    id: 31,
    name: "Deco Paint",
    category: "Thinners & Paint Linings",
    family: "Paints",
    cas: "DECO-PAINT",
    grade: "Decorative Grade",
    packaging: "1 L / 4 L / 20 L",
    spec: "Decorative Coating",
    application: "Interior and exterior surfaces",
    img: IMG.oilPaint,
  },
  {
    id: 46,
    name: "PU Thinner",
    category: "Thinners & Paint Linings",
    family: "Thinners",
    cas: "PU-THINNER",
    grade: "Polyurethane Coating Grade",
    packaging: "Drums / Cans",
    spec: "PU Compatible Solvent Blend",
    application: "Polyurethane coatings and industrial finishing",
    img: IMG.thinner,
  },
  {
    id: 47,
    name: "Epoxy Thinner",
    category: "Thinners & Paint Linings",
    family: "Thinners",
    cas: "EPOXY-THINNER",
    grade: "Epoxy Coating Grade",
    packaging: "Drums / Cans",
    spec: "Epoxy Compatible Solvent Blend",
    application: "Epoxy paints, primers and industrial coatings",
    img: IMG.lacquer,
  },
  {
    id: 48,
    name: "Wood Coating Sealer",
    category: "Thinners & Paint Linings",
    family: "Coatings",
    cas: "WOOD-SEALER",
    grade: "Industrial Furniture Grade",
    packaging: "1 L / 4 L / 20 L",
    spec: "Wood Sealer",
    application: "Furniture and wood finishing",
    img: IMG.melamine,
  },
  {
    id: 49,
    name: "Metal Primer",
    category: "Thinners & Paint Linings",
    family: "Coatings",
    cas: "METAL-PRIMER",
    grade: "Industrial Grade",
    packaging: "1 L / 4 L / 20 L",
    spec: "Metal Surface Primer",
    application: "Metal protection and coating systems",
    img: IMG.oilPaint,
  },
  {
    id: 50,
    name: "Industrial Enamel",
    category: "Thinners & Paint Linings",
    family: "Coatings",
    cas: "ENAMEL-IND",
    grade: "Industrial Grade",
    packaging: "1 L / 4 L / 20 L",
    spec: "Industrial Enamel Paint",
    application: "Machinery, equipment and structural surfaces",
    img: IMG.oilPaint,
  },
];

/* ============================================================
   CATEGORIES
============================================================ */

const CATEGORIES = [
  "All Products",
  "Industrial Chemicals",
  "Solvents",
  "ETP Treatment Chemicals",
  "Thinners & Paint Linings",
];

/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({ product, onQuote, onView }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <ProductImage
          src={product.img}
          alt={`${product.name} industrial chemical`}
        />

        <div className="product-image-shade" />

        <span className="product-category">
          {product.category}
        </span>

        <span className="product-family">
          {product.family}
        </span>
      </div>

      <div className="product-body">
        <div className="product-cas">
          CAS / REF · {product.cas}
        </div>

        <h3>{product.name}</h3>

        <p className="product-description">
          {product.application}
        </p>

        <div className="product-spec-grid">
          <div>
            <span>Grade</span>
            <strong>{product.grade}</strong>
          </div>

          <div>
            <span>Packaging</span>
            <strong>{product.packaging}</strong>
          </div>
        </div>

        <div className="product-actions">
          <button
            className="product-secondary"
            onClick={() => onView(product)}
          >
            Technical Details
            <ArrowUpRight size={14} />
          </button>

          <button
            className="product-primary"
            onClick={() => onQuote(product.name)}
          >
            Request Quote
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function Products() {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("All Products");
  const [family, setFamily] = useState("All Families");
  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  const families = useMemo(() => {
    const source =
      activeCategory === "All Products"
        ? PRODUCTS
        : PRODUCTS.filter(
            (p) => p.category === activeCategory
          );

    return [
      "All Families",
      ...Array.from(new Set(source.map((p) => p.family))),
    ];
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase().trim();

    return PRODUCTS.filter((product) => {
      const categoryMatch =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      const familyMatch =
        family === "All Families" ||
        product.family === family;

      const searchMatch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.cas.toLowerCase().includes(query) ||
        product.spec.toLowerCase().includes(query) ||
        product.application.toLowerCase().includes(query) ||
        product.family.toLowerCase().includes(query);

      return categoryMatch && familyMatch && searchMatch;
    });
  }, [search, activeCategory, family]);

  const openQuote = (name) => {
    setSelectedProduct(name);
    setModal(true);
  };

  const viewProduct = (product) => {
    /*
      Product detail routes can be connected here.
      Existing product IDs remain compatible with the
      existing ProductDetail page.
    */
    navigate(`/products/${product.id}`);
  };

  const changeCategory = (category) => {
    setActiveCategory(category);
    setFamily("All Families");
  };

  return (
    <div className="products-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .products-page {
          min-height: 100vh;
          background: ${T.ivory};
          color: ${T.ink};
          font-family: ${SANS};
          overflow-x: hidden;
        }

        button,
        input {
          font-family: inherit;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .products-hero {
          padding: 155px 0 78px;
          background:
            radial-gradient(
              circle at 82% 20%,
              rgba(197,131,67,0.10),
              transparent 32%
            ),
            linear-gradient(
              180deg,
              ${T.ivory2},
              ${T.ivory}
            );
          border-bottom: 1px solid ${T.line};
        }

        .container {
          width: min(${W}, calc(100% - 48px));
          margin: 0 auto;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 72px;
          align-items: center;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: ${MONO};
          font-size: 10px;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: ${T.accent};
          margin-bottom: 18px;
        }

        .eyebrow-line {
          width: 28px;
          height: 1px;
          background: ${T.accent};
        }

        .hero-title {
          font-family: ${SERIF};
          font-weight: 500;
          font-size: clamp(48px, 5.2vw, 76px);
          line-height: 1.02;
          letter-spacing: -.035em;
          margin: 0 0 25px;
          max-width: 720px;
        }

        .hero-title em {
          color: ${T.accent};
          font-style: italic;
        }

        .hero-copy {
          max-width: 650px;
          color: ${T.muted};
          font-size: 16px;
          line-height: 1.75;
          margin: 0 0 28px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .hero-button {
          border: 1px solid ${T.ink};
          background: ${T.ink};
          color: ${T.white};
          padding: 14px 20px;
          border-radius: 11px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: .22s ease;
        }

        .hero-button:hover {
          background: ${T.accent};
          border-color: ${T.accent};
          transform: translateY(-2px);
        }

        .hero-button.light {
          background: transparent;
          color: ${T.ink};
          border-color: ${T.line};
        }

        .hero-button.light:hover {
          border-color: ${T.accent};
          color: ${T.accent};
        }

        /* =====================================================
           HERO VISUAL
        ===================================================== */

        .hero-visual {
          position: relative;
          min-height: 470px;
          border-radius: 28px;
          overflow: hidden;
          background: ${T.ink};
          box-shadow: 0 35px 70px rgba(18,15,13,.10);
        }

        .hero-visual-image {
          width: 100%;
          height: 100%;
          min-height: 470px;
          object-fit: cover;
          display: block;
          opacity: .72;
        }

        .hero-visual-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              135deg,
              rgba(18,15,13,.78),
              rgba(18,15,13,.12) 55%,
              rgba(18,15,13,.72)
            );
        }

        .hero-visual-content {
          position: absolute;
          inset: 0;
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hero-stat-label {
          font-family: ${MONO};
          color: rgba(255,255,255,.58);
          letter-spacing: .16em;
          text-transform: uppercase;
          font-size: 10px;
        }

        .hero-stat {
          color: ${T.white};
          font-family: ${SERIF};
          font-size: 54px;
          line-height: 1;
          margin-top: 8px;
        }

        .hero-visual-bottom {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .hero-mini {
          border: 1px solid rgba(255,255,255,.14);
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(10px);
          padding: 16px;
          border-radius: 13px;
        }

        .hero-mini span {
          display: block;
          color: rgba(255,255,255,.52);
          font-family: ${MONO};
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: .1em;
          margin-bottom: 7px;
        }

        .hero-mini strong {
          color: ${T.white};
          font-size: 13px;
          line-height: 1.3;
        }

        /* =====================================================
           TRUST STRIP
        ===================================================== */

        .trust-strip {
          background: ${T.white};
          border-bottom: 1px solid ${T.line};
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .trust-item {
          padding: 23px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-right: 1px solid ${T.line};
        }

        .trust-item:last-child {
          border-right: 0;
        }

        .trust-icon {
          width: 38px;
          height: 38px;
          min-width: 38px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: ${T.ivory2};
          color: ${T.accent};
        }

        .trust-item strong {
          display: block;
          font-size: 13px;
          margin-bottom: 2px;
        }

        .trust-item span {
          display: block;
          color: ${T.muted};
          font-size: 11px;
        }

        /* =====================================================
           CATALOG CONTROLS
        ===================================================== */

        .catalog-section {
          padding: 62px 0 85px;
        }

        .catalog-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 30px;
        }

        .section-kicker {
          font-family: ${MONO};
          color: ${T.accent};
          font-size: 10px;
          letter-spacing: .18em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .section-title {
          font-family: ${SERIF};
          font-size: 42px;
          line-height: 1.08;
          font-weight: 500;
          margin: 0;
          letter-spacing: -.025em;
        }

        .catalog-count {
          font-family: ${MONO};
          color: ${T.muted};
          font-size: 11px;
          white-space: nowrap;
        }

        .controls {
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 18px;
          padding: 18px;
          margin-bottom: 35px;
          box-shadow: 0 10px 30px rgba(18,15,13,.025);
        }

        .control-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 15px;
          align-items: center;
          margin-bottom: 17px;
        }

        .search-box {
          position: relative;
        }

        .search-box svg {
          position: absolute;
          left: 17px;
          top: 50%;
          transform: translateY(-50%);
          color: ${T.muted};
        }

        .search-box input {
          width: 100%;
          border: 1px solid ${T.line};
          background: ${T.ivory};
          color: ${T.ink};
          outline: none;
          padding: 15px 18px 15px 48px;
          border-radius: 11px;
          font-size: 14px;
        }

        .search-box input:focus {
          border-color: ${T.accent};
        }

        .mobile-filter {
          display: none;
          border: 1px solid ${T.line};
          background: ${T.ivory};
          padding: 13px 16px;
          border-radius: 11px;
          cursor: pointer;
        }

        .category-row {
          display: flex;
          gap: 9px;
          overflow-x: auto;
          padding-bottom: 2px;
          scrollbar-width: thin;
        }

        .category-button {
          border: 1px solid ${T.line};
          background: ${T.white};
          color: ${T.ink2};
          padding: 11px 17px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 12.5px;
          white-space: nowrap;
          transition: .2s ease;
        }

        .category-button:hover {
          border-color: ${T.accent};
          color: ${T.accent};
        }

        .category-button.active {
          background: ${T.ink};
          color: ${T.white};
          border-color: ${T.ink};
        }

        .family-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 17px;
          padding-top: 17px;
          border-top: 1px solid ${T.line};
        }

        .family-label {
          font-family: ${MONO};
          color: ${T.muted};
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .12em;
          white-space: nowrap;
        }

        .family-select {
          border: 1px solid ${T.line};
          background: ${T.ivory};
          border-radius: 9px;
          padding: 9px 32px 9px 11px;
          font-size: 12px;
          color: ${T.ink};
          outline: none;
        }

        /* =====================================================
           PRODUCT GRID
        ===================================================== */

        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0,1fr));
          gap: 24px;
        }

        .product-card {
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition:
            transform .35s cubic-bezier(.16,1,.3,1),
            box-shadow .35s ease,
            border-color .35s ease;
        }

        .product-card:hover {
          transform: translateY(-6px);
          border-color: rgba(197,131,67,.45);
          box-shadow: 0 25px 55px rgba(18,15,13,.08);
        }

        .product-image {
          height: 255px;
          position: relative;
          overflow: hidden;
          background: #ece6dc;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .55s cubic-bezier(.16,1,.3,1);
        }

        .product-card:hover .product-image img {
          transform: scale(1.045);
        }

        .product-image-shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              to bottom,
              rgba(18,15,13,.04),
              transparent 45%,
              rgba(18,15,13,.18)
            );
        }

        .product-category,
        .product-family {
          position: absolute;
          top: 14px;
          padding: 6px 9px;
          border-radius: 5px;
          font-family: ${MONO};
          text-transform: uppercase;
          letter-spacing: .04em;
          font-size: 8.5px;
        }

        .product-category {
          left: 14px;
          background: ${T.ink};
          color: ${T.white};
        }

        .product-family {
          right: 14px;
          background: rgba(255,255,255,.9);
          color: ${T.ink};
          backdrop-filter: blur(8px);
        }

        .product-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-cas {
          color: ${T.accent};
          font-family: ${MONO};
          font-size: 9.5px;
          letter-spacing: .04em;
          margin-bottom: 7px;
        }

        .product-body h3 {
          font-family: ${SERIF};
          font-weight: 600;
          font-size: 25px;
          line-height: 1.12;
          margin: 0 0 10px;
        }

        .product-description {
          color: ${T.muted};
          font-size: 12.5px;
          line-height: 1.55;
          margin: 0 0 20px;
          min-height: 39px;
        }

        .product-spec-grid {
          border-top: 1px solid ${T.line};
          border-bottom: 1px solid ${T.line};
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-bottom: 18px;
        }

        .product-spec-grid > div {
          padding: 13px 8px;
        }

        .product-spec-grid > div + div {
          border-left: 1px solid ${T.line};
        }

        .product-spec-grid span {
          display: block;
          font-family: ${MONO};
          font-size: 8px;
          text-transform: uppercase;
          color: ${T.muted};
          letter-spacing: .08em;
          margin-bottom: 6px;
        }

        .product-spec-grid strong {
          display: block;
          font-size: 10.5px;
          line-height: 1.4;
          font-weight: 600;
        }

        .product-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: auto;
        }

        .product-secondary,
        .product-primary {
          border-radius: 9px;
          padding: 11px 10px;
          font-size: 10.5px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: .2s ease;
        }

        .product-secondary {
          border: 1px solid ${T.line};
          background: ${T.ivory};
          color: ${T.ink};
        }

        .product-secondary:hover {
          border-color: ${T.accent};
          color: ${T.accent};
        }

        .product-primary {
          border: 1px solid ${T.ink};
          background: ${T.ink};
          color: ${T.white};
        }

        .product-primary:hover {
          border-color: ${T.accent};
          background: ${T.accent};
        }

        /* =====================================================
           EMPTY STATE
        ===================================================== */

        .empty-state {
          background: ${T.white};
          border: 1px dashed ${T.line};
          border-radius: 20px;
          padding: 85px 25px;
          text-align: center;
        }

        .empty-icon {
          width: 54px;
          height: 54px;
          margin: 0 auto 15px;
          border-radius: 15px;
          display: grid;
          place-items: center;
          background: ${T.ivory2};
          color: ${T.accent};
        }

        .empty-state h3 {
          font-family: ${SERIF};
          font-size: 28px;
          margin: 0 0 7px;
        }

        .empty-state p {
          color: ${T.muted};
          font-size: 13px;
          max-width: 470px;
          margin: 0 auto 22px;
          line-height: 1.6;
        }

        /* =====================================================
           CUSTOM SOURCING
        ===================================================== */

        .sourcing-section {
          margin-top: 60px;
          border-radius: 25px;
          background: ${T.ink};
          padding: 58px;
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 50px;
          align-items: center;
        }

        .sourcing-section::before {
          content: "";
          position: absolute;
          width: 480px;
          height: 480px;
          right: -190px;
          top: -260px;
          border-radius: 50%;
          background: rgba(197,131,67,.13);
        }

        .sourcing-section::after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          right: 90px;
          bottom: -240px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.07);
        }

        .sourcing-content {
          position: relative;
          z-index: 1;
          max-width: 750px;
        }

        .sourcing-kicker {
          font-family: ${MONO};
          color: ${T.accent};
          font-size: 9px;
          letter-spacing: .18em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .sourcing-title {
          color: ${T.white};
          font-family: ${SERIF};
          font-size: clamp(35px,4vw,52px);
          line-height: 1.05;
          font-weight: 500;
          margin: 0 0 16px;
        }

        .sourcing-title em {
          color: ${T.accent};
          font-style: italic;
        }

        .sourcing-copy {
          color: rgba(255,255,255,.65);
          line-height: 1.7;
          font-size: 14px;
          margin: 0;
        }

        .sourcing-button {
          position: relative;
          z-index: 1;
          border: 1px solid ${T.accent};
          background: ${T.accent};
          color: ${T.white};
          padding: 15px 21px;
          border-radius: 11px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
          transition: .2s ease;
        }

        .sourcing-button:hover {
          background: ${T.white};
          color: ${T.ink};
          border-color: ${T.white};
        }

        /* =====================================================
           BUYING PROCESS
        ===================================================== */

        .process-section {
          padding: 90px 0;
          background: ${T.ivory2};
          border-top: 1px solid ${T.line};
        }

        .process-heading {
          max-width: 680px;
          margin-bottom: 40px;
        }

        .process-heading p {
          color: ${T.muted};
          line-height: 1.7;
          font-size: 14px;
          margin-top: 14px;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 14px;
        }

        .process-card {
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 17px;
          padding: 25px;
        }

        .process-number {
          font-family: ${MONO};
          font-size: 10px;
          color: ${T.accent};
          margin-bottom: 35px;
        }

        .process-card h3 {
          font-family: ${SERIF};
          font-size: 24px;
          margin: 0 0 8px;
        }

        .process-card p {
          color: ${T.muted};
          font-size: 12px;
          line-height: 1.6;
          margin: 0;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1050px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-visual {
            min-height: 390px;
          }

          .hero-visual-image {
            min-height: 390px;
          }

          .product-grid {
            grid-template-columns: repeat(2, minmax(0,1fr));
          }

          .process-grid {
            grid-template-columns: repeat(2,1fr);
          }
        }

        @media (max-width: 750px) {
          .container {
            width: min(100% - 32px, ${W});
          }

          .products-hero {
            padding: 120px 0 55px;
          }

          .hero-title {
            font-size: 48px;
          }

          .hero-visual {
            min-height: 340px;
          }

          .hero-visual-image {
            min-height: 340px;
          }

          .hero-visual-bottom {
            grid-template-columns: 1fr;
          }

          .hero-mini {
            display: none;
          }

          .trust-grid {
            grid-template-columns: 1fr 1fr;
          }

          .trust-item:nth-child(2) {
            border-right: 0;
          }

          .trust-item:nth-child(3),
          .trust-item:nth-child(4) {
            border-top: 1px solid ${T.line};
          }

          .catalog-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }

          .control-top {
            grid-template-columns: 1fr;
          }

          .mobile-filter {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
          }

          .family-row {
            display: none;
          }

          .category-row.mobile-open {
            display: flex;
          }

          .category-row {
            display: none;
          }

          .product-grid {
            grid-template-columns: 1fr;
          }

          .sourcing-section {
            grid-template-columns: 1fr;
            padding: 38px 27px;
          }

          .sourcing-button {
            width: 100%;
            justify-content: center;
          }

          .process-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .trust-grid {
            grid-template-columns: 1fr;
          }

          .trust-item {
            border-right: 0 !important;
            border-top: 1px solid ${T.line};
          }

          .trust-item:first-child {
            border-top: 0;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-button {
            width: 100%;
            justify-content: center;
          }

          .product-actions {
            grid-template-columns: 1fr;
          }

          .product-image {
            height: 235px;
          }
        }
      `}</style>

      <Navbar
        onGetQuote={() =>
          openQuote("General Chemical Supply Requirement")
        }
      />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="products-hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                Industrial Chemical Portfolio
              </div>

              <h1 className="hero-title">
                Materials for the work
                <br />
                <em>behind industry.</em>
              </h1>

              <p className="hero-copy">
                Source industrial chemicals, solvents, ETP treatment
                chemicals, thinners and coatings through one
                procurement partner. Select a listed material or send
                us a specification for a custom requirement.
              </p>

              <div className="hero-actions">
                <button
                  className="hero-button"
                  onClick={() =>
                    document
                      .getElementById("catalog")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  Explore Product Portfolio
                  <ArrowUpRight size={15} />
                </button>

                <button
                  className="hero-button light"
                  onClick={() =>
                    openQuote("Custom Chemical Requirement")
                  }
                >
                  <MessageSquareText size={15} />
                  Source Something Else
                </button>
              </div>
            </div>

            <div className="hero-visual">
              <ProductImage
                src={IMG.ipa}
                alt="Industrial chemical supply"
              />

              <div className="hero-visual-overlay" />

              <div className="hero-visual-content">
                <div>
                  <div className="hero-stat-label">
                    Portfolio
                  </div>

                  <div className="hero-stat">
                    {PRODUCTS.length}+
                  </div>

                  <div
                    style={{
                      color: "rgba(255,255,255,.72)",
                      fontSize: 13,
                      marginTop: 8,
                    }}
                  >
                    listed materials & industrial products
                  </div>
                </div>

                <div className="hero-visual-bottom">
                  <div className="hero-mini">
                    <span>01</span>
                    <strong>Industrial Chemicals</strong>
                  </div>

                  <div className="hero-mini">
                    <span>02</span>
                    <strong>Solvents & Process Materials</strong>
                  </div>

                  <div className="hero-mini">
                    <span>03</span>
                    <strong>ETP Treatment Chemicals</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          TRUST STRIP
      ====================================================== */}

      <section className="trust-strip">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <FileCheck2 size={18} />
              </div>

              <div>
                <strong>Specification-led supply</strong>
                <span>Grade & requirement focused</span>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <PackageCheck size={18} />
              </div>

              <div>
                <strong>Flexible packaging</strong>
                <span>Drums, bags, IBC & bulk</span>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <Truck size={18} />
              </div>

              <div>
                <strong>Industrial dispatch</strong>
                <span>Planned around your requirement</span>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Documentation</strong>
                <span>Commercial & batch records</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          CATALOG
      ====================================================== */}

      <section
        className="catalog-section"
        id="catalog"
      >
        <div className="container">
          <div className="catalog-heading">
            <div>
              <div className="section-kicker">
                Product Portfolio
              </div>

              <h2 className="section-title">
                Find the material you need.
              </h2>
            </div>

            <div className="catalog-count">
              Showing {filteredProducts.length} of{" "}
              {PRODUCTS.length} products
            </div>
          </div>

          <div className="controls">
            <div className="control-top">
              <div className="search-box">
                <Search size={17} />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search product, CAS number, family or application..."
                />
              </div>

              <button
                className="mobile-filter"
                onClick={() =>
                  setMobileFilterOpen((v) => !v)
                }
              >
                <SlidersHorizontal size={15} />
                Categories
                {mobileFilterOpen ? (
                  <X size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>
            </div>

            <div
              className={`category-row ${
                mobileFilterOpen
                  ? "mobile-open"
                  : ""
              }`}
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`category-button ${
                    activeCategory === category
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    changeCategory(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="family-row">
              <span className="family-label">
                Product family
              </span>

              <select
                className="family-select"
                value={family}
                onChange={(e) =>
                  setFamily(e.target.value)
                }
              >
                {families.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <Boxes size={25} />
              </div>

              <h3>
                We don't see that requirement listed.
              </h3>

              <p>
                That's okay. Send us the chemical name,
                grade, quantity or application and our
                sourcing team can review the requirement.
              </p>

              <button
                className="product-primary"
                style={{
                  display: "inline-flex",
                  width: "auto",
                  padding: "13px 20px",
                }}
                onClick={() =>
                  openQuote("Custom Chemical Requirement")
                }
              >
                Send Custom Requirement
                <ArrowUpRight size={14} />
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuote={openQuote}
                  onView={viewProduct}
                />
              ))}
            </div>
          )}

          {/* ==================================================
              CUSTOM SOURCING
          ================================================== */}

          <div className="sourcing-section">
            <div className="sourcing-content">
              <div className="sourcing-kicker">
                Custom sourcing desk
              </div>

              <h2 className="sourcing-title">
                Your chemical doesn't have to be
                <em> on our list.</em>
              </h2>

              <p className="sourcing-copy">
                Tell us the product name, specification,
                quantity, packaging or application. Our team
                can review the requirement and identify an
                appropriate sourcing route based on
                availability and specification.
              </p>
            </div>

            <button
              className="sourcing-button"
              onClick={() =>
                openQuote("Custom / Other Chemical Requirement")
              }
            >
              <MessageSquareText size={16} />
              Send Your Requirement
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================
          PROCUREMENT PROCESS
      ====================================================== */}

      <section className="process-section">
        <div className="container">
          <div className="process-heading">
            <div className="section-kicker">
              Simple procurement
            </div>

            <h2 className="section-title">
              From specification to dispatch.
            </h2>

            <p>
              The buying experience should be as clear as the
              material specification. Share what you need and
              let the commercial process follow.
            </p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-number">01 / REQUIREMENT</div>

              <h3>Tell us what you need.</h3>

              <p>
                Product name, specification, quantity,
                packaging or application.
              </p>
            </div>

            <div className="process-card">
              <div className="process-number">02 / REVIEW</div>

              <h3>We review the requirement.</h3>

              <p>
                Grade, availability, commercial feasibility
                and supply route are assessed.
              </p>
            </div>

            <div className="process-card">
              <div className="process-number">03 / CONFIRM</div>

              <h3>Confirm the supply.</h3>

              <p>
                Commercial terms, packaging, documentation
                and dispatch expectations are aligned.
              </p>
            </div>

            <div className="process-card">
              <div className="process-number">04 / DISPATCH</div>

              <h3>Material moves.</h3>

              <p>
                Planned dispatch with the required commercial
                and batch documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <WhatsAppButton />

      <EnquiryModal
        isOpen={modal}
        onClose={() => setModal(false)}
        prefillProduct={selectedProduct}
      />
    </div>
  );
}
