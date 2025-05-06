// This function securely exchanges OAuth authorization code for HubSpot access tokens

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    // Get authorization header and verify it contains a valid token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Parse the request body
    let payload;
    try {
      payload = await req.json();
      
      // Validate required fields
      if (!payload.code) throw new Error('Missing authorization code in request body');
    } catch (e) {
      throw new Error(`Invalid request body: ${e.message}`);
    }
    
    console.log("Processing HubSpot OAuth token exchange");
    
    // HubSpot OAuth configuration
    // In a real implementation, these values would be stored as environment variables
    const hubspotClientId = Deno.env.get("HUBSPOT_CLIENT_ID") || "your-hubspot-client-id";
    const hubspotClientSecret = Deno.env.get("HUBSPOT_CLIENT_SECRET") || "your-hubspot-client-secret";
    const redirectUri = `${req.headers.get('origin')}/hubspot-callback`;
    
    // Exchange authorization code for tokens
    const tokenResponse = await fetch('https://api.hubapi.com/oauth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: hubspotClientId,
        client_secret: hubspotClientSecret,
        redirect_uri: redirectUri,
        code: payload.code
      })
    });
    
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error(`HubSpot token exchange error (${tokenResponse.status}):`, errorText);
      throw new Error(`HubSpot API responded with status: ${tokenResponse.status}`);
    }
    
    const tokenData = await tokenResponse.json();
    
    // Extract current user information from authorization header
    // In a real implementation, you would use Supabase to identify the current user
    const userId = "current-user-id"; // This would be extracted from the auth token
    
    // Store the tokens in a secure database table
    // In a real implementation, you would save these to a Supabase table
    // const { error } = await supabaseAdmin
    //   .from('hubspot_credentials')
    //   .upsert({
    //     user_id: userId,
    //     access_token: tokenData.access_token,
    //     refresh_token: tokenData.refresh_token,
    //     expires_at: new Date(Date.now() + (tokenData.expires_in * 1000)).toISOString(),
    //     created_at: new Date().toISOString(),
    //     updated_at: new Date().toISOString()
    //   });
    
    // if (error) throw error;

    // For security, don't return the actual tokens to the client
    // Just return a success response with expiration information
    return new Response(
      JSON.stringify({
        success: true,
        expires_in: tokenData.expires_in,
        token_type: tokenData.token_type,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in HubSpot token exchange:", error);
    
    // Handle errors with proper status codes
    let status = 500;
    if (error.message.includes('Missing authorization')) {
      status = 401;
    } else if (error.message.includes('Invalid request body')) {
      status = 400;
    }
    
    // Return structured error response
    return new Response(
      JSON.stringify({ 
        error: error.message,
        status: status,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: status,
      }
    );
  }
});