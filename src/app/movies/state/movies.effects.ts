import { MoviesService } from '@app/movies/state/movies.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map as map$, switchMap as switchMap$, mergeMap as mergeMap$, catchError as catchError$, delay } from 'rxjs/operators';

import {
  fetchMovieList,
  failFetchingMovieList,
  finishFetchingMovieList,
  fetchMovieById,
  finishFetchingMovieById,
  failFetchingMovieById,
} from './movies.actions';
import { of as of$ } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieEffects {
  fetchMoviesList = createEffect(() =>
    this.action$.pipe(
      ofType(fetchMovieList),
      switchMap$((action) => of$(action).pipe(delay(1000))),
      mergeMap$(({ query }) => {
        return this.movieService.fetchMovies(query).pipe(
          map$((response) => finishFetchingMovieList({ movies: response })),
          catchError$((error: Error) => of$(failFetchingMovieList({ error }))),
        );
      }),
    ),
  );

  fetchMovieById = createEffect(() =>
    this.action$.pipe(
      ofType(fetchMovieById),
      switchMap$(({ itemId }) =>
        this.movieService.fetchMovieById(itemId).pipe(
          map$((response) => finishFetchingMovieById(response)),
          catchError$((error: Error) => of$(failFetchingMovieById({ error }))),
        ),
      ),
    ),
  );

  constructor(private readonly action$: Actions, private readonly movieService: MoviesService) {}
}
