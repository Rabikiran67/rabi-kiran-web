import React from 'react';
import { motion } from 'framer-motion';

const GradientText = ({ 
  children, 
  className = "", 
  animate = true, 
  colors = "from-primary via-secondary to-primary",
  duration = 3 
}) => {
  const baseClasses = `bg-gradient-to-r ${colors} bg-clip-text text-transparent`;
  const animationClasses = animate ? 'animate-gradient-x' : '';
  
  if (animate) {
    return (
      <motion.span 
        className={`${baseClasses} ${animationClasses} ${className}`}
        style={{
          backgroundSize: '200% 200%',
          animation: `gradient-x ${duration}s ease-in-out infinite`
        }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={`${baseClasses} ${className}`}>
      {children}
    </span>
  );
};

// Gradient Text Variants
export const GradientTextVariants = {
  primary: ({ animate, className }) => (
    <GradientText 
      animate={animate} 
      className={className}
      colors="from-primary via-purple-500 to-secondary"
    />
  ),
  rainbow: ({ animate, className }) => (
    <GradientText 
      animate={animate} 
      className={className}
      colors="from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"
      duration={4}
    />
  ),
  fire: ({ animate, className }) => (
    <GradientText 
      animate={animate} 
      className={className}
      colors="from-red-500 via-orange-500 to-yellow-500"
      duration={2}
    />
  ),
  ocean: ({ animate, className }) => (
    <GradientText 
      animate={animate} 
      className={className}
      colors="from-blue-500 via-cyan-500 to-teal-500"
      duration={3}
    />
  ),
  sunset: ({ animate, className }) => (
    <GradientText 
      animate={animate} 
      className={className}
      colors="from-pink-500 via-red-500 to-orange-500"
      duration={3}
    />
  )
};

export default GradientText; 