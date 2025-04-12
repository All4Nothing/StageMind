"""
Test script for StageMind backend endpoints.
Tests both the persona creation and speech processing endpoints.
"""
import requests
import json
import os
import time
from pprint import pprint

# Backend URL
BASE_URL = "http://localhost:8000"

def test_persona_endpoint():
    """Test the persona creation endpoint"""
    print("\n=== Testing Persona Creation Endpoint ===")
    
    # Sample preferences for persona creation
    preferences = {
        "personality_traits": ["friendly", "knowledgeable", "patient"],
        "knowledge_areas": ["technology", "science", "history"],
        "voice_type": "neutral",
        "speaking_style": "conversational"
    }
    
    # Send request to create persona
    response = requests.post(
        f"{BASE_URL}/api/persona",
        json=preferences
    )
    
    # Print response
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print("Response:")
        pprint(result)
        return result.get("session_id")
    else:
        print(f"Error: {response.text}")
        return None

def test_chat_endpoint(session_id):
    """Test the speech processing endpoint"""
    print("\n=== Testing Chat Endpoint ===")
    
    if not session_id:
        print("Error: No session ID available. Skipping chat test.")
        return
    
    # Create a simple test audio file if it doesn't exist
    test_audio_path = "test_audio.wav"
    if not os.path.exists(test_audio_path):
        # This creates an empty WAV file for testing
        # In a real scenario, you'd use a real audio file
        with open(test_audio_path, "wb") as f:
            # Write minimal WAV header
            f.write(b"RIFF\x24\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00\x44\xac\x00\x00\x88\x58\x01\x00\x02\x00\x10\x00data\x00\x00\x00\x00")
    
    # Prepare form data with audio file and session ID
    files = {
        'audio': ('test_audio.wav', open(test_audio_path, 'rb'), 'audio/wav')
    }
    data = {
        'session_id': session_id
    }
    
    # Send request
    response = requests.post(
        f"{BASE_URL}/api/chat",
        files=files,
        data=data
    )
    
    # Print response
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Received audio response successfully")
        # Save the response audio
        with open("response_audio.wav", "wb") as f:
            f.write(response.content)
        print("Saved response to response_audio.wav")
    else:
        print(f"Error: {response.text}")

def main():
    """Main test function"""
    print("Starting StageMind Backend Tests")
    
    # Test persona creation
    session_id = test_persona_endpoint()
    
    if session_id:
        print(f"\nCreated session with ID: {session_id}")
        
        # Wait a moment to ensure the session is saved
        time.sleep(1)
        
        # Test chat endpoint
        test_chat_endpoint(session_id)
    
    print("\nTests completed.")

if __name__ == "__main__":
    main()