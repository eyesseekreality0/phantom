import React from 'react';
import GamesSection from '../components/GamesSection';

interface GameLogin {
  game: string;
  username: string;
  password: string;
}

interface GamesProps {
  onGameSelect: (gameUrl: string, gameName: string) => void;
  gameLogins: GameLogin[];
}

export default function Games({ onGameSelect, gameLogins }: GamesProps) {
  return (
    <div className="pt-20">
      <GamesSection onGameSelect={onGameSelect} gameLogins={gameLogins} />
    </div>
  );
}