import React, { useEffect, useState, useRef } from 'react';
import { Code, Users, Award, Coffee } from 'lucide-react';
import LiquidFillButton from './LiquidFillButton';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

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
    { icon: Code, label: 'Projects Completed', value: '15+', color: 'from-blue-400 to-blue-600' },
    { icon: Users, label: 'Happy Clients', value: '8+', color: 'from-green-400 to-green-600' },
    { icon: Award, label: 'Certifications', value: '5+', color: 'from-purple-400 to-purple-600' },
    { icon: Coffee, label: 'Cups of Coffee', value: '500+', color: 'from-orange-400 to-orange-600' },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-10 right-10 w-64 h-64 opacity-5 dark:opacity-3"
          style={{
            transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About <span className="text-orange-500">Me</span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate developer with a drive for creating exceptional digital experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
           <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
  <div className="w-full max-w-md mx-auto relative group">
    <div className="aspect-square bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-1">
      <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {/* Replace emoji with profile image */}
        <img 
          src="/profile.jpeg" 
          alt="Profile" 
          className="w-full h-full object-cover rounded-2xl" 
        />
      </div>
    </div>
    <div className="absolute -z-10 top-8 left-8 w-full h-full bg-orange-600/20 rounded-2xl"></div>
  </div>
</div>

            {/* About Content */}
            <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                Building the Future, One Line of Code at a Time
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                I'm a Computer Science student at COMSATS University Islamabad with a passion for
                developing innovative solutions. My journey in tech began with curiosity about how
                things work, and has evolved into a love for creating applications that solve real-world problems.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source
                projects, or sharing my knowledge through tech blogs. I believe in continuous learning
                and staying updated with the latest industry trends.
              </p>

              {/* Call to Action */}
              <div className="pt-4">
                <LiquidFillButton
                  variant="primary"
                  size="md"
                  fillDirection="left-right"
                  animationDuration={600}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Let's Work Together
                </LiquidFillButton>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-125 transition-all duration-500 shadow-lg`}>
                  <stat.icon className="text-white" size={28} />
                </div>
                <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;