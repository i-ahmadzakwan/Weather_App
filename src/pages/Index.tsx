import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '@/hooks/useWeather';
import { SearchInput } from '@/components/weather/SearchInput';
import { EnhancedCurrentWeather } from '@/components/weather/EnhancedCurrentWeather';
import { EnhancedHourlyForecast } from '@/components/weather/EnhancedHourlyForecast';
import { EnhancedAirQuality } from '@/components/weather/EnhancedAirQuality';
import { EnhancedThemeToggle } from '@/components/weather/EnhancedThemeToggle';
import { Footer } from '@/components/weather/Footer';
import { EnhancedBackground } from '@/components/weather/EnhancedBackground';
import { SkeletonLoader, GlobeLoader } from '@/components/weather/SkeletonLoader';
import { AnimatedContainer } from '@/components/weather/AnimatedContainer';
import { CloudSun } from 'lucide-react';

const Index: React.FC = () => {
  const [isLight, setIsLight] = useState(false);
  const { data, isLoading, error, fetchWeather } = useWeather();

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLight]);

  useEffect(() => {
    fetchWeather('London');
  }, [fetchWeather]);

  const handleSearch = (location: string) => {
    fetchWeather(location);
  };

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  return (
    <div className="min-h-screen relative overflow-hidden pb-24">
      {/* Dynamic Background with Particles */}
      <EnhancedBackground 
        conditionCode={data?.current.condition.code || 1000}
        isDay={data?.current.is_day ?? 1}
        isLight={isLight}
      />

      {/* Theme Toggle */}
      <EnhancedThemeToggle isLight={isLight} onToggle={toggleTheme} />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-lg">
        {/* Header */}
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <CloudSun className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Weather<span className="text-primary">App</span>
            </h1>
          </motion.div>
          <p className="text-muted-foreground">Real-time weather with stunning visuals</p>
        </motion.header>

        {/* Search Input */}
        <SearchInput onSearch={handleSearch} isLoading={isLoading} />

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="glass-card p-4 mb-6 border-destructive/50"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: 'spring' }}
            >
              <p className="text-destructive text-center">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {isLoading && !data && <GlobeLoader />}

        {/* Weather Content */}
        <AnimatedContainer isVisible={!!data && !isLoading} locationKey={data?.location.name}>
          {data && (
            <>
              <EnhancedCurrentWeather data={data} />
              <EnhancedHourlyForecast data={data} />
              <EnhancedAirQuality data={data} />
            </>
          )}
        </AnimatedContainer>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
