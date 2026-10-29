-- Paddle compliance copy fixes for website_blog_posts (Phase 5 of the spec).
-- Safe to run before the deploy: it only rewrites text. Run once; it is
-- idempotent, so a second run changes nothing.
--
-- Back up first:
--   create table if not exists public.website_blog_posts_backup_20261029 as
--     select * from public.website_blog_posts;
--   alter table public.website_blog_posts_backup_20261029 enable row level security;

begin;

create or replace function pg_temp.fix_copy(t text) returns text language plpgsql as $$
declare s text := t;
begin
  if s is null then return null; end if;
  -- Framework footer
  s := replace(s, 'This is one of 47 direct response marketing frameworks Brandon Hensinger documented over 15 years inside the fertility industry, battle-tested across 100+ clinics.', 'This is one of 47 patient-conversion frameworks Brandon Hensinger documented from 15 years in the fertility industry.');
  s := replace(s, 'This is one of 47 direct response marketing frameworks Brandon Hensinger documented over 15 years inside the fertility industry ' || chr(8212) || ' battle-tested across 100+ clinics.', 'This is one of 47 patient-conversion frameworks Brandon Hensinger documented from 15 years in the fertility industry.');
  -- Closing CTA
  s := replace(s, 'See how Cima Growth Solutions closes the front-end gap for specialty clinics with GrowthOS:', 'See how GrowthOS closes the front-end gap for specialty clinics:');
  s := replace(s, 'See how Cima Growth Solutions closes the front-end gap for fertility clinics with GrowthOS:', 'See how GrowthOS closes the front-end gap for fertility clinics:');
  -- Posts where Cima is the subject
  s := replace(s, 'Cima Growth Solutions builds marketing infrastructure for fertility and regenerative medicine clinics.', 'GrowthOS is software that gives fertility and regenerative clinics this infrastructure.');
  s := replace(s, 'Cima Growth Solutions implements AI communication systems that respect', 'GrowthOS is a software platform with an AI communication layer that respects');
  s := replace(s, 'Cima Growth Solutions helps ', 'GrowthOS helps ');
  -- Author bio sentences
  s := replace(s, 'years of running marketing operations inside the fertility industry', 'years in the fertility industry');
  s := replace(s, 'years running marketing operations inside the fertility industry', 'years in the fertility industry');
  s := replace(s, 'years running marketing operations inside fertility medicine, across ', 'years in the fertility industry, working with ');
  s := replace(s, 'years running marketing operations inside fertility and specialty clinics', 'years in the fertility industry, working with fertility and specialty clinics');
  s := replace(s, 'years running marketing operations inside 100-plus fertility clinics', 'years in the fertility industry, working with 100-plus fertility clinics');
  s := replace(s, 'years running marketing operations inside fertility clinics', 'years in the fertility industry');
  s := replace(s, 'years running marketing operations inside fertility ' || chr(8212) || ' and', 'years in the fertility industry, and');
  s := replace(s, 'years running marketing operations across ', 'years in the fertility industry, working with ');
  s := replace(s, 'building marketing operations across ', 'working with ');
  s := replace(s, 'proprietary direct response marketing frameworks', 'proprietary patient-conversion frameworks');
  s := replace(s, 'proprietary direct response frameworks', 'proprietary patient-conversion frameworks');
  s := replace(s, 'direct response marketing frameworks', 'patient-conversion frameworks');
  s := replace(s, 'direct response frameworks', 'patient-conversion frameworks');
  s := replace(s, 'I audited a fertility clinic''s Google Ads account', 'I reviewed a fertility clinic''s Google Ads account');
  s := replace(s, 'dozens of split tests I ran inside fertility clinics', 'dozens of split tests I reviewed from fertility clinics');
  s := replace(s, 'an audit I ran inside a mid-size fertility clinic', 'an audit I reviewed from a mid-size fertility clinic');
  s := replace(s, 'the clinics I worked with directly', 'the clinics I observed directly');
  -- Global principles: the software, not Cima, does the work
  s := replace(s, 'Research across Cima-managed clinics shows', 'Research across GrowthOS clinic accounts shows');
  s := regexp_replace(s, 'Cima (exists|was built) to close', 'GrowthOS \1 to close', 'g');
  s := replace(s, 'where Cima operates', 'where GrowthOS operates');
  s := replace(s, 'GrowthOS runs a structured reactivation sequence', 'GrowthOS sends a structured follow-up sequence to patients who opted in');
  s := replace(s, 'handling segmentation, automated outreach, and engagement tracking', 'handling segmentation, consent-based follow-up, and engagement tracking');
  s := replace(s, 'running a continuous multivariate test on your behalf', 'running a continuous multivariate test for you');
  -- No em dashes (house rule)
  s := regexp_replace(s, '<h([1-6])>([A-Z]) ' || chr(8212) || ' ', '<h\1>\2: ', 'g');
  s := regexp_replace(s, '<h3>(Step [0-9]+( and [0-9]+)?) ' || chr(8212) || ' ', '<h3>\1: ', 'g');
  s := regexp_replace(s, '<h3>(Node [0-9]+: [A-Za-z]+) ' || chr(8212) || ' ', '<h3>\1: ', 'g');
  s := replace(s, '</strong> ' || chr(8212), '</strong>:');
  s := replace(s, ' ' || chr(8212) || ' ', ', ');
  s := replace(s, chr(8212), ', ');
  return s;
end $$;

update website_blog_posts set
  content = pg_temp.fix_copy(content),
  faq = case when faq is null then null else pg_temp.fix_copy(faq::text)::jsonb end,
  title = pg_temp.fix_copy(title),
  meta_title = pg_temp.fix_copy(meta_title),
  meta_description = pg_temp.fix_copy(meta_description),
  excerpt = pg_temp.fix_copy(excerpt);

update website_blog_posts set
  title = 'Healthcare Lead Conversion: Why More Leads Don''t Fix It | GrowthOS',
  meta_title = 'Healthcare Lead Conversion: Why More Leads Don''t Fix It | GrowthOS',
  meta_keywords = array_remove(meta_keywords, 'patient lead generation')
where slug = 'healthcare-lead-generation';

update website_blog_posts set
  title = 'Medical Lead Conversion Software: Turning Inquiries into Patients | GrowthOS',
  meta_title = 'Medical Lead Conversion Software: Turning Inquiries into Patients | GrowthOS',
  meta_keywords = array_remove(meta_keywords, 'patient lead generation')
where slug = 'medical-lead-generation';

commit;
