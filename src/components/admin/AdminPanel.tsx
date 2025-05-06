import React, { useState } from 'react';
import { Code, Play, AlertCircle, CheckCircle, Loader2, Terminal, Cpu, HelpCircle, ToggleLeft, ToggleRight } from 'lucide-react';
import { MOCK_ANALYSIS_RESULT } from '../../constants/meddpiccData';

const AdminPanel: React.FC = () => {
  const [testNotes, setTestNotes] = useState<string>(
    "Met with Jane Doe, CFO. They're looking to save $100K per month on their current solution. They use AWS and Salesforce. Legal approval takes 3 weeks, then it goes to the CFO for final signoff. Their pain is related to compliance delays. John from IT is our internal champion."
  );
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'test' | 'debug' | 'learn'>('test');
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('meddpicc_demo_mode');
    return saved ? saved === 'true' : false;
  });

  const handleTest = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setLogMessages(prev => [...prev, "Starting test with meeting notes..."]);

    try {
      if (isDemoMode) {
        // In demo mode, use mock data with a delay to simulate API call
        setLogMessages(prev => [...prev, "DEMO MODE: Using simulated data instead of API call"]);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setResponse(MOCK_ANALYSIS_RESULT);
        setLogMessages(prev => [...prev, "DEMO MODE: Successfully generated simulated response"]);
      } else {
        // Create payload for Lyzr agent
        const payload = {
          user_id: "ae_123456",
          org_id: "lyzr_enterprise_7890",
          raw_notes: testNotes
        };

        setLogMessages(prev => [...prev, "Preparing API request to analyze-notes function"]);

        // Call the Supabase Edge Function
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-notes`;
        
        setLogMessages(prev => [...prev, `Sending request to ${apiUrl}`]);
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorText = await response.text();
          setLogMessages(prev => [...prev, `API error: ${response.status} - ${errorText}`]);
          throw new Error(`API responded with status: ${response.status}${errorText ? ` - ${errorText}` : ''}`);
        }

        setLogMessages(prev => [...prev, "Response received successfully"]);
        
        const data = await response.json();
        setLogMessages(prev => [...prev, "Data parsed successfully"]);
        setResponse(data);
      }
    } catch (err) {
      console.error('Test error:', err);
      setLogMessages(prev => [...prev, `Error: ${err instanceof Error ? err.message : String(err)}`]);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
      setLogMessages(prev => [...prev, "Test operation completed"]);
    }
  };
  
  const toggleDemoMode = () => {
    const newValue = !isDemoMode;
    setIsDemoMode(newValue);
    localStorage.setItem('meddpicc_demo_mode', newValue.toString());
    
    // Clear existing response when toggling
    setResponse(null);
    setError(null);
    setLogMessages([`Switched to ${newValue ? 'demo' : 'real data'} mode`]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Code className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
        
        <div 
          className="flex items-center cursor-pointer"
          onClick={toggleDemoMode}
        >
          {isDemoMode ? (
            <>
              <ToggleRight className="h-5 w-5 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-600">Demo Mode</span>
            </>
          ) : (
            <>
              <ToggleLeft className="h-5 w-5 text-gray-400 mr-1" />
              <span className="text-sm text-gray-500">Real Data</span>
            </>
          )}
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('test')}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === 'test'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <span className="flex items-center">
              <Play className="h-4 w-4 mr-1" />
              Test Agent
            </span>
          </button>
          <button
            onClick={() => setActiveTab('debug')}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === 'debug'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <span className="flex items-center">
              <Terminal className="h-4 w-4 mr-1" />
              Debug
            </span>
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeTab === 'learn'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <span className="flex items-center">
              <HelpCircle className="h-4 w-4 mr-1" />
              Learn
            </span>
          </button>
        </div>
      </div>
      
      {activeTab === 'test' && (
        <div>
          {isDemoMode && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
              <p className="flex items-center font-medium mb-1">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Demo Mode Active
              </p>
              <p className="text-green-600">
                In demo mode, the agent will use simulated data instead of making actual API calls.
                This allows you to test the interface without consuming API credits.
              </p>
            </div>
          )}
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Lyzr Agent Testing</h3>
            <p className="text-sm text-gray-600 mb-4">
              Test the MEDDPICC Qualification Agent by providing sample meeting notes and checking the response.
            </p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sample Meeting Notes
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3 min-h-[150px] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                value={testNotes}
                onChange={(e) => setTestNotes(e.target.value)}
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleTest}
                disabled={isLoading}
                className="flex items-center bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Test Agent
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Debug Log */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Debug Log</h4>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-md font-mono text-xs h-32 overflow-y-auto">
              {logMessages.length > 0 ? (
                logMessages.map((msg, idx) => (
                  <div key={idx} className="mb-1">
                    <span className="text-gray-500">[{new Date().toISOString()}]</span> {msg}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No logs yet. Run a test to see debug information.</div>
              )}
            </div>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-800 mb-1">Error</h4>
                  <p className="text-sm text-red-700 whitespace-pre-wrap">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {response && (
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <h4 className="text-sm font-medium text-green-800">Response Received</h4>
              </div>
              
              <div>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h5 className="text-xs font-medium text-gray-700">MEDDPICC Analysis</h5>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(isDemoMode 
                        ? response.meddpicc 
                        : response.meddpicc_scores).map(([key, value]: [string, any]) => (
                        <div key={key} className="border border-gray-200 bg-white rounded-md p-3">
                          <h6 className="text-xs font-medium mb-1 capitalize">
                            {key.replace(/_/g, ' ')}
                          </h6>
                          <div className="flex items-center mb-1">
                            <div className={`h-2 w-2 rounded-full mr-1 ${
                              value.score === 3 ? 'bg-green-500' : 
                              value.score === 2 ? 'bg-yellow-500' : 
                              value.score === 1 ? 'bg-orange-500' : 'bg-red-500'
                            }`}></div>
                            <span className="text-xs">Score: {value.score}/3</span>
                          </div>
                          <p className="text-xs text-gray-700">{value.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <h5 className="text-xs font-medium text-gray-700">Raw Response JSON</h5>
                </div>
                <pre className="p-4 text-xs overflow-auto max-h-[400px] bg-gray-50">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'debug' && (
        <div>
          <h3 className="text-lg font-medium mb-4">Lyzr API Configuration</h3>
          
          <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-2">API Endpoint</h4>
            <pre className="p-3 bg-gray-900 text-green-400 rounded text-xs overflow-x-auto">
              POST https://agent-dev.test.studio.lyzr.ai/v3/inference/chat/
            </pre>
          </div>
          
          <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Request Headers</h4>
            <pre className="p-3 bg-gray-900 text-green-400 rounded text-xs overflow-x-auto">
{`Content-Type: application/json
x-api-key: sk-default-4oGju1PuWIBzOtgXrltS75fxTPO1AjEr`}
            </pre>
          </div>
          
          <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Request Payload Structure</h4>
            <pre className="p-3 bg-gray-900 text-green-400 rounded text-xs overflow-x-auto">
{`{
  "user_id": "jeremy@lyzr.ai",
  "agent_id": "6818d4789023e3bc1baf2237",
  "session_id": "undefined-xxszypbgmdf",
  "message": "JSON string with user_id, org_id, and raw_notes"
}`}
            </pre>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Testing with curl</h4>
            <pre className="p-3 bg-gray-900 text-green-400 rounded text-xs overflow-x-auto">
{`curl -X POST 'https://agent-dev.test.studio.lyzr.ai/v3/inference/chat/' \\
  -H 'Content-Type: application/json' \\
  -H 'x-api-key: sk-default-4oGju1PuWIBzOtgXrltS75fxTPO1AjEr' \\
  -d '{
    "user_id": "jeremy@lyzr.ai",
    "agent_id": "6818d4789023e3bc1baf2237",
    "session_id": "undefined-xxszypbgmdf",
    "message": "{\\"user_id\\":\\"ae_123456\\",\\"org_id\\":\\"lyzr_enterprise_7890\\",\\"raw_notes\\":\\"Meeting notes here\\"}"
  }'`}
            </pre>
          </div>
          
          <div className="mt-6 bg-yellow-50 p-4 rounded-md border border-yellow-200">
            <h4 className="text-sm font-medium text-yellow-800 mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Troubleshooting Common Issues
            </h4>
            <ul className="list-disc list-inside text-sm text-yellow-700 space-y-2">
              <li>CORS issues: Check that the Edge Function has the correct CORS headers</li>
              <li>Authorization errors: Verify the Supabase anon key is correct</li>
              <li>Timeout errors: The Lyzr API request might be taking too long</li>
              <li>Parsing errors: Ensure the Edge Function is returning valid JSON</li>
            </ul>
          </div>
        </div>
      )}
      
      {activeTab === 'learn' && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-2">
              <span className="flex items-center">
                <Cpu className="h-4 w-4 mr-2" />
                What is a Lyzr Agent?
              </span>
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              Lyzr Agents are specialized AI models trained for specific business tasks. They can analyze text, extract structured data, and generate insights based on domain-specific knowledge.
            </p>
            <p className="text-sm text-gray-600">
              Unlike general-purpose AI, Lyzr Agents are fine-tuned for particular business processes, enabling them to provide highly relevant outputs with minimal prompting.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-2">MEDDPICC Qualification Agent</h4>
            <p className="text-sm text-gray-600 mb-2">
              This agent analyzes sales meeting notes to extract MEDDPICC qualification data, identify key stakeholders, and suggest follow-up questions to improve deal qualification.
            </p>
            <div className="mt-3 border-t border-gray-200 pt-3">
              <h5 className="text-xs font-medium text-gray-700 mb-2">Capabilities:</h5>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Extracts and scores MEDDPICC components</li>
                <li>Identifies technologies and compliance requirements</li>
                <li>Generates follow-up questions for missing information</li>
                <li>Creates email draft templates for sales follow-up</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Integration Architecture</h4>
            <p className="text-sm text-gray-600 mb-3">
              The MEDDPICC Qualification Agent is integrated using:
            </p>
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h5 className="text-xs font-medium text-gray-700 mb-2">Frontend (React)</h5>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                <li>User inputs meeting notes</li>
                <li>Sends request to Supabase Edge Function</li>
                <li>Processes and displays agent response</li>
              </ul>
            </div>
            <div className="mt-3 bg-white p-4 rounded-md border border-gray-200">
              <h5 className="text-xs font-medium text-gray-700 mb-2">Supabase Edge Function</h5>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                <li>Receives request from frontend</li>
                <li>Forwards to Lyzr API with proper authentication</li>
                <li>Returns processed response to frontend</li>
              </ul>
            </div>
            <div className="mt-3 bg-white p-4 rounded-md border border-gray-200">
              <h5 className="text-xs font-medium text-gray-700 mb-2">Lyzr API</h5>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                <li>Analyzes meeting notes with specialized model</li>
                <li>Extracts MEDDPICC components</li>
                <li>Generates follow-up questions and email draft</li>
                <li>Returns structured response</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Building Your Own Lyzr-Powered App</h4>
            <p className="text-sm text-gray-600 mb-3">
              To create your own application with Lyzr:
            </p>
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
              <li>Define your specific business use case</li>
              <li>Create a Lyzr agent through the Lyzr Studio platform</li>
              <li>Develop a serverless function to securely call the Lyzr API</li>
              <li>Build a frontend that sends data and displays results</li>
              <li>Implement error handling and response processing</li>
            </ol>
            <p className="text-sm text-gray-600 mt-3">
              For more information, visit <a href="https://lyzr.ai" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">lyzr.ai</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;