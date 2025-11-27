import React from 'react';
import { Play, TrendingUp } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Moving Ghouls Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Ghoul 1 */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-20 animate-float-slow">
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-gray-800 rounded-full relative">
            <div className="absolute top-2 left-3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute top-2 right-3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-black rounded-full"></div>
          </div>
        </div>

        {/* Ghoul 2 */}
        <div className="absolute top-1/3 right-20 w-20 h-20 opacity-15 animate-float-medium">
          <div className="w-full h-full bg-gradient-to-br from-indigo-700 to-black rounded-full relative">
            <div className="absolute top-3 left-4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute top-3 right-4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gray-900 rounded-full"></div>
          </div>
        </div>

        {/* Ghoul 3 */}
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 opacity-25 animate-float-fast">
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-purple-900 rounded-full relative">
            <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black rounded-full"></div>
          </div>
        </div>

        {/* Ghoul 4 */}
        <div className="absolute top-2/3 right-1/3 w-14 h-14 opacity-20 animate-float-slow animation-delay-2000">
          <div className="w-full h-full bg-gradient-to-br from-blue-800 to-gray-900 rounded-full relative">
            <div className="absolute top-2 left-3 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-2 right-3 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-5 h-2 bg-black rounded-full"></div>
          </div>
        </div>

        {/* Ghoul 5 */}
        <div className="absolute bottom-1/3 right-1/4 w-18 h-18 opacity-15 animate-float-medium animation-delay-3000">
          <div className="w-full h-full bg-gradient-to-br from-purple-800 to-black rounded-full relative">
            <div className="absolute top-3 left-4 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <div className="absolute top-3 right-4 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        {/* Additional floating spirits */}
        <div className="absolute top-1/2 left-1/6 w-8 h-8 opacity-10 animate-float-fast animation-delay-1000">
          <div className="w-full h-full bg-white rounded-full blur-sm animate-pulse"></div>
        </div>
        <div className="absolute bottom-1/2 right-1/6 w-6 h-6 opacity-15 animate-float-slow animation-delay-4000">
          <div className="w-full h-full bg-cyan-300 rounded-full blur-sm animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Animated Logo Display */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <img 
                src="/1000024592.jpeg" 
                alt="Phantom's Fortune" 
                className="w-64 h-64 object-contain filter drop-shadow-2xl animate-pulse hover:scale-110 transition-transform duration-500"
              />
              {/* Animated glow effect */}
              <div className="absolute inset-0 w-64 h-64 bg-purple-500/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
              <div className="absolute inset-4 w-56 h-56 bg-gray-400/10 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            Experience the ultimate casino with massive jackpots, premium games, 
            and legendary wins that will haunt your dreams.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button
            onClick={onGetStarted}
            className="group bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center space-x-3 border border-purple-500/30"
          >
            <Play className="w-6 h-6 group-hover:animate-pulse" />
            <span>Start Playing Now</span>
          </button>
          
          <div className="flex items-center space-x-6 text-gray-300">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span>Massive Jackpots</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-gray-400">Premium Support</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}