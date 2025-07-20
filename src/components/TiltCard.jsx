import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TiltCard = ({ children, className = "", intensity = 10 }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setTilt({
      x: (y - centerY) / centerY * intensity,
      y: (centerX - x) / centerX * intensity
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      className={`transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      animate={{
        boxShadow: isHovered 
          ? '0 20px 40px rgba(139, 92, 246, 0.3)' 
          : '0 10px 20px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard; 