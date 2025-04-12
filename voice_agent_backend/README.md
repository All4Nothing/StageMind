# AI Voice Agent Backend

A FastAPI backend for an AI voice agent with persona generation, speech-to-text, and text-to-speech capabilities.

## Project Structure

```
voice_agent_backend/
├── main.py                   # Main FastAPI application
├── modules/
│   ├── persona_generator.py  # LLM module 1 for generating persona
│   ├── chat_history.py       # Chat history management
│   ├── speech_to_text.py     # STT module
│   ├── response_generator.py # LLM module 2 for generating responses
│   ├── text_to_speech.py     # TTS module
│   └── session_manager.py    # File-based session management
└── sessions/                 # Directory to store session files
```

## Getting Started

### Prerequisites

- Python 3.8+
- Virtual environment (recommended)

### Installation

1. Clone the repository
2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

### Running the Application

```
cd voice_agent_backend
uvicorn main:app --reload
```

The API will be available at http://localhost:8000

### API Documentation

Once the server is running, you can access the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### 1. Create Persona

**URL:** `/api/persona`  
**Method:** POST  
**Request Body:** JSON with user preferences

Example request:
```json
{
  "personality_traits": ["friendly", "knowledgeable", "patient"],
  "knowledge_areas": ["science", "technology", "history"]
}
```

Example response:
```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Persona created successfully"
}
```

### 2. Process Speech

**URL:** `/api/chat`  
**Method:** POST  
**Request Body:** Multipart form with audio file and session ID

Example request:
- Form field `session_id`: "550e8400-e29b-41d4-a716-446655440000"
- Form file `audio`: audio_file.wav

Response: Audio file with the AI's spoken response

## Implementation Notes

This is a skeleton implementation. To complete the functionality, you'll need to:

1. Integrate with a Speech-to-Text service (e.g., Whisper API, Google Speech-to-Text)
2. Integrate with a Text-to-Speech service (e.g., ElevenLabs, Google Text-to-Speech)
3. Integrate with an LLM service (e.g., OpenAI API, Anthropic Claude)
4. Implement proper error handling and validation
5. Add authentication and rate limiting for production use

Look for `TODO` comments in the code for specific implementation guidance.

## Session Management

Sessions are stored as JSON files in the `sessions/` directory. Each session contains:
- Session ID
- Creation and last accessed timestamps
- User preferences
- Generated persona
- Chat history

Sessions are automatically cleaned up after 24 hours of inactivity.
