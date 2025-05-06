import React from 'react';
import { PerplexitySearchResult } from '../../types';
import { ExternalLink, BookOpen, Calendar, Check, Link2 } from 'lucide-react';

interface PerplexityResultsProps {
  results: PerplexitySearchResult[];
  title?: string;
  showCopyButton?: boolean;
}

const PerplexityResults: React.FC<PerplexityResultsProps> = ({ 
  results, 
  title = "Research Data",
  showCopyButton = true
}) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);
  
  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  if (!results || results.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-medium text-gray-900">{title}</h3>
          </div>
          <div className="text-xs text-gray-500">
            {results.length} sources
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {results.map((result, index) => (
          <div key={index} className="p-4 hover:bg-gray-50">
            <p className="text-sm text-gray-800 mb-3">{result.snippet}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-blue-600 text-xs">
                  <Link2 className="h-3 w-3 mr-1" />
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {result.source}
                  </a>
                </div>
                
                <div className="flex items-center text-gray-500 text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {result.date}
                </div>
              </div>
              
              {showCopyButton && (
                <button
                  onClick={() => handleCopy(result.snippet, index)}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="h-3 w-3 mr-1 text-green-500" />
                      <span className="text-green-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerplexityResults;