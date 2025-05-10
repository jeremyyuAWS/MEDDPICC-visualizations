// OGI Assistant Prewritten Demo Scenarios
import { VisualizationPayload } from '../types';

export interface OGIDemoScenario {
  label: string;
  description: string;
  payload: VisualizationPayload;
}

export const ogiDemoScenarios: OGIDemoScenario[] = [
  {
    label: 'Working Capital Impact',
    description: 'Showcase how AI analytics optimize working capital and free up liquidity.',
    payload: {
      topic: 'Working Capital Impact',
      industry: 'Finance',
      company: 'OGI Demo Corp',
      cloudProvider: '',
      technologies: ['Treasury AI'],
      painPoints: ['DSO', 'DPO', 'Inventory Turnover']
    }
  },
  {
    label: 'Cash-Flow Forecaster',
    description: 'Demonstrate predictive cash-flow forecasting and its impact on liquidity.',
    payload: {
      topic: 'Cash-Flow Forecaster',
      industry: 'Finance',
      company: 'OGI Demo Corp',
      cloudProvider: '',
      technologies: ['Treasury AI'],
      painPoints: ['Liquidity gaps', 'Forecasting accuracy']
    }
  },
  {
    label: 'Liquidity Orchestrator',
    description: 'Highlight automation of fund transfers and yield optimization.',
    payload: {
      topic: 'Liquidity Orchestrator',
      industry: 'Finance',
      company: 'OGI Demo Corp',
      cloudProvider: '',
      technologies: ['Treasury Automation'],
      painPoints: ['Idle cash', 'Manual transfers']
    }
  },
  {
    label: 'AI Spend Optimizer',
    description: 'Show how AI reduces cloud spend and prevents budget overruns.',
    payload: {
      topic: 'AI Spend Optimizer',
      industry: 'Technology',
      company: 'OGI Demo Corp',
      cloudProvider: 'AWS',
      technologies: ['Cloud Cost Management'],
      painPoints: ['Cloud spend', 'Budget overruns']
    }
  },
  {
    label: 'Sales Pipeline Analyzer',
    description: 'Visualize pipeline health and forecast accuracy for sales teams.',
    payload: {
      topic: 'Sales Pipeline Analyzer',
      industry: 'Sales',
      company: 'OGI Demo Corp',
      cloudProvider: '',
      technologies: ['CRM', 'Salesforce'],
      painPoints: ['Pipeline visibility', 'Forecast accuracy']
    }
  }
]; 