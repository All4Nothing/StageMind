"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function ReportPage() {
  const [reportData, setReportData] = useState<{
    conversationLog: Array<{speaker: string, text: string}>;
    scenarioData: {
      scenario: string;
      goal: string;
      participants: Array<{
        name: string;
        role: string;
        description: string;
      }>;
      knowledge?: string;
    };
    analysis?: {
      overallScore: number;
      clarity: number;
      relevance: number;
      engagement: number;
      feedback: Array<{
        name: string;
        role: string;
        feedback: string;
      }>;
    };
  } | null>(null)
  
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Get data from URL query parameters
    const dataParam = searchParams.get('data')
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam))
        console.log('Received report data:', decodedData)
        
        // If we already have analysis data, use it
        if (decodedData.analysis) {
          setReportData(decodedData)
        } else {
          // Otherwise set the conversation and scenario data
          setReportData(decodedData)
          // And generate the analysis
          generateAnalysis(decodedData)
        }
      } catch (error) {
        console.error('Error parsing report data:', error)
      }
    }
  }, [searchParams])
  
  const generateAnalysis = async (data: any) => {
    setIsAnalyzing(true)
    try {
      // This would normally call an API, but for now we'll create a mock response
      // In a real implementation, you would call your API endpoint
      // For example: const response = await fetch('/api/analyze', {...})
      
      // Mock response for demonstration
      setTimeout(() => {
        const mockAnalysis = {
          overallScore: 85,
          clarity: 82,
          relevance: 88,
          engagement: 85,
          feedback: data.scenarioData.participants.map((participant: any, index: number) => ({
            name: participant.name,
            role: participant.role,
            feedback: index === 0 
              ? "Good technical foundation, but could elaborate more on implementation details. Consider preparing more specific examples of your technical problem-solving process."
              : index === 1
              ? "Excellent communication skills and professional demeanor. Your responses about teamwork were particularly strong. Consider preparing more examples of handling workplace challenges."
              : "You demonstrated good cultural fit and understanding of the role. I'd recommend researching more about our company's recent projects to show deeper interest in our specific work."
          }))
        }
        
        setReportData(prev => prev ? {...prev, analysis: mockAnalysis} : null)
        setIsAnalyzing(false)
      }, 2000)
      
    } catch (error) {
      console.error('Error generating analysis:', error)
      setIsAnalyzing(false)
    }
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vibe-theme">
      <main className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900">
        {/* Header */}
        <div className="w-full bg-gray-900/80 backdrop-blur-sm p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">SimuMeet</span>
            <span className="text-gray-400 text-sm">Performance Report</span>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-3xl w-full text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Analyzing Your Conversation</h2>
              <div className="flex justify-center mb-6">
                <svg className="animate-spin h-12 w-12 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-gray-300">Please wait while we analyze your conversation and generate personalized feedback...</p>
            </div>
          </div>
        ) : reportData && reportData.analysis ? (
          <div className="flex-grow p-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-5xl mx-auto relative">
              {/* Background */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
                <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
                <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"></div>
              </div>
              <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6">Conversation Report</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Goal</h3>
                <p className="text-gray-300 bg-gray-900/70 p-4 rounded-lg border border-gray-700">
                  {reportData.scenarioData.goal}
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Performance</h3>
                <div className="flex items-center mb-6 bg-gray-900/70 p-4 rounded-lg border border-gray-700">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-2xl font-bold text-white">
                    {reportData.analysis.overallScore}%
                  </div>
                  <span className="text-2xl font-bold text-white ml-4">Overall Score</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ScoreCard title="Clarity" score={reportData.analysis.clarity} />
                  <ScoreCard title="Relevance" score={reportData.analysis.relevance} />
                  <ScoreCard title="Engagement" score={reportData.analysis.engagement} />
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Feedback Summary</h3>
                <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700 mb-4">
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-teal-400">Strengths:</span> You demonstrated strong communication skills and provided clear examples from your past experience. Your answers were well-structured and concise.
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold text-teal-400">Areas for improvement:</span> Consider providing more specific technical details when answering questions about your skills. Practice explaining complex concepts in simpler terms.
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Participant Feedback</h3>
                <div className="space-y-4">
                  {reportData.analysis.feedback.map((feedback, index) => {
                    // Assign different avatar colors and images based on index
                    const avatarColors = [
                      "from-teal-400 to-cyan-300", 
                      "from-purple-400 to-pink-300", 
                      "from-blue-400 to-indigo-300",
                      "from-amber-400 to-orange-300"
                    ];
                    const imageSrcs = ["/interviewer.png", "/womaninterviewer.png", "/boss.png"];
                    
                    return (
                      <FeedbackCard
                        key={index}
                        name={feedback.name}
                        role={feedback.role}
                        feedback={feedback.feedback}
                        avatarColor={avatarColors[index % avatarColors.length]}
                        imageSrc={imageSrcs[index % imageSrcs.length]}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Link href="/practice">
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-xl">New Practice</Button>
                </Link>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-4 rounded-xl"
                 onClick={() => window.print()}
                >
                  Save Feedback
                </Button>
              </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center p-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-3xl w-full text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Call Ended</h2>
              <p className="text-gray-300 mb-6">Your call has ended, but we couldn't generate a report.</p>
              <div className="flex justify-center gap-4">
                <Link href="/practice">
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2">Return Home</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </ThemeProvider>
  )
}

function ScoreCard({ title, score }: { title: string; score: number }) {
  return (
    <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700">
      <h4 className="text-gray-300 text-sm mb-2">{title}</h4>
      <div className="flex items-center justify-between">
        <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden mr-3">
          <div
            className="bg-gradient-to-r from-teal-400 to-cyan-300 h-full rounded-full"
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <span className="text-white font-semibold">{score}%</span>
      </div>
    </div>
  )
}

interface FeedbackCardProps {
  name: string;
  role: string;
  feedback: string;
  avatarColor: string;
  imageSrc?: string; 
}

function FeedbackCard({ name, role, feedback, avatarColor, imageSrc }: FeedbackCardProps) {
  return (
    <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700">
      <div className="flex items-center gap-3 mb-2">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${name}'s avatar`}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-semibold`}>
            {name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="text-white font-medium">{name}</h4>
          <p className="text-gray-400 text-xs">{role}</p>
        </div>
      </div>
      <p className="text-gray-300 text-sm">{feedback}</p>
    </div>
  )
}
