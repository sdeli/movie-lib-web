import { Genre } from './../movies.types';
import { CreateQueryParams } from '@nestjsx/crud-request';
import { createAction, props, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { MovieState } from './movies.state';
import { Movie } from '../movies.types';

type ActiveGenre = Genre | null;

export const ACCEPT_MOVIE = '@app/analyst:ACCEPT_MOVIE';

export const FETCH_MOVIE_LIST_REQUEST = '@app/analyst:FETCH_MOVIE_LIST_REQUEST';
export const FETCH_MOVIE_LIST_SUCCESS = '@app/analyst:FETCH_MOVIE_LIST_SUCCESS';
export const FETCH_MOVIE_LIST_FAILURE = '@app/analyst:FETCH_MOVIE_LIST_FAILURE';

export const FETCH_MOVIE_BY_ID_REQUEST = '@app/analyst:FETCH_MOVIE_BY_ID_REQUEST';
export const FETCH_MOVIE_BY_ID_SUCCESS = '@app/analyst:FETCH_MOVIE_BY_ID_SUCCESS';
export const FETCH_MOVIE_BY_ID_FAILURE = '@app/analyst:FETCH_MOVIE_BY_ID_FAILURE';

export const FETCH_GENRE_LIST_REQUEST = '@app/analyst:FETCH_GENRE_LIST_REQUEST';
export const FETCH_GENRE_LIST_SUCCESS = '@app/analyst:FETCH_GENRE_LIST_SUCCESS';
export const FETCH_GENRE_LIST_FAILURE = '@app/analyst:FETCH_GENRE_LIST_FAILURE';

export const SET_ACTIVE_GENRE = '@app/analyst:SET_ACTIVE_GENRE';

export const fetchMovieList = createAction(FETCH_MOVIE_LIST_REQUEST, props<{ query?: CreateQueryParams }>());
export const finishFetchingMovieList = createAction(FETCH_MOVIE_LIST_SUCCESS, props<{ movies: Movie[] }>());
export const failFetchingMovieList = createAction(FETCH_MOVIE_LIST_FAILURE, props<{ error: Error }>());

export const fetchMovieById = createAction(FETCH_MOVIE_BY_ID_REQUEST, props<{ itemId: string }>());
export const finishFetchingMovieById = createAction(FETCH_MOVIE_BY_ID_SUCCESS, props<Movie>());
export const failFetchingMovieById = createAction(FETCH_MOVIE_BY_ID_FAILURE, props<{ error: Error }>());

export const fetchGenreList = createAction(FETCH_GENRE_LIST_REQUEST);
export const finishFetchingGenreList = createAction(FETCH_GENRE_LIST_SUCCESS, props<{ genres: Genre[] }>());
export const failFetchingGenreList = createAction(FETCH_GENRE_LIST_FAILURE, props<{ error: Error }>());

export const setActiveGenre = createAction(SET_ACTIVE_GENRE, props<{ genre: ActiveGenre }>());
@Injectable()
export class MovieActions {
  constructor(private readonly store: Store<MovieState>) {}

  fetchMovies(query?: CreateQueryParams) {
    this.store.dispatch(fetchMovieList({ query }));
  }

  fetchMovieById(id: string) {
    this.store.dispatch(fetchMovieById({ itemId: id }));
  }

  fetchGenres() {
    this.store.dispatch(fetchGenreList());
  }

  setActiveGenre(genre: ActiveGenre) {
    this.store.dispatch(setActiveGenre({ genre }));
  }
}
