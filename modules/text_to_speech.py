from openai import OpenAI
import pyttsx3

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
        print(f"❌ TTS error: {e}")