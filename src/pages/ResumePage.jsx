import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { personalInfo } from '../config';
import ParticlesBackground from '../components/ParticlesBackground';

// Lazy PDF Viewer Component
const LazyPDFViewer = ({ src, title, className }) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!isInView && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center rounded-lg">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-gray-600 dark:text-gray-300">Loading PDF...</div>
          </div>
        </div>
      )}
      
      {isInView && (
        <iframe 
          src={`${src}#toolbar=0`} 
          title={title}
          className="w-full h-full rounded-lg"
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
    </div>
  );
};

const ResumePage = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      
      <div className="container mx-auto px-4 text-center">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          My Resume
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Here you can view or download my latest resume.
        </motion.p>
        <a
            href={personalInfo.resume}
            download="M-Rabi-Kiran-Resume.pdf"
            className="inline-flex items-center gap-2 bg-primary text-white py-3 px-8 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-300"
        >
            <FaDownload />
            Download Resume
        </a>
        <motion.div 
          className="mt-12 w-full max-w-4xl mx-auto h-[75vh] rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
            <LazyPDFViewer 
                src={personalInfo.resume}
                title="Resume"
                className="w-full h-full"
            />
        </motion.div>
      </div>
    </section>
  );
};

export default ResumePage;
