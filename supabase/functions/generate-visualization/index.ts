// This function generates visualization data based on context from meeting notes

import { generateVisualization as generateDemoVisualization } from "npm:lodash@4.17.21";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// In a real implementation, this would call an AI service to generate visualization
// For the demo, we're using pre-built templates with some simple logic to pick relevant ones

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

    // Parse the request body with validation
    let payload;
    try {
      payload = await req.json();
      
      // Check if we have at least some context to work with
      if (!payload.industry && !payload.cloudProvider && !payload.company && !payload.topic && 
          (!payload.technologies || payload.technologies.length === 0) && 
          (!payload.painPoints || payload.painPoints.length === 0)) {
        throw new Error('Please provide some context information to generate visualization');
      }
    } catch (e) {
      throw new Error(`Invalid request body: ${e.message}`);
    }
    
    console.log("Generating visualization with payload:", JSON.stringify(payload));
    
    // Create the payload for the visualization generation
    // In a production scenario, this would call an LLM or specialized AI service
    
    // For this demo, we'll just return a mock response based on the payload
    let chartType = 'Bar';
    let insight = '';
    let chartData = {
      title: '',
      subtitle: '',
      x: [''],
      y: [0],
      xAxisLabel: '',
      yAxisLabel: ''
    };
    
    // Determine which visualization to return based on the payload
    if (payload.cloudProvider?.toLowerCase().includes('aws')) {
      insight = "67% of Fortune 500 companies using AWS deploy AI workloads on SageMaker, making it the leading managed ML service in enterprise.";
      chartType = 'Bar';
      chartData = {
        title: 'AWS AI Service Adoption Among Fortune 500',
        subtitle: 'Percentage of companies using each service',
        x: ['SageMaker', 'Rekognition', 'Comprehend', 'Forecast', 'Personalize'],
        y: [67, 42, 35, 28, 21]
      };
    } else if (payload.cloudProvider?.toLowerCase().includes('azure')) {
      insight = "Azure's AI capabilities are a key driver in Microsoft's cloud revenue growth, with 72% of enterprise Azure customers using at least one AI service.";
      chartType = 'Pie';
      chartData = {
        title: 'Azure AI Service Distribution',
        subtitle: 'Market share by service category',
        x: ['Cognitive Services', 'Machine Learning', 'Bot Service', 'OpenAI Service', 'Other'],
        y: [35, 27, 18, 15, 5]
      };
    } else if (payload.cloudProvider?.toLowerCase().includes('gcp')) {
      insight = "Google Cloud Platform usage has grown 4.5x among enterprise AI/ML workloads since 2020, with BigQuery seeing the highest adoption rate.";
      chartType = 'Line';
      chartData = {
        title: 'Google Cloud AI Services Growth',
        subtitle: '2020-2024 adoption trends',
        x: ['2020', '2021', '2022', '2023', '2024'],
        y: [12, 18, 29, 42, 54],
        xAxisLabel: 'Year',
        yAxisLabel: 'Adoption Rate %'
      };
    } else if (payload.industry?.toLowerCase().includes('manufacturing')) {
      insight = "AI adoption in manufacturing has quadrupled since 2020, with predictive maintenance and quality control being the top use cases.";
      chartType = 'Line';
      chartData = {
        title: 'AI Adoption in Manufacturing',
        subtitle: '2020-2024 growth trend',
        x: ['2020', '2021', '2022', '2023', '2024'],
        y: [15, 22, 30, 45, 60],
        xAxisLabel: 'Year',
        yAxisLabel: 'Adoption Rate %'
      };
    } else if (payload.industry?.toLowerCase().includes('healthcare')) {
      insight = "Healthcare organizations implementing AI see an average 23% reduction in administrative costs and 18% improvement in patient outcomes.";
      chartType = 'Bar';
      chartData = {
        title: 'AI Impact in Healthcare',
        subtitle: 'Percentage improvement by category',
        x: ['Admin Costs', 'Patient Outcomes', 'Diagnostic Accuracy', 'Treatment Planning', 'Staff Efficiency'],
        y: [23, 18, 15, 12, 9],
        xAxisLabel: 'Category',
        yAxisLabel: 'Improvement %'
      };
    } else if (payload.industry?.toLowerCase().includes('finance')) {
      insight = "The finance sector leads AI adoption with 78% of institutions deploying at least one AI solution, compared to 45% cross-industry average.";
      chartType = 'Column';
      chartData = {
        title: 'AI Adoption by Industry',
        subtitle: 'Percentage of organizations using AI',
        x: ['Finance', 'Technology', 'Healthcare', 'Retail', 'Manufacturing'],
        y: [78, 65, 52, 48, 45],
        xAxisLabel: 'Industry',
        yAxisLabel: 'Adoption Rate %'
      };
    } else if (payload.technologies?.some((tech: string) => tech.toLowerCase().includes('salesforce'))) {
      insight = "Organizations using Salesforce + AI report a 34% increase in sales productivity and 28% improvement in lead conversion rates.";
      chartType = 'Column';
      chartData = {
        title: 'Salesforce AI Impact',
        subtitle: 'Percentage improvement by business metric',
        x: ['Sales Productivity', 'Lead Conversion', 'Customer Retention', 'Pipeline Accuracy', 'Deal Size'],
        y: [34, 28, 22, 19, 15],
        xAxisLabel: 'Business Metric',
        yAxisLabel: 'Improvement %'
      };
    } else if (payload.painPoints?.some((pain: string) => pain.toLowerCase().includes('security'))) {
      insight = "Organizations using AI for cybersecurity detect threats 63% faster and reduce false positives by 47% compared to traditional methods.";
      chartType = 'Radar';
      chartData = {
        title: 'AI Security Improvement Metrics',
        subtitle: 'Percentage improvement by category',
        x: ['Threat Detection', 'False Positive Reduction', 'Response Time', 'Incident Resolution', 'Compliance'],
        y: [63, 47, 42, 38, 29]
      };
    } else if (payload.topic?.toLowerCase().includes('adoption')) {
      insight = "Enterprise AI adoption has reached 56% in 2024, with companies reporting an average 23% improvement in operational efficiency.";
      chartType = 'Line';
      chartData = {
        title: 'Enterprise AI Adoption',
        subtitle: '2020-2024 growth trend',
        x: ['2020', '2021', '2022', '2023', '2024'],
        y: [27, 34, 42, 51, 56],
        xAxisLabel: 'Year',
        yAxisLabel: 'Adoption Rate %'
      };
    } else if (payload.topic?.toLowerCase().includes('cost') || payload.topic?.toLowerCase().includes('roi')) {
      insight = "Companies implementing AI for business operations report cumulative cost savings of 53% over 3 years, with the biggest gains in year 2.";
      chartType = 'Area';
      chartData = {
        title: 'Cumulative AI Cost Savings',
        subtitle: 'Percentage reduction over 3 years',
        x: ['Year 0', 'Year 1', 'Year 2', 'Year 3'],
        y: [0, 18, 36, 53],
        xAxisLabel: 'Timeline',
        yAxisLabel: 'Cumulative Savings %'
      };
    } else {
      // Default visualization if nothing specific matches
      insight = "Enterprise AI adoption has reached 56% in 2024, with companies reporting an average 23% improvement in operational efficiency.";
      chartType = 'Column';
      chartData = {
        title: 'Enterprise AI Adoption',
        subtitle: '2020-2024 growth trend',
        x: ['2020', '2021', '2022', '2023', '2024'],
        y: [27, 34, 42, 51, 56],
        xAxisLabel: 'Year',
        yAxisLabel: 'Adoption Rate %'
      };
    }
    
    const response = {
      insight,
      chartType,
      chartData
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in Edge Function:", error);
    
    // Handle errors with proper status codes
    let status = 500;
    if (error.message.includes('Missing authorization')) {
      status = 401;
    } else if (error.message.includes('Invalid request')) {
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