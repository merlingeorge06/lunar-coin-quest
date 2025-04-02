
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

type CoinsContextType = {
  coins: number;
  addCoins: (amount: number) => void;
};

const CoinsContext = createContext<CoinsContextType | undefined>(undefined);

export const CoinsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coins, setCoins] = useState<number>(0);
  
  // Load coins from localStorage on initial render
  useEffect(() => {
    const savedCoins = localStorage.getItem('luna-coins');
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    }
  }, []);
  
  // Save coins to localStorage when they change
  useEffect(() => {
    localStorage.setItem('luna-coins', coins.toString());
  }, [coins]);
  
  // Add coins and show toast notification
  const addCoins = (amount: number) => {
    setCoins(prev => prev + amount);
    if (amount >= 5) {
      toast(`Earned ${amount} coins!`);
    }
  };
  
  return (
    <CoinsContext.Provider value={{ coins, addCoins }}>
      {children}
    </CoinsContext.Provider>
  );
};

export const useCoins = (): CoinsContextType => {
  const context = useContext(CoinsContext);
  if (!context) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
};
