import { PerformanceScore } from "@/components/PerformanceScore"
import { FeedbackSummary } from "@/components/FeedbackSummary"
import { FeedbackList } from "@/components/FeedbackList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeedbackSection({ scenarioData }: { scenarioData: any }) {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Simulation Feedback</h2>

        {/* Performance Score Section */}
        <PerformanceScore />

        {/* Feedback Summary Section */}
        <FeedbackSummary />

        {/* Participant Feedback Section */}
        <FeedbackList scenarioData={scenarioData} />

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2">New Simulation</Button>
          </Link>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2" onClick={() => window.print()}>
            Save Feedback
          </Button>
        </div>
      </div>
    </div>
  )
}