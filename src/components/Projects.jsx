
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../config';
import LazyImage from './LazyImage';

const Projects = () => {
  return (
    <section id="projects" className="relative pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8">
      
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 mt-4 sm:mt-8 bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            My Projects
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore my latest work and creative solutions. Each project represents a unique challenge and showcases different technologies and approaches.
          </motion.p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="group rounded-xl overflow-hidden shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-2 border-transparent hover:border-purple-500 dark:hover:border-purple-400 flex flex-col cursor-pointer hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            {/* Image with hover overlay */}
            <div className="relative overflow-hidden group">
              <LazyImage 
                src={project.image} 
                alt={project.title} 
                className="w-full h-40 sm:h-48 md:h-56 group-hover:scale-110 transition-transform duration-500" 
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{project.title}</div>
                  <div className="text-xs sm:text-sm opacity-90">Click to view details</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                {project.title}
              </h3>
              <p className="font-body mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300 leading-relaxed text-sm sm:text-base">
                {project.description}
              </p>
              
              {/* Tags with hover effects */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                {project.tags.slice(0, 4).map(tag => (
                  <span 
                    key={tag} 
                    className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300 hover:bg-purple-600 hover:text-white hover:scale-105 border border-purple-200 dark:border-purple-700"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
              
              {/* Links with enhanced hover effects */}
              <div className="flex space-x-4 sm:space-x-6 mt-auto">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1 sm:gap-2 text-white hover:text-purple-200 transition-all duration-300 hover:scale-110 transform text-sm sm:text-base"
                  >
                    <FaExternalLinkAlt size={16} className="sm:w-5 sm:h-5" />
                    <span className="font-medium text-white">Live Demo</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1 sm:gap-2 text-white hover:text-purple-200 transition-all duration-300 hover:scale-110 transform text-sm sm:text-base"
                  >
                    <FaGithub size={16} className="sm:w-5 sm:h-5" />
                    <span className="font-medium text-white">Code</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
