import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Games from './pages/Games';
import Promotions from './pages/Promotions';
import Support from './pages/Support';
import VIP from './pages/VIP';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Responsible from './pages/Responsible';
import AuthModal from './components/AuthModal';
import DepositModal from './components/DepositModal';
import ProfileModal from './components/ProfileModal';
import Footer from './components/Footer';
import ChatBubble from './components/ChatBubble';
import AdminChatPanel from './components/AdminChatPanel';
import {
  supabase,
  supabaseConfigErrorMessage,
  supabaseConfigured
} from './lib/supabase';

interface User {
  id: string;
  email: string;
  username: string;
  display_name?: string;
  profile_picture?: string;
  balance: number;
}

interface GameAccount {
  id: string;
  game: string;
  username: string;
  password: string;
  balance: number;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [gameAccounts, setGameAccounts] = useState<GameAccount[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabaseClient = supabase;
  const location = useLocation();
  const supabaseMissingMessage = supabaseConfigErrorMessage;

  const requireSupabase = () => {
    if (!supabaseClient) {
      alert(supabaseMissingMessage);
      return null;
    }

    return supabaseClient;
  };

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Check for existing session on load
  useEffect(() => {
    if (!supabaseClient) {
      console.warn(supabaseMissingMessage);
      return;
    }

    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabaseClient, supabaseMissingMessage]);

  const fetchUserProfile = async (userId: string) => {
    const client = requireSupabase();
    if (!client) return;

    const { data, error } = await client
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data && !error) {
      setUser({
        id: data.id,
        email: data.email,
        username: data.username,
        display_name: data.display_name,
        profile_picture: data.profile_picture,
        balance: data.balance || 0
      });

      // Check if user is admin (you can modify this logic)
      setIsAdmin(data.email === 'admin@phantomsfortune.com' || data.username === 'admin');

      // Fetch user's game accounts
      fetchGameAccounts(userId);
    }
  };

  const fetchGameAccounts = async (userId: string) => {
    const client = requireSupabase();
    if (!client) return;

    const { data, error } = await client
      .from('user_game_accounts')
      .select('*')
      .eq('user_id', userId);

    if (data && !error) {
      setGameAccounts(data.map(account => ({
        id: account.id,
        game: account.game_name,
        username: account.game_username,
        password: account.game_password,
        balance: account.game_balance
      })));
    }
  };
  const handleLogin = async (email: string, password: string) => {
    const client = requireSupabase();
    if (!client) return;

    const { error } = await client.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert('Login failed: ' + error.message);
      throw error;
    }

    setShowAuthModal(false);
  };

  const handleSignup = async (email: string, password: string, username: string) => {
    const client = requireSupabase();
    if (!client) return;

    // First check if username is already taken
    const { data: existingUser } = await client
      .from('user_profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUser) {
      alert('Username is already taken. Please choose a different username.');
      throw new Error('Username taken');
    }

    const { data, error } = await client.auth.signUp({
      email,
      password
    });

    if (error) {
      alert('Signup failed: ' + error.message);
      throw error;
    }

    if (data.user) {
      // Create user profile
      const { error: profileError } = await client
        .from('user_profiles')
        .insert({
          id: data.user.id,
          email,
          username,
          balance: 0,
          display_name: username
        });

      if (profileError) {
        alert('Profile creation failed: ' + profileError.message);
        throw profileError;
      }
    }

    setShowAuthModal(false);
  };

  const handleDeposit = async (amount: number, method: string) => {
    if (!user) return;
    const client = requireSupabase();
    if (!client) return;

    try {
      // Create transaction record
      const { error: transactionError } = await client
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'deposit',
          amount: amount,
          status: method === 'stripe' ? 'completed' : 'pending',
          payment_method: method,
          description: `Deposit via ${method}`
        });

      if (transactionError) throw transactionError;

      if (method === 'stripe') {
        // For Stripe, immediately update balance (in real implementation, this would be done via webhook)
        const { error: balanceError } = await client
          .from('user_profiles')
          .update({ balance: user.balance + amount })
          .eq('id', user.id);

        if (balanceError) throw balanceError;

        // Refresh user profile
        fetchUserProfile(user.id);
        alert(`$${amount} has been added to your account!`);
      } else {
        alert(`${method} deposit of $${amount} submitted for approval. Funds will be available within 24 hours.`);
      }
    } catch (error) {
      console.error('Deposit error:', error);
      alert('Deposit failed. Please try again.');
    }
  };

  const handleGameSelect = (gameUrl: string, gameName: string) => {
    // Check if user has login for this game
    const gameAccount = gameAccounts.find(account => account.game.toLowerCase() === gameName.toLowerCase());
    
    if (gameAccount) {
      // Show login details and open game
      alert(`Game Login Details:\nUsername: ${gameAccount.username}\nPassword: ${gameAccount.password}\nGame Balance: $${gameAccount.balance}\n\nOpening ${gameName}...`);
      window.open(gameUrl, '_blank');
    } else {
      // Prompt to contact support
      alert(`To access ${gameName}, please contact our support team through the chat bubble. They will set up your game account immediately!`);
    }
  };

  const addGameAccount = async (game: string, username: string, password: string) => {
    if (!user) return;
    const client = requireSupabase();
    if (!client) return;

    try {
      const { data, error } = await client
        .from('user_game_accounts')
        .insert({
          user_id: user.id,
          game_name: game,
          game_username: username,
          game_password: password,
          game_balance: 0
        })
        .select()
        .single();

      if (error) throw error;

      // Refresh game accounts
      fetchGameAccounts(user.id);
    } catch (error) {
      console.error('Error adding game account:', error);
    }
  };

  const handleTransferToGame = async (gameId: string, amount: number) => {
    if (!user || amount <= 0 || amount > user.balance) return;
    const client = requireSupabase();
    if (!client) return;

    try {
      const gameAccount = gameAccounts.find(acc => acc.id === gameId);
      if (!gameAccount) return;

      // Update user balance
      const { error: userError } = await client
        .from('user_profiles')
        .update({ balance: user.balance - amount })
        .eq('id', user.id);

      if (userError) throw userError;

      // Update game account balance
      const { error: gameError } = await client
        .from('user_game_accounts')
        .update({ game_balance: gameAccount.balance + amount })
        .eq('id', gameId);

      if (gameError) throw gameError;

      // Create transaction record
      const { error: transactionError } = await client
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'transfer_to_game',
          amount: amount,
          status: 'completed',
          game_name: gameAccount.game,
          description: `Transfer to ${gameAccount.game}`
        });

      if (transactionError) throw transactionError;

      // Refresh data
      fetchUserProfile(user.id);
      alert(`$${amount} transferred to ${gameAccount.game} successfully!`);
    } catch (error) {
      console.error('Transfer error:', error);
      alert('Transfer failed. Please try again.');
    }
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const handleProfileUpdate = () => {
    if (user) {
      fetchUserProfile(user.id);
    }
  };

  // Show admin panel if user is admin and on admin route
  if (isAdmin && location.pathname === '/admin/chat') {
    return <AdminChatPanel />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-900/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-gray-800/30 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-800/30 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gray-700/30 rounded-full blur-xl animate-pulse animation-delay-3000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-purple-900/30 rounded-full blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute animate-float-slow top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full"></div>
          <div className="absolute animate-float-medium top-3/4 left-3/4 w-1 h-1 bg-purple-300/30 rounded-full"></div>
          <div className="absolute animate-float-fast top-1/2 left-1/2 w-1.5 h-1.5 bg-gray-300/20 rounded-full"></div>
          <div className="absolute animate-float-slow top-1/3 right-1/3 w-2 h-2 bg-purple-300/20 rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10">
        {!supabaseConfigured && (
          <div className="bg-red-900/70 text-red-50 border border-red-500/40 px-4 py-3 text-center text-sm">
            {supabaseMissingMessage}
          </div>
        )}

        <Header
          user={user}
          onLogin={() => openAuthModal('login')}
          onSignup={() => openAuthModal('signup')}
          onDeposit={() => setShowDepositModal(true)}
          onProfileEdit={() => setShowProfileModal(true)}
        />
        
        <Routes>
          <Route path="/" element={
            <Home 
              onGetStarted={() => user ? setShowDepositModal(true) : openAuthModal('signup')}
              onGameSelect={handleGameSelect}
              gameAccounts={gameAccounts}
              onTransferToGame={handleTransferToGame}
            />
          } />
          <Route path="/games" element={
            <Games 
              onGameSelect={handleGameSelect}
              gameAccounts={gameAccounts}
              onTransferToGame={handleTransferToGame}
            />
          } />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/support" element={<Support />} />
          <Route path="/vip" element={<VIP />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/responsible" element={<Responsible />} />
        </Routes>
        
        <Footer />

        <AuthModal
          isOpen={showAuthModal}
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onSwitchMode={switchAuthMode}
        />

        <DepositModal
          isOpen={showDepositModal}
          onClose={() => setShowDepositModal(false)}
          onDeposit={handleDeposit}
        />

        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={user}
          onProfileUpdate={handleProfileUpdate}
        />

        <ChatBubble onGameAccountAdded={addGameAccount} />
      </div>
    </div>
  );
}

export default App;