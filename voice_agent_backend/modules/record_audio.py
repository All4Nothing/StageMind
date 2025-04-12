import wave
import tempfile
import pyaudio
import webrtcvad
from openai import OpenAI

def record_audio_chunk(max_duration=10, silence_duration=2.0):
  RATE = 16000
  CHANNELS = 1
  CHUNK_DURATION_MS = 30 # ms
  CHUNK = int(RATE * CHUNK_DURATION_MS / 1000) # = 480 samples
  FORMAT = pyaudio.paInt16
  MAX_SILENT_CHUNKS = int(silence_duration * 1000 / CHUNK_DURATION_MS)
  MAX_CHUNKS = int(max_duration * 2000 / CHUNK_DURATION_MS)
  vad = webrtcvad.Vad(2) # 0~3 (0: strict, 3: loose)
  audio_interface = pyaudio.PyAudio()
  stream = audio_interface.open(format=FORMAT,
                 channels=CHANNELS,
                 rate=RATE,
                 input=True,
                 frames_per_buffer=CHUNK)
  print("Listening...")
  frames = []
  silent_chunks = 0
  for i in range(MAX_CHUNKS):
    data = stream.read(CHUNK)
    is_speech = vad.is_speech(data, RATE)
    frames.append(data)
    if not is_speech:
      silent_chunks += 1
      if silent_chunks > MAX_SILENT_CHUNKS:
        break
    else:
      silent_chunks = 0
  print("Stop recording.")
  stream.stop_stream()
  stream.close()
  audio_interface.terminate()
  temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
  wf = wave.open(temp_file.name, 'wb')
  wf.setnchannels(CHANNELS)
  wf.setsampwidth(audio_interface.get_sample_size(FORMAT))
  wf.setframerate(RATE)
  wf.writeframes(b''.join(frames))
  wf.close()
  return temp_file.name