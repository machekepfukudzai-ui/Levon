import React from 'react';
import { AppNotification } from '../types';
import { Bell, CheckCircle, AlertTriangle, Info, ArrowRightLeft, X, CheckCheck } from 'lucide-react';

interface NotificationsProps {
  notifications: AppNotification[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ notifications, onClose, onMarkRead, onClearAll }) => {
  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'payment': return <CheckCircle size={18} className="text-green-500" />;
      case 'alert': return <AlertTriangle size={18} className="text-orange-500" />;
      case 'trade': return <ArrowRightLeft size={18} className="text-blue-500" />;
      default: return <Info size={18} className="text-gray-400" />;
    }
  };

  const getBgColor = (type: AppNotification['type']) => {
    switch (type) {
      case 'payment': return 'bg-green-500/10 border-green-500/20';
      case 'alert': return 'bg-orange-500/10 border-orange-500/20';
      case 'trade': return 'bg-blue-500/10 border-blue-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="absolute top-16 right-4 w-80 sm:w-96 bg-levon-900/95 backdrop-blur-xl border border-levon-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between p-4 border-b border-levon-800 bg-levon-800/50">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-levon-primary" />
          <h3 className="font-bold text-white text-sm">Notifications</h3>
          <span className="bg-levon-700 text-xs px-1.5 py-0.5 rounded-md text-gray-300">
            {notifications.filter(n => !n.read).length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {notifications.length > 0 && (
             <button onClick={onClearAll} className="text-[10px] font-medium text-gray-400 hover:text-white uppercase tracking-wider transition-colors">
               Clear All
             </button>
          )}
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <Bell size={32} className="mb-2 opacity-20" />
            <p className="text-sm">No new notifications</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              onClick={() => onMarkRead(notif.id)}
              className={`relative p-3 rounded-xl border transition-all cursor-pointer group ${
                notif.read 
                  ? 'bg-transparent border-transparent opacity-60 hover:opacity-100 hover:bg-levon-800/30' 
                  : `${getBgColor(notif.type)} hover:bg-opacity-20`
              }`}
            >
              <div className="flex gap-3">
                <div className={`mt-1 flex-shrink-0 ${notif.read ? 'grayscale' : ''}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className={`text-sm font-semibold truncate pr-2 ${notif.read ? 'text-gray-400' : 'text-white'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{notif.message}</p>
                </div>
                {!notif.read && (
                  <div className="absolute top-3 right-3 w-2 h-2 bg-levon-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {notifications.some(n => !n.read) && (
        <button 
            onClick={() => notifications.forEach(n => onMarkRead(n.id))}
            className="w-full py-3 text-center text-xs font-medium text-levon-primary hover:bg-levon-800/50 border-t border-levon-800 transition-colors flex items-center justify-center gap-2"
        >
            <CheckCheck size={14} /> Mark all as read
        </button>
      )}
    </div>
  );
};