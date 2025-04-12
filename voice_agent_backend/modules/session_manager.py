"""
Session Manager Module.
Handles file-based session management.
"""
import os
import json
import uuid
from datetime import datetime, timedelta
from typing import Dict, Any, Optional


def generate_session_id() -> str:
    """
    Creates a unique session ID.
    
    Returns:
        Unique session ID string
    """
    return str(uuid.uuid4())


def save_session(session_id: str, session_data: Dict[str, Any]) -> None:
    """
    Saves session data to file.
    
    Args:
        session_id: Unique session identifier
        session_data: Dictionary containing session data
    """
    # Set timestamps
    current_time = datetime.now().isoformat()
    if "created_at" not in session_data or not session_data["created_at"]:
        session_data["created_at"] = current_time
    session_data["last_accessed"] = current_time
    
    # Ensure sessions directory exists
    os.makedirs("sessions", exist_ok=True)
    
    # Save to file
    file_path = os.path.join("sessions", f"{session_id}.json")
    with open(file_path, "w") as f:
        json.dump(session_data, f, indent=2)


def load_session(session_id: str) -> Dict[str, Any]:
    """
    Loads session data from file.
    
    Args:
        session_id: Unique session identifier
        
    Returns:
        Dictionary containing session data
        
    Raises:
        FileNotFoundError: If session file doesn't exist
    """
    file_path = os.path.join("sessions", f"{session_id}.json")
    
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Session {session_id} not found")
    
    with open(file_path, "r") as f:
        session_data = json.load(f)
    
    # Update last accessed time
    session_data["last_accessed"] = datetime.now().isoformat()
    save_session(session_id, session_data)
    
    return session_data


def session_exists(session_id: str) -> bool:
    """
    Checks if a session exists.
    
    Args:
        session_id: Unique session identifier
        
    Returns:
        Boolean indicating if session exists
    """
    file_path = os.path.join("sessions", f"{session_id}.json")
    return os.path.exists(file_path)


def delete_session(session_id: str) -> None:
    """
    Removes a session.
    
    Args:
        session_id: Unique session identifier
    """
    file_path = os.path.join("sessions", f"{session_id}.json")
    
    if os.path.exists(file_path):
        os.remove(file_path)


def clean_expired_sessions(max_age_hours: int = 24) -> None:
    """
    Removes old session files.
    
    Args:
        max_age_hours: Maximum age of sessions in hours
    """
    # Ensure sessions directory exists
    if not os.path.exists("sessions"):
        return
    
    # Calculate cutoff time
    cutoff_time = datetime.now() - timedelta(hours=max_age_hours)
    
    # Check all files in sessions directory
    for filename in os.listdir("sessions"):
        if not filename.endswith(".json"):
            continue
            
        file_path = os.path.join("sessions", filename)
        
        try:
            # Get file modification time
            file_mod_time = datetime.fromtimestamp(os.path.getmtime(file_path))
            
            # Delete if older than cutoff
            if file_mod_time < cutoff_time:
                os.remove(file_path)
        except Exception as e:
            # Log error but continue with other files
            print(f"Error cleaning session {filename}: {str(e)}")
