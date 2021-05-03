import { getGenreList } from './../../movies/state/movies.selectors';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppState } from '@app/state/app.state';
@Injectable()
export class GenresGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getGenreList),
      map((genreList) => !!genreList),
    );
  }
}
