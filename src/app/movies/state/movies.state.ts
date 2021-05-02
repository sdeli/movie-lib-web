import { Movie } from '../movies.types';

export interface MovieState {
  isLoading: boolean;
  initalLoadIsComplete: boolean;
  items: Movie[];
  itemsById: Record<string, Movie>;
  editItemsById: Record<string, Movie>;
  error?: Error | null;
}

export const initialState: MovieState = {
  isLoading: false,
  initalLoadIsComplete: false,
  items: [],
  itemsById: {},
  editItemsById: {},
};
