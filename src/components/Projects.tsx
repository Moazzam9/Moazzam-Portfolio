git import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Filter, Send } from 'lucide-react';
import LiquidFillButton from './LiquidFillButton';
import LaunchKitImage from '../../1.JPG';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  // 3D card hover state
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardStyle, setCardStyle] = useState<{ [key: number]: React.CSSProperties }>({});
  const [loading, setLoading] = useState(false);

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

    return () => {
      observer.disconnect();
    };
  }, []);

  const filters = ['All', 'Web', 'Mobile', 'Desktop'];

  const projects = [
    {
      id: 1,
      title: 'Launch kit',
      description: 'Website designs and development for a startup company.',
      image: '/1.webp',
      tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Supabase'],
      category: 'Web',
      demoLink: 'https://launch-kits.vercel.app/',
      codeLink: 'https://github.com/Moazzam9/launch-kits',
      gradient: 'from-orange-500 to-orange-400'
    },
    {
      id: 2,
      title: 'Airline Management System',
      description: 'Java-based desktop application for managing airline reservations and bookings.',
      image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Java', 'Swing', 'MySQL', 'JDBC'],
      category: 'Desktop',
      demoLink: '#',
      codeLink: '#',
      gradient: 'from-gray-700 to-black'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with React and Tailwind CSS.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      category: 'Web',
      demoLink: '#',
      codeLink: '#',
      gradient: 'from-orange-400 to-gray-900'
    },
    {
      id: 4,
      title: 'Task Management App',
      description: 'A mobile-first task management application with real-time collaboration features.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React Native', 'Firebase', 'Redux', 'AsyncStorage'],
      category: 'Mobile',
      demoLink: '#',
      codeLink: '#',
      gradient: 'from-black to-gray-800'
    },
    {
      id: 5,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Node.js', 'Express', 'Firebase ', 'Stripe API'],
      category: 'Web',
      demoLink: '#',
      codeLink: '#',
      gradient: 'from-orange-600 to-orange-400'
    },
    {
      id: 6,
      title: 'Weather Forecast App',
      description: 'Mobile weather application with location-based forecasts and beautiful UI.',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Flutter', 'Dart', 'Weather API', 'SQLite'],
      category: 'Mobile',
      demoLink: '#',
      codeLink: '#',
      gradient: 'from-gray-900 to-black'
    },
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;
    setCardStyle((prev) => ({
      ...prev,
      [index]: {
        transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`,
        boxShadow: '0 12px 32px 0 rgba(251,146,60,0.25), 0 2px 8px 0 rgba(0,0,0,0.10)',
        zIndex: 2,
      },
    }));
    setHoveredCard(index);
  };

  const handleMouseLeave = (index: number) => {
    setCardStyle((prev) => ({ ...prev, [index]: { transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)', boxShadow: '', zIndex: 1 } }));
    setHoveredCard(null);
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured <span className="text-orange-500">Projects</span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              A showcase of my recent work and creative solutions
            </p>
          </div>

          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mr-4">
              <Filter size={20} />
              <span className="font-medium">Filter:</span>
            </div>
            {filters.map((filter) => (
              <LiquidFillButton
                key={filter}
                variant={activeFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                fillDirection="center-out"
                animationDuration={400}
                onClick={() => setActiveFilter(filter)}
                className="min-w-[80px]"
              >
                {filter}
              </LiquidFillButton>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-500 transform-gpu ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={cardStyle[index] || {}}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-200/80 to-transparent dark:from-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className={`bg-gradient-to-r ${project.gradient} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 relative">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <LiquidFillButton
                      variant="primary"
                      size="sm"
                      icon={ExternalLink}
                      fillDirection="left-right"
                      animationDuration={500}
                      href={project.demoLink}
                      className="flex-1"
                    >
                      Demo
                    </LiquidFillButton>
                    <LiquidFillButton
                      variant="secondary"
                      size="sm"
                      icon={Github}
                      fillDirection="right-left"
                      animationDuration={500}
                      href={project.codeLink}
                      className="flex-1"
                    >
                      Code
                    </LiquidFillButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;