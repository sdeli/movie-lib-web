export enum GameCategory {
  NewGames = 'new',
  TopGames = 'top',
  Slots = 'slots',
  Jackpot = 'jackpot',
  Live = 'live',
  Blackjack = 'blackjack',
  Roulette = 'roulette',
  Table = 'table',
  Poker = 'poker',
  Other = 'other',
}

export interface Game {
  id: string;
  categories: GameCategory[];
  name: string;
  image: string;
  jackpot: number;
  isNew?: boolean;
}

export interface Jackpot {
  game: string;
  amount: number;
}
