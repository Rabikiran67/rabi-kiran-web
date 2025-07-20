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
      <div className="absolute bg-primary/20 rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 -top-5 sm:-top-10 md:-top-20 -left-5 sm:-left-10 md:-left-20 -z-10" />
      <div className="absolute bg-secondary/20 rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 -bottom-5 sm:-bottom-10 md:-bottom-20 -right-5 sm:-right-10 md:-right-20 -z-10" />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
