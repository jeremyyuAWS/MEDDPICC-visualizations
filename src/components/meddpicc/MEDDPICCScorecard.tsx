import React from 'react';
import { MEDDPICCAnalysis } from '../../types';
import MEDDPICCItem from './MEDDPICCItem';
import { BarChart3, Check, AlertTriangle, AlertCircle } from 'lucide-react';

interface MEDDPICCScorecardProps {
  analysis: MEDDPICCAnalysis;
}

const MEDDPICCScorecard: React.FC<MEDDPICCScorecardProps> = ({ analysis }) => {
  // Calculate the total score and max possible score
  const components = Object.values(analysis);
  const totalScore = components.reduce((sum, component) => sum + component.score, 0);
  const maxScore = components.length * 3;
  const scorePercentage = Math.round((totalScore / maxScore) * 100);
  
  const getOverallScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    if (percentage >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getOverallScoreGradient = (percentage: number) => {
    if (percentage >= 75) return 'from-green-500 to-green-300';
    if (percentage >= 50) return 'from-yellow-500 to-yellow-300';
    if (percentage >= 25) return 'from-orange-500 to-orange-300';
    return 'from-red-500 to-red-300';
  };

  const getOverallScoreIcon = (percentage: number) => {
    if (percentage >= 75) return <Check className="h-6 w-6 text-white" />;
    if (percentage >= 50) return <AlertTriangle className="h-6 w-6 text-white" />;
    if (percentage >= 25) return <AlertTriangle className="h-6 w-6 text-white" />;
    return <AlertCircle className="h-6 w-6 text-white" />;
  };

  const getOverallScoreBackground = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStrengthsAndWeaknesses = () => {
    const strengths = components.filter(component => component.score >= 2);
    const weaknesses = components.filter(component => component.score <= 1);

    return { strengths, weaknesses };
  };

  const { strengths, weaknesses } = getStrengthsAndWeaknesses();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <BarChart3 className="h-5 w-5 text-gray-700 mr-2" />
        <h2 className="text-xl font-semibold">MEDDPICC Scorecard</h2>
      </div>
      
      <div className="mb-8 rounded-lg overflow-hidden">
        <div className={`p-5 bg-gradient-to-r ${getOverallScoreGradient(scorePercentage)} text-white`}>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <h3 className="text-xl font-semibold mb-1">Overall Qualification</h3>
              <p className="text-white text-opacity-90">Based on MEDDPICC framework analysis</p>
            </div>
            
            <div className="flex items-center">
              <div className="mr-6 text-center">
                <div className="text-3xl font-bold mb-1">
                  <span className="text-white">
                    {totalScore}
                  </span>
                  <span className="text-white text-opacity-70">/{maxScore}</span>
                </div>
                <div className="text-sm text-white text-opacity-90">
                  Total Score
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                {/* Status icon positioned to the left of the ring */}
                <div className="flex items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${getOverallScoreBackground(scorePercentage)} mr-2`}>
                    {getOverallScoreIcon(scorePercentage)}
                  </div>
                  
                  {/* Circle progress */}
                  <div className="h-20 w-20 rounded-full flex items-center justify-center border-4 border-white shadow-lg relative">
                    <svg className="h-full w-full absolute" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeDasharray={`${scorePercentage}, 100`}
                      />
                    </svg>
                    {/* Fixed positioning for percentage text */}
                    <div className="relative z-10">
                      <span className="text-xl font-bold text-white">
                        {scorePercentage}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-white mt-2 font-medium">
                  {scorePercentage >= 75 ? 'Strong' : 
                   scorePercentage >= 50 ? 'Adequate' : 
                   scorePercentage >= 25 ? 'Weak' : 'Critical'}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-1" />
                Strengths ({strengths.length})
              </h4>
              {strengths.length > 0 ? (
                <ul className="space-y-1">
                  {strengths.map(strength => (
                    <li key={strength.id} className="text-sm flex items-center">
                      <div className={`w-2 h-2 rounded-full ${strength.score === 3 ? 'bg-green-500' : 'bg-yellow-500'} mr-2`}></div>
                      {strength.name} ({strength.score}/3)
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">No significant strengths identified</p>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />
                Areas for Improvement ({weaknesses.length})
              </h4>
              {weaknesses.length > 0 ? (
                <ul className="space-y-1">
                  {weaknesses.map(weakness => (
                    <li key={weakness.id} className="text-sm flex items-center">
                      <div className={`w-2 h-2 rounded-full ${weakness.score === 1 ? 'bg-orange-500' : 'bg-red-500'} mr-2`}></div>
                      {weakness.name} ({weakness.score}/3)
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">No significant weaknesses identified</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        {Object.values(analysis).map((component) => (
          <MEDDPICCItem key={component.id} component={component} />
        ))}
      </div>
    </div>
  );
};

export default MEDDPICCScorecard;