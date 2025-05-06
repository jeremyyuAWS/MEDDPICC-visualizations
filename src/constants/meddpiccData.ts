import { MEDDPICCComponent, AnalysisResult, EnrichmentTag, FollowUpQuestion } from '../types';

export const MEDDPICC_COMPONENTS: Record<string, Omit<MEDDPICCComponent, 'score' | 'text' | 'confidence' | 'citation'>> = {
  metrics: {
    id: 'metrics',
    name: 'Metrics',
    description: 'Quantifiable benefits and ROI that the solution will deliver',
  },
  economicBuyer: {
    id: 'economicBuyer',
    name: 'Economic Buyer',
    description: 'The person with financial authority to make the purchase decision',
  },
  decisionCriteria: {
    id: 'decisionCriteria',
    name: 'Decision Criteria',
    description: 'The formal criteria used to evaluate and select a solution',
  },
  decisionProcess: {
    id: 'decisionProcess',
    name: 'Decision Process',
    description: 'The steps and timeline for making the purchase decision',
  },
  paperProcess: {
    id: 'paperProcess',
    name: 'Paper Process',
    description: 'The procurement, legal, and administrative process for finalizing the deal',
  },
  identifyPain: {
    id: 'identifyPain',
    name: 'Identify Pain',
    description: 'The specific business challenges or pain points driving the purchase',
  },
  champion: {
    id: 'champion',
    name: 'Champion',
    description: 'An internal advocate who actively supports your solution',
  },
  competition: {
    id: 'competition',
    name: 'Competition',
    description: 'Understanding of competitive landscape and alternatives being considered',
  },
};

// Mock data for demonstration
export const MOCK_ANALYSIS_RESULT: AnalysisResult = {
  meddpicc: {
    metrics: {
      id: 'metrics',
      name: 'Metrics',
      description: 'Quantifiable benefits and ROI that the solution will deliver',
      score: 3,
      text: 'Clear ROI metrics identified: $100K/month cost savings in operational expenses, 30% reduction in compliance delays, and estimated 15-20 hours/week time savings for the IT team.',
      confidence: 0.92,
      citation: 'They\'re looking to save $100K per month on their current solution, plus we need to help reduce their compliance delays by at least 30% to meet their quarterly objectives.'
    },
    economicBuyer: {
      id: 'economicBuyer',
      name: 'Economic Buyer',
      description: 'The person with financial authority to make the purchase decision',
      score: 3,
      text: 'Jane Doe (CFO) is clearly identified as the economic buyer with final approval authority',
      confidence: 0.96,
      citation: 'Met with Jane Doe, CFO. She has the final say on all purchases over $50K.'
    },
    decisionCriteria: {
      id: 'decisionCriteria',
      name: 'Decision Criteria',
      description: 'The formal criteria used to evaluate and select a solution',
      score: 1,
      text: 'Security and compliance requirements mentioned but no specific evaluation criteria or formal selection framework identified',
      confidence: 0.72,
      citation: 'They mentioned needing something that meets their security requirements and helps with compliance.'
    },
    decisionProcess: {
      id: 'decisionProcess',
      name: 'Decision Process',
      description: 'The steps and timeline for making the purchase decision',
      score: 0,
      text: 'No information provided about the decision-making steps, timeline, or approval process',
      confidence: 0.65,
      citation: ''
    },
    paperProcess: {
      id: 'paperProcess',
      name: 'Paper Process',
      description: 'The procurement, legal, and administrative process for finalizing the deal',
      score: 2,
      text: 'Legal review takes 3 weeks followed by CFO approval, but no information on procurement process or contract requirements',
      confidence: 0.85,
      citation: 'Legal approval takes 3 weeks, then it goes to the CFO for final signoff.'
    },
    identifyPain: {
      id: 'identifyPain',
      name: 'Identify Pain',
      description: 'The specific business challenges or pain points driving the purchase',
      score: 3,
      text: 'Clear pain points identified: compliance delays causing regulatory issues, high operational costs, and manual processes creating bottlenecks',
      confidence: 0.94,
      citation: 'Their pain is related to compliance delays that are putting them at risk of fines. They\'re spending too much on their current solution, and the manual processes are creating bottlenecks.'
    },
    champion: {
      id: 'champion',
      name: 'Champion',
      description: 'An internal advocate who actively supports your solution',
      score: 2,
      text: 'John from IT identified as a potential champion, but his level of influence and advocacy strength is unclear',
      confidence: 0.83,
      citation: 'John from IT is our internal champion. He\'s been looking for a solution like this for months.'
    },
    competition: {
      id: 'competition',
      name: 'Competition',
      description: 'Understanding of competitive landscape and alternatives being considered',
      score: 1,
      text: 'Current solution mentioned but no information about other vendors being evaluated or competitive landscape',
      confidence: 0.71,
      citation: 'They\'re looking to replace their current solution which is too expensive and manual.'
    }
  },
  enrichment: {
    cloudProvider: 'AWS',
    tags: [
      { id: '1', type: 'tech', value: 'Salesforce' },
      { id: '2', type: 'compliance', value: 'GDPR' },
      { id: '3', type: 'compliance', value: 'SOC2' },
      { id: '4', type: 'tech', value: 'API Integration' },
      { id: '5', type: 'integration', value: 'SSO' }
    ]
  },
  followUp: {
    questions: [
      { id: '1', component: 'decisionCriteria', question: 'What specific criteria will you use to evaluate solutions? Is there a formal scorecard?' },
      { id: '2', component: 'decisionProcess', question: 'Can you walk me through your decision-making process and timeline for this project?' },
      { id: '3', component: 'decisionProcess', question: 'Who else besides yourself and the CFO will be involved in the evaluation process?' },
      { id: '4', component: 'paperProcess', question: 'Are there any specific contract requirements or terms we should be aware of?' },
      { id: '5', component: 'competition', question: 'Are you evaluating any other vendors? If so, what solutions are you considering?' }
    ],
    emailDraft: `Hi Jane and John,

Thank you for meeting today to discuss the challenges you're facing with your current solution. I appreciate you sharing your goals of reducing operational costs by $100K per month and addressing the compliance delays that are creating risk for your organization.

Based on our conversation, I understand:
- You're looking for a solution that can deliver significant cost savings
- Compliance delays are causing regulatory concerns that need to be addressed
- John from IT has been championing a new approach to solve these issues
- You need a solution that works with your AWS infrastructure and Salesforce implementation
- Legal review will take approximately 3 weeks before reaching CFO approval

To help me tailor our proposal more precisely to your needs, I'd like to learn more about:

1. What specific criteria will you use to evaluate potential solutions? Is there a formal scorecard?
2. Can you share more details about your decision-making timeline and process?
3. Who else will be involved in the evaluation process besides yourself and John?
4. Are there any specific contract requirements or terms we should be aware of?
5. Are you considering other vendors or solutions at this time?

I've attached a case study about how we helped a similar company in your industry reduce operational costs by 42% while improving compliance response times by 65%.

Would you have time for a follow-up call next Tuesday or Wednesday to discuss these points? I'd like to bring our solution architect to demonstrate how we can address your specific pain points.

Best regards,`
  }
};

export const TAG_COLORS: Record<string, string> = {
  cloud: 'bg-blue-100 text-blue-800',
  tech: 'bg-purple-100 text-purple-800',
  compliance: 'bg-red-100 text-red-800',
  integration: 'bg-green-100 text-green-800',
};