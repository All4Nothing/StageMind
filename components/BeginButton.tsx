import Link from "next/link"

export function BeginButton({
    aiResponse,
    editableParticipants,
    duration,
  }: {
    aiResponse: { scenario: string } | null
    editableParticipants: Array<{ name: string; role: string; description: string }>
    duration: number
  }) {
    if (!aiResponse) return null
  
    return (
      <Link
        href={{
          pathname: "/call",
          query: {
            scenario: encodeURIComponent(
              JSON.stringify({
                scenario: aiResponse.scenario,
                participants: editableParticipants,
                meetingLength: duration,
              })
            ),
          },
        }}
      >
        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl mt-4">
          Begin
        </button>
      </Link>
    )
  }