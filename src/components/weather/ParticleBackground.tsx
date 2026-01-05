import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

interface ParticleBackgroundProps {
  conditionCode: number;
  isDay: number;
  isLight: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  conditionCode, 
  isDay, 
  isLight 
}) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const getWeatherType = () => {
    if ([1000].includes(conditionCode)) return 'clear';
    if ([1003, 1006, 1009].includes(conditionCode)) return 'cloudy';
    if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(conditionCode)) return 'rain';
    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264].includes(conditionCode)) return 'snow';
    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) return 'storm';
    if ([1030, 1135, 1147].includes(conditionCode)) return 'mist';
    return 'clear';
  };

  const weatherType = getWeatherType();
  const isNight = isDay === 0;

  const particleConfig: ISourceOptions = useMemo(() => {
    // Clear day - golden particles & light rays
    if (weatherType === 'clear' && !isNight) {
      return {
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true } },
          color: { value: ['#FFD700', '#FFA500', '#FFE4B5', '#FFFFFF'] },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.2, max: 0.6 },
          },
          size: {
            value: { min: 1, max: 4 },
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: 'top' as const,
            random: true,
            straight: false,
            outModes: { default: 'out' as const }
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 }
          }
        }
      };
    }

    // Clear night - stars
    if (weatherType === 'clear' && isNight) {
      return {
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true } },
          color: { value: ['#FFFFFF', '#E0E0FF', '#FFE4E1', '#87CEEB'] },
          shape: { type: 'star' },
          opacity: {
            value: { min: 0.1, max: 1 },
          },
          size: {
            value: { min: 0.5, max: 3 },
          },
          move: {
            enable: true,
            speed: 0.1,
            direction: 'none' as const,
            random: true,
            straight: false,
            outModes: { default: 'bounce' as const }
          },
          twinkle: {
            particles: { enable: true, frequency: 0.05, opacity: 1 }
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'bubble' },
          },
          modes: {
            bubble: { distance: 150, size: 6, duration: 0.4, opacity: 1 }
          }
        }
      };
    }

    // Rain
    if (weatherType === 'rain' || weatherType === 'storm') {
      return {
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: weatherType === 'storm' ? 150 : 80, density: { enable: true } },
          color: { value: '#89CFF0' },
          shape: { type: 'line' },
          opacity: { value: { min: 0.3, max: 0.7 } },
          size: { value: { min: 1, max: 2 } },
          move: {
            enable: true,
            speed: weatherType === 'storm' ? 35 : 20,
            direction: 'bottom' as const,
            random: false,
            straight: true,
            outModes: { default: 'out' as const }
          },
        }
      };
    }

    // Snow
    if (weatherType === 'snow') {
      return {
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 100, density: { enable: true } },
          color: { value: '#FFFFFF' },
          shape: { type: 'circle' },
          opacity: { value: { min: 0.4, max: 0.9 } },
          size: { value: { min: 2, max: 6 } },
          move: {
            enable: true,
            speed: 2,
            direction: 'bottom' as const,
            random: true,
            straight: false,
            outModes: { default: 'out' as const },
            drift: 2
          },
          wobble: {
            enable: true,
            distance: 10,
            speed: 5
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
          },
          modes: {
            repulse: { distance: 80, duration: 0.4 }
          }
        }
      };
    }

    // Cloudy / Mist - soft floating particles
    if (weatherType === 'cloudy' || weatherType === 'mist') {
      return {
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 20, density: { enable: true } },
          color: { value: isLight ? '#94A3B8' : '#475569' },
          shape: { type: 'circle' },
          opacity: { value: { min: 0.1, max: 0.4 } },
          size: { value: { min: 50, max: 150 } },
          move: {
            enable: true,
            speed: 0.3,
            direction: 'right' as const,
            random: true,
            straight: false,
            outModes: { default: 'out' as const }
          },
        }
      };
    }

    // Default
    return {
      fullScreen: false,
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: 30, density: { enable: true } },
        color: { value: '#00AAFF' },
        shape: { type: 'circle' },
        opacity: { value: { min: 0.1, max: 0.4 } },
        size: { value: { min: 1, max: 4 } },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none' as const,
          random: true,
          outModes: { default: 'out' as const }
        }
      }
    };
  }, [weatherType, isNight, isLight]);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0"
      options={particleConfig}
    />
  );
};
