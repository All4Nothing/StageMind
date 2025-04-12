"use client"
import { useState } from "react"
import { Mic, MicOff, Video, VideoOff, Monitor, Smile, Settings, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"
import Image from "next/image"
import CallParticipant from "@/components/call-participant"

export default function CallPage() {
  const [callEnded, setCallEnded] = useState(false)
  const [micOn, setMicOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)

  const handleEndCall = () => {
    const mediaTracks = ['video', 'audio']
    mediaTracks.forEach(async (type) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ [type]: true })
        stream.getTracks().forEach((track) => track.stop())
      } catch (err) {
        console.warn(`Could not stop ${type} stream:`, err)
      }
    })
  
    setCallEnded(true)
  }
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vibe-theme">
      <main className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900">
        {!callEnded ? (
          <>
            {/* Call Header */}
            <div className="w-full bg-gray-900/80 backdrop-blur-sm p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">SimuMeet</span>
                <span className="text-gray-400 text-sm">Job Interview Simulation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Duration: 00:05:32</span>
              </div>
            </div>

            {/* Call Grid */}
            <div className="flex-grow p-4 relative">
              {/* Background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
                <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
                <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-5xl mx-auto relative z-10">
                <CallParticipant name="You" isUser={true} bgColor="bg-gray-800" micOn={micOn} videoOn={videoOn} />
                <CallParticipant
                  name="Alex Chen"
                  role="Technical Interviewer"
                  bgColor="bg-teal-900/40"
                  avatarColor="from-teal-400 to-cyan-300"
                  imageSrc="/interviewer.png"
                />
                <CallParticipant
                  name="Sarah Johnson"
                  role="HR Manager"
                  bgColor="bg-purple-900/40"
                  avatarColor="from-purple-400 to-pink-300"
                  imageSrc = "/womaninterviewer.png"
                />
                <CallParticipant
                  name="Michael Rodriguez"
                  role="Department Head"
                  bgColor="bg-blue-900/40"
                  avatarColor="from-blue-400 to-indigo-300"
                  imageSrc="/boss.png"
                />
              </div>
            </div>

            {/* Call Controls */}
            <div className="w-full bg-gray-900/80 backdrop-blur-sm p-4 flex justify-center items-center gap-4">
              <Button
                className={`rounded-full p-4 ${micOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-500/70 hover:bg-red-600/70"}`}
                onClick={() => setMicOn(!micOn)}
              >
                {micOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
              </Button>
              <Button
                className={`rounded-full p-4 ${videoOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-500/70 hover:bg-red-600/70"}`}
                onClick={() => setVideoOn(!videoOn)}
              >
                {videoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </Button>
              <Button className="rounded-full p-4 bg-gray-700 hover:bg-gray-600">
                <Monitor className="h-6 w-6" />
              </Button>
              <Button className="rounded-full p-4 bg-gray-700 hover:bg-gray-600">
                <Smile className="h-6 w-6" />
              </Button>
              <Button className="rounded-full p-4 bg-gray-700 hover:bg-gray-600">
                <MessageSquare className="h-6 w-6" />
              </Button>
              <Button className="rounded-full p-4 bg-gray-700 hover:bg-gray-600">
                <Settings className="h-6 w-6" />
              </Button>
              <Button className="rounded-full px-6 py-4 bg-red-500 hover:bg-red-600 text-white" onClick={handleEndCall}>
                Leave
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center p-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-3xl w-full">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Simulation Feedback</h2>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Performance Score</h3>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex-1 bg-gray-700 h-4 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-teal-400 to-cyan-300 h-full rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                  <span className="text-2xl font-bold text-white ml-4">78%</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <ScoreCard title="Communication" score={82} />
                  <ScoreCard title="Technical Knowledge" score={75} />
                  <ScoreCard title="Problem Solving" score={79} />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Feedback Summary</h3>
                <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700 mb-4">
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-teal-400">Strengths:</span> You demonstrated strong
                    communication skills and provided clear examples from your past experience. Your answers were
                    well-structured and concise.
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold text-teal-400">Areas for improvement:</span> Consider providing more
                    specific technical details when answering questions about your skills. Practice explaining complex
                    concepts in simpler terms.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Participant Feedback</h3>
                <div className="space-y-4">
                  <FeedbackCard
                    name="Alex Chen"
                    role="Technical Interviewer"
                    feedback="Good technical foundation, but could elaborate more on implementation details. Consider preparing more specific examples of your technical problem-solving process."
                    avatarColor="from-teal-400 to-cyan-300"
                    imageSrc="/interviewer.png"
                  />
                  <FeedbackCard
                    name="Sarah Johnson"
                    role="HR Manager"
                    feedback="Excellent communication skills and professional demeanor. Your responses about teamwork were particularly strong. Consider preparing more examples of handling workplace challenges."
                    avatarColor="from-purple-400 to-pink-300"
                    imageSrc = "/womaninterviewer.png"
                  />
                  <FeedbackCard
                    name="Michael Rodriguez"
                    role="Department Head"
                    feedback="You demonstrated good cultural fit and understanding of the role. I'd recommend researching more about our company's recent projects to show deeper interest in our specific work."
                    avatarColor="from-blue-400 to-indigo-300"
                    imageSrc="/boss.png"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Link href="/">
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2">New Simulation</Button>
                </Link>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2"
                 onClick={() => window.print()}
                >
                  Save Feedback
                </Button>
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
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={`${name}'s avatar`}
            width={32}
            height={32}
            className="rounded-full"
          />
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
