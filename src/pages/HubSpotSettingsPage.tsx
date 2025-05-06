import React, { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import HubSpotGuide from '../components/hubspot/HubSpotGuide';
import { Settings, Key, RefreshCw, Database, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { checkHubSpotMEDDPICCSetup, initiateHubSpotOAuth } from '../lib/hubspot';

const HubSpotSettingsPage: React.FC = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [connectionDate, setConnectionDate] = useState<string | null>(null);
  const [checkingSetup, setCheckingSetup] = useState<boolean>(false);
  const [setupStatus, setSetupStatus] = useState<{
    isConfigured: boolean;
    missingProperties: string[];
  } | null>(null);

  useEffect(() => {
    // Check if HubSpot is connected
    const hubspotConnected = localStorage.getItem('hubspot_connected');
    const connectionTime = localStorage.getItem('hubspot_connection_time');
    
    if (hubspotConnected === 'true') {
      setConnected(true);
      
      if (connectionTime) {
        const date = new Date(parseInt(connectionTime));
        setConnectionDate(date.toLocaleString());
      }
      
      // Check HubSpot MEDDPICC property setup
      checkSetup();
    }
  }, []);

  const checkSetup = async () => {
    setCheckingSetup(true);
    try {
      const status = await checkHubSpotMEDDPICCSetup();
      setSetupStatus(status);
    } catch (error) {
      console.error('Error checking HubSpot setup:', error);
    } finally {
      setCheckingSetup(false);
    }
  };

  const handleConnect = () => {
    initiateHubSpotOAuth();
  };

  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect from HubSpot?')) {
      localStorage.removeItem('hubspot_connected');
      localStorage.removeItem('hubspot_connection_time');
      setConnected(false);
      setConnectionDate(null);
      setSetupStatus(null);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">HubSpot Integration Settings</h1>
          <p className="text-gray-600">
            Configure the connection between MEDDPICC Qualification Agent and HubSpot
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <HubSpotGuide />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Key className="h-5 w-5 text-gray-700 mr-2" />
                <h2 className="text-xl font-semibold">Connection Status</h2>
              </div>
              
              {connected ? (
                <div>
                  <div className="flex items-center p-3 bg-green-50 rounded-md border border-green-200 mb-4">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-700">Connected to HubSpot</p>
                      {connectionDate && (
                        <p className="text-xs text-green-600">Connected since {connectionDate}</p>
                      )}
                    </div>
                  </div>
                  
                  {checkingSetup ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-5 w-5 text-gray-400 animate-spin mr-2" />
                      <span className="text-sm text-gray-600">Checking configuration...</span>
                    </div>
                  ) : setupStatus ? (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">MEDDPICC Property Setup</h3>
                      
                      {setupStatus.isConfigured ? (
                        <div className="flex items-start p-3 bg-green-50 rounded-md border border-green-200">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-green-700">All required properties are configured</p>
                            <p className="text-xs text-green-600 mt-1">Your HubSpot account is properly set up for MEDDPICC integration</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start p-3 bg-yellow-50 rounded-md border border-yellow-200">
                          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-700">Missing required properties</p>
                            <p className="text-xs text-yellow-600 mt-1">The following properties need to be created in HubSpot:</p>
                            <ul className="list-disc list-inside text-xs text-yellow-600 mt-1">
                              {setupStatus.missingProperties.map(prop => (
                                <li key={prop}>{prop}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                  
                  <div className="flex flex-col space-y-3 mt-4">
                    <button 
                      onClick={checkSetup}
                      className="flex items-center justify-center text-sm bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Connection Status
                    </button>
                    
                    <button 
                      onClick={handleDisconnect}
                      className="flex items-center justify-center text-sm bg-red-50 text-red-700 px-4 py-2 rounded-md hover:bg-red-100 transition-colors"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Disconnect HubSpot
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Connect your HubSpot account to sync MEDDPICC qualification data with your deals.
                  </p>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={handleConnect}
                      className="inline-flex items-center bg-[#FF7A59] text-white px-4 py-2 rounded-md text-sm hover:bg-[#F15C41] transition-colors"
                    >
                      <img src="/images/hubspotlogo2.webp" alt="HubSpot" className="h-4 w-4 mr-2" />
                      Connect HubSpot
                    </button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                    <div className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                      <p className="text-xs text-blue-700">
                        You'll need HubSpot admin privileges to create the required custom properties.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Settings className="h-5 w-5 text-gray-700 mr-2" />
                <h2 className="text-xl font-semibold">Sync Settings</h2>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" defaultChecked />
                  <span className="text-sm ml-2">Automatically sync after analysis</span>
                </label>
                
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" defaultChecked />
                  <span className="text-sm ml-2">Update deal stage based on score</span>
                </label>
                
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" defaultChecked />
                  <span className="text-sm ml-2">Create follow-up tasks in HubSpot</span>
                </label>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Database className="h-5 w-5 text-gray-700 mr-2" />
                <h2 className="text-lg font-semibold">Deal Properties</h2>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                Map MEDDPICC components to HubSpot properties
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">Overall Score</span>
                  <span className="text-gray-500">meddpicc_score</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">Metrics</span>
                  <span className="text-gray-500">meddpicc_metrics</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">Economic Buyer</span>
                  <span className="text-gray-500">meddpicc_economic_buyer</span>
                </div>
              </div>
              
              <button className="mt-4 text-sm text-blue-600 hover:underline">
                View all property mappings
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default HubSpotSettingsPage;