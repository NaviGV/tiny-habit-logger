import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import storage, { Log } from '@/lib/storage';
import { Droplet } from 'lucide-react';

import TrackerHeader from './tracker/TrackerHeader';
import StreakDisplay from './tracker/StreakDisplay';
import WeekView, { DayStatus } from './tracker/WeekView';
import ActionButtons from './tracker/ActionButtons';

const HabitTracker = () => {
  // FOR TESTING
  // change the date required const MOCK_TODAY: string | null = '2025-09-01T12:00:00';
  const MOCK_TODAY: string | null = null;
  

  const [logs, setLogs] = useState<Log[]>([]);
  const { theme, setTheme } = useTheme();

  const getToday = () => {
    if (MOCK_TODAY) {
      const mockDate = new Date(MOCK_TODAY);
      // Check if the date is valid. An invalid date's time is NaN.
      if (!isNaN(mockDate.getTime())) {
        return mockDate;
      }
    }
    // If MOCK_TODAY is null OR if it's an invalid string, use the real current date.
    return new Date();
  };

  useEffect(() => {
    const fetchData = async () => {
      const savedLogs = await storage.getLogs();
      setLogs(savedLogs);

      const today = getToday();
      const todayStr = getLocalYYYYMMDD(today);
      const isTodayCompleted = savedLogs.some(log => log.date === todayStr);

      if (!isTodayCompleted) {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = getLocalYYYYMMDD(yesterday);
        const wasYesterdayCompleted = savedLogs.some(log => log.date === yesterdayStr);

        if (wasYesterdayCompleted) {
          toast.info("Keep your streak alive!", {
            description: "Don't forget to drink water today.",
            duration: 3000,
            icon: <Droplet className="h-4 w-4" />,
          });
        } else {
          toast.info("Ready to start a new streak?", {
            description: "Don't forget to drink water today!",
            duration: 3000,
            icon: <Droplet className="h-4 w-4" />,
          });
        }
      }

    };
    fetchData();
  }, []);

  const getLocalYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  
  const getTodayString = () => getLocalYYYYMMDD(getToday());

  
  const generateLast7Days = (): DayStatus[] => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekDisplayData: DayStatus[] = [];
    const today = getToday();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const fullDateStr = getLocalYYYYMMDD(date);
      const dayName = daysOfWeek[date.getDay()];
      const logForDay = logs.find(log => log.date === fullDateStr);
      weekDisplayData.push({
        date: dayName,
        fullDate: fullDateStr,
        completed: logForDay?.completed || false,
        isToday: i === 0,
      });
    }
    return weekDisplayData.reverse();
  };

  
  const calculateStreak = (currentLogs: Log[]): number => {
    if (currentLogs.length === 0) return 0;
    const completedDates = new Set(currentLogs.map(log => log.date));
    let streak = 0;
    const today = getToday();
    const todayStr = getTodayString();

    if (completedDates.has(todayStr)) {
      streak++;
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      let currentDate = yesterday;
      while (completedDates.has(getLocalYYYYMMDD(currentDate))) { 
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      }
    } else {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      let currentDate = yesterday;
      while (completedDates.has(getLocalYYYYMMDD(currentDate))) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak(logs);
  const isCompletedToday = logs.some(log => log.date === getTodayString() && log.completed);
  const weekData = generateLast7Days();

  const handleMarkDone = async () => {
    const todayStr = getTodayString();
    const newLog: Log = { date: todayStr, completed: true };
    await storage.addLog(newLog);
    const updatedLogs = await storage.getLogs();
    setLogs(updatedLogs);
     toast.success("Great job!", {
      description: "You've completed your habit for today.",
      duration: 3000,
    });
  };

  const handleReset = async () => {
    await storage.resetLogs();
    setLogs([]);
    
      toast.error("Streak Reset", {
      description: "Your habit streak has been reset. Start fresh!",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-card shadow-lg border-0 rounded-2xl overflow-hidden">
        <TrackerHeader theme={theme} setTheme={setTheme} />
        <StreakDisplay streak={currentStreak} />
        <WeekView weekData={weekData} />
        <ActionButtons
          isCompletedToday={isCompletedToday}
          onMarkDone={handleMarkDone}
          onReset={handleReset}
        />
      </Card>
    </div>
  );
};

export default HabitTracker;

