import React from 'react';
import { personalInfo } from '../config';

const Footer = () => {
  // Only show GitHub, LinkedIn, and Instagram
  const socialsToShow = personalInfo.socials.filter(social =>
    ['GitHub', 'LinkedIn', 'Instagram'].includes(social.name)
  );

  return (
    <footer className="py-4 sm:py-6 bg-light-background/80 dark:bg-dark-background/80">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          {/* Left: Created with love */}
          <div className="flex-1 text-center sm:text-left text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Crafted with code & music <span className="text-base sm:text-lg align-middle">🎧</span> by <span className="text-primary font-semibold">Rabi Kiran</span> <span className="text-base sm:text-lg align-middle">🤍</span>
          </div>
          
          {/* Right: Social Icons */}
          <div className="flex-1 flex justify-center sm:justify-end space-x-3 sm:space-x-4">
            {socialsToShow.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  className="hover:text-primary focus:text-primary transition-colors outline-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent rounded p-1 touch-manipulation"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
