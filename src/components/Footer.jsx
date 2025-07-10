import React from 'react';
import { personalInfo } from '../config';

const Footer = () => {
  // Only show GitHub, LinkedIn, and Instagram
  const socialsToShow = personalInfo.socials.filter(social =>
    ['GitHub', 'LinkedIn', 'Instagram'].includes(social.name)
  );

  return (
    <footer className="py-6 bg-light-background/80 dark:bg-dark-background/80">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Left: Created with love */}
          <div className="flex-1 text-left text-sm text-gray-600 dark:text-gray-400">
            Crafted with code & music <span className="text-lg align-middle">🎧</span> by <span className="text-primary font-semibold">Rabi Kiran</span> <span className="text-lg align-middle">🤍</span>
          </div>
          {/* Center: Copyright */}
          {/* Right: Social Icons */}
          <div className="flex-1 flex justify-end space-x-4">
            {socialsToShow.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  className="hover:text-primary focus:text-primary transition-colors outline-none"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <IconComponent className="w-6 h-6" />
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
