import { VisualizationResult } from '../types';

// Sales and marketing tools visualization data for the demo agent
// Each tool category has multiple chart types to showcase variety

export const salesforceVisualizations: Record<string, VisualizationResult> = {
  'impact': {
    insight: "Organizations using Salesforce + AI report a 34% increase in sales productivity and 28% improvement in lead conversion rates. Companies implementing Einstein features reduce sales cycle length by an average of 19% while increasing deal sizes by 15%.",
    chartType: 'Column',
    chartData: {
      title: 'Salesforce AI Impact',
      subtitle: 'Percentage improvement by business metric',
      x: ['Sales Productivity', 'Lead Conversion', 'Customer Retention', 'Pipeline Accuracy', 'Deal Size', 'Sales Cycle Length'],
      y: [34, 28, 22, 19, 15, 12],
      xAxisLabel: 'Business Metric',
      yAxisLabel: 'Improvement %'
    }
  },
  'adoption': {
    insight: "Salesforce Einstein AI features have seen 87% adoption among enterprise Salesforce customers, up from 34% in 2020. The fastest growth occurred in 2022-2023 with the introduction of generative AI capabilities.",
    chartType: 'Line',
    chartData: {
      title: 'Salesforce Einstein AI Adoption',
      subtitle: 'Percentage of enterprise customers',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [34, 49, 65, 78, 87, 93],
      xAxisLabel: 'Year',
      yAxisLabel: 'Adoption %'
    }
  },
  'features': {
    insight: "Lead scoring is the most valuable Salesforce AI feature according to users, with 42% citing it as their primary AI use case. Opportunity insights and forecast prediction follow at 28% and 17% respectively, with email recommendations gaining traction.",
    chartType: 'Pie',
    chartData: {
      title: 'Most Valuable Salesforce AI Features',
      subtitle: 'According to enterprise users',
      x: ['Lead Scoring', 'Opportunity Insights', 'Forecast Prediction', 'Email Recommendations', 'Account Insights', 'Other'],
      y: [42, 28, 17, 8, 3, 2]
    }
  },
  'performance_improvement': {
    insight: "Sales teams using Salesforce AI features outperform non-AI teams by significant margins, with 47% higher quota attainment and 39% more opportunities created per rep. The performance gap widened from 29% in 2022 to 47% in 2024.",
    chartType: 'Bar',
    chartData: {
      title: 'Sales Performance: AI vs. Non-AI Teams',
      subtitle: 'Percentage improvement with AI assistance',
      x: ['Quota Attainment', 'Opportunities Created', 'Deal Win Rate', 'Sales Cycle Length', 'Customer Retention', 'Forecast Accuracy'],
      y: [47, 39, 32, 28, 24, 43],
      xAxisLabel: 'Performance Metric',
      yAxisLabel: 'Improvement %'
    }
  },
  'roi_timeline': {
    insight: "Organizations implementing Salesforce Einstein features typically see ROI breakeven at month 7, with cumulative returns reaching 342% by month 24. The steepest value growth occurs between months 6-12 as teams fully adopt AI-powered workflows.",
    chartType: 'Line',
    chartData: {
      title: 'Salesforce AI ROI Timeline',
      subtitle: 'Cumulative return on investment',
      x: ['Month 0', 'Month 3', 'Month 6', 'Month 9', 'Month 12', 'Month 18', 'Month 24'],
      y: [-100, -45, 12, 87, 156, 237, 342],
      xAxisLabel: 'Timeline',
      yAxisLabel: 'Cumulative ROI %'
    }
  }
};

export const crmVisualizations: Record<string, VisualizationResult> = {
  'roi': {
    insight: "Organizations using AI-enhanced CRM systems report 3.5x higher ROI compared to traditional CRM implementations. Customer retention shows the most dramatic improvement at 3.9x better performance with AI-powered customer insights.",
    chartType: 'Column',
    chartData: {
      title: 'CRM Return on Investment',
      subtitle: 'Traditional vs. AI-Enhanced',
      x: ['Sales Lift', 'Cost Reduction', 'Customer Retention', 'Lead Quality', 'Overall ROI'],
      y: [320, 280, 390, 310, 350],
      xAxisLabel: 'Metric',
      yAxisLabel: 'Relative Performance (Traditional = 100)'
    }
  },
  'adoption': {
    insight: "AI features in CRM platforms have seen 58% adoption in 2024, with sales forecasting and lead prioritization being the most used capabilities. Automated data entry features show the fastest growth, up 92% year-over-year.",
    chartType: 'Bar',
    chartData: {
      title: 'AI Feature Adoption in CRM',
      subtitle: 'Percentage of organizations using each feature',
      x: ['Sales Forecasting', 'Lead Prioritization', 'Sentiment Analysis', 'Email Automation', 'Call Analytics', 'Data Entry Automation'],
      y: [58, 52, 43, 39, 27, 31],
      xAxisLabel: 'Feature',
      yAxisLabel: 'Adoption %'
    }
  },
  'market': {
    insight: "The AI-enhanced CRM market has grown at a 43% CAGR since 2020, reaching $14.8B in 2024 and projected to hit $32B by 2027. This growth rate is 2.8x faster than the traditional CRM market's 15% CAGR.",
    chartType: 'Line',
    chartData: {
      title: 'AI-Enhanced CRM Market Size',
      subtitle: 'Market size in billions USD',
      x: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'],
      y: [5.7, 8.2, 11.7, 14.8, 18.9, 23.5, 28.1, 32.0],
      xAxisLabel: 'Year',
      yAxisLabel: 'Market Size ($B)'
    }
  },
  'data_quality': {
    insight: "AI-powered CRM data cleansing improves data quality scores by an average of 63% and reduces duplicate records by 78%. This results in 47% higher customer insight accuracy and 39% better sales forecasting.",
    chartType: 'Radar',
    chartData: {
      title: 'CRM Data Quality Improvements with AI',
      subtitle: 'Percentage improvement by metric',
      x: ['Overall Data Quality', 'Duplicate Reduction', 'Field Completion', 'Data Freshness', 'Record Linkage', 'Validation Accuracy'],
      y: [63, 78, 52, 44, 59, 67]
    }
  },
  'productivity': {
    insight: "Sales representatives using AI-enhanced CRM spend 37% less time on administrative tasks and 42% more time on active selling. Administrative time drops from an average of 65% of the workday to 41% with AI automation features.",
    chartType: 'Donut',
    chartData: {
      title: 'Sales Rep Time Allocation with AI CRM',
      subtitle: 'Percentage of time spent on activities',
      x: ['Active Selling', 'Administrative Tasks', 'Research', 'Internal Meetings', 'Training', 'Other'],
      y: [42, 31, 12, 10, 3, 2]
    }
  }
};

export const marketingAutomationVisualizations: Record<string, VisualizationResult> = {
  'impact': {
    insight: "Marketing teams using AI-powered automation tools generate 41% more qualified leads while reducing campaign creation time by 38%. Email open rates increase by an average of 27% when using AI-optimized subject lines and content.",
    chartType: 'Bar',
    chartData: {
      title: 'AI Impact on Marketing Performance',
      subtitle: 'Percentage improvement by metric',
      x: ['Lead Quality', 'Campaign Creation Time', 'Conversion Rate', 'Marketing ROI', 'Customer Acquisition Cost', 'Email Engagement'],
      y: [41, 38, 35, 29, 27, 31],
      xAxisLabel: 'Metric',
      yAxisLabel: 'Improvement %'
    }
  },
  'personalization': {
    insight: "Personalized marketing campaigns powered by AI deliver 2.7x higher engagement rates compared to standard segmentation approaches. Content relevance scores, as rated by customers, increase by 310% with AI-driven personalization.",
    chartType: 'Column',
    chartData: {
      title: 'Marketing Campaign Performance',
      subtitle: 'AI personalization vs traditional methods',
      x: ['Open Rate', 'Click-Through', 'Conversion', 'Customer LTV', 'Repeat Purchase', 'Content Relevance'],
      y: [270, 310, 290, 230, 250, 310],
      xAxisLabel: 'Metric',
      yAxisLabel: 'Relative Performance (Traditional = 100)'
    }
  },
  'allocation': {
    insight: "Marketing AI budgets have shifted dramatically since 2020, with predictive analytics and personalization now representing 58% of spending. Content generation has seen the most rapid growth, increasing from 3% to 18% of AI marketing budgets in just three years.",
    chartType: 'Pie',
    chartData: {
      title: 'Marketing AI Budget Allocation',
      subtitle: '2024 distribution by capability',
      x: ['Predictive Analytics', 'Personalization', 'Content Generation', 'Campaign Automation', 'Customer Insights', 'Other'],
      y: [32, 26, 18, 15, 7, 2]
    }
  },
  'content_creation': {
    insight: "AI-generated marketing content produces 31% higher engagement rates compared to traditionally created content. The gap is largest for social media posts (47%) and email copy (38%), while long-form content shows a smaller but still significant improvement (22%).",
    chartType: 'Column',
    chartData: {
      title: 'AI vs. Traditional Content Performance',
      subtitle: 'Engagement improvement by content type',
      x: ['Social Media Posts', 'Email Copy', 'Ad Headlines', 'Product Descriptions', 'Blog Posts', 'White Papers'],
      y: [47, 38, 34, 29, 24, 22],
      xAxisLabel: 'Content Type',
      yAxisLabel: 'Engagement Increase %'
    }
  },
  'time_efficiency': {
    insight: "Marketing teams using AI automation tools report dramatic time savings, with content creation 73% faster and audience segmentation 62% quicker. The total time from campaign conception to execution decreases by an average of 47%.",
    chartType: 'Bar',
    chartData: {
      title: 'Marketing Time Efficiency Gains with AI',
      subtitle: 'Percentage time reduction by activity',
      x: ['Content Creation', 'Audience Segmentation', 'Performance Analysis', 'A/B Testing', 'Campaign Planning', 'Channel Optimization'],
      y: [73, 62, 54, 48, 41, 37],
      xAxisLabel: 'Marketing Activity',
      yAxisLabel: 'Time Reduction %'
    }
  }
};

export const salesAnalyticsVisualizations: Record<string, VisualizationResult> = {
  'forecast_accuracy': {
    insight: "AI-powered sales forecasting improves accuracy by 42% compared to traditional methods, with the most significant gains in long-term projections and volatile markets. Week-by-week variance decreases from 24% to 9% on average.",
    chartType: 'Bar',
    chartData: {
      title: 'Sales Forecast Accuracy Improvement',
      subtitle: 'Percentage improvement by forecast horizon',
      x: ['Weekly', 'Monthly', 'Quarterly', 'Annually', 'Multi-Year'],
      y: [31, 37, 42, 48, 52],
      xAxisLabel: 'Forecast Horizon',
      yAxisLabel: 'Accuracy Improvement %'
    }
  },
  'win_prediction': {
    insight: "Deal win prediction accuracy increases by 57% when using AI-enabled analytics compared to traditional scoring methods. The largest improvements are seen in complex deals with multiple stakeholders and long sales cycles.",
    chartType: 'Column',
    chartData: {
      title: 'Deal Win Prediction Accuracy',
      subtitle: 'AI vs. traditional methods',
      x: ['Simple Deals', 'Mid-Complexity', 'Complex Deals', 'New Customers', 'Existing Customers', 'Overall'],
      y: [32, 48, 67, 59, 41, 57],
      xAxisLabel: 'Deal Type',
      yAxisLabel: 'Accuracy Improvement %'
    }
  },
  'pipeline_visibility': {
    insight: "Organizations implementing AI-driven sales analytics report 68% improved visibility into their sales pipeline, with early risk detection improving by 74% and opportunity ranking accuracy by 62%.",
    chartType: 'Radar',
    chartData: {
      title: 'Sales Pipeline Intelligence Improvements',
      subtitle: 'Percentage improvement by capability',
      x: ['Risk Detection', 'Opportunity Ranking', 'Timeline Prediction', 'Resource Allocation', 'Coaching Insights', 'Territory Planning'],
      y: [74, 62, 58, 53, 49, 45]
    }
  },
  'performance_drivers': {
    insight: "AI analysis of top-performing sales representatives reveals that customer engagement quality (37%) and follow-up consistency (31%) are the largest drivers of success, far outweighing traditional metrics like call volume (12%).",
    chartType: 'Pie',
    chartData: {
      title: 'Sales Success Factor Analysis',
      subtitle: 'Relative importance of performance drivers',
      x: ['Engagement Quality', 'Follow-up Consistency', 'Knowledge Depth', 'Response Time', 'Call Volume', 'Other Factors'],
      y: [37, 31, 18, 14, 12, 8]
    }
  },
  'conversion_funnel': {
    insight: "AI-optimized sales funnels show dramatic improvements at each stage, with lead qualification efficiency increasing by 53% and proposal-to-close conversion improving by 41%. Overall funnel efficiency improves by 47%.",
    chartType: 'Line',
    chartData: {
      title: 'AI Impact on Sales Conversion Funnel',
      subtitle: 'Percentage improvement at each stage',
      x: ['Lead Generation', 'Qualification', 'Discovery', 'Proposal', 'Negotiation', 'Closing'],
      y: [34, 53, 38, 41, 37, 41],
      xAxisLabel: 'Sales Stage',
      yAxisLabel: 'Improvement %'
    }
  }
};

export const customerSuccessVisualizations: Record<string, VisualizationResult> = {
  'retention': {
    insight: "Organizations using AI for customer success initiatives see a 34% reduction in churn rate and 28% higher expansion revenue. Predictive churn models identify at-risk customers with 76% accuracy, allowing for proactive intervention.",
    chartType: 'Column',
    chartData: {
      title: 'Customer Success AI Impact',
      subtitle: 'Percentage improvement by metric',
      x: ['Churn Reduction', 'Expansion Revenue', 'NPS Score', 'Support Efficiency', 'Usage Depth', 'Time to Value'],
      y: [34, 28, 23, 41, 18, 27],
      xAxisLabel: 'Metric',
      yAxisLabel: 'Improvement %'
    }
  },
  'touchpoints': {
    insight: "AI-driven customer success platforms optimize customer touchpoints, reducing necessary interactions by 37% while improving satisfaction by 29%. Automated health scoring enables 2.4x more accounts per customer success manager.",
    chartType: 'Line',
    chartData: {
      title: 'Customer Touchpoint Optimization',
      subtitle: 'Before and after AI implementation',
      x: ['Onboarding', 'Technical Support', 'Business Reviews', 'Training', 'Renewal Process', 'Overall'],
      y: [42, 37, 31, 28, 33, 37],
      xAxisLabel: 'Customer Journey Stage',
      yAxisLabel: 'Efficiency Improvement %'
    }
  },
  'health_scoring': {
    insight: "AI-powered customer health scoring achieves 84% accuracy in predicting renewals when using a comprehensive data model. Traditional scoring methods based only on product usage and support tickets achieve just 57% accuracy.",
    chartType: 'Bar',
    chartData: {
      title: 'Customer Health Score Accuracy',
      subtitle: 'By data model type',
      x: ['Comprehensive AI Model', 'Usage & Support Only', 'Financial Indicators Only', 'Engagement Only', 'Manual CSM Rating'],
      y: [84, 57, 51, 48, 62],
      xAxisLabel: 'Health Score Model',
      yAxisLabel: 'Prediction Accuracy %'
    }
  },
  'experience_impact': {
    insight: "Customer experience metrics improve dramatically with AI assistance, with first contact resolution increasing by 47% and time to resolution decreasing by 38%. Customer effort scores improve by 31% when AI is used to streamline processes.",
    chartType: 'Radar',
    chartData: {
      title: 'AI Impact on Customer Experience',
      subtitle: 'Percentage improvement by metric',
      x: ['First Contact Resolution', 'Time to Resolution', 'Customer Effort', 'CSAT', 'Self-Service Success', 'Agent Effectiveness'],
      y: [47, 38, 31, 27, 42, 33]
    }
  }
};