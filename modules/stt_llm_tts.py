import os
import asyncio
import wave
import tempfile
import random
import pyaudio
import pyttsx3
from dotenv import load_dotenv
from faster_whisper import WhisperModel
from openai import OpenAI

from record_audio import record_audio_chunk
from create_agent_response import chat_with_agent
from speech_to_text import transcribe_audio
from text_to_speech import speak


# Load API key
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path="/Users/elice53/StageMind/.env")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

whisper_model = WhisperModel("base", compute_type="int8")

conversation_log = []

AGENTS = [
    {"name": "MentorBot", "system_prompt": "You are a wise mentor.", "voice": "en-US-GuyNeural"},
    {"name": "FriendlyBot", "system_prompt": "You are cheerful and supportive.", "voice": "en-US-JennyNeural"},
    {"name": "CritiqueBot", "system_prompt": "You are critical and analytical.", "voice": "en-GB-RyanNeural"},
]

async def handle_conversation(text):
    print(f"\n🧠 You said: {text}")
    # Step 1: Choose the primary speaker using OpenAI
    routing_prompt = (
        "You're a router. Based on the user's message, choose the most appropriate agent to respond:\n"
        "- MentorBot: wise mentor\n"
        "- FriendlyBot: cheerful and supportive\n"
        "- CritiqueBot: critical and analytical\n\n"
        f"User said: \"{text}\"\n"
        "Respond with ONLY one name: MentorBot, FriendlyBot, or CritiqueBot."
    )

    try:
        routing_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a smart AI message router."},
                {"role": "user", "content": routing_prompt}
            ]
        )
        main_agent_name = routing_response.choices[0].message.content.strip()
        print(f"🎯 Routed to: {main_agent_name}")
    except Exception as e:
        print(f"❌ Routing error: {e}")
        main_agent_name = "MentorBot"

    main_agent = next((a for a in AGENTS if a["name"].lower() == main_agent_name.lower()), AGENTS[0])
    responses = []

    # Step 2: Generate a short main reply
    main_prompt = (
        f"User said: \"{text}\"\n"
        "Reply in a natural, short, and conversational tone. Keep it to 1–2 sentences."
    )
    await chat_with_agent(main_agent, main_prompt, responses)

    for name, reply, voice in responses:
        # event
        # send agent name to fe
        speak(reply, voice) # -> json

    # Step 3: Optional brief reactions from 0–2 others
    other_agents = [a for a in AGENTS if a["name"] != main_agent["name"]]
    random.shuffle(other_agents)
    reacting_agents = random.choices(other_agents, k=random.randint(0, 2))

    for agent in reacting_agents:
        try:
            comment_prompt = (
                f"{main_agent['name']} just replied: \"{responses[0][1]}\"\n"
                f"User originally said: \"{text}\"\n\n"
                f"As {agent['name']}, add a brief follow-up comment in 1 sentence."
            )
            comment_response = []
            await chat_with_agent(agent, comment_prompt, comment_response)

            for name, reply, voice in comment_response:
                print(f"💬 {name} adds: {reply}")
                speak(reply, voice)

        except Exception as e:
            print(f"❌ Comment error from {agent['name']}: {e}")
            
def run_real_time_transcriber():
    try:
        while True:
            audio_path = record_audio_chunk(duration=5)
            user_input = transcribe_audio(audio_path)
            # conversation_log.append({"speaker": "User", "text": text})
            if user_input:
                asyncio.run(handle_conversation(user_input))
    except KeyboardInterrupt:
        print("\n👋 Exiting...")
        
async def test():
    agent_name = "MentorBot"
    agent = next((a for a in AGENTS if a["name"].lower() == agent_name.lower()), AGENTS[0])
    text = "Hello, my name is yongjoo kim"
    conversation_log.append({"speaker": "User", "text": text})
    prompt = (
        f"User said: \"{text}\"\n"
        "Reply in a natural, short, and conversational tone. Keep it to 1–2 sentences."
    )
    responses = []
    await chat_with_agent(agent, prompt, responses, log=conversation_log)
    print(f"conversation log: {conversation_log}")  
        
if __name__ == "__main__":
    asyncio.run(test())
    # run_real_time_transcriber()