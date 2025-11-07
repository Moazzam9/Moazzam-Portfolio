import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, ChevronDown, Code, Sparkles, Mail, MousePointerClick } from 'lucide-react';
import LiquidFillButton from './LiquidFillButton';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const roles = [
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Tech Enthusiast'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    { icon: Code, delay: 0, position: 'top-20 left-20', text: 'React' },
    { icon: Sparkles, delay: 1, position: 'top-40 right-32', text: 'TypeScript' },
    { icon: Code, delay: 2, position: 'bottom-40 left-32', text: 'Node.js' },
    { icon: Sparkles, delay: 0.5, position: 'bottom-20 right-20', text: 'Next.js' },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-black"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/5 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-orange-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* 3D Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating code icons with text */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element.position} group`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isInView ? 0.8 : 0,
              y: isInView ? [0, -15, 0] : 20,
              x: mousePosition.x * (0.01 + index * 0.003)
            }}
            transition={{
              y: {
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              },
              x: {
                duration: 0.1,
                ease: "linear"
              },
              opacity: { duration: 0.5, delay: index * 0.2 }
            }}
          >
            <div className="relative">
              <element.icon
                size={40}
                className="text-orange-400/80 dark:text-orange-500/80 transition-all duration-300 group-hover:text-orange-500 group-hover:scale-110"
              />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {element.text}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Animated shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isInView ? 0.1 : 0,
            rotate: 360,
            x: mousePosition.x * 0.01
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            opacity: { duration: 1, delay: 0.5 }
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-transparent rounded-full opacity-20"></div>
        </motion.div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
        <motion.div 
          className="text-center max-w-5xl mx-auto w-full"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={container}
        >
          <motion.div 
            className="relative"
            variants={item}
          >
            {/* Glowing background effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-orange-100/40 to-orange-300/40 dark:from-orange-400/20 dark:to-orange-500/20 blur-3xl rounded-full transform scale-150"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isInView ? 1 : 0,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatType: "reverse"
              }}
            ></motion.div>

            <motion.h1 
              className="relative text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-2 font-light"
              variants={item}
            >
              Hi, I'm
            </motion.h1>
            
            <motion.h2 
              className="relative text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-3 leading-tight"
              variants={item}
            >
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                Moazzam
              </span>{' '}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700">
                Azam
              </span>
            </motion.h2>
            
            <motion.div 
              className="relative h-12 sm:h-14 md:h-16 mb-4"
              variants={item}
            >
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentTextIndex}
                  className="absolute inset-0 text-lg xs:text-xl sm:text-2xl md:text-3xl text-orange-500 font-medium"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {roles[currentTextIndex]}
                </motion.h3>
              </AnimatePresence>
            </motion.div>
            
            <motion.p 
              className="relative text-base xs:text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={item}
            >
              Bachelor's in Computer Science at COMSATS University Islamabad.
              Crafting digital experiences that make an impact through clean, efficient code.
            </motion.p>
          </motion.div>

          {/* Action Button */}
          <motion.div 
            className="flex justify-center mb-8 sm:mb-16"
            variants={item}
          >
            <LiquidFillButton
              variant="primary"
              size="lg"
              icon={Mail}
              fillDirection="bottom-up"
              animationDuration={600}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-4 text-lg group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="flex items-center justify-center gap-2">
                Get In Touch
                <motion.span
                  animate={isHovered ? { x: [0, 4, 0] } : { x: 0 }}
                  transition={{ repeat: isHovered ? Infinity : 0, duration: 1.5 }}
                >
                  
                </motion.span>
              </span>
            </LiquidFillButton>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-16 relative z-10"
            variants={item}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="group relative p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon size={24} className="relative z-10" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 20
            }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.button
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex flex-col items-center text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 group"
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <span className="text-sm font-medium mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Scroll Down
              </span>
              <ChevronDown size={24} className="group-hover:scale-125 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Blob animation styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default Hero;