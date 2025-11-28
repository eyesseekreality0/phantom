import React from 'react';
import { Crown, Star, Diamond } from 'lucide-react';

export default function VIP() {
  const tiers = [
    {
      name: 'Bronze',
      icon: Star,
      color: 'from-amber-600 to-orange-600',
      monthlyDeposit: '$500',
      dailyCashout: '$250'
    },
    {
      name: 'Silver',
      icon: Crown,
      color: 'from-gray-400 to-gray-600',
      monthlyDeposit: '$1,500',
      dailyCashout: '$500'
    },
    {
      name: 'Gold',
      icon: Diamond,
      color: 'from-yellow-400 to-yellow-600',
      monthlyDeposit: '$5,000',
      dailyCashout: '$1,000'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            VIP Program
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock higher daily cashout limits based on your monthly deposit activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map(tier => {
            const IconComponent = tier.icon;
            return (
              <div key={tier.name} className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
                <div className={`w-20 h-20 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white text-center mb-6">{tier.name}</h3>
                
                {/* Monthly Deposit Requirement */}
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4 mb-4 border border-blue-500/30">
                  <h4 className="text-blue-300 font-semibold text-center mb-2">Monthly Deposits</h4>
                  <p className="text-white text-2xl font-bold text-center">{tier.monthlyDeposit}</p>
                </div>

                {/* Daily Cashout Limit */}
                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 mb-6 border border-purple-500/30">
                  <h4 className="text-purple-300 font-semibold text-center mb-2">Daily Cashout Limit</h4>
                  <p className="text-white text-2xl font-bold text-center">{tier.dailyCashout}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* VIP Program Details */}
        <div className="mt-16 bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl p-8 border border-purple-500/30 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">How VIP Status Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">Monthly Qualification</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Based on deposits within the current month</li>
                <li>• Automatic tier upgrades when threshold is met</li>
                <li>• Status resets monthly</li>
                <li>• Higher deposits = higher cashout limits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">Cashout Benefits</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Instant cashouts (up to 24 hours)</li>
                <li>• Higher daily withdrawal limits</li>
                <li>• Priority processing</li>
                <li>• Dedicated VIP support</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              VIP status is automatically assigned based on your monthly deposit activity. 
              All cashouts require approval and are usually instant but can take up to 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}