import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const DreamNodeAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your Dream Node AI co-pilot. I'm here to assist you with digital art, music, and immersive experiences. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [
      ...messages,
      { role: 'user', content: input }
    ];
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I understand your interest in " + input.toLowerCase() + ". While I'm currently in development, I'm learning to assist with creative projects. Could you tell me more about what you'd like to achieve?"
        }
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <ScrollArea className="flex-1 p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === 'assistant'
                ? 'bg-dreampurple/20 ml-0 mr-12'
                : 'bg-dreamblue/20 ml-12 mr-0'
            }`}
          >
            <p className="text-dreamlight">{message.content}</p>
          </div>
        ))}
      </ScrollArea>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border-white/10 text-dreamlight"
          />
          <Button 
            onClick={handleSend}
            className="bg-gradient-to-r from-dreampurple to-dreammagenta hover:opacity-90"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DreamNodeAssistant;