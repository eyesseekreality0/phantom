import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Skull, User, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js';

interface ChatBubbleProps {
  onGameAccountAdded: (game: string, username: string, password: string) => void;
}

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'support' | 'system';
  created_at: string;
  is_automated?: boolean;
}

type ChatMessageRow = ChatMessage & {
  chat_id: string;
};

export default function ChatBubble({ onGameAccountAdded }: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForSupport, setWaitingForSupport] = useState(false);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && !chatId) {
      initializeChat();
    }
  }, [chatId, isOpen]);

  // Listen for new messages from support
  useEffect(() => {
    if (chatId) {
      const subscription = supabase
        .channel(`chat_${chatId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_id=eq.${chatId}`
        }, (payload: RealtimePostgresInsertPayload<ChatMessageRow>) => {
          const newMsg = payload.new;
          if (!newMsg) return;
          if (newMsg.sender === 'support') {
            setMessages(prev => [...prev, {
              id: newMsg.id,
              message: newMsg.message,
              sender: 'support',
              created_at: newMsg.created_at,
              is_automated: false
            }]);
            setWaitingForSupport(false);
          }
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [chatId]);

  const initializeChat = async () => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Create or get existing chat session
      const { data: existingChat } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      let sessionId;
      if (existingChat) {
        sessionId = existingChat.id;
      } else {
        const { data: newChat } = await supabase
          .from('chat_sessions')
          .insert({
            user_id: user.id,
            status: 'active'
          })
          .select()
          .single();
        sessionId = newChat?.id;
      }

      setChatId(sessionId);

      // Load existing messages
      const { data: chatMessages } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', sessionId)
        .order('created_at', { ascending: true });

      if (chatMessages) {
        setMessages(chatMessages.map(msg => ({
          id: msg.id,
          message: msg.message,
          sender: msg.sender,
          created_at: msg.created_at,
          is_automated: msg.is_automated
        })));
      } else {
        // Add welcome message
        const welcomeMsg = {
          id: 'welcome',
          message: 'Welcome to Phantom\'s Fortune! How can I help you today?',
          sender: 'support' as const,
          created_at: new Date().toISOString(),
          is_automated: true
        };
        setMessages([welcomeMsg]);
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const generateRandomCredentials = () => {
    const usernames = ['phantom', 'ghost', 'spirit', 'shadow', 'mystic', 'dark', 'void', 'raven'];
    const numbers = Math.floor(Math.random() * 9999) + 1000;
    const username = usernames[Math.floor(Math.random() * usernames.length)] + numbers;
    const password = 'PF' + Math.floor(Math.random() * 999999) + 'x';
    return { username, password };
  };

  const getAutomatedResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('vblink')) {
      const { username, password } = generateRandomCredentials();
      onGameAccountAdded('VBlink', username, password);
      return {
        response: `Perfect! I've set up your VBlink account:\n\nUsername: ${username}\nPassword: ${password}\n\nYou can now access VBlink directly from the games section. Your login details are saved and will appear on the game card!`,
        isAutomated: true
      };
    }
    
    if (lowerMessage.includes('ultrapanda')) {
      const { username, password } = generateRandomCredentials();
      onGameAccountAdded('UltraPanda', username, password);
      return {
        response: `Excellent! Your UltraPanda account is ready:\n\nUsername: ${username}\nPassword: ${password}\n\nHead to the games section and click on UltraPanda to start playing. Your credentials are now saved!`,
        isAutomated: true
      };
    }
    
    if (lowerMessage.includes('game') || lowerMessage.includes('access')) {
      return {
        response: 'I can help you access VBlink or UltraPanda! Just tell me which game you\'d like to play and I\'ll set up your account with login credentials immediately.',
        isAutomated: true
      };
    }
    
    if (lowerMessage.includes('deposit') || lowerMessage.includes('payment')) {
      return {
        response: 'For deposits, I can help you with Chime or CashApp. Click the Deposit button in the header to get started, or let me know if you need assistance with the process.',
        isAutomated: true
      };
    }

    if (lowerMessage.includes('withdrawal') || lowerMessage.includes('cashout')) {
      return {
        response: 'Withdrawals are usually instant but can take up to 24 hours for processing. Your daily cashout limit depends on your VIP status. Would you like me to connect you with a support agent for withdrawal assistance?',
        isAutomated: true
      };
    }

    if (lowerMessage.includes('vip') || lowerMessage.includes('limit')) {
      return {
        response: 'Our VIP program offers higher daily cashout limits based on monthly deposits:\n• Bronze: $250/day ($500+ monthly)\n• Silver: $500/day ($1,500+ monthly)\n• Gold: $1,000/day ($5,000+ monthly)\n\nWould you like more details about VIP benefits?',
        isAutomated: true
      };
    }

    // For complex queries, escalate to human support
    return {
      response: 'I\'m connecting you with a live support agent who can better assist you with this request. Please wait a moment...',
      isAutomated: false,
      escalate: true
    };
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chatId) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: newMessage,
      sender: 'user',
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Save user message to database
    try {
      await supabase
        .from('chat_messages')
        .insert({
          chat_id: chatId,
          message: newMessage,
          sender: 'user'
        });
    } catch (error) {
      console.error('Error saving message:', error);
    }

    const currentMessage = newMessage;
    setNewMessage('');
    setIsTyping(true);

    // Get automated response
    const automatedResponse = getAutomatedResponse(currentMessage);
    
    setTimeout(async () => {
      setIsTyping(false);
      
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: automatedResponse.response,
        sender: 'support',
        created_at: new Date().toISOString(),
        is_automated: automatedResponse.isAutomated
      };

      setMessages(prev => [...prev, responseMessage]);

      // Save automated response to database
      try {
        await supabase
          .from('chat_messages')
          .insert({
            chat_id: chatId,
            message: automatedResponse.response,
            sender: 'support',
            is_automated: automatedResponse.isAutomated
          });

        // If escalating to human support, update chat status
        if (automatedResponse.escalate) {
          await supabase
            .from('chat_sessions')
            .update({ 
              status: 'waiting_for_support',
              escalated_at: new Date().toISOString()
            })
            .eq('id', chatId);
          
          setWaitingForSupport(true);
        }
      } catch (error) {
        console.error('Error saving response:', error);
      }
    }, 1000);
  };

  return (
    <>
      {/* Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-700 to-gray-700 hover:from-purple-800 hover:to-gray-800 rounded-full flex items-center justify-center shadow-2xl border border-gray-600/50 transition-all duration-300 transform hover:scale-110 z-50"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-gradient-to-br from-black to-gray-900 rounded-2xl border border-purple-500/30 shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-purple-500/30 flex items-center justify-between bg-gradient-to-r from-purple-900/50 to-gray-900/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-gray-600 rounded-full flex items-center justify-center">
                <Skull className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Phantom Support</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-purple-300 text-xs">
                    {waitingForSupport ? 'Waiting for agent...' : 'Online now'}
                  </p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-900/50 to-black/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg text-sm whitespace-pre-line ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 border border-gray-600/50'
                }`}>
                  {msg.sender === 'support' && !msg.is_automated && (
                    <div className="flex items-center space-x-1 mb-1">
                      <User className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 text-xs font-semibold">Live Agent</span>
                    </div>
                  )}
                  {msg.message}
                  {msg.sender === 'support' && msg.is_automated && (
                    <div className="text-xs text-gray-400 mt-1 opacity-75">Auto-response</div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 border border-gray-600/50 max-w-xs p-3 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-400"></div>
                    </div>
                    <span className="text-xs text-gray-400">Support is typing...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Waiting for Support Indicator */}
            {waitingForSupport && !isTyping && (
              <div className="text-center py-2">
                <div className="inline-flex items-center space-x-2 bg-yellow-900/30 border border-yellow-600/50 rounded-lg px-3 py-2">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-300 text-xs">A live agent will respond shortly</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-purple-500/30 bg-gradient-to-r from-gray-900/50 to-black/50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-700 disabled:to-gray-800 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}