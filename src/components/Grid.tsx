import React from 'react';
import { motion } from 'framer-motion';

interface GridProps {
  numbers: { value: number; position: number }[];
  showNumbers: boolean;
  onCellClick: (position: number) => void;
  disabled: boolean;
  clickedNumbers: number[];
  showSolution?: boolean;
  incorrectClicks?: number[];
}

export default function Grid({ 
  numbers, 
  showNumbers, 
  onCellClick, 
  disabled, 
  clickedNumbers,
  showSolution,
  incorrectClicks = []
}: GridProps) {
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const rows = ['1', '2', '3', '4', '5', '6', '7'];

  const getClickOrder = (position: number) => {
    const index = clickedNumbers.indexOf(position);
    return index !== -1 ? index + 1 : null;
  };

  return (
    <div className="relative">
      {/* Column labels */}
      <div className="grid grid-cols-[2rem_repeat(7,1fr)] gap-2 mb-2">
        <div></div>
        {columns.map((col) => (
          <div key={col} className="text-center font-semibold text-gray-600">
            {col}
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Row labels */}
        <div className="flex flex-col mr-2">
          {rows.map((row) => (
            <div key={row} className="h-[2.5rem] flex items-center justify-center font-semibold text-gray-600">
              {row}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7 gap-2 flex-1">
          {Array.from({ length: 49 }).map((_, index) => {
            const number = numbers.find((n) => n.position === index);
            const isClicked = clickedNumbers.includes(index);
            const isIncorrect = incorrectClicks.includes(index);
            const clickOrder = getClickOrder(index);
            
            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                className={`h-[2.5rem] rounded-md text-lg font-bold relative ${
                  disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                } ${
                  showNumbers && number
                    ? 'bg-blue-500 text-white'
                    : isClicked
                    ? isIncorrect
                      ? 'bg-red-500/70 text-white'
                      : 'bg-green-500/70 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => !disabled && onCellClick(index)}
                disabled={disabled}
              >
                {showNumbers && number && <span>{number.value}</span>}
                {!showNumbers && clickOrder && <span>{clickOrder}</span>}
                {showSolution && number && !isClicked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-500/30 text-white">
                    {number.value}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}