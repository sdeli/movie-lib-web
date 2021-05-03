import { first } from 'rxjs/operators';
import { untilDestroyed } from '@app/shared/until-destroyed';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieActions } from './../../state/movies.actions';
import { getMovieList, getGenreList } from './../../state/movies.selectors';
import { select, Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { uniq as _uniq } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';
import { AppState } from '@app/state/app.state';
import { CreateQueryParams, SFields } from '@nestjsx/crud-request';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Genre } from '@app/movies/movies.types';

@Component({
  selector: 'ml-movies-feed',
  templateUrl: './movies-feed.component.html',
  styleUrls: ['./movies-feed.component.scss'],
})
export class MoviesFeedComponent implements OnInit, OnDestroy {
  movies$ = this.store.pipe(select(getMovieList));
  genres$ = this.store.pipe(select(getGenreList));
  codec = new HttpUrlEncodingCodec();

  constructor(
    readonly dialog: MatDialog,
    private readonly store: Store<AppState>,
    private readonly movieActions: MovieActions,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnDestroy() {
    // ngOnDestroy is needed for untilDestroyed
  }

  ngOnInit() {
    console.log('init');
    this.route.params.pipe(untilDestroyed(this)).subscribe(async (urlParams) => {
      let requestedGenresName = urlParams['movieType'];
      if (!requestedGenresName) {
        await this.getMoviesByGenre();
        return;
      }

      requestedGenresName = this.codec.decodeValue(urlParams['movieType']);
      const genres = await this.genres$.pipe(first()).toPromise();
      const validGenre = genres.find((category) => category.name === requestedGenresName);
      if (requestedGenresName && validGenre) {
        await this.getMoviesByGenre(validGenre);
        return;
      }
    });
  }

  openDescriptionDialog() {
    this.dialog.open(DescriptionDialogComponent, {
      autoFocus: false,
      panelClass: 'dialog-responsive',
    });
  }

  private async getMoviesByGenre(genre?: Genre) {
    const fetchMovieListQuery: CreateQueryParams = {};
    fetchMovieListQuery.join = [{ field: 'director' }, { field: 'actors' }, { field: 'genres' }];

    const shouldDisplayAllMovies = !genre;
    if (shouldDisplayAllMovies) {
      this.movieActions.fetchMovies(fetchMovieListQuery);
      return;
    }

    const searchQuery: SFields = {};
    searchQuery.$or = [
      {
        'genres.name': { $eq: genre!.name },
      },
    ];

    fetchMovieListQuery.search = searchQuery;

    this.movieActions.fetchMovies(fetchMovieListQuery);
  }
}
