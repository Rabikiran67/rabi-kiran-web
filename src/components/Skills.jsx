import React from 'react';
import { motion } from 'framer-motion';
import {
  programmingLanguages,
  backendSkills,
  frontendSkills,
  databaseSkills,
  toolsVersionControl,
  conceptSkills
} from '../config';
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

  const renderCategory = (heading, data) => (
    <div className="mb-14 sm:mb-16">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
        {heading}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-5 md:gap-6">
        {data.map((skill, i) => (
          <motion.div
            key={skill.name + i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="p-3 sm:p-4 h-24 sm:h-28 md:h-32 flex flex-col items-center justify-center rounded-lg border border-primary/20 bg-dark-container hover:border-primary hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-2 transition-all duration-300"
          >
            {skill.icon && (() => { const Icon = skill.icon; return <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white mb-2" /> })()}
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-gray-300 font-medium text-center leading-snug">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      <ShootingStars />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {renderCategory('🧑‍💻 Tech Stack & Frameworks', [
            ...programmingLanguages,
            ...frontendSkills,
            ...backendSkills
          ])}
          {renderCategory('🗄️ Database', databaseSkills)}
          {renderCategory('🛠️ Tools & Platforms', toolsVersionControl)}
          {renderCategory('📚 Concepts', conceptSkills)}
        </div>
      </div>
    </section>
  );
};

export default Skills;
