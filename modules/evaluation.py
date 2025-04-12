import requests

API_KEY = "Bearer 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"
API_URL = "https://api.perplexity.ai/chat/completions"

HEADERS = {
    "Authorization": API_KEY,
    "Content-Type": "application/json"
}

def send_to_perplexity(messages, max_tokens=1000):
    user_message = f"""
    You received background info about a user, AI experts, knowledge base, and the chat history between them.
    Through the conversation analyze and convert to percentage communication, technical knowledge, and problem solving skills only of the user .
    Output ONLY a JSON object containing the following fields:
    communication (only in percentage number), technical knowledge (only in percentage number), problem solving(only in percentage number), strengths, weaknesses,
    suggestion_expert_1, suggestion_expert_2, suggestion_expert_3
    {messages}
    """
  
    payload = {
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": "You are an communication teacher that analyzes only user communication. "},
            {"role": "user", "content": user_message}
        ],
        "max_tokens": max_tokens,
    }

    response = requests.post(API_URL, json=payload, headers=HEADERS)

    if response.status_code == 200:
        try:
            return response.json()
        except ValueError:
            return {"error": "Response is not valid JSON."}
    else:
        return {"error": f"{response.status_code} - {response.text}"}

full_text = f"""
User is a university student learning AI ethics. Their goal is to improve persuasive communication.

Experts:
- Expert 1: AI ethicist with a focus on fairness.
- Expert 2: ML researcher exploring bias in data.
- Expert 3: Tech policy analyst focused on regulation.

Knowledge Base:
The discussion centers around ethical AI, data bias, transparency, explainability, and responsible deployment of LLMs. The experts should use these topics as the basis for analysis.

Conversation:
User: I believe AI can be unbiased if we train it well.
Expert 1: That’s a good start, but fairness is also about how outcomes impact people differently.
User: Isn’t that mostly a problem with bad code?
Expert 2: It’s also about how the data is collected and who it represents.
User: Hmm… I hadn’t considered that.

"""

print("Sending all data to Perplexity...")
result = send_to_perplexity(full_text)

print("\nAnalysis Result:")
print(result)
