import wave
import tempfile
import pyaudio
from openai import OpenAI

def record_audio_chunk(duration=5):
    RATE = 16000
    CHANNELS = 1
    CHUNK = 1024
    FORMAT = pyaudio.paInt16

    audio = pyaudio.PyAudio()
    stream = audio.open(format=FORMAT, channels=CHANNELS, rate=RATE,
                        input=True, frames_per_buffer=CHUNK)

    print("🎙️ Listening...")
    frames = []
    for _ in range(0, int(RATE / CHUNK * duration)):
        data = stream.read(CHUNK)
        frames.append(data)

    stream.stop_stream()
    stream.close()
    audio.terminate()

    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    wf = wave.open(temp_file.name, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(audio.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()

    return temp_file.name