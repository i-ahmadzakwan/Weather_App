import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchInputProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-5 py-4 pl-12 pr-24 rounded-2xl glass-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 group-hover:shadow-glow-sm"
          disabled={isLoading}
          aria-label="Search for a city"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:bg-primary/90 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 min-w-[80px] flex items-center justify-center"
          aria-label="Search"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
};
