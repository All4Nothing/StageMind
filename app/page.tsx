"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThemeProvider } from "@/components/theme-provider"
import { Slider } from "@/components/ui/slider"
import ParticipantCard from "@/components/participant-card"
import Link from "next/link"

import { Briefcase, Users, PresentationChart, HandshakeIcon, GraduationCap, Coffee } from "../components/icons"

export default function Home() {
  const [showOverview, setShowOverview] = useState(false)
  const [participants, setParticipants] = useState("3")
  const [duration, setDuration] = useState(15)
  const [scenarioText, setScenarioText] = useState("")

  const handleGenerate = () => {
    setShowOverview(true)
  }

  interface Scenario {
    title: string;
    icon: React.ReactNode;
    description: string;
    participants: number;
    duration: number;
  }

  const selectScenario = (scenario: Scenario) => {
    setScenarioText(scenario.description)
    setParticipants(scenario.participants.toString())
    setDuration(scenario.duration)
  }

  const scenarios = [
    {
      title: "Job Interview",
      icon: <Briefcase className="h-5 w-5" />,
      description: "Practice answering common interview questions with AI interviewers of varying styles.",
      participants: 3,
      duration: 15,
    },
    {
      title: "Team Meeting",
      icon: <Users className="h-5 w-5" />,
      description: "Lead a team meeting to discuss project progress, challenges, and next steps.",
      participants: 4,
      duration: 20,
    },
    {
      title: "Sales Pitch",
      icon: <PresentationChart className="h-5 w-5" />,
      description: "Present your product to potential clients and handle objections and questions.",
      participants: 2,
      duration: 15,
    },
    {
      title: "Negotiation",
      icon: <HandshakeIcon className="h-5 w-5" />,
      description: "Practice negotiation tactics with AI counterparts who have different negotiation styles.",
      participants: 2,
      duration: 25,
    },
    {
      title: "Debate",
      icon: <GraduationCap className="h-5 w-5" />,
      description: "Experience a debate where one person is your teammate and other two are opponents",
      participants: 3,
      duration: 30,
    },
    {
      title: "Coffee Chat",
      icon: <Coffee className="h-5 w-5" />,
      description: "Practice networking and building rapport in an informal setting.",
      participants: 1,
      duration: 10,
    },
  ]

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vibe-theme">
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 p-4">
        {/* Header Section */}
        <div className="w-full max-w-6xl text-center py-12 mb-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
            AI Interaction Coach
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Practice your communication skills with AI-generated characters in realistic meeting scenarios.
          </p>
        </div>

        {/* Suggestions Section */}
        <div className="w-full max-w-6xl mb-6">
          <h2 className="text-xl font-semibold mb-3 text-white">Popular Scenarios</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {scenarios.map((scenario, index) => (
              <button
                key={index}
                onClick={() => selectScenario(scenario)}
                className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 border border-gray-700 hover:border-teal-500/50 rounded-xl p-3 text-center transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center mb-2 text-teal-400">
                    {scenario.icon}
                  </div>
                  <span className="text-white text-sm font-medium">{scenario.title}</span>
                  <div className="flex items-center justify-center gap-3 mt-1">
                    <span className="text-gray-400 text-xs flex items-center">
                      <Users className="h-3 w-3 mr-1" /> {scenario.participants}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center">{scenario.duration} min</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel - Context */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Context</h2>

            <Textarea
              className="w-full h-32 bg-gray-900/70 border-gray-700 text-white mb-6 rounded-xl resize-none"
              placeholder="Describe the meeting scenario you want to simulate..."
              value={scenarioText}
              onChange={(e) => setScenarioText(e.target.value)}
            />

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-300 mb-2 font-medium">AI Participants</label>
                <select
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  className="w-full bg-gray-900/70 border border-gray-700 text-white rounded-xl p-2"
                >
                  <option value="1">1 participant</option>
                  <option value="2">2 participants</option>
                  <option value="3">3 participants</option>
                  <option value="4">4 participants</option>
                  <option value="5">5 participants</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">Length: {duration} minutes</label>
                <Slider
                  value={[duration]}
                  min={5}
                  max={60}
                  step={5}
                  onValueChange={(value) => setDuration(value[0])}
                  className="py-4"
                />
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl"
            >
              Generate
            </Button>
          </div>

          {/* Right Panel - Overview */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Overview</h2>

            {showOverview ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-300">
                    {scenarioText ||
                      `This is a meeting simulation with ${participants} AI participants. The meeting will last approximately ${duration} minutes.`}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {Number.parseInt(participants) >= 1 && (
                    <ParticipantCard
                      name="Alex Chen"
                      role="Technical Interviewer"
                      description="Will ask technical questions."
                    />
                  )}
                  {Number.parseInt(participants) >= 2 && (
                    <ParticipantCard name="Sarah Johnson" role="HR Manager" description="Will ask about experience." />
                  )}
                  {Number.parseInt(participants) >= 3 && (
                    <ParticipantCard
                      name="Michael Rodriguez"
                      role="Department Head"
                      description="Will evaluate team fit."
                    />
                  )}

                  <Link href="/call">
                    <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl mt-4">
                      Begin
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500 italic">Generate a scenario to see the overview</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
