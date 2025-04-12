import { ScoreCard } from "./ScoreCard"

export function PerformanceScore() {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Performance Score</h3>
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 bg-gray-700 h-4 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-400 to-cyan-300 h-full rounded-full"
              style={{ width: "78%" }}
            ></div>
          </div>
          <span className="text-2xl font-bold text-white ml-4">78%</span>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <ScoreCard title="Communication" score={82} />
          <ScoreCard title="Technical Knowledge" score={75} />
          <ScoreCard title="Problem Solving" score={79} />
        </div>
      </div>
    )
  }