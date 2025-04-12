import { FeedbackCard } from "./FeedbackCard"

export function FeedbackList({ scenarioData }: { scenarioData: any }) {
    const avatarColors = [
      "from-teal-400 to-cyan-300",
      "from-purple-400 to-pink-300",
      "from-blue-400 to-indigo-300",
      "from-amber-400 to-orange-300",
    ]
    const imageSrcs = ["/interviewer.png", "/womaninterviewer.png", "/boss.png"]
  
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Participant Feedback</h3>
        <div className="space-y-4">
          {scenarioData && scenarioData.participants ? (
            scenarioData.participants.map((participant: any, index: number) => {
              const genericFeedback = `Your interaction with ${participant.name} as the ${participant.role} was good. ${participant.description} Consider preparing more specific examples related to this role for future simulations.`
  
              return (
                <FeedbackCard
                  key={index}
                  name={participant.name}
                  role={participant.role}
                  feedback={genericFeedback}
                  avatarColor={avatarColors[index % avatarColors.length]}
                  imageSrc={imageSrcs[index % imageSrcs.length]}
                />
              )
            })
          ) : (
            <>
              <FeedbackCard
                name="Alex Chen"
                role="Technical Interviewer"
                feedback="Good technical foundation, but could elaborate more on implementation details. Consider preparing more specific examples of your technical problem-solving process."
                avatarColor="from-teal-400 to-cyan-300"
                imageSrc="/interviewer.png"
              />
              <FeedbackCard
                name="Sarah Johnson"
                role="HR Manager"
                feedback="Excellent communication skills and professional demeanor. Your responses about teamwork were particularly strong. Consider preparing more examples of handling workplace challenges."
                avatarColor="from-purple-400 to-pink-300"
                imageSrc="/womaninterviewer.png"
              />
              <FeedbackCard
                name="Michael Rodriguez"
                role="Department Head"
                feedback="You demonstrated good cultural fit and understanding of the role. I'd recommend researching more about our company's recent projects to show deeper interest in our specific work."
                avatarColor="from-blue-400 to-indigo-300"
                imageSrc="/boss.png"
              />
            </>
          )}
        </div>
      </div>
    )
  }