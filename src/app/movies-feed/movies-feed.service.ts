import { Injectable } from '@angular/core';
import { Game, Jackpot } from './movies-feed.types';
import { catchError as catchError$ } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamesfeedService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchGameList() {
    return this.httpClient
      .get<Game[]>(`http://stage.whgstage.com/front-end-test/games.php`)
      .pipe(catchError$((error: HttpErrorResponse) => throwError(error)));
  }
  fetchJackpots() {
    return this.httpClient
      .get<Jackpot[]>(`http://stage.whgstage.com/front-end-test/jackpots.php`)
      .pipe(catchError$((error: HttpErrorResponse) => throwError(error)));
  }
}
