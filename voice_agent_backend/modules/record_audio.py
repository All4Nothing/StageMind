import wave
import tempfile
import pyaudio
import webrtcvad
from openai import OpenAI

def record_audio_chunk(duration=10, silence_duration=2.0):
  RATE = 16000
  CHANNELS = 1
  CHUNK_DURATION_MS = 30 # ms
  CHUNK = int(RATE * CHUNK_DURATION_MS / 1000) # = 480 samples
  FORMAT = pyaudio.paInt16
  MAX_SILENT_CHUNKS = int(silence_duration * 1000 / CHUNK_DURATION_MS)
  MAX_CHUNKS = int(duration * 1000 / CHUNK_DURATION_MS)
  
  # Use a lower VAD aggressiveness (1 instead of 2) to be less strict about what is considered speech
  vad = webrtcvad.Vad(1) # 0~3 (0: strict, 3: loose)
  
  audio_interface = pyaudio.PyAudio()
  stream = audio_interface.open(format=FORMAT,
                 channels=CHANNELS,
                 rate=RATE,
                 input=True,
                 frames_per_buffer=CHUNK)
  
  print("Listening...")
  frames = []
  silent_chunks = 0
  voiced_frames = 0  # Count frames that contain speech
  recording_started = False
  
  for i in range(MAX_CHUNKS):
    data = stream.read(CHUNK)
    is_speech = vad.is_speech(data, RATE)
    
    # Only start counting silence after we've detected speech
    if is_speech:
      voiced_frames += 1
      silent_chunks = 0  # Reset silent counter when speech is detected
      recording_started = True
      frames.append(data)
    else:
      # Only count silence after we've started recording
      if recording_started:
        silent_chunks += 1
        frames.append(data)
      
      # Only stop if we've had enough speech followed by enough silence
      if voiced_frames > 10 and silent_chunks > MAX_SILENT_CHUNKS:
        break
  
  print("Stop recording.")
  stream.stop_stream()
  stream.close()
  audio_interface.terminate()
  
  # Only create a file if we actually recorded something
  if len(frames) > 0:
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    wf = wave.open(temp_file.name, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(audio_interface.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()
    return temp_file.name
  else:
    return None