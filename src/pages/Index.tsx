import React, { useState, useEffect } from 'react';
import Desktop from '@/components/Desktop';
import Background from '@/components/Background';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {showIntro ? (
        <div className="fixed inset-0 bg-dreamdark">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/d7209daa-bfc3-4c3f-bc85-a3035f78bc0b.png')] bg-cover bg-center opacity-50 animate-fade-in" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta animate-glow">
              DreamMeld AI
            </h1>
          </div>
        </div>
      ) : (
        <>
          <Background />
          <div className="container mx-auto pt-16">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta animate-glow">
              DreamMeld AI
            </h1>
            <Desktop />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;