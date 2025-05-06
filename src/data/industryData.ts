import { VisualizationResult } from '../types';

// Industry-specific visualization data for the demo agent
// Each industry has multiple chart types to showcase variety

export const manufacturingVisualizations: Record<string, VisualizationResult> = {
  'roi': {
    insight: "Manufacturing companies implementing AI see an average ROI of 267% over 3 years, with predictive maintenance providing the highest returns. Companies deploying predictive maintenance solutions report 73% reduction in unexpected downtime and 27% decrease in maintenance costs.",
    chartType: 'Column',
    chartData: {
      title: 'AI ROI in Manufacturing',
      subtitle: 'Return on investment by application area',
      x: ['Predictive Maintenance', 'Quality Control', 'Supply Chain', 'Production Planning', 'Energy Management', 'Inventory Optimization'],
      y: [267, 183, 156, 142, 115, 97],
      xAxisLabel: 'Application Area',
      yAxisLabel: 'ROI %'
    }
  },
  'adoption': {
    insight: "Manufacturing has seen 45% compound annual growth in AI adoption since 2020, driven primarily by Industry 4.0 initiatives. The sector now ranks 5th in overall AI adoption, up from 8th position in 2020.",
    chartType: 'Line',
    chartData: {
      title: 'AI Adoption in Manufacturing',
      subtitle: '2020-2024 growth trend',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [15, 22, 30, 45, 60, 72],
      xAxisLabel: 'Year',
      yAxisLabel: 'Adoption Rate %'
    }
  },
  'use_cases': {
    insight: "Predictive maintenance dominates manufacturing AI applications at 36%, followed by quality control at 28%. Process automation, while only representing 6% of current deployments, is the fastest-growing category with 87% year-over-year implementation growth.",
    chartType: 'Pie',
    chartData: {
      title: 'AI Use Cases in Manufacturing',
      subtitle: '2024 distribution',
      x: ['Predictive Maintenance', 'Quality Control', 'Supply Chain Optimization', 'Inventory Management', 'Process Automation', 'Energy Optimization'],
      y: [36, 28, 18, 12, 6, 0]
    }
  },
  'quality_improvement': {
    insight: "Manufacturing quality metrics show substantial improvement with AI implementation, with defect detection accuracy increasing by 63% and overall product quality scores improving by 37%.",
    chartType: 'Bar',
    chartData: {
      title: 'Manufacturing Quality Improvements from AI',
      subtitle: 'Percentage improvement by quality metric',
      x: ['Defect Detection', 'Product Quality Score', 'First Pass Yield', 'Customer Returns', 'Compliance Rate', 'Consistency Score'],
      y: [63, 37, 29, 34, 21, 18],
      xAxisLabel: 'Quality Metric',
      yAxisLabel: 'Improvement %'
    }
  },
  'efficiency_gains': {
    insight: "AI-optimized production lines show 23% higher overall equipment effectiveness (OEE) and 31% lower energy consumption compared to traditional systems. Labor productivity increases by 26% when AI assistance tools are implemented.",
    chartType: 'Radar',
    chartData: {
      title: 'Manufacturing Efficiency Gains from AI',
      subtitle: 'Percentage improvement across metrics',
      x: ['OEE', 'Energy Efficiency', 'Labor Productivity', 'Setup Time Reduction', 'Material Utilization', 'Production Flexibility'],
      y: [23, 31, 26, 19, 17, 24]
    }
  }
};

export const healthcareVisualizations: Record<string, VisualizationResult> = {
  'impact': {
    insight: "Healthcare organizations implementing AI see an average 23% reduction in administrative costs and 18% improvement in patient outcomes. The most significant administrative savings come from automated documentation (41% time reduction) and scheduling optimization (37% efficiency gain).",
    chartType: 'Bar',
    chartData: {
      title: 'AI Impact in Healthcare',
      subtitle: 'Percentage improvement by category',
      x: ['Admin Costs', 'Patient Outcomes', 'Diagnostic Accuracy', 'Treatment Planning', 'Staff Efficiency', 'Readmission Rates'],
      y: [23, 18, 15, 12, 9, 7],
      xAxisLabel: 'Category',
      yAxisLabel: 'Improvement %'
    }
  },
  'investment': {
    insight: "Healthcare AI investments have grown 5.8x since 2020, with radiology and diagnostics receiving the largest share of funding. The COVID-19 pandemic accelerated investment, with a 78% year-over-year increase in 2021 alone.",
    chartType: 'Line',
    chartData: {
      title: 'Healthcare AI Investment Growth',
      subtitle: 'Annual investment (indexed to 2020)',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [100, 180, 320, 480, 580, 730],
      xAxisLabel: 'Year',
      yAxisLabel: 'Index (2020=100)'
    }
  },
  'adoption_barriers': {
    insight: "Data privacy and regulatory compliance remain the top barriers to AI adoption in healthcare, cited by 58% of organizations. Integration with legacy systems is a significant challenge for 43% of healthcare providers.",
    chartType: 'Column',
    chartData: {
      title: 'Barriers to AI Adoption in Healthcare',
      subtitle: 'Percentage of organizations citing each barrier',
      x: ['Data Privacy', 'Regulatory Compliance', 'Integration Complexity', 'Cost', 'Talent Gaps', 'Clinician Acceptance'],
      y: [58, 52, 43, 38, 35, 29],
      xAxisLabel: 'Barrier',
      yAxisLabel: 'Organizations Citing %'
    }
  },
  'diagnostic_accuracy': {
    insight: "AI-assisted diagnostics significantly improve accuracy across medical specialties, with pathology seeing a 28% improvement and radiology close behind at 26%. Dermatology has shown the most dramatic improvement, with AI systems reducing misdiagnosis rates by 31%.",
    chartType: 'Column',
    chartData: {
      title: 'AI Impact on Diagnostic Accuracy',
      subtitle: 'Percentage improvement by specialty',
      x: ['Dermatology', 'Pathology', 'Radiology', 'Cardiology', 'Ophthalmology', 'Neurology'],
      y: [31, 28, 26, 22, 19, 17],
      xAxisLabel: 'Medical Specialty',
      yAxisLabel: 'Accuracy Improvement %'
    }
  },
  'telemedicine_growth': {
    insight: "AI-enhanced telemedicine has grown 7.2x since 2020, with diagnostic accuracy and patient satisfaction showing substantial improvements. AI-powered symptom checkers and preliminary diagnoses improve appointment efficiency by 42%.",
    chartType: 'Area',
    chartData: {
      title: 'AI-Enhanced Telemedicine Growth',
      subtitle: 'Indexed to 2020 baseline',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [100, 320, 460, 580, 720, 850],
      xAxisLabel: 'Year',
      yAxisLabel: 'Growth Index'
    }
  }
};

export const financeVisualizations: Record<string, VisualizationResult> = {
  'adoption': {
    insight: "The finance sector leads AI adoption with 78% of institutions deploying at least one AI solution, compared to 45% cross-industry average. Banking leads the financial sector with 83% adoption, followed by investment management at 76%.",
    chartType: 'Column',
    chartData: {
      title: 'AI Adoption by Industry',
      subtitle: 'Percentage of organizations using AI',
      x: ['Finance', 'Technology', 'Healthcare', 'Retail', 'Manufacturing', 'Energy'],
      y: [78, 65, 52, 48, 45, 39],
      xAxisLabel: 'Industry',
      yAxisLabel: 'Adoption Rate %'
    }
  },
  'use_cases': {
    insight: "Fraud detection is the leading AI use case in financial services at 42%, followed by algorithmic trading at 23%. Risk assessment applications are the fastest-growing category, with 57% year-over-year implementation growth.",
    chartType: 'Donut',
    chartData: {
      title: 'AI Use Cases in Financial Services',
      subtitle: '2024 distribution',
      x: ['Fraud Detection', 'Algorithmic Trading', 'Credit Scoring', 'Customer Service', 'Compliance', 'Risk Assessment'],
      y: [42, 23, 18, 12, 5, 0]
    }
  },
  'productivity': {
    insight: "Financial institutions using AI report a 34% increase in analyst productivity and 28% reduction in manual processing time. The most dramatic improvements are seen in compliance efficiency, with 31% less time spent on regulatory reporting.",
    chartType: 'Radar',
    chartData: {
      title: 'AI Impact in Financial Services',
      subtitle: 'Percentage improvement by category',
      x: ['Analyst Productivity', 'Manual Processing', 'Error Reduction', 'Decision Time', 'Compliance Efficiency', 'Customer Response'],
      y: [34, 28, 42, 37, 31, 25]
    }
  },
  'fraud_prevention': {
    insight: "AI-powered fraud prevention systems in financial institutions show 67% higher detection rates and 58% fewer false positives compared to rule-based systems. Transaction monitoring speed improves by 92%, enabling real-time intervention.",
    chartType: 'Bar',
    chartData: {
      title: 'AI vs. Traditional Fraud Prevention',
      subtitle: 'Performance comparison (% improvement)',
      x: ['Detection Rate', 'False Positive Reduction', 'Processing Speed', 'Coverage', 'Adaptability', 'Cost Efficiency'],
      y: [67, 58, 92, 41, 83, 37],
      xAxisLabel: 'Performance Metric',
      yAxisLabel: 'Improvement %'
    }
  },
  'investment_returns': {
    insight: "Hedge funds using AI for investment decisions outperform traditional funds by an average of 7.3 percentage points annually. The outperformance gap has widened from 3.2 points in 2020 to 7.3 points in 2024.",
    chartType: 'Line',
    chartData: {
      title: 'AI vs. Traditional Investment Returns',
      subtitle: 'Annual outperformance in percentage points',
      x: ['2020', '2021', '2022', '2023', '2024'],
      y: [3.2, 4.7, 5.8, 6.5, 7.3],
      xAxisLabel: 'Year',
      yAxisLabel: 'Outperformance (Percentage Points)'
    }
  }
};

export const retailVisualizations: Record<string, VisualizationResult> = {
  'conversion': {
    insight: "Retailers using AI-powered recommendation engines see an average 27% increase in conversion rates and 31% higher average order value. The impact is even higher in specialty retail, where personalization drives a 42% conversion improvement.",
    chartType: 'Bar',
    chartData: {
      title: 'AI Impact on Retail Performance',
      subtitle: 'Percentage improvement by metric',
      x: ['Conversion Rate', 'Average Order Value', 'Customer Retention', 'Inventory Turnover', 'Marketing ROI', 'Cart Abandonment'],
      y: [27, 31, 22, 18, 34, 19],
      xAxisLabel: 'Metric',
      yAxisLabel: 'Improvement %'
    }
  },
  'investment': {
    insight: "AI investments in retail have focused primarily on customer experience (38%) and inventory management (27%) applications. Visual search and virtual try-on technologies are the fastest-growing investment categories, with 96% year-over-year increase.",
    chartType: 'Pie',
    chartData: {
      title: 'Retail AI Investment Allocation',
      subtitle: 'Distribution by application area',
      x: ['Customer Experience', 'Inventory Management', 'Pricing Optimization', 'Fraud Prevention', 'Supply Chain', 'Store Operations'],
      y: [38, 27, 18, 10, 7, 0]
    }
  },
  'growth': {
    insight: "AI-powered e-commerce has grown at 2.4x the rate of traditional e-commerce since 2020, with personalization driving the biggest gains. By 2024, retailers using advanced AI report 318% higher growth than their 2020 baseline, compared to 132% for non-AI retailers.",
    chartType: 'Line',
    chartData: {
      title: 'E-commerce Growth: AI vs. Traditional',
      subtitle: 'Indexed growth (2020 = 100)',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [100, 142, 196, 265, 318, 387],
      xAxisLabel: 'Year',
      yAxisLabel: 'Growth Index'
    }
  },
  'customer_insights': {
    insight: "AI-driven customer analytics provide retailers with deeper insights, improving customer segmentation accuracy by 47% and behavioral prediction by 42%. This translates to 38% higher marketing campaign performance.",
    chartType: 'Column',
    chartData: {
      title: 'AI Impact on Customer Analytics',
      subtitle: 'Improvement percentage by capability',
      x: ['Segmentation Accuracy', 'Behavioral Prediction', 'Lifetime Value Estimation', 'Churn Prediction', 'Next Purchase Prediction', 'Sentiment Analysis'],
      y: [47, 42, 35, 32, 28, 24],
      xAxisLabel: 'Analytical Capability',
      yAxisLabel: 'Accuracy Improvement %'
    }
  },
  'inventory_optimization': {
    insight: "Retailers using AI for inventory management reduce stockouts by 38% and overstock situations by 32%, while decreasing overall inventory costs by 21%. These improvements lead to 3.7% higher profit margins on average.",
    chartType: 'Radar',
    chartData: {
      title: 'AI-Powered Inventory Optimization',
      subtitle: 'Percentage improvement by metric',
      x: ['Stockout Reduction', 'Overstock Reduction', 'Inventory Cost', 'Turnover Rate', 'Forecast Accuracy', 'Shipping Efficiency'],
      y: [38, 32, 21, 26, 42, 19]
    }
  }
};

export const technologyVisualizations: Record<string, VisualizationResult> = {
  'cloud_growth': {
    insight: "Enterprise cloud spend on AI workloads has grown 3.8x since 2020, with specialized AI infrastructure being the fastest growing segment. This growth significantly outpaces the overall cloud market's 2.3x expansion during the same period.",
    chartType: 'Area',
    chartData: {
      title: 'Enterprise Cloud AI Spend',
      subtitle: 'Growth indexed to 2020',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [100, 150, 220, 320, 380, 450],
      xAxisLabel: 'Year',
      yAxisLabel: 'Index (2020=100)'
    }
  },
  'provider_preference': {
    insight: "Among enterprise customers, 62% prefer cloud providers that offer integrated AI services over separate vendors for cloud and AI capabilities. This represents a 24 percentage point increase from 2021, when only 38% preferred integrated offerings.",
    chartType: 'Column',
    chartData: {
      title: 'Enterprise Cloud Provider Preferences',
      subtitle: 'Percentage of enterprises by preference type',
      x: ['Integrated AI Services', 'Best-of-Breed', 'In-house Development', 'Hybrid Approach', 'No Preference'],
      y: [62, 19, 7, 12, 0],
      xAxisLabel: 'Approach',
      yAxisLabel: 'Enterprises %'
    }
  },
  'devops': {
    insight: "DevOps teams using AI-powered tools report 42% faster deployment cycles and 35% fewer production incidents. The most significant improvements are in deployment frequency, which increases by an average of 3.7x after implementing AI-assisted DevOps practices.",
    chartType: 'Radar',
    chartData: {
      title: 'AI Impact on DevOps',
      subtitle: 'Percentage improvement by metric',
      x: ['Deployment Frequency', 'Lead Time', 'MTTR', 'Change Failure Rate', 'Team Productivity', 'Code Quality'],
      y: [42, 38, 35, 27, 31, 26]
    }
  },
  'software_development': {
    insight: "AI-assisted software development shows dramatic productivity improvements, with code generation features reducing development time by 47% and debugging assistance cutting troubleshooting time by 38%.",
    chartType: 'Bar',
    chartData: {
      title: 'AI Impact on Software Development',
      subtitle: 'Time savings by activity',
      x: ['Code Generation', 'Debugging', 'Code Review', 'Documentation', 'Testing', 'Requirements Analysis'],
      y: [47, 38, 31, 28, 25, 21],
      xAxisLabel: 'Development Activity',
      yAxisLabel: 'Time Reduction %'
    }
  },
  'api_ecosystem': {
    insight: "The API ecosystem has grown 4.2x since 2020, with AI/ML APIs showing the fastest growth at 7.3x. Data processing and analytics APIs now represent 37% of all enterprise API calls, highlighting the central role of data in modern applications.",
    chartType: 'Line',
    chartData: {
      title: 'Enterprise API Ecosystem Growth',
      subtitle: 'By category, indexed to 2020',
      x: ['2020', '2021', '2022', '2023', '2024'],
      y: [100, 178, 268, 345, 420],
      xAxisLabel: 'Year',
      yAxisLabel: 'Growth Index'
    }
  }
};

export const securityVisualizations: Record<string, VisualizationResult> = {
  'detection': {
    insight: "Organizations using AI for cybersecurity detect threats 63% faster and reduce false positives by 47% compared to traditional methods. The impact is even more pronounced for zero-day threats, with 78% faster detection times.",
    chartType: 'Radar',
    chartData: {
      title: 'AI Security Improvement Metrics',
      subtitle: 'Percentage improvement by category',
      x: ['Threat Detection', 'False Positive Reduction', 'Response Time', 'Incident Resolution', 'Compliance', 'Coverage'],
      y: [63, 47, 42, 38, 29, 51]
    }
  },
  'budget': {
    insight: "Cybersecurity budgets have shifted dramatically, with AI-powered security tools now representing 34% of total security spending, up from 12% in 2020. Traditional signature-based solutions have decreased from 48% to 27% of budget allocation.",
    chartType: 'Line',
    chartData: {
      title: 'AI Share of Security Budgets',
      subtitle: '2020-2024 trend',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [12, 18, 25, 31, 34, 41],
      xAxisLabel: 'Year',
      yAxisLabel: 'Percentage of Security Budget'
    }
  },
  'threats': {
    insight: "AI-powered cyberattacks now account for 47% of all enterprise security breaches, requiring advanced AI defense systems. The sophistication of these attacks has increased 3.8x since 2020, measured by evasion capability and mutation speed.",
    chartType: 'Pie',
    chartData: {
      title: 'Enterprise Security Breach Sources',
      subtitle: '2024 distribution',
      x: ['AI-Powered Attacks', 'Traditional Malware', 'Social Engineering', 'Insider Threats', 'Supply Chain', 'Physical Security'],
      y: [47, 23, 15, 8, 5, 2]
    }
  },
  'compliance_automation': {
    insight: "Organizations using AI for security compliance management reduce audit preparation time by 61% and compliance-related costs by 37%. The most significant improvement is seen in continuous monitoring capabilities, which improve by 83%.",
    chartType: 'Column',
    chartData: {
      title: 'AI Impact on Security Compliance',
      subtitle: 'Percentage improvement by metric',
      x: ['Audit Preparation Time', 'Compliance Costs', 'Finding Remediation', 'Control Effectiveness', 'Documentation Quality', 'Continuous Monitoring'],
      y: [61, 37, 43, 52, 29, 83],
      xAxisLabel: 'Compliance Metric',
      yAxisLabel: 'Improvement %'
    }
  },
  'risk_reduction': {
    insight: "Implementing AI-based security solutions reduces overall organizational risk exposure by 42% within the first year, with the risk score continuing to improve by approximately 12-15% annually in subsequent years.",
    chartType: 'Line',
    chartData: {
      title: 'Security Risk Reduction with AI',
      subtitle: 'Risk exposure score (lower is better)',
      x: ['Pre-Implementation', 'Year 1', 'Year 2', 'Year 3', 'Year 4'],
      y: [100, 58, 45, 35, 29],
      xAxisLabel: 'Timeline',
      yAxisLabel: 'Risk Exposure Index'
    }
  }
};