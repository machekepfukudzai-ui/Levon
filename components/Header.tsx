import React from 'react';
import { Bell, User, ScanLine, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onScanClick: () => void;
  unreadCount: number;
  onNotificationClick: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScanClick, unreadCount, onNotificationClick, isDark, toggleTheme }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-levon-900/95 backdrop-blur-md sticky top-0 z-20 border-b border-levon-800 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-levon-primary to-levon-accent flex items-center justify-center text-white font-bold shadow-lg">
          LW
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-none">Levon Wallet</h1>
          <span className="text-xs text-gray-400">Hello, Tinashe</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-levon-800 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button 
          onClick={onScanClick}
          className="p-2 rounded-full bg-levon-800 hover:bg-levon-700 text-levon-primary transition-colors"
          aria-label="Scan QR"
        >
          <ScanLine size={20} />
        </button>
        <button 
          onClick={onNotificationClick}
          className="relative p-2 rounded-full hover:bg-levon-800 transition-colors text-gray-400 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-levon-900 animate-pulse"></span>
          )}
        </button>
        <div className="w-8 h-8 rounded-full bg-levon-700 flex items-center justify-center overflow-hidden border border-levon-600">
           <User size={16} className="text-gray-300" />
        </div>
      </div>
    </header>
  );
};