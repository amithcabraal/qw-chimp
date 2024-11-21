import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  seconds: number;
  onComplete: () => void;
}

export default function CountdownTimer({ seconds, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="flex flex-col items-center space-y-2 h-[4rem]">
      <motion.div
        key={timeLeft}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl font-bold text-blue-500"
      >
        {timeLeft}
      </motion.div>
      <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / seconds) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>
    </div>
  );
}