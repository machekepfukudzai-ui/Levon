
export enum Currency {
  USD = 'USD',
  ZWG = 'ZWG', // Zimbabwe Gold
  BTC = 'BTC'
}

export interface Transaction {
  id: string;
  type: 'payment' | 'deposit' | 'p2p_trade' | 'exchange';
  amount: number;
  currency: Currency;
  title: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  merchant?: string;
  paymentMethod?: string;
}

export interface P2POffer {
  id: string;
  user: string;
  type: 'buy' | 'sell';
  amount: number;
  minLimit: number;
  maxLimit: number;
  currency: Currency;
  rate: number; // Exchange rate relative to USD
  paymentMethods: string[];
  rating: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface AppNotification {
  id: string;
  type: 'system' | 'trade' | 'payment' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  P2P = 'P2P',
  PAY = 'PAY',
  ASSISTANT = 'ASSISTANT',
  SETTINGS = 'SETTINGS'
}
