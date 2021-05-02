import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Movie, MovieGenre } from '@app/movies/movies.types';

import { catchError as catchError$ } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateQueryParams, RequestQueryBuilder } from '@nestjsx/crud-request';
import { defaults as _defaults } from 'lodash';
export interface GetManyDefaultResponse<T> {
  data: T[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}
/**
 * Provides helper methods to create routes.
 */
@Injectable()
export class MoviesService {
  constructor(private readonly httpClient: HttpClient) {}
  /**
   * Creates routes using the shell component and authentication.
   *
   * @param routes The routes to add.
   * @return The new route using shell as the base.
   */

  getMovieCategories() {
    console.log('shot');
    return this.httpClient.get<MovieGenre[]>('/genre').pipe(catchError$((error: HttpErrorResponse) => throwError(error)));
  }

  // getMovies(query?: CreateQueryParams) {
  //   console.log('shot');
  //   return this.httpClient.get<MovieGenre[]>('/movie').pipe(catchError$((error: HttpErrorResponse) => throwError(error)));
  // }

  getMovies(query: CreateQueryParams) {
    const queryString = createQueryString(query);

    return this.httpClient
      .get<GetManyDefaultResponse<Movie> | Movie[]>(`/movies?${queryString}`)
      .pipe(catchError$((error: HttpErrorResponse) => throwError(error)));
  }
}

function createQueryString(query: CreateQueryParams) {
  const builder = RequestQueryBuilder.create(query);
  return builder.query();
}
