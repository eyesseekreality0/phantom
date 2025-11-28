import React from 'react';
import Hero from '../components/Hero';
import GamesSection from '../components/GamesSection';
import CreateAccountSection from '../components/CreateAccountSection';

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
}

export default function Home({ onGetStarted, onGameSelect, gameAccounts, onTransferToGame }: HomeProps) {
  return (
    <>
      <Hero onGetStarted={onGetStarted} />
      <CreateAccountSection />
      <GamesSection onGameSelect={onGameSelect} gameAccounts={gameAccounts} onTransferToGame={onTransferToGame} />
    </>
  );
}