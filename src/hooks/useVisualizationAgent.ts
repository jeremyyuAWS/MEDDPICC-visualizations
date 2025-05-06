import { useState } from 'react';
import { VisualizationResult, VisualizationPayload } from '../types';
import { generateVisualization as generateDemoVisualization } from '../data/dataUtility';

export function useVisualizationAgent() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VisualizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('meddpicc_demo_mode');
    return saved ? saved === 'true' : false;
  });

  const generateVisualization = async (payload: VisualizationPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      if (isDemoMode) {
        // In demo mode, return visualization from our local data utility
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        const mockResult = generateDemoVisualization(payload);
        setResult(mockResult);
      } else {
        // In real mode, call the Edge Function
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-visualization`;
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        setResult(data);
      }
    } catch (err) {
      setError('Failed to generate visualization. Please try again.');
      console.error('Visualization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDemoMode = () => {
    const newValue = !isDemoMode;
    setIsDemoMode(newValue);
    localStorage.setItem('meddpicc_demo_mode', newValue.toString());
    
    // Clear any existing results when toggling modes
    setResult(null);
    setError(null);
  };

  // Get a list of sample topics for the visualization
  const getSampleTopics = () => {
    return [
      'AI Adoption Trends',
      'Cloud Provider Comparison',
      'Security ROI Analysis',
      'Industry Growth Forecast',
      'Technology Investment Breakdown',
      'Marketing Automation Impact',
      'Sales Performance Metrics',
      'Predictive Maintenance',
      'Customer Analytics Insights',
      'DevOps Transformation',
      'Digital Transformation Metrics',
      'Data Privacy Compliance',
      'Remote Work Productivity',
      'Supply Chain Optimization',
      'Talent Acquisition Strategies'
    ];
  };

  // Get a list of sample industries for the visualization
  const getSampleIndustries = () => {
    return [
      'Manufacturing',
      'Healthcare',
      'Finance',
      'Retail',
      'Technology',
      'Energy',
      'Education',
      'Transportation',
      'Telecommunications',
      'Pharmaceuticals',
      'Hospitality',
      'Media & Entertainment',
      'Professional Services',
      'Real Estate',
      'Agriculture'
    ];
  };

  return {
    isLoading,
    result,
    error,
    isDemoMode,
    toggleDemoMode,
    generateVisualization,
    getSampleTopics,
    getSampleIndustries
  };
}