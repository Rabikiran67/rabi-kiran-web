// src/components/SpotifyCard.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaSpotify, FaPlay, FaPause } from 'react-icons/fa';
import { spotifyData } from '../config';
import LazyImage from './LazyImage';

const SpotifyCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioData, setAudioData] = useState(new Array(24).fill(0));
  const [tempo, setTempo] = useState(1);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  // Audio analysis for disco bars
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const setupAudioAnalysis = async () => {
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

        const source = audioContextRef.current.createMediaElementSource(audio);
        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        
        const updateAudioData = () => {
          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Calculate overall audio intensity for tempo detection
          const totalIntensity = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
          
          // Detect tempo based on audio intensity changes
          const intensityChange = Math.abs(totalIntensity - (window.lastIntensity || 0));
          window.lastIntensity = totalIntensity;
          
          // Adjust tempo based on intensity changes
          let newTempo = 1;
          if (intensityChange > 20) {
            newTempo = 2; // Fast movement for high intensity
          } else if (intensityChange > 10) {
            newTempo = 1.5; // Medium movement for medium intensity
          } else {
            newTempo = 0.8; // Slow movement for low intensity
          }
          
          // Smooth tempo transitions
          setTempo(prevTempo => prevTempo * 0.9 + newTempo * 0.1);
          
          // Convert frequency data to bar heights
          const newAudioData = [];
          for (let i = 0; i < 24; i++) {
            const index = Math.floor(i * dataArray.length / 24);
            const value = dataArray[index] || 0;
            newAudioData.push(value / 255); // Normalize to 0-1
          }
          
          setAudioData(newAudioData);
          animationFrameRef.current = requestAnimationFrame(updateAudioData);
        };
        
        updateAudioData();
      } catch (error) {
        console.log('Audio analysis not supported:', error);
      }
    };

    setupAudioAnalysis();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleSongClick = () => {
    if (!isPlaying) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressBarClick = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressBarWidth = rect.width;
    const clickPercentage = clickX / progressBarWidth;
    
    const newTime = clickPercentage * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-lg 
                   bg-dark-background backdrop-blur-md border border-primary/20 flex items-center justify-center transition-all duration-300 hover:shadow-xl group">
      {/* Circular bars around the circle when playing or hovering */}
      {(isPlaying || false) && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-pulse"></div>
          {/* Inner ring */}
          <div className="absolute inset-2 rounded-full border border-green-400/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          {/* Disco bars */}
          <div className="absolute inset-0 rounded-full">
            {audioData.map((value, i) => (
              <div
                key={i}
                className="absolute w-2 shadow-md border border-white/20 bg-gradient-to-t from-green-400 via-green-500 to-green-600 rounded-full backdrop-blur-sm"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * (360 / audioData.length)}deg) translateY(-160px)`,
                  height: `${8 + value * 30}px`,
                  opacity: 0.6 + value * 0.4,
                  transition: `all ${200 / tempo}ms ease-out`
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
      
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
      
      <div className="p-6 sm:p-8 text-center">
        <div className="flex items-center justify-center mb-2 sm:mb-3">
          <FaSpotify className="text-green-500 w-5 h-5 sm:w-6 sm:h-6 mr-1.5 transition-all duration-300" />
          <h3 className="font-bold text-white text-xs sm:text-sm transition-all duration-300">Now Playing</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative group">
            <LazyImage 
              src={spotifyData.albumArtUrl} 
              alt="Album Art" 
              className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full shadow-lg mb-1.5 sm:mb-2 cursor-pointer transition-all duration-500 hover:scale-110 ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{
                animationDuration: isPlaying ? '9s' : 'inherit'
              }}
              onClick={handleSongClick}
            />
            {/* Play button overlay */}
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              {isPlaying ? (
                <FaPause className="text-white text-sm sm:text-lg" />
              ) : (
                <FaPlay className="text-white text-sm sm:text-lg ml-1" />
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
              <div className="mb-1 sm:mb-1.5">
                <div 
                  className="w-full bg-gray-600 rounded-full h-0.5 sm:h-1 mb-0.5 cursor-pointer hover:bg-gray-500 transition-all duration-300 relative"
                  onClick={handleProgressBarClick}
                >
                  <div 
                    className="bg-primary h-0.5 sm:h-1 rounded-full transition-all duration-200 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                  {/* Progress indicator dot */}
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full shadow-lg transition-all duration-200"
                    style={{ left: `${progressPercentage}%`, transform: 'translate(-50%, -50%)' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span className="text-xs">{formatTime(currentTime)}</span>
                  <span className="text-xs">{formatTime(duration)}</span>
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