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
      role: 'assistant' as const,
      content: "Hello! I'm your Dream Node AI assistant. I can help you with questions about AI, technology, creative projects, or any other topics you're interested in. What would you like to discuss?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (userInput: string): string => {
    // Keywords and their associated responses
    const responses = {
      'ai': "Artificial Intelligence is rapidly evolving. I can discuss various aspects like machine learning, neural networks, or practical applications. What specific area interests you?",
      'art': "Digital art has been transformed by AI tools like DALL-E and Midjourney. Would you like to learn more about AI-assisted art creation?",
      'music': "AI is revolutionizing music production through tools for composition, mixing, and mastering. I can explain more about specific aspects of AI in music.",
      'help': "I'm here to help! I can discuss technology, provide explanations, or explore creative ideas with you. What specific assistance do you need?",
      'learn': "Learning about AI and technology is exciting! I can help explain concepts, suggest resources, or discuss specific topics you're interested in.",
      'how': "I'd be happy to explain how things work. Could you specify what aspect you'd like to learn more about?",
      'what': "I can provide information and explanations about various topics. What specific subject would you like to know more about?"
    };

    // Convert input to lowercase for matching
    const lowercaseInput = userInput.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(responses)) {
      if (lowercaseInput.includes(keyword)) {
        return response;
      }
    }

    // Default response if no keywords match
    return `I understand you're interested in "${userInput}". I can provide information about AI, technology, creative projects, or answer other questions you might have. What specific aspect would you like to explore?`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user' as const,
      content: input
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // Generate response with slight delay for realism
    setTimeout(() => {
      const aiMessage: Message = {
        role: 'assistant' as const,
        content: generateResponse(input)
      };
      setMessages([...newMessages, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500); // Random delay between 1-1.5s
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
        {isTyping && (
          <div className="bg-dreampurple/20 p-3 rounded-lg ml-0 mr-12">
            <p className="text-dreamlight animate-pulse">Thinking...</p>
          </div>
        )}
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