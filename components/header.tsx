import Link from "next/link"

export function Header() {
  return (
    <div className="w-full max-w-6xl text-center py-12 mb-4">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">
        StageMind
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Practice your communication skills with AI-generated characters in realistic meeting scenarios.
      </p>
    </div>
  )
}
