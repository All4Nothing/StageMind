"use client"
import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/ThemeProvider"
import CallHeader from "@/components/CallHeader"
import { useSearchParams } from "next/navigation"
import { CallGrid } from "@/components/CallGrid"
import CallControls from "@/components/CallControl"
import { FeedbackSection } from "@/components/FeedbackSection"

export default function CallPage() {
  const [callEnded, setCallEnded] = useState(false)
  const [micOn, setMicOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)
  const [scenarioData, setScenarioData] = useState<{
    scenario: string;
    participants: Array<{
      name: string;
      role: string;
      description: string;
    }>;
    meetingLength: number;
  } | null>(null)
  
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Get scenario data from URL query parameters
    const scenarioParam = searchParams.get('scenario')
    if (scenarioParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(scenarioParam))
        console.log('Received scenario data:', decodedData)
        setScenarioData(decodedData)
      } catch (error) {
        console.error('Error parsing scenario data:', error)
      }
    }
  }, [searchParams])

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
            <CallHeader scenarioData={scenarioData} />

            {/* Call Grid */}
            <CallGrid scenarioData={scenarioData} micOn={micOn} videoOn={videoOn} />
            
            {/* Call Controls */}
            <CallControls
              micOn={micOn}
              setMicOn={setMicOn}
              videoOn={videoOn}
              setVideoOn={setVideoOn}
              handleEndCall={handleEndCall}
            />
            
          </>
        ) : (
          <FeedbackSection scenarioData={scenarioData} />
        )}
      </main>
    </ThemeProvider>
  )
}
