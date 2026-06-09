// ---------------------------------------------------------------------------
// Your 6 projects. To use real work:
//   1. Drop each cover image in /public/projects/  (16:9 or 4:5, WebP/JPG)
//   2. Set `image` to "/projects/your-file.webp"
//   3. Update title, client, year, description, tags
// Until then, each card shows a branded gradient placeholder.
// ---------------------------------------------------------------------------

export type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  tags: string[];
  image?: string; // path under /public, e.g. "/projects/visioncare.webp"
  url?: string; // optional external case-study / live link
  accent: [string, string]; // gradient fallback colors
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Budweiser × The Weeknd — Starboy Edition",
    client: "Beverage",
    year: "2025",
    category: "Packaging & Art Direction",
    description:
      "Limited-edition bottle concept pairing Budweiser with The Weeknd's Starboy — vibrant neon art direction and a custom label crafted for a music-driven launch.",
    tags: ["Packaging", "Art Direction", "Product"],
    image: "/projects/Cerveza.png",
    accent: ["#ff2d78", "#7b2ff7"],
  },
  {
    id: "02",
    title: "Kellogg's Basilisk Bites — Cereal Packaging",
    client: "Food & Beverage",
    year: "2025",
    category: "Packaging",
    description:
      "A bold, illustrated cereal box concept for a fantasy-themed Kellogg's release — custom lettering, character art and a playful package system built to pop on shelf.",
    tags: ["Packaging", "Illustration", "Concept"],
    image: "/projects/cereal.jpg",
    accent: ["#1fb6a6", "#ff3b2f"],
  },
  {
    id: "03",
    title: "Old Spice × NFL — Retail Display",
    client: "Retail & CPG",
    year: "2026",
    category: "Retail / POS",
    description:
      "Point-of-sale display design for an Old Spice and NFL collaboration — a bold retail unit engineered to drive attention and conversions in-store.",
    tags: ["Retail Display", "POS", "Branding"],
    image: "/projects/NFL1.png",
    accent: ["#ff3b2f", "#ff7a18"],
  },
  {
    id: "04",
    title: "Walgreens × Reese's — Promo Campaign",
    client: "Retail & CPG",
    year: "2026",
    category: "Digital Advertising",
    description:
      "Digital retail campaign for a Reese's promotion on Walgreens — web banner and key visuals balancing appetite appeal with a clear, conversion-focused offer.",
    tags: ["Digital Ad", "Retail", "Web"],
    image: "/projects/DWA.png",
    accent: ["#ff7a18", "#ff3b2f"],
  },
  {
    id: "05",
    title: "AnimartHub — Web Platform",
    client: "Entertainment & Animation",
    year: "2025",
    category: "Web Design",
    description:
      "Website design for a platform connecting animation talent across Latin America — expressive identity, custom illustration and a clear, content-rich UI.",
    tags: ["Web Design", "UI/UX", "Branding"],
    image: "/projects/web.jpg",
    accent: ["#ff2d78", "#ff3b2f"],
  },
  {
    id: "06",
    title: "Agropeña — Social Media Content",
    client: "Agriculture & Organic",
    year: "2024",
    category: "Social Media",
    description:
      "Social content system for an organic poultry and food brand — recipe posts, campaign graphics and a consistent, appetizing visual language for Instagram.",
    tags: ["Social Media", "Content Design", "Branding"],
    image: "/projects/redes.jpg",
    accent: ["#ff7a18", "#ff2d78"],
  },
];
