import ParticipantCard from "./ParticipantCard";

export function ParticipantList({
    editableParticipants,
    handleParticipantChange,
  }: {
    editableParticipants: Array<{ name: string; role: string; description: string }>
    handleParticipantChange: (index: number, updated: { role: string; description: string }) => void
  }) {
    return (
      <>
        {editableParticipants.map((participant, index) => (
          <ParticipantCard
            key={index}
            name={participant.name}
            role={participant.role}
            description={participant.description}
            onChange={(updated) => handleParticipantChange(index, updated)}
          />
        ))}
      </>
    )
  }