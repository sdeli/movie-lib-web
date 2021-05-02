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
    initalLoadIsComplete: true,
    error: null,
    items: movies,
    itemsById: {
      ...state.itemsById,
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
    itemsById: {
      ...state.itemsById,
      [movie.id]: movie,
    },
  })),
  on(MovieActions.failFetchingMovieById, (state, action) => ({
    ...state,
    isLoading: true,
    error: action.error,
  })),
);

export const moviesReducer = (state: MovieState = initialState, action: Action) => _analystReducer(state, action);
