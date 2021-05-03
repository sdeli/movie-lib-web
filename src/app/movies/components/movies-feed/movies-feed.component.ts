import { debounceTime, first } from 'rxjs/operators';
import { untilDestroyed } from '@app/shared/until-destroyed';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieActions } from './../../state/movies.actions';
import { getMovieList, getGenreList, isLoading } from './../../state/movies.selectors';
import { select, Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { uniq as _uniq } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';
import { AppState } from '@app/state/app.state';
import { CreateQueryParams, SFields } from '@nestjsx/crud-request';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Genre } from '@app/movies/movies.types';
import { FormControl } from '@angular/forms';

interface GetMoviesOptions {
  genre?: Genre;
  name?: string;
}

@Component({
  selector: 'ml-movies-feed',
  templateUrl: './movies-feed.component.html',
  styleUrls: ['./movies-feed.component.scss'],
})
export class MoviesFeedComponent implements OnInit, OnDestroy {
  movies$ = this.store.pipe(select(getMovieList));
  genres$ = this.store.pipe(select(getGenreList));
  isLoading: boolean;
  codec = new HttpUrlEncodingCodec();
  videoSearchByName = new FormControl('');

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
    this.route.params.pipe(untilDestroyed(this)).subscribe(async (urlParams) => {
      let requestedGenresName = urlParams['genre'];
      if (!requestedGenresName) {
        await this.getMovies();
        return;
      }

      requestedGenresName = this.codec.decodeValue(urlParams['genre']);
      const genres = await this.genres$.pipe(first()).toPromise();
      const validGenre = genres.find((category) => category.name === requestedGenresName);
      if (requestedGenresName && validGenre) {
        await this.getMovies({ genre: validGenre });
        return;
      }
    });

    this.store.pipe(untilDestroyed(this), select(isLoading)).subscribe((isLoading) => {
      console.log(isLoading);
      this.isLoading = isLoading;
    });

    this.videoSearchByName.valueChanges.pipe(untilDestroyed(this), debounceTime(500)).subscribe((name) => {
      console.log(name);
      this.getMovies({ name: name });
    });
  }

  openDescriptionDialog() {
    this.dialog.open(DescriptionDialogComponent, {
      autoFocus: false,
      panelClass: 'dialog-responsive',
    });
  }

  private async getMovies(options?: GetMoviesOptions) {
    const fetchMovieListQuery: CreateQueryParams = {};
    fetchMovieListQuery.join = [{ field: 'director' }, { field: 'actors' }, { field: 'genres' }];

    const searchQuery: SFields = {};

    if (options?.genre) {
      searchQuery.$or = [
        {
          'genres.name': { $eq: options?.genre!.name },
        },
      ];
    }

    if (options?.name) {
      searchQuery.$or = [
        {
          name: { $contL: options?.name },
        },
      ];
    }

    fetchMovieListQuery.search = searchQuery;
    this.movieActions.fetchMovies(fetchMovieListQuery);
  }
}
