import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Shield, Award, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 border-t border-gray-700/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/1000024592.jpeg" 
                alt="Phantom's Fortune" 
                className="w-10 h-10 object-contain filter drop-shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold text-white">Phantom's Fortune</h3>
                <p className="text-gray-400 text-sm">Premium Casino</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience the ultimate casino with exciting games, 
              massive jackpots, and premium entertainment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/games" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Games</Link></li>
              <li><Link to="/promotions" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Promotions</Link></li>
              <li><Link to="/vip" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">VIP Program</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-purple-400 transition-colors text-sm">Support</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Support</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">Live Chat 24/7</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">24/7 Support</span>
              </li>
            </ul>
          </div>

          {/* Trust & Security */}
          <div>
            <h4 className="text-white font-semibold mb-4">Trust & Security</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-gray-300 text-sm">SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300 text-sm">Licensed & Regulated</span>
              </div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
                <p className="text-gray-300 text-xs">
                  <strong>18+ Only.</strong> Gamble responsibly. 
                  If you have a gambling problem, seek help.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Phantom's Fortune. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/responsible" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Responsible Gaming
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}