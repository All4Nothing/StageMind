import { useEffect, useRef } from "react"

export default function MyCamera({ onStreamReady }: { onStreamReady?: (stream: MediaStream) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let localStream: MediaStream

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        localStream = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        onStreamReady?.(stream)
      })

    return () => {
      localStream?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  return <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
}
