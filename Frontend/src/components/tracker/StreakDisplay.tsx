import React from 'react';

interface StreakDisplayProps {
  streak: number;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ streak }) => {
  return (
    <div className="px-6 pb-6 text-center">
      <div className="text-6xl font-bold text-foreground mb-2 transition-all duration-300 ease-out">
        {streak}
      </div>
      <p className="text-lg text-muted-foreground font-medium">
        Day Streak
      </p>
    </div>
  );
};

export default StreakDisplay;
