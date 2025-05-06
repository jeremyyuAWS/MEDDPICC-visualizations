import { useState, useEffect } from 'react';
import { AnalysisResult, LyzrApiResponse } from '../types';
import { MEDDPICC_COMPONENTS, MOCK_ANALYSIS_RESULT } from '../constants/meddpiccData';

// For development - would come from auth in production
const USER_ID = "ae_123456";
const ORG_ID = "lyzr_enterprise_7890";

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

// Helper function to implement retry logic with exponential backoff
const fetchWithRetry = async (url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    
    // If the request was successful or we've run out of retries, return the response
    if (response.ok || retries <= 0) {
      return response;
    }
    
    // For 504 Gateway Timeout or 503 Service Unavailable, we should retry
    if (response.status === 504 || response.status === 503) {
      // Wait with exponential backoff
      const delay = RETRY_DELAY * (MAX_RETRIES - retries + 1);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Recursive retry with one less retry attempt
      console.log(`Retrying API call, ${retries - 1} attempts remaining...`);
      return fetchWithRetry(url, options, retries - 1);
    }
    
    // For other error status codes, don't retry
    return response;
  } catch (error) {
    // If we've run out of retries, rethrow the error
    if (retries <= 0) {
      throw error;
    }
    
    // Network errors should be retried
    const delay = RETRY_DELAY * (MAX_RETRIES - retries + 1);
    await new Promise(resolve => setTimeout(resolve, delay));
    
    console.log(`Retrying after network error, ${retries - 1} attempts remaining...`);
    return fetchWithRetry(url, options, retries - 1);
  }
};

export function useMEDDPICCAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('meddpicc_demo_mode');
    return saved ? saved === 'true' : false;
  });
  
  // Auto-analyze on demo mode switch
  const [lastNotes, setLastNotes] = useState<string>('');

  // Effect to automatically analyze demo notes when switching to demo mode
  useEffect(() => {
    if (isDemoMode && lastNotes) {
      analyzeNotes(lastNotes);
    }
  }, [isDemoMode]);

  const toggleDemoMode = () => {
    const newValue = !isDemoMode;
    setIsDemoMode(newValue);
    localStorage.setItem('meddpicc_demo_mode', newValue.toString());
    
    // Clear any existing results when toggling modes
    setResult(null);
    setError(null);
    
    // If switching to demo mode and we have notes, automatically analyze
    if (newValue && lastNotes) {
      analyzeNotes(lastNotes);
    }
  };

  const analyzeNotes = async (notes: string) => {
    if (!notes.trim()) {
      setError('Please enter your meeting notes to analyze.');
      return;
    }

    // Store the notes for potential re-analysis when toggling demo mode
    setLastNotes(notes);
    
    setIsAnalyzing(true);
    setError(null);

    try {
      if (isDemoMode) {
        // In demo mode, simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 1500));
        setResult(MOCK_ANALYSIS_RESULT);
      } else {
        // Create payload for Lyzr agent
        const payload = {
          user_id: USER_ID,
          org_id: ORG_ID,
          raw_notes: notes
        };

        // Call the Supabase Edge Function
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-notes`;
        
        // Use the retry mechanism for the API call
        const response = await fetchWithRetry(
          apiUrl, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify(payload)
          }
        );

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        // Get the Lyzr agent response
        const lyzrResponse: LyzrApiResponse = await response.json();
        
        // Transform the Lyzr response to match our app's structure
        const analysisResult = transformLyzrResponse(lyzrResponse);
        
        setResult(analysisResult);
      }
    } catch (err) {
      setError('Failed to analyze notes. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Transform Lyzr API response to match our app's structure
  const transformLyzrResponse = (lyzrResponse: LyzrApiResponse): AnalysisResult => {
    // Create the MEDDPICC analysis structure
    const meddpiccAnalysis: any = {};
    
    // Map the snake_case keys from API to camelCase for our app
    const keyMapping: Record<string, string> = {
      'metrics': 'metrics',
      'economic_buyer': 'economicBuyer',
      'decision_criteria': 'decisionCriteria',
      'decision_process': 'decisionProcess',
      'paper_process': 'paperProcess',
      'identify_pain': 'identifyPain',
      'champion': 'champion'
    };
    
    // Transform each MEDDPICC component
    Object.entries(lyzrResponse.meddpicc_scores).forEach(([apiKey, value]) => {
      const appKey = keyMapping[apiKey];
      if (appKey) {
        meddpiccAnalysis[appKey] = {
          id: appKey,
          name: MEDDPICC_COMPONENTS[appKey]?.name || appKey, 
          description: MEDDPICC_COMPONENTS[appKey]?.description || '',
          score: value.score,
          text: value.text,
          confidence: value.confidence,
          citation: value.citation || ''
        };
      }
    });
    
    // Extract cloud provider and transform tags
    const cloudProvider = lyzrResponse.tags.find(tag => tag.type === 'cloud_provider')?.value;
    
    const transformedTags = lyzrResponse.tags.map((tag, index) => {
      // Map API tag types to our application's types
      const tagTypeMapping: Record<string, string> = {
        'cloud_provider': 'cloud',
        'crm': 'tech',
        'concern': 'compliance'
      };
      
      return {
        id: (index + 1).toString(),
        type: tagTypeMapping[tag.type] || 'integration',
        value: tag.value
      };
    });
    
    // Transform follow-up questions
    const followUpQuestions = lyzrResponse.follow_up_questions.map((question, index) => {
      // In a real implementation, we'd determine which component each question relates to
      // For this demo, we'll use a simple mapping strategy
      const weakComponents = Object.entries(meddpiccAnalysis)
        .filter(([_, comp]: [string, any]) => comp.score < 2)
        .map(([key]) => key);
      
      const component = weakComponents[index % weakComponents.length] || 'decisionProcess';
      
      return {
        id: (index + 1).toString(),
        component,
        question
      };
    });
    
    return {
      meddpicc: meddpiccAnalysis,
      enrichment: {
        cloudProvider,
        tags: transformedTags.filter(tag => tag.type !== 'cloud')
      },
      followUp: {
        questions: followUpQuestions,
        emailDraft: lyzrResponse.email_draft
      }
    };
  };

  const clearAnalysis = () => {
    setResult(null);
    setError(null);
    setLastNotes('');
  };

  return {
    isAnalyzing,
    result,
    error,
    isDemoMode,
    toggleDemoMode,
    analyzeNotes,
    clearAnalysis
  };
}