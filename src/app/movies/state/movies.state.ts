import { Genre } from './../movies.types';
import { Movie } from '../movies.types';

export interface MovieState {
  isLoading: boolean;
  movies: Movie[];
  moviesById: Record<string, Movie>;
  genres: Genre[];
  activeGenre: Genre | null;
  editItemsById: Record<string, Movie>;
  error?: Error | null;
}

export const initialState: MovieState = {
  isLoading: false,
  movies: [],
  moviesById: {},
  editItemsById: {},
  genres: [],
  activeGenre: null,
};
