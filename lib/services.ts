export type Service = {
  title: string;
  description: string;
  items: string[];
};

export const services: Service[] = [
  {
    title: "Brand Identity",
    description:
      "Logos, visual systems and guidelines that give your brand a clear, ownable voice.",
    items: ["Logo & Marks", "Visual Systems", "Brand Guidelines", "Naming"],
  },
  {
    title: "Product & UI/UX",
    description:
      "Interfaces and digital products designed around real people and business goals.",
    items: ["UI Design", "UX Strategy", "Prototyping", "Design Systems"],
  },
  {
    title: "Web Design & Front-End",
    description:
      "Responsive, animated websites — designed and built to perform on any device.",
    items: ["Web Design", "Front-End Dev", "Animation", "Performance"],
  },
  {
    title: "Marketing & Content",
    description:
      "Campaigns, social content and visual storytelling that connect and convert.",
    items: ["Campaigns", "Social Content", "Art Direction", "AI Workflows"],
  },
];
