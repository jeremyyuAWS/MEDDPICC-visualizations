import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, DownloadIcon, CheckCircle, Copy, Check, Info } from 'lucide-react';

interface InfographicsProps {
  title: string;
  subtitle: string;
  bulletPoints: string[];
  visualComponents?: string[];
  recommendations?: string[];
  sources: { name: string; url: string }[];
}

const Infographics: React.FC<InfographicsProps> = ({ 
  title, 
  subtitle, 
  bulletPoints, 
  visualComponents, 
  recommendations,
  sources 
}) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    const text = `${title}\n${subtitle}\n\nKey Points:\n` + 
      bulletPoints.map(point => `• ${point}`).join('\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 text-lg">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={handleCopy}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
              title="Copy content"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </button>
            
            <button 
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100 ml-1"
              title={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-medium text-sm mb-3 text-gray-700 flex items-center">
          <Info className="h-4 w-4 mr-1.5 text-blue-500" />
          Key Facts & Statistics
        </h4>
        
        <ul className="space-y-2 mb-4">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
        
        {expanded && visualComponents && visualComponents.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-sm mb-2 text-gray-700">Visual Components</h4>
            <div className="bg-gray-50 border border-gray-100 rounded-md p-3">
              <ul className="space-y-1.5">
                {visualComponents.map((component, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">{component}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {expanded && recommendations && recommendations.length > 0 && (
          <div className="mb-4">
            <h4 className="font-medium text-sm mb-2 text-gray-700">Recommendations</h4>
            <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
              <ul className="space-y-1.5">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-blue-500 mr-2">→</span>
                    <span className="text-blue-800">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {expanded && (
          <div>
            <h4 className="font-medium text-xs mb-1.5 text-gray-500">Sources</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {sources.map((source, index) => (
                <a 
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  {source.name}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Infographics;