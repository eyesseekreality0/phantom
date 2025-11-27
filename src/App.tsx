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
import { supabase } from './lib/supabase';

interface User {
  id: string;
  email: string;
  username: string;
  display_name?: string;
  profile_picture?: string;
}

interface GameLogin {
  game: string;
  username: string;
  password: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [gameLogins, setGameLogins] = useState<GameLogin[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Check for existing session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
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
        profile_picture: data.profile_picture
      });

      // Check if user is admin (you can modify this logic)
      setIsAdmin(data.email === 'admin@phantomsfortune.com' || data.username === 'admin');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
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
    // First check if username is already taken
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUser) {
      alert('Username is already taken. Please choose a different username.');
      throw new Error('Username taken');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      alert('Signup failed: ' + error.message);
      throw error;
    }

    if (data.user) {
      // Create user profile
      const { error: profileError } = await supabase
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
    // Simulate deposit with approval process
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert(`${method} deposit of $${amount} submitted for approval. Funds will be available within 24 hours.`);
  };

  const handleGameSelect = (gameUrl: string, gameName: string) => {
    // Check if user has login for this game
    const gameLogin = gameLogins.find(login => login.game.toLowerCase() === gameName.toLowerCase());
    
    if (gameLogin) {
      // Show login details and open game
      alert(`Game Login Details:\nUsername: ${gameLogin.username}\nPassword: ${gameLogin.password}\n\nOpening ${gameName}...`);
      window.open(gameUrl, '_blank');
    } else {
      // Prompt to contact support
      alert(`To access ${gameName}, please contact our support team through the chat bubble. They will set up your game account immediately!`);
    }
  };

  const addGameLogin = (game: string, username: string, password: string) => {
    setGameLogins(prev => [...prev, { game, username, password }]);
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
              gameLogins={gameLogins}
            />
          } />
          <Route path="/games" element={
            <Games 
              onGameSelect={handleGameSelect}
              gameLogins={gameLogins}
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

        <ChatBubble onGameLoginAdded={addGameLogin} />
      </div>
    </div>
  );
}

export default App;