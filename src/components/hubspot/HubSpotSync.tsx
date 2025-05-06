import React, { useState, useEffect } from 'react';
import { Link, ArrowRight, Check, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getHubSpotDeals, updateHubSpotMEDDPICC } from '../../lib/hubspot';

interface HubSpotSyncProps {
  meddpiccData?: any;
  enrichmentTags?: any[];
}

const HubSpotSync: React.FC<HubSpotSyncProps> = ({ meddpiccData, enrichmentTags }) => {
  const { user } = useAuth();
  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  const [deals, setDeals] = useState<any[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loadingDeals, setLoadingDeals] = useState(false);

  // Check if HubSpot is already connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // In a real app, this would check localStorage or database for HubSpot tokens
        const hubspotConnected = localStorage.getItem('hubspot_connected');
        if (hubspotConnected === 'true') {
          setConnected(true);
          fetchDeals();
        }
      } catch (err) {
        console.error('Error checking HubSpot connection:', err);
      }
    };

    checkConnection();
  }, [user]);

  const fetchDeals = async () => {
    try {
      setLoadingDeals(true);
      setError(null);

      const dealsData = await getHubSpotDeals();
      setDeals(dealsData);
    } catch (err) {
      console.error('Error fetching HubSpot deals:', err);
      setError('Failed to fetch deals from HubSpot. Please reconnect.');
    } finally {
      setLoadingDeals(false);
    }
  };

  const handleConnect = async () => {
    try {
      setError(null);
      
      // In a real implementation, this would redirect to HubSpot OAuth
      // Using window.location.href = `https://app.hubspot.com/oauth/authorize?...`;
      
      // For demo, simulate OAuth success
      localStorage.setItem('hubspot_connected', 'true');
      setConnected(true);
      
      // Fetch deals
      await fetchDeals();
    } catch (err) {
      console.error('HubSpot connection error:', err);
      setError('Failed to connect to HubSpot. Please try again.');
    }
  };

  const handleSync = async () => {
    if (!meddpiccData || !selectedDeal) return;
    
    try {
      setSyncing(true);
      setError(null);
      
      // Sync MEDDPICC data with selected HubSpot deal
      const success = await updateHubSpotMEDDPICC(
        selectedDeal, 
        meddpiccData, 
        enrichmentTags || []
      );
      
      if (success) {
        setSynced(true);
        setTimeout(() => setSynced(false), 5000); // Reset after 5 seconds
      } else {
        throw new Error('Sync failed. Please try again.');
      }
    } catch (err) {
      console.error('HubSpot sync error:', err);
      setError('Failed to sync data to HubSpot. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('hubspot_connected');
    setConnected(false);
    setDeals([]);
    setSelectedDeal('');
    setSynced(false);
  };

  const createNewDeal = () => {
    // In a real implementation, this would open a modal to create a new deal
    // or redirect to HubSpot's new deal form
    window.open('https://app.hubspot.com/contacts/new-deal', '_blank');
  };

  const getSyncableData = () => {
    if (!meddpiccData) return [];
    
    return [
      { id: 'metrics', name: 'Metrics', available: !!meddpiccData.metrics },
      { id: 'economicBuyer', name: 'Economic Buyer', available: !!meddpiccData.economicBuyer },
      { id: 'decisionCriteria', name: 'Decision Criteria', available: !!meddpiccData.decisionCriteria },
      { id: 'decisionProcess', name: 'Decision Process', available: !!meddpiccData.decisionProcess },
      { id: 'paperProcess', name: 'Paper Process', available: !!meddpiccData.paperProcess },
      { id: 'identifyPain', name: 'Identify Pain', available: !!meddpiccData.identifyPain },
      { id: 'champion', name: 'Champion', available: !!meddpiccData.champion },
    ];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <img src="/images/hubspotlogo2.webp" alt="HubSpot Logo" className="h-6 mr-2" />
        <h2 className="text-xl font-semibold">HubSpot Integration</h2>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          <div className="flex">
            <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {!connected ? (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-4">
            Connect to HubSpot to automatically sync MEDDPICC scores and update deal records.
          </p>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">What you can do with HubSpot integration:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
              <li>Create custom MEDDPICC properties in your HubSpot deals</li>
              <li>Automatically sync qualification scores with existing deals</li>
              <li>Update deal stages based on qualification scores</li>
              <li>Track qualification progress over time</li>
            </ul>
          </div>
          
          <div className="text-center">
            <button 
              onClick={handleConnect}
              className="inline-flex items-center bg-[#FF7A59] text-white px-4 py-2 rounded-md text-sm hover:bg-[#F15C41] transition-colors"
            >
              <img src="/images/hubspotlogo2.webp" alt="HubSpot" className="h-4 w-4 mr-2" />
              Connect HubSpot
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-4 bg-green-50 rounded-lg p-3 border border-green-200">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm text-green-700">Connected to HubSpot</span>
            <button 
              onClick={handleDisconnect}
              className="text-xs text-gray-500 hover:text-gray-700 ml-auto"
            >
              Disconnect
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Data to Sync</h3>
            <div className="space-y-2">
              {getSyncableData().map(item => (
                <label key={item.id} className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" 
                    defaultChecked={item.available}
                    disabled={!item.available}
                  />
                  <span className={`text-sm ml-2 ${!item.available ? 'text-gray-400' : ''}`}>
                    {item.name}
                    {!item.available && " (unavailable)"}
                  </span>
                </label>
              ))}
              <label className="flex items-center">
                <input 
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" 
                  defaultChecked={!!(enrichmentTags && enrichmentTags.length > 0)}
                  disabled={!(enrichmentTags && enrichmentTags.length > 0)}
                />
                <span className={`text-sm ml-2 ${!(enrichmentTags && enrichmentTags.length > 0) ? 'text-gray-400' : ''}`}>
                  Detected Technologies
                  {!(enrichmentTags && enrichmentTags.length > 0) && " (unavailable)"}
                </span>
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Deal</label>
            {loadingDeals ? (
              <div className="flex items-center text-sm text-gray-500 py-2">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading deals...
              </div>
            ) : (
              <>
                <select 
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  value={selectedDeal}
                  onChange={(e) => setSelectedDeal(e.target.value)}
                  disabled={syncing}
                >
                  <option value="">-- Select a deal --</option>
                  {deals.map(deal => (
                    <option key={deal.id} value={deal.id}>
                      {deal.properties.dealname} (${parseInt(deal.properties.amount || '0').toLocaleString()})
                    </option>
                  ))}
                  <option value="new_deal">+ Create New Deal</option>
                </select>
                
                {selectedDeal === 'new_deal' && (
                  <div className="mt-2">
                    <button 
                      onClick={createNewDeal}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open New Deal Form in HubSpot
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <a 
              href="https://app.hubspot.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-black flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Open HubSpot
            </a>
            
            <button
              onClick={handleSync}
              disabled={syncing || synced || !selectedDeal || selectedDeal === 'new_deal' || !meddpiccData}
              className={`flex items-center px-4 py-2 rounded-md text-sm transition-colors ${
                synced 
                  ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                  : !selectedDeal || selectedDeal === 'new_deal' || !meddpiccData
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {syncing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : synced ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Synced to HubSpot
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Sync to HubSpot
                </>
              )}
            </button>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-medium text-gray-600 mb-2">Setup Instructions</h4>
            <div className="space-y-2">
              <p className="text-xs text-gray-500">
                To use all MEDDPICC features, create these custom properties in HubSpot:
              </p>
              <ul className="list-disc list-inside text-xs text-gray-500 space-y-1 ml-2">
                <li>meddpicc_score (Number)</li>
                <li>meddpicc_metrics (Number)</li>
                <li>meddpicc_economic_buyer (Number)</li>
                <li>meddpicc_decision_criteria (Number)</li>
                <li>meddpicc_decision_process (Number)</li>
                <li>meddpicc_paper_process (Number)</li>
                <li>meddpicc_pain (Number)</li>
                <li>meddpicc_champion (Number)</li>
                <li>meddpicc_detected_technologies (Text)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HubSpotSync;