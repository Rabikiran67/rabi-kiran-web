import React from 'react';
import { motion } from 'framer-motion';
// Import the new categorized skill arrays
import { professionalSkills, mlAiSkills, tools } from '../config';

const Skills = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  // Reusable function to render a grid of skill cards
  const renderSkillGrid = (title, items) => (
    <div className="mb-20">
      <h2 className="text-4xl font-bold mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        {items.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="p-6 h-32 flex flex-col items-center justify-center text-center rounded-lg border border-primary/20 bg-dark-container
                       hover:border-primary hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-2 transition-all duration-300"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {skill.icon ? (
              (() => {
                const Icon = skill.icon;
                return <Icon className="w-12 h-12 text-white mb-2" />;
              })()
            ) : (
              <span className="text-2xl font-semibold text-white mb-2">{skill.text}</span>
            )}
            <p className="text-sm text-gray-300">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Render each category using the helper function */}
        {renderSkillGrid(
          <>🧑‍💻 <span className="text-primary"> Tech Stack</span> & <span className="text-primary">Frameworks</span></>, 
          professionalSkills
        )}
        {renderSkillGrid(
          <>🧠 <span className="text-primary">Machine Learning</span> & <span className="text-primary">AI</span></>, 
          mlAiSkills
        )}
        {renderSkillGrid(
          <>🛠️ <span className="text-primary">Tools</span> & <span className="text-primary">Platforms</span></>, 
          tools
        )}
      </div>
    </section>
  );
};

export default Skills;
