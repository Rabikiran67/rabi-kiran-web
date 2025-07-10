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

  const activeLinkStyle = {
    color: '#8B5CF6',
    boxShadow: '0 2px #8B5CF6'
  };

  // Close mobile menu on route change
  const handleNavClick = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 p-4 bg-dark-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-primary">
          {personalInfo.initials || personalInfo.name[0]}
        </NavLink>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <NavLink 
              key={link.title} 
              to={link.path} 
              className="relative flex flex-col items-center gap-2 transition-colors pb-1 group"
              style={({ isActive }) => isActive ? activeLinkStyle : undefined}
            >
              <span className="flex items-center gap-2">{link.icon} {link.title}</span>
              {/* Animated uploading bar on hover */}
              <span className="absolute left-0 -bottom-0.5 h-1 w-full overflow-hidden pointer-events-none">
                <span className="block h-full w-0 group-hover:w-full bg-gradient-to-r from-primary via-purple-500 to-secondary rounded-full transition-all duration-500 group-hover:animate-upload-bar"></span>
              </span>
            </NavLink>
          ))}
          {personalInfo.githubRepo && (
            <a
              href={personalInfo.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary/20 hover:bg-primary/40 text-primary font-semibold py-2 px-4 rounded-lg transition-all"
            >
              <FiGitBranch />
              <FiStar />
            </a>
          )}
        </nav>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            aria-label="Open menu"
            className="text-3xl text-primary focus:outline-none"
            onClick={() => setMobileOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </div>
      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-background/95 flex flex-col items-center justify-center"
            onClick={handleNavClick}
          >
            <button
              aria-label="Close menu"
              className="absolute top-6 right-6 text-3xl text-primary focus:outline-none"
              onClick={e => { e.stopPropagation(); setMobileOpen(false); }}
            >
              <FiX />
            </button>
            <nav className="flex flex-col gap-8 text-2xl">
              {navLinks.map((link) => (
                <NavLink
                  key={link.title}
                  to={link.path}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                  style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                  onClick={handleNavClick}
                >
                  {link.icon} {link.title}
                </NavLink>
              ))}
              {personalInfo.githubRepo && (
                <a
                  href={personalInfo.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary/20 hover:bg-primary/40 text-primary font-semibold py-2 px-4 rounded-lg transition-all mt-4"
                  onClick={handleNavClick}
                >
                  <FiGitBranch />
                  <FiStar />
                </a>
              )}
            </nav>
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
