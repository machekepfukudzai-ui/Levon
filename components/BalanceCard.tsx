import React from 'react';
import { Currency } from '../types';
import { ArrowUpRight, ArrowDownRight, CreditCard, Wallet } from 'lucide-react';

interface BalanceCardProps {
  currency: Currency;
  balance: number;
  trend?: number;
  symbol: string;
  isActive: boolean;
  onClick: () => void;
  onDeposit?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ currency, balance, trend, symbol, isActive, onClick, onDeposit }) => {
  const isPositive = trend && trend >= 0;

  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-6 transition-all duration-300 cursor-pointer border
        ${isActive 
          ? 'bg-gradient-to-br from-levon-800 to-levon-900 border-levon-primary shadow-[0_0_15px_rgba(16,185,129,0.2)] transform scale-[1.02]' 
          : 'bg-levon-800 border-levon-700 opacity-80 hover:opacity-100'
        }
      `}
    >
      {isActive && (
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-levon-primary/10 rounded-full blur-2xl pointer-events-none"></div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${currency === Currency.BTC ? 'bg-orange-500/20 text-orange-500' : currency === Currency.USD ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
             {currency === Currency.BTC ? <Wallet size={18} /> : <CreditCard size={18} />}
          </div>
          <span className="font-medium text-gray-300">{currency} Wallet</span>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center text-sm font-bold ${isPositive ? 'text-levon-primary' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Balance</p>
        <h2 className="text-3xl font-bold text-white">
          {symbol}{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h2>
      </div>

      {isActive && (
        <div className="mt-4 flex gap-2">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               onDeposit?.();
             }}
             className="flex-1 bg-levon-700 hover:bg-levon-600 py-1.5 rounded text-xs font-medium transition-colors text-white"
           >
             Add Funds
           </button>
           <button className="flex-1 bg-levon-700 hover:bg-levon-600 py-1.5 rounded text-xs font-medium transition-colors text-gray-300">
             Withdraw
           </button>
        </div>
      )}
    </div>
  );
};