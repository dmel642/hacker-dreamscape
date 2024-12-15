import React, { useState, useEffect } from 'react';
import { Keypair } from '@solana/web3.js';
import { Button } from "@/components/ui/button";

const KeyGenerator = () => {
  const [keys, setKeys] = useState<string[]>([]);

  // Load keys from localStorage on component mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('mindKeys');
    if (savedKeys) {
      setKeys(JSON.parse(savedKeys));
      console.log('Loaded saved keys from localStorage');
    }
  }, []);

  const generateKey = () => {
    if (keys.length >= 5) {
      console.log('Maximum number of keys reached');
      return;
    }
    
    const keypair = Keypair.generate();
    const privateKey = Array.from(keypair.secretKey)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    const newKeys = [...keys, privateKey];
    setKeys(newKeys);
    localStorage.setItem('mindKeys', JSON.stringify(newKeys));
    console.log('New key generated and saved to localStorage');
  };

  return (
    <div className="space-y-4">
      <div className="text-lg leading-relaxed text-dreamlight">
        Mind Keys are special cryptographic keys that store your creative essence on the Solana blockchain. 
        Generate up to 5 unique Mind Keys to unlock different aspects of your creative potential.
      </div>
      
      <Button 
        onClick={generateKey}
        disabled={keys.length >= 5}
        className="bg-gradient-to-r from-dreampurple to-dreammagenta hover:opacity-90"
      >
        Generate Mind Key
      </Button>

      <div className="space-y-2">
        {keys.map((key, index) => (
          <div key={index} className="p-3 rounded-lg bg-white/5 text-sm font-mono text-dreamlight break-all">
            Mind Key {index + 1}: {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyGenerator;