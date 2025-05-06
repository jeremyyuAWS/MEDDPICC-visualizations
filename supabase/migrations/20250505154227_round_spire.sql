/*
  # Seed sample data for development and demos

  1. Overview
     - Creates sample users, meetings, analyses, and related data
     - Uses fixed UUIDs for predictable relationships
     - Bypasses RLS for seeding purposes

  2. Sample Data Created
     - 3 sample users
     - 5 sample meetings
     - 5 sample analyses with MEDDPICC components
     - Sample enrichment tags and follow-up questions
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Sample Users
-- Note: Using fixed UUIDs for predictable references
DO $$
BEGIN
  INSERT INTO auth.users (id, email)
  VALUES 
    ('11111111-1111-1111-1111-111111111111', 'john@example.com'),
    ('22222222-2222-2222-2222-222222222222', 'sarah@example.com'),
    ('33333333-3333-3333-3333-333333333333', 'alex@example.com')
  ON CONFLICT (id) DO NOTHING;

  -- Insert into public.users table
  INSERT INTO public.users (id, email, full_name, organization_id, created_at, updated_at)
  VALUES 
    ('11111111-1111-1111-1111-111111111111', 'john@example.com', 'John Smith', 'acme-corp', NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', 'sarah@example.com', 'Sarah Johnson', 'tech-solutions', NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333', 'alex@example.com', 'Alex Wilson', 'global-systems', NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Sample Meetings
INSERT INTO public.meetings (id, user_id, title, notes, meeting_date, created_at, updated_at)
VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'Acme Corp Initial Meeting', 
   'Met with Jane Doe, CFO. They''re looking to save $100K per month on their current solution. They use AWS and Salesforce. Legal approval takes 3 weeks, then it goes to the CFO for final signoff. Their pain is related to compliance delays. John from IT is our internal champion.', 
   NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
   
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'TechCorp Follow-up', 
   'Met with Mark (CTO) and financial team. They want to reduce onboarding time from 6 weeks to 2 weeks. Current process costs them about $50K per hire in lost productivity. Decision requires approval from procurement and then the executive committee. Legal review takes about 10 days. Susan from operations is helping champion this internally.', 
   NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days'),
   
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'Global Systems Discovery', 
   'Call with Robert (CEO) and his team. They''re experiencing 30% customer churn due to slow response times. Current system can''t scale and they lose approximately $200K monthly in churned revenue. Any purchase over $50K needs board approval. They use GCP and HubSpot. Maria from Customer Success would be our internal advocate.', 
   NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
   
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'Innovate Inc Technical Review', 
   'Technical deep dive with their engineering team. They currently spend 40 hours per week on manual reconciliation, costing roughly $15K monthly. They need any solution to integrate with their existing Azure infrastructure. Security review takes 4 weeks. CTO makes financial decisions up to $100K. Tom from engineering likes our solution and offered to help get it approved.', 
   NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
   
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 'NextGen Solutions Initial Discussion', 
   'Intro call with Patricia (COO). They need to reduce reporting time from 5 days to 1 day per month. Current process involves 3 full-time staff at $75K each annually. Decision process involves a steering committee and final sign-off from the CFO. They''re already evaluating two competitors. David from finance would be our internal champion.', 
   NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day');

-- Sample Analyses
INSERT INTO public.analyses (id, meeting_id, user_id, overall_score, max_score, score_percentage, email_draft, created_at)
VALUES
  ('11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 
   16, 21, 76, 
   'Hi Jane,\n\nThank you for our meeting today. Based on your goal of saving $100K per month and improving compliance processes, I believe we can help significantly.\n\nI''d like to understand more about your current compliance delays and how they impact your business. Would you be available for a follow-up call next week?\n\nBest regards,', 
   NOW() - INTERVAL '7 days'),
   
  ('22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 
   14, 21, 67, 
   'Hi Mark,\n\nThanks for the productive meeting with your financial team. I appreciate you sharing the challenges around your current onboarding process.\n\nBased on your goal of reducing onboarding time from 6 weeks to 2 weeks, I believe our solution could save you approximately $50K per new hire.\n\nI''d like to schedule a technical review with your team next week. Would Wednesday or Thursday work for you?\n\nBest regards,', 
   NOW() - INTERVAL '5 days'),
   
  ('33333333-cccc-cccc-cccc-cccccccccccc', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 
   18, 21, 86, 
   'Hi Robert,\n\nThanks for sharing your challenges around customer churn and response times. A 30% churn rate resulting in $200K monthly revenue loss is significant, and I''m confident we can help address this.\n\nI understand that board approval will be needed for this purchase. To prepare for this, I''d like to help you build a solid business case showing ROI and implementation timeline.\n\nWould you be available for a follow-up call next Tuesday to discuss next steps?\n\nBest regards,', 
   NOW() - INTERVAL '3 days'),
   
  ('44444444-dddd-dddd-dddd-dddddddddddd', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 
   12, 21, 57, 
   'Hi Team,\n\nThank you for the technical deep dive today. I understand your challenges with the manual reconciliation process costing about $15K monthly.\n\nRegarding your Azure integration requirements, I''d like to arrange a call with our integration specialists to ensure we can meet your specific needs. I also understand your security review process takes 4 weeks, so we should factor that into our timeline.\n\nCould we schedule a technical integration discussion next week?\n\nBest regards,', 
   NOW() - INTERVAL '2 days'),
   
  ('55555555-eeee-eeee-eeee-eeeeeeeeeeee', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 
   15, 21, 71, 
   'Hi Patricia,\n\nThank you for sharing your reporting challenges with me today. Reducing the reporting time from 5 days to 1 day would certainly free up significant resources for your team.\n\nI understand you''re already evaluating other solutions. I''d love to understand what specific criteria you''re using to make your decision and how we can best demonstrate our unique value proposition.\n\nWould you be open to a demonstration focused specifically on your reporting challenges next week?\n\nBest regards,', 
   NOW() - INTERVAL '1 day');

-- Sample MEDDPICC Components
-- For first analysis (Acme Corp)
INSERT INTO public.meddpicc_components (id, analysis_id, component_type, name, description, score, text, confidence, citation, created_at)
VALUES
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'metrics', 'Metrics', 'Quantifiable benefits and ROI that the solution will deliver', 
   3, 'They''re looking to save $100K per month on their current solution.', 0.92, 'They''re looking to save $100K per month on their current solution.', NOW()),
   
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'economicBuyer', 'Economic Buyer', 'The person with financial authority to make the purchase decision', 
   3, 'Jane Doe, CFO.', 0.95, 'Met with Jane Doe, CFO.', NOW()),
   
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'decisionCriteria', 'Decision Criteria', 'The formal criteria used to evaluate and select a solution', 
   2, 'Compliance improvements and cost savings seem to be key criteria.', 0.83, 'Their pain is related to compliance delays.', NOW()),
   
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'decisionProcess', 'Decision Process', 'The steps and timeline for making the purchase decision', 
   3, 'Legal approval takes 3 weeks, then CFO signoff.', 0.91, 'Legal approval takes 3 weeks, then it goes to the CFO for final signoff.', NOW()),
   
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'paperProcess', 'Paper Process', 'The procurement, legal, and administrative process for finalizing the deal', 
   2, 'Legal approval process mentioned but without full details.', 0.85, 'Legal approval takes 3 weeks.', NOW()),
   
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'identifyPain', 'Identify Pain', 'The specific business challenges or pain points driving the purchase', 
   3, 'Pain is related to compliance delays.', 0.93, 'Their pain is related to compliance delays.', NOW()),
   
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'champion', 'Champion', 'An internal advocate who actively supports your solution', 
   2, 'John from IT is our internal champion.', 0.80, 'John from IT is our internal champion.', NOW());

-- For second analysis (TechCorp)
INSERT INTO public.meddpicc_components (id, analysis_id, component_type, name, description, score, text, confidence, citation, created_at)
VALUES
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'metrics', 'Metrics', 'Quantifiable benefits and ROI that the solution will deliver', 
   3, 'Reduce onboarding time from 6 weeks to 2 weeks, saving $50K per hire.', 0.94, 'They want to reduce onboarding time from 6 weeks to 2 weeks. Current process costs them about $50K per hire in lost productivity.', NOW()),
   
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'economicBuyer', 'Economic Buyer', 'The person with financial authority to make the purchase decision', 
   2, 'Met with Mark (CTO) and financial team, but economic buyer not clearly identified.', 0.75, 'Met with Mark (CTO) and financial team.', NOW()),
   
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'decisionCriteria', 'Decision Criteria', 'The formal criteria used to evaluate and select a solution', 
   1, 'Reducing onboarding time is important, but formal evaluation criteria not discussed.', 0.60, 'They want to reduce onboarding time from 6 weeks to 2 weeks.', NOW()),
   
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'decisionProcess', 'Decision Process', 'The steps and timeline for making the purchase decision', 
   3, 'Decision requires approval from procurement and then the executive committee.', 0.90, 'Decision requires approval from procurement and then the executive committee.', NOW()),
   
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'paperProcess', 'Paper Process', 'The procurement, legal, and administrative process for finalizing the deal', 
   2, 'Legal review takes about 10 days.', 0.88, 'Legal review takes about 10 days.', NOW()),
   
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'identifyPain', 'Identify Pain', 'The specific business challenges or pain points driving the purchase', 
   2, 'Long onboarding time causing lost productivity.', 0.85, 'Current process costs them about $50K per hire in lost productivity.', NOW()),
   
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'champion', 'Champion', 'An internal advocate who actively supports your solution', 
   3, 'Susan from operations is helping champion this internally.', 0.92, 'Susan from operations is helping champion this internally.', NOW());

-- Add MEDDPICC Components for remaining analyses similarly
-- For third analysis (Global Systems)
INSERT INTO public.meddpicc_components (id, analysis_id, component_type, name, description, score, text, confidence, citation, created_at)
VALUES
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'metrics', 'Metrics', 'Quantifiable benefits and ROI that the solution will deliver', 
   3, '30% customer churn resulting in $200K monthly revenue loss.', 0.96, 'They''re experiencing 30% customer churn due to slow response times. Current system can''t scale and they lose approximately $200K monthly in churned revenue.', NOW()),
   
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'economicBuyer', 'Economic Buyer', 'The person with financial authority to make the purchase decision', 
   3, 'Robert (CEO) appears to be the economic buyer, with board approval required for large purchases.', 0.89, 'Call with Robert (CEO) and his team. Any purchase over $50K needs board approval.', NOW()),
   
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'decisionCriteria', 'Decision Criteria', 'The formal criteria used to evaluate and select a solution', 
   3, 'Reducing customer churn and improving response times are key criteria.', 0.90, 'They''re experiencing 30% customer churn due to slow response times.', NOW()),
   
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'decisionProcess', 'Decision Process', 'The steps and timeline for making the purchase decision', 
   3, 'Any purchase over $50K needs board approval.', 0.94, 'Any purchase over $50K needs board approval.', NOW()),
   
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'paperProcess', 'Paper Process', 'The procurement, legal, and administrative process for finalizing the deal', 
   2, 'Board approval process mentioned but without detail on legal or procurement steps.', 0.70, 'Any purchase over $50K needs board approval.', NOW()),
   
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'identifyPain', 'Identify Pain', 'The specific business challenges or pain points driving the purchase', 
   3, 'System can''t scale causing slow response times and high customer churn.', 0.95, 'They''re experiencing 30% customer churn due to slow response times. Current system can''t scale.', NOW()),
   
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'champion', 'Champion', 'An internal advocate who actively supports your solution', 
   3, 'Maria from Customer Success would be our internal advocate.', 0.88, 'Maria from Customer Success would be our internal advocate.', NOW());

-- Sample Enrichment Tags
INSERT INTO public.enrichment_tags (id, analysis_id, type, value, created_at)
VALUES
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cloud', 'AWS', NOW()),
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'tech', 'Salesforce', NOW()),
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'compliance', 'Data Privacy', NOW()),
  
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'tech', 'HR Systems', NOW()),
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'integration', 'API', NOW()),
  
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'cloud', 'GCP', NOW()),
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'tech', 'HubSpot', NOW()),
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'compliance', 'GDPR', NOW()),
  
  (uuid_generate_v4(), '44444444-dddd-dddd-dddd-dddddddddddd', 'cloud', 'Azure', NOW()),
  (uuid_generate_v4(), '44444444-dddd-dddd-dddd-dddddddddddd', 'tech', 'Microsoft Power BI', NOW()),
  (uuid_generate_v4(), '44444444-dddd-dddd-dddd-dddddddddddd', 'integration', 'REST', NOW()),
  
  (uuid_generate_v4(), '55555555-eeee-eeee-eeee-eeeeeeeeeeee', 'tech', 'Tableau', NOW()),
  (uuid_generate_v4(), '55555555-eeee-eeee-eeee-eeeeeeeeeeee', 'compliance', 'SOC2', NOW());

-- Sample Follow-Up Questions
INSERT INTO public.follow_up_questions (id, analysis_id, component, question, created_at)
VALUES
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'paperProcess', 'Can you walk me through the legal approval process in more detail?', NOW()),
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'identifyPain', 'What specific compliance issues are causing the most delays?', NOW()),
  (uuid_generate_v4(), '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'champion', 'What is John''s role in IT and how much influence does he have?', NOW()),
  
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'economicBuyer', 'Who specifically in the executive committee makes the final purchasing decision?', NOW()),
  (uuid_generate_v4(), '22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'decisionCriteria', 'What metrics will you use to evaluate the success of reducing onboarding time?', NOW()),
  
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'paperProcess', 'What is the timeline for getting board approval?', NOW()),
  (uuid_generate_v4(), '33333333-cccc-cccc-cccc-cccccccccccc', 'champion', 'How closely does Maria work with the decision makers?', NOW()),
  
  (uuid_generate_v4(), '44444444-dddd-dddd-dddd-dddddddddddd', 'decisionCriteria', 'What security requirements must our solution meet to pass your review?', NOW()),
  (uuid_generate_v4(), '44444444-dddd-dddd-dddd-dddddddddddd', 'economicBuyer', 'Besides the CTO, who else needs to approve this purchase?', NOW()),
  
  (uuid_generate_v4(), '55555555-eeee-eeee-eeee-eeeeeeeeeeee', 'competition', 'Which other solutions are you currently evaluating?', NOW()),
  (uuid_generate_v4(), '55555555-eeee-eeee-eeee-eeeeeeeeeeee', 'decisionProcess', 'When does the steering committee plan to make a decision?', NOW());