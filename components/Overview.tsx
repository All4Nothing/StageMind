import { useEffect, useState } from "react"
import { ScenarioDescription } from "./ScenarioDescription"
import { BeginButton } from "./BeginButton"
import { ParticipantList } from "./ParticipantList"

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
  const [editableParticipants, setEditableParticipants] = useState<
    Array<{ name: string; role: string; description: string }>
  >([])

  useEffect(() => {
    if (aiResponse) {
      setEditableParticipants(aiResponse.participants)
    }
  }, [aiResponse])

  const handleParticipantChange = (index: number, updated: { role: string; description: string }) => {
    setEditableParticipants((prev) => {
      const updatedList = [...prev]
      updatedList[index] = { ...updatedList[index], ...updated }
      return updatedList
    })
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white text-center">Overview</h2>

      {showOverview ? (
        <>
          <div className="mb-6 text-gray-300">
            <ScenarioDescription
              isLoading={isLoading}
              aiResponse={aiResponse}
              participants={participants}
              duration={duration}
            />
          </div>

          <div className="space-y-3 mb-8 max-h-96 overflow-y-auto pr-2">
            {!isLoading && (
              <ParticipantList
                editableParticipants={editableParticipants}
                handleParticipantChange={handleParticipantChange}
              />
            )}

            {!isLoading && (
              <BeginButton
                aiResponse={aiResponse}
                editableParticipants={editableParticipants}
                duration={duration}
              />
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