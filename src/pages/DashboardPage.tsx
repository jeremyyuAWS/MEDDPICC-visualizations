import React, { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import NoteInput from '../components/note-input/NoteInput';
import MEDDPICCScorecard from '../components/meddpicc/MEDDPICCScorecard';
import EnrichmentTags from '../components/enrichment/EnrichmentTags';
import FollowUpGenerator from '../components/follow-up/FollowUpGenerator';
import HubSpotSync from '../components/hubspot/HubSpotSync';
import HistoricalAnalyses from '../components/dashboard/HistoricalAnalyses';
import VisualizationHistory from '../components/visualization/VisualizationHistory';
import { useMEDDPICCAnalysis } from '../hooks/useMEDDPICCAnalysis';
import { useAuth } from '../context/AuthContext';
import { PlayCircle, BookOpen } from 'lucide-react';
import WelcomeModal from '../components/ui/WelcomeModal';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { 
    isAnalyzing, 
    result, 
    error, 
    analyzeNotes, 
    clearAnalysis,
    isDemoMode,
    toggleDemoMode
  } = useMEDDPICCAnalysis();
  const [showHistory, setShowHistory] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  
  // Check if this is the first visit to show welcome modal
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('meddpicc_welcome_seen');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
      localStorage.setItem('meddpicc_welcome_seen', 'true');
    }
  }, []);
  
  const handleStartDemo = () => {
    // Set demo mode if not already set
    if (!isDemoMode) {
      toggleDemoMode();
    }
    
    // Use a realistic sample of meeting notes for demo
    const demoNotes = `Met with Jane Doe, CFO, and John from IT. They're looking to save $100K per month on their current solution. They use AWS and Salesforce for their CRM, and need to comply with GDPR and SOC2 requirements. Legal approval takes 3 weeks, then it goes to the CFO for final signoff. Their pain is related to compliance delays that are putting them at risk of regulatory fines. John from IT is our internal champion and has been advocating for a new solution. They're looking to replace their current solution which is too expensive and requires too much manual work.`;
    
    // Start analysis with the demo notes
    analyzeNotes(demoNotes);
  };
  
  return (
    <AppLayout>
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={() => setShowWelcomeModal(false)} 
      />
      
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">MEDDPICC Qualification</h1>
              <p className="text-gray-600">
                Welcome, {user?.email}! Paste your meeting notes to get AI-powered MEDDPICC qualification scores and follow-up recommendations.
              </p>
            </div>
            
            <button 
              onClick={() => setShowWelcomeModal(true)}
              className="p-2 text-gray-600 hover:text-black"
              title="Show Help"
            >
              <BookOpen className="h-5 w-5" />
            </button>
          </div>
          
          {!result && !isAnalyzing && (
            <div className="mt-4">
              <button
                onClick={handleStartDemo}
                className="inline-flex items-center px-3 py-1.5 rounded-md text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <PlayCircle className="h-4 w-4 mr-1.5" />
                Try Demo
              </button>
              <span className="text-xs text-gray-500 ml-2">
                See how the app works with sample data
              </span>
            </div>
          )}
        </div>

        <div className="mb-8">
          <NoteInput 
            onAnalyze={analyzeNotes} 
            isAnalyzing={isAnalyzing} 
            onClear={clearAnalysis}
            hasResults={!!result}
            analysisResult={result}
            isDemoMode={isDemoMode}
            onToggleDemoMode={toggleDemoMode}
          />
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MEDDPICCScorecard analysis={result.meddpicc} />
              </div>
              <div>
                <EnrichmentTags 
                  cloudProvider={result.enrichment.cloudProvider} 
                  tags={result.enrichment.tags} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FollowUpGenerator 
                questions={result.followUp.questions} 
                emailDraft={result.followUp.emailDraft} 
              />
              <HubSpotSync 
                meddpiccData={result.meddpicc}
                enrichmentTags={result.enrichment.tags}
              />
            </div>
          </div>
        )}
        
        {/* Only show history if no analysis is being shown or explicitly toggled */}
        {(!result || showHistory) && (
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HistoricalAnalyses />
              <VisualizationHistory />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DashboardPage;