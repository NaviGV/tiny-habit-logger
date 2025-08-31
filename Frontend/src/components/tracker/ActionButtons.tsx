import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ActionButtonsProps {
  isCompletedToday: boolean;
  onMarkDone: () => void;
  onReset: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isCompletedToday, onMarkDone, onReset }) => {
  return (
    <div className="px-6 pb-6">
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onMarkDone}
          disabled={isCompletedToday}
          className="bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 disabled:bg-gray-400"
        >
          Mark Done
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="font-medium">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset your streak?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently reset your habit streak.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onReset}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Reset Streak
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ActionButtons;
