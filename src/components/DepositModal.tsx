import React, { useState } from 'react';
import { X, DollarSign, Shield, Smartphone, CreditCard, Bitcoin, Lock, Zap } from 'lucide-react';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (amount: number, method: string) => void;
}

export default function DepositModal({ isOpen, onClose, onDeposit }: DepositModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const depositMethods = [
    { 
      id: 'stripe', 
      name: 'Credit/Debit Card', 
      icon: CreditCard, 
      description: 'Instant deposit via Stripe',
      instant: true,
      color: 'from-blue-600 to-blue-700'
    },
    { 
      id: 'chime', 
      name: 'Chime', 
      icon: Smartphone, 
      description: 'Bank transfer via Chime',
      instant: false,
      color: 'from-green-600 to-green-700',
      url: 'https://app.chime.com/link/qr?u=BarbieQueenxo'
    },
    { 
      id: 'cashapp', 
      name: 'CashApp', 
      icon: DollarSign, 
      description: 'Send via CashApp',
      instant: false,
      color: 'from-green-600 to-green-700',
      url: 'https://cash.app/$xoPrettyBrittyy'
    },
    { 
      id: 'bitcoin', 
      name: 'Bitcoin', 
      icon: Bitcoin, 
      description: 'Cryptocurrency deposit',
      instant: false,
      color: 'from-orange-600 to-orange-700'
    },
    { 
      id: 'tierlock', 
      name: 'TierLock', 
      icon: Lock, 
      description: 'Secure payment gateway',
      instant: true,
      color: 'from-purple-600 to-purple-700'
    }
  ];

  if (!isOpen) return null;

  const getDepositAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const handleDeposit = async () => {
    const amount = getDepositAmount();
    if (amount < 25) {
      alert('Minimum deposit amount is $25');
      return;
    }

    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);

    try {
      const method = depositMethods.find(m => m.id === selectedMethod);
      
      if (method?.url && !method.instant) {
        // For external payment methods, open the URL
        window.open(method.url, '_blank');
        alert(`Opening ${method.name} to complete your deposit. Please send $${amount} and contact support to confirm.`);
      } else if (selectedMethod === 'bitcoin') {
        alert('Bitcoin address: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa\nSend exactly $' + amount + ' worth of Bitcoin and contact support to confirm.');
      } else {
        // For instant methods like Stripe/TierLock
        await onDeposit(amount, selectedMethod);
      }
      
      onClose();
    } catch (error) {
      console.error('Deposit error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setSelectedAmount(0);
    setCustomAmount('');
    setSelectedMethod('');
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl border border-gray-700/50 w-full max-w-lg relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23333%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
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

          {/* Amount Selection */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Select Amount</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map(amount => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`p-3 rounded-lg font-semibold transition-all ${
                    selectedAmount === amount
                      ? 'bg-purple-600 text-white border-2 border-purple-400'
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-purple-500/50'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="number"
                placeholder="Custom amount (min $25)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                min="25"
                className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-4">Payment Method</h3>
            <div className="space-y-3">
            {depositMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl transition-all duration-200 flex items-center space-x-4 border-2 ${
                    selectedMethod === method.id
                      ? `bg-gradient-to-r ${method.color} border-white/30`
                      : 'bg-gray-800/30 border-gray-700/50 hover:border-purple-500/50'
                  }`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">{method.name}</span>
                      {method.instant && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                          <Zap className="w-3 h-3" />
                          <span>Instant</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">{method.description}</p>
                  </div>
                </button>
              );
            })}
            </div>
          </div>

          {/* Deposit Button */}
          <button
            onClick={handleDeposit}
            disabled={getDepositAmount() < 25 || !selectedMethod || isProcessing}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <DollarSign className="w-5 h-5" />
                <span>Deposit ${getDepositAmount().toFixed(2)}</span>
              </>
            )}
          </button>

          {/* Summary */}
          {(selectedAmount > 0 || customAmount) && selectedMethod && (
            <div className="mt-6 bg-purple-900/20 border border-purple-700/50 rounded-xl p-4">
              <h4 className="text-purple-300 font-semibold mb-2">Deposit Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Amount:</span>
                  <span className="text-white font-semibold">${getDepositAmount().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Method:</span>
                  <span className="text-white font-semibold">
                    {depositMethods.find(m => m.id === selectedMethod)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Processing:</span>
                  <span className={`font-semibold ${
                    depositMethods.find(m => m.id === selectedMethod)?.instant 
                      ? 'text-green-400' 
                      : 'text-yellow-400'
                  }`}>
                    {depositMethods.find(m => m.id === selectedMethod)?.instant ? 'Instant' : 'Up to 24 hours'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Minimum Notice */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Minimum deposit: $25 • Maximum deposit: $10,000
            </p>
          </div>

          {/* Security Info */}
          <div className="mt-4 bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-green-400" />
              <div>
                <h4 className="text-green-300 font-semibold">Secure Processing</h4>
                <p className="text-green-200 text-sm">All transactions are encrypted and secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}