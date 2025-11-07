import React, { useEffect, useRef } from 'react';
import { GraduationCap, Award, Calendar, Code, Globe, BookOpen, Zap } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Education: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const educationItems = [
    {
      title: 'Bachelor of Computer Science',
      institution: 'COMSATS University Islamabad',
      period: '2022 - present',
      description: 'Focusing on software engineering, web development, and computer systems. Maintaining a strong academic record while actively participating in coding competitions.',
      type: 'education',
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      title: 'FSC Pre Engineering',
      institution: 'Scholar Science Colleges',
      period: '2019 - 2021',
      description: 'Completed pre-engineering with computer science subjects. Developed foundation in programming and mathematics.',
      type: 'education',
      icon: <BookOpen className="w-5 h-5" />
    }
  ];

  const certifications = [
    {
      title: 'React Developer Certification',
      institution: 'Meta via Coursera',
      period: '2023',
      description: 'Comprehensive course covering React fundamentals, hooks, state management, and modern development practices.',
      type: 'certification',
      icon: <Code className="w-5 h-5" />
    },
    {
      title: 'HTML, CSS, JavaScript Algorithms and Data Structures',
      institution: 'freeCodeCamp',
      period: '2024',
      description: 'In-depth study of JavaScript programming, algorithms, and data structures with hands-on projects.',
      type: 'certification',
      icon: <Code className="w-5 h-5" />
    },
    {
      title: 'Responsive Web Design',
      institution: 'freeCodeCamp',
      period: '2022',
      description: 'Learned HTML5, CSS3, Flexbox, Grid, and responsive design principles through practical projects.',
      type: 'certification',
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: 'WordPress Development',
      institution: 'Udemy',
      period: '2022',
      description: 'Custom theme development, plugin creation, and WordPress best practices for dynamic websites.',
      type: 'certification',
      icon: <Zap className="w-5 h-5" />
    },
  ];

  const allItems = [...educationItems, ...certifications].sort((a, b) => {
    const yearA = parseInt(a.period.split(' - ')[0] || a.period);
    const yearB = parseInt(b.period.split(' - ')[0] || b.period);
    return yearB - yearA;
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="education" className="py-20 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={container}
          ref={ref}
        >
          <motion.div 
            className="text-center mb-16"
            variants={item}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Education & <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Certifications</span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              My academic journey and professional development milestones
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-orange-600 transform md:-translate-x-px"></div>

            {/* Timeline Items */}
            <motion.div 
              className="space-y-12"
              variants={container}
            >
              {allItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  variants={item}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full transform -translate-x-2.5 md:-translate-x-2.5 flex items-center justify-center z-10 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className={`relative group bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden
                      border-l-4 ${item.type === 'education' ? 'border-orange-500' : 'border-orange-400'}`}>
                      {/* Animated background highlight */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.type === 'education' ? 'from-orange-50 to-orange-50' : 'from-orange-50 to-orange-50/80'} dark:from-gray-800 dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0`}></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            item.type === 'education' 
                              ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' 
                              : 'bg-orange-100/80 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
                          }`}>
                            {item.type === 'education' ? 'Education' : 'Certification'}
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <Calendar size={16} className="text-orange-500" />
                            <span className="text-sm font-medium">{item.period}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-2 rounded-lg ${item.type === 'education' ? 'bg-orange-100 text-orange-600' : 'bg-orange-100/80 text-orange-500'} dark:bg-opacity-20`}>
                            {item.icon}
                          </div>
                          <h4 className="font-semibold text-orange-600 dark:text-orange-400">
                            {item.institution}
                          </h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;

// Add these styles to your global CSS file or a style tag in your component
const styles = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
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
`;

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}