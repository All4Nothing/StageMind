"""
Chat History Module.
Manages conversation history between user and AI assistant.
"""
from typing import List, Dict, Any, Optional


def add_user_message(history: List[Dict[str, str]], message: str) -> None:
    """
    Adds a user message to the chat history.
    
    Args:
        history: List containing chat history
        message: User message to add
    """
    history.append({
        "role": "user",
        "content": message
    })


def add_assistant_message(history: List[Dict[str, str]], message: str) -> None:
    """
    Adds an assistant message to the chat history.
    
    Args:
        history: List containing chat history
        message: Assistant message to add
    """
    history.append({
        "role": "assistant",
        "content": message
    })


def get_formatted_history(history: List[Dict[str, str]], max_tokens: Optional[int] = None) -> str:
    """
    Returns history formatted for LLM context.
    
    Args:
        history: List containing chat history
        max_tokens: Maximum number of tokens to include
        
    Returns:
        Formatted history string
    """
    # TODO: Implement formatting logic
    # This would format the history in a way that's suitable for the LLM
    
    formatted_history = ""
    
    # If max_tokens is specified, truncate history to fit within token limit
    # This is a simplified implementation - actual token counting would be needed
    history_to_format = history
    if max_tokens:
        history_to_format = truncate_history(history, max_tokens)
    
    for message in history_to_format:
        role = message["role"]
        content = message["content"]
        formatted_history += f"{role.capitalize()}: {content}\n"
    
    return formatted_history


def truncate_history(history: List[Dict[str, str]], max_turns: int) -> List[Dict[str, str]]:
    """
    Removes oldest messages to maintain history size.
    
    Args:
        history: List containing chat history
        max_turns: Maximum number of conversation turns to keep
        
    Returns:
        Truncated history list
    """
    # If history is already shorter than max_turns, return as is
    if len(history) <= max_turns * 2:  # Each turn is a user + assistant message
        return history
    
    # Calculate how many messages to remove
    # Ensure we keep complete turns (user + assistant pairs)
    messages_to_keep = max_turns * 2
    messages_to_remove = len(history) - messages_to_keep
    
    # Remove oldest messages
    truncated_history = history[messages_to_remove:]
    
    return truncated_history
