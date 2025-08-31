import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

interface TrackerHeaderProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

const TrackerHeader: React.FC<TrackerHeaderProps> = ({ theme, setTheme }) => {
  return (
    <div className="px-6 pt-6 pb-4 text-center relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-4 right-4 h-8 w-8"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <h1 className="text-xl font-bold text-foreground mb-1">
        Drink Water
      </h1>
      <p className="text-sm text-muted-foreground">
        Your daily progress
      </p>
    </div>
  );
};

export default TrackerHeader;
