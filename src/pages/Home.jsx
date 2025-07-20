import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { animate } from 'animejs';
// Import the new components and config data
import { personalInfo, professionalSkills, getHomeCodeString } from '../config';
import CodeBlock from '../components/CodeBlock';
import ShootingStars from '../components/ShootingStars';
import GradientText from '../components/GradientText';

const Home = () => {
  // Generate the code string using our function from the config
  const codeString = useMemo(() => getHomeCodeString(personalInfo, professionalSkills), [personalInfo, professionalSkills]);
  const helloRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef(null);
  const isAnimatingRef = useRef(false);

  const triggerAnimation = useCallback(() => {
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
  }, []);

  // Memoize animation sequence to prevent unnecessary re-renders
  const animationSequence = useMemo(() => 
    personalInfo.titles.flatMap(title => [title, 1000]), 
    [personalInfo.titles]
  );

  // Set up animation to trigger only once after page load
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
      loop: false // Changed from true to false to run only once
    });
    return () => animation && animation.pause && animation.pause();
  }, []);

  // Memoize the hello world text to prevent unnecessary re-renders
  const helloWorldText = useMemo(() => 
    'Hello World!'.split('').map((char, index) => (
      <span key={index} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    )), 
    []
  );

  return (
    <>
      <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden px-3 sm:px-4 md:px-6 lg:px-8">
        <ShootingStars />
        <div className="absolute inset-0 -z-10">
          <div className="absolute bg-primary/10 rounded-full w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 top-1/4 left-1/4 blur-3xl animate-pulse" />
          <div className="absolute bg-secondary/10 rounded-full w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 bottom-1/4 right-1/4 blur-3xl animate-pulse delay-500" />
        </div>
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-1"
            >
              <h1 
                ref={helloRef} 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 hello-animation"
              >
                {helloWorldText} <span className="inline-block animate-wave">👋</span>
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-3 sm:mb-4 md:mb-6 leading-tight">
                I'M <span className="text-primary font-extrabold">RABI KIRAN</span>
              </h2>
              <TypeAnimation
                sequence={animationSequence}
                wrapper="h3"
                speed={150}
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-secondary"
                repeat={Infinity}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center order-2 lg:order-2"
            >
              {/* Replace the old img tag with the new CodeBlock component */}
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                <CodeBlock codeString={codeString} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20 mb-8 sm:mb-12 md:mb-16 lg:mb-20 flex flex-col items-center justify-center text-center px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6">
          💬 <span className="text-white">My Story in </span><GradientText>Bytes</GradientText>
        </h2>
        <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg lg:text-xl text-dark-text/80 dark:text-gray-300 font-body leading-relaxed">
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
