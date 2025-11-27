import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, Settings } from 'lucide-react';

interface User {
  id: string;
  email: string;
  username: string;
  display_name?: string;
  profile_picture?: string;
  balance: number;
}

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onSignup: () => void;
  onDeposit: () => void;
  onProfileEdit: () => void;
}

export default function Header({ user, onLogin, onSignup, onDeposit, onProfileEdit }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 border-b border-gray-700/50 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/1000024592.jpeg" 
              alt="Phantom's Fortune" 
              className="w-12 h-12 object-contain filter drop-shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-gray-300 bg-clip-text text-transparent">
                Phantom's Fortune
              </h1>
              <p className="text-gray-400 text-sm">Premium Casino</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/games" 
              className={`transition-colors ${isActive('/games') ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'}`}
            >
              Games
            </Link>
            <Link 
              to="/promotions" 
              className={`transition-colors ${isActive('/promotions') ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'}`}
            >
              Promotions
            </Link>
            <Link 
              to="/vip" 
              className={`transition-colors ${isActive('/vip') ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'}`}
            >
              VIP
            </Link>
            <Link 
              to="/support" 
              className={`transition-colors ${isActive('/support') ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'}`}
            >
              Support
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-purple-900/50 to-gray-900/50 rounded-lg px-4 py-2 border border-purple-500/30">
                  <span className="text-purple-300 text-sm font-semibold">Balance:</span>
                  <span className="text-white font-bold text-lg">${user.balance.toFixed(2)}</span>
                </div>
                <span className="text-gray-300 hidden md:block">
                  Welcome, {user.display_name || user.username}
                </span>
                <button
                  onClick={onDeposit}
                  className="bg-gradient-to-r from-purple-700 to-gray-700 hover:from-purple-800 hover:to-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 border border-gray-600/50"
                >
                  Deposit
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-10 h-10 bg-gradient-to-br from-purple-700 to-gray-700 rounded-full flex items-center justify-center border border-gray-600/50 overflow-hidden hover:scale-105 transition-transform"
                  >
                    {user.profile_picture ? (
                      <img 
                        src={user.profile_picture} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-700/50 shadow-2xl z-50">
                      <button
                        onClick={() => {
                          onProfileEdit();
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-purple-600/20 transition-colors flex items-center space-x-2 rounded-t-xl"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onLogin}
                  className="text-gray-300 hover:text-purple-400 transition-colors px-4 py-2"
                >
                  Login
                </button>
                <button
                  onClick={onSignup}
                  className="bg-gradient-to-r from-purple-700 to-gray-700 hover:from-purple-800 hover:to-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 border border-gray-600/50"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-purple-400"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700/50">
            <nav className="flex flex-col space-y-3 mt-4">
              <Link to="/games" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Games</Link>
              <Link to="/promotions" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Promotions</Link>
              <Link to="/vip" className="text-gray-300 hover:text-purple-400 transition-colors py-2">VIP</Link>
              <Link to="/support" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Support</Link>
              {user && (
                <button
                  onClick={() => {
                    onProfileEdit();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-purple-400 transition-colors py-2 text-left flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}