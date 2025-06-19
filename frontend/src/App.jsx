import React, { useState } from 'react';
import ChatUI from './components/ChatUI';
import SummaryScreen from './components/SummaryScreen';
import CompareCards from './components/CompareCards';
import axios from 'axios';

function App() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [compareData, setCompareData] = useState([]); // 🔧 added

  const handleCompare = async () => {
    try {
      const res = await axios.get('http://localhost:5050/cards');
      const fullCardData = res.data;

      const enriched = recommendations.map((rec) => {
        const full = fullCardData.find((c) => c.name === rec.name);
        return {
          ...rec,
          issuer: full?.issuer || 'N/A',
          annual_fee: full?.annual_fee || 'N/A',
          reward_rate: full?.reward_rate || 'N/A',
          perks: full?.perks || [],
        };
      });

      setCompareData(enriched); // 🔧 updated
      setStep(3);
    } catch (err) {
      console.error("Failed to load card details from backend:", err);
      alert("Couldn't load card details from backend.");
    }
  };

  const handleRestart = () => {
    setUserData({});
    setRecommendations([]);
    setCompareData([]); // 🔧 clear compare data too
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {step === 1 && (
        <ChatUI
          setStep={setStep}
          setUserData={setUserData}
          setRecommendations={setRecommendations}
        />
      )}
      {step === 2 && (
        <SummaryScreen
          userData={userData}
          recommendations={recommendations}
          onCompare={handleCompare}
          onRestart={handleRestart}
        />
      )}
      {step === 3 && (
        <CompareCards
          cards={compareData} // 🔧 using enriched data
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}

export default App;
