import React, { useState } from 'react';
import { ExternalLink, ChevronRight, ChevronDown, Info, Check, Link, Shield, Settings } from 'lucide-react';

const HubSpotGuide: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <img src="/images/hubspotlogo2.webp" alt="HubSpot Logo" className="h-6 mr-2" />
        <h2 className="text-xl font-semibold">HubSpot Integration Guide</h2>
      </div>
      
      <div className="space-y-4">
        {/* Overview Section */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <button
            className={`w-full text-left p-4 flex items-center justify-between ${
              expandedSection === 'overview' ? 'bg-gray-50' : 'bg-white'
            }`}
            onClick={() => toggleSection('overview')}
          >
            <span className="font-medium">Overview</span>
            {expandedSection === 'overview' ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'overview' && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600 mb-3">
                The MEDDPICC Qualification Agent integrates with HubSpot to automatically sync qualification scores with your deals. This helps you track sales qualification progress directly in your CRM.
              </p>
              
              <div className="flex flex-col space-y-3 mt-4">
                <div className="flex items-start">
                  <div className="mt-0.5 bg-[#FF7A59] rounded-full p-1 text-white">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="text-sm text-gray-700 ml-2">
                    <strong>Automate Deal Updates:</strong> Automatically update HubSpot deal stages and properties based on MEDDPICC scores
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-0.5 bg-[#FF7A59] rounded-full p-1 text-white">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="text-sm text-gray-700 ml-2">
                    <strong>Track Qualification Progress:</strong> See how well each deal meets MEDDPICC qualification criteria
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-0.5 bg-[#FF7A59] rounded-full p-1 text-white">
                    <Check className="h-3 w-3" />
                  </div>
                  <p className="text-sm text-gray-700 ml-2">
                    <strong>Generate Follow-Ups:</strong> Create tasks, emails, and follow-up actions in HubSpot
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
                <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                <p className="text-sm text-blue-700">
                  You must have HubSpot admin privileges to configure custom properties needed for this integration.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Setup Steps Section */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <button
            className={`w-full text-left p-4 flex items-center justify-between ${
              expandedSection === 'setup' ? 'bg-gray-50' : 'bg-white'
            }`}
            onClick={() => toggleSection('setup')}
          >
            <span className="font-medium">Setup Steps</span>
            {expandedSection === 'setup' ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'setup' && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <ol className="list-decimal list-inside space-y-4 text-sm text-gray-700">
                <li>
                  <span className="font-medium">Create a HubSpot Developer Account</span>
                  <p className="ml-5 mt-1 text-gray-600">
                    If you don't already have one, create a free developer account at <a href="https://developers.hubspot.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">developers.hubspot.com</a>.
                  </p>
                </li>
                
                <li>
                  <span className="font-medium">Register a HubSpot App</span>
                  <div className="ml-5 mt-1 space-y-2">
                    <p className="text-gray-600">
                      Create a new app in the HubSpot developer portal and configure the OAuth settings with these scopes:
                    </p>
                    <div className="bg-gray-100 p-3 rounded-md border border-gray-200">
                      <p className="text-xs font-mono text-gray-700">
                        crm.objects.deals.read<br />
                        crm.objects.deals.write<br />
                        crm.schemas.deals.read<br />
                        crm.schemas.deals.write
                      </p>
                    </div>
                    <p className="text-gray-600">
                      Set your redirect URL to: <code className="bg-gray-100 px-2 py-0.5 rounded">{window.location.origin}/hubspot-callback</code>
                    </p>
                  </div>
                </li>
                
                <li>
                  <span className="font-medium">Create Custom Properties in HubSpot</span>
                  <div className="ml-5 mt-2 space-y-2">
                    <p className="text-gray-600">
                      In HubSpot, go to Settings → Properties → Deals and create the following custom properties:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Property Name</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Display Name</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Type</th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">meddpicc_score</td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">MEDDPICC Score</td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">Number</td>
                            <td className="px-3 py-2 text-xs text-gray-600">Overall MEDDPICC qualification score</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">meddpicc_metrics</td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">MEDDPICC: Metrics</td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">Number</td>
                            <td className="px-3 py-2 text-xs text-gray-600">Metrics component score (0-3)</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">meddpicc_economic_buyer</td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">MEDDPICC: Economic Buyer</td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">Number</td>
                            <td className="px-3 py-2 text-xs text-gray-600">Economic Buyer component score (0-3)</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">meddpicc_detected_technologies</td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">Detected Technologies</td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600">Text</td>
                            <td className="px-3 py-2 text-xs text-gray-600">Technologies detected in meeting notes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-gray-600">
                      Create similar properties for all MEDDPICC components (<code>meddpicc_decision_criteria</code>, <code>meddpicc_champion</code>, etc.)
                    </p>
                  </div>
                </li>
                
                <li>
                  <span className="font-medium">Connect Your Account</span>
                  <div className="ml-5 mt-2 space-y-2">
                    <p className="text-gray-600">
                      Click "Connect HubSpot" in the integration panel and authorize the application to access your HubSpot account.
                    </p>
                    <div className="bg-gray-100 p-3 rounded-md border border-gray-200 flex items-center space-x-3">
                      <Link className="h-4 w-4 text-[#FF7A59]" />
                      <a href="/hubspot-settings" className="text-sm text-[#FF7A59] hover:underline">View detailed connection instructions</a>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>
        
        {/* Advanced Settings */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <button
            className={`w-full text-left p-4 flex items-center justify-between ${
              expandedSection === 'advanced' ? 'bg-gray-50' : 'bg-white'
            }`}
            onClick={() => toggleSection('advanced')}
          >
            <span className="font-medium">Advanced Settings</span>
            {expandedSection === 'advanced' ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'advanced' && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Settings className="h-4 w-4 mr-1" />
                    Deal Stage Mapping
                  </h4>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                      You can configure automatic deal stage updates based on MEDDPICC scores:
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>0-30% MEDDPICC Score:</span>
                        <span className="text-red-600">Qualification</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>31-50% MEDDPICC Score:</span>
                        <span className="text-orange-600">Needs Analysis</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>51-75% MEDDPICC Score:</span>
                        <span className="text-yellow-600">Proposal</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>76-100% MEDDPICC Score:</span>
                        <span className="text-green-600">Decision</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Security & Permissions
                  </h4>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">
                      This integration requires these HubSpot permissions:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>Read and write access to CRM deals</li>
                      <li>Read and write access to deal properties</li>
                      <li>Access to deal pipelines and stages</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Your HubSpot credentials are securely stored and encrypted. We never store your API keys in plain text.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Developer Information */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <button
            className={`w-full text-left p-4 flex items-center justify-between ${
              expandedSection === 'developer' ? 'bg-gray-50' : 'bg-white'
            }`}
            onClick={() => toggleSection('developer')}
          >
            <span className="font-medium">Developer Information</span>
            {expandedSection === 'developer' ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSection === 'developer' && (
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600 mb-3">
                For developers implementing this integration, the following resources will be helpful:
              </p>
              
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://developers.hubspot.com/docs/api/overview" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    HubSpot API Documentation
                  </a>
                </li>
                <li>
                  <a 
                    href="https://developers.hubspot.com/docs/api/crm/properties" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    HubSpot Properties API
                  </a>
                </li>
                <li>
                  <a 
                    href="https://developers.hubspot.com/docs/api/crm/deals" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    HubSpot Deals API
                  </a>
                </li>
                <li>
                  <a 
                    href="https://developers.hubspot.com/docs/api/authentication-oauth" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    HubSpot OAuth Implementation
                  </a>
                </li>
              </ul>
              
              <div className="mt-4 p-3 bg-gray-100 rounded-md text-xs font-mono overflow-x-auto">
                <p className="text-gray-700 mb-1">// Example API call to update MEDDPICC properties on a deal</p>
                <pre className="text-gray-800">
{`fetch("https://api.hubapi.com/crm/v3/objects/deals/deal_id", {
  method: "PATCH",
  headers: {
    "Authorization": "Bearer " + accessToken,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    properties: {
      "meddpicc_score": 16,
      "meddpicc_metrics": 3,
      "meddpicc_economic_buyer": 2
      // Other properties...
    }
  })
})`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <a 
          href="https://developers.hubspot.com/docs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline flex items-center"
        >
          HubSpot Developer Documentation
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default HubSpotGuide;