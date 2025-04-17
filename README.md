# 🧠 StageMind: AI-Powered Communication Training Tool
- **StageMind** is an AI-based platform designed to help users practice and improve their communication skills through realistic, scenario-based simulations.

https://github.com/user-attachments/assets/8b85b2ae-bd74-4fe0-94be-ea27191dee0b
---  
### Project Architecture  

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
### Key Features
- **Scenario Generation**  
Users can input the type of situation they want to practice (e.g., job interviews, workplace conflict, giving feedback).
Based on this, the system uses LLMs to generate the scenario goal and profiles of AI agents who will participate in the conversation.
- **Real-Time Voice Interaction**  
Users engage in live, voice-based conversations with multiple AI agents in a Zoom-like interface. Each agent plays a specific role based on their profile, making the simulation dynamic and immersive.
- **Personalized Feedback**  
After each session, the system analyzes the conversation transcript, emotional tone, and speech features to generate a feedback report.
This report helps users reflect on their performance and track improvement over time.
---
### Use Cases
- **Interview Preparation**  
Practice tailored interview scenarios to build confidence and fluency.
- **Workplace Communication**  
Simulate difficult conversations, such as resolving conflicts or giving constructive feedback.
- **Public Speaking & Presentation**  
Rehearse presentation scenarios with audience-like AI agents and receive feedback on clarity, emotion, and tone.

### ⚙️ Installation
#### 🔙 Backend
1. Clone the repo
   ```sh
   git clone https://github.com/All4Nothing/StageMind
   ```
2. Create `.env` file in the directory in which `package.json` exists and paste the following:
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
3. Open your browser at:  http://localhost:3000/practice
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
