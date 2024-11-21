import React from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  seconds: number;
  total: number;
}

export default function Timer({ seconds, total }: TimerProps) {
  const progress = (seconds / total) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-blue-500"
        initial={{ width: '100%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}