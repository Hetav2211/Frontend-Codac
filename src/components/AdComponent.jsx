import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdComponent = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showAd, setShowAd] = useState(false);

  const ads = [
    {
      id: 1,
      title: "🚀 Pro Plan Unleashed",
      content:
        "Unlock unlimited rooms and all premium features with our Pro plan!",
      cta: "Upgrade Now",
      link: "#pricing",
      bg: "bg-gradient-to-r from-blue-500 to-blue-700",
      icon: "💎",
    },
    {
      id: 2,
      title: "👥 Team Collaboration",
      content:
        "Boost your team's productivity with shared workspaces and real-time collaboration!",
      cta: "Explore Team Plan",
      link: "#pricing",
      bg: "bg-gradient-to-r from-purple-500 to-indigo-700",
      icon: "🤝",
    },
    {
      id: 3,
      title: "🎉 Limited Time Offer",
      content: "Get 10% off your first year! Offer ends soon!",
      cta: "Claim Discount",
      link: "#pricing",
      bg: "bg-gradient-to-r from-red-500 to-pink-600",
      icon: "⏳",
    },
  ];

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : { plan: 'Free' };

    // Only show ads for free users
    if (user.plan === 'Free') {
      const adInterval = setInterval(() => {
        setShowAd(true);

        setTimeout(() => {
          setShowAd(false);
        }, 5000); // Show for 5 seconds

        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 8000); // Rotate every 8 seconds

      return () => clearInterval(adInterval);
    }
  }, [ads.length]);

  const currentAd = ads[currentAdIndex];

  return (
    <AnimatePresence>
      {showAd && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className={`fixed bottom-6 right-6 ${currentAd.bg} text-white rounded-xl shadow-2xl p-6 w-96 z-50`}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{currentAd.icon}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold mb-2">{currentAd.title}</h3>
                <button
                  onClick={() => setShowAd(false)}
                  className="text-white/70 hover:text-white text-lg"
                >
                  ✕
                </button>
              </div>
              <p className="text-white/90 mb-4">{currentAd.content}</p>
              <div className="flex justify-between items-center">
                <a
                  href={currentAd.link}
                  className="inline-block text-sm font-bold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                >
                  {currentAd.cta}
                </a>
                <div className="flex space-x-1">
                  {ads.map((_, index) => (
                    <div
                      key={index}
                      className={"w-2 h-2 rounded-full " + (index === currentAdIndex ? "bg-white" : "bg-white/30")}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdComponent;
