import { LoadingSpinner } from './LoadingSpinner'
export function ScenarioDescription({
    isLoading,
    aiResponse,
    participants,
    duration,
  }: {
    isLoading: boolean
    aiResponse: { scenario: string } | null
    participants: string
    duration: number
  }) {
    if (isLoading) {
      return <LoadingSpinner />
    }
  
    if (aiResponse) {
      return <p>{aiResponse.scenario}</p>
    }
  
    return (
      <p>
        This is a meeting simulation with {participants} AI participants. The meeting will last
        approximately {duration} minutes.
      </p>
    )
  }