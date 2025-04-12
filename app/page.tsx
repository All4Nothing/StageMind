"use client"
import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ScenarioList } from "@/components/ScenarioList"
import { Header } from "@/components/Header"
import { ContextInput } from "@/components/ContextInput"
import { Overview } from "@/components/Overview"
import { Scenario } from "@/types/types"

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [scenarioDetails, setScenarioDetails] = useState({
    scenarioText: "",
    participants: "3",
    duration: 15,
  })
  const [showOverview, setShowOverview] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState<{
    scenario: string
    participants: Array<{
      name: string
      role: string
      description: string
    }>
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Log changes to aiResponse
  useEffect(() => {
    console.log("aiResponse state updated:", aiResponse)
  }, [aiResponse])

  // Function to handle scenario generation
  const handleGenerate = async () => {
    setIsLoading(true)
    setError(null)
    setShowOverview(true)
    try {
      const requestBody = {
        scenarioText: scenarioDetails.scenarioText,
        participants: scenarioDetails.participants,
        meetingLength: scenarioDetails.duration,
      }
      console.log("Request body:", requestBody)

      // Simulate API call
      const response = await fetch("/api/perplexity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()
      console.log("API response data:", data)

      if (data.choices && data.choices.length > 0) {
        const responseContent = data.choices[0].message.content
        const parsedResponse =
          typeof responseContent === "string" ? JSON.parse(responseContent) : responseContent
        setAiResponse(parsedResponse)
      } else {
        setAiResponse(null)
      }
    } catch (error) {
      console.error("Error generating content:", error)
      setError("Failed to generate scenario. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vibe-theme">
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 p-4">
        
        <Header />

        {/* Scenario List Section */}
        <div className="w-full max-w-6xl mb-6">
          <h2 className="text-xl font-semibold mb-3 text-white">Popular Scenarios</h2>
          <ScenarioList
            selectedScenario={selectedScenario}
            setSelectedScenario={(scenario) => {
              setScenarioDetails({
                scenarioText: scenario.description,
                participants: scenario.participants.toString(),
                duration: scenario.duration,
              })
              setSelectedScenario(scenario)
            }}
          />
        </div>

        {/* Input and Overview Section */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Context Input */}
          <ContextInput
            scenarioText={scenarioDetails.scenarioText}
            setScenarioText={(text) =>
              setScenarioDetails((prev) => ({ ...prev, scenarioText: text }))
            }
            participants={scenarioDetails.participants}
            setParticipants={(value) =>
              setScenarioDetails((prev) => ({ ...prev, participants: value }))
            }
            duration={scenarioDetails.duration}
            setDuration={(value) =>
              setScenarioDetails((prev) => ({ ...prev, duration: value }))
            }
            handleGenerate={handleGenerate}
          />

          {/* Overview */}
          <Overview
            showOverview={showOverview}
            isLoading={isLoading}
            aiResponse={aiResponse}
            participants={scenarioDetails.participants}
            duration={scenarioDetails.duration}
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </main>
    </ThemeProvider>
  )
}