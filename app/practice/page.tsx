"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import { Briefcase, Users, PresentationChart, HandshakeIcon, GraduationCap, Coffee } from "../../components/icons"
import { Header } from "@/components/header"

export default function PracticePage() {
  const [practiceText, setPracticeText] = useState("")

  // Template scenarios
  const scenarios = [
    {
      title: "Job Interview",
      icon: <Briefcase className="h-5 w-5" />,
      template: `Goal: Secure a software engineering position
Position: Senior Software Engineer
Job Description: Building scalable web applications
Salary Expectation: $120,000 - $150,000
Company: Tech Innovations Inc.
Interview Type: Technical and behavioral`
    },
    {
      title: "Team Meeting",
      icon: <Users className="h-5 w-5" />,
      template: `Goal: Discuss project progress and roadblocks
Project: Customer portal redesign
Team Members: Product manager, designers, developers
Key Issues: Timeline delays, resource allocation
Meeting Duration: 30 minutes`
    },
    {
      title: "Sales Pitch",
      icon: <PresentationChart className="h-5 w-5" />,
      template: `Goal: Convince potential client to purchase our SaaS solution
Product: Enterprise workflow management system
Client: Medium-sized manufacturing company
Client Pain Points: Inefficient processes, data silos
Budget: $50,000 - $75,000 annually
Decision Makers: CTO, Operations Director`
    },
    {
      title: "Negotiation",
      icon: <HandshakeIcon className="h-5 w-5" />,
      template: `Goal: Negotiate terms for a new contract
Context: Renewing service agreement with key vendor
Current Terms: $5,000/month, 12-month commitment
Desired Terms: $4,500/month, 24-month commitment with quarterly review
Leverage Points: Long-term customer, considering competitor offers`
    },
    {
      title: "Academic Discussion",
      icon: <GraduationCap className="h-5 w-5" />,
      template: `Goal: Present and defend research findings
Topic: Impact of AI on job markets
Audience: Academic committee and peers
Key Arguments: Automation trends, skill transformation, policy implications
Format: 15-minute presentation followed by Q&A`
    },
    {
      title: "Networking Event",
      icon: <Coffee className="h-5 w-5" />,
      template: `Goal: Make meaningful professional connections
Event: Industry conference mixer
Target Connections: Potential employers, collaborators, mentors
Industry: Technology and digital media
Personal Pitch: Experience in UX design and product development
Conversation Starters: Recent industry trends, shared challenges`
    }
  ]

  const selectTemplate = (template: string) => {
    setPracticeText(template)
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vibe-theme">
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 p-4">
        {/* Header Section */}
        <Header />
          
          <div className="w-full max-w-6xl mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Describe what you want to practice</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {scenarios.map((scenario, index) => (
                <button
                  key={index}
                  onClick={() => selectTemplate(scenario.template)}
                  className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 border border-gray-700 hover:border-teal-500/50 rounded-xl p-3 text-center transition-colors"
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
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 w-full">
              <Textarea
                placeholder="Describe the situation you want to practice. Be specific about the goals, context, and any specific aspects you want to focus on."
                className="w-full h-64 bg-gray-900/70 border-gray-700 text-white mb-6 rounded-xl resize-none focus:border-teal-500/50"
                value={practiceText}
                onChange={(e) => setPracticeText(e.target.value)}
              />
              
              <div className="flex w-full">
                <div className="ml-auto">
                  <Link href={`/scenario?practice=${encodeURIComponent(practiceText)}`}>
                    <Button 
                      className="bg-teal-500 hover:bg-teal-600 text-white py-4 px-8 rounded-xl"
                      disabled={!practiceText.trim()}
                    >
                      proceed →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </main>
    </ThemeProvider>
  )
}
