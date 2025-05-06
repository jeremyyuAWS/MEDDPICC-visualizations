import React, { useState, useEffect } from 'react';
import { Brain, Send, Loader2, ToggleLeft, ToggleRight, Download, Copy, ChevronDown, ChevronUp, Check, RefreshCw, Tag, Save, Share, Database, BookOpen, PieChart } from 'lucide-react';
import { useVisualizationAgent } from '../../hooks/useVisualizationAgent';
import { VisualizationPayload } from '../../types';
import ChartRenderer from './ChartRenderer';
import { useSavedVisualizations } from '../../hooks/useSavedVisualizations';
import SavedVisualizationsList from './SavedVisualizationsList';
import PerplexityResults from './PerplexityResults';
import Infographics from './Infographics';
import ResearchSummary from './ResearchSummary';
import { perplexitySearchResults, infographicsData, researchSummaries } from '../../data/perplexityData';

interface VisualizationPanelProps {
  meddpiccAnalysis?: any;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ meddpiccAnalysis }) => {
  const { 
    isLoading, 
    result, 
    error, 
    isDemoMode, 
    toggleDemoMode, 
    generateVisualization,
    getSampleTopics,
    getSampleIndustries 
  } = useVisualizationAgent();

  const {
    savedVisualizations,
    saveVisualization,
    isSaving,
    saveSuccess,
    saveError
  } = useSavedVisualizations();
  
  const [formState, setFormState] = useState<VisualizationPayload>({
    industry: '',
    cloudProvider: '',
    company: '',
    topic: '',
    technologies: [],
    painPoints: []
  });
  
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showSavedVisualizations, setShowSavedVisualizations] = useState(false);
  const [chartTitle, setChartTitle] = useState('');
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf' | 'csv'>('png');
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  // New states for perplexity data display
  const [showPerplexityData, setShowPerplexityData] = useState(false);
  const [perplexityCategory, setPerplexityCategory] = useState<string | null>(null);
  const [showInfographics, setShowInfographics] = useState(false);
  const [infographicsCategory, setInfographicsCategory] = useState<string | null>(null);
  const [showResearch, setShowResearch] = useState(false);
  const [researchCategory, setResearchCategory] = useState<string | null>(null);

  // Prefill form with MEDDPICC data if available
  useEffect(() => {
    if (meddpiccAnalysis) {
      const painPoints: string[] = [];
      if (meddpiccAnalysis.identifyPain?.text) {
        painPoints.push(meddpiccAnalysis.identifyPain.text);
      }

      const technologies: string[] = [];
      const tags = meddpiccAnalysis?.enrichment?.tags || [];
      tags.forEach((tag: any) => {
        if (tag.type === 'tech') {
          technologies.push(tag.value);
        }
      });

      setFormState(prev => ({
        ...prev,
        cloudProvider: meddpiccAnalysis?.enrichment?.cloudProvider || '',
        technologies,
        painPoints,
      }));
    }
  }, [meddpiccAnalysis]);

  // Update related data categories based on form state changes
  useEffect(() => {
    if (formState.industry) {
      const industry = formState.industry.toLowerCase();
      
      // Set appropriate perplexity category based on industry
      if (industry.includes('health')) {
        setPerplexityCategory('healthcare');
        setInfographicsCategory('healthcare_ai');
        setResearchCategory('healthcare_ai_impact');
      } else if (industry.includes('finance') || industry.includes('bank')) {
        setPerplexityCategory('finance');
        setInfographicsCategory('cloud_ai');
        setResearchCategory('ai_roi_analysis');
      } else if (industry.includes('manufacturing')) {
        setPerplexityCategory('manufacturing');
        setInfographicsCategory('manufacturing_ai');
        setResearchCategory('enterprise_ai_adoption');
      } else if (industry.includes('retail')) {
        setPerplexityCategory('retail');
        setInfographicsCategory('ai_adoption');
        setResearchCategory('enterprise_ai_adoption');
      } else {
        setPerplexityCategory('ai_adoption');
        setInfographicsCategory('ai_adoption');
        setResearchCategory('enterprise_ai_adoption');
      }
    } else if (formState.cloudProvider) {
      setPerplexityCategory('cloud_providers');
      setInfographicsCategory('cloud_ai');
      setResearchCategory('cloud_ai_services');
    } else if (formState.technologies?.some(tech => tech.toLowerCase().includes('salesforce'))) {
      setPerplexityCategory('salesforce');
      setInfographicsCategory('salesforce_ai');
      setResearchCategory('salesforce_ai_performance');
    }
  }, [formState.industry, formState.cloudProvider, formState.technologies]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'technologies' | 'painPoints') => {
    const { value } = e.target;
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setFormState(prev => ({ ...prev, [type]: tags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateVisualization(formState);
    
    // Show research data after generation
    if (isDemoMode) {
      setShowPerplexityData(true);
      setShowInfographics(true);
      
      // Only show research for certain categories
      if (['healthcare', 'finance', 'manufacturing', 'cloud_providers', 'salesforce'].includes(perplexityCategory || '')) {
        setShowResearch(true);
      }
    }
  };

  const copyInsight = () => {
    if (!result) return;
    
    const insightText = result.insight;
    navigator.clipboard.writeText(insightText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadChart = () => {
    setShowExportOptions(!showExportOptions);
  };
  
  const handleExport = (format: 'png' | 'pdf' | 'csv') => {
    setExportFormat(format);
    
    // In a real implementation, this would use the chart library's export functionality
    // For this demo, we'll just show a message
    alert(`Chart will be exported as ${format.toUpperCase()}. This feature is coming soon!`);
    setShowExportOptions(false);
  };

  const handleSaveVisualization = () => {
    if (!result) return;
    
    saveVisualization({
      title: chartTitle || result.chartData.title || 'Untitled Visualization',
      visualization: result,
      context: formState,
      createdAt: new Date().toISOString()
    });
  };

  const handleExampleClick = (type: string, value: string) => {
    if (type === 'topic') {
      setFormState(prev => ({ ...prev, topic: value }));
    } else if (type === 'industry') {
      setFormState(prev => ({ ...prev, industry: value }));
    }
  };

  const handleRandomize = () => {
    // Generate a randomized visualization to showcase different chart types
    const industries = getSampleIndustries();
    const topics = getSampleTopics();
    const cloudProviders = ['AWS', 'Azure', 'Google Cloud'];
    const technologies = ['Salesforce', 'AI/ML', 'Data Analytics', 'Security'];
    
    const randomIndustry = industries[Math.floor(Math.random() * industries.length)];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const randomCloud = cloudProviders[Math.floor(Math.random() * cloudProviders.length)];
    const randomTech = technologies[Math.floor(Math.random() * technologies.length)];
    
    const newState = {
      industry: randomIndustry,
      topic: randomTopic,
      cloudProvider: randomCloud,
      technologies: [randomTech],
      painPoints: [],
      company: 'Example Corp'
    };
    
    setFormState(newState);
    generateVisualization(newState);
    
    // Show data panels for demo
    if (isDemoMode) {
      setShowPerplexityData(true);
      setShowInfographics(true);
      
      // Set appropriate data category based on randomized inputs
      const industry = randomIndustry.toLowerCase();
      if (industry.includes('health')) {
        setPerplexityCategory('healthcare');
        setInfographicsCategory('healthcare_ai');
      } else if (industry.includes('finance') || industry.includes('bank')) {
        setPerplexityCategory('finance');
        setInfographicsCategory('cloud_ai');
      } else if (industry.includes('manufacturing')) {
        setPerplexityCategory('manufacturing');
        setInfographicsCategory('manufacturing_ai');
      } else if (industry.includes('retail')) {
        setPerplexityCategory('retail');
        setInfographicsCategory('ai_adoption');
      } else {
        setPerplexityCategory('ai_adoption');
        setInfographicsCategory('ai_adoption');
      }
    }
  };
  
  // Share the visualization via email
  const shareVisualization = () => {
    if (!result) return;
    
    const subject = encodeURIComponent(result.chartData.title || 'Sales Visualization');
    const body = encodeURIComponent(`Here's an interesting data point for our discussion:\n\n${result.insight}\n\nView the full visualization in the MEDDPICC Qualification Agent.`);
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  // Get the relevant perplexity results for current category
  const getPerplexityResults = () => {
    if (!perplexityCategory || !perplexitySearchResults[perplexityCategory]) {
      return perplexitySearchResults['ai_adoption'] || [];
    }
    return perplexitySearchResults[perplexityCategory];
  };
  
  // Get the relevant infographic for current category
  const getInfographic = () => {
    if (!infographicsCategory || !infographicsData[infographicsCategory]) {
      return infographicsData['ai_adoption'];
    }
    return infographicsData[infographicsCategory];
  };
  
  // Get the relevant research summary
  const getResearchSummary = () => {
    if (!researchCategory || !researchSummaries[researchCategory]) {
      return researchSummaries['enterprise_ai_adoption'];
    }
    return researchSummaries[researchCategory];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Visualization Agent</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSavedVisualizations(!showSavedVisualizations)}
            className="text-sm text-gray-600 hover:text-black flex items-center"
          >
            {showSavedVisualizations ? 'Hide Saved' : 'Show Saved'}
          </button>
          
          <div 
            className="flex items-center cursor-pointer"
            onClick={toggleDemoMode}
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
        </div>
      </div>
      
      {showSavedVisualizations ? (
        <SavedVisualizationsList />
      ) : (
        <>
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Generate data-driven visualizations and insights to enhance your sales conversations. Simply provide some context about the company, industry, or technologies, and the AI will create a relevant "fun fact" visualization.
            </p>
          </div>
          
          {isDemoMode && showSuggestions && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Suggested Topics</h3>
                <button 
                  onClick={() => setShowSuggestions(false)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Hide
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {getSampleTopics().slice(0, 5).map(topic => (
                  <button
                    key={topic}
                    onClick={() => handleExampleClick('topic', topic)}
                    className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    {topic}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">Industries</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {getSampleIndustries().slice(0, 5).map(industry => (
                  <button
                    key={industry}
                    onClick={() => handleExampleClick('industry', industry)}
                    className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-100"
                  >
                    {industry}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-center mt-3">
                <button
                  onClick={handleRandomize}
                  className="flex items-center text-xs text-gray-600 hover:text-black bg-white px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-100"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Randomize & Generate
                </button>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g., Acme Corp"
                  value={formState.company}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  placeholder="e.g., Manufacturing, Healthcare"
                  value={formState.industry}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cloud Provider
              </label>
              <input
                type="text"
                name="cloudProvider"
                placeholder="e.g., AWS, Azure, GCP"
                value={formState.cloudProvider}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
            
            <div className="mb-4">
              <button 
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center text-sm text-gray-600 hover:text-black"
              >
                {showAdvanced ? (
                  <><ChevronUp className="h-4 w-4 mr-1" /> Hide Advanced Options</>
                ) : (
                  <><ChevronDown className="h-4 w-4 mr-1" /> Show Advanced Options</>
                )}
              </button>
            </div>
            
            {showAdvanced && (
              <div className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Technologies
                    </label>
                    <input
                      type="text"
                      name="technologies"
                      placeholder="e.g., Salesforce, React, Python (comma-separated)"
                      value={formState.technologies?.join(', ')}
                      onChange={(e) => handleTagInputChange(e, 'technologies')}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pain Points
                    </label>
                    <input
                      type="text"
                      name="painPoints"
                      placeholder="e.g., Security, Compliance (comma-separated)"
                      value={formState.painPoints?.join(', ')}
                      onChange={(e) => handleTagInputChange(e, 'painPoints')}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic Focus
                  </label>
                  <input
                    type="text"
                    name="topic"
                    placeholder="e.g., AI adoption, Security trends"
                    value={formState.topic}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-end">
              {isDemoMode && (
                <button
                  type="button"
                  onClick={handleRandomize}
                  className="flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors mr-3"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Randomize
                </button>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Generate Visualization
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {saveError && (
            <div className="mt-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {saveError}
            </div>
          )}
          
          {saveSuccess && (
            <div className="mt-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Visualization saved successfully!
            </div>
          )}
          
          {result && (
            <div className="mt-6 space-y-6">
              {/* Visualization Chart and Controls */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="pr-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{result.chartData.title || 'AI-Generated Insight'}</h3>
                      <p className="text-sm text-gray-700">{result.insight}</p>
                      
                      {formState.technologies?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {formState.technologies.map(tech => (
                            <span key={tech} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              <Tag className="h-3 w-3 mr-1" />
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={copyInsight}
                      className="flex items-center text-sm text-gray-600 hover:text-black"
                      title="Copy insight to clipboard"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="h-96 w-full">
                    <ChartRenderer chartData={result} />
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Chart Title (for saving)
                      </label>
                      <input
                        type="text"
                        value={chartTitle}
                        onChange={(e) => setChartTitle(e.target.value)}
                        placeholder={result.chartData.title || "Enter a title for saving"}
                        className="border border-gray-300 rounded-md p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all w-64"
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveVisualization}
                        disabled={isSaving}
                        className="flex items-center text-sm bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                        title="Save visualization"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={shareVisualization}
                        className="flex items-center text-sm bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                        title="Share visualization"
                      >
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </button>
                      
                      <div className="relative">
                        <button
                          onClick={downloadChart}
                          className="flex items-center text-sm bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                          title="Download chart"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </button>
                        
                        {showExportOptions && (
                          <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 w-32 z-10">
                            <ul className="py-1 text-sm text-gray-700">
                              <li>
                                <button 
                                  className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                                  onClick={() => handleExport('png')}
                                >
                                  PNG Image
                                </button>
                              </li>
                              <li>
                                <button 
                                  className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                                  onClick={() => handleExport('pdf')}
                                >
                                  PDF Document
                                </button>
                              </li>
                              <li>
                                <button 
                                  className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                                  onClick={() => handleExport('csv')}
                                >
                                  CSV Data
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    <h4 className="font-medium mb-2">How to use this in your sales conversation:</h4>
                    <p className="mb-2">
                      "I came across an interesting data point that might be relevant to your {formState.industry || 'industry'} - {result.insight} I thought this might provide some helpful context for our discussion about how our solution could help {formState.company || 'your organization'}."
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Perplexity Search Results - only show in demo mode */}
              {isDemoMode && showPerplexityData && perplexityCategory && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center text-sm text-gray-700">
                      <Database className="h-4 w-4 mr-1.5" />
                      <h3 className="font-medium">Research Data</h3>
                    </div>
                    <button 
                      onClick={() => setShowPerplexityData(!showPerplexityData)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      {showPerplexityData ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  
                  <PerplexityResults 
                    results={getPerplexityResults()} 
                    title={`Research Data: ${formState.industry || formState.topic || 'AI Industry Trends'}`}
                  />
                </div>
              )}
              
              {/* Infographics Panel - only show in demo mode */}
              {isDemoMode && showInfographics && infographicsCategory && (
                <div className="space-y-1 mt-2">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center text-sm text-gray-700">
                      <PieChart className="h-4 w-4 mr-1.5" />
                      <h3 className="font-medium">Data Infographic</h3>
                    </div>
                    <button 
                      onClick={() => setShowInfographics(!showInfographics)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      {showInfographics ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  
                  <Infographics {...getInfographic()} />
                </div>
              )}
              
              {/* Research Summary - only show in demo mode for certain categories */}
              {isDemoMode && showResearch && researchCategory && (
                <div className="space-y-1 mt-2">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center text-sm text-gray-700">
                      <BookOpen className="h-4 w-4 mr-1.5" />
                      <h3 className="font-medium">Research Brief</h3>
                    </div>
                    <button 
                      onClick={() => setShowResearch(!showResearch)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      {showResearch ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  
                  <ResearchSummary {...getResearchSummary()} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VisualizationPanel;