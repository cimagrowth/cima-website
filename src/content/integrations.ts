// EHR and practice systems that may be named publicly, in this order.
// Always follow the list with ANY_EHR_LINE. Use exactly these names.
export const EHR_SYSTEMS = [
  "ModMed",
  "Bloomic",
  "Artisan",
  "VRepro",
  "SIGHA",
  "MedITEX",
  "Veracity",
  "Tebra",
  "IMS",
  "nAble",
  "OptiMantra",
  "Solux",
] as const;

export const ANY_EHR_LINE = "Don't see yours? We build the interface to any EHR.";

/** CRMs GrowthOS works with. The first three are emphasized wherever they are listed. */
export const PRIMARY_CRMS = ["Salesforce", "HubSpot", "GoHighLevel"] as const;
export const OTHER_CRMS = ["Zoho", "Keap"] as const;
