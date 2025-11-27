import React, { useState } from 'react';
import { X, DollarSign, Shield, Smartphone, CreditCard } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number, method: string) => void;
}

export default function DepositModal({ isOpen, onClose, onDeposit }: DepositModalProps) {
  const depositMethods = [
    { id: 'chime', name: 'Chime', icon: Smartphone, url: 'https://app.chime.com/link/qr?u=BarbieQueenxo' },
    { id: 'cashapp', name: 'CashApp', icon: CreditCard, url: 'https://cash.app/$xoPrettyBrittyy' }
  ];

  if (!isOpen) return null;

  const handleMethodClick = (method: typeof depositMethods[0]) => {
    window.open(method.url, '_blank');
    alert(`Opening ${method.name} to complete your deposit. Please send the payment and contact support to confirm.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl border border-gray-700/50 w-full max-w-lg relative overflow-hidden">
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600/50">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Make a Deposit</h2>
            <p className="text-gray-300">
              Choose your preferred payment method
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-purple-900/20 border border-purple-700/50 rounded-xl p-4 mb-8">
            <div className="text-center">
              <h4 className="text-purple-300 font-semibold mb-2">How to Deposit</h4>
              <p className="text-purple-200 text-sm">
                1. Click your preferred payment method below<br/>
                2. Send your deposit amount<br/>
                3. Contact support via chat to confirm your deposit
              </p>
            </div>
          </div>

          {/* Deposit Methods */}
          <div className="space-y-4">
            {depositMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => handleMethodClick(method)}
                  className="w-full p-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-4 bg-gradient-to-r from-purple-700 to-gray-700 hover:from-purple-800 hover:to-gray-800 text-white border border-gray-600/50"
                >
                  <IconComponent className="w-8 h-8" />
                  <span>Deposit with {method.name}</span>
                </button>
              );
            })}
          </div>

          {/* Security Info */}
          <div className="mt-8 bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-green-400" />
              <div>
                <h4 className="text-green-300 font-semibold">Secure Processing</h4>
                <p className="text-green-200 text-sm">After sending payment, contact support via chat to confirm your deposit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}