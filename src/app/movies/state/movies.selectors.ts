import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from './movies.state';
import { MOVIES_FEATURE_KEY } from './movies.reducer';
import { AppState } from '@app/state/app.state';

export const selectMovieState = createFeatureSelector<AppState, MovieState>(MOVIES_FEATURE_KEY);

export const isLoading = createSelector(selectMovieState, (state) => state.isLoading);

export const getMovieList = createSelector(selectMovieState, (state) => state.movies);

export const getMovieById = createSelector(selectMovieState, (state: MovieState, id: string) => state.moviesById[id]);

export const getGenreList = createSelector(selectMovieState, (state) => state.genres);

export const getActiveGenre = createSelector(selectMovieState, (state) => state.activeGenre);
