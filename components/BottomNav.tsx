import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Repeat, Store, MessageSquareText } from 'lucide-react';

interface BottomNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, icon: LayoutDashboard, label: 'Home' },
    { id: ViewState.P2P, icon: Repeat, label: 'P2P' },
    { id: ViewState.PAY, icon: Store, label: 'Pay' },
    { id: ViewState.ASSISTANT, icon: MessageSquareText, label: 'Ask AI' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-levon-900/95 backdrop-blur-lg border-t border-levon-800 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-levon-primary' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};