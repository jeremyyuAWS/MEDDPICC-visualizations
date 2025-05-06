import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { VisualizationResult, VisualizationPayload } from '../types';

export interface SavedVisualization {
  id: string;
  title: string;
  visualization: VisualizationResult;
  context: VisualizationPayload;
  createdAt: string;
}

export function useSavedVisualizations() {
  const [savedVisualizations, setSavedVisualizations] = useState<SavedVisualization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('meddpicc_demo_mode');
    return saved ? saved === 'true' : false;
  });

  // Mock data for demo mode
  const mockSavedVisualizations: SavedVisualization[] = [
    {
      id: '1',
      title: 'AI Adoption in Manufacturing',
      visualization: {
        insight: "AI adoption in manufacturing has quadrupled since 2020, with predictive maintenance and quality control being the top use cases.",
        chartType: 'Line',
        chartData: {
          title: 'AI Adoption in Manufacturing',
          subtitle: '2020-2024 growth trend',
          x: ['2020', '2021', '2022', '2023', '2024'],
          y: [15, 22, 30, 45, 60],
          xAxisLabel: 'Year',
          yAxisLabel: 'Adoption Rate %'
        }
      },
      context: {
        industry: 'Manufacturing',
        topic: 'AI Adoption Trends'
      },
      createdAt: '2024-06-05T14:23:45Z'
    },
    {
      id: '2',
      title: 'AWS AI Services Comparison',
      visualization: {
        insight: "67% of Fortune 500 companies using AWS deploy AI workloads on SageMaker, making it the leading managed ML service in enterprise.",
        chartType: 'Bar',
        chartData: {
          title: 'AWS AI Service Adoption Among Fortune 500',
          subtitle: 'Percentage of companies using each service',
          x: ['SageMaker', 'Rekognition', 'Comprehend', 'Forecast', 'Personalize'],
          y: [67, 42, 35, 28, 21],
          xAxisLabel: 'Service',
          yAxisLabel: 'Adoption %'
        }
      },
      context: {
        cloudProvider: 'AWS',
        topic: 'Cloud Provider Comparison'
      },
      createdAt: '2024-06-10T09:15:30Z'
    },
    {
      id: '3',
      title: 'Salesforce ROI Analysis',
      visualization: {
        insight: "Organizations using Salesforce + AI report a 34% increase in sales productivity and 28% improvement in lead conversion rates.",
        chartType: 'Column',
        chartData: {
          title: 'Salesforce AI Impact',
          subtitle: 'Percentage improvement by business metric',
          x: ['Sales Productivity', 'Lead Conversion', 'Customer Retention', 'Pipeline Accuracy', 'Deal Size'],
          y: [34, 28, 22, 19, 15],
          xAxisLabel: 'Business Metric',
          yAxisLabel: 'Improvement %'
        }
      },
      context: {
        technologies: ['Salesforce'],
        topic: 'Sales Performance Metrics'
      },
      createdAt: '2024-06-12T16:45:22Z'
    }
  ];

  // Load saved visualizations on component mount
  useEffect(() => {
    loadSavedVisualizations();

    // Listen for changes in demo mode
    const handleDemoModeChange = (e: StorageEvent) => {
      if (e.key === 'meddpicc_demo_mode') {
        const newDemoMode = e.newValue === 'true';
        setIsDemoMode(newDemoMode);
        loadSavedVisualizations();
      }
    };

    window.addEventListener('storage', handleDemoModeChange);
    return () => window.removeEventListener('storage', handleDemoModeChange);
  }, []);

  // Listen for custom event from DemoModeListener
  useEffect(() => {
    const handleDemoModeCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{isDemoMode: boolean}>;
      setIsDemoMode(customEvent.detail.isDemoMode);
      loadSavedVisualizations();
    };

    window.addEventListener('demoModeChange', handleDemoModeCustomEvent as EventListener);
    return () => window.removeEventListener('demoModeChange', handleDemoModeCustomEvent as EventListener);
  }, []);

  const loadSavedVisualizations = async () => {
    setIsLoading(true);
    setSaveError(null);

    try {
      if (isDemoMode) {
        // In demo mode, return mock data
        setSavedVisualizations(mockSavedVisualizations);
      } else {
        // Get the current authenticated user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }

        // Get the user's saved visualizations
        const { data, error } = await supabase
          .from('users')
          .select('visualization_preferences')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        // Parse the visualization_preferences JSON
        const visualizationPrefs = data.visualization_preferences || {};
        const savedVisualizations = visualizationPrefs.savedVisualizations || [];
        
        setSavedVisualizations(savedVisualizations);
      }
    } catch (err) {
      console.error('Error loading saved visualizations:', err);
      setSaveError('Failed to load saved visualizations');
    } finally {
      setIsLoading(false);
    }
  };

  const saveVisualization = async (visualization: Omit<SavedVisualization, 'id'>) => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      if (isDemoMode) {
        // In demo mode, just add to local state
        const newVisualization = {
          ...visualization,
          id: Date.now().toString() // Use timestamp as ID in demo mode
        };
        
        setSavedVisualizations(prev => [newVisualization, ...prev]);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        // Get the current authenticated user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }

        // Get the user's current visualization_preferences
        const { data, error } = await supabase
          .from('users')
          .select('visualization_preferences')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        // Parse the visualization_preferences JSON
        const visualizationPrefs = data.visualization_preferences || {};
        const currentSavedVisualizations = visualizationPrefs.savedVisualizations || [];
        
        // Create new visualization with ID
        const newVisualization = {
          ...visualization,
          id: crypto.randomUUID() // Generate a UUID for the visualization
        };
        
        // Add the new visualization to the array
        const updatedSavedVisualizations = [newVisualization, ...currentSavedVisualizations];
        
        // Update the user's visualization_preferences
        const { error: updateError } = await supabase
          .from('users')
          .update({
            visualization_preferences: {
              ...visualizationPrefs,
              savedVisualizations: updatedSavedVisualizations
            }
          })
          .eq('id', user.id);

        if (updateError) throw updateError;
        
        // Update local state
        setSavedVisualizations(updatedSavedVisualizations);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error saving visualization:', err);
      setSaveError('Failed to save visualization');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteVisualization = async (id: string) => {
    setIsDeleting(true);
    setSaveError(null);

    try {
      if (isDemoMode) {
        // In demo mode, just remove from local state
        setSavedVisualizations(prev => prev.filter(v => v.id !== id));
      } else {
        // Get the current authenticated user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('User not authenticated');
        }

        // Get the user's current visualization_preferences
        const { data, error } = await supabase
          .from('users')
          .select('visualization_preferences')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        // Parse the visualization_preferences JSON
        const visualizationPrefs = data.visualization_preferences || {};
        const currentSavedVisualizations = visualizationPrefs.savedVisualizations || [];
        
        // Filter out the visualization to delete
        const updatedSavedVisualizations = currentSavedVisualizations.filter(
          (v: SavedVisualization) => v.id !== id
        );
        
        // Update the user's visualization_preferences
        const { error: updateError } = await supabase
          .from('users')
          .update({
            visualization_preferences: {
              ...visualizationPrefs,
              savedVisualizations: updatedSavedVisualizations
            }
          })
          .eq('id', user.id);

        if (updateError) throw updateError;
        
        // Update local state
        setSavedVisualizations(updatedSavedVisualizations);
      }
    } catch (err) {
      console.error('Error deleting visualization:', err);
      setSaveError('Failed to delete visualization');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    savedVisualizations,
    isLoading,
    isSaving,
    isDeleting,
    saveSuccess,
    saveError,
    loadSavedVisualizations,
    saveVisualization,
    deleteVisualization
  };
}