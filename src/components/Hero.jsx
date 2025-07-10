import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../config';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center relative overflow-hidden">
      {/* Subtle background animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bg-primary/20 rounded-full w-96 h-96 -top-20 -left-20 animate-pulse" />
        <div className="absolute bg-secondary/20 rounded-full w-96 h-96 -bottom-20 -right-20 animate-pulse delay-1000" />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-primary">{personalInfo.name}</span>
        </h1>
        <p className="text-2xl md:text-3xl mb-8 font-light">{personalInfo.title}</p>
        <p className="max-w-2xl mx-auto mb-8">
          I build modern, responsive, and elegant web applications from front to back.
        </p>
        <div className="space-x-4">
          <a href="#projects" className="bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-300">
            View Projects
          </a>
          <a href="#contact" className="bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-300">
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
