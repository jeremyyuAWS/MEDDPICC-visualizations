import React, { useState } from 'react';
import { ogiDemoScenarios, OGIDemoScenario } from '../../data/ogiDemoScenarios';
import { Brain } from 'lucide-react';
import { VisualizationPayload } from '../../types';

interface OGIDemoModalProps {
  onSelect: (payload: VisualizationPayload) => void;
  onReset: () => void;
  activeDemo: string | null;
}

const OGIDemoModal: React.FC<OGIDemoModalProps> = ({ onSelect, onReset, activeDemo }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 ${showModal ? '' : 'pointer-events-none'}`}
           style={{ transition: 'all 0.3s', opacity: showModal ? 1 : 0.5 }}>
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[260px] max-w-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">OGI Demo Scenarios</span>
            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 text-lg">×</button>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            {ogiDemoScenarios.map((scenario: OGIDemoScenario) => (
              <button
                key={scenario.label}
                onClick={() => onSelect(scenario.payload)}
                className={`flex flex-col items-start px-3 py-2 text-xs rounded-md border transition-colors text-left ${activeDemo === scenario.label ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'}`}
              >
                <span className="font-semibold">{scenario.label}</span>
                <span className="text-gray-500 text-xs mt-0.5">{scenario.description}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onReset}
              className="text-xs text-gray-500 hover:text-black border border-gray-200 rounded px-2 py-1"
              disabled={!activeDemo}
            >
              Reset Demo
            </button>
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-6 right-6 z-50 bg-black text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center hover:bg-gray-900 focus:outline-none"
        style={{ display: showModal ? 'none' : 'flex' }}
        onClick={() => setShowModal(true)}
        title="Show OGI Demo Scenarios"
      >
        <Brain className="h-6 w-6" />
      </button>
    </>
  );
};

export default OGIDemoModal; 