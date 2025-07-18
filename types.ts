
export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number | null;
  low_24h: number | null;
  price_change_percentage_24h: number | null;
}

export type SortKey = 'market_cap' | 'current_price' | 'price_change_percentage_24h';

export interface Order {
    price: number;
    amount: number;
    total: number;
}

export interface Trade {
    id: string;
    time: string;
    price: number;
    amount: number;
    type: 'buy' | 'sell';
}

// --- SHARED USER & TRANSACTION TYPES ---

export interface Transaction {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Trade' | 'Transfer' | 'Exchange';
  asset: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  pair?: string;
  side?: 'Buy' | 'Sell';
  senderAddress?: string;
  withdrawalAddress?: string;
  screenshotURL?: string;
  fromAccount?: 'spot' | 'seconds';
  toAccount?: 'spot' | 'seconds';
  toAsset?: string;
  toAmount?: number;
}

export interface UserPortfolio {
  balance: number; // Represents main liquid balance, typically USDT
  pendingBalance: number;
  pl: number;
  plPercentage: number;
  balances: { [assetSymbol: string]: number };
}

export interface SecondContractPortfolio {
  balance: number;
}

export interface UserOrder {
  id: string;
  pair: string;
  type: 'buy' | 'sell';
  orderType: 'limit' | 'market' | 'stop';
  price: number;
  amount: number;
  filled: number;
  status: 'open' | 'partially-filled' | 'filled' | 'cancelled';
  createdAt: string;
}

export type NewOrderData = Omit<UserOrder, 'id' | 'status' | 'createdAt' | 'filled'>;
export type UpdateOrderData = Partial<Pick<UserOrder, 'price' | 'amount'>>;
export type DepositData = { amount: number; asset: string; senderAddress: string; screenshotFile: File };
export type WithdrawalData = { asset: string; address: string; amount: number; fundPassword?: string; };

export interface SecondContractTrade {
  id: string;
  pair: string;
  type: 'buy' | 'sell'; // 'buy' for up, 'sell' for down
  duration: number; // in seconds
  profitRate: number; // e.g., 0.8 for 80%
  amount: number;
  entryPrice: number;
  closePrice?: number;
  status: 'active' | 'won' | 'lost';
  createdAt: string; // ISO string
  closesAt: string; // ISO string
}

export interface NewSecondContractData {
  pair: string;
  type: 'buy' | 'sell';
  duration: number; // in seconds
  profitRate: number; // e.g., 0.8 for 80%
  amount: number;
}

export interface User {
  name: string;
  email: string;
  uid: string;
  photoURL?: string;
  password?: string; // This is for mock auth only, DO NOT DO THIS IN PRODUCTION
  country?: string;
  birthDate?: string;
  phone?: string;
  identityStatus: 'not-verified' | 'pending' | 'verified' | 'rejected';
  identityDocuments?: {
    idFrontUrl?: string;
    idBackUrl?: string;
    selfieUrl?: string;
  }
  is2FAEnabled?: boolean;
  fundPassword?: string;
  portfolio: UserPortfolio;
  secondContractPortfolio: SecondContractPortfolio;
  transactions: Transaction[];
  openOrders: UserOrder[];
  orderHistory: UserOrder[];
  activeSecondContracts: SecondContractTrade[];
  secondContractHistory: SecondContractTrade[];
}

export interface Ico {
  id: string;
  name: string;
  status: 'In progress' | 'Listed' | 'Ended';
  tag: string;
  subscribed: number;
  total: number;
  remainingPercentage: number;
  issuePrice: number;
  issueCurrency: string;
  subscriptionCurrencies: string[];
  startTime: string;
  endTime: string;
  onlineTime: string;
  introduction: string;
}
