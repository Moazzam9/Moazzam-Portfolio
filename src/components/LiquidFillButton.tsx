import React, { useState, useRef, useEffect } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface LiquidFillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
  fillDirection?: 'bottom-up' | 'top-down' | 'left-right' | 'right-left' | 'center-out';
  animationDuration?: number;
}

const LiquidFillButton: React.FC<LiquidFillButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false,
  fillDirection = 'bottom-up',
  animationDuration = 600
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<number>();

  // Simple fill/drain animation
  useEffect(() => {
    if (isHovered) {
      // Fill animation
      let progress = 0;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / animationDuration, 1);

        // Smooth easing
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setFillProgress(easedProgress);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animate();
    } else {
      // Drain animation
      let progress = 0;
      const startTime = Date.now();
      const drainDuration = animationDuration * 0.7;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        progress = Math.min(elapsed / drainDuration, 1);

        const easedProgress = Math.pow(progress, 2);
        setFillProgress(Math.max(0, 1 - easedProgress));

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animate();
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered, animationDuration]);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    if (onClick) onClick();
  };

  const getLiquidClipPath = () => {
    const progress = fillProgress;

    switch (fillDirection) {
      case 'bottom-up':
        return `inset(${(1 - progress) * 100}% 0 0 0)`;
      case 'top-down':
        return `inset(0 0 ${(1 - progress) * 100}% 0)`;
      case 'left-right':
        return `inset(0 ${(1 - progress) * 100}% 0 0)`;
      case 'right-left':
        return `inset(0 0 0 ${(1 - progress) * 100}%)`;
      case 'center-out':
        const scale = progress;
        return `circle(${scale * 70}% at 50% 50%)`;
      default:
        return `inset(${(1 - progress) * 100}% 0 0 0)`;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-transparent border-2 border-orange-500 text-orange-500';
      case 'secondary':
        return 'bg-transparent border-2 border-gray-400 text-gray-300';
      case 'ghost':
        return 'bg-transparent border-2 border-orange-500/50 text-orange-500';
      default:
        return 'bg-transparent border-2 border-orange-500 text-orange-500';
    }
  };

  const getLiquidColors = () => {
    switch (variant) {
      case 'primary':
        return 'from-orange-500 to-orange-400';
      case 'secondary':
        return 'from-gray-400 to-gray-700';
      case 'ghost':
        return 'from-orange-400/80 to-gray-700/80';
      default:
        return 'from-orange-500 to-orange-400';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'md':
        return 'px-6 py-3 text-base';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const buttonClasses = `
    relative overflow-hidden font-medium rounded-xl transition-all duration-300
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${isHovered ? 'scale-105 shadow-xl' : 'scale-100 shadow-md'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const ButtonContent = () => (
    <>
      {/* Liquid Fill Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${getLiquidColors()} transition-all duration-300`}
        style={{
          clipPath: getLiquidClipPath(),
          opacity: fillProgress > 0 ? 1 : 0
        }}
      />

      {/* Content */}
      <span className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${fillProgress > 0.5 ? 'text-white' : ''
        }`}>
        {Icon && (
          <Icon
            size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20}
            className="transition-transform duration-300"
          />
        )}
        <span>{children}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <ButtonContent />
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={buttonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      disabled={disabled}
    >
      <ButtonContent />
    </button>
  );
};

export default LiquidFillButton;