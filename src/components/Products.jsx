// Kumar Chemicals — Product Data
// Replace `image` paths with real product photos once available.
// Structure kept flat + category-tagged so it can later be swapped for an API call.

export const categories = [
  {
    id: "industrial-chemicals",
    name: "Industrial Chemicals & Raw Materials",
    tagline: "Speciality chemicals sourced to your exact requirement",
  },
  {
    id: "solvents",
    name: "Solvents",
    tagline: "Industrial-grade solvents for every application",
  },
  {
    id: "etp",
    name: "ETP Chemicals & Solutions",
    tagline: "Treatment chemicals, plant setup & expert consultancy",
  },
  {
    id: "paints-thinners",
    name: "Paints, Thinners & Oils",
    tagline: "Paints, lacquers, thinners — loose, bottle or can packing",
  },
];

export const products = [
  // Industrial Chemicals & Raw Materials
  { id: "001", name: "Caustic Soda Lye", category: "industrial-chemicals", description: "High-purity caustic soda lye for industrial processing, available in bulk.", packaging: "As per requirement" },
  { id: "002", name: "Caustic Soda Flakes", category: "industrial-chemicals", description: "Industrial-grade caustic soda flakes for a wide range of applications.", packaging: "As per requirement" },
  { id: "003", name: "Soda Ash", category: "industrial-chemicals", description: "Sodium carbonate for detergent, glass, and chemical manufacturing.", packaging: "As per requirement" },
  { id: "004", name: "Sodium Sulphate (Glover Salt)", category: "industrial-chemicals", description: "Used widely in detergent and textile industries.", packaging: "As per requirement" },
  { id: "005", name: "Hydrogen Peroxide", category: "industrial-chemicals", description: "Industrial-grade hydrogen peroxide for bleaching and treatment processes.", packaging: "As per requirement" },
  { id: "006", name: "Hydrochloric Acid", category: "industrial-chemicals", description: "Standard industrial HCl for processing and pH control.", packaging: "As per requirement" },
  { id: "007", name: "Sulfamic Acid", category: "industrial-chemicals", description: "Used for cleaning, descaling, and industrial processing.", packaging: "As per requirement" },
  { id: "008", name: "Sulfuric Acid", category: "industrial-chemicals", description: "High-grade sulfuric acid for industrial applications.", packaging: "As per requirement" },
  { id: "009", name: "Nitric Acid", category: "industrial-chemicals", description: "Industrial nitric acid, supplied as per specification.", packaging: "As per requirement" },
  { id: "010", name: "Citric Acid", category: "industrial-chemicals", description: "Food and industrial-grade citric acid.", packaging: "As per requirement" },
  { id: "011", name: "Poly Aluminium Chloride (Liquid & Powder)", category: "industrial-chemicals", description: "Water treatment coagulant, available in liquid and powder form.", packaging: "As per requirement" },

  // Solvents
  { id: "012", name: "Isopropyl Alcohol (IPA)", category: "solvents", description: "High-purity IPA for pharma, electronics, and industrial cleaning.", packaging: "As per requirement" },
  { id: "013", name: "Ethyl Alcohol / Ethyl-based Solvents", category: "solvents", description: "Ethyl-based solvents for industrial formulations.", packaging: "As per requirement" },
  { id: "014", name: "Toluene", category: "solvents", description: "Industrial solvent used across paints, adhesives, and chemical processing.", packaging: "As per requirement" },
  { id: "015", name: "Liquid Acetone", category: "solvents", description: "Industrial-grade acetone for cleaning and formulation use.", packaging: "As per requirement" },
  { id: "016", name: "Liquid Acetyl", category: "solvents", description: "Acetyl-based solvent for industrial applications.", packaging: "As per requirement" },
  { id: "017", name: "Liquid Ethylene", category: "solvents", description: "Used in a range of industrial chemical processes.", packaging: "As per requirement" },
  { id: "018", name: "Liquid Butyl", category: "solvents", description: "Butyl-based solvent for rubber, plastics, and coatings industries.", packaging: "As per requirement" },

  // ETP Chemicals & Solutions
  { id: "019", name: "Colour Removal Chemicals", category: "etp", description: "Effective decolourisation agents for effluent treatment.", packaging: "As per requirement" },
  { id: "020", name: "Sludge Settlers / Coagulants", category: "etp", description: "Coagulant chemicals for sludge settling in ETP processes.", packaging: "As per requirement" },

  // Paints, Thinners & Oils
  { id: "021", name: "Oil Based Paint", category: "paints-thinners", description: "Industrial oil-based paints for general and specialised use.", packaging: "Loose, bottle & can" },
  { id: "022", name: "Melamine Paint", category: "paints-thinners", description: "Durable melamine paint finishes for furniture and industrial surfaces.", packaging: "Loose, bottle & can" },
  { id: "023", name: "Lacquer Paint", category: "paints-thinners", description: "High-finish lacquer paints for furniture and woodwork.", packaging: "Loose, bottle & can" },
  { id: "024", name: "Deco Paint", category: "paints-thinners", description: "Decorative-grade paint for interior and industrial finishing.", packaging: "Loose, bottle & can" },
  { id: "025", name: "NC Thinner", category: "paints-thinners", description: "Nitrocellulose thinner for furniture and industrial paint applications.", packaging: "Loose, bottle & can" },
  { id: "026", name: "Deco Thinner", category: "paints-thinners", description: "Thinner formulated for decorative paint applications.", packaging: "Loose, bottle & can" },
  { id: "027", name: "Sealer & Cleaning Thinners", category: "paints-thinners", description: "Sealants and cleaning-grade thinners for industrial use.", packaging: "Loose, bottle & can" },
  { id: "028", name: "Mineral Turpentine Oil (MTO)", category: "paints-thinners", description: "Standard MTO for paint thinning and industrial cleaning.", packaging: "Loose, bottle & can" },
  { id: "029", name: "Commercial Turpentine Oil", category: "paints-thinners", description: "Commercial-grade turpentine oil, supplied in bulk or packaged.", packaging: "Loose, bottle & can" },
  { id: "030", name: "Furniture & Industrial Thinners", category: "paints-thinners", description: "Full range of thinners for furniture and industrial applications.", packaging: "Loose, bottle & can" },
];

export const stats = [
  { value: "20+", label: "Years in Business" },
  { value: "30+", label: "Products & Solutions" },
  { value: "4.4/5", label: "Customer Rating" },
  { value: "15+", label: "Team Members" },
];

export const industries = [
  "Pharmaceuticals",
  "Paints & Coatings",
  "Textile",
  "Detergent & FMCG",
  "Rubber & Plastics",
  "Paper & Pulp",
];

export const testimonials = [
  { quote: "Quick response and consistent quality — we've been ordering for years.", name: "Vijay K.", location: "Goa" },
  { quote: "Reliable supplier for our turpentine oil requirements, every single time.", name: "Makardhwaj M.", location: "Delhi" },
  { quote: "Good quality IPA and dependable supply schedule.", name: "Shadab K.", location: "Bhopal" },
];