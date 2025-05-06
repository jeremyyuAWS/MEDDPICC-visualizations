import React, { useState } from 'react';
import { FollowUpQuestion } from '../../types';
import { Copy, Mail, CheckCircle2, HelpCircle } from 'lucide-react';

interface FollowUpGeneratorProps {
  questions: FollowUpQuestion[];
  emailDraft: string;
}

const FollowUpGenerator: React.FC<FollowUpGeneratorProps> = ({ questions, emailDraft }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <HelpCircle className="h-5 w-5 text-gray-700 mr-2" />
        <h2 className="text-xl font-semibold">Follow-Up Generator</h2>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Recommended Follow-Up Questions</h3>
        <ul className="space-y-2">
          {questions.map((q) => (
            <li key={q.id} className="flex items-start">
              <div className="min-w-5 mt-0.5">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </div>
              <div className="ml-2">
                <p className="text-sm">{q.question}</p>
                <p className="text-xs text-gray-500 mt-0.5">Missing: {q.component}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">Follow-Up Email Draft</h3>
          <button 
            onClick={handleCopyEmail}
            className="flex items-center text-xs text-gray-600 hover:text-black transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy to clipboard
              </>
            )}
          </button>
        </div>
        
        <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
          <div className="whitespace-pre-line text-sm">{emailDraft}</div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="flex items-center bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
            <Mail className="h-4 w-4 mr-2" />
            Send via HubSpot
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowUpGenerator;