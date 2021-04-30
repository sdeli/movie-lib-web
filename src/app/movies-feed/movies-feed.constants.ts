import { GameCategory } from './movies-feed.types';

export interface GameCategoriesLabelMap {
  category: GameCategory;
  label: string;
  isActive?: boolean;
}

export const GameCategoriesLabelMapArr: GameCategoriesLabelMap[] = [
  { category: GameCategory.TopGames, label: 'Top Games' },
  { category: GameCategory.NewGames, label: 'New Games' },
  { category: GameCategory.Slots, label: 'Slots' },
  { category: GameCategory.Jackpot, label: 'Jackpots' },
  { category: GameCategory.Live, label: 'Live' },
  { category: GameCategory.Blackjack, label: 'Blackjack' },
  { category: GameCategory.Roulette, label: 'Roulette' },
  { category: GameCategory.Table, label: 'Table' },
  { category: GameCategory.Poker, label: 'Poker' },
  { category: GameCategory.Other, label: 'Other' },
];
