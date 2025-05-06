import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { History, ChevronRight, BarChart3, Loader2 } from 'lucide-react';

interface AnalysisItem {
  id: string;
  overall_score: number;
  max_score: number;
  score_percentage: number;
  created_at: string;
  meetings: {
    id: string;
    title: string;
    meeting_date: string;
  };
}

// Mock data for demo mode
const MOCK_HISTORICAL_ANALYSES: AnalysisItem[] = [
  {
    id: 'mock-analysis-1',
    overall_score: 18,
    max_score: 24,
    score_percentage: 75,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    meetings: {
      id: 'mock-meeting-1',
      title: 'Acme Corp - ERP Implementation',
      meeting_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'mock-analysis-2',
    overall_score: 12,
    max_score: 24,
    score_percentage: 50,
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    meetings: {
      id: 'mock-meeting-2',
      title: 'TechGlobal - Security Solution',
      meeting_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'mock-analysis-3',
    overall_score: 21,
    max_score: 24,
    score_percentage: 88,
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    meetings: {
      id: 'mock-meeting-3',
      title: 'Global Innovations - Cloud Migration',
      meeting_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'mock-analysis-4',
    overall_score: 15,
    max_score: 24,
    score_percentage: 63,
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
    meetings: {
      id: 'mock-meeting-4',
      title: 'NextGen Software - Annual Contract',
      meeting_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'mock-analysis-5',
    overall_score: 9,
    max_score: 24,
    score_percentage: 38,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    meetings: {
      id: 'mock-meeting-5',
      title: 'Horizon Healthcare - Platform Integration',
      meeting_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  }
];

const HistoricalAnalyses: React.FC = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Check if demo mode is enabled
    const demoMode = localStorage.getItem('meddpicc_demo_mode') === 'true';
    setIsDemoMode(demoMode);

    if (demoMode) {
      // Use mock data in demo mode
      setAnalyses(MOCK_HISTORICAL_ANALYSES);
      setLoading(false);
      return;
    }

    // Only fetch from Supabase if not in demo mode and user is authenticated
    if (!user) return;

    const fetchAnalyses = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('analyses')
          .select(`
            id,
            overall_score,
            max_score,
            score_percentage,
            created_at,
            meetings (
              id,
              title,
              meeting_date
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setAnalyses(data || []);
      } catch (err) {
        console.error('Error fetching analyses:', err);
        setError('Failed to load historical analyses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, [user]);

  // Listen for changes in demo mode
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'meddpicc_demo_mode') {
        const demoMode = e.newValue === 'true';
        setIsDemoMode(demoMode);
        
        if (demoMode) {
          setAnalyses(MOCK_HISTORICAL_ANALYSES);
          setLoading(false);
        } else if (user) {
          // Re-fetch real data if demo mode is turned off
          setLoading(true);
          // Trigger a refetch - this will happen in the main useEffect
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    if (percentage >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <History className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Historical Analyses</h2>
        </div>
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <History className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Historical Analyses</h2>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (analyses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <History className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Historical Analyses</h2>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>No previous analyses found.</p>
          <p className="mt-2 text-sm">
            Analyze your first meeting notes to see results here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <History className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Historical Analyses</h2>
        </div>
        <Link
          to="/history"
          className="text-sm text-gray-600 hover:text-black flex items-center"
        >
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Meeting
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {analyses.slice(0, 5).map((analysis) => (
              <tr key={analysis.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {analysis.meetings.title || 'Untitled Meeting'}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDate(analysis.meetings.meeting_date || analysis.created_at)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-gray-400" />
                    <span className={`text-sm font-medium ${getScoreColor(analysis.score_percentage)}`}>
                      {analysis.overall_score}/{analysis.max_score} ({analysis.score_percentage}%)
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={isDemoMode ? `/` : `/analysis/${analysis.id}`}
                    className="text-black hover:text-gray-600"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalAnalyses;