import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ParticlesBackground from './ParticlesBackground';

const Layout = ({ toggleTheme, theme }) => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      {/* Animated circular background design (global, now static) */}
      <div className="absolute bg-primary/20 rounded-full w-96 h-96 -top-20 -left-20 -z-10" />
      <div className="absolute bg-secondary/20 rounded-full w-96 h-96 -bottom-20 -right-20 -z-10" />
      <Header toggleTheme={toggleTheme} theme={theme} />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
