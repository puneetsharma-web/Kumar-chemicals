import { useParams, useNavigate } from "react-router-dom";
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
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

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
  success: "#4A6B53",
};

const SERIF = `"Cormorant Garamond", "Garamond", "Georgia", serif`;
const SANS = `"DM Sans", "Inter", sans-serif`;
const MONO = `"DM Mono", "Courier New", monospace`;
const W = "1320px";

/* ============================================================
   FALLBACK IMAGE
============================================================ */

const FALLBACK_IMAGE =
  "https://hoachathaiphong.vn/images/attachment/6712isopropyl-alcohol-ipa-han-quoc.jpg";

/* ============================================================
   PRODUCT IMAGES
============================================================ */

/* INDUSTRIAL CHEMICALS */

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

/* SOLVENTS */

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

/* ETP */

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

/* THINNERS */

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
   COMPLETE PRODUCT DATA
============================================================ */

const MASTER_PRODUCTS = [
  /* ==========================================================
     INDUSTRIAL CHEMICALS
  ========================================================== */

  {
    id: 1,
    name: "Caustic Lye",
    category: "Industrial Chemicals",
    cas: "1310-73-2 (Liquid)",
    purity: "47% - 50% Aqueous Solution",
    packaging: "Tankers / IBC Containers / 50L / 200L Drums",
    moq: "5 Metric Tons or Tanker Load",
    img: IMG_CAUSTIC_LYE,
    spec: "NaOH Liquid | Available in Tanker / Drum Supply",
    description:
      "Highly alkaline sodium hydroxide solution used extensively across process industries for chemical neutralization, pH adjustment, gas scrubbing and industrial processing.",
    applications: [
      "Pulp & Paper Processing",
      "Chemical Neutralization",
      "Alumina Refinery Processing",
      "Water Treatment",
      "Textile Processing",
    ],
  },

  {
    id: 2,
    name: "Caustic Soda Flakes",
    category: "Industrial Chemicals",
    cas: "1310-73-2 (Flakes)",
    purity: "≥ 99.0% Active Content",
    packaging: "25kg HDPE / PP Laminated Moisture-Proof Bags",
    moq: "1 Metric Ton / 40 Bags",
    img: IMG_CAUSTIC_FLAKES,
    spec: "NaOH 99% | 25kg HDPE Bags",
    description:
      "High-purity crystalline sodium hydroxide supplied in moisture-resistant bags for industrial chemical processing, cleaning, textile and manufacturing applications.",
    applications: [
      "Soap & Detergent Manufacturing",
      "Textile Mercerization",
      "Metal Cleaning",
      "Chemical Manufacturing",
      "pH Adjustment",
    ],
  },

  {
    id: 3,
    name: "Soda Ash",
    category: "Industrial Chemicals",
    cas: "497-19-8",
    purity: "≥ 99.2% Light / Dense Grade",
    packaging: "50kg Bags / 1000kg Jumbo Bags",
    moq: "2 Metric Tons",
    img: IMG_SODA_ASH,
    spec: "Light / Dense Grade | 50kg Bags",
    description:
      "Sodium carbonate used as an important industrial raw material and fluxing agent across glass, detergent, chemical and water treatment applications.",
    applications: [
      "Glass Manufacturing",
      "Detergent Manufacturing",
      "Water Softening",
      "Chemical Processing",
      "pH Modification",
    ],
  },

  {
    id: 4,
    name: "Sodium Sulfate (Glauber's Salt)",
    category: "Industrial Chemicals",
    cas: "7727-73-3",
    purity: "Industrial / High Purity Grade",
    packaging: "50kg Bags / Jumbo Bags",
    moq: "1 Metric Ton",
    img: IMG_SODIUM_SULFATE,
    spec: "High Purity Crystals | 50kg Bags",
    description:
      "Industrial sodium sulfate supplied for detergent, textile, pulp, paper and various chemical manufacturing processes.",
    applications: [
      "Detergent Manufacturing",
      "Pulp & Paper",
      "Textile Processing",
      "Chemical Manufacturing",
      "Glass Applications",
    ],
  },

  {
    id: 5,
    name: "Hydrogen Peroxide",
    category: "Industrial Chemicals",
    cas: "7722-84-1",
    purity: "50% Aqueous Solution",
    packaging: "Carboys / HDPE Drums / Bulk Supply",
    moq: "200 Liters / Custom Bulk Quantity",
    img: IMG_H2O2,
    spec: "50% Solution | Carboys / Drums",
    description:
      "Strong oxidizing chemical used for bleaching, disinfection, wastewater treatment and oxidation processes across industrial environments.",
    applications: [
      "Water Treatment",
      "Pulp & Paper Bleaching",
      "Textile Bleaching",
      "Chemical Oxidation",
      "Industrial Cleaning",
    ],
  },

  {
    id: 6,
    name: "Hydrochloric Acid (HCl)",
    category: "Industrial Chemicals",
    cas: "7647-01-0",
    purity: "30–35% Industrial Grade",
    packaging: "HDPE Carboys / Drums / Tankers",
    moq: "500 Liters / Custom Bulk Quantity",
    img: IMG_HCL,
    spec: "30–35% | Carboys / Tankers",
    description:
      "Industrial hydrochloric acid used for pH control, metal surface treatment, chemical processing and wastewater neutralization.",
    applications: [
      "pH Adjustment",
      "Metal Pickling",
      "Chemical Manufacturing",
      "ETP Neutralization",
      "Industrial Cleaning",
    ],
  },

  {
    id: 7,
    name: "Sulfamic Acid",
    category: "Industrial Chemicals",
    cas: "5329-14-6",
    purity: "Industrial / Descaling Grade",
    packaging: "25kg HDPE / PP Bags",
    moq: "500kg / 20 Bags",
    img: IMG_SULFAMIC,
    spec: "Descaling Grade | 25kg Bags",
    description:
      "Stable solid acid widely used for descaling, industrial cleaning, boiler treatment and removal of mineral deposits.",
    applications: [
      "Industrial Descaling",
      "Boiler Cleaning",
      "Heat Exchanger Cleaning",
      "Metal Cleaning",
      "Process Equipment Cleaning",
    ],
  },

  {
    id: 8,
    name: "Sulfuric Acid",
    category: "Industrial Chemicals",
    cas: "7664-93-9",
    purity: "98% Concentration",
    packaging: "Chemical Tankers / Compatible Containers",
    moq: "5 Metric Tons",
    img: IMG_SULFURIC,
    spec: "98% Concentration | Tanker Supply",
    description:
      "High-volume industrial acid used throughout chemical manufacturing, fertilizer production, metal processing and wastewater treatment.",
    applications: [
      "Chemical Manufacturing",
      "Fertilizer Production",
      "Metal Processing",
      "Battery Manufacturing",
      "ETP Applications",
    ],
  },

  /* ==========================================================
     SOLVENTS
  ========================================================== */

  {
    id: 9,
    name: "Isopropyl Alcohol (IPA)",
    category: "Solvents",
    cas: "67-63-0",
    purity: "99% / 70% Grade",
    packaging: "160kg Drums / 200L Drums / Bulk",
    moq: "160kg / Drum",
    img: IMG_IPA,
    spec: "99% / 70% | 160kg Drums",
    description:
      "Versatile industrial solvent with excellent cleaning and evaporation properties used across pharmaceutical, electronics, coatings, printing and manufacturing applications.",
    applications: [
      "Pharmaceutical Manufacturing",
      "Electronics Cleaning",
      "Industrial Cleaning",
      "Paint & Coatings",
      "Printing",
    ],
  },

  {
    id: 10,
    name: "Ethanol / Ethyl Alcohol",
    category: "Solvents",
    cas: "64-17-5",
    purity: "Industrial Grade",
    packaging: "Drums / Tankers / Bulk Supply",
    moq: "200 Liters / Custom Bulk Quantity",
    img: IMG_ETHANOL,
    spec: "Industrial Grade | Bulk / Drums",
    description:
      "Widely used alcohol solvent supplied for industrial formulations, cleaning, extraction, coatings and manufacturing processes.",
    applications: [
      "Industrial Cleaning",
      "Chemical Formulation",
      "Pharmaceutical Processing",
      "Paint & Coatings",
      "Extraction Processes",
    ],
  },

  {
    id: 11,
    name: "Toluene",
    category: "Solvents",
    cas: "108-88-3",
    purity: "Industrial Solvent Grade",
    packaging: "200L Drums / Bulk Tanker",
    moq: "200 Liters",
    img: IMG_TOLUENE,
    spec: "Industrial Solvent | 200L Drums",
    description:
      "A high-performance aromatic solvent commonly used in coatings, adhesives, printing inks and chemical manufacturing.",
    applications: [
      "Paint Manufacturing",
      "Coatings",
      "Adhesives",
      "Printing Inks",
      "Chemical Manufacturing",
    ],
  },

  {
    id: 12,
    name: "Liquid Acetone",
    category: "Solvents",
    cas: "67-64-1",
    purity: "Industrial Grade",
    packaging: "160kg Drums / 200L Drums / Bulk",
    moq: "160kg / Drum",
    img: IMG_ACETONE,
    spec: "Industrial Grade | 160kg Drums",
    description:
      "Fast-evaporating industrial solvent used for cleaning, degreasing, coatings, adhesives and chemical formulation.",
    applications: [
      "Industrial Cleaning",
      "Degreasing",
      "Paint & Coatings",
      "Adhesives",
      "Chemical Processing",
    ],
  },

  {
    id: 13,
    name: "Liquid Butyl / Butyl Acetate",
    category: "Solvents",
    cas: "123-86-4",
    purity: "Industrial Solvent Grade",
    packaging: "200L Drums / Bulk Supply",
    moq: "200 Liters",
    img: IMG_BUTYL_ACETATE,
    spec: "Industrial Solvent | Bulk Drums",
    description:
      "Organic solvent used primarily in paints, coatings, lacquers, adhesives and industrial formulations requiring controlled evaporation.",
    applications: [
      "Paint Manufacturing",
      "Lacquer Production",
      "Coatings",
      "Adhesives",
      "Printing Inks",
    ],
  },

  {
    id: 14,
    name: "Liquid Ethylene Glycol",
    category: "Solvents",
    cas: "107-21-1",
    purity: "Technical Grade",
    packaging: "200L Drums / Bulk Tankers",
    moq: "200 Liters",
    img: IMG_ETHYLENE_GLYCOL,
    spec: "Technical Grade | 200L Drums",
    description:
      "Industrial glycol used in heat-transfer systems, antifreeze formulations, resins and chemical manufacturing.",
    applications: [
      "Heat Transfer Fluids",
      "Antifreeze Formulations",
      "Resin Manufacturing",
      "Chemical Processing",
      "Industrial Cooling",
    ],
  },

  /* ==========================================================
     ETP TREATMENT CHEMICALS
  ========================================================== */

  {
    id: 15,
    name: "PAC Liquid (Poly Aluminum Chloride)",
    category: "ETP Treatment Chemicals",
    cas: "1327-41-9",
    purity: "18% Al₂O₃",
    packaging: "200L HDPE Drums / Bulk Supply",
    moq: "200 Liters",
    img: IMG_PAC_LIQUID,
    spec: "18% Al₂O₃ | Ready to use | 200L Drums",
    description:
      "Liquid coagulant designed for wastewater clarification, suspended solids removal and industrial effluent treatment.",
    applications: [
      "ETP Treatment",
      "STP Treatment",
      "Wastewater Clarification",
      "Suspended Solids Removal",
      "Industrial Effluent Treatment",
    ],
  },

  {
    id: 16,
    name: "PAC Powder (Poly Aluminum Chloride)",
    category: "ETP Treatment Chemicals",
    cas: "1327-41-9",
    purity: "30% Al₂O₃",
    packaging: "25kg HDPE / PP Bags",
    moq: "500kg / 20 Bags",
    img: IMG_PAC_POWDER,
    spec: "30% Al₂O₃ | High purity | 25kg Bags",
    description:
      "High-performance powdered coagulant used for wastewater clarification and removal of suspended particles and impurities.",
    applications: [
      "ETP Plants",
      "STP Plants",
      "Water Clarification",
      "Industrial Wastewater",
      "Process Water Treatment",
    ],
  },

  {
    id: 17,
    name: "Alum (Aluminum Sulfate)",
    category: "ETP Treatment Chemicals",
    cas: "10043-01-3",
    purity: "Water Treatment Grade",
    packaging: "50kg Bags / Jumbo Bags",
    moq: "1 Metric Ton",
    img: IMG_ALUM,
    spec: "Water Treatment Grade | 50kg Bags",
    description:
      "Traditional water-treatment coagulant used for suspended solids removal, clarification and wastewater treatment processes.",
    applications: [
      "ETP Treatment",
      "STP Treatment",
      "Water Clarification",
      "Industrial Wastewater",
      "Municipal Water Treatment",
    ],
  },

  {
    id: 18,
    name: "Polymer / Polyelectrolyte",
    category: "ETP Treatment Chemicals",
    cas: "ETP-POLY",
    purity: "Flocculant Grade",
    packaging: "25kg Bags / Liquid Containers",
    moq: "25kg / Bag",
    img: IMG_POLYMER,
    spec: "Flocculant | ETP / STP use | Powder / Liquid",
    description:
      "Polymeric flocculant used to improve settling and separation performance in wastewater and industrial effluent treatment systems.",
    applications: [
      "ETP Sludge Treatment",
      "STP Treatment",
      "Flocculation",
      "Sludge Dewatering",
      "Wastewater Clarification",
    ],
  },

  {
    id: 19,
    name: "Color Removal Chemical",
    category: "ETP Treatment Chemicals",
    cas: "ETP-CR",
    purity: "Industrial Decolorizing Grade",
    packaging: "25kg Bags / Drums / Liquid Containers",
    moq: "100kg / Custom Quantity",
    img: IMG_COLOR_REMOVAL,
    spec: "Decolorizing Agent | Liquid Form | Industrial ETP",
    description:
      "Specialized chemical used for reducing color and organic coloration in industrial wastewater streams.",
    applications: [
      "Textile ETP",
      "Dye Industry",
      "Chemical Industry",
      "Industrial Wastewater",
      "Color Reduction",
    ],
  },

  {
    id: 20,
    name: "Hypochlorite / Liquid Chlorine",
    category: "ETP Treatment Chemicals",
    cas: "7681-52-9",
    purity: "Industrial Disinfectant Grade",
    packaging: "HDPE Cans / Drums / Compatible Containers",
    moq: "200 Liters",
    img: IMG_HYPOCHLORITE,
    spec: "Disinfectant | Can / Drum packing",
    description:
      "Chlorine-based oxidizing and disinfecting chemical used for wastewater treatment, sanitation and industrial disinfection applications.",
    applications: [
      "ETP Disinfection",
      "STP Disinfection",
      "Water Treatment",
      "Industrial Sanitation",
      "Process Water",
    ],
  },

  /* ==========================================================
     THINNERS & PAINT LININGS
  ========================================================== */

  {
    id: 21,
    name: "Mineral Turpentine Oil (MTO)",
    category: "Thinners & Paint Linings",
    cas: "MTO",
    purity: "Industrial / Paint Grade",
    packaging: "Loose / Drums / Bottles",
    moq: "200 Liters / Custom Quantity",
    img: IMG_MTO,
    spec: "Loose / Drums / Bottles | Paint dilution base",
    description:
      "Petroleum-derived solvent used as a thinner and diluent in paints, coatings and various industrial formulations.",
    applications: [
      "Paint Thinning",
      "Industrial Coatings",
      "Wood Finishing",
      "Cleaning",
      "Decorative Paints",
    ],
  },

  {
    id: 22,
    name: "Commercial Turpentine Oil",
    category: "Thinners & Paint Linings",
    cas: "Turpentine",
    purity: "Commercial / Economy Grade",
    packaging: "Bulk / Drums / Packaged Containers",
    moq: "200 Liters",
    img: IMG_TURPENTINE,
    spec: "Bulk / Packaged | Economy grade",
    description:
      "Commercial solvent used in paint dilution, cleaning and general industrial coating applications.",
    applications: [
      "Paint Thinning",
      "Coating Applications",
      "Industrial Cleaning",
      "Wood Finishing",
      "Decorative Paints",
    ],
  },

  {
    id: 23,
    name: "NC Thinner (Nitrocellulose)",
    category: "Thinners & Paint Linings",
    cas: "NC",
    purity: "Fast-Drying Technical Grade",
    packaging: "Loose / 200L Drums / Cans",
    moq: "200 Liters / Custom Pack",
    img: IMG_NC_THINNER,
    spec: "Fast Dry | Furniture & Coating use | Loose / Can",
    description:
      "Balanced solvent blend formulated for thinning nitrocellulose lacquers and coatings while maintaining fast drying and good finish quality.",
    applications: [
      "Furniture Finishing",
      "Wood Coatings",
      "Automotive Refinishing",
      "Metal Coatings",
      "Spray Applications",
    ],
  },

  {
    id: 24,
    name: "Deco Thinner",
    category: "Thinners & Paint Linings",
    cas: "Thinner-DECO",
    purity: "Premium Decorative Paint Grade",
    packaging: "20L / 50L / 200L Containers",
    moq: "200 Liters",
    img: IMG_DECO_THINNER,
    spec: "Decorative Paint Thinning | Premium finish",
    description:
      "Thinner designed for decorative coating systems where smooth application, finish quality and controlled drying are required.",
    applications: [
      "Decorative Paint",
      "Interior Coatings",
      "Exterior Coatings",
      "Wood Finishing",
      "Industrial Coatings",
    ],
  },

  {
    id: 25,
    name: "Cleaning Thinner",
    category: "Thinners & Paint Linings",
    cas: "Thinner-CL",
    purity: "Industrial Cleaning Grade",
    packaging: "20L / 50L / 200L Containers",
    moq: "200 Liters",
    img: IMG_CLEANING_THINNER,
    spec: "Machine & Line Cleaning | High potency flush",
    description:
      "Solvent blend intended for cleaning production equipment, spray lines, machines and industrial surfaces.",
    applications: [
      "Machine Cleaning",
      "Production Line Cleaning",
      "Spray Equipment",
      "Industrial Degreasing",
      "Equipment Maintenance",
    ],
  },

  {
    id: 26,
    name: "Lacquer Thinner",
    category: "Thinners & Paint Linings",
    cas: "LAC",
    purity: "High Gloss Finishing Grade",
    packaging: "20L / 50L / 200L Containers",
    moq: "200 Liters",
    img: IMG_LACQUER_THINNER,
    spec: "High Gloss Finishing | Furniture / Metal",
    description:
      "Fast-acting solvent blend formulated for lacquer systems, furniture coatings and industrial finishing applications.",
    applications: [
      "Furniture Finishing",
      "Metal Finishing",
      "Lacquer Coatings",
      "Spray Applications",
      "High Gloss Finishing",
    ],
  },

  {
    id: 27,
    name: "Furniture & Industrial Thinners",
    category: "Thinners & Paint Linings",
    cas: "Thinner-Gen",
    purity: "General Purpose Industrial Grade",
    packaging: "Loose / Drums / Cans",
    moq: "200 Liters",
    img: IMG_FURNITURE_THINNER,
    spec: "All-purpose blending | Loose / Drum / Can",
    description:
      "General-purpose solvent blend for furniture coatings, industrial paints and various coating formulation requirements.",
    applications: [
      "Furniture Coatings",
      "Industrial Paints",
      "Wood Finishing",
      "Metal Coatings",
      "General Solvent Applications",
    ],
  },

  {
    id: 28,
    name: "Oil-Based Paint",
    category: "Thinners & Paint Linings",
    cas: "Paint-Oil",
    purity: "Industrial & Decorative Grade",
    packaging: "1L / 4L / 20L Tins",
    moq: "20 Liters",
    img: IMG_OIL_PAINT,
    spec: "Industrial & Deco | 1L / 4L / 20L Tins",
    description:
      "Oil-based coating system suitable for industrial and decorative applications requiring durable surface protection and finish.",
    applications: [
      "Industrial Painting",
      "Metal Surfaces",
      "Wood Surfaces",
      "Decorative Coating",
      "Equipment Painting",
    ],
  },

  {
    id: 29,
    name: "Melamine Paint",
    category: "Thinners & Paint Linings",
    cas: "Melamine",
    purity: "Wood Finishing Grade",
    packaging: "1L / 4L / 20L Tins",
    moq: "20 Liters",
    img: IMG_MELAMINE,
    spec: "Wood Finish | High durability | 1L / 4L Tins",
    description:
      "Durable wood finishing coating designed to provide a smooth and protective surface for furniture and wood products.",
    applications: [
      "Furniture Finishing",
      "Wood Coating",
      "Cabinet Finishing",
      "Interior Woodwork",
      "Decorative Finishing",
    ],
  },

  {
    id: 30,
    name: "Lacquer Paint & Sealer",
    category: "Thinners & Paint Linings",
    cas: "Lacquer-Sealer",
    purity: "Premium Industrial Finishing Grade",
    packaging: "1L / 4L / 20L Containers",
    moq: "20 Liters",
    img: IMG_LACQUER_PAINT,
    spec: "Premium finish | Structural sealer | Industrial",
    description:
      "Lacquer-based coating and sealer system for premium surface finishing, protection and industrial applications.",
    applications: [
      "Furniture Finishing",
      "Wood Sealing",
      "Industrial Coating",
      "Metal Finishing",
      "Premium Surface Finishing",
    ],
  },

  {
    id: 31,
    name: "Deco Paint",
    category: "Thinners & Paint Linings",
    cas: "Deco-Paint",
    purity: "Decorative Grade",
    packaging: "1L / 4L / 20L Tins",
    moq: "20 Liters",
    img: IMG_DECO_PAINT,
    spec: "Decorative Grade | Interior / Exterior finish",
    description:
      "Decorative coating solution supplied for interior and exterior applications requiring attractive and durable surface finishing.",
    applications: [
      "Interior Painting",
      "Exterior Painting",
      "Decorative Finishing",
      "Commercial Buildings",
      "Industrial Premises",
    ],
  },
];

/* ============================================================
   IMAGE COMPONENT
============================================================ */

function ProductImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) {
          setImageSrc(FALLBACK_IMAGE);
        }
      }}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}

/* ============================================================
   PRODUCT DETAIL PAGE
============================================================ */

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    volume: "",
    note: "",
  });

  /* ==========================================================
     FIND PRODUCT
  ========================================================== */

  const product = useMemo(() => {
    const productId = Number(id);

    return MASTER_PRODUCTS.find((p) => p.id === productId);
  }, [id]);

  /* ==========================================================
     RELATED PRODUCTS
  ========================================================== */

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return MASTER_PRODUCTS.filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    ).slice(0, 3);
  }, [product]);

  /* ==========================================================
     SCROLL TOP WHEN PRODUCT CHANGES
  ========================================================== */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  /* ==========================================================
     INPUT CHANGE
  ========================================================== */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ==========================================================
     FORM SUBMIT
  ========================================================== */

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    setTimeout(() => {
      setFormSubmitted(false);

      setFormData({
        name: "",
        email: "",
        company: "",
        volume: "",
        note: "",
      });
    }, 4000);
  };

  /* ==========================================================
     INVALID PRODUCT
  ========================================================== */

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: T.ivory,
          color: T.ink,
          fontFamily: SANS,
        }}
      >
        <Navbar onGetQuote={() => {}} />

        <div
          style={{
            maxWidth: W,
            margin: "0 auto",
            padding: "180px 24px 120px",
            textAlign: "center",
          }}
        >
          <Boxes
            size={52}
            style={{
              color: T.accent,
              marginBottom: 20,
            }}
          />

          <h1
            style={{
              fontFamily: SERIF,
              fontSize: 44,
              fontWeight: 500,
              marginBottom: 12,
            }}
          >
            Product Not Found
          </h1>

          <p
            style={{
              color: T.muted,
              marginBottom: 30,
            }}
          >
            The requested material could not be found in our catalog.
          </p>

          <button
            onClick={() => navigate("/products")}
            style={{
              background: T.ink,
              color: T.white,
              border: "none",
              padding: "14px 24px",
              borderRadius: 10,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Return to Material Catalog
          </button>
        </div>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

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

        .spec-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          padding: 18px 0;
          border-bottom: 1px solid ${T.line};
        }

        .spec-label {
          font-size: 14px;
          color: ${T.muted};
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }

        .spec-val {
          font-family: ${MONO};
          font-size: 13px;
          font-weight: 600;
          color: ${T.ink};
          text-align: right;
          line-height: 1.5;
          max-width: 55%;
        }

        .app-chip {
          background: ${T.white};
          border: 1px solid ${T.line};
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 14px;
          color: ${T.ink2};
          font-weight: 500;
        }

        .input-node {
          width: 100%;
          padding: 14px 18px;
          border-radius: 10px;
          border: 1px solid ${T.line};
          background: ${T.ivory};
          font-family: ${SANS};
          font-size: 14px;
          color: ${T.ink};
          outline: none;
          transition: border 0.2s ease;
        }

        .input-node:focus {
          border-color: ${T.accent};
        }

        .input-node::placeholder {
          color: ${T.muted};
        }

        .rel-card {
          background: ${T.white};
          border: 1px solid ${T.line};
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 300ms ease;
          cursor: pointer;
          min-height: 220px;
        }

        .rel-card:hover {
          border-color: ${T.accent};
          transform: translateY(-4px);
          box-shadow: 0 18px 35px rgba(18,15,13,0.07);
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: ${T.muted};
          font-size: 14px;
          font-weight: 500;
          padding: 0;
        }

        .back-btn:hover {
          color: ${T.accent};
        }

        .quote-btn {
          width: 100%;
          background: ${T.ink};
          color: ${T.white};
          padding: 16px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 6px;
          font-family: ${SANS};
          transition: all 200ms ease;
        }

        .quote-btn:hover {
          background: ${T.accent};
        }

        @media (max-width: 950px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }

          .detail-side {
            position: static !important;
          }

          .main-product-image {
            height: 420px !important;
          }
        }

        @media (max-width: 650px) {
          .main-product-image {
            height: 300px !important;
            border-radius: 16px !important;
          }

          .product-title {
            font-size: 38px !important;
          }

          .spec-item {
            flex-direction: column;
            gap: 7px;
          }

          .spec-val {
            max-width: 100%;
            text-align: left;
          }

          .form-row {
            grid-template-columns: 1fr !important;
          }

          .technical-card,
          .quote-card {
            padding: 24px !important;
          }

          .app-chip {
            width: 100%;
          }
        }

      `}</style>

      {/* ======================================================
          NAVBAR
      ====================================================== */}

      <Navbar onGetQuote={() => {}} />

      {/* ======================================================
          BACK BUTTON
      ====================================================== */}

      <div
        style={{
          maxWidth: W,
          margin: "0 auto",
          padding: "140px 24px 20px",
        }}
      >
        <button
          className="back-btn"
          onClick={() => navigate("/products")}
        >
          <ArrowLeft size={16} />
          <span>Return to Material Catalog</span>
        </button>
      </div>

      {/* ======================================================
          MAIN PRODUCT SECTION
      ====================================================== */}

      <section
        style={{
          padding: "20px 0 100px",
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
            className="detail-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "64px",
              alignItems: "start",
            }}
          >
            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div>
              {/* IMAGE */}

              <div
                className="main-product-image"
                style={{
                  width: "100%",
                  height: "460px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: `1px solid ${T.line}`,
                  marginBottom: "40px",
                  background: T.ivory2,
                }}
              >
                <ProductImage
                  src={product.img}
                  alt={product.name}
                />
              </div>

              {/* CATEGORY */}

              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "11px",
                  color: T.accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                {product.category}
              </span>

              {/* PRODUCT NAME */}

              <h1
                className="product-title"
                style={{
                  fontFamily: SERIF,
                  fontSize: "48px",
                  fontWeight: 500,
                  color: T.ink,
                  margin: "0 0 20px",
                  lineHeight: "1.15",
                }}
              >
                {product.name}
              </h1>

              {/* PRODUCT SPEC */}

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: T.ivory2,
                  color: T.ink2,
                  fontFamily: MONO,
                  fontSize: 11,
                  marginBottom: 24,
                }}
              >
                <Layers size={13} />
                {product.spec}
              </div>

              {/* DESCRIPTION */}

              <p
                style={{
                  fontSize: "16px",
                  color: T.muted,
                  lineHeight: "1.7",
                  marginBottom: "40px",
                  maxWidth: "800px",
                }}
              >
                {product.description}
              </p>

              {/* APPLICATIONS */}

              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "24px",
                  fontWeight: 600,
                  marginBottom: "20px",
                }}
              >
                Target Engineering Sectors
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "50px",
                }}
              >
                {product.applications.map((app, index) => (
                  <span
                    key={index}
                    className="app-chip"
                  >
                    {app}
                  </span>
                ))}
              </div>

              {/* =================================================
                  SUPPLY HIGHLIGHTS
              ================================================= */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(180px,1fr))",
                  gap: 16,
                }}
              >
                {[
                  {
                    icon: <CheckCircle2 size={18} />,
                    title: "Certified Supply",
                    text: "Batch documentation available",
                  },
                  {
                    icon: <Truck size={18} />,
                    title: "Flexible Dispatch",
                    text: "Bulk and packaged delivery",
                  },
                  {
                    icon: <ShieldCheck size={18} />,
                    title: "B2B Support",
                    text: "Procurement assistance",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: T.white,
                      border: `1px solid ${T.line}`,
                      borderRadius: 14,
                      padding: 20,
                    }}
                  >
                    <div
                      style={{
                        color: T.accent,
                        marginBottom: 10,
                      }}
                    >
                      {item.icon}
                    </div>

                    <div
                      style={{
                        fontFamily: SERIF,
                        fontSize: 18,
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      {item.title}
                    </div>

                    <div
                      style={{
                        fontSize: 12.5,
                        color: T.muted,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div
              className="detail-side"
              style={{
                position: "sticky",
                top: "120px",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
              }}
            >
              {/* =================================================
                  TECHNICAL PARAMETERS
              ================================================= */}

              <div
                className="technical-card"
                style={{
                  background: T.white,
                  border: `1px solid ${T.line}`,
                  borderRadius: "20px",
                  padding: "36px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <ShieldCheck
                    size={20}
                    style={{ color: T.accent }}
                  />

                  <h3
                    style={{
                      fontFamily: SERIF,
                      fontSize: "22px",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    Technical Parameters
                  </h3>
                </div>

                <p
                  style={{
                    color: T.muted,
                    fontSize: 13,
                    lineHeight: 1.5,
                    marginBottom: 10,
                  }}
                >
                  Standard commercial specifications for procurement
                  reference.
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* CAS */}

                  <div className="spec-item">
                    <span className="spec-label">
                      <Layers
                        size={15}
                        style={{ color: T.accent }}
                      />
                      CAS Registry ID
                    </span>

                    <span className="spec-val">
                      {product.cas}
                    </span>
                  </div>

                  {/* PURITY */}

                  <div className="spec-item">
                    <span className="spec-label">
                      <Scale
                        size={15}
                        style={{ color: T.accent }}
                      />
                      Target Purity Grade
                    </span>

                    <span className="spec-val">
                      {product.purity}
                    </span>
                  </div>

                  {/* PACKAGING */}

                  <div className="spec-item">
                    <span className="spec-label">
                      <Truck
                        size={15}
                        style={{ color: T.accent }}
                      />
                      Dispatch Packaging
                    </span>

                    <span className="spec-val">
                      {product.packaging}
                    </span>
                  </div>

                  {/* MOQ */}

                  <div
                    className="spec-item"
                    style={{
                      borderBottom: "none",
                    }}
                  >
                    <span className="spec-label">
                      <FileText
                        size={15}
                        style={{ color: T.accent }}
                      />
                      Minimum Order Volume
                    </span>

                    <span
                      className="spec-val"
                      style={{
                        color: T.accent,
                      }}
                    >
                      {product.moq}
                    </span>
                  </div>
                </div>
              </div>

              {/* =================================================
                  QUOTE FORM
              ================================================= */}

              <div
                className="quote-card"
                style={{
                  background: T.ivory2,
                  borderRadius: "20px",
                  padding: "36px",
                  border: `1px solid ${T.line}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 5,
                  }}
                >
                  <Send
                    size={18}
                    style={{
                      color: T.accent,
                    }}
                  />

                  <h4
                    style={{
                      fontFamily: SERIF,
                      fontSize: "22px",
                      fontWeight: 600,
                      margin: 0,
                    }}
                  >
                    Contract Sourcing Desk
                  </h4>
                </div>

                <p
                  style={{
                    fontSize: "13.5px",
                    color: T.muted,
                    marginBottom: "24px",
                    lineHeight: 1.5,
                  }}
                >
                  Submit your requirement for this material and
                  our team will get back to you with availability,
                  pricing and delivery options.
                </p>

                {formSubmitted ? (
                  <div
                    style={{
                      background:
                        "rgba(74,107,83,0.1)",
                      border: `1px solid ${T.success}`,
                      color: T.success,
                      borderRadius: "12px",
                      padding: "24px",
                      textAlign: "center",
                    }}
                  >
                    <ShieldCheck
                      size={34}
                      style={{
                        margin: "0 auto 10px",
                        display: "block",
                      }}
                    />

                    <h5
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      Specification Request Logged
                    </h5>

                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      Our team will review your requirement and
                      contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleFormSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                    }}
                  >
                    {/* NAME + COMPANY */}

                    <div
                      className="form-row"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "14px",
                      }}
                    >
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        className="input-node"
                        value={formData.name}
                        onChange={handleInputChange}
                      />

                      <input
                        type="text"
                        name="company"
                        required
                        placeholder="Company Name"
                        className="input-node"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* EMAIL */}

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Corporate Email Address"
                      className="input-node"
                      value={formData.email}
                      onChange={handleInputChange}
                    />

                    {/* VOLUME */}

                    <input
                      type="text"
                      name="volume"
                      required
                      placeholder={`Required quantity e.g. ${product.moq}`}
                      className="input-node"
                      value={formData.volume}
                      onChange={handleInputChange}
                    />

                    {/* NOTE */}

                    <textarea
                      name="note"
                      rows={4}
                      placeholder="Tell us your delivery location, packaging requirement or any special specification..."
                      className="input-node"
                      style={{
                        resize: "vertical",
                        minHeight: 110,
                      }}
                      value={formData.note}
                      onChange={handleInputChange}
                    />

                    {/* SUBMIT */}

                    <button
                      type="submit"
                      className="quote-btn"
                    >
                      <span>
                        Request Lot Allocation Quote
                      </span>

                      <Send size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          RELATED PRODUCTS
      ====================================================== */}

      {relatedProducts.length > 0 && (
        <section
          style={{
            padding: "80px 0 120px",
            background: T.white,
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
            {/* HEADER */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "32px",
              }}
            >
              <Boxes
                size={22}
                style={{
                  color: T.accent,
                }}
              />

              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "28px",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Related Materials
              </h3>
            </div>

            {/* CARDS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: "24px",
              }}
            >
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="rel-card"
                  onClick={() =>
                    navigate(`/products/${p.id}`)
                  }
                >
                  {/* IMAGE */}

                  <div
                    style={{
                      width: "100%",
                      height: 150,
                      borderRadius: 10,
                      overflow: "hidden",
                      background: T.ivory2,
                    }}
                  >
                    <ProductImage
                      src={p.img}
                      alt={p.name}
                    />
                  </div>

                  {/* CAS */}

                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: "11px",
                      color: T.accent,
                    }}
                  >
                    CAS: {p.cas}
                  </div>

                  {/* NAME */}

                  <h4
                    style={{
                      fontFamily: SERIF,
                      fontSize: "22px",
                      fontWeight: 600,
                      margin: "-8px 0 0",
                    }}
                  >
                    {p.name}
                  </h4>

                  {/* DESCRIPTION */}

                  <p
                    style={{
                      fontSize: "13.5px",
                      color: T.muted,
                      lineHeight: "1.5",
                      margin: 0,
                    }}
                  >
                    {p.description.substring(0, 100)}
                    ...
                  </p>

                  {/* LINK */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: T.ink,
                      marginTop: "auto",
                    }}
                  >
                    <span>
                      Inspect Parameters
                    </span>

                    <ArrowUpRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />

      <WhatsAppButton />
    </div>
  );
}