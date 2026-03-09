import React, { useState, useEffect, useRef } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface LiquidFillButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: typeof LucideIcon;
  className?: string;
  disabled?: boolean;
  fillDirection?: 'bottom-up' | 'top-down' | 'left-right' | 'right-left' | 'center-out';
  animationDuration?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
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
  animationDuration = 600,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = isHovered ? animationDuration : animationDuration * 0.7;
    const startProgress = fillProgress;
    const targetProgress = isHovered ? 1 : 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      
      // Ease-in-out-quad easing (matches original smooth animation)
      const easedProgress = linearProgress < 0.5
        ? 2 * linearProgress * linearProgress
        : 1 - Math.pow(-2 * linearProgress + 2, 2) / 2;
      
      const currentProgress = startProgress + (targetProgress - startProgress) * easedProgress;
      setFillProgress(currentProgress);

      if (linearProgress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isHovered, animationDuration]);

  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onMouseLeave?.();
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
        return `circle(${progress * 70}% at 50% 50%)`;
      default:
        return `inset(${(1 - progress) * 100}% 0 0 0)`;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `bg-transparent border-2 border-orange-500 text-orange-500 hover:text-white`;
      case 'secondary':
        return 'bg-transparent border-2 border-gray-400 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white';
      case 'ghost':
        return 'bg-transparent border-2 border-orange-500/50 text-orange-500 hover:text-white';
      default:
        return 'bg-transparent border-2 border-orange-500 text-orange-500 hover:text-white';
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
    group
  `;

  const ButtonContent = () => (
    <>
      {/* Liquid Fill Background with RAF animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${getLiquidColors()}`}
        style={{
          clipPath: getLiquidClipPath(),
          opacity: fillProgress > 0 ? 1 : 0,
          transition: 'opacity 0.1s ease-out',
          willChange: 'clip-path',
          pointerEvents: 'none'
        }}
      />

      {/* Content */}
      <span className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${fillProgress > 0.5 ? 'text-white' : ''}`}>
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <ButtonContent />
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
    >
      <ButtonContent />
    </button>
  );
};

export default LiquidFillButton;