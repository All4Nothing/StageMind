from fastapi import FastAPI
from fastapi.responses import JSONResponse
import requests
import json
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

API_KEY = "Bearer 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"
API_URL = "https://api.perplexity.ai/chat/completions"

HEADERS = {
    "Authorization": API_KEY,
    "Content-Type": "application/json"
}

def send_to_perplexity(messages, max_tokens=1000):
    user_message = f"""
    You received background info about a user, AI experts, knowledge base, and the chat history between them.
    Through the conversation analyze and convert to percentage communication, technical knowledge, and problem solving skills only of the user.
    Output ONLY a JSON object for an api response containing the following fields:
    communication (only in percentage number), technical knowledge (only in percentage number), problem solving(only in percentage number), strengths (give a few sentences), weaknesses(give a few sentences),
    suggestion_expert_1, suggestion_expert_2,...
    {messages}
    """

    payload = {
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": "You are an communication teacher that analyzes only user communication."},
            {"role": "user", "content": user_message}
        ],
        "max_tokens": max_tokens,
    }

    try:
        logger.info("Sending request to Perplexity API...")
        response = requests.post(API_URL, json=payload, headers=HEADERS)

        # Check for successful response
        if response.status_code == 200:
            result = response.json()
            content = result.get("choices", [{}])[0].get("message", {}).get("content", "")
            
            # Clean the response content
            cleaned_content = content.strip("`json\n").strip("`\n").strip()
            return json.loads(cleaned_content)
        else:
            logger.error(f"Failed API request: {response.status_code} - {response.text}")
            return {"error": f"API Error: {response.status_code} - {response.text}"}
    except Exception as e:
        logger.error(f"Exception during API call: {str(e)}")
        return {"error": f"Exception: {str(e)}"}

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI communication analysis API!"}

@app.get("/analyze")
def analyze():
    full_text = """
    User info:
    User is a university student learning AI ethics. Their goal is to improve persuasive communication.

    Experts:
    - Expert 1: AI ethicist with a focus on fairness.
    - Expert 2: ML researcher exploring bias in data.
    - Expert 3: Tech policy analyst focused on regulation.

    Knowledge Base:
    The discussion centers around ethical AI, data bias, transparency, explainability, and responsible deployment of LLMs.

    Conversation:
    User: I believe AI can be unbiased if we train it well.
    Expert 1: That’s a good start, but fairness is also about how outcomes impact people differently.
    User: Isn’t that mostly a problem with bad code?
    Expert 2: It’s also about how the data is collected and who it represents.
    User: Hmm… I hadn’t considered that.
    """

    result = send_to_perplexity(full_text)
    
    # Return result as JSON response
    if "error" in result:
        return JSONResponse(status_code=500, content=result)
    
    return JSONResponse(content=result)
