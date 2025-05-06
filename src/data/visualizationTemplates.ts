import { VisualizationResult } from '../types';

// This file contains visualization templates for different chart types and scenarios
// It provides a library of reusable templates for the visualization agent to use

export const barChartTemplates: Record<string, VisualizationResult> = {
  'industry_comparison': {
    insight: "AI adoption varies significantly across industries, with Finance leading at 78% and Manufacturing at 45%. Companies in the finance sector are investing heavily in AI to improve risk assessment, fraud detection, and automated trading systems.",
    chartType: 'Bar',
    chartData: {
      title: 'AI Adoption by Industry',
      subtitle: 'Percentage of organizations using AI in 2024',
      x: ['Finance', 'Technology', 'Healthcare', 'Retail', 'Manufacturing', 'Energy'],
      y: [78, 65, 52, 48, 45, 39],
      xAxisLabel: 'Industry',
      yAxisLabel: 'Adoption Rate %'
    }
  },
  'cloud_services': {
    insight: "67% of Fortune 500 companies using AWS deploy AI workloads on SageMaker, making it the leading managed ML service in enterprise. This represents a 42% year-over-year increase in enterprise SageMaker adoption.",
    chartType: 'Bar',
    chartData: {
      title: 'AWS AI Service Adoption Among Fortune 500',
      subtitle: 'Percentage of companies using each service',
      x: ['SageMaker', 'Rekognition', 'Comprehend', 'Forecast', 'Personalize', 'Textract'],
      y: [67, 42, 35, 28, 21, 18],
      xAxisLabel: 'Service',
      yAxisLabel: 'Adoption %'
    }
  },
  'healthcare_impact': {
    insight: "Healthcare organizations implementing AI see an average 23% reduction in administrative costs and 18% improvement in patient outcomes. Diagnostic accuracy shows a 15% improvement when AI augments clinician decision-making.",
    chartType: 'Bar',
    chartData: {
      title: 'AI Impact in Healthcare',
      subtitle: 'Percentage improvement by category',
      x: ['Admin Costs', 'Patient Outcomes', 'Diagnostic Accuracy', 'Treatment Planning', 'Staff Efficiency', 'Patient Satisfaction'],
      y: [23, 18, 15, 12, 9, 7],
      xAxisLabel: 'Category',
      yAxisLabel: 'Improvement %'
    }
  },
  'security_improvements': {
    insight: "Organizations using AI-based security solutions report significant improvements across key metrics, with threat detection speed improving by 74% and false positives decreasing by 59%.",
    chartType: 'Bar',
    chartData: {
      title: 'Security Improvements from AI Implementation',
      subtitle: 'Percentage improvement by security metric',
      x: ['Threat Detection Speed', 'False Positives', 'Incident Response Time', 'Attack Surface Coverage', 'Compliance Verification', 'Time to Remediation'],
      y: [74, 59, 47, 43, 38, 35],
      xAxisLabel: 'Security Metric',
      yAxisLabel: 'Improvement %'
    }
  },
  'ai_investment_returns': {
    insight: "Organizations investing in AI see varying returns across different use cases, with customer service automation leading at 187% ROI and predictive maintenance following at 156%. Even the lowest-performing use cases show positive returns above 45%.",
    chartType: 'Bar',
    chartData: {
      title: 'AI Investment Returns by Use Case',
      subtitle: 'ROI percentage after 2 years',
      x: ['Customer Service', 'Predictive Maintenance', 'Fraud Detection', 'Supply Chain', 'Quality Control', 'HR Automation'],
      y: [187, 156, 142, 128, 98, 45],
      xAxisLabel: 'Use Case',
      yAxisLabel: 'ROI %'
    }
  },
  'data_quality_impact': {
    insight: "Data quality improvements directly correlate with AI model performance, with organizations achieving 92% accuracy in high-quality data environments compared to 67% in low-quality data scenarios.",
    chartType: 'Bar',
    chartData: {
      title: 'AI Model Performance by Data Quality',
      subtitle: 'Model accuracy percentage',
      x: ['High Quality', 'Medium Quality', 'Low Quality', 'Unstructured', 'Historical', 'Real-time'],
      y: [92, 85, 67, 78, 82, 88],
      xAxisLabel: 'Data Quality Level',
      yAxisLabel: 'Accuracy %'
    }
  },
  'implementation_timeline': {
    insight: "AI project implementation timelines vary significantly by complexity, with basic automation projects completing in 3-4 months while complex ML systems may take 12-18 months to fully deploy.",
    chartType: 'Bar',
    chartData: {
      title: 'AI Project Implementation Timeline',
      subtitle: 'Average duration in months',
      x: ['Basic Automation', 'Data Analytics', 'ML Models', 'Deep Learning', 'Custom Solutions', 'Enterprise-wide'],
      y: [3.5, 5.2, 8.7, 12.4, 15.8, 18.2],
      xAxisLabel: 'Project Type',
      yAxisLabel: 'Duration (Months)'
    }
  }
};

export const lineChartTemplates: Record<string, VisualizationResult> = {
  'adoption_trend': {
    insight: "Enterprise AI adoption has reached 56% in 2024, up from 27% in 2020, showing accelerating implementation rates. The steepest increase occurred between 2022-2023 when generative AI technologies became widely available.",
    chartType: 'Line',
    chartData: {
      title: 'Enterprise AI Adoption',
      subtitle: '2020-2024 growth trend',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [27, 34, 42, 51, 56, 63],
      xAxisLabel: 'Year',
      yAxisLabel: 'Adoption Rate %'
    }
  },
  'cloud_growth': {
    insight: "Google Cloud Platform usage has grown 4.5x among enterprise AI/ML workloads since 2020, with BigQuery seeing the highest adoption rate. This growth outpaces the overall cloud market expansion of 2.7x in the same period.",
    chartType: 'Line',
    chartData: {
      title: 'Google Cloud AI Services Growth',
      subtitle: '2020-2024 adoption trends',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [12, 18, 29, 42, 54, 68],
      xAxisLabel: 'Year',
      yAxisLabel: 'Adoption Rate %'
    }
  },
  'manufacturing_trend': {
    insight: "AI adoption in manufacturing has quadrupled since 2020, with predictive maintenance and quality control being the top use cases. This growth is largely driven by Industry 4.0 initiatives and IIoT sensor deployment.",
    chartType: 'Line',
    chartData: {
      title: 'AI Adoption in Manufacturing',
      subtitle: '2020-2024 growth trend',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [15, 22, 30, 45, 60, 74],
      xAxisLabel: 'Year',
      yAxisLabel: 'Adoption Rate %'
    }
  },
  'roi_timeline': {
    insight: "Companies implementing AI solutions typically see ROI growth accelerate after the first year, with cumulative returns reaching 378% by year 4 as the technology matures and use cases expand within the organization.",
    chartType: 'Line',
    chartData: {
      title: 'AI Implementation Cumulative ROI',
      subtitle: 'ROI timeline over 4-year period',
      x: ['Implementation', 'Year 1', 'Year 2', 'Year 3', 'Year 4'],
      y: [-100, 45, 183, 271, 378],
      xAxisLabel: 'Timeline',
      yAxisLabel: 'Cumulative ROI %'
    }
  },
  'spend_forecast': {
    insight: "Enterprise AI spending is projected to grow at a 28.5% CAGR through 2028, significantly outpacing overall IT budget growth of 5.7%. By 2028, AI will represent approximately 22% of total enterprise IT expenditure.",
    chartType: 'Line',
    chartData: {
      title: 'Enterprise AI Spend Forecast',
      subtitle: '2023-2028 annual growth (billions USD)',
      x: ['2023', '2024', '2025', '2026', '2027', '2028'],
      y: [93, 120, 154, 198, 254, 326],
      xAxisLabel: 'Year',
      yAxisLabel: 'Market Size ($ Billions)'
    }
  }
};

export const pieChartTemplates: Record<string, VisualizationResult> = {
  'cloud_market_share': {
    insight: "AWS remains the leader in cloud AI services with 33% market share, but Azure has grown to 28% in 2024, narrowing the gap. Google Cloud has seen steady growth to 22%, particularly in ML/AI workloads.",
    chartType: 'Pie',
    chartData: {
      title: 'Cloud AI Services Market Share',
      subtitle: '2024 distribution',
      x: ['AWS', 'Azure', 'Google Cloud', 'IBM Cloud', 'Oracle Cloud', 'Others'],
      y: [33, 28, 22, 8, 4, 5]
    }
  },
  'azure_services': {
    insight: "Azure's AI capabilities are a key driver in Microsoft's cloud revenue growth, with 72% of enterprise Azure customers using at least one AI service. Cognitive Services leads with 35% share of Azure AI workloads.",
    chartType: 'Pie',
    chartData: {
      title: 'Azure AI Service Distribution',
      subtitle: 'Market share by service category',
      x: ['Cognitive Services', 'Machine Learning', 'Bot Service', 'OpenAI Service', 'Databricks', 'Other'],
      y: [35, 27, 12, 15, 6, 5]
    }
  },
  'security_breaches': {
    insight: "Among enterprise security breaches, 42% are now attributed to AI-powered attacks, highlighting the growing need for AI-based defense systems. Traditional attack methods represent a decreasing share of successful breaches.",
    chartType: 'Pie',
    chartData: {
      title: 'Enterprise Security Breach Sources',
      subtitle: '2024 distribution',
      x: ['AI-Powered Attacks', 'Human Error', 'Credential Theft', 'Supply Chain', 'Unpatched Systems', 'Insider Threats'],
      y: [42, 23, 15, 9, 7, 4]
    }
  },
  'ai_application_areas': {
    insight: "Customer experience remains the leading application area for enterprise AI at 34%, followed by process automation at 28%. Research applications, while showing high ROI, currently receive the smallest share of implementation focus.",
    chartType: 'Pie',
    chartData: {
      title: 'Enterprise AI Application Areas',
      subtitle: '2024 implementation distribution',
      x: ['Customer Experience', 'Process Automation', 'Analytics & Insights', 'Product Development', 'Decision Support', 'Research'],
      y: [34, 28, 17, 10, 8, 3]
    }
  },
  'tech_stack_components': {
    insight: "In modern tech stacks, containerized services now account for 38% of deployments, with serverless gradually gaining share at 17%. Traditional VM deployments continue to decrease, now representing only 24% of new implementations.",
    chartType: 'Pie',
    chartData: {
      title: 'Enterprise Tech Stack Components',
      subtitle: '2024 deployment methods',
      x: ['Containerized Services', 'Virtual Machines', 'Serverless Functions', 'PaaS Solutions', 'Bare Metal', 'Edge Computing'],
      y: [38, 24, 17, 12, 5, 4]
    }
  }
};

export const columnChartTemplates: Record<string, VisualizationResult> = {
  'salesforce_impact': {
    insight: "Organizations using Salesforce + AI report a 34% increase in sales productivity and 28% improvement in lead conversion rates. Customer retention and pipeline accuracy also see significant improvements.",
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
  'budget_allocation': {
    insight: "Enterprise IT budgets in 2024 show AI/ML initiatives receiving 24% of funding, surpassing cybersecurity (22%) for the first time. Legacy system maintenance continues to decrease as a percentage of total IT spend.",
    chartType: 'Column',
    chartData: {
      title: 'Enterprise IT Budget Allocation',
      subtitle: '2024 breakdown by category',
      x: ['AI/ML', 'Cybersecurity', 'Cloud Infrastructure', 'Application Development', 'Legacy Maintenance', 'Digital Transformation'],
      y: [24, 22, 19, 17, 9, 9],
      xAxisLabel: 'Category',
      yAxisLabel: 'Budget Allocation %'
    }
  },
  'tech_adoption_barriers': {
    insight: "Talent gaps remain the primary barrier to AI adoption in enterprises at 38%, followed by data quality issues at 27%. Regulatory concerns are increasingly significant at 18%, especially in highly regulated industries.",
    chartType: 'Column',
    chartData: {
      title: 'Barriers to Enterprise AI Adoption',
      subtitle: 'Primary challenges by percentage',
      x: ['Talent Gaps', 'Data Quality', 'Regulatory Concerns', 'Integration Complexity', 'Cost', 'Organizational Resistance'],
      y: [38, 27, 18, 12, 10, 5],
      xAxisLabel: 'Barrier',
      yAxisLabel: 'Organizations Citing %'
    }
  },
  'cloud_cost_efficiency': {
    insight: "Organizations optimizing their cloud spend with AI tools report significant cost savings, with automated scaling delivering 42% improvement and resource optimization providing 37% better cost efficiency.",
    chartType: 'Column',
    chartData: {
      title: 'AI-Driven Cloud Cost Optimizations',
      subtitle: 'Percentage improvement by technique',
      x: ['Automated Scaling', 'Resource Optimization', 'Workload Scheduling', 'Instance Right-Sizing', 'Spot Instance Usage', 'Reserved Capacity'],
      y: [42, 37, 29, 24, 18, 16],
      xAxisLabel: 'Optimization Technique',
      yAxisLabel: 'Cost Efficiency Gain %'
    }
  },
  'developer_productivity': {
    insight: "Developer productivity tools with AI assistance increase output by an average of 34%, with code generation providing the largest gain at 47% improvement. Code review and debugging assistance follow with 38% and 31% improvements respectively.",
    chartType: 'Column',
    chartData: {
      title: 'AI Impact on Developer Productivity',
      subtitle: 'Percentage improvement by function',
      x: ['Code Generation', 'Code Review', 'Debugging', 'Documentation', 'Testing', 'Deployment'],
      y: [47, 38, 31, 28, 25, 19],
      xAxisLabel: 'Function',
      yAxisLabel: 'Productivity Gain %'
    }
  },
  'ai_talent_demand': {
    insight: "The demand for AI talent has surged across industries, with machine learning engineers commanding the highest salaries at $156K average, followed by data scientists at $142K. Even entry-level AI roles show strong compensation above $85K.",
    chartType: 'Column',
    chartData: {
      title: 'AI Talent Compensation by Role',
      subtitle: 'Average annual salary in thousands USD',
      x: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'MLOps Engineer', 'AI Product Manager', 'Entry Level'],
      y: [156, 142, 138, 132, 128, 85],
      xAxisLabel: 'Role',
      yAxisLabel: 'Salary ($K)'
    }
  },
  'model_performance_metrics': {
    insight: "AI model performance varies significantly across different metrics, with accuracy reaching 94% in image recognition but dropping to 78% in natural language understanding tasks.",
    chartType: 'Column',
    chartData: {
      title: 'AI Model Performance by Task',
      subtitle: 'Accuracy percentage across different tasks',
      x: ['Image Recognition', 'Speech Recognition', 'Text Classification', 'Sentiment Analysis', 'Language Understanding', 'Recommendation'],
      y: [94, 89, 85, 82, 78, 91],
      xAxisLabel: 'Task Type',
      yAxisLabel: 'Accuracy %'
    }
  },
  'implementation_success': {
    insight: "AI implementation success rates vary by industry, with technology companies achieving 87% success while healthcare organizations face more challenges at 62% success rate.",
    chartType: 'Column',
    chartData: {
      title: 'AI Implementation Success Rate',
      subtitle: 'Percentage of successful deployments',
      x: ['Technology', 'Finance', 'Retail', 'Manufacturing', 'Healthcare', 'Education'],
      y: [87, 82, 78, 75, 62, 68],
      xAxisLabel: 'Industry',
      yAxisLabel: 'Success Rate %'
    }
  }
};

export const radarChartTemplates: Record<string, VisualizationResult> = {
  'security_metrics': {
    insight: "Organizations using AI for cybersecurity detect threats 63% faster and reduce false positives by 47% compared to traditional methods. Incident resolution speed improves by 42%, significantly reducing potential damage from breaches.",
    chartType: 'Radar',
    chartData: {
      title: 'AI Security Improvement Metrics',
      subtitle: 'Percentage improvement by category',
      x: ['Threat Detection', 'False Positive Reduction', 'Response Time', 'Incident Resolution', 'Compliance', 'Vulnerability Scanning'],
      y: [63, 47, 42, 38, 29, 34]
    }
  },
  'digital_maturity': {
    insight: "Companies with high AI maturity score 3.5x higher on digital transformation metrics than those in early stages of AI adoption. Customer experience shows the largest performance gap at 82% compared to laggard organizations.",
    chartType: 'Radar',
    chartData: {
      title: 'Digital Transformation Maturity',
      subtitle: 'Score comparison: AI leaders vs. laggards',
      x: ['Customer Experience', 'Operational Efficiency', 'Product Innovation', 'Employee Productivity', 'Risk Management', 'Data Utilization'],
      y: [82, 78, 73, 69, 85, 80]
    }
  },
  'saas_evaluation': {
    insight: "When evaluating SaaS platforms, enterprises rate security and reliability as top priorities with scores of 92 and 88 out of 100 respectively. Implementation time has become increasingly important, now rated at 78.",
    chartType: 'Radar',
    chartData: {
      title: 'Enterprise SaaS Evaluation Criteria',
      subtitle: 'Importance score out of 100',
      x: ['Security', 'Reliability', 'Feature Set', 'Implementation Time', 'Integration Capabilities', 'Cost', 'Support Quality'],
      y: [92, 88, 75, 78, 83, 72, 79]
    }
  },
  'language_model_comparison': {
    insight: "Enterprise language model benchmarks show varying strengths across models, with Model A excelling in reasoning (87) while Model B leads in code generation (91) and factual accuracy (85).",
    chartType: 'Radar',
    chartData: {
      title: 'Enterprise LLM Performance Comparison',
      subtitle: 'Benchmark scores across capabilities',
      x: ['Reasoning', 'Generation', 'Factual Accuracy', 'Code', 'Summarization', 'Privacy Protection'],
      y: [87, 79, 74, 91, 82, 68]
    }
  }
};

export const areaChartTemplates: Record<string, VisualizationResult> = {
  'cost_savings': {
    insight: "Companies implementing AI for business operations report cumulative cost savings of 53% over 3 years, with the biggest gains in year 2. The curve shows the typical acceleration of returns as AI systems mature and expand in scope.",
    chartType: 'Area',
    chartData: {
      title: 'Cumulative AI Cost Savings',
      subtitle: 'Percentage reduction over 3 years',
      x: ['Year 0', 'Year 1', 'Year 2', 'Year 3', 'Year 4'],
      y: [0, 18, 36, 53, 67],
      xAxisLabel: 'Timeline',
      yAxisLabel: 'Cumulative Savings %'
    }
  },
  'productivity_growth': {
    insight: "AI-powered productivity tools have driven a 67% increase in knowledge worker output since 2021, with development and creative roles seeing the highest gains. The steepest growth occurred in 2023 with the introduction of advanced coding and content generation tools.",
    chartType: 'Area',
    chartData: {
      title: 'AI-Driven Productivity Growth',
      subtitle: 'Percentage increase from 2021 baseline',
      x: ['2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [0, 22, 45, 67, 85],
      xAxisLabel: 'Year',
      yAxisLabel: 'Productivity Growth %'
    }
  },
  'data_growth': {
    insight: "Enterprise data volume is growing exponentially at 43% year-over-year, with AI-related data (including training sets, models, and analytics) now representing over 47% of all new data being stored.",
    chartType: 'Area',
    chartData: {
      title: 'Enterprise Data Growth',
      subtitle: 'Indexed to 2020 baseline',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [100, 143, 205, 293, 419, 599],
      xAxisLabel: 'Year',
      yAxisLabel: 'Data Volume Index'
    }
  },
  'adoption_comparison': {
    insight: "AI adoption among enterprises is following a faster curve than previous technology waves, reaching 56% adoption in 5 years compared to cloud computing (8 years) and mobile (10 years) to reach similar penetration.",
    chartType: 'Area',
    chartData: {
      title: 'Technology Adoption Curves',
      subtitle: 'Years to reach majority enterprise adoption',
      x: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8'],
      y: [5, 12, 25, 42, 56, 68, 75, 82],
      xAxisLabel: 'Years Since Introduction',
      yAxisLabel: 'Enterprise Adoption %'
    }
  },
  'talent_demand': {
    insight: "Demand for AI talent has grown 312% since 2020, with machine learning engineers seeing a 376% increase in job postings, driving substantial salary growth and creating a significant talent shortage.",
    chartType: 'Area',
    chartData: {
      title: 'AI Talent Demand Growth',
      subtitle: 'Indexed to 2020 baseline (100)',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [100, 164, 238, 312, 376, 425],
      xAxisLabel: 'Year',
      yAxisLabel: 'Demand Index'
    }
  }
};

export const donutChartTemplates: Record<string, VisualizationResult> = {
  'ai_allocation': {
    insight: "Enterprise AI investments show a balanced approach, with 32% going to process automation, 28% to customer-facing applications, and 24% to data analytics. Research applications receive only 5% despite their long-term strategic value.",
    chartType: 'Donut',
    chartData: {
      title: 'Enterprise AI Investment Allocation',
      subtitle: '2024 distribution by application area',
      x: ['Process Automation', 'Customer Experience', 'Data Analytics', 'Decision Support', 'Research', 'Other'],
      y: [32, 28, 24, 9, 5, 2]
    }
  },
  'cost_breakdown': {
    insight: "The total cost of AI ownership is shifting, with infrastructure now representing only 34% of costs while talent acquisition and model fine-tuning grow to 42% combined. Compliance costs have doubled since 2022, now at 8%.",
    chartType: 'Donut',
    chartData: {
      title: 'AI Total Cost of Ownership',
      subtitle: 'Breakdown by category',
      x: ['Infrastructure', 'Talent', 'Data Management', 'Model Fine-Tuning', 'Compliance', 'Integration'],
      y: [34, 25, 16, 17, 8, 0]
    }
  },
  'data_sources': {
    insight: "Enterprise AI systems rely on diverse data sources, with transactional databases providing 37% of training data, while unstructured documents and customer interactions represent 29% and 21% respectively.",
    chartType: 'Donut',
    chartData: {
      title: 'Enterprise AI Data Sources',
      subtitle: 'Distribution by data type',
      x: ['Transactional Databases', 'Unstructured Documents', 'Customer Interactions', 'IoT/Sensors', 'External APIs', 'Synthetic Data'],
      y: [37, 29, 21, 8, 3, 2]
    }
  },
  'tech_stack_distribution': {
    insight: "The modern enterprise AI tech stack is dominated by Python-based frameworks at 43%, followed by specialized AI platforms at 27% and cloud provider services at 18%. Proprietary systems continue to decrease in share.",
    chartType: 'Donut',
    chartData: {
      title: 'Enterprise AI Technology Stack',
      subtitle: 'Distribution by framework type',
      x: ['Python Frameworks', 'AI Platforms', 'Cloud Provider Services', 'Proprietary Systems', 'JavaScript Libraries', 'Other'],
      y: [43, 27, 18, 7, 3, 2]
    }
  },
  'workforce_impact': {
    insight: "AI is reshaping the enterprise workforce, with 38% of organizations reporting job enhancement as the primary impact, while 27% cite job creation. Only 14% report net job reduction, primarily in routine task categories.",
    chartType: 'Donut',
    chartData: {
      title: 'AI Impact on Enterprise Workforce',
      subtitle: 'Primary reported effects',
      x: ['Job Enhancement', 'Job Creation', 'Skill Transformation', 'Job Reduction', 'No Significant Impact', 'Mixed/Unclear'],
      y: [38, 27, 18, 14, 2, 1]
    }
  }
};

export const scatterChartTemplates: Record<string, VisualizationResult> = {
  'roi_vs_maturity': {
    insight: "Organizations further along the AI maturity curve demonstrate exponentially higher ROI from AI investments, with a clear inflection point occurring at maturity level 3 (scaled implementation).",
    chartType: 'Scatter',
    chartData: {
      title: 'AI ROI by Maturity Level',
      subtitle: 'Return on investment correlation with implementation maturity',
      x: ['Level 1', 'Level 1.5', 'Level 2', 'Level 2.5', 'Level 3', 'Level 3.5', 'Level 4', 'Level 4.5', 'Level 5'],
      y: [42, 68, 95, 138, 215, 287, 324, 378, 412],
      xAxisLabel: 'AI Maturity Level',
      yAxisLabel: 'ROI %'
    }
  }
};

export const waterfallChartTemplates: Record<string, VisualizationResult> = {
  'cost_reduction': {
    insight: "AI implementation provides cost reductions across multiple categories, with process automation delivering the largest savings at 27%, followed by predictive maintenance at 18%. After accounting for AI investment costs, organizations see 63% net savings.",
    chartType: 'Column',  // Using column as a substitute for waterfall since we don't have waterfall directly
    chartData: {
      title: 'AI-Driven Cost Reduction Breakdown',
      subtitle: 'Percentage contribution by category',
      x: ['Process Automation', 'Predictive Maintenance', 'Quality Improvement', 'Energy Optimization', 'Labor Efficiency', 'Implementation Cost', 'Net Savings'],
      y: [27, 18, 15, 12, 11, -20, 63],
      xAxisLabel: 'Category',
      yAxisLabel: 'Cost Impact %'
    }
  }
};

export const combinedChartTemplates: Record<string, VisualizationResult> = {
  'adoption_vs_roi': {
    insight: "While AI adoption continues to rise linearly, ROI growth is accelerating more rapidly, showing that organizations are becoming more effective at implementing AI solutions that deliver business value.",
    chartType: 'Column',  // Using column as substitute for combined
    chartData: {
      title: 'AI Adoption vs ROI Growth',
      subtitle: '2020-2024 indexed growth (2020=100)',
      x: ['2020', '2021', '2022', '2023', '2024'],
      y: [100, 156, 225, 312, 418],
      xAxisLabel: 'Year',
      yAxisLabel: 'Growth Index'
    }
  }
};

// New chart templates for additional chart types
export const bubbleChartTemplates: Record<string, VisualizationResult> = {
  'tech_comparison': {
    insight: "Enterprise tech investments show significant variance in ROI vs. implementation complexity, with AI and cloud technologies offering the highest returns despite moderate complexity scores.",
    chartType: 'Scatter', // Using scatter as a substitute for bubble
    chartData: {
      title: 'Technology ROI vs Implementation Complexity',
      subtitle: 'Bubble size represents relative market adoption',
      x: ['AI/ML', 'Cloud Infrastructure', 'Cybersecurity', 'Data Analytics', 'RPA', 'IoT', 'Blockchain'],
      y: [185, 157, 132, 149, 112, 95, 78],
      xAxisLabel: 'Technology Category',
      yAxisLabel: 'ROI %'
    }
  }
};

export const rangeBarTemplates: Record<string, VisualizationResult> = {
  'project_timelines': {
    insight: "Enterprise AI projects show wide variance in implementation timelines, with data preparation consistently consuming 35-50% of project time. ML model selection and training represents only 15-25% of the total timeline.",
    chartType: 'Bar', // Using bar as a substitute for range bar
    chartData: {
      title: 'AI Project Phase Durations',
      subtitle: 'Average time allocation by phase (weeks)',
      x: ['Data Preparation', 'Model Selection', 'Training', 'Validation', 'Deployment', 'Post-Release'],
      y: [12, 6, 4, 3, 5, 8],
      xAxisLabel: 'Project Phase',
      yAxisLabel: 'Duration (Weeks)'
    }
  }
};

export const boxPlotTemplates: Record<string, VisualizationResult> = {
  'performance_distribution': {
    insight: "AI model performance across industries shows significant variance, with financial services models demonstrating both the highest median accuracy (84%) and tightest distribution, while manufacturing shows wider performance variability.",
    chartType: 'Column', // Using column as a substitute for box plot
    chartData: {
      title: 'AI Model Performance Distribution by Industry',
      subtitle: 'Median accuracy percentage and variability',
      x: ['Financial Services', 'Healthcare', 'Retail', 'Manufacturing', 'Technology'],
      y: [84, 78, 72, 76, 81],
      xAxisLabel: 'Industry',
      yAxisLabel: 'Median Accuracy %'
    }
  }
};

export const candlestickTemplates: Record<string, VisualizationResult> = {
  'investment_trends': {
    insight: "AI venture funding shows quarterly volatility but maintains an upward trend, with Q2 2023 seeing the largest intra-quarter swing from $4.2B to $7.8B before closing at $6.5B as market sentiment stabilized.",
    chartType: 'Line', // Using line as a substitute for candlestick
    chartData: {
      title: 'Quarterly AI Venture Funding',
      subtitle: '2021-2024 investment trends ($ billion)',
      x: ['Q1 2021', 'Q2 2021', 'Q3 2021', 'Q4 2021', 'Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'],
      y: [2.8, 3.5, 4.2, 5.1, 4.7, 3.9, 5.3, 6.2, 5.8, 6.5, 7.2, 8.4, 9.1],
      xAxisLabel: 'Quarter',
      yAxisLabel: 'Investment Volume ($B)'
    }
  }
};

export const treemapTemplates: Record<string, VisualizationResult> = {
  'market_segments': {
    insight: "The enterprise AI market segmentation reveals language processing applications commanding 28% of the market, followed by predictive analytics at 23%. Computer vision applications have grown from 12% to 19% since 2022.",
    chartType: 'Pie', // Using pie as a substitute for treemap
    chartData: {
      title: 'Enterprise AI Market Segmentation',
      subtitle: '2024 market share by application type',
      x: ['Language Processing', 'Predictive Analytics', 'Computer Vision', 'Process Automation', 'Recommendation Engines', 'Other AI Applications'],
      y: [28, 23, 19, 16, 9, 5],
      xAxisLabel: 'Application Type',
      yAxisLabel: 'Market Share %'
    }
  }
};

export const heatmapTemplates: Record<string, VisualizationResult> = {
  'adoption_by_segment': {
    insight: "AI adoption heat mapping reveals financial services and healthcare leading in natural language processing implementations, while manufacturing dominates in computer vision. The public sector shows consistently low adoption across all AI categories.",
    chartType: 'Column', // Using column as a substitute for heatmap
    chartData: {
      title: 'AI Adoption Heat Map by Industry and Technology',
      subtitle: 'Adoption intensity score (0-100)',
      x: ['Financial Services', 'Healthcare', 'Manufacturing', 'Retail', 'Technology', 'Public Sector'],
      y: [86, 79, 68, 72, 84, 42],
      xAxisLabel: 'Industry',
      yAxisLabel: 'Average Adoption Score'
    }
  }
};

export const sankeyTemplates: Record<string, VisualizationResult> = {
  'data_flow': {
    insight: "Enterprise data flow analysis shows 43% of all generated data reaches analytical systems, but only 18% ultimately informs decision-making. The largest data loss occurs during the cleanup and transformation stages.",
    chartType: 'Bar', // Using bar as a substitute for sankey
    chartData: {
      title: 'Enterprise Data Flow Analysis',
      subtitle: 'Percentage of data utilized at each stage',
      x: ['Data Generation', 'Collection', 'Processing', 'Analysis', 'Decision Support', 'Automated Actions'],
      y: [100, 82, 64, 43, 18, 12],
      xAxisLabel: 'Data Pipeline Stage',
      yAxisLabel: 'Data Utilization %'
    }
  }
};

export const funnelTemplates: Record<string, VisualizationResult> = {
  'conversion_funnel': {
    insight: "AI-optimized marketing funnels show significantly higher conversion rates at each stage, with awareness-to-interest conversion improving from 22% to 38% and final purchase conversion rates doubling from 2.3% to 4.7%.",
    chartType: 'Column', // Using column as a substitute for funnel
    chartData: {
      title: 'AI-Optimized Marketing Funnel',
      subtitle: 'Conversion rates by funnel stage',
      x: ['Awareness', 'Interest', 'Consideration', 'Intent', 'Evaluation', 'Purchase'],
      y: [100, 38, 24, 12, 7.5, 4.7],
      xAxisLabel: 'Funnel Stage',
      yAxisLabel: 'Conversion Rate %'
    }
  }
};

export const gaugeTemplates: Record<string, VisualizationResult> = {
  'ai_readiness': {
    insight: "Enterprise AI readiness assessments show the technology sector leading with an average score of 76/100, while only 14% of organizations across all industries score above 80, indicating continued room for capability development.",
    chartType: 'Pie', // Using pie as a substitute for gauge
    chartData: {
      title: 'Enterprise AI Readiness Assessment',
      subtitle: 'Distribution of readiness scores across 500 enterprises',
      x: ['Low (0-40)', 'Medium (41-60)', 'High (61-80)', 'Very High (81-100)'],
      y: [22, 32, 32, 14],
      xAxisLabel: 'Readiness Category',
      yAxisLabel: 'Percentage of Organizations'
    }
  }
};

export const nightingaleTemplates: Record<string, VisualizationResult> = {
  'capability_assessment': {
    insight: "Organizational AI capability assessment reveals strongest performance in data infrastructure (78/100) and technical talent (72/100), with governance (48/100) and ethical frameworks (42/100) showing the most room for improvement.",
    chartType: 'Radar', // Using radar as a substitute for nightingale
    chartData: {
      title: 'Enterprise AI Capability Assessment',
      subtitle: 'Score out of 100 by capability area',
      x: ['Data Infrastructure', 'Technical Talent', 'Strategic Alignment', 'Process Integration', 'Governance', 'Ethical Framework'],
      y: [78, 72, 65, 56, 48, 42]
    }
  }
};

export const histogramTemplates: Record<string, VisualizationResult> = {
  'model_performance': {
    insight: "Distribution analysis of enterprise AI model performance shows 42% of models achieve 85-95% accuracy, while only 8% reach above 95%. Notably, models deployed since 2023 show a significantly higher likelihood of top-tier performance.",
    chartType: 'Column', // Using column as a substitute for histogram
    chartData: {
      title: 'AI Model Accuracy Distribution',
      subtitle: 'Percentage of models by accuracy range',
      x: ['<70%', '70-75%', '75-80%', '80-85%', '85-90%', '90-95%', '95-100%'],
      y: [5, 8, 12, 17, 25, 25, 8],
      xAxisLabel: 'Accuracy Range',
      yAxisLabel: 'Percentage of Models'
    }
  }
};

// --- Additional chart types from screenshot ---

export const coneFunnelTemplates: Record<string, VisualizationResult> = {
  'sales_conversion_cone': {
    insight: "Cone funnel visualization shows the narrowing of leads through the sales process, with the largest drop-off at the evaluation stage.",
    chartType: 'Column', // Substitute for cone funnel
    chartData: {
      title: 'Sales Conversion Cone Funnel',
      subtitle: 'Leads at each sales stage',
      x: ['Awareness', 'Interest', 'Consideration', 'Evaluation', 'Purchase'],
      y: [1000, 650, 400, 180, 90],
      xAxisLabel: 'Stage',
      yAxisLabel: 'Number of Leads'
    }
  }
};

export const pyramidTemplates: Record<string, VisualizationResult> = {
  'org_hierarchy': {
    insight: "Organizational pyramid shows the distribution of employees by level, with the largest group at the base and a small executive team at the top.",
    chartType: 'Column', // Substitute for pyramid
    chartData: {
      title: 'Organizational Hierarchy Pyramid',
      subtitle: 'Employee count by level',
      x: ['Entry', 'Associate', 'Manager', 'Director', 'VP', 'C-Suite'],
      y: [500, 200, 60, 20, 8, 2],
      xAxisLabel: 'Level',
      yAxisLabel: 'Employees'
    }
  }
};

export const radialGaugeTemplates: Record<string, VisualizationResult> = {
  'system_health': {
    insight: "Radial gauge shows current system health at 82%, indicating good but not perfect performance.",
    chartType: 'Pie', // Substitute for radial gauge
    chartData: {
      title: 'System Health Gauge',
      subtitle: 'Current health percentage',
      x: ['Healthy', 'Warning', 'Critical'],
      y: [82, 12, 6]
    }
  }
};

export const linearGaugeTemplates: Record<string, VisualizationResult> = {
  'project_progress': {
    insight: "Linear gauge shows project completion at 67%, with remaining work distributed across three phases.",
    chartType: 'Pie', // Substitute for linear gauge
    chartData: {
      title: 'Project Progress Gauge',
      subtitle: 'Completion and remaining phases',
      x: ['Completed', 'Phase 2', 'Phase 3', 'Phase 4'],
      y: [67, 15, 10, 8]
    }
  }
};

export const radialColumnTemplates: Record<string, VisualizationResult> = {
  'department_performance': {
    insight: "Radial column chart shows department performance scores, with Engineering leading and HR trailing.",
    chartType: 'Column', // Substitute for radial column
    chartData: {
      title: 'Department Performance (Radial)',
      subtitle: 'Performance score by department',
      x: ['Engineering', 'Sales', 'Marketing', 'Finance', 'HR'],
      y: [92, 85, 78, 74, 68],
      xAxisLabel: 'Department',
      yAxisLabel: 'Score'
    }
  }
};

export const radialBarTemplates: Record<string, VisualizationResult> = {
  'market_share_radial': {
    insight: "Radial bar chart shows market share distribution, with the top three companies holding 75% of the market.",
    chartType: 'Bar', // Substitute for radial bar
    chartData: {
      title: 'Market Share (Radial)',
      subtitle: 'Share by company',
      x: ['Company A', 'Company B', 'Company C', 'Others'],
      y: [32, 28, 15, 25],
      xAxisLabel: 'Company',
      yAxisLabel: 'Market Share %'
    }
  }
};

export const radarLineTemplates: Record<string, VisualizationResult> = {
  'skills_assessment': {
    insight: "Radar line chart shows employee skill assessment across six core competencies.",
    chartType: 'Radar', // Substitute for radar line
    chartData: {
      title: 'Employee Skills Assessment',
      subtitle: 'Score by competency',
      x: ['Technical', 'Communication', 'Leadership', 'Creativity', 'Teamwork', 'Adaptability'],
      y: [88, 76, 69, 82, 91, 77]
    }
  }
};

export const radarAreaTemplates: Record<string, VisualizationResult> = {
  'product_features': {
    insight: "Radar area chart shows product feature ratings, with security and usability scoring highest.",
    chartType: 'Radar', // Substitute for radar area
    chartData: {
      title: 'Product Feature Ratings',
      subtitle: 'Score by feature',
      x: ['Security', 'Usability', 'Performance', 'Integration', 'Support', 'Cost'],
      y: [92, 89, 84, 77, 80, 73]
    }
  }
};

export const rangeAreaTemplates: Record<string, VisualizationResult> = {
  'temperature_variation': {
    insight: "Range area chart shows temperature variation over a week, with the largest swing on Wednesday.",
    chartType: 'Area', // Substitute for range area
    chartData: {
      title: 'Weekly Temperature Variation',
      subtitle: 'High and low temperatures by day',
      x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      y: [12, 15, 20, 18, 16, 14, 13],
      xAxisLabel: 'Day',
      yAxisLabel: 'Temperature (°C)'
    }
  }
};

export const sunburstTemplates: Record<string, VisualizationResult> = {
  'company_structure': {
    insight: "Sunburst chart shows company structure, with the largest segment in the engineering division.",
    chartType: 'Pie', // Substitute for sunburst
    chartData: {
      title: 'Company Structure Sunburst',
      subtitle: 'Employee count by division',
      x: ['Engineering', 'Sales', 'Marketing', 'Support', 'HR', 'Other'],
      y: [120, 80, 60, 40, 20, 10]
    }
  }
};