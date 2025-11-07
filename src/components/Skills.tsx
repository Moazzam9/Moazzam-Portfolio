import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Cpu, Zap, ChevronRight } from 'lucide-react';

const Skills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

  const iconMap = {
    'Frontend Development': <Code className="w-6 h-6" />,
    'Backend Development': <Cpu className="w-6 h-6" />,
    'Database & Tools': <Database className="w-6 h-6" />
  };
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'TypeScript', level: 75 },
        { name: 'Tailwind CSS', level: 85 },
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 70 },
        { name: 'Python', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'PHP', level: 70 },
        { name: 'Express.js', level: 65 },
      ]
    },
    {
      title: 'Database & Tools',
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'MongoDB', level: 70 },
        { name: 'Git/GitHub', level: 85 },
        { name: 'WordPress', level: 75 },
        { name: 'Firebase', level: 70 },
      ]
    }
  ];

  // State to animate each skill bar
  const [fillLevels, setFillLevels] = useState(
    skillCategories.map(cat => cat.skills.map(() => 0))
  );
  const [glow, setGlow] = useState(
    skillCategories.map(cat => cat.skills.map(() => false))
  );

  useEffect(() => {
    if (isInView) {
      // Animate each bar
      skillCategories.forEach((cat, catIdx) => {
        cat.skills.forEach((skill, skillIdx) => {
          setTimeout(() => {
            setFillLevels(prev => {
              const updated = prev.map(arr => [...arr]);
              updated[catIdx][skillIdx] = skill.level;
              return updated;
            });
            // Add glow after fill
            setTimeout(() => {
              setGlow(prev => {
                const updated = prev.map(arr => [...arr]);
                updated[catIdx][skillIdx] = true;
                return updated;
              });
            }, 1100);
          }, 300 * (catIdx * 5 + skillIdx));
        });
      });
    }
    // eslint-disable-next-line
  }, [isInView]);

  return (
    <section ref={ref} id="skills" className="py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/5 to-transparent"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={container}
        >
          <motion.div 
            className="text-center mb-16"
            variants={item}
          >
            <div className="inline-flex items-center justify-center mb-4 px-6 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              My Expertise
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Technical <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technologies and tools I use to turn ideas into reality
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div 
                key={categoryIndex} 
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-800"
                variants={item}
                whileHover={{ y: -5 }}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 bg-orange-500/10 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 -ml-12 -mb-12 bg-blue-500/10 rounded-full"></div>
                
                {/* Category header */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 flex items-center justify-center mr-4 text-orange-500">
                    {iconMap[category.title as keyof typeof iconMap]}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                
                {/* Skills list */}
                <div className="space-y-6 relative z-10">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-orange-500 font-bold text-sm bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full relative"
                          initial={{ width: 0 }}
                          animate={{ width: isInView ? `${skill.level}%` : 0 }}
                          transition={{ duration: 1, delay: 0.2 + (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30"></div>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View more button */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                  <button className="flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors group">
                    View all {category.title.split(' ')[0]} skills
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
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
      `}</style>
    </section>
  );
};

export default Skills;