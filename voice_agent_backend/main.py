"""
Main FastAPI application for AI Voice Agent Backend.
This module initializes the FastAPI app and defines all endpoints.
"""
import os
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

# Import modules
from modules.persona_generator import generate_persona, validate_preferences
from modules.chat_history import add_user_message, add_assistant_message
from modules.speech_to_text import transcribe_audio
from modules.response_generator import generate_response
from modules.text_to_speech import synthesize_speech
from modules.session_manager import (
    generate_session_id,
    save_session,
    load_session,
    session_exists,
    clean_expired_sessions
)

# Initialize FastAPI app
app = FastAPI(
    title="AI Voice Agent API",
    description="Backend API for AI Voice Agent with persona generation and speech processing",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event to create sessions directory and clean expired sessions
@app.on_event("startup")
async def startup_event():
    """
    Runs when the application starts.
    Creates the sessions directory if it doesn't exist.
    Cleans expired sessions.
    """
    os.makedirs("sessions", exist_ok=True)
    clean_expired_sessions(max_age_hours=24)  # Clean sessions older than 24 hours

# Endpoint to create a persona based on user preferences
@app.post("/api/persona")
async def create_persona_endpoint(preferences: Dict[str, Any]):
    """
    Endpoint to generate an AI persona based on user preferences.
    
    Args:
        preferences: Dictionary containing user preferences
        
    Returns:
        Dictionary with session_id and confirmation message
    """
    # Validate preferences
    if not validate_preferences(preferences):
        raise HTTPException(status_code=400, detail="Invalid preferences format")
    
    # Generate a new session ID
    session_id = generate_session_id()
    
    # Generate persona based on preferences
    try:
        persona = generate_persona(preferences)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate persona: {str(e)}")
    
    # Create session data
    session_data = {
        "session_id": session_id,
        "created_at": "",  # Will be filled by save_session
        "last_accessed": "",  # Will be filled by save_session
        "user_preferences": preferences,
        "persona": persona,
        "chat_history": []
    }
    
    # Save session
    save_session(session_id, session_data)
    
    return {
        "session_id": session_id,
        "message": "Persona created successfully"
    }

# Endpoint to process speech and generate responses
@app.post("/api/chat")
async def process_speech_endpoint(
    audio: UploadFile = File(...),
    session_id: str = Form(...)
):
    """
    Endpoint to process user speech and generate AI responses.
    
    Args:
        audio: Audio file containing user speech
        session_id: Session ID for the conversation
        
    Returns:
        Audio file with the AI's spoken response
    """
    # Validate session
    if not session_exists(session_id):
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Load session data
    session_data = load_session(session_id)
    
    # Transcribe audio to text
    try:
        user_text = await transcribe_audio(audio)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to transcribe audio: {str(e)}")
    
    # Get persona and chat history from session
    persona = session_data["persona"]
    chat_history = session_data["chat_history"]
    
    # Add user message to chat history
    add_user_message(chat_history, user_text)
    
    # Generate response
    try:
        response_text = generate_response(user_text, persona, chat_history)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Failed to generate response: {str(e)}")
    
    # Add assistant response to chat history
    add_assistant_message(chat_history, response_text)
    
    # Update session with new chat history
    session_data["chat_history"] = chat_history
    save_session(session_id, session_data)
    
    # Convert response to speech
    try:
        voice_settings = persona.get("voice_settings", {})
        audio_response = synthesize_speech(response_text, voice_settings)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to synthesize speech: {str(e)}")
    
    return audio_response

# Run the application with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
