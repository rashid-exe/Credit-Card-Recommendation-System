// SummaryScreen.jsx
import React from 'react';

const SummaryScreen = ({ recommendations, onCompare, onRestart }) => {
  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        💳 Your Top Card Recommendations
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {recommendations.map((card, index) => (
          <div
            key={index}
            className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition-all"
          >
           <img
            src="/default-card.png"
            alt="Credit Card"
            className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <h2 className="text-xl font-semibold text-gray-800">{card.name}</h2>
            <p className="text-sm text-gray-600 mt-2">{card.reason}</p>
            <p className="text-green-600 text-sm mt-2 font-medium">{card.reward_simulation}</p>
            {card.apply_link && (
              <a
                href={card.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-md text-center hover:bg-blue-700"
              >
                Apply Now
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onCompare}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          🧾 Compare Cards
        </button>
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          🔄 Start Over
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;
