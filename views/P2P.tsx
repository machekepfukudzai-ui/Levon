
import React, { useState } from 'react';
import { P2POffer, Currency } from '../types';
import { ArrowRightLeft, Star, Filter, Plus, X, Search, User, CheckCircle2, Banknote, Info, Smartphone, Zap, Building, CircleDollarSign, Wallet } from 'lucide-react';

export const P2P: React.FC = () => {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  
  // Filter States
  const [showFilters, setShowFilters] = useState(false);
  const [filterMin, setFilterMin] = useState('');
  const [filterMax, setFilterMax] = useState('');

  // Create Offer State
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState<{
    amount: string;
    minLimit: string;
    maxLimit: string;
    rate: string;
    paymentMethods: string[];
  }>({
    amount: '',
    minLimit: '',
    maxLimit: '',
    rate: '',
    paymentMethods: ['EcoCash']
  });
  
  const AVAILABLE_PAYMENT_METHODS = ['EcoCash', 'Zipit', 'Innbucks', 'Bank Transfer', 'Cash'];

  const getPaymentIcon = (method: string, size: number = 14) => {
    switch (method) {
      case 'EcoCash': return <Smartphone size={size} className="text-blue-400" />;
      case 'Zipit': return <Zap size={size} className="text-yellow-400" />;
      case 'Innbucks': return <CircleDollarSign size={size} className="text-orange-400" />;
      case 'Bank Transfer': return <Building size={size} className="text-indigo-400" />;
      case 'Cash': return <Banknote size={size} className="text-green-400" />;
      default: return <Wallet size={size} className="text-gray-400" />;
    }
  };

  const offers: P2POffer[] = [
    { id: '1', user: 'CryptoKing_ZW', type: 'sell', amount: 500, minLimit: 10, maxLimit: 500, currency: Currency.USD, rate: 14.5, paymentMethods: ['EcoCash', 'Zipit'], rating: 4.9 },
    { id: '2', user: 'HarareTrader', type: 'sell', amount: 1200, minLimit: 50, maxLimit: 1200, currency: Currency.USD, rate: 14.8, paymentMethods: ['Innbucks'], rating: 4.7 },
    { id: '3', user: 'FastCash', type: 'sell', amount: 50, minLimit: 5, maxLimit: 50, currency: Currency.USD, rate: 15.0, paymentMethods: ['EcoCash'], rating: 4.5 },
    { id: '4', user: 'ZimGoldHODL', type: 'buy', amount: 1000, minLimit: 20, maxLimit: 1000, currency: Currency.USD, rate: 13.9, paymentMethods: ['Zipit'], rating: 4.8 },
    { id: '5', user: 'ByoWhale', type: 'sell', amount: 2500, minLimit: 100, maxLimit: 2000, currency: Currency.USD, rate: 14.2, paymentMethods: ['Bank Transfer', 'Innbucks'], rating: 4.6 },
  ];

  const filteredOffers = offers.filter(offer => {
    if (offer.type !== mode) return false;
    if (offer.currency !== currency) return false;
    
    const min = parseFloat(filterMin);
    const max = parseFloat(filterMax);
    
    // If user enters a min amount, show offers where the max limit is at least that min amount
    if (!isNaN(min) && offer.maxLimit < min) return false;
    
    // If user enters a max amount, show offers where the min limit is at most that max amount
    if (!isNaN(max) && offer.minLimit > max) return false;

    return true;
  });

  const togglePaymentMethod = (method: string) => {
    setCreateForm(prev => {
      const exists = prev.paymentMethods.includes(method);
      if (exists) {
        return { ...prev, paymentMethods: prev.paymentMethods.filter(m => m !== method) };
      } else {
        return { ...prev, paymentMethods: [...prev.paymentMethods, method] };
      }
    });
  };

  const handleCreateSubmit = () => {
    // In a real app, this would submit to API
    setIsCreating(false);
    setCreateForm({ amount: '', minLimit: '', maxLimit: '', rate: '', paymentMethods: ['EcoCash'] });
  };

  if (isCreating) {
    return (
      <div className="p-6 pb-24 h-full overflow-y-auto animate-in slide-in-from-right">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-levon-800 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
          <h2 className="text-2xl font-bold text-white">Create Offer</h2>
        </div>

        <div className="space-y-6">
           <div className="bg-levon-800 p-1 rounded-xl flex">
              <button 
                onClick={() => setMode('buy')}
                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${mode === 'buy' ? 'bg-levon-primary text-levon-900' : 'text-gray-400'}`}
              >
                Buy {currency}
              </button>
              <button 
                onClick={() => setMode('sell')}
                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${mode === 'sell' ? 'bg-red-500 text-white' : 'text-gray-400'}`}
              >
                Sell {currency}
              </button>
           </div>

           <div>
             <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Total Amount to Trade</label>
             <div className="relative">
               <input 
                 type="number" 
                 value={createForm.amount}
                 onChange={e => setCreateForm({...createForm, amount: e.target.value})}
                 className="w-full bg-levon-800 border border-levon-700 rounded-xl px-4 py-3 text-white focus:border-levon-primary focus:outline-none transition-colors"
                 placeholder="e.g. 1000"
               />
               <span className="absolute right-4 top-3.5 text-gray-500 text-sm">{currency}</span>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Min Limit</label>
               <div className="relative">
                 <input 
                   type="number" 
                   value={createForm.minLimit}
                   onChange={e => setCreateForm({...createForm, minLimit: e.target.value})}
                   className="w-full bg-levon-800 border border-levon-700 rounded-xl px-4 py-3 text-white focus:border-levon-primary focus:outline-none transition-colors"
                   placeholder="10"
                 />
               </div>
             </div>
             <div>
               <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Max Limit</label>
               <div className="relative">
                 <input 
                   type="number" 
                   value={createForm.maxLimit}
                   onChange={e => setCreateForm({...createForm, maxLimit: e.target.value})}
                   className="w-full bg-levon-800 border border-levon-700 rounded-xl px-4 py-3 text-white focus:border-levon-primary focus:outline-none transition-colors"
                   placeholder="1000"
                 />
               </div>
             </div>
           </div>

           <div>
             <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Exchange Rate (per USD)</label>
             <div className="relative">
               <input 
                 type="number" 
                 value={createForm.rate}
                 onChange={e => setCreateForm({...createForm, rate: e.target.value})}
                 className="w-full bg-levon-800 border border-levon-700 rounded-xl px-4 py-3 text-white focus:border-levon-primary focus:outline-none transition-colors"
                 placeholder="e.g. 14.50"
               />
               <span className="absolute right-4 top-3.5 text-gray-500 text-sm">ZWG</span>
             </div>
           </div>

           <div>
            <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Payment Methods</label>
            <div className="flex flex-wrap gap-2">
                {AVAILABLE_PAYMENT_METHODS.map(method => {
                    const isSelected = createForm.paymentMethods.includes(method);
                    return (
                    <button
                        key={method}
                        onClick={() => togglePaymentMethod(method)}
                        className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${
                            isSelected
                            ? 'bg-levon-primary text-levon-900 border-levon-primary'
                            : 'bg-levon-800 text-gray-400 border-levon-700 hover:border-gray-500'
                        }`}
                    >
                        {getPaymentIcon(method, 16)}
                        {method}
                    </button>
                )})}
            </div>
            {createForm.paymentMethods.length === 0 && (
                <p className="text-xs text-red-400 mt-1">Please select at least one payment method</p>
            )}
           </div>

           <button 
             onClick={handleCreateSubmit}
             disabled={createForm.paymentMethods.length === 0}
             className="w-full bg-levon-primary text-levon-900 font-bold py-4 rounded-xl mt-4 hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Post Offer
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pb-20">
      <div className="px-6 pt-6 pb-2 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">P2P Trading</h2>
          <button 
            onClick={() => setIsCreating(true)}
            className="p-2 bg-levon-primary text-levon-900 rounded-full hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
           <button 
             onClick={() => setMode('buy')}
             className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${mode === 'buy' ? 'bg-levon-primary text-levon-900' : 'bg-levon-800 text-gray-400'}`}
           >
             Buy
           </button>
           <button 
             onClick={() => setMode('sell')}
             className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${mode === 'sell' ? 'bg-red-500 text-white' : 'bg-levon-800 text-gray-400'}`}
           >
             Sell
           </button>
           <div className="w-px h-8 bg-levon-700 mx-1"></div>
           <button 
             onClick={() => setCurrency(Currency.USD)}
             className={`px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${currency === Currency.USD ? 'border-levon-primary text-white bg-levon-800' : 'border-levon-700 text-gray-500'}`}
           >
             USD
           </button>
            <button 
             onClick={() => setCurrency(Currency.ZWG)}
             className={`px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${currency === Currency.ZWG ? 'border-levon-primary text-white bg-levon-800' : 'border-levon-700 text-gray-500'}`}
           >
             ZWG
           </button>
           <button 
             onClick={() => setShowFilters(!showFilters)}
             className={`p-2 rounded-full border transition-all ${showFilters ? 'border-levon-primary text-white bg-levon-800' : 'border-levon-700 text-gray-500'}`}
           >
             <Filter size={18} />
           </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 gap-3 p-4 bg-levon-800/50 rounded-xl border border-levon-700 animate-in slide-in-from-top-2">
             <div>
               <label className="text-[10px] text-gray-500 uppercase font-bold">Min Amount</label>
               <input 
                 type="number" 
                 placeholder="0"
                 value={filterMin}
                 onChange={e => setFilterMin(e.target.value)}
                 className="w-full bg-levon-900 border border-levon-700 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:border-levon-primary focus:outline-none"
               />
             </div>
             <div>
               <label className="text-[10px] text-gray-500 uppercase font-bold">Max Amount</label>
               <input 
                 type="number" 
                 placeholder="Any"
                 value={filterMax}
                 onChange={e => setFilterMax(e.target.value)}
                 className="w-full bg-levon-900 border border-levon-700 rounded-lg px-3 py-2 text-sm text-white mt-1 focus:border-levon-primary focus:outline-none"
               />
             </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-3">
        {filteredOffers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                <Search size={32} className="mb-2 opacity-50" />
                <p>No offers found</p>
            </div>
        ) : (
            filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-levon-800 border border-levon-700 rounded-2xl p-4 hover:border-levon-600 transition-all">
                <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-levon-700 flex items-center justify-center">
                        <span className="font-bold text-xs text-levon-primary">{offer.user.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-1">
                        {offer.user}
                        {offer.rating > 4.8 && <CheckCircle2 size={12} className="text-blue-400" />}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span className="text-yellow-500 flex items-center gap-0.5">
                            <Star size={10} fill="currentColor" /> {offer.rating}
                        </span>
                        <span>• 128 trades</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-white">
                    <span className="text-xs font-normal text-gray-400 mr-1">Rate:</span>
                    {offer.rate.toFixed(2)} <span className="text-xs text-gray-400">ZWG</span>
                    </p>
                </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-levon-900/50 p-2 rounded-lg border border-levon-700/30">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5 flex items-center gap-1">
                            <Banknote size={10} /> Available
                        </p>
                        <p className="text-sm font-semibold text-gray-200">{offer.amount} {offer.currency}</p>
                    </div>
                    <div className="bg-levon-900/50 p-2 rounded-lg border border-levon-700/30">
                         <p className="text-[10px] text-gray-500 uppercase font-bold mb-0.5 flex items-center gap-1">
                            <Info size={10} /> Limits
                        </p>
                         <p className="text-sm font-semibold text-gray-200">${offer.minLimit} - ${offer.maxLimit}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-levon-700/50">
                <div className="flex flex-wrap gap-2">
                    {offer.paymentMethods.map(pm => (
                    <span key={pm} className="flex items-center gap-1 px-2 py-1 rounded bg-levon-700/50 text-[10px] text-gray-300 border border-levon-600">
                        {getPaymentIcon(pm, 12)}
                        {pm}
                    </span>
                    ))}
                </div>
                <button className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${
                    offer.type === 'buy' 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-levon-primary hover:bg-emerald-500 text-levon-900'
                }`}>
                    {offer.type === 'buy' ? 'Sell' : 'Buy'} {offer.currency}
                </button>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};
