export function ScoreCard({ title, score }: { title: string; score: number }) {
  return (
    <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700">
      <h4 className="text-gray-300 text-sm mb-2">{title}</h4>
      <div className="flex items-center justify-between">
        <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden mr-3">
          <div
            className="bg-gradient-to-r from-teal-400 to-cyan-300 h-full rounded-full"
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <span className="text-white font-semibold">{score}%</span>
      </div>
    </div>
  )
}