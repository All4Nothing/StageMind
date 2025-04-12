interface ParticipantCardProps {
  name: string
  role: string
  description: string
}

export default function ParticipantCard({ name, role, description }: ParticipantCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl flex items-center gap-3">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
          {name.charAt(0)}
        </div>
      </div>
      <div className="flex-grow">
        <h4 className="text-white font-medium text-sm">{name}</h4>
        <p className="text-gray-400 text-xs">{role}</p>
      </div>
      <div className="flex-grow text-right">
        <p className="text-gray-300 text-xs">{description}</p>
      </div>
    </div>
  )
}
