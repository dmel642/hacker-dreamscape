import React from 'react';
import { Terminal, Key, Play, Link } from 'lucide-react';
import DesktopIcon from './DesktopIcon';

const Desktop = () => {
  const icons = [
    {
      name: 'Start',
      icon: <Play className="w-8 h-8 text-dreampurple group-hover:text-dreammagenta transition-colors" />,
      onClick: () => console.log('Start clicked'),
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
  );
};

export default Desktop;