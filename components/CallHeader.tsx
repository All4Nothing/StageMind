export default function CallHeader({ scenarioData }: { scenarioData: any }) {
    return (
      <div className="w-full bg-gray-900/80 backdrop-blur-sm p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">SimuMeet</span>
          <span className="text-gray-400 text-sm">
            {scenarioData ? "Custom Scenario" : "Job Interview Simulation"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">
            Duration: {scenarioData ? `${scenarioData.meetingLength}:00` : "00:05:32"}
          </span>
        </div>
      </div>
    )
  }