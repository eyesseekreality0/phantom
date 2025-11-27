import React from 'react';
import Hero from '../components/Hero';
import GamesSection from '../components/GamesSection';

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
      <GamesSection onGameSelect={onGameSelect} gameAccounts={gameAccounts} onTransferToGame={onTransferToGame} />
    </>
  );
}