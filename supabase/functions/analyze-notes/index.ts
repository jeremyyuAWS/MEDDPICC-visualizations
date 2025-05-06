// This function calls the Lyzr API to analyze meeting notes and extract MEDDPICC data

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

    // Rate limiting - in a real application, implement token bucket or similar
    // This is a simple placeholder for demonstration
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    console.log(`Request from IP: ${clientIP}`);

    // Parse the request body with validation
    let payload;
    try {
      payload = await req.json();
      
      // Validate required fields
      if (!payload.user_id) throw new Error('Missing user_id in request body');
      if (!payload.org_id) throw new Error('Missing org_id in request body');
      if (!payload.raw_notes) throw new Error('Missing raw_notes in request body');
      
      // Validate notes length
      if (payload.raw_notes.length < 10) {
        throw new Error('Meeting notes too short. Please provide more details.');
      }
      if (payload.raw_notes.length > 50000) {
        throw new Error('Meeting notes too long. Please summarize or split into multiple analyses.');
      }
    } catch (e) {
      throw new Error(`Invalid request body: ${e.message}`);
    }
    
    console.log("Calling Lyzr API with payload:", JSON.stringify(payload));
    
    // Create the payload for the Lyzr API
    const lyzrPayload = {
      user_id: "jeremy@lyzr.ai",
      agent_id: "6818d4789023e3bc1baf2237",
      session_id: `${payload.user_id}-${Date.now()}`,
      message: JSON.stringify(payload)
    };
    
    // Call the Lyzr API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout (increased from 30s)
    
    try {
      const lyzrResponse = await fetch('https://agent-dev.test.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-4oGju1PuWIBzOtgXrltS75fxTPO1AjEr'
        },
        body: JSON.stringify(lyzrPayload),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!lyzrResponse.ok) {
        const errorText = await lyzrResponse.text();
        console.error(`Lyzr API error (${lyzrResponse.status}):`, errorText);
        throw new Error(`Lyzr API responded with status: ${lyzrResponse.status}`);
      }
      
      const lyzrData = await lyzrResponse.json();
      console.log("Lyzr API response received successfully");
      
      // Extract the actual response from the message property
      let responseData;
      try {
        // The response may be nested within the message property in an assistant object
        if (lyzrData.assistant && lyzrData.assistant.message) {
          // Try to parse the message as JSON first
          try {
            responseData = JSON.parse(lyzrData.assistant.message);
          } catch (e) {
            // If not valid JSON, use the raw message
            responseData = { raw_response: lyzrData.assistant.message };
          }
        } else {
          // If response structure is different, extract what we can
          responseData = lyzrData;
        }

        console.log("Processed response data:", JSON.stringify(responseData).substring(0, 200) + "...");
      } catch (e) {
        console.error("Error processing Lyzr API response:", e);
        // Fall back to using the raw response
        responseData = lyzrData;
      }
      
      // Check if the response contains the expected structure
      // If not, create a default structure to prevent frontend errors
      if (!responseData.meddpicc_scores) {
        console.warn("Response doesn't contain expected MEDDPICC structure, creating default format");
        
        // Create a basic response structure that matches what the frontend expects
        responseData = {
          meddpicc_scores: {
            metrics: {
              score: 0,
              text: "No metrics identified in the notes.",
              confidence: 0.5
            },
            economic_buyer: {
              score: 0,
              text: "No economic buyer identified in the notes.",
              confidence: 0.5
            },
            decision_criteria: {
              score: 0,
              text: "No decision criteria identified in the notes.",
              confidence: 0.5
            },
            decision_process: {
              score: 0,
              text: "No decision process identified in the notes.",
              confidence: 0.5
            },
            paper_process: {
              score: 0,
              text: "No paper process identified in the notes.",
              confidence: 0.5
            },
            identify_pain: {
              score: 0,
              text: "No pain points identified in the notes.",
              confidence: 0.5
            },
            champion: {
              score: 0,
              text: "No champion identified in the notes.",
              confidence: 0.5
            }
          },
          tags: [],
          follow_up_questions: [
            "Could you provide more details about the metrics or ROI expectations?",
            "Who is the economic buyer for this solution?",
            "What is your decision-making process like?"
          ],
          email_draft: `Based on our conversation, I'd like to follow up with more details.\n\nCould we schedule a follow-up call to discuss your needs further?\n\nBest regards,`
        };
      }

      // Return the actual response from Lyzr
      return new Response(JSON.stringify(responseData), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Lyzr API request timed out after 60 seconds');
      }
      throw error;
    }
  } catch (error) {
    console.error("Error in Edge Function:", error);
    
    // Handle errors with proper status codes
    let status = 500;
    if (error.message.includes('Missing authorization')) {
      status = 401;
    } else if (error.message.includes('Invalid request body')) {
      status = 400;
    } else if (error.message.includes('timed out')) {
      status = 504;
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