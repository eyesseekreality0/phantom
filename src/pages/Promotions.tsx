import React from 'react';
import { Gift, Star, Trophy, Clock } from 'lucide-react';

export default function Promotions() {
  const promotions = [
    {
      id: 1,
      title: 'Welcome Bonus',
      description: 'Get 100% match bonus on your first deposit up to $500',
      bonus: '100% Match',
      icon: Gift,
      color: 'from-purple-600 to-gray-600'
    },
    {
      id: 2,
      title: 'Daily Rewards',
      description: 'Login daily to claim your 10% cashback bonus',
      bonus: '10% Daily',
      icon: Star,
      color: 'from-gray-600 to-purple-600'
    },
    {
      id: 3,
      title: 'Weekend Special',
      description: 'Get 30% bonus on all deposits during weekends',
      bonus: '30% Weekend',
      icon: Trophy,
      color: 'from-purple-600 to-gray-600'
    },
    {
      id: 4,
      title: 'VIP Program',
      description: 'Unlock exclusive benefits and higher cashout limits',
      bonus: 'Exclusive',
      icon: Clock,
      color: 'from-gray-600 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-gray-400 bg-clip-text text-transparent mb-6">
            Casino Promotions
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Boost your gaming experience with our exclusive promotions and bonuses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {promotions.map((promo) => {
            const IconComponent = promo.icon;
            return (
              <div key={promo.id} className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
                <div className={`w-16 h-16 bg-gradient-to-br ${promo.color} rounded-full flex items-center justify-center mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{promo.title}</h3>
                <p className="text-gray-300 mb-6">{promo.description}</p>
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-gray-400 bg-clip-text text-transparent">
                    {promo.bonus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Terms and Conditions */}
        <div className="mt-16 bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl p-8 border border-purple-500/30 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Terms & Conditions</h2>
          <div className="text-gray-300 space-y-3">
            <p>• Welcome bonus requires minimum deposit of $25</p>
            <p>• Daily cashback is calculated on net losses from previous day</p>
            <p>• Weekend bonus applies to deposits made Friday-Sunday</p>
            <p>• All bonuses subject to wagering requirements</p>
            <p>• Promotions may be modified or discontinued at any time</p>
            <p>• Must be 18+ to participate</p>
          </div>
        </div>
      </div>
    </div>
  );
}