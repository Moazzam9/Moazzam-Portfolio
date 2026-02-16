import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../public/loading.json';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative flex items-center justify-center">
        {/* Lottie Loading Animation Only (no extra text) */}
        <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
          <Lottie
            animationData={loadingAnimation}
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
