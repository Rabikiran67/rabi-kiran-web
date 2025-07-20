import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiCode, FiFileText, FiGitBranch, FiStar, FiCpu, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { personalInfo } from '../config';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ toggleTheme, theme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navLinks = [
    { title: 'Home', path: '/', icon: <FiHome /> },
    { title: 'About', path: '/about', icon: <FiUser /> },
    { title: 'Skills', path: '/skills', icon: <FiCpu /> },
    { title: 'Projects', path: '/projects', icon: <FiCode /> },
    { title: 'Resume', path: '/resume', icon: <FiFileText /> },
    { title: 'Contact', path: '/contact', icon: <FiMail /> },
  ];

  // Close mobile menu on route change
  const handleNavClick = () => setMobileOpen(false);

  // Focus trapping for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    // Focus the first focusable element in the menu
    const firstFocusable = menuRef.current?.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-dark-background/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
            {/* Logo */}
            <NavLink 
              to="/" 
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary hover:text-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-background rounded"
            >
              {personalInfo.initials || personalInfo.name[0]}
            </NavLink>
            
            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.title} 
                  to={link.path} 
                  className={({ isActive }) =>
                    `relative flex items-center gap-2 text-sm 2xl:text-base font-medium transition-colors group hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-background rounded px-2 py-1
                    ${isActive ? 'text-primary' : 'text-gray-300'}`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.title}</span>
                  {/* Animated underline on hover */}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></span>
                </NavLink>
              ))}
              {personalInfo.githubRepo && (
                <a
                  href={personalInfo.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-background rounded px-2 py-1"
                >
                  <FiGitBranch className="text-lg" />
                  <FiStar className="text-lg" />
                  {/* Animated underline on hover */}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></span>
                </a>
              )}
            </nav>
            
            {/* Large Tablet Navigation */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-3">
              {navLinks.slice(0, 5).map((link) => (
                <NavLink 
                  key={link.title} 
                  to={link.path} 
                  className={({ isActive }) =>
                    `relative flex flex-col items-center gap-1 transition-colors pb-1 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-background rounded px-2 py-1
                    ${isActive ? 'text-primary' : 'text-gray-300'}`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="text-xs">{link.title}</span>
                  <span className="absolute left-0 -bottom-0.5 h-1 w-full overflow-hidden pointer-events-none">
                    <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full transition-all duration-500 group-hover:animate-upload-bar"></span>
                  </span>
                </NavLink>
              ))}
            </nav>

            {/* Medium Tablet Navigation */}
            <nav className="hidden md:flex lg:hidden items-center space-x-2">
              {navLinks.slice(0, 4).map((link) => (
                <NavLink 
                  key={link.title} 
                  to={link.path} 
                  className={({ isActive }) =>
                    `relative flex flex-col items-center gap-1 transition-colors pb-1 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-background rounded px-1 py-1
                    ${isActive ? 'text-primary' : 'text-gray-300'}`
                  }
                >
                  <span className="text-base">{link.icon}</span>
                  <span className="text-xs">{link.title}</span>
                  <span className="absolute left-0 -bottom-0.5 h-1 w-full overflow-hidden pointer-events-none">
                    <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full transition-all duration-500 group-hover:animate-upload-bar"></span>
                  </span>
                </NavLink>
              ))}
            </nav>
            
            {/* Mobile menu button */}
            <button
              ref={hamburgerRef}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-md text-primary hover:text-primary/80 hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-background touch-manipulation"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu className="text-xl sm:text-2xl" />
            </button>
          </div>
        </div>
      </header>
      {/* Spacer to prevent content from being hidden behind the fixed navbar */}
      <div className="h-12 sm:h-14 md:h-16" />
      
      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
            onClick={handleNavClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Background Layer */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-lg"></div>
            
            {/* Menu Container */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-3 sm:px-4">
              <motion.button
                aria-label="Close menu"
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-3 text-white hover:text-primary transition-colors bg-gray-800/80 hover:bg-gray-700/80 rounded-full backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent touch-manipulation"
                onClick={e => { e.stopPropagation(); setMobileOpen(false); }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <FiX className="text-xl sm:text-2xl" />
              </motion.button>
              
              {/* Menu Background Card */}
              <motion.div 
                ref={menuRef}
                id="mobile-menu"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  delay: 0.1
                }}
                className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl border border-gray-600/50 max-w-xs sm:max-w-sm w-full mx-4"
              >
                <h2 id="mobile-menu-title" className="sr-only">Mobile Navigation Menu</h2>
                <nav className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.2 + index * 0.1, 
                        duration: 0.4,
                        type: "spring",
                        stiffness: 300
                      }}
                      className="w-full"
                    >
                      <NavLink
                        to={link.path}
                        className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-primary transition-colors w-full justify-center group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-4 py-3 touch-manipulation"
                        onClick={handleNavClick}
                      >
                        <span className="text-xl sm:text-2xl md:text-3xl">{link.icon}</span>
                        {link.title}
                        {/* Animated underline on hover */}
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></span>
                      </NavLink>
                    </motion.div>
                  ))}
                  {personalInfo.githubRepo && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.2 + navLinks.length * 0.1, 
                        duration: 0.4,
                        type: "spring",
                        stiffness: 300
                      }}
                      className="w-full"
                    >
                      <a
                        href={personalInfo.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-primary hover:text-primary/80 font-bold transition-colors mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl w-full justify-center group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-4 py-3 touch-manipulation"
                        onClick={handleNavClick}
                      >
                        <FiGitBranch className="text-xl sm:text-2xl md:text-3xl" />
                        <FiStar className="text-xl sm:text-2xl md:text-3xl" />
                        {/* Animated underline on hover */}
                        <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></span>
                      </a>
                    </motion.div>
                  )}
                </nav>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Custom CSS for uploading bar animation */}
      <style>{`
        @keyframes upload-bar {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .group-hover\\:animate-upload-bar:hover {
          animation: upload-bar 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </>
  );
};

export default Header;
