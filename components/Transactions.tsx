
import React, { useState } from 'react';
import { Transaction, Currency } from '../types';
import { ShoppingBag, RefreshCw, ArrowUpRight, ArrowDownLeft, ChevronDown, ChevronUp, Share2, AlertCircle, CheckCircle2, Clock, Store, Download, CreditCard } from 'lucide-react';

interface TransactionsProps {
  transactions: Transaction[];
}

export const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  const getIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'payment': return <ShoppingBag size={18} />;
      case 'exchange': return <RefreshCw size={18} />;
      case 'deposit': return <ArrowDownLeft size={18} />;
      case 'p2p_trade': return <ArrowUpRight size={18} />;
      default: return <ShoppingBag size={18} />;
    }
  };

  const getColor = (type: Transaction['type']) => {
    switch (type) {
      case 'payment': return 'bg-red-500/20 text-red-500';
      case 'deposit': return 'bg-green-500/20 text-green-500';
      case 'p2p_trade': return 'bg-blue-500/20 text-blue-500';
      case 'exchange': return 'bg-purple-500/20 text-purple-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
      switch (status) {
          case 'completed': return 'text-green-500';
          case 'pending': return 'text-yellow-500';
          case 'failed': return 'text-red-500';
          default: return 'text-gray-500';
      }
  };

  const getStatusIcon = (status: Transaction['status']) => {
      switch (status) {
          case 'completed': return <CheckCircle2 size={14} />;
          case 'pending': return <Clock size={14} />;
          case 'failed': return <AlertCircle size={14} />;
          default: return null;
      }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="text-sm text-levon-primary hover:text-emerald-400">View All</button>
      </div>
      <div className="space-y-3">
        {transactions.map((tx) => {
            const isExpanded = expandedId === tx.id;
            return (
                <div 
                    key={tx.id} 
                    onClick={(e) => toggleExpand(tx.id, e)}
                    className={`flex flex-col p-3 rounded-xl transition-all border cursor-pointer ${
                        isExpanded 
                        ? 'bg-levon-800 border-levon-600 shadow-lg scale-[1.01]' 
                        : 'bg-levon-800/50 border-transparent hover:border-levon-700 hover:bg-levon-800'
                    }`}
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-full ${getColor(tx.type)}`}>
                                {getIcon(tx.type)}
                            </div>
                            <div>
                                <p className="font-medium text-white">{tx.title}</p>
                                <p className="text-xs text-gray-400">{tx.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${tx.type === 'deposit' || tx.type === 'p2p_trade' ? 'text-green-400' : 'text-white'}`}>
                                {tx.type === 'deposit' || tx.type === 'p2p_trade' ? '+' : '-'}{tx.currency === Currency.USD ? '$' : tx.currency === Currency.ZWG ? 'ZWG ' : '₿'}{tx.amount}
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-0.5">
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{tx.status}</p>
                                {isExpanded ? <ChevronUp size={12} className="text-gray-500"/> : <ChevronDown size={12} className="text-gray-500"/>}
                            </div>
                        </div>
                    </div>

                    {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-levon-700/50 animate-in fade-in slide-in-from-top-1 duration-200">
                            <div className="bg-levon-900/50 rounded-lg p-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Transaction ID</p>
                                    <p className="text-xs font-mono text-gray-300 break-all">#{tx.id}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Status Breakdown</p>
                                    <div className={`flex items-center gap-1.5 text-xs font-medium capitalize ${getStatusColor(tx.status)}`}>
                                        {getStatusIcon(tx.status)}
                                        {tx.status}
                                    </div>
                                </div>

                                <div>
                                     <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Transaction Type</p>
                                     <p className="text-xs text-gray-300 capitalize">{tx.type.replace('_', ' ')}</p>
                                </div>

                                {tx.paymentMethod && (
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Payment Method</p>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-300">
                                            <CreditCard size={12} className="text-gray-500" />
                                            {tx.paymentMethod}
                                        </div>
                                    </div>
                                )}

                                {tx.merchant && (
                                    <div className="col-span-2">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Merchant Details</p>
                                        <div className="flex items-center gap-2 text-sm text-white bg-levon-800 p-2 rounded-md border border-levon-700/50">
                                            <Store size={16} className="text-levon-primary"/>
                                            {tx.merchant}
                                        </div>
                                    </div>
                                )}
                                
                                <div className="col-span-2 flex gap-2 mt-2">
                                    {tx.status === 'completed' ? (
                                        <>
                                            <button className="flex-1 py-2.5 bg-levon-800 hover:bg-levon-700 rounded-lg text-xs font-medium text-gray-200 border border-levon-600 transition-colors flex items-center justify-center gap-2 shadow-sm group">
                                                <Download size={14} className="text-gray-400 group-hover:text-levon-primary transition-colors" /> Download Receipt
                                            </button>
                                            <button className="flex-1 py-2.5 bg-levon-800 hover:bg-levon-700 rounded-lg text-xs font-medium text-gray-200 border border-levon-600 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                                <Share2 size={14} /> Share Details
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="flex-1 py-2.5 bg-levon-800 hover:bg-levon-700 rounded-lg text-xs font-medium text-gray-200 border border-levon-600 transition-colors flex items-center justify-center gap-2 shadow-sm">
                                                <Share2 size={14} /> Share Receipt
                                            </button>
                                            {tx.status === 'failed' ? (
                                                <button className="flex-1 py-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-xs font-medium text-red-400 border border-red-500/20 transition-colors flex items-center justify-center gap-2">
                                                    <AlertCircle size={14} /> Report Issue
                                                </button>
                                            ) : (
                                                <button className="flex-1 py-2.5 bg-levon-800 hover:bg-levon-700 rounded-lg text-xs font-medium text-gray-200 border border-levon-600 transition-colors">
                                                    View on Explorer
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        })}
      </div>
    </div>
  );
};
