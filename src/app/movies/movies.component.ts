import { MovieGenreNavItem } from './movies.types';
import { first } from 'rxjs/operators';
import { MoviesService } from '@app/movies/movies.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@app/shared/until-destroyed';
import { Movie, MovieGenre } from '@app/movies/movies.types';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { CreateQueryParams, SFields } from '@nestjsx/crud-request';

const LARGE_TABLET_SIZE = 1279;

export enum MediaBreakPoints {
  MaxLargeTablet = '(max-width: 1279px)',
}

@Component({
  selector: 'ml-shell',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  breakPoint$: Observable<BreakpointState>;
  isMaxLargeTablet: boolean;
  movies: Movie[];
  movieGenres: MovieGenreNavItem[];
  activeGenre: MovieGenre | null | string;
  codec = new HttpUrlEncodingCodec();
  wasOnLargeTablet = true;

  @ViewChild('sideNav') sideNav: MatDrawer;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const wind = event.target as Window;
    const onLargeTabletOrBigger = wind.innerWidth >= LARGE_TABLET_SIZE;
    if (onLargeTabletOrBigger) {
      this.wasOnLargeTablet = true;
      return;
    }

    if (!onLargeTabletOrBigger && !this.wasOnLargeTablet) {
      this.wasOnLargeTablet = false;
    }

    if (!onLargeTabletOrBigger && this.wasOnLargeTablet && this.sideNav.opened) {
      this.sideNav.close();
    }
  }
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
    this.route.params.pipe(untilDestroyed(this)).subscribe(async (urlParams) => {
      if (!this.movieGenres) {
        this.movieGenres = await this.movieService.getMovieCategories().pipe(first()).toPromise();
      }

      const onLargeTable = window.innerWidth >= LARGE_TABLET_SIZE;
      if (onLargeTable) {
        this.sideNav.open();
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
        await this.getMoviesByGenre(validCategory);
        return;
      }

      if (!requestsGenre) {
        await this.getMoviesByGenre();
      }
    });
  }

  ngOnDestroy() {
    // ngOnDestroy is needed for untilDestroyed
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
