import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesBackground = () => {
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
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
        rootMargin: '100px' // Increased margin for earlier loading
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

  const particlesInit = useCallback(async (engine) => {
    try {
      await loadSlim(engine);
    } catch (err) {
      setHasError(true);
      console.error('Particles failed to load:', err);
    }
  }, []);

  const handleParticlesLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Memoize options to prevent unnecessary re-renders
  const options = useMemo(() => ({
    background: {
      color: { value: 'transparent' },
    },
    fpsLimit: 30, // Reduced from 60 for better performance
    interactivity: {
      events: {
        onHover: { enable: false },
        resize: true,
      },
    },
    particles: {
      color: { value: '#ffffff' },
      links: { enable: false },
      collisions: { enable: false },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'out' },
        random: true,
        speed: 0.05, // Reduced speed for better performance
        straight: false,
      },
      number: {
        density: { enable: true, area: 1000 },
        value: 50, // Reduced from 100 for better performance
      },
      opacity: { value: { min: 0.2, max: 0.6 } }, // Reduced opacity
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 2 } },
    },
    detectRetina: false, // Disabled for better performance
  }), []);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10">
      {isInView && !hasError && (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Particles 
            id="tsparticles" 
            init={particlesInit} 
            options={options} 
            loaded={handleParticlesLoaded}
          />
        </>
      )}
      {isInView && hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-700/10 to-secondary/20 animate-gradient-x"></div>
      )}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ParticlesBackground;
