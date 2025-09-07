import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black animate-backgroundPulse">
      <div className="relative flex flex-col items-center justify-center">
        {/* Glowing Spinner */}
        <div className="w-20 h-20 border-4 border-t-transparent border-orange-500 rounded-full animate-spin shadow-orange-500 shadow-lg"></div>

        {/* Pulsing "LOADING" Text */}
        <div className="mt-6 text-2xl font-bold text-white tracking-widest animate-pulse">
          LOADING
        </div>
      </div>

      {/* Optional Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500 opacity-20 rounded-full blur-3xl animate-ping-slow"></div>
    </div>
  );
};

export default LoadingScreen;
