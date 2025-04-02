
import React, { useState, useEffect, useCallback } from 'react';
import { useCoins } from '@/hooks/useCoins';
import { toast } from 'sonner';

type Bubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  popped: boolean;
};

const COLORS = ['from-pink-400 to-purple-500', 'from-blue-400 to-purple-500', 'from-purple-400 to-indigo-500'];

const BubbleGame = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [timer, setTimer] = useState(60);
  const { addCoins } = useCoins();
  
  // Create new bubbles
  const createBubble = useCallback(() => {
    if (!gameActive) return;
    
    const newBubble: Bubble = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 40 + 40,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      popped: false
    };
    
    setBubbles(prev => [...prev, newBubble]);
    
    // Remove bubbles after some time if not popped
    setTimeout(() => {
      setBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id || bubble.popped));
    }, 5000);
  }, [gameActive]);
  
  // Pop a bubble and earn coins
  const popBubble = (id: number) => {
    setBubbles(prev => 
      prev.map(bubble => 
        bubble.id === id ? { ...bubble, popped: true } : bubble
      )
    );
    
    addCoins(1);
    
    // Remove popped bubble after animation
    setTimeout(() => {
      setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    }, 300);
  };
  
  // Start the game
  const startGame = () => {
    setGameActive(true);
    setTimer(60);
    setBubbles([]);
    toast("Game started! Pop bubbles to earn coins!");
  };
  
  // Game timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (gameActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameActive(false);
      toast("Game over! You can play again to earn more coins.");
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameActive, timer]);
  
  // Create bubbles periodically
  useEffect(() => {
    let bubbleInterval: NodeJS.Timeout | null = null;
    
    if (gameActive) {
      createBubble();
      bubbleInterval = setInterval(createBubble, 800);
    }
    
    return () => {
      if (bubbleInterval) clearInterval(bubbleInterval);
    };
  }, [gameActive, createBubble]);
  
  return (
    <div className="relative w-full max-w-3xl mx-auto h-[60vh] bg-luna-dark/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-luna-accent/30 shadow-lg">
      {/* Game area */}
      <div className="absolute inset-0">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className={`bubble ${bubble.color} ${bubble.popped ? 'animate-bubble-pop' : ''}`}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
            }}
            onClick={() => !bubble.popped && popBubble(bubble.id)}
          />
        ))}
      </div>
      
      {/* Game UI */}
      <div className="absolute top-4 left-0 right-0 flex justify-center">
        <div className="bg-luna-accent/40 backdrop-blur-sm px-4 py-2 rounded-full">
          {gameActive ? (
            <span className="font-medium">Time left: {timer}s</span>
          ) : (
            <span className="font-medium">Ready to play?</span>
          )}
        </div>
      </div>
      
      {/* Start button */}
      {!gameActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={startGame}
            className="px-6 py-3 bg-gradient-to-r from-luna-purple to-luna-accent rounded-full text-white font-semibold shadow-lg hover:shadow-xl transform transition hover:scale-105"
          >
            Start Bubble Pop
          </button>
        </div>
      )}
    </div>
  );
};

export default BubbleGame;
