import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-gray-400 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300">
            Your privacy and data security are our top priorities
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl p-8 border border-purple-500/30">
          <div className="space-y-8">
            {/* Information Collection */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
                <div className="text-gray-300 space-y-3">
                  <p>We collect information you provide directly to us, such as:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Account registration information (username, email, password)</li>
                    <li>Payment and transaction information</li>
                    <li>Communications with customer support</li>
                    <li>Game play data and preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
                <div className="text-gray-300 space-y-3">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide and maintain our casino services</li>
                    <li>Process transactions and payments</li>
                    <li>Communicate with you about your account</li>
                    <li>Improve our games and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
                <div className="text-gray-300 space-y-3">
                  <p>We implement appropriate security measures to protect your personal information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>SSL encryption for all data transmission</li>
                    <li>Secure servers with restricted access</li>
                    <li>Regular security audits and updates</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
                <div className="text-gray-300 space-y-3">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share information only:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>With your consent</li>
                    <li>To comply with legal requirements</li>
                    <li>To protect our rights and safety</li>
                    <li>With service providers who assist our operations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="bg-gradient-to-r from-purple-900/30 to-gray-900/30 rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <div className="text-gray-300 space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>File a complaint with regulatory authorities</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-center pt-8 border-t border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300">
                If you have questions about this Privacy Policy, please contact our support team through live chat.
              </p>
              <p className="text-gray-400 text-sm mt-4">
                Last updated: January 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}