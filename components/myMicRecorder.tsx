import { useEffect } from "react"

interface MyMicRecorderProps {
  onStreamReady?: (stream: MediaStream) => void
}

export default function MyMicRecorder({ onStreamReady }: MyMicRecorderProps) {
  useEffect(() => {
    let localStream: MediaStream

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      localStream = stream
      onStreamReady?.(stream)
    })

    return () => {
      localStream?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  return null
}
