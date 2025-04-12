import asyncio

from .record_audio import record_audio_chunk
from .create_agent_response import chat_with_agent
from .speech_to_text import transcribe_audio
from .handles_conversation import handle_conversation

'''AGENTS = [
    {"name": "MentorBot", "role": "wise mentor", "description": "You are a wise mentor.", "voice": "nova"},
    {"name": "FriendlyBot", "role": "cheerful and supportive", "description": "You are cheerful and supportive.", "voice": "echo"},
    {"name": "CritiqueBot", "role": "critical and analytical", "description": "You are critical and analytical.", "voice": "ash"},
]'''
            
async def run_real_time_transcriber(scenario, AGENTS, knowledge):
    routing_prompt = "You're a router.:\n"

    for agent in AGENTS:
        agent_name = agent["name"]
        agent_role = agent["role"]
        agent_description = agent["description"]
        routing_prompt += f"- {agent_name}({agent_role}): {agent_description}\n"
    
    conversation_log = []
    try:
        while True:
            audio_path = record_audio_chunk(duration=5)
            user_input = transcribe_audio(audio_path)
            conversation_log.append({"speaker": "User", "text": user_input})
            routing_prompt += f"User said: {user_input}\nRespond with ONLY one name: {', '.join([a['name'] for a in AGENTS])}."
            if user_input:
                await handle_conversation(AGENTS, user_input, scenario, knowledge, conversation_log, routing_prompt)
    except KeyboardInterrupt:
        print("\n👋 Exiting...")
        print(f"conversation log: {conversation_log}")  
        
