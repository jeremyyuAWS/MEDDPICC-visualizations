import React, { useState, useEffect } from 'react';
import { X, BookOpen, CheckCircle, FileText, BarChart3, Send, ToggleRight, HelpCircle, Lightbulb } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to MEDDPICC Qualification Agent",
      icon: <BookOpen className="h-8 w-8 text-black mb-2" />,
      content: (
        <>
          <p className="mb-3">This AI-powered tool helps you qualify sales opportunities by analyzing meeting notes through the MEDDPICC framework.</p>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-sm">
            <div className="flex items-center mb-2">
              <Lightbulb className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
              <span className="font-medium">What is MEDDPICC?</span>
            </div>
            <p className="text-gray-600">MEDDPICC is a qualification framework that helps you assess deal quality by evaluating:</p>
            <ul className="list-disc list-inside text-gray-600 mt-1 space-y-1">
              <li><strong>M</strong>etrics - Quantifiable benefits and ROI</li>
              <li><strong>E</strong>conomic Buyer - Decision maker with financial authority</li>
              <li><strong>D</strong>ecision Criteria - Formal evaluation criteria</li>
              <li><strong>D</strong>ecision Process - Steps to make the purchase decision</li>
              <li><strong>P</strong>aper Process - Administrative steps to finalize the deal</li>
              <li><strong>I</strong>dentify Pain - Customer's business challenges</li>
              <li><strong>C</strong>hampion - Internal advocate for your solution</li>
              <li><strong>C</strong>ompetition - Understanding the alternatives</li>
            </ul>
          </div>
        </>
      )
    },
    {
      title: "How to Use the Application",
      icon: <HelpCircle className="h-8 w-8 text-black mb-2" />,
      content: (
        <>
          <p className="mb-3">Using the MEDDPICC Qualification Agent is simple:</p>
          <ol className="list-decimal list-inside space-y-3 mb-4">
            <li className="flex items-start">
              <span className="bg-black text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 mt-0.5 flex-shrink-0">1</span>
              <div>
                <span className="font-medium">Paste your meeting notes</span>
                <p className="text-gray-600 text-sm mt-1">Copy your sales call or meeting notes and paste them into the text area.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-black text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 mt-0.5 flex-shrink-0">2</span>
              <div>
                <span className="font-medium">Click "Analyze Notes"</span>
                <p className="text-gray-600 text-sm mt-1">The AI will process your notes and extract MEDDPICC qualification data.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-black text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 mt-0.5 flex-shrink-0">3</span>
              <div>
                <span className="font-medium">Review the MEDDPICC scorecard</span>
                <p className="text-gray-600 text-sm mt-1">See detailed scoring for each MEDDPICC component and overall qualification.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-black text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2 mt-0.5 flex-shrink-0">4</span>
              <div>
                <span className="font-medium">Use the follow-up recommendations</span>
                <p className="text-gray-600 text-sm mt-1">Get AI-generated follow-up questions and email drafts to improve deal qualification.</p>
              </div>
            </li>
          </ol>
          <div className="flex items-center bg-blue-50 p-3 rounded-md border border-blue-200 text-sm">
            <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
            <p className="text-blue-700">You can also try the demo mode to see how the application works with sample data.</p>
          </div>
        </>
      )
    },
    {
      title: "Key Features",
      icon: <CheckCircle className="h-8 w-8 text-black mb-2" />,
      content: (
        <>
          <p className="mb-3">The MEDDPICC Qualification Agent offers several powerful features:</p>
          <div className="space-y-3">
            <div className="flex items-start">
              <BarChart3 className="h-5 w-5 text-gray-700 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">MEDDPICC Scorecard</h4>
                <p className="text-sm text-gray-600">Get detailed scoring for each MEDDPICC component with confidence levels and extracted information.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-gray-700 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Data Enrichment</h4>
                <p className="text-sm text-gray-600">Automatically detect technologies, cloud providers, and compliance requirements mentioned in your notes.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Send className="h-5 w-5 text-gray-700 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Follow-Up Generator</h4>
                <p className="text-sm text-gray-600">Get AI-suggested follow-up questions and email drafts based on missing MEDDPICC information.</p>
              </div>
            </div>
            <div className="flex items-start">
              <ToggleRight className="h-5 w-5 text-gray-700 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Demo Mode</h4>
                <p className="text-sm text-gray-600">Try the application with simulated data to see how it works before using it with your own notes.</p>
              </div>
            </div>
          </div>
        </>
      )
    }
  ];

  // Reset to first step when modal is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            {steps[currentStep].icon}
            <h2 className="text-xl font-bold">{steps[currentStep].title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {steps[currentStep].content}
        </div>
        
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep ? 'bg-black' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          
          <div className="flex space-x-3">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-gray-700 hover:text-black"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Get Started'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;