import { MovieActions } from './../../state/movies.actions';
import { first } from 'rxjs/operators';
import { getMovieById } from './../../state/movies.selectors';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from '@app/shared/until-destroyed';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { AppState } from '@app/state/app.state';
import { Movie } from '@app/movies/movies.types';

@Component({
  selector: 'ml-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie$: Observable<Movie>;
  codec = new HttpUrlEncodingCodec();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
    private readonly movieActions: MovieActions,
  ) {}

  ngOnInit() {
    this.route.params.pipe(untilDestroyed(this)).subscribe(async (urlParams) => {
      const id = urlParams['movieId'];
      this.movie$ = this.store.pipe(select(getMovieById, id));

      const isMovieLoaded = !!(await this.movie$.pipe(first()).toPromise());
      if (!isMovieLoaded) {
        this.movieActions.fetchMovieById(id);
      }
    });
  }

  ngOnDestroy() {
    // ngOnDestroy is needed for untilDestroyed
  }
}
