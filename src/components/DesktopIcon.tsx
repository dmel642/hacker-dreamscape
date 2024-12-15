import React from 'react';
import { cn } from '@/lib/utils';

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ name, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex flex-col items-center gap-2 p-4 cursor-pointer",
        "rounded-lg backdrop-blur-sm hover:bg-white/5",
        "transition-all duration-300 animate-float",
        "hover:scale-105"
      )}
    >
      <div className="p-3 rounded-lg bg-gradient-to-br from-dreampurple/20 to-dreamblue/20 backdrop-blur-md">
        {icon}
      </div>
      <span className="text-dreamlight text-sm text-center group-hover:text-dreammagenta transition-colors">
        {name}
      </span>
    </div>
  );
};

export default DesktopIcon;