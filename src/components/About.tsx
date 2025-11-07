import React, { useEffect, useState, useRef } from 'react';
import { Code, Users, Award, Coffee, Sparkles, Code2, Cpu, Rocket } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import LiquidFillButton from './LiquidFillButton';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      setIsVisible(true);
    }
  }, [controls, isInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { 
      customIcon: true,
      icon: () => (
        <div className="bg-white p-1.5 rounded-full">
          <img 
            src="/complete.png" 
            alt="Projects Completed" 
            className="w-7 h-7 object-contain"
          />
        </div>
      ),
      label: 'Projects Completed', 
      value: '50+', 
      color: 'from-orange-400 to-orange-600' 
    },
    { 
      customIcon: true,
      icon: () => (
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
          <img 
            src="/user-avatar.png" 
            alt="Happy Client" 
            className="w-full h-full object-cover"
          />
        </div>
      ),
      label: 'Happy Clients', 
      value: '15+', 
      color: 'from-orange-400 to-orange-600' 
    },
    { 
      customIcon: true,
      icon: () => (
        <div className="bg-white p-1.5 rounded-full">
          <img 
            src="/certificate.png" 
            alt="Certificate" 
            className="w-7 h-7 object-contain"
          />
        </div>
      ),
      label: 'Certifications', 
      value: '5+', 
      color: 'from-orange-400 to-orange-600' 
    },
    { 
      customIcon: true,
      icon: () => (
        <div className="bg-white p-1.5 rounded-full">
          <img 
            src="/coffee-cup.png" 
            alt="Coffee Cup" 
            className="w-7 h-7 object-contain"
          />
        </div>
      ),
      label: 'Cups of Coffee', 
      value: '500+', 
      color: 'from-orange-400 to-orange-600' 
    },
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
    <section ref={sectionRef} id="about" className="py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/5 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-orange-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={container}
        >
          <motion.div 
            className="text-center mb-16"
            variants={item}
          >
            <div className="inline-flex items-center justify-center mb-4 px-6 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              About Me
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Crafting Digital <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Experiences</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Turning ideas into reality through clean, efficient code and innovative solutions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div 
              className="relative group"
              variants={item}
            >
              <div className="w-full max-w-md mx-auto relative">
                <div className="aspect-square bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-1.5 shadow-xl">
                  <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <img 
                      src="/profile.jpeg" 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-2xl font-bold mb-1">Moazzam Azam</h3>
                        <p className="text-orange-300">Full Stack Developer</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -z-10 -top-4 -left-4 w-full h-full bg-orange-600/20 rounded-2xl group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                
                {/* Floating tech icons */}
                <div className="absolute -top-6 -right-6 w-14 h-14 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <Code2 className="w-6 h-6 text-orange-500" />
                </div>
                <div className="absolute -bottom-4 -left-6 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg group-hover:-rotate-12 transition-transform duration-500">
                  <Cpu className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            </motion.div>

            {/* About Content */}
            <motion.div 
              className="space-y-6"
              variants={item}
            >
              <div className="space-y-6">
                <h3 className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-white leading-tight">
                  Building the Future, <span className="text-orange-500">One Line of Code</span> at a Time
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  I'm a passionate Computer Science student at COMSATS University Islamabad, dedicated to crafting innovative digital solutions. My journey in technology began with a simple curiosity about how things work, which has since evolved into a deep love for creating applications that solve real-world problems.
                </p>
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border-l-4 border-orange-500">
                  <p className="text-slate-700 dark:text-orange-100 italic">
                    "The best way to predict the future is to implement it." - Alan Kay
                  </p>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  When I'm not immersed in code, you'll find me exploring emerging technologies, contributing to open-source projects, or sharing my knowledge through tech blogs. I'm a firm believer in continuous learning and staying at the forefront of industry trends to deliver cutting-edge solutions.
                </p>
              </div>

              {/* Skills/Tech Stack */}
              <div className="pt-2">
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Technologies I Work With:</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'Tailwind CSS', 'Git', 'Docker'].map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 rounded-full border border-orange-100 dark:border-orange-900 text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <LiquidFillButton
                  variant="primary"
                  size="lg"
                  fillDirection="left-right"
                  animationDuration={600}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group"
                >
                  <span className="flex items-center gap-2">
                    Let's Work Together
                    <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </LiquidFillButton>
                <LiquidFillButton
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/My-cv.pdf';
                    link.download = 'Moazzam-Azam-CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download CV
                </LiquidFillButton>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            variants={container}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group cursor-pointer"
                variants={item}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-orange-500/20`}>
                  {stat.customIcon ? (
                    <div className="bg-white/90 p-2.5 rounded-xl">
                      <stat.icon />
                    </div>
                  ) : (
                    <stat.icon className="text-white" size={28} />
                  )}
                </div>
                <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;