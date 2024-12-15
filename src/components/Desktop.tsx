import React from 'react';
import { Terminal, Key, Play, Link } from 'lucide-react';
import DesktopIcon from './DesktopIcon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Desktop = () => {
  const [showStartDialog, setShowStartDialog] = React.useState(false);

  const icons = [
    {
      name: 'Start',
      icon: <Play className="w-8 h-8 text-dreampurple group-hover:text-dreammagenta transition-colors" />,
      onClick: () => setShowStartDialog(true),
    },
    {
      name: 'Keys',
      icon: <Key className="w-8 h-8 text-dreampurple group-hover:text-dreammagenta transition-colors" />,
      onClick: () => console.log('Keys clicked'),
    },
    {
      name: 'Process',
      icon: <Terminal className="w-8 h-8 text-dreampurple group-hover:text-dreammagenta transition-colors" />,
      onClick: () => console.log('Process clicked'),
    },
    {
      name: 'X',
      icon: <Link className="w-8 h-8 text-dreampurple group-hover:text-dreammagenta transition-colors" />,
      onClick: () => window.open('https://x.com/dreammeldai', '_blank'),
    },
  ];

  return (
    <>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 p-4">
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.name}
            name={icon.name}
            icon={icon.icon}
            onClick={icon.onClick}
          />
        ))}
      </div>

      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="glass-effect max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta">
              Welcome to DreamMeld AI
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-lg leading-relaxed text-dreamlight">
            DreamMeld AI is a decentralized protocol that harmonizes human consciousness with generative AI. By creating "Dream Nodes" and "Mind Keys," it allows individuals to store their creative essence on-chain, enabling intuitive, collaborative creation environments. Each Dream Node becomes a personal AI co-pilot, assisting in building next-gen digital art, music, and immersive experiences. MELD fuses the boundaries between the artist and the canvas, forging a community where collective imagination sparks infinite possibilities.
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Desktop;