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
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bg-primary/10 rounded-full w-96 h-96 top-1/4 left-1/4 blur-3xl animate-pulse" />
          <div className="absolute bg-secondary/10 rounded-full w-96 h-96 bottom-1/4 right-1/4 blur-3xl animate-pulse delay-500" />
        </div>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Hi There! <span className="inline-block animate-wave">👋</span>
              </h1>
              <h2 className="text-4xl lg:text-6xl font-extrabold mb-6">
                I'M <span className="text-primary">RABI KIRAN</span>
              </h2>
              <TypeAnimation
                sequence={personalInfo.titles}
                wrapper="h3"
                speed={200}
                className="text-2xl lg:text-4xl font-semibold text-secondary"
                repeat={Infinity}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              {/* Replace the old img tag with the new CodeBlock component */}
              <CodeBlock codeString={codeString} />
            </motion.div>
          </div>
        </div>
      </section>
      <div className="max-w-2xl mx-auto mt-20 mb-20 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold mb-6">💬 <span className="text-primary">My Story in Bytes</span></h2>
        <div className="space-y-4 text-lg text-dark-text/80 dark:text-gray-300 font-body">
          <p>I fell for programming—and I think it’s been falling right back… maybe. 🤷‍♂️</p>
          <p>I’m skilled in <span className="text-primary font-semibold">Java</span>, <span className="text-primary font-semibold">Python</span>, and <span className="text-primary font-semibold">JavaScript</span>, and I thrive on building systems that blend intuitive design with powerful backend architectures.</p>
          <p>My interests span a wide spectrum—from cloud-native applications and scalable infrastructures to intelligent systems powered by machine learning and computer vision tools like <span className="text-primary font-semibold">NLP</span> and <span className="text-primary font-semibold">OpenCV</span>.</p>
          <p>I bring ideas to life using frameworks like <span className="text-primary font-semibold">Next.js</span>, <span className="text-primary font-semibold">Node.js</span>, and <span className="text-primary font-semibold">Spring Boot</span>, paired with platforms like <span className="text-primary font-semibold">Docker</span>, <span className="text-primary font-semibold">Linux</span>, and <span className="text-primary font-semibold">GitHub Actions</span> to deliver reliable, efficient, and forward-thinking solutions.</p>
        </div>
      </div>
    </>
  );
}

export default Home;
