# 💳 Credit Card Advisor — Conversational AI Agent

A smart LLM-powered conversational agent that recommends the best Indian credit cards based on your income, spending habits, and preferences.

![Demo](Drive link of screen recording) (https://drive.google.com/file/d/1otBTR0sYlC4vMBwIPic39EsbhKYvZRfU/view?usp=sharing)

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

You are a financial advisor helping Indian users pick the best credit card.

Below is a list of available cards:
<Card data injected here>

User profile:

Monthly income: ₹<income>

Spending categories: <spending>

Preferred benefits: <benefits>

Credit score: <score>

Only respond with this exact JSON format:

[
{
"name": "Card Name",
"reason": "Why it's recommended",
"reward_simulation": "...",
"image": "..."
}
]

 

## 🧪 Setup Instructions

```bash
# 1. Clone repo
git clone https://github.com/<your-username>/credit-card-advisor.git
cd credit-card-advisor

# 2. Install backend dependencies
cd backend
npm install

# 3. Create `.env` file
touch .env

# .env contents
OPENROUTER_API_KEY=your-key-here

# 4. Start backend
node server.js

# 5. Install frontend dependencies
cd ../frontend
npm install

# 6. Start frontend
npm run dev

