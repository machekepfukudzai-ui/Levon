import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', val: 40000 },
  { name: 'Tue', val: 42000 },
  { name: 'Wed', val: 41000 },
  { name: 'Thu', val: 44000 },
  { name: 'Fri', val: 43500 },
  { name: 'Sat', val: 45000 },
  { name: 'Sun', val: 48000 },
];

export const CryptoChart: React.FC = () => {
  return (
    <div className="w-full h-48 bg-levon-800/30 rounded-2xl p-4 border border-levon-700/50">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h4 className="text-sm font-medium text-gray-400">Bitcoin Trend</h4>
          <p className="text-xl font-bold text-white">$48,000.00 <span className="text-sm text-emerald-500 font-normal">+5.2%</span></p>
        </div>
        <div className="flex gap-2">
           <span className="px-2 py-1 bg-levon-700 rounded text-xs text-white">1W</span>
           <span className="px-2 py-1 text-xs text-gray-500 hover:text-white cursor-pointer">1M</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="75%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
            itemStyle={{ color: '#10b981' }}
            labelStyle={{ display: 'none' }}
          />
          <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};