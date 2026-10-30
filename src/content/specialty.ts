// The GrowthOS specialty packs a visitor can view the site as. The site is
// fertility-first: the server always renders fertility, and the visitor's pick
// swaps fertility-specific wording on the client after hydration.

export type Specialty = "fertility" | "aesthetics" | "regenerative" | "wellness";

export const SPECIALTIES: { key: Specialty; label: string; short: string }[] = [
  { key: "fertility", label: "Fertility and IVF", short: "Fertility" },
  { key: "aesthetics", label: "Aesthetics and med spa", short: "Aesthetics" },
  { key: "regenerative", label: "Regenerative medicine", short: "Regenerative" },
  { key: "wellness", label: "Wellness and integrative", short: "Wellness" },
];

export const DEFAULT_SPECIALTY: Specialty = "fertility";
export const SPECIALTY_STORAGE_KEY = "cima_specialty";
export const SPECIALTY_PARAM = "for";

export const isSpecialty = (v: unknown): v is Specialty =>
  typeof v === "string" && SPECIALTIES.some((s) => s.key === v);

/** "patient" or "client" (aesthetics calls contacts Clients, matching the product). */
export const PERSON: Record<Specialty, { one: string; many: string; One: string; Many: string }> = {
  fertility: { one: "patient", many: "patients", One: "Patient", Many: "Patients" },
  aesthetics: { one: "client", many: "clients", One: "Client", Many: "Clients" },
  regenerative: { one: "patient", many: "patients", One: "Patient", Many: "Patients" },
  wellness: { one: "patient", many: "patients", One: "Patient", Many: "Patients" },
};

/** Landing pages that set the specialty when visited. */
export const LANDING_PAGE_SPECIALTY: Record<string, Specialty> = {
  "/fertility-clinic-marketing": "fertility",
  "/med-spa-marketing": "aesthetics",
  "/regenerative-medicine-marketing": "regenerative",
  "/wellness-marketing": "wellness",
};

/** Research sources allowed on non-fertility views. */
export const GENERAL_SOURCE_KEYS = ["hasvold"];

/**
 * Inline <head> script: hides the specialty regions before first paint when a
 * returning visitor's pick is not fertility, so they never see fertility copy
 * flash. Same resolution order as SpecialtyProvider. Removed by the provider
 * once it has resolved, or after 1.5 s as a safety net.
 */
export const SPECIALTY_PENDING_SCRIPT = `(function(){try{var k=${JSON.stringify(
  SPECIALTIES.map((s) => s.key),
)},m=${JSON.stringify(LANDING_PAGE_SPECIALTY)},v=null;try{v=new URLSearchParams(location.search).get(${JSON.stringify(
  SPECIALTY_PARAM,
)})}catch(e){}if(k.indexOf(v)<0){v=m[location.pathname.replace(/\\/+$/,"")]||null}if(k.indexOf(v)<0){try{v=localStorage.getItem(${JSON.stringify(
  SPECIALTY_STORAGE_KEY,
)})}catch(e){}}if(k.indexOf(v)>=0&&v!=="fertility"){var d=document.documentElement;d.dataset.svPending="1";setTimeout(function(){delete d.dataset.svPending},1500)}}catch(e){}})();`;
