import ParticipantCard from "@/components/ParticipantCard"
import Link from "next/link"

export function Overview({
  showOverview,
  isLoading,
  aiResponse,
  participants,
  duration,
}: {
  showOverview: boolean
  isLoading: boolean
  aiResponse: {
    scenario: string
    participants: Array<{
      name: string
      role: string
      description: string
    }>
  } | null
  participants: string
  duration: number
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Overview</h2>

      {showOverview ? (
        <>
          <div className="mb-6">
            <p className="text-gray-300">
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-teal-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Generating scenario...</span>
                </span>
              ) : aiResponse ? (
                aiResponse.scenario
              ) : (
                `This is a meeting simulation with ${participants} AI participants. The meeting will last approximately ${duration} minutes.`
              )}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {!isLoading &&
              aiResponse &&
              aiResponse.participants.map((participant, index) => (
                <ParticipantCard
                  key={index}
                  name={participant.name}
                  role={participant.role}
                  description={participant.description}
                />
              ))}

            {!isLoading && aiResponse && (
              <Link
                href={{
                  pathname: "/call",
                  query: {
                    scenario: encodeURIComponent(
                      JSON.stringify({
                        scenario: aiResponse.scenario,
                        participants: aiResponse.participants,
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
            )}
          </div>
        </>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500 italic">Generate a scenario to see the overview</p>
        </div>
      )}
    </div>
  )
}