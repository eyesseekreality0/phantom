import React from 'react';
import Hero from '../components/Hero';
import GamesSection from '../components/GamesSection';
import CreateAccountSection from '../components/CreateAccountSection';
import type { User } from '../App';

interface GameAccount {
  id: string;
  game: string;
  username: string;
  password: string;
  balance: number;
}

interface HomeProps {
  onGetStarted: () => void;
  onGameSelect: (gameUrl: string, gameName: string) => void;
  gameAccounts: GameAccount[];
  onTransferToGame: (gameId: string, amount: number) => void;
  onCreateGameAccount: (game: string, username: string, password: string) => Promise<void> | void;
  onRequireAuth: () => void;
  user: User | null;
}

export default function Home({ onGetStarted, onGameSelect, gameAccounts, onTransferToGame, onCreateGameAccount, onRequireAuth, user }: HomeProps) {
  return (
    <>
      <Hero onGetStarted={onGetStarted} />
      <CreateAccountSection
        onCreateGameAccount={onCreateGameAccount}
        onRequireAuth={onRequireAuth}
        user={user}
      />
      <GamesSection onGameSelect={onGameSelect} gameAccounts={gameAccounts} onTransferToGame={onTransferToGame} />
    </>
  );
}