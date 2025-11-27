import React from 'react';
import Hero from '../components/Hero';
import GamesSection from '../components/GamesSection';

interface GameLogin {
  game: string;
  username: string;
  password: string;
}

interface HomeProps {
  onGetStarted: () => void;
  onGameSelect: (gameUrl: string, gameName: string) => void;
  gameLogins: GameLogin[];
}

export default function Home({ onGetStarted, onGameSelect, gameLogins }: HomeProps) {
  return (
    <>
      <Hero onGetStarted={onGetStarted} />
      <GamesSection onGameSelect={onGameSelect} gameLogins={gameLogins} />
    </>
  );
}