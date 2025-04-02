
import React from 'react';
import Header from '@/components/Header';
import StarBackground from '@/components/StarBackground';
import BubbleGame from '@/components/BubbleGame';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <StarBackground />
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Intro card */}
          <Card className="bg-luna-dark/40 backdrop-blur-sm border-luna-accent/30 mb-8 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-glow">Welcome to Luna</CardTitle>
              <CardDescription className="text-center text-luna-white/80">
                Your companion for stress relief during periods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">
                Pop the bubbles to relieve stress and earn coins. Each bubble popped is a moment of mindfulness.
              </p>
            </CardContent>
          </Card>
          
          {/* Game component */}
          <BubbleGame />
          
          {/* Benefits section */}
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Card className="bg-luna-dark/40 backdrop-blur-sm border-luna-accent/30">
              <CardHeader>
                <CardTitle className="text-xl text-center">Stress Relief</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  The rhythmic popping helps reduce tension and anxiety
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-luna-dark/40 backdrop-blur-sm border-luna-accent/30">
              <CardHeader>
                <CardTitle className="text-xl text-center">Mindfulness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Focus on the present moment and let your worries fade away
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-luna-dark/40 backdrop-blur-sm border-luna-accent/30">
              <CardHeader>
                <CardTitle className="text-xl text-center">Reward Yourself</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  Earn coins as you take time for self-care during your period
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-luna-white/60 text-sm">
        <p>Luna - Your period wellness companion © 2023</p>
      </footer>
    </div>
  );
};

export default Index;
