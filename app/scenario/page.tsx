"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThemeProvider } from "@/components/theme-provider"
import ParticipantCard from "@/components/participant-card"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ScenarioPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [scenarioData, setScenarioData] = useState<{
    scenario: string;
    goal: string;
    participants: Array<{
      name: string;
      role: string;
      description: string;
    }>;
    knowledge: string;
  } | null>(null)

  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Get practice text from URL query parameters
    const practiceText = searchParams.get('practice')
    if (practiceText) {
      generateScenario(practiceText)
    }
  }, [searchParams])

  const generateScenario = async (practiceText: string) => {
    setIsLoading(true)
    console.log('Starting API call to Perplexity with practice text:', practiceText)
    try {
      // Prepare the request body with the practice text
      const requestBody = {
        scenarioText: practiceText,
        participants: "3", // Default to 3 participants
        meetingLength: 15  // Default to 15 minutes
      }

      console.log('Request body:', requestBody)

      // Call our API route
      const response = await fetch('/api/perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('API response data:', data)
      
      if (data.choices && data.choices.length > 0) {
        try {
          // Parse the JSON response
          const responseContent = data.choices[0].message.content
          console.log('Setting AI response:', responseContent)
          
          // If it's a string, try to parse it as JSON
          const parsedResponse = typeof responseContent === 'string' 
            ? JSON.parse(responseContent) 
            : responseContent
          
          // Use the response directly as our scenarioData structure
          // The API now returns scenario, goal, participants, and knowledge
          const scenarioData = {
            scenario: parsedResponse.scenario,
            goal: parsedResponse.goal,
            participants: parsedResponse.participants,
            knowledge: parsedResponse.knowledge
          }
          
          setScenarioData(scenarioData)
        } catch (parseError) {
          console.error('Error parsing AI response:', parseError)
          // Fall back to a default scenario if parsing fails
          setScenarioData({
            scenario: "Failed to generate a custom scenario. Please try again with more details.",
            goal: "Complete the interaction successfully.",
            participants: [
              {
                name: "AI Participant",
                role: "Conversation Partner",
                description: "Will engage in conversation based on your input."
              }
            ],
            knowledge: "Basic conversation skills and etiquette."
          })
        }
      } else {
        console.warn('No choices found in the API response or empty choices array')
        if (data.error) {
          console.error('API error:', data.error)
        }
        // Set a default scenario if the API call fails
        setScenarioData({
          scenario: "Failed to generate a custom scenario. Please try again with more details.",
          goal: "Complete the interaction successfully.",
          participants: [
            {
              name: "AI Participant",
              role: "Conversation Partner",
              description: "Will engage in conversation based on your input."
            }
          ],
          knowledge: "Basic conversation skills and etiquette."
        })
      }
    } catch (error) {
      console.error('Error generating scenario:', error)
      // Set a default scenario if the API call fails
      setScenarioData({
        scenario: "Failed to generate a custom scenario. Please try again with more details.",
        goal: "Complete the interaction successfully.",
        participants: [
          {
            name: "AI Participant",
            role: "Conversation Partner",
            description: "Will engage in conversation based on your input."
          }
        ],
        knowledge: "Basic conversation skills and etiquette."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vibe-theme">
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 p-4">
        {/* Header Section */}
        <div className="w-full max-w-6xl text-center py-12 mb-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
            StageMind
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Review and customize your scenario
          </p>
        </div>
          
          <div className="w-full max-w-6xl bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 mb-6">
            {isLoading ? (
              <div className="h-64 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-white">Generating scenario...</span>
                </div>
              </div>
            ) : scenarioData ? (
              <div className="flex flex-col">
                {/* Main scenario information with full width and larger height */}
                {/* Participants in a single row */}
                <div className="w-full mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-white">Participants</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {scenarioData.participants.map((participant, index) => (
                      <div key={index}>
                        <ParticipantCard
                          name={participant.name}
                          role={participant.role}
                          description={participant.description}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Scenario</h3>
                      <Textarea 
                        style={{height: '200px'}}
                        className="w-full bg-gray-900/70 border-gray-700 focus:border-teal-500/50 text-white rounded-xl"
                        value={scenarioData.scenario}
                        onChange={(e) => setScenarioData({...scenarioData, scenario: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Goal</h3>
                      <Textarea 
                        style={{height: '200px'}}
                        className="w-full bg-gray-900/70 border-gray-700 focus:border-teal-500/50 text-white rounded-xl"
                        value={scenarioData.goal}
                        onChange={(e) => setScenarioData({...scenarioData, goal: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500 italic">No scenario data available. Please go back and describe what you want to practice.</p>
              </div>
            )}
            
            <div className="flex justify-between mt-8">
              <Link href="/practice">
                <Button 
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-xl"
                >
                  ← back
                </Button>
              </Link>
              
              {scenarioData && (
                <Link href={`/conversation?scenario=${encodeURIComponent(JSON.stringify({
                  scenario: scenarioData.scenario,
                  goal: scenarioData.goal,
                  participants: scenarioData.participants,
                  knowledge: scenarioData.knowledge
                }))}`}>
                  <Button 
                    className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-xl"
                  >
                    start conversation →
                  </Button>
                </Link>
              )}
            </div>
          </div>
      </main>
    </ThemeProvider>
  )
}
