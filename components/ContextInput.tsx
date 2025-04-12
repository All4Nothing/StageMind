import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"

export function ContextInput({
  scenarioText,
  setScenarioText,
  participants,
  setParticipants,
  duration,
  setDuration,
  handleGenerate,
}: {
  scenarioText: string
  setScenarioText: (text: string) => void
  participants: string
  setParticipants: (value: string) => void
  duration: number
  setDuration: (value: number) => void
  handleGenerate: () => void
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Context</h2>

      <Textarea
        className="w-full h-32 bg-gray-900/70 border-gray-700 text-white mb-6 rounded-xl resize-none"
        placeholder="Describe the meeting scenario you want to simulate..."
        value={scenarioText}
        onChange={(e) => setScenarioText(e.target.value)}
      />

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">AI Participants</label>
          <select
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="w-full bg-gray-900/70 border border-gray-700 text-white rounded-xl p-2"
          >
            <option value="1">1 participant</option>
            <option value="2">2 participants</option>
            <option value="3">3 participants</option>
            <option value="4">4 participants</option>
            <option value="5">5 participants</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">Length: {duration} minutes</label>
          <Slider
            value={[duration]}
            min={5}
            max={60}
            step={5}
            onValueChange={(value) => setDuration(value[0])}
            className="py-4"
          />
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl"
      >
        Generate
      </button>
    </div>
  )
}