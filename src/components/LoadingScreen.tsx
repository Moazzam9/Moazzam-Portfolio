import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-colors duration-300">
            <div className="w-64 h-64 flex items-center justify-center">
                <div className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
                <div className="absolute mt-24 text-white font-bold">LOADING</div>
            </div>
        </div>
    );
};

export default LoadingScreen;