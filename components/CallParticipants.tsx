import { useState } from "react"
import { Mic, MicOff, VideoOff } from "lucide-react"
import MyCamera from "./MyCamera"
import MyMicRecorder from "./myMicRecorder"

interface CallParticipantProps {
  name: string
  role?: string
  isUser?: boolean
  bgColor: string
  avatarColor?: string
  micOn?: boolean
  videoOn?: boolean
  imageSrc?: string
}

export default function CallParticipant({
  name,
  role,
  isUser = false,
  bgColor,
  avatarColor = "from-gray-400 to-gray-300",
  micOn = true,
  videoOn = true,
  imageSrc = "foto/interviewer.png",
}: CallParticipantProps) {
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [micStream, setMicStream] = useState<MediaStream | null>(null)

  return (
    <div className={`${bgColor} rounded-xl overflow-hidden aspect-video relative`}>
      {videoOn ? (
        isUser ? (
          // Show only camera for the user
          <div className="absolute inset-0 flex items-center justify-center">
            <MyCamera onStreamReady={setCameraStream} />
          </div>
        ) : (
          // AI participant with bigger avatar
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-48 h-48 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center`}
            >
              <img
                src={imageSrc}
                alt={`${name}'s avatar`}
                className="w-44 h-44 rounded-full object-cover"
              />
            </div>
          </div>
        )
      ) : (
        // Video off: avatar + icon
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <img
            src={imageSrc}
            alt={`${name}'s avatar`}
            className="w-48 h-48 rounded-full object-cover"
          />
          <VideoOff className="h-10 w-10 text-gray-400" />
        </div>
      )}

      {/* Name & mic overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-3 flex justify-between items-center">
        <div>
          <p className="text-white font-medium">{name}</p>
          {role && <p className="text-gray-300 text-xs">{role}</p>}
        </div>
        <div className="flex items-center gap-2">
          {micOn ? (
            <Mic className="h-4 w-4 text-white" />
          ) : (
            <MicOff className="h-4 w-4 text-red-400" />
          )}
        </div>
      </div>

      {/* Mic recorder for the user */}
      {isUser && micOn && <MyMicRecorder onStreamReady={setMicStream} />}
    </div>
  )
}
