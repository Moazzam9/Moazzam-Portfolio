import React, { useState, useEffect, useRef } from 'react';
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
  title: 'NeonForge Gaming Commerce Platform',
  description: 'A futuristic gaming commerce platform built for performance and immersion. NeonForge combines high-speed hardware shopping with gamification, featuring instant-load armory browsing, real-time tactical loadouts, and an XP-based progression system that rewards purchases with perks like priority shipping, beta hardware access, and exclusive gear. Includes secure admin “Overseer” dashboards for managing products, tracking activity, and controlling deployments. Built with a modern AI-ready architecture for future automation and intelligent features.',
  image: '/neonforge.JPG',
  tech: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Firebase', 'Genkit'],
  category: 'Web',
  demoLink: 'https://neonforge-one.vercel.app/',
  codeLink: '#',
  gradient: 'from-gray-900 to-black'
},
    {
      id: 3,
      title: 'LuxeFinds E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
      image: '/2.JPG',
      tech: ['React', 'Express', 'Firebase ', 'Stripe API'],
      category: 'Web',
      demoLink: 'https://luxafinds.vercel.app/',
      codeLink: 'https://github.com/Moazzam9/luxefinds',
      gradient: 'from-orange-600 to-orange-400'
    },
    {
  id: 7,
  title: 'Student Performance Predictor',
  description: 'An interactive machine learning web application that predicts a student’s final exam score based on study habits, sleep patterns, attendance, previous performance, extracurricular activities, class participation, and stress levels. The system uses advanced ML models such as Random Forest (with optional XGBoost) and provides real-time predictions through a Streamlit interface along with data visualizations to analyze how lifestyle and academic factors influence student performance.',
  image: '/SPP.JPG',
  tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Streamlit', 'Matplotlib'],
  category: 'Machine Learning',
  demoLink: 'https://student-performance-predictor-moazzam.streamlit.app/',
  codeLink: 'https://github.com/Moazzam9/student-performance-predictor',
  gradient: 'from-gray-900 to-black'
},
    {
      id: 5,
      title: 'Servify ',
      description: 'Servify Application is a comprehensive service platform that connects users with professional service providers such as plumbers, electricians, carpenters, doctors (for both pets and humans), and event decorators.',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React Native', 'Firebase', 'Redux', 'AsyncStorage'],
      category: 'Mobile',
      demoLink: '#',
      codeLink: '#',
      gradient: 'from-black to-gray-800'
    },
 
     {
  id: 6,
  title: 'Inventory Management System',
  description: 'Desktop-based inventory management system for tracking products, stock levels, sales, and suppliers with a clean dashboard interface.',
  image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800',
  tech: ['React', 'Electron', 'Node.js', 'MySQL'],
  category: 'Desktop',
  demoLink: 'https://ims-zeta-three.vercel.app/',
  codeLink: 'https://github.com/Moazzam9/IMS',
  gradient: 'from-gray-900 to-black'
},
{
  id: 8,
  title: 'Breast Cancer Classification (PyTorch)',
  description: 'A deep learning project that performs binary classification of breast cancer tumors using a PyTorch-based Multi-Layer Perceptron (MLP). Built on the Breast Cancer Wisconsin Diagnostic dataset from scikit-learn, the model uses a neural architecture with a hidden ReLU layer to predict malignant or benign tumors. The training pipeline includes BCEWithLogitsLoss, Adam optimizer, and 100 training epochs, with evaluation through accuracy metrics, confusion matrix analysis, and reproducibility ensured via fixed random seeds.',
  image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
  tech: ['Python', 'PyTorch', 'NumPy', 'Scikit-learn'],
  category: 'Deep Learning',
  demoLink: '#',
  codeLink: 'https://github.com/Moazzam9/cancer-classifier',
  gradient: 'from-gray-900 to-black'
},
  {
      id: 7,
      title: 'Zebra Puzzle Game',
      description: 'The application provides an engaging user interface for solving various logic puzzles while offering features like puzzle selection, hints, and real-time feedback.',
      image: '/3.jpg',
      tech: ['React', 'Python'],
      category: 'Web',
      demoLink: 'https://github.com/Moazzam9/Zebra-Puzzle-Game/tree/master',
      codeLink: 'https://github.com/Moazzam9/Zebra-Puzzle-Game/tree/master',
      gradient: 'from-orange-600 to-orange-400'
    }
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