// ---------------------------------------------------------------------------
// Global site configuration — edit these values to update contact + socials.
// ---------------------------------------------------------------------------

export type HeroWord = {
  text: string;
  font: "sans-black" | "serif-italic";
  gradient?: boolean;
};

export const site = {
  name: "Edgar Millán",
  fullName: "Edgar Muñoz Millán",
  role: "Visual Communication Designer",
  tagline: "Creating brands, stories, and experiences that matter.",

  // Small kicker shown above the big headline.
  heroKicker: "Edgar Millán",

  // Big creative hero headline. Each line is an array of word tokens so titles
  // can mix typefaces: `sans-black` = Mundial heavy, `serif-italic` = the
  // expressive serif. Set `gradient: true` to paint a word in the brand gradient.
  heroHeadlineLines: [
    [
      { text: "Designing", font: "sans-black" },
      { text: "ideas", font: "serif-italic" },
    ],
    [
      { text: "worth", font: "sans-black" },
      { text: "remembering", font: "serif-italic", gradient: true },
    ],
  ] as HeroWord[][],

  // Short hero bio (under the headline).
  heroBio:
    "Visual communication designer crafting brands, visual systems and digital experiences that connect — clearly and memorably.",

  // Optional moving background video for the hero.
  // Drop an MP4 in /public (e.g. /hero.mp4), then set heroVideo: "/hero.mp4".
  // Leave empty to use the animated gradient aurora instead.
  heroVideo: "",
  heroVideoPoster: "",
  email: "edmiwork@gmail.com",
  cvUrl: "/edgar-millan-cv.pdf", // TODO: drop your CV here -> public/edgar-millan-cv.pdf

  // Contact form: create a free form at https://web3forms.com and paste the
  // access key here. Leave empty to fall back to a mailto: link.
  web3formsKey: "5261643e-cdf8-4d7d-a46f-6fecfa6cca7a",

  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/edmiwork" },
    { label: "Behance", url: "https://www.behance.net/edmiwork" },
    { label: "GitHub", url: "https://github.com/edmiwork" },
  ],
};

export const withBase = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
