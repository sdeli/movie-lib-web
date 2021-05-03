import { MovieActions } from './state/movies.actions';
import { getMovieList, getGenreList } from './state/movies.selectors';
import { Genre } from './movies.types';
import { MoviesService } from '@app/movies/state/movies.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectorRef,
  AfterContentInit,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Movie } from '@app/movies/movies.types';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { AppState } from '@app/state/app.state';

const LARGE_TABLET_SIZE = 1279;

export enum MediaBreakPoints {
  MaxLargeTablet = '(max-width: 1279px)',
}

@Component({
  selector: 'ml-shell',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnDestroy, OnInit, AfterViewInit {
  movies$ = this.store.pipe(select(getMovieList));
  genres$ = this.store.pipe(select(getGenreList));
  breakPoint$: Observable<BreakpointState>;
  isMaxLargeTablet: boolean;
  movies: Movie[];
  activeGenre: Genre | null | string;
  wasOnLargeTablet = true;
  codec = new HttpUrlEncodingCodec();
  shouldSideavOpenOnLoad = false;
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
    private readonly store: Store<AppState>,
    private readonly movieActions: MovieActions,
    private cdRef: ChangeDetectorRef,
  ) {
    this.breakPoint$ = breakpointObserver.observe([MediaBreakPoints.MaxLargeTablet]);
    this.isMaxLargeTablet = this.breakpointObserver.isMatched(MediaBreakPoints.MaxLargeTablet);
  }
  ngOnInit() {
    this.movieActions.fetchGenres();
  }

  ngAfterViewInit() {
    const onLargeTable = window.innerWidth >= LARGE_TABLET_SIZE;
    if (onLargeTable) {
      this.sideNav.open();
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy() {
    // ngOnDestroy is needed for untilDestroyed
  }
}
