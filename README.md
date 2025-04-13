# 🧠 StageMind
- A platform to **practice real-life conversations** using **AI agents**.
- Like a **flight simulator**, but for **communication and soft skills**.
- Designed to help users improve their communication skills through dynamic role-playing scenarios.
- Afterward, the platform gives you **feedback** on how you did.
---
### 🛠️ Built With
* ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)  
* ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)  
* ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)  
* ![PyTorch](https://img.shields.io/badge/PyTorch-ee4c2c?style=for-the-badge&logo=pytorch&logoColor=white)  
* ![NumPy](https://img.shields.io/badge/Numpy-013243?style=for-the-badge&logo=numpy&logoColor=white)  
* ![Hugging Face](https://img.shields.io/badge/HuggingFace-FFD21F?style=for-the-badge&logo=huggingface&logoColor=black)  
* ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)   
* ![Perplexity API](https://img.shields.io/badge/Perplexity%20API-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iOCI+PC9jaXJjbGU+PC9zdmc+)  
---
### 💡 **Why It Matters**
- Most people don’t get to **practice communication safely**.
- Job interviews, presentations, or tough talks can cause **anxiety or panic**.
- SkillSphere lets you **prepare in private**, with no judgment.
- It’s **available 24/7**, personalized, and adapts to your culture and needs.
---
### 🔧 **How It Works (Simplified Flow)**
1. **Choose a Scenario** (e.g., Interview, Conflict Resolution, Small Talk)
2. **Pick Your Agents** – Define who you want to talk to (e.g., skeptical boss, nervous customer).
3. **Start Talking** – Speak naturally; AI agents respond in real time using realistic voices.
4. **Get Feedback** – After the session, see where you were strong or where to improve.
---
### 🔍 **What Makes It Unique**
- Group interaction with **multiple agents** (not just chatbot).
- **Emotion-aware feedback** using voice tone and intensity.
- **Cultural flexibility** – Works for Korean, American, South Asian, etc. communication norms.
- **Modular learning** – Practice just one skill (like assertiveness or listening) if you want.
---
### 🔄 **Who It's For**
- **Students** prepping for presentations or debates.
- **Job seekers** wanting to practice interviews.
- **Remote workers** improving team communication.
- **ESL learners** refining fluency and tone.
- **Socially anxious individuals** gaining confidence.
### 🔧 Detailed Feature Breakdown.
### 1. Custom Scenario & Agent Generation
- Users input a simulation scenario in natural language.
- They can specify the number of AI agents and define each agent’s personality.
- Using the Perplexity API and Sonar model, the system generates:
  - A detailed scenario
  - Agent profiles
  - The simulation's main goal
### 2. Real-Time Speech-to-Text & Emotion Analysis
- **Speech-to-Text:** Implemented with OpenAI’s Whisper model to convert user speech into text in real-time.
- **Emotion Analysis:** Uses the `audeering/wav2vec2-large-robust-12-ft-emotion-msp-dim` model to analyze:
  - Arousal (intensity of emotion)
  - Dominance (control in interaction)
  - Overall sentiment
### 3. Agent Response Generation
- Based on the evolving scenario and user inputs, GPT-3.5-Turbo (OpenAI API) generates appropriate agent responses in real-time.
### 4. Text-to-Speech (TTS)
- Each agent’s response is converted into voice using OpenAI’s `tts-1` model, allowing for natural, real-time audio interactions.
### 5. Performance Evaluation
- After the simulation ends, the system evaluates the user’s performance based on:
  - Conversation history
  - Arousal & dominance metrics
  - Demonstrated knowledge
- A feedback report is provided to help improve communication skills and achieve scenario-specific goals.

### ⚙️ Installation
#### 🔙 Backend
1. Clone the repo
   ```sh
   git clone https://github.com/All4Nothing/StageMind
   ```
2. Create `.env.local` file in the directory in which `package.json` exists and paste the following:
   ```js
   PERPLEXITY_API_KEY=<your_own_API_KEY>
   OPENAI_API_KEY = <your_own_API_KEY>
   ```
3. Navigate to the backend folder
   ```sh
   cd voice_agent_backend
   ```
4. Running the server
  ```sh
   python main.py
   ```
### 🖥️ Frontend
1. Install NPM packages
   ```sh
   pnpm install
   ```
2. Start the development server
   ```sh
   npm run dev
   ```
3. Open your browser at: :오른쪽을_가리키는_손_모양: http://localhost:3000
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### 👥 Authors
<p align="left">
  -Yongjoo Kim : AI Engineering
<a href="https://www.linkedin.com/in/yongjoo-kim/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="lauragrandaf" height="20" width="20" /></a>
</p>
<p align="left">
  -Sofi Nafikova : Backend
  <a href="https://www.linkedin.com/in/s0f1/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="lauragrandaf" height="20" width="20" /></a>
</p>
<p align="left">
  -Syed Hasnain Mumtaz Naqvi : Team Leader
<a href="https://linkedin.com/in/shmn/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="lauragrandaf" height="20" width="20" /></a>
</p>
<p align="left">
  -Jaeyong Lee : Fullstack & AI
<a href="https://www.linkedin.com/in/ljys/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="lauragrandaf" height="20" width="20" /></a>
</p>
<p align="left">
  -Laura Granda Fernández : Frontend
  <a href="https://linkedin.com/in/lauragrandaf" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="lauragrandaf" height="20" width="20" /></a>
</p>
