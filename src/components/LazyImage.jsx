import React, { useState, useEffect, useRef } from 'react';
import { createIntersectionObserver, preloadImage } from '../utils/performance';

const LazyImage = ({ src, alt, className, style, placeholder = null }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = createIntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Increased margin for earlier loading
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  // Preload image when in view
  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      preloadImage(src)
        .then(() => setIsLoaded(true))
        .catch(() => setHasError(true));
    }
  }, [isInView, src, isLoaded, hasError]);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className || ''}`}>
      {/* Loading placeholder */}
      {!isLoaded && isInView && !hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error placeholder */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400 text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image not available</div>
          </div>
        </div>
      )}
      
      {/* Custom placeholder */}
      {placeholder && !isInView && (
        <div className="absolute inset-0">
          {placeholder}
        </div>
      )}
      
      {/* Actual image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={style}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default LazyImage; 