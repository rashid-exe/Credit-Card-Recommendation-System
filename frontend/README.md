# 💳 Credit Card Advisor — Conversational AI Agent

A smart LLM-powered conversational agent that recommends the best Indian credit cards based on your income, spending habits, and preferences.

![Demo](./demo.gif) <!-- You can upload demo.gif or use a Loom/Youtube link -->

---

 🚀 Live Demo

🖥️ Frontend: https://credit-card-recommendation-system-20z5luoju.vercel.app/  
🔙 Backend:https://my-production-6c3a.up.railway.app/

---

## 📦 Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Node.js + Express
- **LLM**: OpenRouter (GPT-3.5-turbo)
- **State Management**: React useState
- **Data Storage**: Static JSON for cards

---

## 🧠 Conversational Agent Flow

1. User fills a form with income, preferences, credit score.
2. Prompt is dynamically constructed based on:
   - Card database (loaded from `cards.json`)
   - User inputs (income, benefits, spending)
3. LLM response is parsed and rendered.
4. Bonus: Option to compare shortlisted cards via `/cards` API.

---

## 🤖 Prompt Design (used in `/agent` route)

