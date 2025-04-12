import random
import os
from openai import OpenAI
from dotenv import load_dotenv
from .create_agent_response import chat_with_agent
from .text_to_speech import speak

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path="/Users/jason/StageMind/.env.local")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def handle_conversation(AGENTS, text, scenario, knowledge, log=None, routing_prompt=None):
    print(f"\n🧠 You said: {text}")
    # Step 1: Choose the primary speaker using OpenAI
    '''routing_prompt = (
        "You're a router. Based on the user's message, choose the most appropriate agent to respond:\n"
        "- MentorBot: wise mentor\n"
        "- FriendlyBot: cheerful and supportive\n"
        "- CritiqueBot: critical and analytical\n\n"
        f"User said: \"{text}\"\n"
        "Respond with ONLY one name: MentorBot, FriendlyBot, or CritiqueBot."
    )'''

    try:
        routing_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"You are a smart AI message router. {routing_prompt}"},
                {"role": "user", "content": f"This is the conversation history so far: {log}. Based on the user's message, choose the most appropriate agent to respond."}
            ]
        )
        main_agent_name = routing_response.choices[0].message.content.strip()
        print(f"🎯 Routed to: {main_agent_name}")
    except Exception as e:
        print(f"❌ Routing error: {e}")
        main_agent_name = "MentorBot"

    main_agent = next((a for a in AGENTS if a["name"].lower() == main_agent_name.lower()), AGENTS[0])
    responses = []

    # Step 2: Generate a short main reply
    main_prompt = (
        f"The conversation scenario is {scenario}. User said: \"{text}\"\nReply in a natural, short, and conversational tone. Keep it to 1–2 sentences."
    )
    await chat_with_agent(main_agent, main_prompt, responses, log=log)

    for name, reply, voice in responses:
        # event
        # send agent name to fe
        response_data = speak(reply, voice) # -> json
        
        # Add WebSocket reference to function parameters to send conversation log updates
        if hasattr(speak, 'websocket') and speak.websocket:
            try:
                await speak.websocket.send_json({
                    "status": "conversation_log_update",
                    "conversation_log": log
                })
            except Exception as e:
                print(f"❌ Error sending conversation log update: {e}")

    '''# Step 3: Optional brief reactions from 0–2 others
    other_agents = [a for a in AGENTS if a["name"] != main_agent["name"]]
    random.shuffle(other_agents)
    reacting_agents = random.choices(other_agents, k=random.randint(0, 2))

    for agent in reacting_agents:
        try:
            comment_prompt = (
                f"{main_agent['name']} just replied: \"{responses[0][1]}\"\n"
                f"User originally said: \"{text}\"\n\n"
                f"As {agent['name']}, add a brief follow-up comment in 1 sentence."
            )
            comment_response = []
            await chat_with_agent(agent, comment_prompt, comment_response)

            for name, reply, voice in comment_response:
                print(f"💬 {name} adds: {reply}")
                speak(reply, voice)
    
        except Exception as e:
            print(f"❌ Comment error from {agent['name']}: {e}")'''