import React, { useState } from 'react';
import { Keypair } from '@solana/web3.js';
import { Button } from "@/components/ui/button";

const KeyGenerator = () => {
  const [keys, setKeys] = useState<string[]>([]);

  const generateKey = () => {
    if (keys.length >= 5) {
      console.log('Maximum number of keys reached');
      return;
    }
    
    const keypair = Keypair.generate();
    const privateKey = Buffer.from(keypair.secretKey).toString('hex');
    setKeys([...keys, privateKey]);
    console.log('New key generated');
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
            Mind Key {index + 1}: {key.slice(0, 20)}...
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyGenerator;