import os
from openai import OpenAI
from dotenv import load_dotenv
from faster_whisper import WhisperModel

load_dotenv(dotenv_path="/Users/jason/StageMind/.env.local")
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
whisper_model = WhisperModel("base", compute_type="int8")

def transcribe_audio(audio_path):
    segments, _ = whisper_model.transcribe(audio_path)
    text = ''.join([s.text for s in segments])
    os.remove(audio_path)
    return text.strip()