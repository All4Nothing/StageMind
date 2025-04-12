import { Users, Clock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScenarioCardProps {
  title: string
  description: string
  participants: number
  duration: number
}

export default function ScenarioCard({ title, description, participants, duration }: ScenarioCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700 hover:border-teal-500/50 transition-colors">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-gray-400 text-sm">
          <Users className="h-4 w-4 mr-1" />
          <span>{participants} participants</span>
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration} min</span>
        </div>
      </div>

      <Button className="w-full bg-gray-700 hover:bg-teal-600 text-white">
        <Play className="mr-2 h-4 w-4" /> Start
      </Button>
    </div>
  )
}
