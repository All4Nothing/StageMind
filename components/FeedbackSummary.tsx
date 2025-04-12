export function FeedbackSummary() {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Feedback Summary</h3>
        <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700 mb-4">
          <p className="text-gray-300 mb-2">
            <span className="font-semibold text-teal-400">Strengths:</span> You demonstrated strong
            communication skills and provided clear examples from your past experience. Your answers were
            well-structured and concise.
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-teal-400">Areas for improvement:</span> Consider providing more
            specific technical details when answering questions about your skills. Practice explaining complex
            concepts in simpler terms.
          </p>
        </div>
      </div>
    )
  }