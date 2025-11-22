import React, { useState, useEffect } from 'react';
import { X, Smartphone, CreditCard, Building, CheckCircle, Loader2, ChevronRight, Wallet } from 'lucide-react';
import { Currency } from '../types';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCurrency: Currency;
}

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, initialCurrency }) => {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(initialCurrency);
  const [method, setMethod] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1: Input, 2: Processing, 3: Success
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedCurrency(initialCurrency);
      setStep(1);
      setAmount('');
      setMethod(null);
      setIsLoading(false);
    }
  }, [isOpen, initialCurrency]);

  if (!isOpen) return null;

  const handleDeposit = () => {
    setIsLoading(true);
    setStep(2);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 2500);
  };

  const methods = [
    { id: 'mobile', name: 'EcoCash / Zipit', icon: Smartphone, desc: 'Instant mobile money transfer' },
    { id: 'card', name: 'Visa / MasterCard', icon: CreditCard, desc: 'International & local cards' },
    { id: 'bank', name: 'Bank Transfer', icon: Building, desc: 'Direct EFT to Levon accounts' },
  ];

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Select Asset</label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[Currency.ZWG, Currency.USD, Currency.BTC].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2 transition-colors ${
                    selectedCurrency === curr 
                      ? 'bg-levon-700 border-levon-primary text-white shadow-md' 
                      : 'bg-levon-800 border-levon-700 text-gray-400 hover:border-levon-600'
                  }`}
                >
                  {curr === Currency.BTC ? <Wallet size={14} /> : <CreditCard size={14} />}
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase font-bold mb-2">Amount to Deposit</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-levon-900 border border-levon-700 rounded-xl px-4 py-4 text-2xl text-white focus:outline-none focus:border-levon-primary font-mono"
                placeholder="0.00"
                autoFocus
              />
              <span className="absolute right-4 top-5 text-gray-500 font-bold">{selectedCurrency}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase font-bold mb-3">Payment Method</label>
            <div className="space-y-2">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                    method === m.id
                      ? 'bg-levon-700 border-levon-primary shadow-lg ring-1 ring-levon-primary/50'
                      : 'bg-levon-800/50 border-levon-700 hover:bg-levon-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${method === m.id ? 'bg-levon-primary text-levon-900' : 'bg-levon-900 text-gray-400'}`}>
                      <m.icon size={20} />
                    </div>
                    <div className="text-left">
                      <p className={`font-medium text-sm ${method === m.id ? 'text-white' : 'text-gray-300'}`}>{m.name}</p>
                      <p className="text-xs text-gray-500">{m.desc}</p>
                    </div>
                  </div>
                  {method === m.id && <CheckCircle size={18} className="text-levon-primary" />}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDeposit}
            disabled={!amount || !method || parseFloat(amount) <= 0}
            className="w-full bg-levon-primary hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-levon-900 font-bold py-4 rounded-xl mt-4 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            Continue <ChevronRight size={18} />
          </button>
        </div>
      );
    }

    if (step === 2) {
      return (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 size={48} className="text-levon-primary animate-spin" />
          <h3 className="text-lg font-semibold text-white">Processing Deposit...</h3>
          <p className="text-sm text-gray-400 text-center max-w-xs">
            Please confirm the transaction on your device if prompted.
          </p>
        </div>
      );
    }

    if (step === 3) {
      return (
        <div className="flex flex-col items-center justify-center py-8 space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-1">Deposit Successful</h3>
            <p className="text-gray-400 text-sm">Funds have been added to your wallet.</p>
          </div>
          
          <div className="w-full bg-levon-900 rounded-xl p-4 border border-levon-700/50">
             <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Amount</span>
                <span className="text-white font-bold">{amount} {selectedCurrency}</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-gray-500">Method</span>
                <span className="text-white capitalize">{methods.find(m => m.id === method)?.name}</span>
             </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-levon-800 hover:bg-levon-700 text-white font-medium py-3 rounded-xl border border-levon-700 transition-colors"
          >
            Close
          </button>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-levon-900 sm:bg-levon-800 rounded-t-3xl sm:rounded-3xl border-t sm:border border-levon-700 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        
        <div className="flex items-center justify-between p-6 border-b border-levon-700/50 bg-levon-800/50">
          <h2 className="text-lg font-bold text-white">Deposit Funds</h2>
          <button onClick={onClose} className="p-1 hover:bg-levon-700 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};