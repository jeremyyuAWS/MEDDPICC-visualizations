import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import VisualizationPanel from '../components/visualization/VisualizationPanel';
import ChartLibrary from '../components/visualization/ChartLibrary';
import PerplexityResults from '../components/visualization/PerplexityResults';
import Infographics from '../components/visualization/Infographics';
import { useAuth } from '../context/AuthContext';
import { PieChart, Lightbulb, ArrowRight, ChevronDown, ChevronUp, Download, BookOpen, DatabaseIcon, BarChart2 } from 'lucide-react';
import { perplexitySearchResults, infographicsData } from '../data/perplexityData';

const VisualizationPage: React.FC = () => {
  const { user } = useAuth();
  const [showExample, setShowExample] = useState(true);
  const [showChartLibrary, setShowChartLibrary] = useState(false);
  const [showExportInfo, setShowExportInfo] = useState(false);
  const [showPerplexitySample, setShowPerplexitySample] = useState(false);
  const [showInfographicSample, setShowInfographicSample] = useState(false);
  
  // Sample data to show in the education section
  const samplePerplexityData = perplexitySearchResults['ai_adoption'];
  const sampleInfographic = infographicsData['ai_adoption'];

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Visualization Agent</h1>
          <p className="text-gray-600">
            Generate data-driven "fun facts" to enhance your sales conversations
          </p>
        </div>

        {showExample && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                <h2 className="text-xl font-semibold">How to Use the Visualization Agent</h2>
              </div>
              <button 
                onClick={() => setShowExample(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-600 mb-4">
                The Visualization Agent helps you craft compelling data stories for your sales conversations. Simply provide some context about the company, industry, or technologies, and the AI will generate a relevant "fun fact" visualization that you can use in your follow-up communications.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</div>
                    <h3 className="font-medium">Enter Context</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Provide details about the company, industry, cloud provider, or specific technologies they use.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</div>
                    <h3 className="font-medium">Generate Visualization</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    The AI analyzes the context and creates a relevant chart with an insightful "fun fact" about their industry or technology.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</div>
                    <h3 className="font-medium">Use in Follow-Up</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Copy the insight and download the chart to use in your follow-up emails, presentations, or calls.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowPerplexitySample(!showPerplexitySample)}>
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                      Research Data
                    </div>
                    {showPerplexitySample ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  
                  {showPerplexitySample && (
                    <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">
                        The Visualization Agent now includes curated research data from reputable sources to support your visualizations and insights:
                      </p>
                      
                      <div className="mt-4 max-h-56 overflow-y-auto">
                        <PerplexityResults 
                          results={samplePerplexityData} 
                          title="Sample: AI Adoption Research Data"
                          showCopyButton={false}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowInfographicSample(!showInfographicSample)}>
                    <div className="flex items-center text-sm font-medium text-gray-700">
                      <BarChart2 className="h-4 w-4 mr-2 text-indigo-600" />
                      Data Infographics
                    </div>
                    {showInfographicSample ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                  
                  {showInfographicSample && (
                    <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">
                        Infographics provide concise, bullet-point summaries of key data that's perfect for sharing in presentations or conversations:
                      </p>
                      
                      <div className="mt-4 max-h-64 overflow-y-auto">
                        <Infographics 
                          title={sampleInfographic.title}
                          subtitle={sampleInfographic.subtitle}
                          bulletPoints={sampleInfographic.bulletPoints}
                          visualComponents={sampleInfographic.visualComponents}
                          recommendations={sampleInfographic.recommendations}
                          sources={sampleInfographic.sources}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowExportInfo(!showExportInfo)}
                  className="flex items-center text-sm text-gray-600 hover:text-black"
                >
                  {showExportInfo ? (
                    <><ChevronUp className="h-4 w-4 mr-1" /> Hide Export Options</>
                  ) : (
                    <><ChevronDown className="h-4 w-4 mr-1" /> Show Export Options</>
                  )}
                </button>
              </div>
              
              {showExportInfo && (
                <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div className="flex items-center mb-2">
                    <Download className="h-4 w-4 text-gray-700 mr-2" />
                    <h3 className="font-medium text-gray-700">Export Formats</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">PNG Image</h4>
                      <p className="text-gray-600 text-xs">
                        Best for embedding in emails, presentations, or social media posts.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">PDF Document</h4>
                      <p className="text-gray-600 text-xs">
                        Good for formal documents, proposals, or printing.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">CSV Data</h4>
                      <p className="text-gray-600 text-xs">
                        Export raw data for further analysis or custom visualizations.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowExample(false)}
                className="flex items-center text-sm text-gray-600 hover:text-black"
              >
                Get Started <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        <VisualizationPanel />
        
        <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
          <button
            className="w-full px-6 py-4 flex items-center justify-between text-left"
            onClick={() => setShowChartLibrary(!showChartLibrary)}
          >
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-gray-700 mr-2" />
              <h2 className="text-lg font-semibold">Explore Chart Library</h2>
            </div>
            
            {showChartLibrary ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {showChartLibrary && (
            <div className="p-6 border-t border-gray-200">
              <ChartLibrary />
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <PieChart className="h-5 w-5 text-gray-700 mr-2" />
            <h2 className="text-lg font-semibold">Why Use Data Visualizations?</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Data-driven "fun facts" and visualizations can significantly enhance your sales conversations by:
            </p>
            
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 ml-4">
              <li>Establishing you as a knowledgeable industry expert</li>
              <li>Making your follow-up emails more engaging and memorable</li>
              <li>Providing valuable context that validates your solution's value</li>
              <li>Creating natural conversation starters for your next interaction</li>
              <li>Differentiating your approach from competitors</li>
            </ul>
            
            <p className="text-sm text-gray-600">
              For best results, use these visualizations to support your MEDDPICC qualification efforts by connecting them to specific pain points or metrics discussed during your sales conversation.
            </p>
            
            <div className="p-4 border border-gray-200 rounded-md bg-white mt-4">
              <h3 className="text-sm font-medium mb-2">Pro Tips</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
                <li>Save visualizations you use frequently with different clients</li>
                <li>Customize insight wording to match your client's specific situation</li>
                <li>Include visualizations in follow-up emails and presentations</li>
                <li>Use the data to ask thought-provoking questions in your next meeting</li>
                <li>Connect the visualization to specific MEDDPICC components to strengthen qualification</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default VisualizationPage;