import React, { useState, useEffect } from 'react';
import { MessageCircle, Clock, User, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ChatSession {
  id: string;
  user_id: string;
  status: string;
  escalated_at: string | null;
  created_at: string;
  user_profiles: {
    username: string;
    display_name: string | null;
  };
  unread_count?: number;
}

interface ChatMessage {
  id: string;
  message: string;
  sender: string;
  is_automated: boolean;
  created_at: string;
}

export default function AdminChatPanel() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // Load chat sessions
  useEffect(() => {
    loadChatSessions();
    
    // Subscribe to new chat sessions
    const subscription = supabase
      .channel('admin_chat_sessions')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chat_sessions'
      }, () => {
        loadChatSessions();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load messages when chat is selected
  useEffect(() => {
    if (selectedChat) {
      loadMessages(selectedChat);
      
      // Subscribe to new messages for selected chat
      const subscription = supabase
        .channel(`admin_chat_${selectedChat}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `chat_id=eq.${selectedChat}`
        }, (payload) => {
          const newMsg = payload.new as any;
          setMessages(prev => [...prev, {
            id: newMsg.id,
            message: newMsg.message,
            sender: newMsg.sender,
            is_automated: newMsg.is_automated,
            created_at: newMsg.created_at
          }]);
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [selectedChat]);

  const loadChatSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select(`
          *,
          user_profiles (
            username,
            display_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChatSessions(data || []);
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || isSending) return;

    setIsSending(true);
    const messageText = newMessage.trim();
    setNewMessage(''); // Clear input immediately for better UX

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          chat_id: selectedChat,
          message: messageText,
          sender: 'support',
          is_automated: false
        });

      if (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
        setNewMessage(messageText); // Restore message on error
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
      setNewMessage(messageText); // Restore message on error
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resolveChat = async (chatId: string) => {
    try {
      await supabase
        .from('chat_sessions')
        .update({
          status: 'resolved',
          resolved_at: new Date().toISOString()
        })
        .eq('id', chatId);

      loadChatSessions();
      if (selectedChat === chatId) {
        setSelectedChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error resolving chat:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting_for_support':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'active':
        return <MessageCircle className="w-4 h-4 text-blue-400" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading chat sessions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Chat Panel</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Sessions List */}
          <div className="bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl border border-purple-500/30 overflow-hidden">
            <div className="p-4 border-b border-purple-500/30">
              <h2 className="text-white font-bold">Chat Sessions</h2>
              <p className="text-gray-400 text-sm">{chatSessions.length} total sessions</p>
            </div>
            
            <div className="overflow-y-auto h-full">
              {chatSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setSelectedChat(session.id)}
                  className={`w-full p-4 text-left border-b border-gray-700/50 hover:bg-purple-600/20 transition-colors ${
                    selectedChat === session.id ? 'bg-purple-600/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">
                      {session.user_profiles.display_name || session.user_profiles.username}
                    </span>
                    {getStatusIcon(session.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm capitalize">{session.status.replace('_', ' ')}</span>
                    <span className="text-gray-500 text-xs">{formatTime(session.created_at)}</span>
                  </div>
                  {session.escalated_at && (
                    <div className="text-red-400 text-xs mt-1">
                      Escalated: {formatTime(session.escalated_at)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-purple-900/30 rounded-2xl border border-purple-500/30 flex flex-col overflow-hidden">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-purple-500/30 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold">
                      {chatSessions.find(s => s.id === selectedChat)?.user_profiles.display_name || 
                       chatSessions.find(s => s.id === selectedChat)?.user_profiles.username}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Status: {chatSessions.find(s => s.id === selectedChat)?.status.replace('_', ' ')}
                    </p>
                  </div>
                  <button
                    onClick={() => resolveChat(selectedChat)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Resolve Chat
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'support' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs p-3 rounded-lg text-sm ${
                        msg.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                          : msg.is_automated
                          ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-200'
                          : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                      }`}>
                        {msg.sender === 'support' && !msg.is_automated && (
                          <div className="flex items-center space-x-1 mb-1">
                            <User className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 text-xs font-semibold">You</span>
                          </div>
                        )}
                        <div className="whitespace-pre-line">{msg.message}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {formatTime(msg.created_at)}
                          {msg.is_automated && ' (Auto)'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-purple-500/30">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your response..."
                      disabled={isSending}
                      className="flex-1 bg-gray-800/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 disabled:opacity-50"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || isSending}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-700 disabled:to-gray-800 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Select a chat session to view messages</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}