
import * as React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.tsx';
import MarketsScreen from './screens/MarketsScreen.tsx';
import TradingScreen from './screens/TradingScreen.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import BottomNav from './components/BottomNav.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { useAuth } from './contexts/AuthContext.tsx';
import { Loader } from 'lucide-react';
import SubscriptionScreen from './screens/SubscriptionScreen.tsx';
import SubscriptionDetailsScreen from './screens/SubscriptionDetailsScreen.tsx';
import AboutScreen from './screens/AboutScreen.tsx';
import SecondContractScreen from './screens/SecondContractScreen.tsx';
import TransferScreen from './screens/TransferScreen.tsx';
import ExchangeScreen from './screens/ExchangeScreen.tsx';
import RegisterScreen from './screens/RegisterScreen.tsx';
import IdentityAuthenticationScreen from './screens/IdentityAuthenticationScreen.tsx';
import SecurityScreen from './screens/SecurityScreen.tsx';
import LoginScreen from './screens/LoginScreen.tsx';
import WalletScreen from './screens/WalletScreen.tsx';

const App = () => {
  const { isLoggedIn, isInitialized } = useAuth();
  const location = useLocation();

  const showBottomNav = ['/', '/markets', '/trading', '/wallet', '/second-contract'].includes(location.pathname);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-black text-slate-900 dark:text-white">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-black text-slate-900 dark:text-white min-h-screen font-sans">
      <main className={isLoggedIn && showBottomNav ? "pb-24" : ""}>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route path="/" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
          <Route path="/markets" element={<ProtectedRoute><MarketsScreen /></ProtectedRoute>} />
          <Route path="/trading" element={<ProtectedRoute><TradingScreen /></ProtectedRoute>} />
          <Route path="/trading/:pair" element={<ProtectedRoute><TradingScreen /></ProtectedRoute>} />
          <Route path="/second-contract" element={<ProtectedRoute><SecondContractScreen /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><WalletScreen /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
          <Route path="/subscription" element={<ProtectedRoute><SubscriptionScreen /></ProtectedRoute>} />
          <Route path="/subscription/:id" element={<ProtectedRoute><SubscriptionDetailsScreen /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><AboutScreen /></ProtectedRoute>} />
          <Route path="/transfer" element={<ProtectedRoute><TransferScreen /></ProtectedRoute>} />
          <Route path="/exchange" element={<ProtectedRoute><ExchangeScreen /></ProtectedRoute>} />
          <Route path="/identity-authentication" element={<ProtectedRoute><IdentityAuthenticationScreen /></ProtectedRoute>} />
          <Route path="/security" element={<ProtectedRoute><SecurityScreen /></ProtectedRoute>} />
          
          {/* Old profile route redirects to wallet */}
          <Route path="/profile" element={<Navigate to={isLoggedIn ? "/wallet" : "/login"} replace />} />

          {/* If a user tries any other path, redirect them. */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
        </Routes>
      </main>
      {isLoggedIn && showBottomNav && <BottomNav />}
    </div>
  );
};

export default App;
