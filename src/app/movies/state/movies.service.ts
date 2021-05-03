import { Genre } from './../movies.types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Movie } from '@app/movies/movies.types';

import { catchError as catchError$ } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateQueryParams, RequestQueryBuilder } from '@nestjsx/crud-request';
export interface GetManyDefaultResponse<T> {
  data: T[];
  count: number;
  total: number;
  page: number;
  pageCount: number;
}

@Injectable()
export class MoviesService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchGenres() {
    return this.httpClient.get<Genre[]>('/genre').pipe(catchError$((error: HttpErrorResponse) => throwError(error)));
  }

  fetchMovies(query?: CreateQueryParams) {
    let path = '/movies';

    if (query) {
      path += `?${createQueryString(query)}`;
    }
    return this.httpClient.get<Movie[]>(path).pipe(catchError$((error: HttpErrorResponse) => throwError(error)));
  }

  fetchMovieById(itemId: string) {
    return this.httpClient.get<Movie>(`/movies/${itemId}`).pipe(catchError$((error: HttpErrorResponse) => throwError(error)));
  }
}

function createQueryString(query: CreateQueryParams) {
  const builder = RequestQueryBuilder.create(query);
  return builder.query();
}
