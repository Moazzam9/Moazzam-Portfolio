import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Instagram, ChevronDown, Code, Sparkles, Download, Mail } from 'lucide-react';
import LiquidFillButton from './LiquidFillButton';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Moazzam9', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/moazzam-azam-963778316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const floatingElements = [
    { icon: Code, delay: 0, position: 'top-20 left-20' },
    { icon: Sparkles, delay: 1, position: 'top-40 right-32' },
    { icon: Code, delay: 2, position: 'bottom-40 left-32' },
    { icon: Sparkles, delay: 0.5, position: 'bottom-20 right-20' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800"></div>

      {/* 3D Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large floating cube */}
        <div
          className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10 dark:opacity-5"
          style={{
            transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-400 dark:from-orange-500 dark:to-orange-700 rounded-3xl animate-float shadow-2xl transform-gpu perspective-1000 rotate-12"></div>
        </div>

        {/* Medium floating sphere */}
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 opacity-15 dark:opacity-10"
          style={{
            transform: `translate3d(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px, 0) rotateX(${mousePosition.y * -0.15}deg) rotateY(${mousePosition.x * -0.15}deg)`,
            transition: 'transform 0.1s ease-out',
            animationDelay: '1s'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 rounded-full animate-float shadow-xl transform-gpu"></div>
        </div>

        {/* Small floating triangle */}
        <div
          className="absolute bottom-1/3 left-1/3 w-16 h-16 opacity-20 dark:opacity-15"
          style={{
            transform: `translate3d(${mousePosition.x * 0.04}px, ${mousePosition.y * 0.04}px, 0) rotateZ(${mousePosition.x * 0.2}deg)`,
            transition: 'transform 0.1s ease-out',
            animationDelay: '2s'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-300 dark:from-orange-400 dark:to-orange-600 transform rotate-45 animate-float shadow-lg"></div>
        </div>

        {/* Floating code icons */}
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} opacity-20 dark:opacity-10`}
            style={{
              transform: `translate3d(${mousePosition.x * (0.01 + index * 0.005)}px, ${mousePosition.y * (0.01 + index * 0.005)}px, 0)`,
              transition: 'transform 0.1s ease-out',
              animationDelay: `${element.delay}s`
            }}
          >
            <element.icon
              size={32}
              className="text-orange-400 dark:text-orange-500 animate-float"
              style={{ animationDelay: `${element.delay}s` }}
            />
          </div>
        ))}
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.08'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }}></div>
      <div className="absolute inset-0 opacity-0 dark:opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '60px 60px' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Content */}
          <div className={`transition-all duration-1000 transform-gpu ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
            <div className="relative">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100/40 to-orange-300/40 dark:from-orange-400/20 dark:to-orange-500/20 blur-3xl rounded-full transform scale-150 animate-pulse"></div>

              <h1 className="relative text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-2 font-light">
                Hi, I'm
              </h1>
              <h2 className="relative text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                <span className="inline-block">
                  Moazzam
                </span>{' '}
                <span className="inline-block text-orange-500">
                  Azam
                </span>
              </h2>
              <h3 className="relative text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-800 dark:text-gray-200 mb-5 font-medium">
                Computer Science Student & Developer
              </h3>
              <p className="relative text-base xs:text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                Bachelor's in Computer Science at COMSATS University Islamabad.
                Passionate about creating innovative web and mobile solutions that make a difference.
              </p>
            </div>
          </div>

          {/* Liquid Fill Action Buttons */}
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <LiquidFillButton
              variant="primary"
              size="lg"
              icon={Mail}
              fillDirection="bottom-up"
              animationDuration={600}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </LiquidFillButton>

            <LiquidFillButton
              variant="secondary"
              size="lg"
              icon={Download}
              fillDirection="left-right"
              animationDuration={700}
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/My-cv.pdf';
                link.download = 'Moazzam-CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download CV
            </LiquidFillButton>
          </div>

          {/* Social Links */}
          <div className={`flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="group relative p-4 bg-gray-100 dark:bg-slate-800/50 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
              >
                <social.icon size={24} className="relative z-10" />
              </a>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className={`animate-bounce transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;