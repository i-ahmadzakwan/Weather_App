import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  isLight: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isLight, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-3 glass-card rounded-full transition-all duration-500 hover:scale-110 hover:shadow-glow group"
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`absolute inset-0 w-6 h-6 text-sun transition-all duration-500 ${
            isLight ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-6 h-6 text-moon transition-all duration-500 ${
            isLight ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'
          }`}
        />
      </div>
    </button>
  );
};
