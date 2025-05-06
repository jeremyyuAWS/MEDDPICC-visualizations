import { VisualizationResult } from '../types';

// Advanced chart visualizations for the demo agent
// These charts showcase more complex visualization types

export const advancedBubbleVisualizations: Record<string, VisualizationResult> = {
  'tech_adoption': {
    insight: "Industries vary widely in AI adoption speed, investment levels, and results achieved. Financial services shows the highest investment (bubble size) with correspondingly high ROI, while healthcare demonstrates high ROI despite more modest investment levels.",
    chartType: 'Scatter', // Using scatter as a substitute for bubble
    chartData: {
      title: 'AI Adoption, Investment, and ROI by Industry',
      subtitle: 'Bubble size represents relative investment',
      x: ['Financial Services', 'Technology', 'Healthcare', 'Manufacturing', 'Retail', 'Energy', 'Transportation'],
      y: [287, 265, 242, 198, 175, 162, 145],
      xAxisLabel: 'Industry',
      yAxisLabel: 'Average ROI %'
    }
  }
};

export const advancedHeatmapVisualizations: Record<string, VisualizationResult> = {
  'skills_demand': {
    insight: "AI skill demand varies dramatically by industry and role, with data science commanding the highest premium in financial services (92% salary boost) while MLOps skills show the most consistent demand across all industries.",
    chartType: 'Column', // Using column as a substitute for heatmap
    chartData: {
      title: 'AI Skill Demand Heatmap',
      subtitle: 'Average salary premium by skill and industry (%)',
      x: ['Data Science', 'Machine Learning', 'MLOps', 'Deep Learning', 'NLP', 'Computer Vision'],
      y: [92, 87, 73, 68, 64, 57],
      xAxisLabel: 'Skill Category',
      yAxisLabel: 'Average Salary Premium %'
    }
  }
};

export const advancedRadarAreaVisualizations: Record<string, VisualizationResult> = {
  'capability_comparison': {
    insight: "Organization A demonstrates superior AI capabilities across multiple dimensions, with particular strength in data quality (87) and governance (84). Organization B, while lagging overall, shows competitive strength in talent acquisition (76).",
    chartType: 'Radar',
    chartData: {
      title: 'AI Capability Comparison',
      subtitle: 'Organization A vs. Industry Average',
      x: ['Data Quality', 'Governance', 'Infrastructure', 'Talent', 'Strategy', 'Ethics'],
      y: [87, 84, 78, 72, 81, 76],
    }
  }
};

export const advancedWaterfallVisualizations: Record<string, VisualizationResult> = {
  'cost_breakdown': {
    insight: "AI implementation delivers cost reductions across multiple categories, with the largest from process automation (27%) and error reduction (23%). Even after accounting for implementation costs (19%), organizations see a net positive ROI of 73%.",
    chartType: 'Column', // Using column as a substitute for waterfall
    chartData: {
      title: 'AI ROI Breakdown',
      subtitle: 'Contribution to total ROI by category',
      x: ['Process Automation', 'Error Reduction', 'Labor Efficiency', 'Predictive Maintenance', 'Energy Optimization', 'Implementation Cost', 'Net ROI'],
      y: [27, 23, 18, 15, 9, -19, 73],
      xAxisLabel: 'Category',
      yAxisLabel: 'ROI Contribution %'
    }
  }
};

export const advancedSunburstVisualizations: Record<string, VisualizationResult> = {
  'tech_stack': {
    insight: "Modern AI technology stacks show diverse composition, with infrastructure representing 28% of total components. Within infrastructure, cloud computing dominates at 67% of infrastructure spend, with specialized AI hardware growing quickly to 22%.",
    chartType: 'Donut', // Using donut as a substitute for sunburst
    chartData: {
      title: 'AI Technology Stack Composition',
      subtitle: '2024 distribution by category',
      x: ['Infrastructure', 'Development Tools', 'ML Platforms', 'Data Processing', 'Applications', 'Security'],
      y: [28, 23, 19, 15, 10, 5]
    }
  }
};

export const advancedCombinationVisualizations: Record<string, VisualizationResult> = {
  'performance_trends': {
    insight: "While AI model accuracy has improved steadily, computational efficiency has improved dramatically, with a 28x improvement since 2020. This has enabled broader deployment on lower-cost hardware and edge devices.",
    chartType: 'Line', // Using line as a substitute for combination
    chartData: {
      title: 'AI Model Performance Trends',
      subtitle: '2020-2024 indexed improvement',
      x: ['2020', '2021', '2022', '2023', '2024'],
      y: [100, 570, 1240, 1980, 2800],
      xAxisLabel: 'Year',
      yAxisLabel: 'Computational Efficiency Index'
    }
  }
};

export const advancedStreamgraphVisualizations: Record<string, VisualizationResult> = {
  'funding_flows': {
    insight: "AI funding has shifted significantly since 2020, with generative AI capturing 42% of all funding by 2024, up from just 7% in 2020. Computer vision funding has declined from 35% to 18% of the total during the same period.",
    chartType: 'Area', // Using area as a substitute for streamgraph
    chartData: {
      title: 'AI Investment Flows by Category',
      subtitle: '2020-2024 funding distribution',
      x: ['2020', '2021', '2022', '2023', '2024'],
      y: [100, 180, 250, 320, 380],
      xAxisLabel: 'Year',
      yAxisLabel: 'Total Funding Index'
    }
  }
};

export const advancedNetworkGraphVisualizations: Record<string, VisualizationResult> = {
  'ecosystem': {
    insight: "The AI ecosystem shows significant interconnectivity, with the average enterprise solution integrating with 7.3 other systems. Cloud providers form the most central nodes, with AWS having the highest connectivity score at 96/100.",
    chartType: 'Radar', // Using radar as a substitute for network graph
    chartData: {
      title: 'AI Ecosystem Connectivity',
      subtitle: 'Centrality scores by platform type',
      x: ['Cloud Providers', 'ML Platforms', 'Data Warehouses', 'BI Tools', 'Integration Platforms', 'Applications'],
      y: [96, 82, 78, 65, 58, 47]
    }
  }
};

export const advancedParallelCoordinatesVisualizations: Record<string, VisualizationResult> = {
  'model_selection': {
    insight: "When selecting AI models, organizations balance multiple factors including accuracy, inference cost, and training time. Large language models score highest on accuracy (87) but lowest on inference cost-efficiency (32).",
    chartType: 'Radar', // Using radar as a substitute for parallel coordinates
    chartData: {
      title: 'AI Model Selection Criteria',
      subtitle: 'Normalized scores across evaluation dimensions',
      x: ['Accuracy', 'Training Cost', 'Inference Cost', 'Latency', 'Explainability', 'Deployability'],
      y: [87, 45, 32, 58, 63, 72]
    }
  }
};

export const advancedSankeyVisualizations: Record<string, VisualizationResult> = {
  'talent_flow': {
    insight: "AI talent flows show a net migration toward tech companies, which gained 38% of all AI professionals who changed jobs in 2023. Financial services was the second largest gainer at 22%, while academia experienced the largest net loss at -28%.",
    chartType: 'Column', // Using column as a substitute for sankey
    chartData: {
      title: 'AI Talent Flow Between Sectors (2023)',
      subtitle: 'Net talent gain/loss percentage',
      x: ['Technology', 'Financial Services', 'Healthcare', 'Manufacturing', 'Government', 'Academia'],
      y: [38, 22, 8, -5, -12, -28],
      xAxisLabel: 'Sector',
      yAxisLabel: 'Net Talent Flow %'
    }
  }
};

export const advancedChordVisualizations: Record<string, VisualizationResult> = {
  'tech_integration': {
    insight: "Analysis of technology integration patterns shows cloud platforms forming the strongest connections, with 84% of AI applications integrating directly with cloud infrastructure. Data warehouses show the next highest integration frequency at 72%.",
    chartType: 'Radar', // Using radar as a substitute for chord
    chartData: {
      title: 'AI Technology Integration Patterns',
      subtitle: 'Percentage of systems with direct integration',
      x: ['Cloud Platforms', 'Data Warehouses', 'BI Tools', 'ETL Pipelines', 'Version Control', 'Monitoring'],
      y: [84, 72, 68, 65, 57, 52]
    }
  }
};

export const advancedTreemapVisualizations: Record<string, VisualizationResult> = {
  'market_segments': {
    insight: "The $142B enterprise AI market shows natural language processing as the largest segment at 32%, followed by computer vision at 24%. The fastest growth is in generative AI applications, which grew from 3% to 15% of the market in just two years.",
    chartType: 'Pie', // Using pie as a substitute for treemap
    chartData: {
      title: 'Enterprise AI Market Segmentation',
      subtitle: '2024 market share by technology',
      x: ['Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Generative AI', 'Recommendation Systems', 'Other AI'],
      y: [32, 24, 18, 15, 8, 3]
    }
  }
};