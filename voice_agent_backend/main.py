from voice_agent_backend.modules.stt_llm_tts import run_real_time_transcriber

# Endpoint to process speech and generate responses
@app.post("/api/chat")
async def process_speech_endpoint(scenario, participants, knowledge):
    """
    Endpoint to process user speech and generate AI responses.
    
    Args:
        scenario: Scenario for the conversation
        participants: Participants in the conversation
        knowledge: Knowledge base for the conversation
        
    Returns:
        None
    """

    run_real_time_transcriber(scenario, participants, knowledge)

    return "success"