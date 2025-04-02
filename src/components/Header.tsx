
import React from 'react';
import { useCoins } from '@/hooks/useCoins';
import { Coins } from 'lucide-react';

const Header = () => {
  const { coins } = useCoins();

  return (
    <header className="py-4 px-6 flex items-center justify-between relative z-10">
      <div className="flex items-center">
        <div className="h-10 w-10 bg-luna-purple rounded-full flex items-center justify-center mr-3">
          <span className="text-luna-dark font-bold text-lg">L</span>
        </div>
        <h1 className="text-2xl font-bold text-luna-white text-glow">Luna</h1>
      </div>
      <div className="flex items-center bg-luna-accent/30 backdrop-blur-sm px-4 py-2 rounded-full">
        <Coins className="text-yellow-300 mr-2" size={20} />
        <span className="font-medium">{coins}</span>
      </div>
    </header>
  );
};

export default Header;
