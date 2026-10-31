-- Sitewide copy rewrite, Phase 6 (blog) for website_blog_posts in
-- growthos-production. Safe to run before or after the deploy: it only
-- rewrites text, and it is idempotent, so a second run changes nothing.
--
-- 6B (duplicate posts) needs no SQL: the two older slugs are in
-- src/content/blog-redirects.json, which 301s them and drops them from the
-- blog index, sitemap and related grids. Their rows stay so they can be restored.
--
-- Not edited on purpose: one-creative-79-percent-leads-fertility-campaign-data
-- ("In a tested fertility campaign, one single creative drove 79%"). Brandon
-- must confirm the data source first.
--
-- Back up first:
--   create table if not exists public.website_blog_posts_backup_20261030 as
--     select * from public.website_blog_posts;
--   alter table public.website_blog_posts_backup_20261030 enable row level security;

begin;

-- 6A. Shared framework block: the 47 Frameworks ebook offer becomes the
-- Leak Map. Checked 2026-10-30: this exact HTML is in all 153 rows that
-- mention 47 Frameworks (83 published and live).
update website_blog_posts set content = replace(
  content,
  '<p><strong>Get the complete 47 Frameworks ebook free:</strong> <a href="https://cimagrowth.com/47-frameworks">cimagrowth.com/47-frameworks</a></p>',
  '<p><strong>See where your clinic leaks:</strong> <a href="/growth">get your free Leak Map</a></p>'
)
where content like '%cimagrowth.com/47-frameworks%';

-- Any other link to the retired ebook page goes to the Leak Map.
update website_blog_posts set content = replace(replace(
  content,
  'https://cimagrowth.com/47-frameworks', '/growth'),
  'href="/47-frameworks"', 'href="/growth"')
where content like '%47-frameworks%';

-- All posts: /features merged into /product.
update website_blog_posts set content = replace(replace(
  content,
  'href="/features"', 'href="/product#features"'),
  'href="https://cimagrowth.com/features"', 'href="/product#features"')
where content like '%/features"%';

-- 6C. Post line edits.
update website_blog_posts set content = replace(
  content,
  'Research across GrowthOS clinic accounts shows a HIPAA badge placed near the submission button reduces form abandonment by approximately 15 percent.',
  'A visible HIPAA badge near the submit button can reduce form abandonment.'
)
where slug = 'patient-intake-software';

update website_blog_posts set
  title = replace(title, 'Why a HIPAA Badge Cuts Form Abandonment by 15%', 'Why a HIPAA Badge Can Cut Form Abandonment'),
  meta_title = replace(meta_title, 'Why a HIPAA Badge Cuts Form Abandonment by 15%', 'Why a HIPAA Badge Can Cut Form Abandonment'),
  content = replace(replace(
    content,
    'Why a HIPAA Badge Cuts Form Abandonment by 15%', 'Why a HIPAA Badge Can Cut Form Abandonment'),
    'The HIPAA badge placement alone, in documented testing across multiple clinic contexts, is worth',
    'The HIPAA badge placement alone is worth')
where slug = 'trust-stack-hipaa-badge-form-abandonment-fertility-clinics';

update website_blog_posts set content = replace(
  content,
  'The highest lifts, in the 60 to 90 percent range, appeared',
  'First-person button copy often lifts clicks noticeably. The highest lifts appeared'
)
where slug = 'first-person-ctas-fertility-clinic-button-copy';

update website_blog_posts set content = replace(
  content,
  'The $50K per month estimate is not hypothetical.',
  'The $50K per month figure is an illustrative model.'
)
where slug = 'meta-budget-by-awareness-stage-fertility-clinic-framework';

update website_blog_posts set content = replace(replace(
  content,
  'response within 60 seconds. By morning,', 'response in seconds, automatically. By morning,'),
  ' No leads fall through. No response windows expire.', '')
where slug = 'medspa-crm';

update website_blog_posts set content = replace(
  content,
  'dramatically improving patient experience and conversion',
  'designed to improve patient experience and conversion'
)
where slug = 'ai-communication-layer-responsible-patient-care';

update website_blog_posts set content = replace(replace(
  content,
  'Dr. Rivera''s team at Cima Fertility Center', 'Dr. Rivera''s team at her clinic'),
  'Cima Fertility Center', 'her clinic')
where slug = 'get-more-patient-reviews';
update website_blog_posts set content = replace(
  content,
  'Dr. Rivera''s team at Cima Fertility',
  'Dr. Rivera''s team at her clinic'
)
where slug = 'get-more-patient-reviews';

commit;

-- Check after running (every count should be 0):
--   select
--     count(*) filter (where content like '%47-frameworks%') as frameworks,
--     count(*) filter (where content like '%href="/features"%') as features_links,
--     count(*) filter (where title like '%by 15\%%' or meta_title like '%by 15\%%') as badge_15,
--     count(*) filter (where content like '%No leads fall through%') as no_leads,
--     count(*) filter (where content like '%Cima Fertility%') as cima_fertility
--   from website_blog_posts;
