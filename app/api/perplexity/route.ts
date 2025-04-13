import { NextResponse } from 'next/server';

type RequestBody = {
  scenarioText: string;
  participants: string;
  meetingLength: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody;
    console.log('Received request body:', body);
    
    // Get API key from environment variable
    const apiKey = process.env.PERPLEXITY_API_KEY;
    
    if (!apiKey) {
      console.error('API key not configured');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Extract fields from the simplified request body
    const { scenarioText, participants, meetingLength } = body;
    
    // Construct messages for Perplexity API
    const messages = [
      { role: "system", content: "Be precise and explain in detail." },
      { 
        role: "user", 
        content: `Based on the following meeting scenario: ${scenarioText}
Please perform these four tasks:
1. Write a short paragraph summarizing the scenario to display in the 'Overview' section.
2. Extract or create a clear, concise goal statement that represents what the user wants to achieve in this scenario. This should be from the user's perspective.
3. Generate detailed profiles for ${participants} participants who would be appropriate for this scenario, including their name, role, and a brief description.
4. Gather relevant knowledge about the topic of the scenario that would be helpful for the meeting (this won't be displayed directly but will be used in the background).

Format your response as a JSON object with these fields:
- scenario: A concise paragraph describing the meeting context
- goal: A clear statement of what the user wants to achieve in this scenario
- participants: An array of objects, each with name, role, and description fields
- knowledge: Comprehensive background information about the topic (not for display)` 
      }
    ];
    
    // Prepare request to Perplexity API following their example format
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "sonar",  // Using a valid model from Perplexity docs
        messages: messages,
        temperature: 0.2,
        top_p: 0.9,
        top_k: 0,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1,
        web_search_options: {
          search_context_size: "low"
        },
        response_format: {
          type: "json_schema",
          json_schema: {
            schema: { // Correctly defining the schema field
              type: "object",
              properties: {
                scenario: { type: "string" },
                goal: { type: "string" },
                participants: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      role: { type: "string" },
                      description: { type: "string" },
                    },
                    required: ["name", "role", "description"]
                  }
                },
                knowledge: { type: "string" }
              },
              required: ["scenario", "goal", "participants", "knowledge"]
            }
          }
        }
      }),
    };

    console.log('Sending request to Perplexity API...');
    // Make the API call with timeout
    try {
      // Using AbortController to implement a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        ...options,
        signal: controller.signal
      });
      
      // Clear the timeout if the request completes before the timeout
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Perplexity API error:', response.status, response.statusText, errorData);
        return NextResponse.json(
          { error: `Perplexity API error: ${response.status} ${response.statusText}`, details: errorData },
          { status: response.status }
        );
      }
      
      const data = await response.json();
      console.log('Perplexity API response:', data);

      // Return the response
      return NextResponse.json(data);
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Failed to connect to Perplexity API', details: fetchError instanceof Error ? fetchError.message : String(fetchError) },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    return NextResponse.json(
      { error: 'Failed to call Perplexity API', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
