/*
  # Game Credit System

  1. New Tables
    - `user_game_accounts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to user_profiles)
      - `game_name` (text)
      - `game_username` (text)
      - `game_password` (text)
      - `game_balance` (decimal) - credits in the game account
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to user_profiles)
      - `type` (text) - 'deposit', 'withdrawal', 'transfer_to_game', 'transfer_from_game'
      - `amount` (decimal)
      - `status` (text) - 'pending', 'completed', 'failed'
      - `payment_method` (text) - 'stripe', 'chime', 'cashapp', 'bitcoin', 'tierlock'
      - `game_name` (text, nullable) - for game transfers
      - `description` (text)
      - `created_at` (timestamp)

  2. Changes
    - Update user_profiles to ensure balance column exists with default 0
    - Add indexes for performance

  3. Security
    - Enable RLS on new tables
    - Add policies for user access
*/

-- Ensure balance column exists in user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'balance'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN balance decimal(10,2) DEFAULT 0.00;
  END IF;
END $$;

-- Create user_game_accounts table
CREATE TABLE IF NOT EXISTS user_game_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  game_name text NOT NULL,
  game_username text NOT NULL,
  game_password text NOT NULL,
  game_balance decimal(10,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, game_name)
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'transfer_to_game', 'transfer_from_game')),
  amount decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  payment_method text CHECK (payment_method IN ('stripe', 'chime', 'cashapp', 'bitcoin', 'tierlock')),
  game_name text,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_game_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_game_accounts
CREATE POLICY "Users can access own game accounts"
  ON user_game_accounts
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for transactions
CREATE POLICY "Users can access own transactions"
  ON transactions
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_game_accounts_user_id ON user_game_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_game_accounts_game_name ON user_game_accounts(game_name);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- Create updated_at trigger for user_game_accounts
CREATE OR REPLACE FUNCTION update_user_game_accounts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_game_accounts_updated_at
  BEFORE UPDATE ON user_game_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_user_game_accounts_updated_at();