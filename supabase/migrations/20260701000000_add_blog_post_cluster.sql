-- Internal-linking pass: add a topic `cluster` tag to blog posts.
--
-- The blog-post template renders the hub/product callout and the "Read more"
-- (related posts) list from this tag. No post `content` HTML is modified.
-- Rollback: `update public.website_blog_posts set cluster = null;` or drop the column.

-- 1) Additive, safe: nullable column, no existing data touched.
alter table public.website_blog_posts
  add column if not exists cluster text;

-- 2) Tag all 42 posts (structured values only; content HTML untouched).
update public.website_blog_posts p
set cluster = v.cluster
from (values
  ('4u-subheadline-formula-fertility-clinic-marketing','fertility-copywriting'),
  ('5-hook-types-fertility-ads-that-convert','fertility-ads'),
  ('7-section-landing-page-fertility-clinic-conversion','fertility-conversion'),
  ('ai-communication-layer-responsible-patient-care','fertility-ops'),
  ('chaperon-indoctrination-sequence-fertility-clinic-email-automation','fertility-email'),
  ('direct-response-legends-fertility-clinic-content-rotation','fertility-copywriting'),
  ('ethical-urgency-fertility-marketing-without-manipulation','fertility-trust'),
  ('fertility-email-subject-line-formulas-framework-17','fertility-email'),
  ('google-ads-headline-architecture-fertility-clinics','fertility-ads'),
  ('healthcare-crm','healthcare-crm'),
  ('healthcare-crm-software','healthcare-crm'),
  ('hidden-cost-tool-sprawl-clinic-disorganization','fertility-ops'),
  ('hook-story-offer-email-framework-fertility-clinics','fertility-email'),
  ('hope-framework-ethical-automation-fertility-clinics','fertility-trust'),
  ('hopkins-framework-replace-vague-claims-fertility-marketing','fertility-copywriting'),
  ('how-to-fill-your-calendar-even-if-your-marketing-feels-broken','fertility-leakage'),
  ('kennedys-message-market-media-triangle-fertility-clinics','fertility-copywriting'),
  ('kennedys-sales-letter-structure-fertility-clinic-acquisition-stack','fertility-copywriting'),
  ('loss-aversion-fertility-clinic-patient-acquisition','fertility-trust'),
  ('med-spa-marketing','med-spa'),
  ('medical-practice-marketing','medical-practice'),
  ('medical-spa-marketing','med-spa'),
  ('myth-of-more-leads-marketing-infrastructure','fertility-ops'),
  ('niaw-2026-fertility-clinic-growth-guide','fertility-ops'),
  ('ogilvys-specificity-rules-fertility-clinic-headlines','fertility-copywriting'),
  ('one-creative-79-percent-leads-fertility-ad-testing','fertility-ads'),
  ('pastor-framework-fertility-email-conversion','fertility-email'),
  ('patient-acquisition-strategies','patient-acquisition'),
  ('patient-engagement-platform','patient-engagement'),
  ('patient-engagement-solutions','patient-engagement'),
  ('patients-do-respond-debunking-unreachable-lead-myth','fertility-leakage'),
  ('quality-score-keyword-ad-alignment-fertility-clinics','fertility-ads'),
  ('quiz-funnels-fertility-clinic-patient-conversion','fertility-conversion'),
  ('sms-98-percent-open-rate-fertility-clinic-patient-engagement','fertility-channels'),
  ('soap-opera-sequence-fertility-email-nurture','fertility-email'),
  ('social-proof-hierarchy-fertility-marketing','fertility-trust'),
  ('the-13-hour-patient-fertility-clinic-patient-leakage','fertility-leakage'),
  ('the-50k-revenue-leak-speed-to-lead-fertility-clinic','fertility-leakage'),
  ('trust-stack-hipaa-badge-form-abandonment-fertility-clinics','fertility-trust'),
  ('weekend-planning-clinic-success','fertility-ops'),
  ('why-your-clinic-loses-40-percent-of-inquiries','fertility-leakage'),
  ('zeigarnik-effect-fertility-clinic-patient-inquiry','fertility-email')
) as v(slug, cluster)
where p.slug = v.slug;
