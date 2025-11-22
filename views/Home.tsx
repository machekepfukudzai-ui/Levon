
import React, { useState } from 'react';
import { BalanceCard } from '../components/BalanceCard';
import { Transactions } from '../components/Transactions';
import { CryptoChart } from '../components/Chart';
import { ExchangeRateWidget } from '../components/ExchangeRateWidget';
import { DepositModal } from '../components/DepositModal';
import { Currency, Transaction } from '../types';

export const Home: React.FC = () => {
  const [activeCurrency, setActiveCurrency] = useState<Currency>(Currency.ZWG);
  
  // Deposit Modal State
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositCurrency, setDepositCurrency] = useState<Currency>(Currency.ZWG);

  const transactions: Transaction[] = [
    { 
      id: 'TXN-88293', 
      type: 'payment', 
      amount: 2500, 
      currency: Currency.ZWG, 
      title: 'Pick n Pay', 
      merchant: 'Pick n Pay Avondale', 
      paymentMethod: 'ZWG Wallet',
      date: 'Today, 10:23 AM', 
      status: 'completed' 
    },
    { 
      id: 'TXN-77401', 
      type: 'p2p_trade', 
      amount: 50, 
      currency: Currency.USD, 
      title: 'Sold ZWG for USD', 
      paymentMethod: 'EcoCash Transfer',
      date: 'Yesterday, 14:30 PM', 
      status: 'completed' 
    },
    { 
      id: 'TXN-66102', 
      type: 'deposit', 
      amount: 0.002, 
      currency: Currency.BTC, 
      title: 'Received BTC', 
      paymentMethod: 'Bitcoin Network',
      date: '2 Days Ago', 
      status: 'completed' 
    },
    { 
      id: 'TXN-55921', 
      type: 'payment', 
      amount: 12.50, 
      currency: Currency.USD, 
      title: 'Nandos', 
      merchant: 'Nandos Sam Levy', 
      paymentMethod: 'USD Wallet',
      date: '3 Days Ago', 
      status: 'failed' 
    },
    { 
      id: 'TXN-44822', 
      type: 'exchange', 
      amount: 1500, 
      currency: Currency.ZWG, 
      title: 'Auto-Exchange', 
      paymentMethod: 'In-App Swap',
      date: 'Last Week', 
      status: 'pending' 
    },
  ];

  const handleOpenDeposit = (currency: Currency) => {
    setDepositCurrency(currency);
    setIsDepositModalOpen(true);
  };

  return (
    <div className="p-6 pb-24 space-y-6 overflow-y-auto h-full">
      <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
        <div className="min-w-[85%] sm:min-w-[350px] snap-center">
          <BalanceCard 
            currency={Currency.ZWG} 
            balance={15420.50} 
            symbol="ZWG " 
            trend={-1.2}
            isActive={activeCurrency === Currency.ZWG}
            onClick={() => setActiveCurrency(Currency.ZWG)}
            onDeposit={() => handleOpenDeposit(Currency.ZWG)}
          />
        </div>
        <div className="min-w-[85%] sm:min-w-[350px] snap-center">
          <BalanceCard 
            currency={Currency.USD} 
            balance={450.00} 
            symbol="$" 
            trend={0.5}
            isActive={activeCurrency === Currency.USD}
            onClick={() => setActiveCurrency(Currency.USD)}
            onDeposit={() => handleOpenDeposit(Currency.USD)}
          />
        </div>
        <div className="min-w-[85%] sm:min-w-[350px] snap-center">
          <BalanceCard 
            currency={Currency.BTC} 
            balance={0.045} 
            symbol="₿" 
            trend={5.2}
            isActive={activeCurrency === Currency.BTC}
            onClick={() => setActiveCurrency(Currency.BTC)}
            onDeposit={() => handleOpenDeposit(Currency.BTC)}
          />
        </div>
      </div>

      {/* Real-time Exchange Rates */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ExchangeRateWidget />
      </div>

      {activeCurrency === Currency.BTC && (
        <div className="animate-fade-in">
          <CryptoChart />
        </div>
      )}

      <div className="pb-4">
        <Transactions transactions={transactions} />
      </div>

      {/* Deposit Modal */}
      <DepositModal 
        isOpen={isDepositModalOpen} 
        onClose={() => setIsDepositModalOpen(false)}
        initialCurrency={depositCurrency}
      />
    </div>
  );
};
