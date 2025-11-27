import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import GameCard from './GameCard';

interface GameAccount {
  id: string;
  game: string;
  username: string;
  password: string;
  balance: number;
}

interface GamesSectionProps {
  onGameSelect: (gameUrl: string, gameName: string) => void;
  gameAccounts: GameAccount[];
  onTransferToGame: (gameId: string, amount: number) => void;
}

export default function GamesSection({ onGameSelect, gameAccounts, onTransferToGame }: GamesSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const games = [
    {
      id: 1,
      name: 'VBlink',
      logo: '/vblink.jpeg',
      category: 'slots',
      url: 'https://www.vblink777.club/'
    },
    {
      id: 2,
      name: 'UltraPanda',
      logo: 'https://images.pexels.com/photos/6664186/pexels-photo-6664186.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'slots',
      url: 'https://www.ultrapanda.mobi/'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Games' },
    { id: 'slots', name: 'Slots' }
  ];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleGamePlay = (gameUrl: string, gameName: string) => {
    onGameSelect(gameUrl, gameName);
  };

  return (
    <section id="games" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-gray-300 bg-clip-text text-transparent mb-6">
            Games
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose from our collection of premium casino games and start winning today.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-900/50 border border-gray-700/50 rounded-xl pl-12 pr-8 py-3 text-white focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 appearance-none cursor-pointer"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id} className="bg-gray-900">
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {filteredGames.map(game => (
            <GameCard
              key={game.id}
              name={game.name}
              logo={game.logo}
              gameUrl={game.url}
              onPlay={() => handleGamePlay(game.url, game.name)}
              gameAccounts={gameAccounts}
              onTransferToGame={onTransferToGame}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No games found matching your criteria</p>
          </div>
        )}

        {/* Chat Instructions */}
        <div className="mt-16 bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl p-8 border border-purple-500/30 max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Game Access</h3>
          <p className="text-gray-300 text-lg">
            Message our support chat to get instant access to your favorite games. 
            Our team will set up your game account and provide login details immediately.
          </p>
        </div>
      </div>
    </section>
  );
}