import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

const DreamNodeAssistant = () => {
  const [content, setContent] = useState('');
  const [isStoring, setIsStoring] = useState(false);
  const [storedNodes, setStoredNodes] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchDreamNodes();
  }, []);

  const fetchDreamNodes = async () => {
    try {
      console.log('Fetching dream nodes...');
      const { data, error } = await supabase
        .from('dream_nodes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching dream nodes:', error);
        throw error;
      }

      console.log('Fetched dream nodes:', data);
      setStoredNodes(data || []);
    } catch (error) {
      console.error('Error in fetchDreamNodes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch stored content",
        variant: "destructive"
      });
    }
  };

  const handleStore = async () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content to store",
        variant: "destructive"
      });
      return;
    }

    setIsStoring(true);
    try {
      console.log('Storing dream node content:', content);
      
      const { data, error } = await supabase
        .from('dream_nodes')
        .insert([
          { content, content_type: 'text' }
        ])
        .select();

      if (error) {
        console.error('Error storing dream node:', error);
        throw error;
      }

      console.log('Successfully stored dream node:', data);
      
      toast({
        title: "Success",
        description: "Successfully stored on chain",
      });
      
      setContent('');
      fetchDreamNodes(); // Refresh the list after storing
    } catch (error) {
      console.error('Detailed error in handleStore:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to store content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsStoring(false);
    }
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="text-lg leading-relaxed text-dreamlight">
            DreamMeld AI is a decentralized protocol that harmonizes human consciousness with generative AI. By creating "Dream Nodes" and "Mind Keys," it allows individuals to store their creative essence on-chain, enabling intuitive, collaborative creation environments. Each Dream Node securely stores user-generated creative data, enabling on-chain collaboration in fields like digital art, music, and writing. MELD fuses the boundaries between the artist and the canvas, forging a community where collective imagination sparks infinite possibilities.
          </div>
          
          <div className="p-6 rounded-lg glass-effect">
            <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-dreampurple to-dreammagenta">
              Create New Dream Node
            </h3>
            <div className="space-y-4">
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your creative content..."
                className="bg-white/5 border-white/10 text-dreamlight"
                onKeyPress={(e) => e.key === 'Enter' && handleStore()}
              />
              <Button 
                onClick={handleStore}
                disabled={isStoring}
                className="w-full bg-gradient-to-r from-dreampurple to-dreammagenta hover:opacity-90"
              >
                {isStoring ? 'Storing...' : 'Store on Chain'}
              </Button>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-dreampurple to-dreammagenta">
              Stored Dream Nodes
            </h3>
            {storedNodes.map((node) => (
              <Card key={node.id} className="glass-effect">
                <CardContent className="p-4">
                  <p className="text-dreamlight">{node.content}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(node.created_at).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DreamNodeAssistant;