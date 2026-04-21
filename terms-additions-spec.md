# Terms of Service — Additive Updates Spec

## ⚠️ Critical rule — read before anything else

The existing `/terms` page on cimagrowth.com contains the Terms of Service and Master Services Agreement for GrowthOS. That content **must be preserved verbatim**. This spec only ADDS two new subsections (6A and 11A) that strengthen the agreement in areas the current terms don't cover:

- **6A** — explicit client ownership of third-party advertising accounts
- **11A** — Acceptable Use Policy for advertising content

This spec never rewrites, reorders, consolidates, or deletes existing content. It never renumbers existing sections. If unsure whether a change counts as additive or destructive, choose additive.

There is one permitted edit to pre-existing content: the "This Agreement is effective as of…" language in the introduction does NOT need changing (it's perpetual language), but if there is a visible "Last Updated" date anywhere on the page, update it in place to April 2026. If there is no such date on the page, do not add one.

---

## Step 1 — Locate and read the page

```bash
# Find the terms page file
find app/terms src/app/terms -name "page.tsx" -o -name "page.mdx" -o -name "page.md" 2>/dev/null

# If terms renders via a view file like privacy does, find that too
grep -rln "Terms of Service\|Master Services Agreement" --include="*.tsx" --include="*.mdx" app src/app src/views 2>/dev/null
```

**Before any edits, read the file end to end.** Then report back:

1. Path to the terms page file and, if applicable, the view file it renders.
2. The format (`.tsx` with inline JSX, `.mdx`, data array, etc.).
3. The numbering style used for sections and subsections (e.g., `## 6. ...`, `### 6.1 ...`, or similar).
4. Whether the existing page uses any shared heading components, link components, or specific className patterns.
5. The exact text of the headings for Section 6 ("GrowthOS Advertising Management Services") and Section 11 ("User Content and Compliance"). Report verbatim.
6. Whether there is any visible "Last Updated" or effective-date line, and its current value.

**Do not edit anything until you have reported back and the user has confirmed.**

---

## Step 2 — Insertion rules

1. **Never modify existing text.** Every existing paragraph and section stays byte-for-byte identical.
2. **Insert at the end of Section 6 and the end of Section 11** respectively — after the last paragraph of the parent section, before the next numbered section begins.
3. **Number as 6A and 11A** to avoid any renumbering downstream. If the file's numbering style uses a different convention (e.g., `6.1` for subsections instead of `6A`), adapt to match — the goal is that the insertion looks native to the document's existing pattern, and that no existing heading numbers change.
4. **Match the file's syntax exactly.** If the existing page uses `## 6. Heading` with `###` subsections, use the same. If it's `<h2>` / `<h3>` JSX, use the same. Do not introduce a new format.
5. **Match existing typography.** If headings use raw tags, use raw tags. If they use a shared component, use that component. Do not introduce inline `style={{ fontFamily }}` overrides or new classNames.
6. **Match existing paragraph and list conventions.** If the existing page uses `<p>` tags explicitly, use them. If it relies on the `prose` wrapper and bare text, match that. For bullet lists, use the same `<ul>` / `<li>` markup the surrounding sections use.

---

## Content blocks

Insert both blocks exactly as written below. Section headings are provided; formatting them as subsection headings (e.g., `### 6A. Client Ownership…`) should match whatever pattern the existing page uses for subsections within numbered sections.

### Block 6A — Insert at the end of Section 6 ("GrowthOS Advertising Management Services")

Heading: **6A. Client Ownership of Advertising Accounts**

Client owns all right, title, and interest in and to Client's accounts on Advertising Platforms (including Meta Business Manager, Facebook Pages, Instagram Business accounts, Google Ads accounts, Google Merchant Center, TikTok Ads Manager, and any similar third-party advertising accounts), whether those accounts existed prior to Client's engagement with Company or were created on Client's behalf during the engagement.

Company does not and will not claim ownership of Client's advertising accounts, advertising data, customer audiences, pixels, conversion events, or related third-party assets. All such assets remain the property of Client at all times.

Upon termination of this Agreement for any reason, Client may revoke Company's access to Advertising Platform accounts through the applicable platform's access controls (for example, Facebook Business Integrations or Google Ads account user management), and Company shall, upon written request, promptly remove any administrative access Company holds to Client's accounts. Company shall retain only such data as is required by law, as is necessary for legitimate recordkeeping, or as exists in routine system backups, consistent with the Company's Privacy Policy.

Nothing in this Section grants Company any license or right to use Client's Advertising Platform accounts, audiences, or data for any purpose other than providing the Services to Client.

### Block 11A — Insert at the end of Section 11 ("User Content and Compliance")

Heading: **11A. Acceptable Use Policy**

Without limiting Section 11, Client agrees that Client will not use the Services — and will not submit, generate, publish, or run advertisements through the Services — that:

- Violate the advertising policies, community standards, or terms of service of any Advertising Platform, including Meta Advertising Policies, Google Ads policies, TikTok Ads policies, or any other third-party platform used to deliver the advertisements;
- Make unsubstantiated health, medical, fertility, cosmetic, or outcome-related claims, including guarantees of pregnancy, treatment success, weight loss, or similar patient outcomes;
- Use before-and-after imagery, testimonials, or endorsements in a manner prohibited by the FTC Endorsement Guides, state medical board regulations, or Advertising Platform policies;
- Target minors or use content directed at minors in connection with medical, fertility, aesthetic, wellness, or regenerative services;
- Promote services that Client is not legally authorized to provide in the jurisdictions being targeted;
- Contain false, misleading, deceptive, or unsubstantiated statements about Client's services, competitors, or third parties;
- Infringe any third party's intellectual property, publicity, or privacy rights, including unauthorized use of patient photographs, testimonials, or identifying information;
- Violate HIPAA, state health information privacy laws, the Telephone Consumer Protection Act (TCPA), the CAN-SPAM Act, state anti-spam or telemarketing laws, or any other applicable law;
- Constitute spam, bulk unsolicited messaging, or messaging to recipients who have not provided appropriate consent;
- Impersonate any person or organization, or misrepresent Client's affiliation with any person or organization;
- Attempt to circumvent, disable, or interfere with security, authentication, rate-limiting, or access-control features of the Services;
- Reverse engineer, decompile, scrape, or extract data from the Services except as expressly permitted; or
- Use the Services to build a competing product or service.

Company may, in its sole discretion and without liability, refuse to run, pause, remove, or decline to submit to Advertising Platforms any content that Company reasonably believes violates this Acceptable Use Policy or any Advertising Platform policy. Client remains solely responsible for all content Client submits or causes to be published through the Services, and Client shall indemnify Company in accordance with Section 18 for any claim, fine, penalty, or action arising from Client's violation of this Section.

---

## DO NOT

- **DO NOT delete, rewrite, reword, shorten, consolidate, or reorder any existing content on the terms page.** Adding only.
- **DO NOT renumber any existing section.** All insertions are 6A and 11A — never touch the numbers 7 through 22 or any existing subsection numbers.
- **DO NOT change the page URL.** It stays at `/terms`. Meta and Google App Review reference this URL.
- **DO NOT introduce inline styling** (e.g., `style={{ fontFamily }}`) unless the existing page already uses that exact pattern.
- **DO NOT add a "Last Updated" line if the page does not already have one.** Only update it in place if it already exists.
- **DO NOT change the contact email, governing law, or any substantive business term** that already appears in the document.
- **DO NOT split Block 6A or Block 11A into multiple subsections.** Each block is one self-contained subsection with one heading.
- **DO NOT guess on numbering style.** If Section 6 currently uses `### 6.1` subsections, report that back before inserting so the user can confirm whether to use `6A` or `6.6` or similar.

---

## Acceptance criteria

1. Every pre-existing paragraph, section heading, and section number on the terms page is intact, byte-for-byte.
2. Block 6A is inserted at the end of Section 6, formatted as a subsection, using the file's existing conventions for subsections.
3. Block 11A is inserted at the end of Section 11, formatted the same way.
4. The existing Sections 7 through 22 still carry their original numbers — none have been shifted.
5. If a "Last Updated" line exists on the page, it shows April 2026. If no such line exists, nothing has been added.
6. `/terms` renders at `https://cimagrowth.com/terms` without hydration warnings, broken layout, or missing components.
7. The diff of the terms page shows ONLY the two added subsections (and optionally the Last Updated line) — no edits to existing paragraphs, no number changes.

---

## If you hit a dead end

- **Section 6 uses `### 6.1`, `### 6.2` subsection numbering instead of nothing** — adapt Block 6A's heading to be the next integer subsection (e.g., `### 6.N Client Ownership of Advertising Accounts` where N is the next unused number). Same for Block 11A in Section 11.
- **Terms page is MDX with frontmatter** — insert new subsections in MDX using the same heading syntax the rest of the page uses. Leave the frontmatter untouched.
- **Terms page is rendered from a data array** (e.g., array of `{ heading, body }` objects) — append new objects to the appropriate parent section's array at the correct position so they render at the end of Section 6 / Section 11 respectively.
- **Section 6 has no clear "end" because its last paragraph flows into Section 7 visually** — insert Block 6A immediately before the `Section 7` heading, which by definition is the end of Section 6. Same principle for Block 11A before Section 12.
