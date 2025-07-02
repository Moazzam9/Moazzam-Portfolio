import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  const educationItems = [
    {
      title: 'Bachelor of Computer Science',
      institution: 'COMSATS University Islamabad',
      period: '2021 - 2025',
      description: 'Focusing on software engineering, web development, and computer systems. Maintaining a strong academic record while actively participating in coding competitions.',
      type: 'education'
    },
    {
      title: 'Intermediate in Computer Science',
      institution: 'Punjab Group of Colleges',
      period: '2019 - 2021',
      description: 'Completed pre-engineering with computer science subjects. Developed foundation in programming and mathematics.',
      type: 'education'
    }
  ];

  const certifications = [
    {
      title: 'React Developer Certification',
      institution: 'Meta via Coursera',
      period: '2023',
      description: 'Comprehensive course covering React fundamentals, hooks, state management, and modern development practices.',
      type: 'certification'
    },
    {
      title: 'JavaScript Algorithms and Data Structures',
      institution: 'freeCodeCamp',
      period: '2023',
      description: 'In-depth study of JavaScript programming, algorithms, and data structures with hands-on projects.',
      type: 'certification'
    },
    {
      title: 'Responsive Web Design',
      institution: 'freeCodeCamp',
      period: '2022',
      description: 'Learned HTML5, CSS3, Flexbox, Grid, and responsive design principles through practical projects.',
      type: 'certification'
    },
    {
      title: 'WordPress Development',
      institution: 'Udemy',
      period: '2022',
      description: 'Custom theme development, plugin creation, and WordPress best practices for dynamic websites.',
      type: 'certification'
    },
    {
      title: 'Database Design and Management',
      institution: 'Stanford Online',
      period: '2022',
      description: 'Comprehensive course on database design, SQL, normalization, and database optimization techniques.',
      type: 'certification'
    }
  ];

  const allItems = [...educationItems, ...certifications].sort((a, b) => {
    const yearA = parseInt(a.period.split(' - ')[0] || a.period);
    const yearB = parseInt(b.period.split(' - ')[0] || b.period);
    return yearB - yearA;
  });

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Education & <span className="text-orange-500">Certifications</span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              My academic journey and professional development milestones
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-500 transform md:-translate-x-px"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {allItems.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-orange-500 rounded-full transform -translate-x-2 md:-translate-x-2 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    }`}>
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-lg ${item.type === 'education' ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
                          {item.type === 'education' ? <GraduationCap size={20} /> : <Award size={20} />}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Calendar size={16} />
                          <span className="text-sm font-medium">{item.period}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <h4 className="text-orange-500 font-semibold mb-3">
                        {item.institution}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;