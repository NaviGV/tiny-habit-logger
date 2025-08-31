import React from 'react';

export interface DayStatus {
  date: string;
  fullDate: string;
  completed: boolean;
  isToday: boolean;
}

interface WeekViewProps {
  weekData: DayStatus[];
}

const WeekView: React.FC<WeekViewProps> = ({ weekData }) => {
  return (
    <div className="px-6 pb-6">
      <div className="flex justify-between items-center">
        {weekData.map((day) => (
          <div key={day.fullDate} className="flex flex-col items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-out ${
                day.isToday ? 'border-primary' : 'border-transparent'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full transition-colors duration-300 ${
                  day.completed ? 'bg-green-500' : 'bg-muted'
                }`}
              />
            </div>
            <span className={`text-xs font-medium transition-colors duration-200 ${
              day.isToday ? 'text-primary font-bold' : 'text-muted-foreground'
            }`}>
              {day.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
