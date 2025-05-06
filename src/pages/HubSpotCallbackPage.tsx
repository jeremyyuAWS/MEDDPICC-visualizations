import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { processHubSpotOAuthCallback } from '../lib/hubspot';

const HubSpotCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState<string>('Processing HubSpot connection...');

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // Get the authorization code from the URL
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        
        if (!code) {
          setStatus('error');
          setMessage('No authorization code found in the callback URL.');
          return;
        }
        
        // Process the code to get access token
        const success = await processHubSpotOAuthCallback(code);
        
        if (success) {
          setStatus('success');
          setMessage('HubSpot connected successfully!');
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          setStatus('error');
          setMessage('Failed to connect to HubSpot. Please try again.');
        }
      } catch (error) {
        console.error('Error processing HubSpot callback:', error);
        setStatus('error');
        setMessage('An error occurred while connecting to HubSpot.');
      }
    };

    processOAuthCallback();
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        {status === 'processing' && (
          <>
            <Loader2 className="h-12 w-12 text-gray-400 animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-semibold mb-2">Connecting to HubSpot</h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-xl font-semibold mb-2">Connection Successful</h1>
            <p className="text-gray-600">{message}</p>
            <p className="text-gray-500 text-sm mt-4">Redirecting to dashboard...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-xl font-semibold mb-2">Connection Failed</h1>
            <p className="text-gray-600">{message}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Return to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HubSpotCallbackPage;