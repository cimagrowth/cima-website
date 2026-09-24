// Social profiles. The only social URLs the site links to.
export type SocialNetwork = "linkedin" | "instagram" | "x" | "youtube" | "tiktok";

export interface SocialProfile {
  network: SocialNetwork;
  label: string;
  url: string;
}

export const CIMA_SOCIAL: SocialProfile[] = [
  { network: "linkedin", label: "Cima on LinkedIn", url: "https://www.linkedin.com/company/cimagrowth/" },
  { network: "instagram", label: "Cima on Instagram", url: "https://www.instagram.com/cimagrowth/" },
];

export const BRANDON_SOCIAL: SocialProfile[] = [
  { network: "linkedin", label: "Brandon on LinkedIn", url: "https://www.linkedin.com/in/bhensinger" },
  { network: "instagram", label: "Brandon on Instagram", url: "https://www.instagram.com/bhensinger/" },
  { network: "x", label: "Brandon on X", url: "https://x.com/bhensinger" },
  { network: "youtube", label: "Brandon on YouTube", url: "https://www.youtube.com/@brandonhensinger" },
  { network: "tiktok", label: "Brandon on TikTok", url: "https://www.tiktok.com/@brandonhensinger" },
];

export const brandonProfile = (network: SocialNetwork) =>
  BRANDON_SOCIAL.find((p) => p.network === network)!;
