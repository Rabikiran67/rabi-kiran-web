import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
// Import the new components and config data
import { personalInfo, professionalSkills, getHomeCodeString } from '../config';
import CodeBlock from '../components/CodeBlock';

const Home = () => {
  // Generate the code string using our function from the config
  const codeString = getHomeCodeString(personalInfo, professionalSkills);

  return (
    <>
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bg-primary/10 rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 top-1/4 left-1/4 blur-3xl animate-pulse" />
          <div className="absolute bg-secondary/10 rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bottom-1/4 right-1/4 blur-3xl animate-pulse delay-500" />
        </div>
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-1"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
                Hi There! <span className="inline-block animate-wave">👋</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
                I'M <span className="text-primary bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">RABI KIRAN</span>
              </h2>
              <TypeAnimation
                sequence={personalInfo.titles}
                wrapper="h3"
                speed={200}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-secondary"
                repeat={Infinity}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center order-2"
            >
              {/* Replace the old img tag with the new CodeBlock component */}
              <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <CodeBlock codeString={codeString} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">💬 <span className="text-primary">My Story in Bytes</span></h2>
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl text-dark-text/80 dark:text-gray-300 font-body leading-relaxed">
          <p>I fell for programming—and I think it's been falling right back… maybe. 🤷‍♂️</p>
          <p>I'm skilled in <span className="text-primary font-semibold">Java</span>, <span className="text-primary font-semibold">Python</span>, and <span className="text-primary font-semibold">JavaScript</span>, and I thrive on building systems that blend intuitive design with powerful backend architectures.</p>
          <p>My interests span a wide spectrum—from cloud-native applications and scalable infrastructures to intelligent systems powered by machine learning and computer vision tools like <span className="text-primary font-semibold">NLP</span> and <span className="text-primary font-semibold">OpenCV</span>.</p>
          <p>I bring ideas to life using frameworks like <span className="text-primary font-semibold">Next.js</span>, <span className="text-primary font-semibold">Node.js</span>, and <span className="text-primary font-semibold">Spring Boot</span>, paired with platforms like <span className="text-primary font-semibold">Docker</span>, <span className="text-primary font-semibold">Linux</span>, and <span className="text-primary font-semibold">GitHub Actions</span> to deliver reliable, efficient, and forward-thinking solutions.</p>
        </div>
      </div>
    </>
  );
}

export default Home;
