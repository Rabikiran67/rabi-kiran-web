import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ParticlesBackground from './ParticlesBackground';

const Layout = ({ toggleTheme, theme }) => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      {/* Animated circular background design (responsive) */}
      <div className="absolute bg-primary/20 rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 -top-10 sm:-top-20 -left-10 sm:-left-20 -z-10" />
      <div className="absolute bg-secondary/20 rounded-full w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 -z-10" />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
