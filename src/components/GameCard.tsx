import React from 'react';
import { Play, Key, Eye, EyeOff } from 'lucide-react';

interface GameLogin {
  game: string;
  username: string;
  password: string;
}

interface GameCardProps {
  name: string;
  logo: string;
  gameUrl: string;
  onPlay: () => void;
  gameLogins: GameLogin[];
}

export default function GameCard({ name, logo, gameUrl, onPlay, gameLogins }: GameCardProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const gameLogin = gameLogins.find(login => login.game.toLowerCase() === name.toLowerCase());

  const handlePlayClick = () => {
    // Always open the game URL
    window.open(gameUrl, '_blank');
    
    // If they have login credentials, show them
    if (gameLogin) {
      setTimeout(() => {
        alert(`Game Login Details:\nUsername: ${gameLogin.username}\nPassword: ${gameLogin.password}\n\nGame opened in new tab!`);
      }, 500);
    }
  };

  return (
    <div className="group relative bg-gradient-to-br from-black/70 to-gray-900/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-600/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-900/25">
      {/* Game Logo */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/70 flex items-center justify-center p-8">
        <img 
          src={logo} 
          alt={name}
          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 filter brightness-75 group-hover:brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Login Status Indicator */}
        {gameLogin && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
            <Key className="w-4 h-4" />
            <span>Ready</span>
          </div>
        )}
      </div>

      {/* Game Credentials */}
      {gameLogin && (
        <div className="px-6 py-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-t border-green-500/30">
          <h4 className="text-green-300 font-semibold text-sm mb-3 flex items-center space-x-2">
            <Key className="w-4 h-4" />
            <span>Your Game Account</span>
          </h4>
          
          <div className="space-y-2">
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
              <p className="text-gray-400 text-xs mb-1">Username</p>
              <p className="text-white font-mono text-sm">{gameLogin.username}</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-400 text-xs">Password</p>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-white font-mono text-sm">
                {showPassword ? gameLogin.password : '••••••••'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Play Button */}
      <div className="p-6">
        <button
          onClick={handlePlayClick}
          className="w-full bg-gradient-to-r from-purple-700 to-gray-700 hover:from-purple-800 hover:to-gray-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-3 border border-gray-600/50"
        >
          <Play className="w-6 h-6" />
          <span>Play Now</span>
        </button>
        
        {gameLogin ? (
          <p className="text-green-400 text-sm text-center mt-2">Login credentials available</p>
        ) : (
          <p className="text-gray-400 text-sm text-center mt-2">Contact support for access</p>
        )}
      </div>
    </div>
  );
}