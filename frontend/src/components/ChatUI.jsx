// ChatUI.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const benefitOptions = [
  { label: 'Lounge Access', value: 'Lounge Access' },
  { label: 'Cashback', value: 'Cashback' },
  { label: 'Dining', value: 'Dining' },
  { label: 'Fuel', value: 'Fuel' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Amazon Prime', value: 'Amazon Prime' },
  { label: 'Movies', value: 'Movies' },
  { label: 'Groceries', value: 'Groceries' }
];

const ChatUI = ({ setStep, setUserData, setRecommendations }) => {
  const [form, setForm] = useState({
    income: '',
    fuel: false,
    travel: false,
    groceries: false,
    dining: false,
    benefits: [],
    creditScore: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBenefitChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(opt => opt.value);
    setForm((prev) => ({ ...prev, benefits: selectedValues }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 Submit triggered");

    try {
      const res = await axios.post('my-production-6c3a.up.railway.app', form);
      console.log("✅ Received recommendations:", res.data.recommendations);

      setUserData(form);
      setRecommendations(res.data.recommendations);
      setStep(2); // ✅ Transition to summary screen
    } catch (err) {
      console.error('❌ Failed to fetch recommendations:', err);
      alert("Backend error: Check console or make sure backend is running.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        📝 Tell us about yourself
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg border space-y-6"
      >
        {/* Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Income (₹)
          </label>
          <input
            type="number"
            name="income"
            value={form.income}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Spending Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Spending Categories
          </label>
          <div className="flex flex-wrap gap-4">
            {['fuel', 'travel', 'groceries', 'dining'].map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={category}
                  checked={form[category]}
                  onChange={handleChange}
                />
                <span className="capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Preferred Benefits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Benefits
          </label>
          <Select
            isMulti
            name="benefits"
            options={benefitOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleBenefitChange}
          />
        </div>

        {/* Credit Score */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Credit Score (optional)
          </label>
          <input
            type="text"
            name="creditScore"
            value={form.creditScore}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-medium py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          🚀 Get Recommendations
        </button>
      </form>
    </div>
  );
};

export default ChatUI;
