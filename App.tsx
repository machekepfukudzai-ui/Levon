import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Home } from './views/Home';
import { P2P } from './views/P2P';
import { Pay } from './views/Pay';
import { Assistant } from './views/Assistant';
import { Notifications } from './components/Notifications';
import { ViewState, AppNotification } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  
  // Theme State
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Initialize with mock notifications
  useEffect(() => {
    setNotifications([
      {
        id: '1',
        type: 'trade',
        title: 'P2P Trade Request',
        message: 'User ZimGold wants to buy 50 USD from you. Check P2P.',
        time: '2m ago',
        read: false
      },
      {
        id: '2',
        type: 'payment',
        title: 'Payment Successful',
        message: 'You paid $12.50 to Nandos Sam Levy. Receipt #55921',
        time: '1h ago',
        read: false
      },
      {
        id: '3',
        type: 'alert',
        title: 'Low ZWG Balance',
        message: 'Your ZWG balance is below 1000. Consider exchanging USD.',
        time: '3h ago',
        read: true
      },
      {
        id: '4',
        type: 'system',
        title: 'System Update',
        message: 'Levon Wallet maintenance scheduled for Sunday 2AM.',
        time: '1d ago',
        read: true
      }
    ]);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Home />;
      case ViewState.P2P:
        return <P2P />;
      case ViewState.PAY:
        return <Pay />;
      case ViewState.ASSISTANT:
        return <Assistant />;
      default:
        return <Home />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col h-screen bg-levon-900 text-white transition-colors duration-300">
      <Header 
        onScanClick={() => setView(ViewState.PAY)} 
        unreadCount={unreadCount}
        onNotificationClick={handleNotificationClick}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      
      {showNotifications && (
        <>
          {/* Overlay to close on click outside */}
          <div 
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setShowNotifications(false)}
          ></div>
          <Notifications 
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
            onMarkRead={handleMarkRead}
            onClearAll={handleClearAll}
          />
        </>
      )}
      
      <main className="flex-1 overflow-hidden relative">
        {renderView()}
      </main>

      <BottomNav currentView={currentView} setView={setView} />
    </div>
  );
};

export default App;