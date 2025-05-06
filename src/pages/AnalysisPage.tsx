import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import MEDDPICCScorecard from '../components/meddpicc/MEDDPICCScorecard';
import EnrichmentTags from '../components/enrichment/EnrichmentTags';
import FollowUpGenerator from '../components/follow-up/FollowUpGenerator';
import HubSpotSync from '../components/hubspot/HubSpotSync';
import { useSupabaseStorage } from '../hooks/useSupabaseStorage';
import { FileText, ArrowLeft, Calendar, Save, Loader2 } from 'lucide-react';

const AnalysisPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoading, error, loadAnalysis } = useSupabaseStorage();
  
  const [notes, setNotes] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [meetingTitle, setMeetingTitle] = useState<string>('');
  const [meetingDate, setMeetingDate] = useState<string>('');

  useEffect(() => {
    if (!id) return;
    
    const fetchAnalysis = async () => {
      const response = await loadAnalysis(id);
      
      if (response.success) {
        setNotes(response.notes);
        setAnalysisResult(response.result);
        
        // Extract meeting metadata from response if available
        if (response.meetingMetadata) {
          setMeetingTitle(response.meetingMetadata.title || 'Untitled Meeting');
          setMeetingDate(response.meetingMetadata.meeting_date || '');
        }
      }
    };
    
    fetchAnalysis();
  }, [id, loadAnalysis]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-12 w-12 text-gray-400 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Loading Analysis</h2>
              <p className="text-gray-600">Please wait while we load the analysis data...</p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-md p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Error Loading Analysis</h2>
            <p>{error}</p>
            <button
              onClick={handleBack}
              className="mt-4 flex items-center text-red-700 hover:text-red-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!analysisResult) {
    return (
      <AppLayout>
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Analysis Not Found</h2>
            <p className="text-gray-700">The requested analysis could not be found or loaded.</p>
            <button
              onClick={handleBack}
              className="mt-4 flex items-center text-black hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-700 mr-2" />
              <h1 className="text-2xl font-bold">{meetingTitle || 'Meeting Analysis'}</h1>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(meetingDate)}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Meeting Notes</h2>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 whitespace-pre-line">
              {notes}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="flex items-center text-sm text-gray-600 hover:text-black">
              <Save className="h-4 w-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MEDDPICCScorecard analysis={analysisResult.meddpicc} />
            </div>
            <div>
              <EnrichmentTags 
                cloudProvider={analysisResult.enrichment.cloudProvider} 
                tags={analysisResult.enrichment.tags} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FollowUpGenerator 
              questions={analysisResult.followUp.questions} 
              emailDraft={analysisResult.followUp.emailDraft} 
            />
            <HubSpotSync 
              meddpiccData={analysisResult.meddpicc}
              enrichmentTags={analysisResult.enrichment.tags}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AnalysisPage;