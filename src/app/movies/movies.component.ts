import { first } from 'rxjs/operators';
import { MoviesService } from '@app/movies/movies.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@app/shared/until-destroyed';
import { Movie, MovieGenre } from '@app/movies/movies.types';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { CreateQueryParams, SFields } from '@nestjsx/crud-request';

export enum MediaBreakPoints {
  MaxLargeTablet = '(max-width: 1279px)',
}

@Component({
  selector: 'ml-shell',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {
  breakPoint$: Observable<BreakpointState>;
  isMaxLargeTablet: boolean;
  movies: Movie[];
  movieGenres: MovieGenre[];
  activeGenre: MovieGenre | null | string;
  codec = new HttpUrlEncodingCodec();
  @ViewChild('sideNav') sideNav: MatDrawer;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly movieService: MoviesService,
  ) {
    this.breakPoint$ = breakpointObserver.observe([MediaBreakPoints.MaxLargeTablet]);
    this.isMaxLargeTablet = this.breakpointObserver.isMatched(MediaBreakPoints.MaxLargeTablet);
  }

  ngOnInit() {
    console.log(11);
    this.route.params.pipe(untilDestroyed(this)).subscribe(async (urlParams) => {
      if (!this.movieGenres) {
        this.movieGenres = await this.movieService.getMovieCategories().pipe(first()).toPromise();
      }

      const requestedGenre = this.codec.decodeValue(urlParams['movieType']);
      const validCategory = this.movieGenres.find((category) => category.name === requestedGenre);
      const requestsGenre = !!urlParams['movieType'];
      if (requestsGenre && !validCategory) {
        this.router.navigate(['/']);
        return;
      }

      if (requestsGenre && validCategory) {
        this.activeGenre = validCategory;
        this.getMoviesByGenre(validCategory);
      }

      if (!requestsGenre) {
        console.log('get all');
        this.getMoviesByGenre();
      }
    });
  }

  ngOnDestroy() {
    // ngOnDestroy is needed for untilDestroyed
  }

  ngAfterViewInit() {
    this.breakPoint$.subscribe((res) => {
      this.isMaxLargeTablet = res.breakpoints[MediaBreakPoints.MaxLargeTablet];
      this.closeNavOnLargeViewPort();
    });
  }

  closeNavOnLargeViewPort() {
    if (!this.isMaxLargeTablet && this.sideNav.opened) {
      this.sideNav.toggle();
    }
  }

  private async getMoviesByGenre(genre?: MovieGenre) {
    const fetchMovieListQuery: CreateQueryParams = {};
    fetchMovieListQuery.join = [{ field: 'director' }, { field: 'actors' }, { field: 'genres' }];

    const shouldDisplayAllMovies = !genre;
    if (shouldDisplayAllMovies) {
      this.movies = (await this.movieService.getMovies(fetchMovieListQuery).pipe(first()).toPromise()) as Movie[];
      console.log(this.movies);
      return;
    }

    const searchQuery: SFields = {};
    searchQuery.$or = [
      {
        'genres.name': { $eq: genre!.name },
      },
    ];

    fetchMovieListQuery.search = searchQuery;

    this.movies = (await this.movieService.getMovies(fetchMovieListQuery).pipe(first()).toPromise()) as Movie[];
  }
}
