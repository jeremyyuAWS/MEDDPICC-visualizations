import { VisualizationResult } from '../types';

// Cloud provider-specific visualization data for the demo agent
// Each provider has multiple chart types to showcase variety

export const awsVisualizations: Record<string, VisualizationResult> = {
  'services': {
    insight: "67% of Fortune 500 companies using AWS deploy AI workloads on SageMaker, making it the leading managed ML service in enterprise. Rekognition and Comprehend follow at 42% and 35% respectively, showing strong adoption of specialized AI services.",
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
  'spend': {
    insight: "AWS customers see an average 32% reduction in AI training costs when using managed services compared to self-hosted infrastructure. The gap widens further with SageMaker Serverless, which shows 58% better cost efficiency.",
    chartType: 'Column',
    chartData: {
      title: 'AWS AI Cost Comparison',
      subtitle: 'Cost index by deployment type (lower is better)',
      x: ['Self-Hosted GPU', 'EC2 P4d', 'SageMaker Training', 'SageMaker Serverless', 'SageMaker Savings Plans'],
      y: [100, 78, 68, 42, 36],
      xAxisLabel: 'Deployment Type',
      yAxisLabel: 'Cost Index'
    }
  },
  'growth': {
    insight: "Enterprise SageMaker usage has grown 5.3x since 2020, with serverless inference being the fastest-growing deployment mode. The introduction of SageMaker Studio and foundation model support in 2022 accelerated adoption significantly.",
    chartType: 'Area',
    chartData: {
      title: 'AWS SageMaker Adoption Growth',
      subtitle: 'Indexed to 2020 baseline',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [100, 180, 270, 410, 530, 650],
      xAxisLabel: 'Year',
      yAxisLabel: 'Growth Index'
    }
  },
  'industry_preference': {
    insight: "AWS dominates AI workloads in specific industries, with 56% market share in media & entertainment and 48% in retail. Financial services show more balanced adoption across cloud providers due to multi-cloud strategies.",
    chartType: 'Bar',
    chartData: {
      title: 'AWS AI Market Share by Industry',
      subtitle: 'Percentage of AI workloads in each vertical',
      x: ['Media & Entertainment', 'Retail', 'Technology', 'Manufacturing', 'Healthcare', 'Financial Services'],
      y: [56, 48, 41, 38, 33, 29],
      xAxisLabel: 'Industry',
      yAxisLabel: 'AWS Market Share %'
    }
  },
  'benefits': {
    insight: "Organizations running AI workloads on AWS report multiple benefits, with scalability (87%) and integration with existing systems (78%) being the most frequently cited advantages. Cost predictability has improved, now cited by 67% of enterprises.",
    chartType: 'Radar',
    chartData: {
      title: 'AWS AI Benefits Assessment',
      subtitle: 'Percentage of customers citing each benefit',
      x: ['Scalability', 'Integration', 'Cost Predictability', 'Performance', 'Security', 'Developer Productivity'],
      y: [87, 78, 67, 72, 68, 63]
    }
  }
};

export const azureVisualizations: Record<string, VisualizationResult> = {
  'services': {
    insight: "Azure's AI capabilities are a key driver in Microsoft's cloud revenue growth, with 72% of enterprise Azure customers using at least one AI service. Cognitive Services leads with 35% market share of Azure AI workloads, followed by Machine Learning at 27%.",
    chartType: 'Pie',
    chartData: {
      title: 'Azure AI Service Distribution',
      subtitle: 'Market share by service category',
      x: ['Cognitive Services', 'Machine Learning', 'Bot Service', 'OpenAI Service', 'Databricks', 'Other'],
      y: [35, 27, 12, 15, 6, 5]
    }
  },
  'growth': {
    insight: "Azure's AI services revenue has grown at a 68% CAGR since 2020, outpacing overall Azure growth of 42% CAGR in the same period. The introduction of Azure OpenAI Service in 2023 further accelerated this growth trajectory.",
    chartType: 'Line',
    chartData: {
      title: 'Azure AI Services Growth',
      subtitle: 'Indexed revenue growth (2020=100)',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [100, 168, 282, 474, 797, 1340],
      xAxisLabel: 'Year',
      yAxisLabel: 'Revenue Index'
    }
  },
  'openai': {
    insight: "Azure OpenAI Service has seen 215% year-over-year growth, becoming the fastest-growing enterprise AI service in Microsoft's history. Financial services and healthcare are the leading adopters, representing 58% of Azure OpenAI Service customers.",
    chartType: 'Column',
    chartData: {
      title: 'Azure OpenAI Service Adoption',
      subtitle: 'Quarterly growth in 2023-2024',
      x: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
      y: [100, 147, 215, 284, 312, 379],
      xAxisLabel: 'Quarter',
      yAxisLabel: 'Growth Index'
    }
  },
  'industry_distribution': {
    insight: "Azure has gained significant traction in regulated industries, with healthcare and financial services representing 47% of Azure AI customers. Government adoption has grown 3.2x since 2022, driven by security certifications and compliance capabilities.",
    chartType: 'Donut',
    chartData: {
      title: 'Azure AI Customer Distribution',
      subtitle: 'By industry vertical',
      x: ['Financial Services', 'Healthcare', 'Manufacturing', 'Retail', 'Government', 'Other'],
      y: [28, 19, 15, 13, 10, 15]
    }
  },
  'integration_benefits': {
    insight: "Organizations cite Microsoft ecosystem integration as the primary reason (72%) for choosing Azure for AI workloads. Performance and security follow at 63% and 61% respectively, while cost-effectiveness is mentioned by only 47% of customers.",
    chartType: 'Bar',
    chartData: {
      title: 'Reasons for Choosing Azure AI',
      subtitle: 'Percentage of customers citing each factor',
      x: ['Microsoft Integration', 'Performance', 'Security & Compliance', 'Enterprise Support', 'Cost', 'Developer Tools'],
      y: [72, 63, 61, 54, 47, 42],
      xAxisLabel: 'Factor',
      yAxisLabel: 'Customers Citing %'
    }
  }
};

export const gcpVisualizations: Record<string, VisualizationResult> = {
  'growth': {
    insight: "Google Cloud Platform usage has grown 4.5x among enterprise AI/ML workloads since 2020, with BigQuery seeing the highest adoption rate. Research-intensive industries like pharmaceuticals and high-tech show particularly strong GCP preference.",
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
  'vertexai': {
    insight: "Google Vertex AI adoption has increased 178% year-over-year, driven by enterprise demand for end-to-end ML platforms. Organizations report 42% faster model deployment and 37% improved model performance compared to previous solutions.",
    chartType: 'Column',
    chartData: {
      title: 'Vertex AI Adoption Growth',
      subtitle: 'Quarterly adoption rates',
      x: ['Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
      y: [100, 115, 132, 154, 178, 215, 248, 278],
      xAxisLabel: 'Quarter',
      yAxisLabel: 'Adoption Index'
    }
  },
  'services': {
    insight: "Among Google Cloud AI services, BigQuery ML has the highest enterprise adoption at 42%, followed by Vertex AI at 35%. Vision AI has seen significant recent growth, driven by manufacturing and retail use cases.",
    chartType: 'Donut',
    chartData: {
      title: 'GCP AI Service Distribution',
      subtitle: 'Enterprise adoption by service',
      x: ['BigQuery ML', 'Vertex AI', 'Document AI', 'Vision AI', 'Natural Language', 'Speech-to-Text'],
      y: [42, 35, 21, 18, 15, 9]
    }
  },
  'customer_benefits': {
    insight: "Organizations choosing Google Cloud for AI workloads cite data integration capabilities as the top benefit (68%), followed by ML expertise (63%). Cost-effectiveness ranks third at 57%, though it's the fastest-growing decision factor year over year.",
    chartType: 'Bar',
    chartData: {
      title: 'GCP AI Customer Benefits',
      subtitle: 'Percentage of customers citing each benefit',
      x: ['Data Integration', 'ML Expertise', 'Cost-Effectiveness', 'Model Quality', 'Scalability', 'Innovation'],
      y: [68, 63, 57, 51, 48, 45],
      xAxisLabel: 'Benefit',
      yAxisLabel: 'Customers Citing %'
    }
  },
  'performance_benchmarks': {
    insight: "In enterprise AI workload benchmarks, Google Cloud demonstrates superior performance in natural language processing (43% faster) and large-scale data analytics (37% faster) compared to industry averages.",
    chartType: 'Radar',
    chartData: {
      title: 'GCP AI Performance Benchmarks',
      subtitle: 'Percentage faster than industry average',
      x: ['Natural Language', 'Data Analytics', 'Computer Vision', 'Recommendation', 'Forecasting', 'Speech Processing'],
      y: [43, 37, 28, 32, 27, 34]
    }
  }
};

export const multiCloudVisualizations: Record<string, VisualizationResult> = {
  'market_share': {
    insight: "In the cloud AI services market, AWS leads with a 34% share, followed by Azure at 28% and Google Cloud at 22%. Azure has shown the fastest growth, gaining 6 percentage points since 2022.",
    chartType: 'Pie',
    chartData: {
      title: 'Cloud AI Services Market Share',
      subtitle: '2024 distribution',
      x: ['AWS', 'Azure', 'Google Cloud', 'IBM Cloud', 'Oracle Cloud', 'Others'],
      y: [34, 28, 22, 9, 4, 3]
    }
  },
  'spending': {
    insight: "Organizations with multi-cloud AI strategies spend 27% more on cloud services but report 42% higher business impact from AI projects. This value gap has increased from 29% in 2022 to 42% in 2024 as multi-cloud orchestration tools mature.",
    chartType: 'Column',
    chartData: {
      title: 'Multi-Cloud AI ROI Comparison',
      subtitle: 'Single-cloud vs. multi-cloud strategies',
      x: ['Cloud Spend', 'Business Impact', 'Time-to-Market', 'Feature Availability', 'Scalability', 'Resilience'],
      y: [127, 142, 89, 156, 131, 148],
      xAxisLabel: 'Metric',
      yAxisLabel: 'Multi-Cloud Index (Single Cloud = 100)'
    }
  },
  'preference': {
    insight: "73% of large enterprises now employ a multi-cloud strategy for AI workloads, citing risk mitigation and best-of-breed capabilities. This represents a significant shift from 2020, when only 42% used multi-cloud approaches.",
    chartType: 'Bar',
    chartData: {
      title: 'AI Workload Cloud Strategy',
      subtitle: 'Percentage of enterprises by strategy',
      x: ['Multi-Cloud', 'Single Cloud', 'On-Premises', 'Hybrid', 'Edge-Focused'],
      y: [73, 15, 5, 7, 0],
      xAxisLabel: 'Strategy',
      yAxisLabel: 'Enterprises %'
    }
  },
  'feature_comparison': {
    insight: "Cloud providers show varying strengths across AI feature categories, with AWS leading in breadth of services (92) and Azure in enterprise integration (87). Google Cloud ranks highest for model quality (93) and research leadership.",
    chartType: 'Radar',
    chartData: {
      title: 'Cloud Provider AI Capabilities',
      subtitle: 'Score out of 100 by category',
      x: ['Service Breadth', 'Enterprise Integration', 'Model Quality', 'Pricing', 'Documentation', 'Specialized Hardware'],
      y: [92, 87, 93, 78, 85, 91]
    }
  },
  'cost_trends': {
    insight: "The cost of running AI workloads in the cloud has decreased by an average of 38% since 2020, with the steepest decline in inference costs (57% reduction). Training costs for large models remain significant but show 29% improvement.",
    chartType: 'Line',
    chartData: {
      title: 'Cloud AI Workload Cost Trends',
      subtitle: 'Indexed to 2020 (100)',
      x: ['2020', '2021', '2022', '2023', '2024', '2025 (Projected)'],
      y: [100, 83, 72, 68, 62, 55],
      xAxisLabel: 'Year',
      yAxisLabel: 'Cost Index'
    }
  }
};