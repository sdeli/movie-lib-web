import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MovieGenre } from '@app/movies/movies.types';

import { catchError as catchError$ } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';

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
}
