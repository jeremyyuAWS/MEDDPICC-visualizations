import React, { useState } from 'react';
import { BookOpen, Calendar, Users, FileText, ArrowRight, Lightbulb, ExternalLink, Copy, Check } from 'lucide-react';

interface ResearchSummaryProps {
  title: string;
  author: string;
  publication: string;
  date: string;
  summary: string;
  keyFindings: string[];
  methodology: string;
  limitations: string;
  sourceUrl: string;
}

const ResearchSummary: React.FC<ResearchSummaryProps> = ({
  title,
  author,
  publication,
  date,
  summary,
  keyFindings,
  methodology,
  limitations,
  sourceUrl
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    const text = `${title}\n${author}, ${publication}, ${date}\n\nSummary: ${summary}\n\nKey Findings:\n` + 
      keyFindings.map(finding => `- ${finding}`).join('\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900 line-clamp-2">{title}</h3>
        <div className="flex flex-wrap items-center mt-1.5 text-xs text-gray-500">
          <div className="flex items-center mr-3">
            <Users className="h-3 w-3 mr-1" />
            {author}
          </div>
          <div className="flex items-center mr-3">
            <FileText className="h-3 w-3 mr-1" />
            {publication}
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-700 mb-3">{summary}</p>
        
        <h4 className="font-medium text-sm mb-2 text-gray-800 flex items-center">
          <Lightbulb className="h-4 w-4 mr-1.5 text-amber-500" />
          Key Findings
        </h4>
        
        <ul className="space-y-1.5 mb-4">
          {keyFindings.map((finding, index) => (
            <li key={index} className="flex items-start text-sm">
              <ArrowRight className="h-3.5 w-3.5 text-blue-500 mr-1.5 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{finding}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showDetails ? 'Hide details' : 'Show details'}
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center text-xs text-gray-500 hover:text-gray-700"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </>
              )}
            </button>
            
            <a 
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs text-gray-500 hover:text-gray-700"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Source
            </a>
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="mb-3">
              <h5 className="text-xs font-medium text-gray-700 mb-1">Methodology</h5>
              <p className="text-xs text-gray-600">{methodology}</p>
            </div>
            
            <div>
              <h5 className="text-xs font-medium text-gray-700 mb-1">Limitations</h5>
              <p className="text-xs text-gray-600">{limitations}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchSummary;