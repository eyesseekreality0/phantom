import React, { useState } from 'react';
import { X, Camera, User, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    email: string;
    username: string;
    display_name?: string;
    profile_picture?: string;
    balance: number;
  } | null;
  onProfileUpdate: () => void;
}

export default function ProfileModal({ isOpen, onClose, user, onProfileUpdate }: ProfileModalProps) {
  const [displayName, setDisplayName] = useState(user?.display_name || user?.username || '');
  const [profilePicture, setProfilePicture] = useState(user?.profile_picture || '');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          display_name: displayName,
          profile_picture: profilePicture
        })
        .eq('id', user.id);

      if (error) {
        alert('Failed to update profile: ' + error.message);
        throw error;
      }

      onProfileUpdate();
      onClose();
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl border border-gray-700/50 w-full max-w-md relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23333%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Edit Profile</h2>
            <p className="text-gray-300">Customize your account appearance</p>
            
            {/* Balance Display */}
            <div className="mt-4 bg-gradient-to-r from-purple-900/30 to-gray-900/30 rounded-xl p-4 border border-purple-500/30">
              <h3 className="text-purple-300 font-semibold mb-2">Account Balance</h3>
              <p className="text-white text-2xl font-bold">${user.balance.toFixed(2)}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-700 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border-4 border-gray-600/50">
                  {profilePicture ? (
                    <img 
                      src={profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-gray-400 text-sm">Click the camera icon to upload a picture</p>
            </div>

            {/* Display Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
              />
            </div>

            {/* Profile Picture URL (Alternative) */}
            <div className="relative">
              <Camera className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="url"
                placeholder="Or paste image URL"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-700 to-gray-700 hover:from-purple-800 hover:to-gray-800 disabled:from-gray-800 disabled:to-gray-900 text-white py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed border border-gray-600/50 flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{isLoading ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}