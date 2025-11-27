import React, { useState } from 'react';
import { MessageCircle, Clock, HelpCircle } from 'lucide-react';

export default function Support() {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'support', message: 'Hello! How can I help you today?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const faqs = [
    {
      id: 1,
      question: 'How long do withdrawals take?',
      answer: 'Cashouts are usually instant but can take up to 24 hours for processing and approval.'
    },
    {
      id: 2,
      question: 'How do I request a withdrawal?',
      answer: 'Withdrawals can be requested through your account dashboard. All cashouts require approval and are subject to daily limits based on your VIP status.'
    },
    {
      id: 3,
      question: 'What games are available?',
      answer: 'We offer a variety of casino games including slots, table games, and specialty games from top providers.'
    },
    {
      id: 4,
      question: 'Is my information secure?',
      answer: 'Yes, we use industry-standard encryption to protect all player information and transactions.'
    },
    {
      id: 5,
      question: 'What are the VIP benefits?',
      answer: 'VIP members enjoy higher daily cashout limits based on monthly deposits: $250 (Bronze), $500 (Silver), $1000 (Gold).'
    }
  ];

  const handleStartChat = () => {
    setChatOpen(true);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { id: Date.now(), sender: 'user', message: newMessage };
      setChatMessages([...chatMessages, userMessage]);
      
      // Simulate support response
      setTimeout(() => {
        const supportResponse = { 
          id: Date.now() + 1, 
          sender: 'support', 
          message: 'Thank you for your message. A support agent will assist you shortly.' 
        };
        setChatMessages(prev => [...prev, supportResponse]);
      }, 1000);
      
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Customer Support
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're here to help you 24/7 with any questions or concerns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
            
            <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Live Chat</h3>
                  <p className="text-gray-300">Available 24/7</p>
                </div>
              </div>
              <button 
                onClick={handleStartChat}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-200"
              >
                Start Chat
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Response Time</h3>
                  <p className="text-gray-300">Instant via Live Chat</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-xl border border-purple-500/30 overflow-hidden">
                  <button
                    onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-purple-500/10 transition-colors"
                  >
                    <span className="text-white font-semibold">{faq.question}</span>
                    <HelpCircle className={`w-5 h-5 text-purple-400 transition-transform ${selectedFaq === faq.id ? 'rotate-180' : ''}`} />
                  </button>
                  {selectedFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Chat Modal */}
        {chatOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl border border-purple-500/30 w-full max-w-md h-96 flex flex-col">
              <div className="p-4 border-b border-purple-500/30 flex items-center justify-between">
                <h3 className="text-white font-bold">Live Support Chat</h3>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-700 text-gray-200'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-purple-500/30">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-800 border border-purple-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}