import React from 'react';

const ShootingStars = () => {
  return (
    <>
      {/* Main Shooting Star */}
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '6px',
          height: '6px',
          background: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 0 15px #ffffff, 0 0 30px #ffffff, 0 0 45px #ffffff',
          animation: 'shooting-star 4s linear infinite',
          top: '10%',
          right: '10%'
        }}
      />
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '2px',
          height: '150px',
          background: 'linear-gradient(to bottom, transparent, #ffffff, transparent)',
          animation: 'shooting-star-trail 4s linear infinite',
          top: '10%',
          right: '10%'
        }}
      />
      
      {/* Small Shooting Stars */}
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '3px',
          height: '3px',
          background: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 0 8px #ffffff, 0 0 16px #ffffff',
          animation: 'shooting-star-small-1 4.5s linear infinite',
          top: '8%',
          right: '12%'
        }}
      />
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '1px',
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, #ffffff, transparent)',
          animation: 'shooting-star-trail-small-1 4.5s linear infinite',
          top: '8%',
          right: '12%'
        }}
      />
      
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '2px',
          height: '2px',
          background: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 0 6px #ffffff, 0 0 12px #ffffff',
          animation: 'shooting-star-small-2 3.8s linear infinite',
          top: '12%',
          right: '8%'
        }}
      />
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, transparent, #ffffff, transparent)',
          animation: 'shooting-star-trail-small-2 3.8s linear infinite',
          top: '12%',
          right: '8%'
        }}
      />
      
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '3px',
          height: '3px',
          background: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 0 8px #ffffff, 0 0 16px #ffffff',
          animation: 'shooting-star-small-3 4.2s linear infinite',
          top: '6%',
          right: '15%'
        }}
      />
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '1px',
          height: '70px',
          background: 'linear-gradient(to bottom, transparent, #ffffff, transparent)',
          animation: 'shooting-star-trail-small-3 4.2s linear infinite',
          top: '6%',
          right: '15%'
        }}
      />
      
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '2px',
          height: '2px',
          background: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 0 6px #ffffff, 0 0 12px #ffffff',
          animation: 'shooting-star-small-4 4.8s linear infinite',
          top: '15%',
          right: '6%'
        }}
      />
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '1px',
          height: '50px',
          background: 'linear-gradient(to bottom, transparent, #ffffff, transparent)',
          animation: 'shooting-star-trail-small-4 4.8s linear infinite',
          top: '15%',
          right: '6%'
        }}
      />
      
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '3px',
          height: '3px',
          background: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 0 8px #ffffff, 0 0 16px #ffffff',
          animation: 'shooting-star-small-5 3.5s linear infinite',
          top: '9%',
          right: '18%'
        }}
      />
      <div 
        className="fixed -z-10 pointer-events-none"
        style={{
          width: '1px',
          height: '90px',
          background: 'linear-gradient(to bottom, transparent, #ffffff, transparent)',
          animation: 'shooting-star-trail-small-5 3.5s linear infinite',
          top: '9%',
          right: '18%'
        }}
      />
      
      {/* CSS Keyframes */}
      <style>{`
        @keyframes shooting-star {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-trail {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-small-1 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-trail-small-1 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-small-2 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-trail-small-2 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-small-3 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-trail-small-3 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-small-4 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-trail-small-4 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-small-5 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
        
        @keyframes shooting-star-trail-small-5 {
          0% {
            transform: translate(0, 0) rotate(45deg);
            opacity: 1;
          }
          100% {
            transform: translate(-100vw, 100vh) rotate(45deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ShootingStars; 