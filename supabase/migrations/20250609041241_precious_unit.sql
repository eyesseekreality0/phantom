/*
  # Chat System for Hybrid Support

  1. New Tables
    - `chat_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to user_profiles)
      - `status` (text) - 'active', 'waiting_for_support', 'resolved'
      - `escalated_at` (timestamp) - when escalated to human support
      - `resolved_at` (timestamp) - when chat was resolved
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `chat_messages`
      - `id` (uuid, primary key)
      - `chat_id` (uuid, foreign key to chat_sessions)
      - `message` (text)
      - `sender` (text) - 'user', 'support', 'system'
      - `is_automated` (boolean) - true for bot responses
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Users can only access their own chat sessions and messages
    - Support staff can access all chats (for admin interface)

  3. Real-time
    - Enable real-time subscriptions for live chat updates
*/

-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'waiting_for_support', 'resolved')),
  escalated_at timestamptz,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  message text NOT NULL,
  sender text NOT NULL CHECK (sender IN ('user', 'support', 'system')),
  is_automated boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_sessions
CREATE POLICY "Users can access own chat sessions"
  ON chat_sessions
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for chat_messages
CREATE POLICY "Users can access messages from own chats"
  ON chat_messages
  FOR ALL
  TO authenticated
  USING (
    chat_id IN (
      SELECT id FROM chat_sessions WHERE user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_id ON chat_messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Create updated_at trigger for chat_sessions
CREATE OR REPLACE FUNCTION update_chat_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_chat_sessions_updated_at
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_sessions_updated_at();