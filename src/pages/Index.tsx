import React from 'react';
import Desktop from '@/components/Desktop';
import Background from '@/components/Background';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      <div className="container mx-auto pt-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta animate-glow">
          DreamMeld AI
        </h1>
        <Desktop />
      </div>
    </div>
  );
};

export default Index;