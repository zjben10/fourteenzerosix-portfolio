// fourteenzerosix studios — content

const POTTERY = [
  { id: "p01", name: "Stoneware Mug",        form: "Mugs",    glaze: "Wood-ash",          year: 2026, dimensions: "4\u201d \u00d7 3.5\u201d",  price: "$58",  badge: "new",  color: "#E7C69E", form2: "Hand-thrown \u00b7 cone 10" },
  { id: "p02", name: "Tall Lipped Vase",     form: "Vases",   glaze: "Iron-saturate",     year: 2026, dimensions: "11\u201d \u00d7 5\u201d",    price: "$220", badge: null,   color: "#A56435", form2: "Wheel-thrown, altered" },
  { id: "p03", name: "Faceted Bowl, No. 12", form: "Bowls",   glaze: "Tenmoku",           year: 2024, dimensions: "6\u201d \u00d7 3\u201d",     price: "$84",  badge: null,   color: "#6F5950", form2: "Faceted, hand-trimmed" },
  { id: "p04", name: "Salt Cellar w/ Spoon", form: "Vessels", glaze: "Celadon",           year: 2024, dimensions: "3\u201d \u00d7 3\u201d",     price: "$42",  badge: null,   color: "#688662", form2: "Carved set" },
  { id: "p05", name: "Dinner Plate (matte)", form: "Plates",  glaze: "Matte oatmeal",     year: 2023, dimensions: "10\u201d \u00d7 1\u201d",    price: "$48",  badge: null,   color: "#E7C69E", form2: "Stoneware, dishwasher safe" },
  { id: "p06", name: "Moon Jar Study",       form: "Vases",   glaze: "Bone white",        year: 2026, dimensions: "9\u201d \u00d7 8\u201d",     price: "$340", badge: "new",  color: "#F2E2C5", form2: "Joined halves" },
  { id: "p07", name: "Speckled Tumbler",     form: "Mugs",    glaze: "Speckled stone",    year: 2024, dimensions: "4\u201d \u00d7 3\u201d",     price: "$44",  badge: null,   color: "#C9A57A", form2: "Set of one" },
  { id: "p08", name: "Wide Serving Bowl",    form: "Bowls",   glaze: "Ochre + ash",       year: 2023, dimensions: "12\u201d \u00d7 4\u201d",    price: "$165", badge: null,   color: "#A56435", form2: "Pulled foot" },
  { id: "p09", name: "Bud Vase, Trio",       form: "Vases",   glaze: "Sage-mat",          year: 2026, dimensions: "5\u201d \u00d7 2\u201d ea.", price: "$96",  badge: null,   color: "#688662", form2: "Set of three" },
  { id: "p10", name: "Pinched Sake Cup",     form: "Vessels", glaze: "Shino",             year: 2022, dimensions: "2.5\u201d \u00d7 2\u201d",   price: "$28",  badge: "sold", color: "#E7C69E", form2: "Pinched, glazed inside" },
  { id: "p11", name: "Coupe Plate, set 4",   form: "Plates",  glaze: "Smoke-fired",       year: 2024, dimensions: "8\u201d \u00d7 .8\u201d ea.",price: "$210", badge: null,   color: "#6F5950", form2: "Reduction fired" },
  { id: "p12", name: "Curved Pour Vessel",   form: "Vessels", glaze: "Iron-saturate",     year: 2026, dimensions: "7\u201d \u00d7 5\u201d",     price: "$140", badge: "new",  color: "#A56435", form2: "Spout pulled by hand" },
  { id: "p13", name: "Espresso Cup, pair",   form: "Mugs",    glaze: "Tenmoku rim",       year: 2022, dimensions: "2.5\u201d \u00d7 2.25\u201d",price: "$72",  badge: null,   color: "#282D2A", form2: "Stack of two" },
  { id: "p14", name: "Garden Planter",       form: "Vases",   glaze: "Raw stoneware",     year: 2023, dimensions: "10\u201d \u00d7 11\u201d",   price: "$190", badge: null,   color: "#C9A57A", form2: "Drainage hole" },
  { id: "p15", name: "Spoon Rest",           form: "Vessels", glaze: "Celadon",           year: 2022, dimensions: "6\u201d \u00d7 3\u201d",     price: "$24",  badge: null,   color: "#688662", form2: "Press-molded" },
  { id: "p16", name: "Low Vessel, No. 04",   form: "Bowls",   glaze: "Wood-ash drip",     year: 2024, dimensions: "8\u201d \u00d7 2.5\u201d",   price: "$118", badge: null,   color: "#E7C69E", form2: "Altered rim" },
];

const POTTERY_FILTERS = ["All", "2026", "2024", "2023", "2022"];

const MARKETING = [
  { id: "m1", year: "2025", title: "Brand refresh & launch",       client: "Hearth & Hand Studio",     role: "Brand strategy, identity, launch site", blurb: "Repositioned a Chicago candle maker for a new wholesale channel. Identity system, packaging, and a launch site that lifted DTC repeat rate 38%.", tags: ["Brand","Web","Strategy"], metric: "+38% repeat rate" },
  { id: "m2", year: "2025", title: "Seasonal campaign — Autumn glaze", client: "Field & Foundry Ceramics", role: "Creative direction, copy, paid social", blurb: "An eight-week campaign across email, Meta and a long-form lookbook. Carried a 3.4× ROAS through a 60-day window.", tags: ["Campaign","Copy","Paid"], metric: "3.4× ROAS" },
  { id: "m3", year: "2024", title: "Wholesale program launch",     client: "Smallhold Foods",          role: "Go-to-market, sales collateral",        blurb: "Built the playbook, deck, and onboarding system for a new wholesale channel. Closed 22 stockists in the first quarter.", tags: ["GTM","B2B"], metric: "22 new stockists" },
  { id: "m4", year: "2024", title: "Email & lifecycle overhaul",   client: "Ember Coffee Roasters",    role: "CRM strategy, copy, flow design",       blurb: "Rewrote a 22-step lifecycle program around moments of intent. Welcome-flow conversion doubled in eight weeks.", tags: ["CRM","Lifecycle"], metric: "2× welcome flow" },
  { id: "m5", year: "2024", title: "Studio rebrand & shop",        client: "Cedar + Clay",             role: "Identity, e-commerce, photo direction", blurb: "Rebuilt the visual system around the maker, not the product. Average order value rose 41% post-launch.", tags: ["Brand","E-comm"], metric: "+41% AOV" },
  { id: "m6", year: "2023", title: "Community zine, vol. 1",       client: "Self-published",           role: "Editorial, design, print production",   blurb: "A 64-page riso-printed zine on small-batch makers in the Midwest. Sold out a 500-copy run; vol. 2 in the kiln.", tags: ["Editorial","Print"], metric: "500 copies, sold out" },
];

const MARQUEE_WORDS = [
  "Handcrafted in Chicago",
  "Brand strategy",
  "Cone 10 reduction",
  "Made by one pair of hands",
  "Marketing &amp; pottery",
  "Open for commissions",
];

Object.assign(window, { POTTERY, POTTERY_FILTERS, MARKETING, MARQUEE_WORDS });
