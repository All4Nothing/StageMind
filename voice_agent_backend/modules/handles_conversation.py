import random
import os
from openai import OpenAI
from dotenv import load_dotenv
from .create_agent_response import chat_with_agent
from .text_to_speech import speak

dotenv_path = os.path.join(os.getcwd(), '.env.local')
load_dotenv(dotenv_path=dotenv_path)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# client = OpenAI(api_key=os.getenv("PERPLEXITY_API_KEY"), base_url="https://api.perplexity.ai")


async def handle_conversation(AGENTS, text, scenario, knowledge, log=None, routing_prompt=None):
    print(f"\n🧠 You said: {text}")

    try:
        routing_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            # model = "sonar",
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

    # Generate a short main reply
    main_prompt = (
        f"The conversation scenario is {scenario}. User said: \"{text}\"\nReply in a natural, short, and conversational tone. Keep it to 1–2 sentences."
    )
    await chat_with_agent(main_agent, main_prompt, responses, log=log)

    for name, reply, voice in responses:
        speak(reply, voice) # -> json
