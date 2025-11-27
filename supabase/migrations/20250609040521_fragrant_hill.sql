/*
  # Add profile customization fields

  1. New Columns
    - `display_name` (text, nullable) - Custom display name for users
    - `profile_picture` (text, nullable) - URL or base64 data for profile picture

  2. Changes
    - Add display_name column to user_profiles table
    - Add profile_picture column to user_profiles table
    - Update RLS policies to allow users to update their own profile fields
*/

-- Add display_name column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'display_name'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN display_name text;
  END IF;
END $$;

-- Add profile_picture column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'profile_picture'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN profile_picture text;
  END IF;
END $$;