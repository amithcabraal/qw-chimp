import React from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

interface MenuProps {
  onShowHowToPlay: () => void;
}

export default function Menu({ onShowHowToPlay }: MenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button
            onClick={() => {
              onShowHowToPlay();
              setIsOpen(false);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            How to Play
          </button>
          <a
            href="mailto:contact@example.com"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Contact Us
          </a>
          <button
            onClick={() => {
              window.open('/privacy', '_blank');
              setIsOpen(false);
            }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Privacy Policy
          </button>
        </div>
      )}
    </div>
  );
}