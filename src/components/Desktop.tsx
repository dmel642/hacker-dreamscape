import React from 'react';
import { Terminal, Key, Play, Link } from 'lucide-react';
import DesktopIcon from './DesktopIcon';
import KeyGenerator from './KeyGenerator';
import DreamNodeAssistant from './DreamNodeAssistant';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Desktop = () => {
  const [showStartDialog, setShowStartDialog] = React.useState(false);
  const [showKeysDialog, setShowKeysDialog] = React.useState(false);
  const [showDreamNodesDialog, setShowDreamNodesDialog] = React.useState(false);

  const icons = [
    {
      name: 'Welcome',
      icon: <Play className="w-8 h-8 text-dreampurple group-hover:text-dreammagenta transition-colors" />,
      onClick: () => setShowStartDialog(true),
    },
    {
      name: 'Keys',
      icon: <Key className="w-8 h-8 text-dreampurple group-hover:text-dreammagenta transition-colors" />,
      onClick: () => setShowKeysDialog(true),
    },
    {
      name: 'Dream Nodes',
      icon: <Terminal className="w-8 h-8 text-dreampurple group-hover:text-dreammagenta transition-colors" />,
      onClick: () => setShowDreamNodesDialog(true),
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

      {/* Windows-style taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 glass-effect border-t border-white/20 flex items-center px-4 z-50">
        <div className="flex space-x-4">
          {icons.map((icon, index) => (
            <button
              key={index}
              onClick={icon.onClick}
              className="flex items-center space-x-2 px-3 py-1.5 rounded hover:bg-white/10 transition-colors"
            >
              {icon.icon}
              <span className="text-sm text-dreamlight">{icon.name}</span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="glass-effect max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta">
              Welcome to DreamMeld AI
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-lg leading-relaxed text-dreamlight">
            DreamMeld AI is a decentralized protocol that harmonizes human consciousness with generative AI. By creating "Dream Nodes" and "Mind Keys," it allows individuals to store their creative essence on-chain, enabling intuitive, collaborative creation environments. Each Dream Node securely stores user-generated creative data, enabling on-chain collaboration in fields like digital art, music, and writing. MELD fuses the boundaries between the artist and the canvas, forging a community where collective imagination sparks infinite possibilities.
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showKeysDialog} onOpenChange={setShowKeysDialog}>
        <DialogContent className="glass-effect max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta">
              Generate Mind Keys
            </DialogTitle>
          </DialogHeader>
          <KeyGenerator />
        </DialogContent>
      </Dialog>

      <Dialog open={showDreamNodesDialog} onOpenChange={setShowDreamNodesDialog}>
        <DialogContent className="glass-effect max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-dreampurple via-dreamblue to-dreammagenta">
              Dream Node Assistant
            </DialogTitle>
          </DialogHeader>
          <DreamNodeAssistant />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Desktop;