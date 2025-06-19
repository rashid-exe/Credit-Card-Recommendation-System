// 🟢 server.js — Final Version Using OpenRouter + 3–5 Card Recommendations

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = 5050;

console.log("🟢 server.js launched — CURRENT PORT:", PORT);

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Load card data
const cards = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'cards.json'), 'utf-8')
);

// ✅ Setup OpenRouter client via OpenAI SDK
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5173',
    'X-Title': 'CreditCardAdvisor'
  }
});

// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ Credit Card Advisor backend is live!');
});

// ✅ Conversational Agent Route
app.post('/agent', async (req, res) => {
  const userInput = req.body;
  console.log("📩 Received user input:", userInput);

  const spendingCategories = ['fuel', 'travel', 'groceries', 'dining']
    .filter(cat => userInput[cat])
    .join(', ') || 'Not specified';

  const benefits = Array.isArray(userInput.benefits)
    ? userInput.benefits.join(', ')
    : userInput.benefits || 'Not mentioned';

  // Prepare the card context
  const cardContext = cards.map(card => {
    return `Name: ${card.name}
Issuer: ${card.issuer}
Eligibility: ${card.eligibility}
Perks: ${card.perks.join(', ')}
Reward Rate: ${card.reward_rate}
Annual Fee: ₹${card.annual_fee}
Image: ${card.image}`;
  }).join('\n\n');

  const prompt = `
You are a financial advisor helping Indian users pick the best credit card.

Below is a list of available cards:
${cardContext}

User profile:
- Monthly income: ₹${userInput.income}
- Spending categories: ${spendingCategories}
- Preferred benefits: ${benefits}
- Credit score: ${userInput.creditScore || 'Unknown'}

Recommend the top 3 to 5 cards from the list that best match the user's profile.

Only respond with this exact JSON format (no explanation before or after):

[
  {
    "name": "Card Name",
    "reason": "Why it's recommended",
    "reward_simulation": "You could earn ₹X/year in cashback or points",
    "image": "Card image URL"
  }
]
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });

    const reply = completion.choices[0].message.content;
    console.log("🧠 LLM Raw Reply:\n", reply);

    const jsonStart = reply.indexOf('[');
    const jsonEnd = reply.lastIndexOf(']') + 1;
    const jsonString = reply.slice(jsonStart, jsonEnd);

    try {
      const recommendations = JSON.parse(jsonString);
      return res.json({ recommendations });
    } catch (e) {
      console.error('❌ Failed to parse extracted JSON:', e.message);
      return res.status(500).json({
        error: 'Could not parse valid JSON from LLM response.',
        raw: reply
      });
    }
  } catch (err) {
    console.error('🚨 OpenRouter API error:', err.message);
    return res.status(500).json({
      error: 'OpenRouter API failed. Try again later.'
    });
  }
});

// ✅ Endpoint to get full cards data for comparison
app.get('/cards', (req, res) => {
  res.json(cards);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
