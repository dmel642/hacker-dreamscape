import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import OpenAI from 'openai';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const DreamNodeAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your Dream Node AI assistant. I can help you with questions about AI, technology, creative projects, or any other topics you're interested in. What would you like to discuss?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const generateAIResponse = async (userInput: string) => {
    try {
      console.log('Generating AI response for:', userInput);
      
      const { data: apiKey, error: secretError } = await supabase.rpc('get_secret', {
        name: 'OPENAI_API_KEY'
      });

      if (secretError || !apiKey) {
        console.error('Error fetching OpenAI API key:', secretError);
        throw new Error('Failed to fetch OpenAI API key');
      }

      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
      });
      
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant focused on technology, creative projects, and innovation. Provide clear, informative responses while maintaining a friendly and engaging tone.'
          },
          ...messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: 'user',
            content: userInput
          }
        ],
        model: 'gpt-4',
        temperature: 0.7,
      });

      console.log('AI response received:', completion.choices[0]?.message?.content);
      return completion.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response. Please try again.';
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    
    try {
      const aiResponse = await generateAIResponse(input);
      const aiMessage: Message = {
        role: 'assistant',
        content: aiResponse
      };
      setMessages([...newMessages, aiMessage]);
    } catch (error) {
      console.error('Error in handleSend:', error);
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
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