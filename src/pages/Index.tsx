import React, { useState, useEffect } from 'react';
import Desktop from '@/components/Desktop';
import Background from '@/components/Background';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload both background images
    const introImage = new Image();
    const bgImage = new Image();
    let loadedCount = 0;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) {
        setImagesLoaded(true);
        console.log('All background images loaded');
      }
    };

    introImage.src = '/lovable-uploads/068dd864-585b-4713-a465-899b39542435.png';
    bgImage.src = '/lovable-uploads/b704c80a-a812-467d-8f19-9e36b1ca66a8.png';

    introImage.onload = checkAllLoaded;
    bgImage.onload = checkAllLoaded;

    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500); // Changed to 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!imagesLoaded) {
    return (
      <div className="fixed inset-0 bg-dreamdark flex items-center justify-center">
        <div className="animate-pulse">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta">
            DreamMeld AI
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {showIntro ? (
        <div className="fixed inset-0 bg-dreamdark">
          <div 
            className="absolute inset-0 bg-[url('/lovable-uploads/068dd864-585b-4713-a465-899b39542435.png')] bg-cover bg-center opacity-50 animate-fade-in" 
            style={{ willChange: 'opacity' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta animate-glow drop-shadow-[0_0_15px_rgba(155,135,245,0.5)] tracking-tight">
              DreamMeld AI
            </h1>
          </div>
        </div>
      ) : (
        <>
          <Background />
          <div className="container mx-auto pt-16">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 relative">
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta blur-sm animate-glow">
                DreamMeld AI
              </span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta animate-glow drop-shadow-[0_0_15px_rgba(155,135,245,0.5)] tracking-tight">
                DreamMeld AI
              </span>
            </h1>
            <Desktop />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;