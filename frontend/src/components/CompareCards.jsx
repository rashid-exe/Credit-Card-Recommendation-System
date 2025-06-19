// CompareCards.jsx
import React from 'react';

const CompareCards = ({ cards, onBack }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📊 Compare Credit Cards</h2>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm text-left text-gray-700 bg-white rounded-xl shadow-md">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-3">Card</th>
              <th className="px-4 py-3">Issuer</th>
              <th className="px-4 py-3">Annual Fee</th>
              <th className="px-4 py-3">Reward Rate</th>
              <th className="px-4 py-3">Perks</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-800">{card.name}</td>
                <td className="px-4 py-3">{card.issuer}</td>
                <td className="px-4 py-3">₹{card.annual_fee}</td>
                <td className="px-4 py-3">{card.reward_rate}</td>
                <td className="px-4 py-3">{card.perks?.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          🔙 Back to Recommendations
        </button>
      </div>
    </div>
  );
};

export default CompareCards;
