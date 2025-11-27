import React from 'react';
import GamesSection from '../components/GamesSection';

interface GameAccount {
  id: string;
  game: string;
  username: string;
  password: string;
  balance: number;
}

interface GamesProps {
  onGameSelect: (gameUrl: string, gameName: string) => void;
  gameAccounts: GameAccount[];
  onTransferToGame: (gameId: string, amount: number) => void;
}

export default function Games({ onGameSelect, gameAccounts, onTransferToGame }: GamesProps) {
  return (
    <div className="pt-20">
      <GamesSection onGameSelect={onGameSelect} gameAccounts={gameAccounts} onTransferToGame={onTransferToGame} />
    </div>
  );
}