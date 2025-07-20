// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiSettings } from 'react-icons/fi';
import SpotifyCard from './SpotifyCard'; // Import the new component
import ShootingStars from './ShootingStars';

const About = () => {

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <ShootingStars />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Column: Text Content (takes up 3/5 of the space) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="flex items-center gap-4 text-4xl lg:text-5xl font-bold mb-8">
              <FiSettings className="animate-spin-slow" /> Behind the <span className="text-primary">Code</span>
            </h2>
            <div className="space-y-6 text-lg text-dark-text/80 dark:text-gray-300 font-body">
              {/* Replace with your own information */}
              <p>
                Hi everyone! I'm <span className="text-primary font-semibold">Rabi Kiran</span>, from Berhampur, India.
              </p>
              <p>
                I completed my Bachelor of Technology in Electrical & Electronics Engineering at NIST, Berhampur.
              </p>
              <p>
                I find joy in bridging imagination and implementation through thoughtful engineering.
              </p>
              <div>
                <p>Outside of programming, I enjoy:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Gaming</li>
                                      <li>Traveling</li>
                    <li>Snapping photos</li>
                    <li>Listening Songs</li>
             
                </ul>
              </div>
              <blockquote className="border-l-4 border-secondary pl-4 italic text-secondary/90">
                "Striving to learn, build, and create things that truly make a difference."
              </blockquote>
            </div>
          </motion.div>

          {/* Right Column: Circle with Spotify Card (takes up 2/5 of the space) */}
          <motion.div
            className="lg:col-span-2 relative h-96 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* The subtle dark circle in the background */}
            <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-xl"></div>
            
            {/* The Spotify Card */}
            <SpotifyCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
