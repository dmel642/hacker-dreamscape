import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import OpenAI from 'openai';
import { useToast } from "@/hooks/use-toast";
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
      
      // First, let's check if we can connect to Supabase
      const { data: testConnection, error: connectionError } = await supabase
        .from('_test')
        .select('*')
        .limit(1);
      
      if (connectionError) {
        console.log('Supabase connection test error:', connectionError);
      } else {
        console.log('Supabase connection successful');
      }

      // Now try to get the API key
      const { data: apiKey, error: secretError } = await supabase.rpc('get_secret', {
        secret_name: 'OPENAI_API_KEY'
      });

      console.log('API key retrieval attempt completed');
      if (secretError) {
        console.error('Detailed error fetching OpenAI API key:', {
          message: secretError.message,
          details: secretError.details,
          hint: secretError.hint
        });
        throw new Error(`Failed to fetch API key: ${secretError.message}`);
      }

      if (!apiKey) {
        console.error('No API key returned from get_secret');
        throw new Error('OpenAI API key not found in secrets.');
      }

      console.log('Successfully retrieved API key, initializing OpenAI');
      
      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
      
      console.log('Making request to OpenAI');
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

      const responseContent = completion.choices[0]?.message?.content;
      if (!responseContent) {
        throw new Error('No response generated from OpenAI');
      }

      console.log('AI response received:', responseContent);
      return responseContent;
    } catch (error) {
      console.error('Detailed error in generateAIResponse:', error);
      if (error instanceof Error) {
        throw new Error(`AI Response Generation Failed: ${error.message}`);
      }
      throw new Error('An unexpected error occurred while generating the response');
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
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
      console.error('Detailed error in handleSend:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate response. Please try again.",
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
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border-white/10 text-dreamlight"
          />
          <Button 
            onClick={handleSend}
            disabled={isTyping}
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