import React from 'react';
import { Heart, Clock, Shield, Phone } from 'lucide-react';

export default function Responsible() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-gray-400 bg-clip-text text-transparent mb-6">
            Responsible Gaming
          </h1>
          <p className="text-xl text-gray-300">
            Gaming should be fun and entertaining. We're committed to promoting responsible gambling.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl p-8 border border-purple-500/30">
          <div className="space-y-8">
            {/* Our Commitment */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Commitment</h2>
                <div className="text-gray-300 space-y-3">
                  <p>At Phantom's Fortune, we are committed to providing a safe and responsible gaming environment. We believe that gambling should be an enjoyable form of entertainment, not a way to solve financial problems.</p>
                  <p>We provide tools and resources to help you maintain control over your gaming activities.</p>
                </div>
              </div>
            </div>

            {/* Warning Signs */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Warning Signs</h2>
                <div className="text-gray-300 space-y-3">
                  <p>Be aware of these warning signs of problem gambling:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Spending more money than you can afford to lose</li>
                    <li>Gambling to escape problems or negative emotions</li>
                    <li>Lying about gambling activities to family or friends</li>
                    <li>Chasing losses with bigger bets</li>
                    <li>Neglecting work, family, or other responsibilities</li>
                    <li>Borrowing money to gamble</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Self-Control Tools */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Self-Control Tools</h2>
                <div className="text-gray-300 space-y-3">
                  <p>We offer several tools to help you maintain control:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Deposit limits - Set daily, weekly, or monthly limits</li>
                    <li>Time limits - Control how long you spend gaming</li>
                    <li>Self-exclusion - Temporarily or permanently exclude yourself</li>
                    <li>Reality checks - Regular reminders of time spent gaming</li>
                  </ul>
                  <p className="mt-4">Contact our support team to set up any of these tools.</p>
                </div>
              </div>
            </div>

            {/* Help Resources */}
            <div className="bg-gradient-to-r from-purple-900/30 to-gray-900/30 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Get Help</h2>
                  <div className="text-gray-300 space-y-3">
                    <p>If you or someone you know has a gambling problem, help is available:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-2">National Problem Gambling Helpline</h3>
                        <p className="text-purple-300">1-800-522-4700</p>
                        <p className="text-gray-400 text-sm">24/7 confidential support</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-2">Gamblers Anonymous</h3>
                        <p className="text-purple-300">www.gamblersanonymous.org</p>
                        <p className="text-gray-400 text-sm">Support groups and resources</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-2">National Council on Problem Gambling</h3>
                        <p className="text-purple-300">www.ncpgambling.org</p>
                        <p className="text-gray-400 text-sm">Information and resources</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-2">GamCare</h3>
                        <p className="text-purple-300">www.gamcare.org.uk</p>
                        <p className="text-gray-400 text-sm">UK support and advice</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips for Responsible Gaming */}
            <div className="bg-gradient-to-r from-gray-900/30 to-purple-900/30 rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Tips for Responsible Gaming</h2>
              <div className="text-gray-300 space-y-3">
                <ul className="list-disc list-inside space-y-2">
                  <li>Set a budget before you start and stick to it</li>
                  <li>Never gamble with money you can't afford to lose</li>
                  <li>Take regular breaks from gaming</li>
                  <li>Don't chase your losses</li>
                  <li>Keep gambling in perspective - it's entertainment, not an investment</li>
                  <li>Don't gamble when you're upset, depressed, or under the influence</li>
                  <li>Balance gambling with other activities</li>
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center pt-8 border-t border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Need Support?</h2>
              <p className="text-gray-300">
                Our support team is available 24/7 to help with responsible gaming tools and resources.
              </p>
              <p className="text-purple-400 mt-2">Contact us through live chat for immediate assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}