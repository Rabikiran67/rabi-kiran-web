import React from 'react';

const UniqueSpinner = () => {
  const RK = "RK";
  
  return (
  <div className="flex flex-col items-center justify-center min-h-[40vh]">
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-20 h-20 animate-spin-slow" viewBox="0 0 80 80" fill="none">
        <circle
          cx="40" cy="40" r="36"
          stroke="#8B5CF6"
          strokeWidth="6"
          strokeDasharray="56 100"
          strokeLinecap="round"
          opacity="0.7"
        />
        <circle
          cx="40" cy="40" r="32"
          stroke="#A78BFA"
          strokeWidth="3"
          strokeDasharray="24 80"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-primary animate-pulse select-none">{RK}</span>
    </div>
    <span className="mt-4 text-lg text-primary font-semibold tracking-wide animate-pulse">Loading...</span>
    <style>{`
      .animate-spin-slow {
        animation: spin 1.4s linear infinite;
      }
      @keyframes spin {
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
  );
};

export default UniqueSpinner; 