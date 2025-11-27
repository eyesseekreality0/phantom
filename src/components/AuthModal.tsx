import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, username: string) => void;
  onSwitchMode: () => void;
}

export default function AuthModal({ 
  isOpen, 
  mode, 
  onClose, 
  onLogin, 
  onSignup, 
  onSwitchMode 
}: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === 'login') {
        await onLogin(email, password);
      } else {
        await onSignup(email, password, username);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSwitchMode = () => {
    resetForm();
    onSwitchMode();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl border border-gray-700/50 w-full max-w-md relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23333%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Join the Casino'}
            </h2>
            <p className="text-gray-300">
              {mode === 'login' 
                ? 'Sign in to your casino account' 
                : 'Create your phantom casino account'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-700 to-gray-700 hover:from-purple-800 hover:to-gray-800 disabled:from-gray-800 disabled:to-gray-900 text-white py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed border border-gray-600/50"
            >
              {isLoading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Join the Casino')}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="text-center mt-6">
            <p className="text-gray-300">
              {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={handleSwitchMode}
                className="text-purple-400 hover:text-white font-semibold ml-2 transition-colors"
              >
                {mode === 'login' ? 'Join Now' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Terms */}
          {mode === 'signup' && (
            <p className="text-xs text-gray-400 text-center mt-4">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}