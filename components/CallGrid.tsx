import CallParticipant from "./CallParticipants"

export function CallGrid({
    scenarioData,
    micOn,
    videoOn,
  }: {
    scenarioData: any
    micOn: boolean
    videoOn: boolean
  }) {
    return (
      <div className="flex-grow p-4 relative">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl"></div>
          <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>
  
        <div className="grid grid-cols-2 gap-4 max-w-5xl mx-auto relative z-10">
          <CallParticipant name="You" isUser={true} bgColor="bg-gray-800" micOn={micOn} videoOn={videoOn} />
  
          {scenarioData && scenarioData.participants ? (
            scenarioData.participants.map((participant: any, index: number) => {
              const bgColors = ["bg-teal-900/40", "bg-purple-900/40", "bg-blue-900/40", "bg-amber-900/40"]
              const avatarColors = [
                "from-teal-400 to-cyan-300",
                "from-purple-400 to-pink-300",
                "from-blue-400 to-indigo-300",
                "from-amber-400 to-orange-300",
              ]
              const imageSrcs = ["/interviewer.png", "/womaninterviewer.png", "/boss.png"]
  
              return (
                <CallParticipant
                  key={index}
                  name={participant.name}
                  role={participant.role}
                  bgColor={bgColors[index % bgColors.length]}
                  avatarColor={avatarColors[index % avatarColors.length]}
                  imageSrc={imageSrcs[index % imageSrcs.length]}
                />
              )
            })
          ) : (
            <>
              <CallParticipant
                name="Alex Chen"
                role="Technical Interviewer"
                bgColor="bg-teal-900/40"
                avatarColor="from-teal-400 to-cyan-300"
                imageSrc="/interviewer.png"
              />
              <CallParticipant
                name="Sarah Johnson"
                role="HR Manager"
                bgColor="bg-purple-900/40"
                avatarColor="from-purple-400 to-pink-300"
                imageSrc="/womaninterviewer.png"
              />
              <CallParticipant
                name="Michael Rodriguez"
                role="Department Head"
                bgColor="bg-blue-900/40"
                avatarColor="from-blue-400 to-indigo-300"
                imageSrc="/boss.png"
              />
            </>
          )}
        </div>
      </div>
    )
  }