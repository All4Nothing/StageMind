from openai import OpenAI
import os
import tempfile
import pygame
from dotenv import load_dotenv
import json

# import pyttsx3

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path="/Users/jason/StageMind/.env.local")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Store WebSocket reference
websocket = None

def set_websocket(ws):
    global websocket
    websocket = ws

VOICE_MAP = {
    "alloy": "부드럽고 진중한 남성형",
    "echo": "중립적인 중저음",
    "fable": "감정 풍부하고 따뜻한",
    "onyx": "강하고 선명한 목소리",
    "nova": "친근하고 밝은 여성형",
    "shimmer": "부드럽고 캐주얼한 스타일"
}
def speak(text, voice="nova"):
    if not text.strip():
        return {}
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
            response = client.audio.speech.create(
                model="tts-1",
                voice=voice,
                input=text
            )
            response.stream_to_file(tmp.name)
        print(f"[{voice}] says: {text}")
        pygame.mixer.init()
        pygame.mixer.music.load(tmp.name)
        pygame.mixer.music.play()
        while pygame.mixer.music.get_busy():
            pygame.time.Clock().tick(10)
            
        # Create response data
        response_data = {
            "status": "response",
            "agent": voice,  # This should ideally be the agent name, not the voice
            "text": text
        }
            
        # Send response to frontend if WebSocket is available
        if websocket:
            try:
                websocket.send_json(response_data)
            except Exception as e:
                print(f":x: WebSocket error: {e}")
                
        return response_data
    except Exception as e:
        print(f":x: OpenAI TTS error: {e}")
        return {"status": "error", "message": str(e)}

'''
tts_engine = pyttsx3.init()
tts_engine.setProperty("rate", 175)

VOICE_MAP = {
    "en-US-GuyNeural": 0,
    "en-US-JennyNeural": 1,
    "en-GB-RyanNeural": 2
}

def speak(text, voice="en-US-JennyNeural"):
    if not text.strip():
        return
    try:
        voices = tts_engine.getProperty("voices")
        index = VOICE_MAP.get(voice, 0)
        if index < len(voices):
            tts_engine.setProperty("voice", voices[index].id)
        print(f"🗣️ Speaking: {text}")
        tts_engine.say(text)
        tts_engine.runAndWait()
    except Exception as e:
        print(f"❌ TTS error: {e}")'''