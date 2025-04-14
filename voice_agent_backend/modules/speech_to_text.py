import os
from openai import OpenAI
from dotenv import load_dotenv
from faster_whisper import WhisperModel

import torch
import torch.nn.functional as F
import torchaudio
import numpy as np
from transformers import AutoFeatureExtractor, AutoModelForAudioClassification

from pydub import AudioSegment

base_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(base_dir, "..", "..", ".env") 
load_dotenv(dotenv_path=env_path)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
whisper_model = WhisperModel("base", compute_type="int8")

model_name = "audeering/wav2vec2-large-robust-12-ft-emotion-msp-dim"
model = AutoModelForAudioClassification.from_pretrained(model_name)
extractor = AutoFeatureExtractor.from_pretrained(model_name)

def load_audio_as_tensor(audio_path):
    audio = AudioSegment.from_file(audio_path)  # 자동으로 wav/mp3 판단
    audio = audio.set_channels(1).set_frame_rate(16000)  # 일관된 처리
    samples = np.array(audio.get_array_of_samples()).astype(np.float32) / 32768.0
    tensor = torch.from_numpy(samples).unsqueeze(0)  # shape: (1, time)
    return tensor, 16000

def transcribe_audio(audio_path):
    segments, _ = whisper_model.transcribe(audio_path)
    waveform, sr = load_audio_as_tensor(audio_path)
    inputs = extractor(waveform.squeeze(), sampling_rate=sr, return_tensors="pt")

    with torch.no_grad():
        logits = model(**inputs).logits
        probs = F.softmax(logits, dim=-1)
        pred = probs.argmax().item()
    
    arousal = round(probs.squeeze()[0].item(), 4)
    dominance = round(probs.squeeze()[1].item(), 4)
    '''
    labels = model.config.id2label
    for i, prob in enumerate(probs.squeeze()):
        print(f"{labels[i]}: {prob:.4f}")
    print("Emotion:", model.config.id2label[pred])
    print("Confidence:", probs.squeeze().tolist())
    print(arousal)
    print(dominance)'''
    text = ''.join([s.text for s in segments])
    os.remove(audio_path)
    return text.strip(), arousal, dominance