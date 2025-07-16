import React, { useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UniqueSpinner from './components/UniqueSpinner';

// Lazy load page components with prefetching
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Prefetch components when user hovers over navigation
const prefetchComponent = (componentPromise) => {
  return componentPromise;
};

function App() {
  const [theme, setTheme] = useState('dark');

  // Memoize theme class to prevent unnecessary re-renders
  const themeClass = useMemo(() => theme === 'dark' ? 'dark' : '', [theme]);

  useEffect(() => {
    // Set theme class efficiently
    if (themeClass) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeClass]);

  // Prefetch components on mount for better performance
  useEffect(() => {
    // Prefetch all page components after initial load
    const prefetchPages = async () => {
      setTimeout(() => {
        prefetchComponent(import('./pages/AboutPage'));
        prefetchComponent(import('./pages/ProjectsPage'));
        prefetchComponent(import('./pages/SkillsPage'));
        prefetchComponent(import('./pages/ResumePage'));
        prefetchComponent(import('./pages/ContactPage'));
      }, 2000); // Delay prefetching to prioritize initial page load
    };

    prefetchPages();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <Suspense fallback={<UniqueSpinner />}>
        <Routes>
          <Route path="/" element={<Layout toggleTheme={toggleTheme} theme={theme} />}>
            <Route index element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
