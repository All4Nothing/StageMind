from openai import OpenAI
import os
import tempfile
import pygame
from dotenv import load_dotenv

# import pyttsx3

dotenv_path = os.path.join(os.getcwd(), '.env.local')
load_dotenv(dotenv_path=dotenv_path)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def speak(text, voice="nova"):
    if not text.strip():
        return
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
    except Exception as e:
        print(f":x: OpenAI TTS error: {e}")
    
    