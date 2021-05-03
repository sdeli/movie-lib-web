import { createReducer, on, Action } from '@ngrx/store';
import { keyBy as _keyBy } from 'lodash';

import { initialState, MovieState } from './movies.state';
import * as MovieActions from './movies.actions';

export const MOVIES_FEATURE_KEY = 'movies';

const _analystReducer = createReducer(
  initialState,
  on(MovieActions.fetchMovieList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(MovieActions.finishFetchingMovieList, (state, { movies }) => ({
    ...state,
    isLoading: false,
    error: null,
    movies: movies,
    moviesById: {
      ...state.moviesById,
      ..._keyBy(movies, 'id'),
    },
  })),
  on(MovieActions.failFetchingMovieList, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(MovieActions.fetchMovieById, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(MovieActions.finishFetchingMovieById, (state, movie) => ({
    ...state,
    isLoading: false,
    error: null,
    moviesById: {
      ...state.moviesById,
      [movie.id]: movie,
    },
  })),
  on(MovieActions.failFetchingMovieById, (state, action) => ({
    ...state,
    isLoading: true,
    error: action.error,
  })),
  on(MovieActions.fetchGenreList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(MovieActions.finishFetchingGenreList, (state, { genres }) => ({
    ...state,
    isLoading: false,
    error: null,
    genres: genres,
  })),
  on(MovieActions.failFetchingGenreList, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(MovieActions.setActiveGenre, (state, { genre }) => ({
    ...state,
    activeGenre: genre,
  })),
);

export const moviesReducer = (state: MovieState = initialState, action: Action) => _analystReducer(state, action);
