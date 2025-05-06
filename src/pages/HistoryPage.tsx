import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { History, BarChart3, Calendar, ChevronRight, Loader2, Search, SlidersHorizontal, ArrowUpDown, ExternalLink } from 'lucide-react';

interface AnalysisItem {
  id: string;
  overall_score: number;
  max_score: number;
  score_percentage: number;
  created_at: string;
  meetings: {
    id: string;
    title: string;
    notes: string;
    meeting_date: string;
  };
}

// Extended mock data for the history page in demo mode
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
      notes: 'Meeting with CIO and IT Director. They need an ERP solution that integrates with their existing AWS infrastructure. Budget of $1.2M approved, with expected ROI of 3x within 18 months. Procurement process requires legal review and board approval.',
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
      notes: 'Call with CISO about security compliance requirements. Current solution is failing audit requirements. Looking for something that works with their Salesforce implementation. They need to resolve this within the next quarter.',
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
      notes: 'Met with CTO and Head of Infrastructure. They\'re moving from on-prem to cloud and need migration services. Looking to save $250K annually and improve scalability. Decision needs to be made by end of month to hit Q3 objectives.',
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
      notes: 'Annual contract renewal discussion with CFO and Procurement. They\'re considering alternatives due to rising costs. Need to demonstrate 15% better value than competitors. Legal review takes 3 weeks.',
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
      notes: 'Initial discovery with IT Director. They need to integrate multiple healthcare systems under tight compliance requirements. Security and HIPAA compliance are major concerns. Budget is still being determined.',
      meeting_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'mock-analysis-6',
    overall_score: 19,
    max_score: 24,
    score_percentage: 79,
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    meetings: {
      id: 'mock-meeting-6',
      title: 'FinTech Solutions - API Integration',
      notes: 'Meeting with VP of Engineering about API integration needs. They require a solution that can process 10,000+ transactions per second. Compliance with financial regulations is critical. Budget of $500K approved.',
      meeting_date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'mock-analysis-7',
    overall_score: 13,
    max_score: 24,
    score_percentage: 54,
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    meetings: {
      id: 'mock-meeting-7',
      title: 'Retail Innovations - E-commerce Platform',
      notes: 'Call with CMO and Digital Director about e-commerce platform needs. Current solution has poor performance during high traffic events. Looking for 99.99% uptime and 2-second page loads. Competitive evaluation in progress.',
      meeting_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
    }
  },
  {
    id: 'mock-analysis-8',
    overall_score: 22,
    max_score: 24,
    score_percentage: 92,
    created_at: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(), // 75 days ago
    meetings: {
      id: 'mock-meeting-8',
      title: 'Industrial Tech - IoT Solution',
      notes: 'Met with COO and Head of Operations. They need an IoT platform to monitor 5,000+ sensors across 12 manufacturing facilities. ROI estimated at $1.5M in first year through reduced downtime. Board approval secured.',
      meeting_date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString()
    }
  }
];

const HistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'date' | 'score'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
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
              notes,
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

  const handleSort = (field: 'date' | 'score') => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedAnalyses = () => {
    // First filter by search term
    const filtered = analyses.filter(analysis => {
      const searchString = searchTerm.toLowerCase();
      const title = analysis.meetings.title?.toLowerCase() || '';
      const notes = analysis.meetings.notes?.toLowerCase() || '';
      
      return title.includes(searchString) || notes.includes(searchString);
    });
    
    // Then sort
    return filtered.sort((a, b) => {
      if (sortField === 'date') {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else { // score
        return sortDirection === 'asc' 
          ? a.score_percentage - b.score_percentage 
          : b.score_percentage - a.score_percentage;
      }
    });
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analysis History</h1>
            <p className="text-gray-600">View and compare past MEDDPICC analyses</p>
          </div>
          
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analysis History</h1>
          <p className="text-gray-600">Review and compare your past MEDDPICC qualification analyses</p>
        </div>
        
        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-4 mb-6">
            {error}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <History className="h-5 w-5 text-gray-700 mr-2" />
                  <h2 className="text-xl font-semibold">Historical Analyses</h2>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search analyses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all w-48 md:w-64"
                    />
                  </div>
                  
                  <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>
              
              {analyses.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <History className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-1">No Analyses Found</h3>
                  <p className="mb-4">You haven't created any MEDDPICC analyses yet.</p>
                  <Link 
                    to="/"
                    className="inline-flex items-center bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-1" />
                    Create Your First Analysis
                  </Link>
                </div>
              ) : filteredAndSortedAnalyses().length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-1">No Matching Results</h3>
                  <p>No analyses match your search criteria.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Meeting
                        </th>
                        <th 
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('date')}
                        >
                          <div className="flex items-center">
                            Date
                            {sortField === 'date' && (
                              <ArrowUpDown className="h-3 w-3 ml-1" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('score')}
                        >
                          <div className="flex items-center">
                            Score
                            {sortField === 'score' && (
                              <ArrowUpDown className="h-3 w-3 ml-1" />
                            )}
                          </div>
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAndSortedAnalyses().map((analysis) => (
                        <tr key={analysis.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {analysis.meetings.title || 'Untitled Meeting'}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {analysis.meetings.notes.substring(0, 100)}...
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
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
                              className="text-black hover:text-gray-600 inline-flex items-center mr-3"
                            >
                              View
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                            <a 
                              href="#" 
                              className="text-gray-600 hover:text-black inline-flex items-center"
                              onClick={(e) => {
                                e.preventDefault();
                                // Export functionality would go here
                                alert('Export functionality not implemented yet');
                              }}
                            >
                              Export
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {analyses.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-5 w-5 text-gray-700 mr-2" />
                  <h2 className="text-xl font-semibold">Analysis Trends</h2>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-center">
                  <p className="text-gray-600">
                    Historical trend visualization will be available here.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Coming soon: Line charts showing MEDDPICC scores over time and component breakdowns.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default HistoryPage;