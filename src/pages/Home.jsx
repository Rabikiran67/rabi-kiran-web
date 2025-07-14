import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { animate } from 'animejs';
// Import the new components and config data
import { personalInfo, professionalSkills, getHomeCodeString } from '../config';
import CodeBlock from '../components/CodeBlock';

const Home = () => {
  // Generate the code string using our function from the config
  const codeString = getHomeCodeString(personalInfo, professionalSkills);
  const helloRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const triggerAnimation = () => {
    // Prevent multiple rapid triggers using ref for immediate check
    if (isAnimatingRef.current) {
      console.log('Animation already running, skipping...'); // Debug log
      return;
    }
    
    console.log('Auto animation triggered'); // Debug log
    isAnimatingRef.current = true;
    setIsAnimating(true);
    
    // Clear any existing timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    if (helloRef.current) {
      // Only target the letter spans, not the emoji
      const letterSpans = helloRef.current.querySelectorAll('.letter-span');
      console.log('Found letter spans:', letterSpans.length); // Debug log
      
      if (letterSpans.length > 0) {
        try {
          animate(letterSpans, {
            translateY: '-1rem',
            rotate: '-90deg',
            duration: 800,
            easing: 'easeInOutQuad',
            delay: (el, i) => i * 50
          });
          console.log('Animation started'); // Debug log
        } catch (error) {
          console.error('Animation error:', error); // Debug log
        }
      } else {
        console.log('No letter spans found'); // Debug log
      }
    } else {
      console.log('helloRef.current is null'); // Debug log
    }
    
    // Reset animation state after animation completes
    animationTimeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
    }, 1500);
  };

  // Set up animation to trigger only once after 1 second
  useEffect(() => {
    const animation = animate('.hello-animation span', {
      y: [
        { to: '-2.75rem', ease: 'outExpo', duration: 600 },
        { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
      ],
      rotate: {
        from: '-1turn',
        delay: 0
      },
      delay: (_, i) => i * 50,
      ease: 'inOutCirc',
      loopDelay: 1000,
      loop: true
    });
    return () => animation && animation.pause && animation.pause();
  }, []);

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
              <h1 
                ref={helloRef} 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 hello-animation"
              >
                {'Hello World!'.split('').map((char, index) => (
                  <span key={index} className="inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))} <span className="inline-block animate-wave">👋</span>
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
                I'M <span className="text-primary bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">RABI KIRAN</span>
              </h2>
              <TypeAnimation
                sequence={personalInfo.titles.flatMap(title => [title, 1000])}
                wrapper="h3"
                speed={150}
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
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          💬 <span className="text-white">My Story in </span><span className="text-primary">Bytes</span>
        </h2>
        <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl text-dark-text/80 dark:text-gray-300 font-body leading-relaxed">
          <p>I fell for programming—and I think it's been falling right back… slowly but surely.. 🤷‍♂️</p>
          <p>I code in <span className="text-primary font-semibold">Java</span>, <span className="text-primary font-semibold">Python</span>, and <span className="text-primary font-semibold">JavaScript</span>, and I thrive on building systems that blend intuitive design with powerful backend architectures.</p>
          <p>I work across cloud-native platforms, scalable backends, and smart systems driven by AI, <span className="text-primary font-semibold">NLP</span>, and computer vision.</p>
          <p>Using <span className="text-primary font-semibold">React.js</span>, <span className="text-primary font-semibold">Next.js</span>, and <span className="text-primary font-semibold">Node.js</span> alongside <span className="text-primary font-semibold">Docker</span>, <span className="text-primary font-semibold">Linux</span>, and <span className="text-primary font-semibold">GitHub Actions</span>, I build solutions that are fast, scalable, and production-ready.</p>
        </div>
      </div>
    </>
  );
}

export default Home;
