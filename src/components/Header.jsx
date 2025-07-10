import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiCode, FiFileText, FiGitBranch, FiStar, FiCpu, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { personalInfo } from '../config';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ toggleTheme, theme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 bg-dark-background/95 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <NavLink to="/" className="text-lg sm:text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
            {personalInfo.initials || personalInfo.name[0]}
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.title} 
                to={link.path} 
                className={({ isActive }) =>
                  `relative flex items-center gap-2 text-sm xl:text-base font-medium transition-colors group hover:text-primary
                  ${isActive ? 'text-primary' : ''}`
                }
                style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
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
                className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm group"
                style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
              >
                <FiGitBranch className="text-lg" />
                <FiStar className="text-lg" />
                {/* Animated underline on hover */}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></span>
              </a>
            )}
          </nav>
          
          {/* Tablet Navigation */}
          <nav className="hidden md:flex lg:hidden items-center space-x-4">
            {navLinks.slice(0, 4).map((link) => (
              <NavLink 
                key={link.title} 
                to={link.path} 
                className="relative flex flex-col items-center gap-1 transition-colors pb-1 group"
              >
                <span className="text-lg">{link.icon}</span>
                <span className="text-xs">{link.title}</span>
                <span className="absolute left-0 -bottom-0.5 h-1 w-full overflow-hidden pointer-events-none">
                  <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full transition-all duration-500 group-hover:animate-upload-bar"></span>
                </span>
              </NavLink>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-md text-primary hover:text-primary/80 hover:bg-gray-800 transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <FiMenu className="text-2xl" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            onClick={handleNavClick}
          >
            {/* Background Layer */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-lg"></div>
            
            {/* Menu Container */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
              <button
                aria-label="Close menu"
                className="absolute top-4 right-4 p-3 text-white hover:text-primary transition-colors bg-gray-800/80 hover:bg-gray-700/80 rounded-full backdrop-blur-sm"
                onClick={e => { e.stopPropagation(); setMobileOpen(false); }}
              >
                <FiX className="text-2xl" />
              </button>
              
              {/* Menu Background Card */}
              <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-8 sm:p-12 shadow-2xl border border-gray-600/50 max-w-sm w-full">
                <nav className="flex flex-col items-center space-y-6 sm:space-y-8">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.title}
                      to={link.path}
                      className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white hover:text-primary transition-colors w-full justify-center group"
                      onClick={handleNavClick}
                    >
                      <span className="text-2xl sm:text-3xl">{link.icon}</span>
                      {link.title}
                      {/* Animated underline on hover */}
                      <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></span>
                    </NavLink>
                  ))}
                  {personalInfo.githubRepo && (
                    <a
                      href={personalInfo.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-primary hover:text-primary/80 font-bold transition-colors mt-6 text-lg sm:text-xl w-full justify-center group"
                      onClick={handleNavClick}
                    >
                      <FiGitBranch className="text-2xl" />
                      <FiStar className="text-2xl" />
                      {/* Animated underline on hover */}
                      <span className="absolute left-0 -bottom-1 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300"></span>
                    </a>
                  )}
                </nav>
              </div>
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
    </header>
  );
};

export default Header;
