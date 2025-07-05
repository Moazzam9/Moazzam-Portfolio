import React from 'react';

const DOTS = 24;
const RADIUS = 70; // px
const DOT_SIZE = 10; // px
const ACTIVE_DOT_SIZE = 20; // px
const ORANGE = '#ff5e00';

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-colors duration-300">
            {/* Animated orange glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse-glow" style={{
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${ORANGE}40 0%, ${ORANGE}20 60%, transparent 100%)`,
                filter: 'blur(8px)',
                zIndex: 0,
            }} />
            {/* Glassy blur behind loader */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 rounded-full" style={{
                width: 2 * RADIUS + 80,
                height: 2 * RADIUS + 80,
                zIndex: 1,
            }} />
            <div className="relative flex items-center justify-center z-10" style={{ width: 2 * RADIUS + 60, height: 2 * RADIUS + 60 }}>
                {/* Glowing ring */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse-glow"
                    style={{
                        width: 2 * RADIUS + 30,
                        height: 2 * RADIUS + 30,
                        borderRadius: '50%',
                        boxShadow: `0 0 120px 40px ${ORANGE}, 0 0 200px 80px ${ORANGE}`,
                        background: `radial-gradient(circle, ${ORANGE}20 60%, ${ORANGE}10 100%)`,
                        zIndex: 0,
                    }}
                />
                {/* Dots */}
                {Array.from({ length: DOTS }).map((_, i) => {
                    const angle = (i / DOTS) * 2 * Math.PI;
                    const x = RADIUS * Math.cos(angle);
                    const y = RADIUS * Math.sin(angle);
                    // The first dot is the 'active' one for the animation
                    return (
                        <span
                            key={i}
                            className="absolute rounded-full animate-dot-spin-glow"
                            style={{
                                width: i === 0 ? ACTIVE_DOT_SIZE : DOT_SIZE,
                                height: i === 0 ? ACTIVE_DOT_SIZE : DOT_SIZE,
                                left: `calc(50% + ${x}px - ${(i === 0 ? ACTIVE_DOT_SIZE : DOT_SIZE) / 2}px)`,
                                top: `calc(50% + ${y}px - ${(i === 0 ? ACTIVE_DOT_SIZE : DOT_SIZE) / 2}px)`,
                                background: ORANGE,
                                opacity: i === 0 ? 1 : 0.18 + 0.82 * 0.7,
                                filter: i === 0
                                    ? `drop-shadow(0 0 48px #fff) drop-shadow(0 0 64px ${ORANGE}) drop-shadow(0 0 32px ${ORANGE})`
                                    : `drop-shadow(0 0 16px ${ORANGE})`,
                                animationDelay: `${(i * 0.05)}s`,
                                zIndex: i === 0 ? 2 : 1,
                                transition: 'width 0.2s, height 0.2s, opacity 0.2s',
                            }}
                        />
                    );
                })}
                {/* Center text with animated glow */}
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-extrabold tracking-widest select-none animate-text-glow" style={{
                    color: '#ff6f00',
                    textShadow: `0 0 2px #fff, 0 0 4px #fff, 0 0 8px #fff, 0 0 12px #ea580c, 0 0 24px #ea580c`,
                    zIndex: 3,
                    letterSpacing: '0.25em',
                }}>
                    LOADING
                </span>
            </div>
        </div>
    );
};

export default LoadingScreen; 