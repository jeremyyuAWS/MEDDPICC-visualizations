import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { MEDDPICCComponent } from '../../types';

interface MEDDPICCItemProps {
  component: MEDDPICCComponent;
}

const MEDDPICCItem: React.FC<MEDDPICCItemProps> = ({ component }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    switch (score) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getScoreGradient = (score: number) => {
    switch (score) {
      case 0: return 'from-red-500 to-red-400';
      case 1: return 'from-orange-500 to-orange-400';
      case 2: return 'from-yellow-500 to-yellow-400';
      case 3: return 'from-green-500 to-green-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  const getScoreBackground = (score: number) => {
    switch (score) {
      case 0: return 'bg-red-50';
      case 1: return 'bg-orange-50';
      case 2: return 'bg-yellow-50';
      case 3: return 'bg-green-50';
      default: return 'bg-gray-50';
    }
  };

  const getScoreIcon = (score: number) => {
    switch (score) {
      case 0: return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 1: return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 2: return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 3: return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getScoreLabel = (score: number) => {
    switch (score) {
      case 0: return 'Not Present';
      case 1: return 'Weak';
      case 2: return 'Adequate';
      case 3: return 'Strong';
      default: return 'Unknown';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.8) return 'text-green-700';
    if (confidence > 0.6) return 'text-yellow-700';
    return 'text-orange-700';
  };

  const getScorePercentage = (score: number) => {
    return (score / 3) * 100;
  };

  return (
    <div className={`border rounded-lg mb-4 overflow-hidden transition-all duration-200 ${getScoreBackground(component.score)} border-${getScoreColor(component.score).replace('bg-', '')}/30`}>
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer hover:bg-opacity-70 transition-colors`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3 flex-1">
          <div className="flex-shrink-0">
            {getScoreIcon(component.score)}
          </div>
          <div className="flex-1">
            <span className="font-medium">{component.name}</span>
            
            {/* Score Bar - Visual representation of score */}
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${getScoreGradient(component.score)}`} 
                style={{ width: `${getScorePercentage(component.score)}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 ml-4">
          <div className="text-right">
            <div className={`text-lg font-semibold ${getScoreColor(component.score).replace('bg-', 'text-')}`}>
              {component.score}/3
            </div>
            <span className="text-xs text-gray-600">{getScoreLabel(component.score)}</span>
          </div>
          
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-600" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 bg-white bg-opacity-80">
          <p className="text-sm text-gray-600 mb-3">
            {component.description}
          </p>
          
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700 mb-1">Extracted Information:</h4>
            <p className="text-sm bg-white p-3 rounded border border-gray-200">{component.text || 'No information extracted'}</p>
          </div>
          
          {component.citation && (
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-1">From Notes:</h4>
              <p className="text-sm italic bg-white p-3 rounded border border-gray-200">"{component.citation}"</p>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">AI Confidence:</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${component.confidence > 0.8 ? 'bg-green-500' : component.confidence > 0.6 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                  style={{ width: `${component.confidence * 100}%` }}
                ></div>
              </div>
              <span className={`text-xs font-medium ${getConfidenceColor(component.confidence)}`}>
                {Math.round(component.confidence * 100)}%
              </span>
            </div>
            
            <div className="text-xs text-gray-500">
              Score impact: {component.score === 3 ? 'High' : component.score === 2 ? 'Medium' : 'Low'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MEDDPICCItem;