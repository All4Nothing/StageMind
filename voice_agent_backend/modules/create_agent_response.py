import os
from dotenv import load_dotenv
from faster_whisper import WhisperModel
from openai import OpenAI

# dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path="/Users/jason/StageMind/.env.local")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def chat_with_agent(agent, prompt, responses, log=None):
    print(f"\n--- {agent['name']} is responding ---")
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"Act as {agent['name']}({agent['role']}): {agent['description']}. {prompt}"},
                {"role": "user", "content": f"This is the conversation history so far: {log}." }
            ]
        )
        
        # print(f"response: {response}")
        reply = response.choices[0].message.content.strip()
        if log is not None:
            log.append({"speaker": agent['name'], "text": reply})
        # print(f"reply: {reply}")
    except Exception as e:
        print(f"❌ Error from {agent['name']}: {e}")
        reply = "Sorry, I couldn't generate a response."

    responses.append((agent["name"], reply, agent["voice"]))
    print(f"{agent['name']} says: {reply}")