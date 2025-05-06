export interface MEDDPICCComponent {
  id: string;
  name: string;
  description: string;
  score: number;
  text: string;
  confidence: number;
  citation?: string;
}

export interface MEDDPICCAnalysis {
  metrics: MEDDPICCComponent;
  economicBuyer: MEDDPICCComponent;
  decisionCriteria: MEDDPICCComponent;
  decisionProcess: MEDDPICCComponent;
  paperProcess: MEDDPICCComponent;
  identifyPain: MEDDPICCComponent;
  champion: MEDDPICCComponent;
  competition?: MEDDPICCComponent;
}

export interface EnrichmentTag {
  id: string;
  type: 'cloud' | 'tech' | 'compliance' | 'integration';
  value: string;
}

export interface FollowUpQuestion {
  id: string;
  component: string;
  question: string;
}

export interface AnalysisResult {
  meddpicc: MEDDPICCAnalysis;
  enrichment: {
    cloudProvider?: string;
    tags: EnrichmentTag[];
  };
  followUp: {
    questions: FollowUpQuestion[];
    emailDraft: string;
  };
}

// Lyzr API types
export interface LyzrApiResponse {
  meddpicc_scores: {
    metrics: {
      score: number;
      text: string;
      confidence: number;
      citation?: string;
    };
    economic_buyer: {
      score: number;
      text: string;
      confidence: number;
      citation?: string;
    };
    decision_criteria: {
      score: number;
      text: string;
      confidence: number;
      citation?: string;
    };
    decision_process: {
      score: number;
      text: string;
      confidence: number;
      citation?: string;
    };
    paper_process: {
      score: number;
      text: string;
      confidence: number;
      citation?: string;
    };
    identify_pain: {
      score: number;
      text: string;
      confidence: number;
      citation?: string;
    };
    champion: {
      score: number;
      text: string;
      confidence: number;
      citation?: string;
    };
  };
  tags: {
    type: string;
    value: string;
  }[];
  follow_up_questions: string[];
  email_draft: string;
  confidence_summary: string;
}

// Visualization Agent types
export interface ChartData {
  x: string[];
  y: number[];
  title?: string;
  subtitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export interface VisualizationResult {
  insight: string;
  chartType: 'Bar' | 'Line' | 'Pie' | 'Radar' | 'Column' | 'Area' | 'Scatter' | 'Donut';
  chartData: ChartData;
}

export interface VisualizationPayload {
  industry?: string;
  cloudProvider?: string;
  topic?: string;
  company?: string;
  technologies?: string[];
  painPoints?: string[];
}

// Perplexity search result types
export interface PerplexitySearchResult {
  snippet: string;
  source: string;
  url: string;
  date: string;
}

// Infographic type for visual data displays
export interface Infographic {
  title: string;
  subtitle: string;
  bulletPoints: string[];
  visualComponents?: string[];
  recommendations?: string[];
  sources: { name: string; url: string }[];
}

// Research summary type for academic and industry reports
export interface ResearchSummary {
  title: string;
  author: string;
  publication: string;
  date: string;
  summary: string;
  keyFindings: string[];
  methodology: string;
  limitations: string;
  sourceUrl: string;
}