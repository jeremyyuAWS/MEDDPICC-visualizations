import { PerplexitySearchResult } from '../types';

// Simulated data that would be gathered from Perplexity search
// Each result includes sources, citations, and relevant links

export const perplexitySearchResults: Record<string, PerplexitySearchResult[]> = {
  'ai_adoption': [
    {
      snippet: "According to Gartner's latest survey, enterprise AI adoption has reached 56% in 2024, up from 27% in 2020, showing accelerating implementation rates across industries.",
      source: "Gartner Research",
      url: "https://www.gartner.com/en/newsroom/press-releases/2024-02-22-gartner-survey-finds-56-percent-of-enterprises-already-using-ai",
      date: "February 2024"
    },
    {
      snippet: "Financial services lead AI adoption at 78%, while manufacturing lags at 45%. Healthcare has shown the most rapid growth, increasing from 32% in 2022 to 52% in 2024.",
      source: "McKinsey Global Institute",
      url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023-generative-ais-breakout-year",
      date: "December 2023"
    },
    {
      snippet: "Organizations with mature AI implementations report 3.5x higher ROI compared to those in early stages, with the difference growing year-over-year.",
      source: "Deloitte AI Institute",
      url: "https://www2.deloitte.com/us/en/insights/focus/ai-institute.html",
      date: "March 2024"
    }
  ],
  'cloud_providers': [
    {
      snippet: "AWS remains the leader in cloud AI services with 33% market share, but Azure has grown to 28% in 2024, narrowing the gap significantly from 2022 when the difference was 12 percentage points.",
      source: "Canalys Cloud Analysis",
      url: "https://www.canalys.com/newsroom/worldwide-cloud-infrastructure-services-2024",
      date: "April 2024"
    },
    {
      snippet: "Organizations using Google Cloud Platform for AI workloads report the highest model quality scores (93/100), while Azure leads in enterprise integration capabilities (87/100).",
      source: "Forrester Wave™: AI Infrastructure Solutions",
      url: "https://www.forrester.com/report/the-forrester-wave-ai-infrastructure-solutions-q2-2023/RES176526",
      date: "January 2024"
    },
    {
      snippet: "73% of large enterprises now employ a multi-cloud strategy for AI workloads, citing risk mitigation and best-of-breed capabilities as key drivers.",
      source: "Flexera State of the Cloud Report",
      url: "https://info.flexera.com/CM-REPORT-State-of-the-Cloud",
      date: "March 2024"
    }
  ],
  'healthcare': [
    {
      snippet: "AI-assisted diagnostics significantly improve accuracy, with pathology seeing a 28% improvement and radiology close behind at 26%. The FDA has approved 91 AI-based medical algorithms as of April 2024.",
      source: "JAMA Network",
      url: "https://jamanetwork.com/journals/jama/article-abstract/2804344",
      date: "April 2024"
    },
    {
      snippet: "Healthcare organizations implementing AI see an average 23% reduction in administrative costs and 18% improvement in patient outcomes across measured metrics.",
      source: "Healthcare Information and Management Systems Society (HIMSS)",
      url: "https://www.himss.org/resources/state-healthcare-ai-2024-report",
      date: "March 2024"
    },
    {
      snippet: "AI-enhanced telemedicine has grown 7.2x since 2020, with diagnostic accuracy and patient satisfaction showing substantial improvements. Rural patients report 42% better access to specialists.",
      source: "American Telemedicine Association",
      url: "https://www.americantelemed.org/resources/telemedicine-trends-2024/",
      date: "February 2024"
    }
  ],
  'manufacturing': [
    {
      snippet: "Manufacturers implementing AI report an average ROI of 267% over 3 years, with predictive maintenance providing the highest returns at 342% average ROI.",
      source: "Manufacturing Enterprise Solutions Association (MESA)",
      url: "https://www.mesa.org/resource-library/articles/ai-roi-in-manufacturing-2024-report",
      date: "January 2024"
    },
    {
      snippet: "AI-optimized production lines show 23% higher overall equipment effectiveness (OEE) and 31% lower energy consumption compared to traditional systems.",
      source: "Industry Week Research",
      url: "https://www.industryweek.com/technology-and-iiot/article/22027547/ai-boosts-oee-by-23-new-study-finds",
      date: "March 2024"
    },
    {
      snippet: "Predictive maintenance dominates manufacturing AI applications at 36%, followed by quality control at 28%. Process automation is the fastest-growing category with 87% year-over-year implementation growth.",
      source: "Boston Consulting Group",
      url: "https://www.bcg.com/publications/2024/ai-in-manufacturing-industry-4-report",
      date: "April 2024"
    }
  ],
  'finance': [
    {
      snippet: "AI-powered fraud prevention systems in financial institutions show 67% higher detection rates and 58% fewer false positives compared to rule-based systems.",
      source: "Financial Times",
      url: "https://www.ft.com/content/d6ee2b95-d5ab-4d15-956d-6b7f7e118c76",
      date: "February 2024"
    },
    {
      snippet: "Hedge funds using AI for investment decisions outperform traditional funds by an average of 7.3 percentage points annually. The gap has widened from 3.2 points in 2020 to 7.3 points in 2024.",
      source: "Bloomberg Intelligence",
      url: "https://www.bloomberg.com/professional/blog/ai-powered-hedge-funds-outperform-by-7-3-percentage-points/",
      date: "March 2024"
    },
    {
      snippet: "Financial institutions using AI report a 34% increase in analyst productivity and 28% reduction in manual processing time. Compliance efficiency improvements save an average of $4.2M annually for large banks.",
      source: "Accenture Financial Services",
      url: "https://www.accenture.com/us-en/insights/banking/ai-financial-services-report-2024",
      date: "April 2024"
    }
  ],
  'salesforce': [
    {
      snippet: "Organizations using Salesforce + AI report a 34% increase in sales productivity and 28% improvement in lead conversion rates. Companies implementing Einstein features reduce sales cycle length by an average of 19%.",
      source: "Salesforce Research",
      url: "https://www.salesforce.com/resources/research-reports/state-of-sales/",
      date: "March 2024"
    },
    {
      snippet: "Salesforce Einstein AI features have seen 87% adoption among enterprise Salesforce customers, up from 34% in 2020. The fastest growth occurred in 2022-2023 with the introduction of generative AI capabilities.",
      source: "IDC Market Analysis",
      url: "https://www.idc.com/getdoc.jsp?containerId=US49991923",
      date: "February 2024"
    },
    {
      snippet: "Sales teams using Salesforce AI features outperform non-AI teams by significant margins, with 47% higher quota attainment and 39% more opportunities created per rep.",
      source: "Forrester Total Economic Impact Study",
      url: "https://www.forrester.com/report/the-total-economic-impact-of-salesforce-einstein/RES176294",
      date: "January 2024"
    }
  ],
  'security': [
    {
      snippet: "Organizations using AI for cybersecurity detect threats 63% faster and reduce false positives by 47% compared to traditional methods. The impact is even more pronounced for zero-day threats, with 78% faster detection times.",
      source: "Cybersecurity Ventures",
      url: "https://cybersecurityventures.com/ai-cybersecurity-market-report-2024/",
      date: "April 2024"
    },
    {
      snippet: "AI-powered cyberattacks now account for 47% of all enterprise security breaches, requiring advanced AI defense systems. Attack sophistication has increased 3.8x since 2020.",
      source: "IBM Security X-Force",
      url: "https://www.ibm.com/reports/threat-intelligence/2024/",
      date: "March 2024"
    },
    {
      snippet: "Implementing AI-based security solutions reduces overall organizational risk exposure by 42% within the first year, with risk scores continuing to improve by 12-15% annually in subsequent years.",
      source: "Gartner Security & Risk Management",
      url: "https://www.gartner.com/en/documents/4525477-emerging-technologies-and-trends-impact-radar-security",
      date: "February 2024"
    }
  ],
  'retail': [
    {
      snippet: "Retailers using AI-powered recommendation engines see an average 27% increase in conversion rates and 31% higher average order value. The impact is even higher in specialty retail at 42%.",
      source: "National Retail Federation",
      url: "https://nrf.com/research/state-of-retail-ai-2024",
      date: "March 2024"
    },
    {
      snippet: "AI-powered e-commerce has grown at 2.4x the rate of traditional e-commerce since 2020, with personalization driving the biggest gains. By 2024, retailers using advanced AI report 318% higher growth than their 2020 baseline.",
      source: "eMarketer Retail",
      url: "https://www.emarketer.com/content/ai-ecommerce-growth-report-2024",
      date: "February 2024"
    },
    {
      snippet: "Retailers using AI for inventory management reduce stockouts by 38% and overstock situations by 32%, while decreasing overall inventory costs by 21%. These improvements lead to 3.7% higher profit margins.",
      source: "McKinsey Retail Practice",
      url: "https://www.mckinsey.com/industries/retail/our-insights/retails-ai-revolution",
      date: "April 2024"
    }
  ],
  'marketing': [
    {
      snippet: "Marketing teams using AI-powered automation tools generate 41% more qualified leads while reducing campaign creation time by 38%. Email open rates increase by an average of 27% when using AI-optimized subject lines.",
      source: "Hubspot Research",
      url: "https://www.hubspot.com/marketing-statistics",
      date: "March 2024"
    },
    {
      snippet: "Personalized marketing campaigns powered by AI deliver 2.7x higher engagement rates compared to standard segmentation approaches. Content relevance scores increase by 310% with AI-driven personalization.",
      source: "Salesforce State of Marketing",
      url: "https://www.salesforce.com/resources/research-reports/state-of-marketing/",
      date: "February 2024"
    },
    {
      snippet: "AI-generated marketing content produces 31% higher engagement rates compared to traditionally created content. The gap is largest for social media posts (47%) and email copy (38%).",
      source: "Content Marketing Institute",
      url: "https://contentmarketinginstitute.com/articles/ai-content-marketing-research",
      date: "April 2024"
    }
  ]
};

// Infographics data with bullet points and visual information
export const infographicsData: Record<string, {
  title: string;
  subtitle: string;
  bulletPoints: string[];
  visualComponents?: string[];
  recommendations?: string[];
  sources: { name: string; url: string; }[];
}> = {
  'ai_adoption': {
    title: 'Enterprise AI Adoption in 2024',
    subtitle: 'Key trends and statistics for business leaders',
    bulletPoints: [
      '56% of enterprises now use AI in production environments, up from 27% in 2020',
      'Financial services (78%) and technology (65%) lead adoption across industries',
      'Organizations with mature AI implementations report 3.5x higher ROI vs. early stage',
      '73% of CIOs plan to increase AI investment in the next fiscal year',
      '47% of enterprises cite talent gaps as their primary adoption barrier'
    ],
    visualComponents: [
      'Adoption by Industry: Bar chart comparing adoption rates across 8 major industries',
      'ROI Timeline: Line chart showing typical returns over 36 months post-implementation',
      'Investment Priorities: Pie chart breaking down AI budget allocation by category'
    ],
    recommendations: [
      'Start with focused use cases that align with business priorities',
      'Invest in data infrastructure before advanced AI implementations',
      'Build cross-functional teams that combine domain and technical expertise',
      'Implement AI ethics frameworks early in the adoption process'
    ],
    sources: [
      { name: 'Gartner Research', url: 'https://www.gartner.com/en/newsroom/press-releases/2024-02-22-gartner-survey-finds-56-percent-of-enterprises-already-using-ai' },
      { name: 'McKinsey Global Institute', url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023-generative-ais-breakout-year' },
      { name: 'Deloitte AI Institute', url: 'https://www2.deloitte.com/us/en/insights/focus/ai-institute.html' },
      { name: 'IBM Institute for Business Value', url: 'https://www.ibm.com/thought-leadership/institute-business-value/report/ai-business-value-2024' }
    ]
  },
  'cloud_ai': {
    title: 'Cloud Provider AI Capabilities Comparison',
    subtitle: 'AWS vs Azure vs Google Cloud in 2024',
    bulletPoints: [
      'AWS leads market share at 33%, followed by Azure (28%) and GCP (22%)',
      'Azure shows strongest enterprise integration capabilities (87/100)',
      'Google Cloud demonstrates superior model quality scores (93/100)',
      'Multi-cloud AI strategies have increased 31% year-over-year',
      'Cost of running AI workloads has decreased 38% since 2020'
    ],
    visualComponents: [
      'Market Share Evolution: Stacked area chart showing share changes 2020-2024',
      'Capability Spider Chart: Radar visualization comparing 6 key capability dimensions',
      'ROI Comparison: Bar chart showing typical returns for each provider'
    ],
    recommendations: [
      'Evaluate providers based on your specific AI workload requirements',
      'Consider multi-cloud approaches for specialized capabilities',
      'Leverage managed AI services to reduce operational complexity',
      'Monitor pricing models carefully, especially for training and inference'
    ],
    sources: [
      { name: 'Canalys Cloud Analysis', url: 'https://www.canalys.com/newsroom/worldwide-cloud-infrastructure-services-2024' },
      { name: 'Forrester Wave™', url: 'https://www.forrester.com/report/the-forrester-wave-ai-infrastructure-solutions-q2-2023/RES176526' },
      { name: 'Flexera State of the Cloud Report', url: 'https://info.flexera.com/CM-REPORT-State-of-the-Cloud' },
      { name: 'IDC Cloud Infrastructure Market Share', url: 'https://www.idc.com/getdoc.jsp?containerId=prUS50958023' }
    ]
  },
  'salesforce_ai': {
    title: 'Salesforce AI Capabilities & Business Impact',
    subtitle: 'Performance metrics and implementation insights',
    bulletPoints: [
      'Sales teams using Salesforce AI features show 47% higher quota attainment',
      'Lead scoring is the most valuable AI feature according to 42% of users',
      'Average ROI breakeven occurs at month 7 with 342% returns by month 24',
      '87% of enterprise Salesforce customers now use AI features, up from 34% in 2020',
      'Organizations report 34% higher sales productivity and 28% better lead conversion'
    ],
    visualComponents: [
      'Performance Gap: Bar chart showing AI vs. non-AI team performance',
      'Feature Adoption: Donut chart showing usage breakdown by AI feature type',
      'ROI Timeline: Line chart showing cumulative returns over 24 months'
    ],
    recommendations: [
      'Prioritize sales team training alongside AI implementation',
      'Start with lead scoring for fastest time-to-value',
      'Use Einstein Analytics to identify optimization opportunities',
      'Establish clear KPIs to measure AI impact on sales performance'
    ],
    sources: [
      { name: 'Salesforce Research', url: 'https://www.salesforce.com/resources/research-reports/state-of-sales/' },
      { name: 'IDC Market Analysis', url: 'https://www.idc.com/getdoc.jsp?containerId=US49991923' },
      { name: 'Forrester Total Economic Impact Study', url: 'https://www.forrester.com/report/the-total-economic-impact-of-salesforce-einstein/RES176294' }
    ]
  },
  'manufacturing_ai': {
    title: 'AI in Manufacturing: ROI Analysis',
    subtitle: 'Financial and operational benefits by application area',
    bulletPoints: [
      'Predictive maintenance delivers highest ROI at 267% over 3 years',
      'Quality control applications reduce defects by 63% on average',
      'Overall equipment effectiveness (OEE) improves by 23% with AI optimization',
      'Energy consumption decreases by 31% when using AI-powered systems',
      'Labor productivity increases by 26% with AI assistance tools'
    ],
    visualComponents: [
      'ROI by Application: Bar chart comparing returns across 6 application areas',
      'Quality Metrics: Before/after comparison showing improvement percentages',
      'Efficiency Radar: Spider chart showing gains across multiple metrics'
    ],
    recommendations: [
      'Begin with predictive maintenance for fastest financial returns',
      'Implement quality control AI to reduce warranty claims and returns',
      'Deploy energy optimization when facing high utility costs',
      'Evaluate production planning AI for complex manufacturing environments'
    ],
    sources: [
      { name: 'Manufacturing Enterprise Solutions Association (MESA)', url: 'https://www.mesa.org/resource-library/articles/ai-roi-in-manufacturing-2024-report' },
      { name: 'Industry Week Research', url: 'https://www.industryweek.com/technology-and-iiot/article/22027547/ai-boosts-oee-by-23-new-study-finds' },
      { name: 'Boston Consulting Group', url: 'https://www.bcg.com/publications/2024/ai-in-manufacturing-industry-4-report' },
      { name: 'Deloitte Manufacturing Practice', url: 'https://www2.deloitte.com/us/en/insights/industry/manufacturing/artificial-intelligence-manufacturing.html' }
    ]
  },
  'healthcare_ai': {
    title: 'AI Impact on Healthcare Delivery',
    subtitle: 'Clinical and operational improvements',
    bulletPoints: [
      'Administrative costs reduced by 23% with AI automation',
      'Patient outcomes improve by 18% across measured metrics',
      'Diagnostic accuracy increases by 15-28% depending on specialty',
      'AI-assisted telemedicine shows 7.2x growth since 2020',
      'Data privacy remains the top barrier to adoption, cited by 58% of organizations'
    ],
    visualComponents: [
      'Diagnostic Improvement: Bar chart showing accuracy gains by medical specialty',
      'Telemedicine Growth: Line chart tracking growth since 2020',
      'Barrier Analysis: Horizontal bar chart ranking adoption challenges'
    ],
    recommendations: [
      'Focus initial AI implementations on administrative workflow automation',
      'Partner with clinicians to design AI diagnostic support systems',
      'Address data privacy concerns with robust compliance frameworks',
      'Evaluate telemedicine enhancement opportunities for rural access'
    ],
    sources: [
      { name: 'JAMA Network', url: 'https://jamanetwork.com/journals/jama/article-abstract/2804344' },
      { name: 'Healthcare Information and Management Systems Society (HIMSS)', url: 'https://www.himss.org/resources/state-healthcare-ai-2024-report' },
      { name: 'American Telemedicine Association', url: 'https://www.americantelemed.org/resources/telemedicine-trends-2024/' },
      { name: 'Mayo Clinic Proceedings', url: 'https://www.mayoclinicproceedings.org/article/S0025-6196(23)00978-8/fulltext' }
    ]
  }
};

// Research summaries to provide additional context
export const researchSummaries: Record<string, {
  title: string;
  author: string;
  publication: string;
  date: string;
  summary: string;
  keyFindings: string[];
  methodology: string;
  limitations: string;
  sourceUrl: string;
}> = {
  'enterprise_ai_adoption': {
    title: 'The State of AI in 2024: Enterprise Adoption Trends',
    author: 'McKinsey Global Institute',
    publication: 'McKinsey Quarterly',
    date: 'March 2024',
    summary: 'This comprehensive research examines AI adoption patterns across 1,500+ organizations globally, finding significant acceleration in enterprise AI implementation. The research identifies key success factors, ROI patterns, and barriers to adoption.',
    keyFindings: [
      'Enterprise AI adoption reached 56% in 2024, up from 27% in 2020',
      'Organizations with mature AI implementation report 3.5x higher ROI',
      'Financial services leads adoption at 78%, while manufacturing lags at 45%',
      'Data quality remains the primary technical barrier, cited by 58% of organizations',
      'Companies with cross-functional AI governance show 2.3x better outcomes'
    ],
    methodology: 'Survey of 1,572 organizations across 19 industries and 27 countries, supplemented with in-depth interviews of 125 AI leaders and financial analysis of public companies.',
    limitations: 'Self-reported data may overstate actual AI implementation. Respondents were primarily from large enterprises, potentially underrepresenting small business adoption patterns.',
    sourceUrl: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2023-generative-ais-breakout-year'
  },
  'ai_roi_analysis': {
    title: 'Measuring ROI from Enterprise AI Implementations',
    author: 'MIT Sloan School of Management',
    publication: 'MIT Sloan Management Review',
    date: 'February 2024',
    summary: 'This research provides a framework for measuring AI return on investment across different application types and organizational contexts. The study examines 385 AI implementations to quantify financial and operational returns.',
    keyFindings: [
      'Average ROI of 287% over 3 years for successful AI implementations',
      'Process automation shows fastest time-to-value at 4.3 months average',
      'AI investments typically experience negative returns for first 6-9 months',
      'Projects with clear KPIs established before implementation show 2.1x higher ROI',
      'Organizations using agile implementation methods report 37% higher returns'
    ],
    methodology: 'Analysis of 385 enterprise AI implementations across 10 industries, including direct access to financial and operational metrics, supplemented with interviews from project stakeholders.',
    limitations: 'Sample skews toward successful implementations, as failed projects were less likely to participate. Financial services and technology sectors are overrepresented in the sample.',
    sourceUrl: 'https://sloanreview.mit.edu/article/measuring-roi-enterprise-ai-implementation/'
  },
  'cloud_ai_services': {
    title: 'Cloud Provider AI Capabilities: Comparative Analysis',
    author: 'Forrester Research',
    publication: 'Forrester Wave™: AI Infrastructure Solutions',
    date: 'April 2024',
    summary: 'This comparative analysis evaluates the AI capabilities of major cloud providers across 28 criteria, including model performance, developer experience, enterprise integration, and pricing models.',
    keyFindings: [
      'AWS leads in breadth of services (92/100) and specialized hardware (91/100)',
      'Azure leads in enterprise integration (87/100) and documentation quality (85/100)',
      'Google Cloud ranks highest for model quality (93/100) and research leadership',
      'Oracle Cloud shows strongest improvement, gaining 15 points since 2022',
      'Multi-cloud strategies have increased from 42% to 73% since 2020'
    ],
    methodology: 'Evaluation of cloud providers across 28 criteria using vendor surveys, product demonstrations, customer reference interviews, and technical architecture reviews.',
    limitations: 'Evaluation criteria emphasize enterprise needs and may underweight factors important for startups or research institutions. Cost comparisons may not reflect negotiated enterprise discounts.',
    sourceUrl: 'https://www.forrester.com/report/the-forrester-wave-ai-infrastructure-solutions-q2-2023/RES176526'
  },
  'healthcare_ai_impact': {
    title: 'AI in Healthcare: Patient Outcomes and Operational Efficiency',
    author: 'Journal of the American Medical Association',
    publication: 'JAMA Network',
    date: 'March 2024',
    summary: 'This study examines the quantifiable impact of AI implementations across 278 healthcare organizations, measuring changes in patient outcomes, administrative efficiency, and diagnostic accuracy.',
    keyFindings: [
      'Administrative costs reduced by 23% with AI automation solutions',
      'Patient outcomes improve by 18% on average across measured quality metrics',
      'Diagnostic accuracy increases by 15-28% depending on medical specialty',
      'Dermatology shows the most significant AI diagnostic improvement at 31%',
      'Data privacy and regulatory compliance remain top barriers to adoption'
    ],
    methodology: 'Mixed-methods research combining quantitative analysis of metrics from 278 healthcare organizations with qualitative interviews of clinicians, administrators, and patients.',
    limitations: 'Study does not fully account for concurrent non-AI improvements in healthcare delivery. Patient outcome improvements may be influenced by multiple factors beyond AI implementation.',
    sourceUrl: 'https://jamanetwork.com/journals/jama/article-abstract/2804344'
  },
  'salesforce_ai_performance': {
    title: 'Measuring Sales Performance Impact of AI-Enhanced CRM',
    author: 'Salesforce Research',
    publication: 'State of Sales Report',
    date: 'January 2024',
    summary: 'This research quantifies the performance impact of AI features within Salesforce across 1,250+ sales teams, examining metrics like quota attainment, lead conversion, and sales cycle length.',
    keyFindings: [
      'Sales teams using AI features show 47% higher quota attainment',
      'Lead conversion rates improve by 28% with AI-powered scoring and prioritization',
      'Sales cycle length decreases by 19% on average with AI assistance',
      'Deal size increases by 15% when Einstein opportunity insights are utilized',
      'Administrative time decreases from 65% to 41% of sales rep workday'
    ],
    methodology: 'Analysis of anonymized performance data from 1,250+ sales teams using Salesforce, with controlled comparisons between teams using and not using AI features within the same organizations.',
    limitations: 'Performance improvements may partially reflect that higher-performing sales organizations are more likely to adopt advanced features. Study does not control for all variables affecting sales performance.',
    sourceUrl: 'https://www.salesforce.com/resources/research-reports/state-of-sales/'
  }
};