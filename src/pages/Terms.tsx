import React from 'react';
import { FileText, Users, CreditCard, AlertTriangle } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-gray-400 bg-clip-text text-transparent mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-300">
            Please read these terms carefully before using our services
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl p-8 border border-purple-500/30">
          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
                <div className="text-gray-300 space-y-3">
                  <p>By accessing and using Phantom's Fortune casino services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                  <p>If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
                </div>
              </div>
            </div>

            {/* Eligibility */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Eligibility</h2>
                <div className="text-gray-300 space-y-3">
                  <p>To use our services, you must:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Be at least 18 years of age</li>
                    <li>Be legally allowed to participate in gambling activities in your jurisdiction</li>
                    <li>Provide accurate and complete registration information</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Account Responsibilities */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Account Responsibilities</h2>
                <div className="text-gray-300 space-y-3">
                  <p>You are responsible for:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Maintaining the security of your account</li>
                    <li>All activities that occur under your account</li>
                    <li>Providing accurate personal and financial information</li>
                    <li>Complying with all applicable laws and regulations</li>
                    <li>Not creating multiple accounts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Deposits and Withdrawals */}
            <div className="bg-gradient-to-r from-purple-900/30 to-gray-900/30 rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Deposits and Withdrawals</h2>
              <div className="text-gray-300 space-y-3">
                <p><strong>Deposits:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All deposits require approval and may take up to 24 hours to process</li>
                  <li>Minimum deposit amount is $25</li>
                  <li>We accept Chime and CashApp payments through our support team</li>
                </ul>
                <p><strong>Withdrawals:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Withdrawals are usually instant but may take up to 24 hours</li>
                  <li>Daily withdrawal limits apply based on VIP status</li>
                  <li>All withdrawals require identity verification</li>
                </ul>
              </div>
            </div>

            {/* Prohibited Activities */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Prohibited Activities</h2>
                <div className="text-gray-300 space-y-3">
                  <p>The following activities are strictly prohibited:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Using automated software or bots</li>
                    <li>Colluding with other players</li>
                    <li>Attempting to manipulate games or outcomes</li>
                    <li>Money laundering or fraudulent activities</li>
                    <li>Creating multiple accounts</li>
                    <li>Sharing account credentials</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-gradient-to-r from-gray-900/30 to-purple-900/30 rounded-xl p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <div className="text-gray-300 space-y-3">
                <p>Phantom's Fortune shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.</p>
                <p>Our total liability shall not exceed the amount you have deposited in your account.</p>
              </div>
            </div>

            {/* Modifications */}
            <div className="text-center pt-8 border-t border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Modifications</h2>
              <p className="text-gray-300">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
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