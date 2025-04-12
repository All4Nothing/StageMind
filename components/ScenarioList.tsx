import { Briefcase, Users, PresentationChart, GraduationCap, HandshakeIcon, Coffee } from "./Icons"
import React from "react"

interface Scenario {
  title: string
  icon: React.ReactNode
  description: string
  participants: number
  duration: number
}

const scenarios: Scenario[] = [
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

export function ScenarioList({
  selectedScenario,
  setSelectedScenario,
}: {
  selectedScenario: Scenario | null
  setSelectedScenario: (scenario: Scenario) => void
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {scenarios.map((scenario, index) => (
        <button
          key={index}
          onClick={() => setSelectedScenario(scenario)}
          className={`bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 border ${
            selectedScenario?.title === scenario.title ? "border-teal-500" : "border-gray-700"
          } rounded-xl p-3 text-center transition-colors`}
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center mb-2 text-teal-400">
              {scenario.icon}
            </div>
            <span className="text-white text-sm font-medium">{scenario.title}</span>
          </div>
        </button>
      ))}
    </div>
  )
}