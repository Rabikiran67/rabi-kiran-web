import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiMail, 
  HiDocumentText, 
  HiCode, 
  HiExternalLink,
  HiSparkles,
  HiMenu,
  HiLightningBolt,
  HiX,
  HiStar
} from 'react-icons/hi';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter,
  FaRocket,
  FaHeart
} from 'react-icons/fa';
import { personalInfo } from '../config';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const actions = [
    { 
      icon: <HiMail className="text-xl" />, 
      label: 'Email Me', 
      action: () => window.open(`mailto:${personalInfo.email}`),
      color: 'from-red-500 to-red-600',
      hoverColor: 'from-red-600 to-red-700',
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600'
    },
    { 
      icon: <HiDocumentText className="text-xl" />, 
      label: 'Download Resume', 
      action: () => window.open(personalInfo.resume, '_blank'),
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    { 
      icon: <FaGithub className="text-xl" />, 
      label: 'GitHub Profile', 
      action: () => window.open(personalInfo.socials[0].url, '_blank'),
      color: 'from-gray-700 to-gray-800',
      hoverColor: 'from-gray-800 to-gray-900',
      bgColor: 'bg-gradient-to-br from-gray-700 to-gray-800'
    },
    { 
      icon: <FaLinkedin className="text-xl" />, 
      label: 'LinkedIn Profile', 
      action: () => window.open(personalInfo.socials[1].url, '_blank'),
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'from-blue-700 to-blue-800',
      bgColor: 'bg-gradient-to-br from-blue-600 to-blue-700'
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="absolute bottom-20 right-0 space-y-6"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ scale: 0, opacity: 0, x: 50, rotate: -180 }}
                  animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
                  exit={{ scale: 0, opacity: 0, x: 50, rotate: 180 }}
                  transition={{ 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={action.action}
                  className={`w-14 h-14 ${action.bgColor} hover:bg-gradient-to-br ${action.hoverColor} rounded-2xl flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group relative border border-white/20 backdrop-blur-sm`}
                  title={action.label}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {action.icon}
                  
                  {/* Enhanced Tooltip */}
                  <motion.div 
                    className="absolute right-16 bg-gray-900/95 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-gray-700/50 shadow-2xl"
                    initial={{ x: 10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {action.label}
                    <div className="absolute top-1/2 -right-1 w-2 h-2 bg-gray-900/95 transform -translate-y-1/2 rotate-45 border-r border-b border-gray-700/50"></div>
                  </motion.div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main FAB Button - Completely New Design */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 border border-white/20 backdrop-blur-sm shadow-xl relative overflow-hidden group"
          whileTap={{ scale: 0.95 }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          animate={{ 
            transition: { duration: 0.3 }
          }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Main icon container */}
          <div className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ scale: 0, y: 20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0, y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 400 }}
                  className="flex items-center justify-center"
                >
                  <div className="relative">
                    <HiX className="text-2xl" />
                    {/* Heart effect */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <FaHeart className="text-lg text-pink-300" />
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ scale: 0, y: -20, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0, y: 20, opacity: 0 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 400 }}
                  className="flex items-center justify-center"
                >
                  <div className="relative">
                    <HiStar className="text-2xl" />
                    {/* Star sparkle effect */}
                    <motion.div
                      className="absolute -right-1 -top-1"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                    </motion.div>
                    {/* Floating sparkles */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-1 h-1 bg-yellow-300 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
                      <div className="w-1 h-1 bg-pink-300 rounded-full absolute -bottom-1 right-1/2 transform translate-x-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-1 h-1 bg-purple-300 rounded-full absolute left-1/2 -top-1 transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
                      <div className="w-1 h-1 bg-indigo-300 rounded-full absolute right-1/2 -bottom-1 transform translate-y-1/2 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Diamond border effect */}
          <motion.div
            className="absolute inset-0"
            animate={{ 
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-full h-full border-2 border-white/30 rounded-2xl transform rotate-45"></div>
          </motion.div>
          
          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/40"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.6, 0.1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Glow effect for main button */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingActions; 