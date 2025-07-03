import React, { useEffect, useState } from 'react';

const Skills: React.FC = () => {
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
    // eslint-disable-next-line
  }, []);

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Technical <span className="text-orange-500">Skills</span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Here are the technologies and tools I work with to bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-800 dark:text-gray-200 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-orange-500 font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r from-orange-600 to-orange-500 h-2 rounded-full transition-all duration-1000 ease-out ${glow[categoryIndex][skillIndex] ? 'shadow-[0_0_16px_4px_rgba(234,88,12,0.8)]' : ''}`}
                          style={{ width: `${fillLevels[categoryIndex][skillIndex]}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;