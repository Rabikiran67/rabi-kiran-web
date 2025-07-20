import React from 'react';
import { motion } from 'framer-motion';
// Import the new categorized skill arrays
import { professionalSkills, mlAiSkills, tools } from '../config';
import ShootingStars from './ShootingStars';

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
    <div className="mb-16 sm:mb-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
        {items.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="p-4 sm:p-6 h-24 sm:h-28 md:h-32 flex flex-col items-center justify-center text-center rounded-lg border border-primary/20 bg-dark-container
                       hover:border-primary hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-2 transition-all duration-300 touch-manipulation"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {skill.icon ? (
              (() => {
                const Icon = skill.icon;
                return <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white mb-2" />;
              })()
            ) : (
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">{skill.text}</span>
            )}
            <p className="text-xs sm:text-sm text-gray-300 leading-tight">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      <ShootingStars />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Traditional Skill Grids */}
        <div className="text-center">
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
      </div>
    </section>
  );
};

export default Skills;
