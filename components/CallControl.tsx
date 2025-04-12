import { Button } from "./ui/button"
import { Mic, MicOff, Video, VideoOff, Monitor, Smile, MessageSquare, Settings } from "lucide-react"

export default function CallControls({
  micOn,
  setMicOn,
  videoOn,
  setVideoOn,
  handleEndCall,
}: {
  micOn: boolean
  setMicOn: (value: boolean) => void
  videoOn: boolean
  setVideoOn: (value: boolean) => void
  handleEndCall: () => void
}) {
  // Helper functions for conditional classes
  const getButtonClass = (isActive: boolean) =>
    `rounded-full p-4 ${isActive ? "bg-gray-700 hover:bg-gray-600" : "bg-red-500/70 hover:bg-red-600/70"}`

  const controlButtons = [
    { icon: <Monitor className="h-6 w-6" />, onClick: () => {}, tooltip: "Screen Share" },
    { icon: <Smile className="h-6 w-6" />, onClick: () => {}, tooltip: "Reactions" },
    { icon: <MessageSquare className="h-6 w-6" />, onClick: () => {}, tooltip: "Chat" },
    { icon: <Settings className="h-6 w-6" />, onClick: () => {}, tooltip: "Settings" },
  ]

  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-sm p-4 flex justify-center items-center gap-4">
      
      {/* Microphone Button */}
      <Button className={getButtonClass(micOn)} onClick={() => setMicOn(!micOn)}>
        {micOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
      </Button>

      {/* Video Button */}
      <Button className={getButtonClass(videoOn)} onClick={() => setVideoOn(!videoOn)}>
        {videoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
      </Button>

      {/* Other Control Buttons */}
      {controlButtons.map((button, index) => (
        <Button key={index} className="rounded-full p-4 bg-gray-700 hover:bg-gray-600" onClick={button.onClick}>
          {button.icon}
        </Button>
      ))}

      {/* Leave Button */}
      <Button className="rounded-full px-6 py-4 bg-red-500 hover:bg-red-600 text-white" onClick={handleEndCall}>
        Leave
      </Button>
    </div>
  )
}