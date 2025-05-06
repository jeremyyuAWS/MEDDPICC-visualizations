import React, { useState, useEffect } from 'react';
import { FileText, Send, Trash2, ArrowRight, Save, Loader2, Check, ToggleLeft, ToggleRight } from 'lucide-react';
import { useSupabaseStorage } from '../../hooks/useSupabaseStorage';

interface NoteInputProps {
  onAnalyze: (notes: string) => void;
  isAnalyzing: boolean;
  onClear?: () => void;
  hasResults?: boolean;
  analysisResult?: any;
  isDemoMode?: boolean;
  onToggleDemoMode?: () => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ 
  onAnalyze, 
  isAnalyzing, 
  onClear,
  hasResults,
  analysisResult,
  isDemoMode = false,
  onToggleDemoMode
}) => {
  const [notes, setNotes] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const { saveAnalysis } = useSupabaseStorage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use current notes which may be the default demo notes if in demo mode
    onAnalyze(currentNotes);
  };

  const handleClear = () => {
    setNotes('');
    setMeetingTitle('');
    setSaveSuccess(false);
    setSaveError(null);
    if (onClear) onClear();
  };
  
  const handleSaveAnalysis = async () => {
    if (!analysisResult) return;
    
    try {
      setIsSaving(true);
      setSaveError(null);
      
      const result = await saveAnalysis(notes, analysisResult, meetingTitle || undefined);
      
      if (result.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError('Failed to save analysis. Please try again.');
      }
    } catch (err) {
      console.error('Error saving analysis:', err);
      setSaveError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getDefaultNotes = () => {
    if (isDemoMode) {
      return "Met with Jane Doe, CFO. They're looking to save $100K per month on their current solution. They use AWS and Salesforce. Legal approval takes 3 weeks, then it goes to the CFO for final signoff. Their pain is related to compliance delays. John from IT is our internal champion.";
    }
    return '';
  };

  // Use the default notes for demo mode if notes are empty
  const currentNotes = notes || (isDemoMode ? getDefaultNotes() : '');

  // Auto-analyze when pasting notes in demo mode
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    
    // If in demo mode and user pastes substantial text (more than 50 chars), 
    // automatically start analyzing
    if (isDemoMode && newNotes.length > 50 && Math.abs(newNotes.length - notes.length) > 40) {
      setTimeout(() => onAnalyze(newNotes), 500);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Meeting Notes</h2>
        </div>
        
        {onToggleDemoMode && (
          <div 
            className="flex items-center cursor-pointer"
            onClick={onToggleDemoMode}
          >
            {isDemoMode ? (
              <>
                <ToggleRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">Demo Mode</span>
              </>
            ) : (
              <>
                <ToggleLeft className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">Live Mode</span>
              </>
            )}
          </div>
        )}
      </div>
      
      {isDemoMode && (
        <div className="mb-4 p-2 bg-green-50 border border-green-200 text-green-700 rounded-md text-xs">
          <div className="flex items-center">
            <Check className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
            <span className="font-medium">Demo Mode</span>
          </div>
          <p className="mt-1 text-green-600 text-xs">
            Using simulated data for demonstration. Click "Analyze Notes" or paste your own meeting notes.
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {hasResults && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Title
            </label>
            <input
              type="text"
              placeholder="Enter a title for this meeting"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
        )}
      
        <textarea
          className="w-full border border-gray-300 rounded-md p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
          placeholder="Paste your meeting notes here... The AI will analyze and extract MEDDPICC qualification data."
          value={currentNotes}
          onChange={handleNotesChange}
          disabled={isAnalyzing || isSaving}
        ></textarea>
        
        {saveError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {saveError}
          </div>
        )}
        
        {saveSuccess && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Analysis saved successfully!
          </div>
        )}
        
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center px-4 py-2 text-gray-700 hover:text-black transition-colors"
            disabled={isAnalyzing || isSaving || !currentNotes}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </button>
          
          <div className="flex space-x-3">
            {hasResults && (
              <button
                type="button"
                onClick={handleSaveAnalysis}
                disabled={isAnalyzing || isSaving || !currentNotes || !analysisResult}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors disabled:bg-gray-100 disabled:text-gray-400"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Analysis
                  </>
                )}
              </button>
            )}
            
            <button
              type="submit"
              className={`flex items-center px-6 py-2 rounded-md transition-colors ${
                hasResults 
                  ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              disabled={isAnalyzing || isSaving || !currentNotes.trim()}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Analyzing...
                </>
              ) : hasResults ? (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Update Analysis
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Analyze Notes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NoteInput;