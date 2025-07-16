// src/components/SpotifyCard.jsx
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FaSpotify, FaPlay, FaPause } from 'react-icons/fa';
import { spotifyData } from '../config';
import LazyImage from './LazyImage';

const SpotifyCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioData, setAudioData] = useState(new Array(24).fill(0));
  const [tempo, setTempo] = useState(1);
  const [isAudioContextInitialized, setIsAudioContextInitialized] = useState(false);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(null);
  const progressBarRef = useRef(null);

  // Memoize audio data array to prevent unnecessary re-renders
  const initialAudioData = useMemo(() => new Array(24).fill(0), []);

  // Memoize event handlers outside useEffect
  const updateTime = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  }, []);

  const updateDuration = useCallback(() => {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);

    // Set initial values if already loaded
    if (!isNaN(audio.duration) && audio.duration > 0) setDuration(audio.duration);
    setCurrentTime(audio.currentTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
    };
  }, [updateTime, updateDuration]);

  // Lazy initialize audio context only when needed
  const initializeAudioContext = useCallback(async () => {
    if (isAudioContextInitialized) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 32;
        analyserRef.current.smoothingTimeConstant = 0.8;
      }

      const audio = audioRef.current;
      if (!audio) return;

      // Only create the MediaElementSourceNode once per audio element
      if (!mediaSourceRef.current) {
        mediaSourceRef.current = audioContextRef.current.createMediaElementSource(audio);
        mediaSourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      }
      
      setIsAudioContextInitialized(true);
    } catch (error) {
      console.log('Audio analysis not supported:', error);
    }
  }, [isAudioContextInitialized]);

  // Audio analysis for disco bars - optimized with throttling
  useEffect(() => {
    if (!isPlaying || !isAudioContextInitialized) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    let frameCount = 0;
    
    const updateAudioData = () => {
      frameCount++;
      // Only update every 3 frames for better performance
      if (frameCount % 3 !== 0) {
        animationFrameRef.current = requestAnimationFrame(updateAudioData);
        return;
      }

      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Calculate overall audio intensity for tempo detection
      const totalIntensity = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      const intensityChange = Math.abs(totalIntensity - (window.lastIntensity || 0));
      window.lastIntensity = totalIntensity;
      
      let newTempo = 1;
      if (intensityChange > 15) {
        newTempo = 3.5;
      } else if (intensityChange > 10) {
        newTempo = 2.2;
      } else if (intensityChange > 5) {
        newTempo = 1.4;
      } else {
        newTempo = 0.8;
      }
      setTempo(prevTempo => prevTempo * 0.7 + newTempo * 0.3);

      // Optimized disco bars calculation
      const newAudioData = [];
      for (let i = 0; i < 24; i++) {
        const index = Math.floor(i * dataArray.length / 24);
        const curr = dataArray[index] || 0;
        const normalizedValue = (curr / 255) ** 0.7;
        newAudioData.push(normalizedValue);
      }
      setAudioData(newAudioData);
      animationFrameRef.current = requestAnimationFrame(updateAudioData);
    };
    
    updateAudioData();

    // Resume audio context if tab regains focus
    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.visibilityState !== 'visible') {
        if (!audio.paused) {
          audio.pause();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, isAudioContextInitialized]);

  // Optimized drag handlers
  const handleDotMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    document.body.style.userSelect = 'none';
    setDragTime(currentTime);
  }, [currentTime]);

  // Move updateDrag outside useEffect and make it a useCallback
  const updateDrag = useCallback((clientX) => {
    const audio = audioRef.current;
    if (!audio || !progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    let percent = x / width;
    percent = Math.max(0, Math.min(1, percent));
    const newTime = percent * duration;
    setDragTime(newTime);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration, currentTime]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      e.preventDefault();
      updateDrag(e.clientX);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      setDragTime(null);
    };
    const handleTouchMove = (e) => {
      e.preventDefault();
      if (e.touches && e.touches[0]) {
        updateDrag(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      setDragTime(null);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, updateDrag]);

  // Optimized event handlers
  const handlePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isAudioContextInitialized) {
      await initializeAudioContext();
    }

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [isAudioContextInitialized, initializeAudioContext]);

  const handleSongClick = useCallback(() => {
    handlePlayPause();
  }, [handlePlayPause]);

  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const handleProgressBarClick = useCallback((e) => {
    const audio = audioRef.current;
    if (!audio || !progressBarRef.current || !duration) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = x / width;
    const newTime = percent * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  const handleProgressBarHover = useCallback((e) => {
    if (!progressBarRef.current || !duration) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percent = x / width;
    const hoverTime = percent * duration;
    
    setTooltip({
      time: formatTime(hoverTime),
      position: e.clientX
    });
  }, [duration, formatTime]);

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? ((isDragging && dragTime !== null ? dragTime : currentTime) / duration) * 100 : 0;

  return (
    <div
      className="relative w-56 h-56 xs:w-64 xs:h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-visible shadow-lg bg-dark-background backdrop-blur-md border border-primary/20 flex items-center justify-center transition-all duration-300 hover:shadow-xl group mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Circular bars around the circle when playing or hovering */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-pulse"></div>
        {/* Inner ring */}
        <div className="absolute inset-2 rounded-full border border-green-400/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        {/* Disco bars */}
        <div className="absolute inset-0 rounded-full">
          {audioData.map((value, i) => {
            let barHeight, barOpacity, barBg, barClass = '';
            if (isPlaying) {
              // Dynamic bars when playing (same as hover behavior)
              const baseHeight = 12;
              const maxHeight = 25;
              const dynamicHeight = baseHeight + (value ** 1.2) * maxHeight;
              barHeight = `${dynamicHeight}px`;
              
              // Consistent opacity range
              barOpacity = 0.5 + (value ** 1.1) * 0.5;
              
              // Consistent color shifting
              const hue = (progressPercentage * 1.5 + i * 15) % 360;
              barBg = `linear-gradient(to top, hsl(${hue}, 80%, 60%), hsl(${(hue + 30) % 360}, 90%, 70%))`;
              
              // Add subtle glow effect for high intensity
              if (value > 0.6) {
                barClass = 'animate-pulse';
              }
            } else if (isHovered) {
              // Same dynamic behavior on hover when not playing
              const baseHeight = 12;
              const maxHeight = 25;
              const dynamicHeight = baseHeight + (value ** 1.2) * maxHeight;
              barHeight = `${dynamicHeight}px`;
              
              barOpacity = 0.5 + (value ** 1.1) * 0.5;
              
              const hue = (progressPercentage * 1.5 + i * 15) % 360;
              barBg = `linear-gradient(to top, hsl(${hue}, 80%, 60%), hsl(${(hue + 30) % 360}, 90%, 70%))`;
              
              if (value > 0.6) {
                barClass = 'animate-pulse';
              }
            } else {
              barHeight = '12px';
              barOpacity = 0.4;
              barBg = 'linear-gradient(to top, #4ade80, #22d3ee)';
              barClass = 'animate-bar-idle';
            }
            return (
              <div
                key={i}
                className={`absolute w-2 shadow-md border border-white/20 rounded-full backdrop-blur-sm ${barClass}`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * (360 / audioData.length)}deg) translateY(-160px)`,
                  height: barHeight,
                  opacity: barOpacity,
                  background: barBg,
                  transition: (isPlaying || isHovered) ? `all ${25 / tempo}ms cubic-bezier(0.25,0.46,0.45,0.94)` : undefined
                }}
              ></div>
            );
          })}
        </div>
      </div>
      
      {/* Hover-only disco bars */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Outer ring on hover */}
        <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-pulse"></div>
        {/* Inner ring on hover */}
        <div className="absolute inset-2 rounded-full border border-green-400/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        {/* Disco bars on hover */}
        <div className="absolute inset-0 rounded-full">
          {[...Array(audioData.length)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 shadow-md border border-white/20 bg-gradient-to-t from-green-400 via-green-500 to-green-600 rounded-full backdrop-blur-sm"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * (360 / audioData.length)}deg) translateY(-160px)`,
                height: `${6 + Math.random() * 15}px`,
                animation: `discoBar 2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        src="/blinding-lights.mp3"
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="p-2 xs:p-4 sm:p-6 md:p-8 text-center w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg mx-auto">
        <div className="flex items-center justify-center mb-2 sm:mb-3 flex-wrap gap-1">
          <FaSpotify className="text-green-500 w-5 h-5 sm:w-6 sm:h-6 mr-1.5 transition-all duration-300" />
          <h3 className="font-bold text-white text-xs sm:text-sm transition-all duration-300">Now Playing</h3>
        </div>
        <div className="flex flex-col items-center w-full">
          {/* 1. Animated Glowing Album Art */}
          <div className="relative group mx-auto w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
            <LazyImage 
              src={spotifyData.albumArtUrl} 
              alt="Album Art" 
              className={`w-full h-full rounded-full shadow-lg mb-1.5 sm:mb-2 cursor-pointer transition-all duration-500 hover:scale-110 ${
                isPlaying ? 'animate-album-spin album-glow' : ''
              }`}
              style={{
                animationDuration: isPlaying ? '7s' : 'inherit',
                animationTimingFunction: isPlaying ? 'linear' : undefined
              }}
              onClick={handleSongClick}
            />
            {/* Play button overlay */}
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              {isPlaying ? (
                <FaPause className="text-white text-base xs:text-lg sm:text-xl" />
              ) : (
                <FaPlay className="text-white text-base xs:text-lg sm:text-xl ml-1" />
              )}
            </button>
          </div>
                      <div className="text-center">
              <p 
                className="font-bold text-white text-xs sm:text-sm truncate mb-0.5 cursor-pointer hover:text-primary transition-all duration-300"
                onClick={handleSongClick}
              >
                {spotifyData.song}
              </p>
              <p className="text-gray-300 text-xs truncate mb-1.5 sm:mb-2 transition-all duration-300">{spotifyData.artist}</p>
              
              {/* Progress Bar */}
              {/* 2. Progress Dot Pulse & 4. Tooltip */}
              <div className="mb-1 sm:mb-1.5 w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto">
                <div
                  ref={progressBarRef}
                  className="relative w-full bg-gray-600 rounded-full h-1 xs:h-1.5 sm:h-2 mb-0.5 cursor-pointer hover:bg-gray-500 transition-all duration-300 group"
                  onClick={handleProgressBarClick}
                  onMouseMove={handleProgressBarHover}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <div
                    className="absolute top-0 left-0 bg-primary rounded-full h-1 xs:h-1.5 sm:h-2 transition-all duration-200 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                  {/* Progress indicator dot */}
                  <div 
                    className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full shadow-lg transition-all duration-200 z-10 ${isPlaying ? 'animate-pulse-dot' : ''}`}
                    style={{ left: `${progressPercentage}%`, transform: 'translate(-50%, -50%)', cursor: 'grab', touchAction: 'none' }}
                    onMouseDown={handleDotMouseDown}
                    onTouchStart={handleDotMouseDown}
                  ></div>
                  {/* Tooltip */}
                  {tooltip && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-dark-background text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-10 animate-fade-in-up">
                      {tooltip.time}
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-xs xs:text-sm text-gray-400 w-full">
                  <span>{formatTime(isDragging && dragTime !== null ? dragTime : currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-0.5">
                {/* Animated playing bars - only show when playing */}
                {isPlaying && (
                  <>
                    <span className="w-0.5 h-1 sm:h-1.5 bg-primary animate-playing-bar1 transition-all duration-300"></span>
                    <span className="w-0.5 h-1 sm:h-1.5 bg-primary animate-playing-bar2 transition-all duration-300"></span>
                    <span className="w-0.5 h-1 sm:h-1.5 bg-primary animate-playing-bar3 transition-all duration-300"></span>
                  </>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyCard; 