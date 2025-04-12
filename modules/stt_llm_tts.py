import asyncio

from record_audio import record_audio_chunk
from create_agent_response import chat_with_agent
from speech_to_text import transcribe_audio
from handles_conversation import handle_conversation

'''AGENTS = [
    {"name": "MentorBot", "system_prompt": "You are a wise mentor.", "voice": "nova"},
    {"name": "FriendlyBot", "system_prompt": "You are cheerful and supportive.", "voice": "echo"},
    {"name": "CritiqueBot", "system_prompt": "You are critical and analytical.", "voice": "ash"},
]'''
            
def run_real_time_transcriber(AGENTS, routing_prompt):
    conversation_log = []
    
    try:
        while True:
            audio_path = record_audio_chunk(duration=5)
            user_input = transcribe_audio(audio_path)
            conversation_log.append({"speaker": "User", "text": user_input})
            if user_input:
                asyncio.run(handle_conversation(AGENTS, user_input, conversation_log, routing_prompt))
    except KeyboardInterrupt:
        print("\n👋 Exiting...")
        print(f"conversation log: {conversation_log}")  
        
'''async def test():
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
    print(f"conversation log: {conversation_log}")  '''
        
'''if __name__ == "__main__":
    # asyncio.run(test())
    run_real_time_transcriber()'''