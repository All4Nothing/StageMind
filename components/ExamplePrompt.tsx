import { ArrowRight } from "lucide-react"

interface ExamplePromptProps {
  text: string
}

export default function ExamplePrompt({ text }: ExamplePromptProps) {
  return (
    <button className="flex items-center justify-between bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 hover:text-white p-3 rounded-lg transition-colors text-sm">
      <span>{text}</span>
      <ArrowRight className="h-4 w-4 ml-2 text-emerald-400" />
    </button>
  )
}
