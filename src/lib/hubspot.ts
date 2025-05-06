import { supabase } from './supabase';

// HubSpot API constants
const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3';
const HUBSPOT_CLIENT_ID = import.meta.env.VITE_HUBSPOT_CLIENT_ID || 'your-hubspot-client-id'; 
const HUBSPOT_CLIENT_SECRET = import.meta.env.VITE_HUBSPOT_CLIENT_SECRET || 'your-hubspot-client-secret';
const HUBSPOT_REDIRECT_URI = `${window.location.origin}/hubspot-callback`;

// Types
export interface HubSpotDeal {
  id: string;
  properties: {
    dealname: string;
    amount: string;
    dealstage: string;
    closedate: string;
    [key: string]: string;
  };
}

export interface HubSpotCredentials {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

/**
 * Initiates the HubSpot OAuth flow
 */
export const initiateHubSpotOAuth = () => {
  const scope = 'crm.objects.deals.read crm.objects.deals.write crm.schemas.deals.read crm.schemas.deals.write';
  const authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${HUBSPOT_CLIENT_ID}&redirect_uri=${encodeURIComponent(HUBSPOT_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
  
  // Open HubSpot OAuth page
  window.location.href = authUrl;
};

/**
 * Process the OAuth callback from HubSpot
 */
export const processHubSpotOAuthCallback = async (code: string): Promise<boolean> => {
  try {
    // In a real implementation, this would exchange the code for tokens through a server-side endpoint
    // We'd use a Supabase Edge Function to securely handle token exchange without exposing secrets
    
    // Example of how the actual implementation would look:
    // const tokenExchangeUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/hubspot-token-exchange`;
    // const response = await fetch(tokenExchangeUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    //   },
    //   body: JSON.stringify({ code })
    // });
    
    // if (!response.ok) {
    //   throw new Error(`HubSpot token exchange failed: ${response.status}`);
    // }
    
    // const data = await response.json();
    // const credentials: HubSpotCredentials = {
    //   accessToken: data.access_token,
    //   refreshToken: data.refresh_token,
    //   expiresAt: Date.now() + (data.expires_in * 1000)
    // };
    
    // Save credentials to Supabase
    // await saveHubSpotCredentials(credentials);
    
    // For the demo, just store a flag in localStorage
    localStorage.setItem('hubspot_connected', 'true');
    localStorage.setItem('hubspot_connection_time', Date.now().toString());
    
    return true;
  } catch (error) {
    console.error('Error processing HubSpot OAuth callback:', error);
    return false;
  }
};

/**
 * Save HubSpot credentials to Supabase
 */
export const saveHubSpotCredentials = async (credentials: HubSpotCredentials): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // In a real implementation, credentials would be saved to a secure table via a Supabase Edge Function
    // to avoid storing sensitive tokens in the client-side code
    
    // Example of how this would be implemented:
    // const saveCredentialsUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/save-hubspot-credentials`;
    // const response = await fetch(saveCredentialsUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    //   },
    //   body: JSON.stringify({
    //     accessToken: credentials.accessToken,
    //     refreshToken: credentials.refreshToken,
    //     expiresAt: credentials.expiresAt
    //   })
    // });
    
    // if (!response.ok) throw new Error(`Failed to save credentials: ${response.status}`);
    // const result = await response.json();
    // return result.success;
    
    return true;
  } catch (error) {
    console.error('Error saving HubSpot credentials:', error);
    return false;
  }
};

/**
 * Get HubSpot API credentials from Supabase
 */
export const getHubSpotCredentials = async (): Promise<HubSpotCredentials | null> => {
  try {
    // In a real implementation, this would retrieve HubSpot tokens from a secure storage via Edge Function
    // For this demo, we'll simulate having valid credentials
    
    // Example of a real implementation:
    // const getCredentialsUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-hubspot-credentials`;
    // const response = await fetch(getCredentialsUrl, {
    //   headers: {
    //     'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    //   }
    // });
    
    // if (!response.ok) throw new Error(`Failed to retrieve credentials: ${response.status}`);
    // const data = await response.json();
    
    // return {
    //   accessToken: data.access_token,
    //   refreshToken: data.refresh_token,
    //   expiresAt: data.expires_at
    // };
    
    // In this demo, just return mock credentials
    return {
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token',
      expiresAt: Date.now() + 3600000 // expires in 1 hour
    };
  } catch (error) {
    console.error('Error getting HubSpot credentials:', error);
    return null;
  }
};

/**
 * Refresh HubSpot access token if expired
 */
export const refreshHubSpotToken = async (): Promise<HubSpotCredentials | null> => {
  try {
    const credentials = await getHubSpotCredentials();
    
    if (!credentials) {
      throw new Error('No HubSpot credentials available');
    }
    
    // Check if token is expired
    if (credentials.expiresAt > Date.now()) {
      return credentials; // Token is still valid
    }
    
    // In a real implementation, we would call an Edge Function to securely refresh the token
    
    // Example of a real implementation:
    // const refreshTokenUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/refresh-hubspot-token`;
    // const response = await fetch(refreshTokenUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    //   },
    //   body: JSON.stringify({
    //     refreshToken: credentials.refreshToken
    //   })
    // });
    
    // if (!response.ok) throw new Error(`Token refresh failed: ${response.status}`);
    // const data = await response.json();
    
    // const newCredentials: HubSpotCredentials = {
    //   accessToken: data.access_token,
    //   refreshToken: data.refresh_token || credentials.refreshToken,
    //   expiresAt: Date.now() + (data.expires_in * 1000)
    // };
    
    // await saveHubSpotCredentials(newCredentials);
    // return newCredentials;
    
    // For the demo, just return updated mock credentials
    const newCredentials: HubSpotCredentials = {
      accessToken: 'new-demo-access-token',
      refreshToken: credentials.refreshToken,
      expiresAt: Date.now() + 3600000 // expires in 1 hour
    };
    
    return newCredentials;
  } catch (error) {
    console.error('Error refreshing HubSpot token:', error);
    return null;
  }
};

/**
 * Get list of deals from HubSpot
 */
export const getHubSpotDeals = async (): Promise<HubSpotDeal[]> => {
  try {
    // Ensure token is valid
    const credentials = await refreshHubSpotToken();
    
    if (!credentials) {
      throw new Error('No HubSpot credentials available');
    }
    
    // In a real implementation, this would make an API call to HubSpot via an Edge Function
    // Example of what the Edge Function would do:
    // const response = await fetch(`${HUBSPOT_API_URL}/objects/deals?properties=dealname,amount,dealstage,closedate&limit=50`, {
    //   headers: {
    //     'Authorization': `Bearer ${credentials.accessToken}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    
    // if (!response.ok) throw new Error(`Failed to fetch deals: ${response.status}`);
    // const data = await response.json();
    // return data.results;
    
    // For the demo, return mock deals with more realistic data
    return [
      {
        id: 'deal1',
        properties: {
          dealname: 'Acme Corp - ERP Implementation',
          amount: '125000',
          dealstage: 'qualificationstage',
          closedate: '2025-12-31'
        }
      },
      {
        id: 'deal2',
        properties: {
          dealname: 'TechGlobal - Security Solution',
          amount: '84500',
          dealstage: 'presentationstage',
          closedate: '2025-11-15'
        }
      },
      {
        id: 'deal3',
        properties: {
          dealname: 'InnovateX - Data Integration',
          amount: '58750',
          dealstage: 'closedwon',
          closedate: '2025-10-01'
        }
      },
      {
        id: 'deal4',
        properties: {
          dealname: 'GlobalTech - Cloud Migration',
          amount: '215000',
          dealstage: 'decisionmakingstage',
          closedate: '2025-09-15'
        }
      },
      {
        id: 'deal5',
        properties: {
          dealname: 'NextWave Solutions - Annual Contract',
          amount: '149000',
          dealstage: 'proposalstage',
          closedate: '2025-08-30'
        }
      }
    ];
  } catch (error) {
    console.error('Error fetching HubSpot deals:', error);
    return [];
  }
};

/**
 * Create a new deal in HubSpot
 */
export const createHubSpotDeal = async (dealName: string, amount: number, closeDate: string): Promise<string | null> => {
  try {
    // Ensure token is valid
    const credentials = await refreshHubSpotToken();
    
    if (!credentials) {
      throw new Error('No HubSpot credentials available');
    }
    
    // In a real implementation, this would create a deal in HubSpot via an Edge Function
    // Example of what the Edge Function would do:
    // const response = await fetch(`${HUBSPOT_API_URL}/objects/deals`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${credentials.accessToken}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     properties: {
    //       dealname: dealName,
    //       amount: amount.toString(),
    //       closedate: closeDate,
    //       pipeline: 'default',
    //       dealstage: 'appointmentscheduled'
    //     }
    //   })
    // });
    
    // if (!response.ok) throw new Error(`Failed to create deal: ${response.status}`);
    // const data = await response.json();
    // return data.id;
    
    // For the demo, return a mock deal ID
    console.log(`Creating new deal: ${dealName} for $${amount} with close date ${closeDate}`);
    return 'new-deal-id-' + Date.now();
  } catch (error) {
    console.error('Error creating HubSpot deal:', error);
    return null;
  }
};

/**
 * Update MEDDPICC scores in HubSpot
 */
export const updateHubSpotMEDDPICC = async (dealId: string, meddpiccData: any, tags: any[]): Promise<boolean> => {
  try {
    // Ensure token is valid
    const credentials = await refreshHubSpotToken();
    
    if (!credentials) {
      throw new Error('No HubSpot credentials available');
    }
    
    // In a real implementation, this would update HubSpot deal properties via an Edge Function
    // for security and to keep API keys private
    
    // Map MEDDPICC scores to HubSpot properties
    const properties: Record<string, any> = {};
    
    // Add MEDDPICC component scores
    Object.entries(meddpiccData).forEach(([key, component]: [string, any]) => {
      // Convert camelCase to snake_case for property names
      const propertyKey = `meddpicc_${key.replace(/([A-Z])/g, '_$1').toLowerCase()}`;
      properties[propertyKey] = component.score;
      
      // Add notes in a separate property
      properties[`${propertyKey}_notes`] = component.text || '';
    });
    
    // Calculate and add overall score
    const components = Object.values(meddpiccData);
    const totalScore = components.reduce((sum: number, component: any) => sum + component.score, 0);
    const maxScore = components.length * 3;
    const scorePercentage = Math.round((totalScore / maxScore) * 100);
    
    properties.meddpicc_score = totalScore;
    properties.meddpicc_max_score = maxScore;
    properties.meddpicc_score_percentage = scorePercentage;
    
    // Add tags as a comma-separated list
    if (tags && tags.length > 0) {
      properties.meddpicc_detected_technologies = tags.map(tag => tag.value).join(', ');
    }
    
    // Determine deal stage based on MEDDPICC score (optional)
    // if (scorePercentage >= 75) {
    //   properties.dealstage = 'decisionmakingstage';
    // } else if (scorePercentage >= 50) {
    //   properties.dealstage = 'proposalstage';
    // } else if (scorePercentage >= 30) {
    //   properties.dealstage = 'presentationstage';
    // }
    
    // In a real implementation, the Edge Function would make this API call:
    // const response = await fetch(`${HUBSPOT_API_URL}/objects/deals/${dealId}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Authorization': `Bearer ${credentials.accessToken}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ properties })
    // });
    
    // if (!response.ok) throw new Error(`Failed to update deal: ${response.status}`);
    // return true;
    
    // For the demo, simulate successful update
    console.log('Updating HubSpot deal:', dealId);
    console.log('MEDDPICC properties:', properties);
    
    return true;
  } catch (error) {
    console.error('Error updating HubSpot MEDDPICC data:', error);
    return false;
  }
};

/**
 * Get HubSpot custom deal properties for MEDDPICC
 */
export const getHubSpotMEDDPICCProperties = async (): Promise<any[]> => {
  try {
    const credentials = await refreshHubSpotToken();
    
    if (!credentials) {
      throw new Error('No HubSpot credentials available');
    }
    
    // In a real implementation, this would fetch custom properties via an Edge Function
    // Example of what the Edge Function would do:
    // const response = await fetch(`${HUBSPOT_API_URL}/properties/v2/deals/properties`, {
    //   headers: {
    //     'Authorization': `Bearer ${credentials.accessToken}`
    //   }
    // });
    
    // if (!response.ok) throw new Error(`Failed to fetch properties: ${response.status}`);
    // const allProperties = await response.json();
    // return allProperties.filter((prop: any) => prop.name.startsWith('meddpicc_'));
    
    // For the demo, return mock MEDDPICC properties
    return [
      { name: 'meddpicc_score', label: 'MEDDPICC Score', type: 'number', createdAt: '2025-05-01T12:00:00Z' },
      { name: 'meddpicc_metrics', label: 'MEDDPICC: Metrics', type: 'number', createdAt: '2025-05-01T12:00:00Z' },
      { name: 'meddpicc_economic_buyer', label: 'MEDDPICC: Economic Buyer', type: 'number', createdAt: '2025-05-01T12:00:00Z' },
      { name: 'meddpicc_detected_technologies', label: 'Detected Technologies', type: 'string', createdAt: '2025-05-01T12:00:00Z' }
    ];
  } catch (error) {
    console.error('Error fetching HubSpot properties:', error);
    return [];
  }
};

/**
 * Check if HubSpot MEDDPICC properties are properly configured
 */
export const checkHubSpotMEDDPICCSetup = async (): Promise<{ isConfigured: boolean; missingProperties: string[] }> => {
  try {
    const properties = await getHubSpotMEDDPICCProperties();
    
    // Required property names
    const requiredProperties = [
      'meddpicc_score',
      'meddpicc_metrics', 
      'meddpicc_economic_buyer',
      'meddpicc_decision_criteria',
      'meddpicc_decision_process',
      'meddpicc_paper_process',
      'meddpicc_pain',
      'meddpicc_champion'
    ];
    
    // Check which required properties are missing
    const existingPropertyNames = properties.map(p => p.name);
    const missingProperties = requiredProperties.filter(name => !existingPropertyNames.includes(name));
    
    return {
      isConfigured: missingProperties.length === 0,
      missingProperties
    };
  } catch (error) {
    console.error('Error checking HubSpot setup:', error);
    return {
      isConfigured: false,
      missingProperties: []
    };
  }
};