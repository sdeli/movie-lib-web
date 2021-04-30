import { first } from 'rxjs/operators';
import { MoviesService } from '@app/movies/movies.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { untilDestroyed } from '@app/shared/until-destroyed';
import { MovieGenre } from '@app/movies/movies.types';
import { HttpUrlEncodingCodec } from '@angular/common/http';

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
  movieGenres: MovieGenre[];
  activeGenre: MovieGenre | null;
  codec = new HttpUrlEncodingCodec();
  @ViewChild('sideNav') sideNav: MatDrawer;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly shellServ: MoviesService,
  ) {
    this.breakPoint$ = breakpointObserver.observe([MediaBreakPoints.MaxLargeTablet]);
    this.isMaxLargeTablet = this.breakpointObserver.isMatched(MediaBreakPoints.MaxLargeTablet);
  }

  ngOnInit() {
    console.log(11);
    this.route.params.pipe(untilDestroyed(this)).subscribe(async (urlParams) => {
      if (!this.movieGenres) {
        this.movieGenres = await this.shellServ.getMovieCategories().pipe(first()).toPromise();
        console.log(this.movieGenres);
      }
      const requestsCategory = !!urlParams['movieType'];
      if (requestsCategory) {
        this.handleCategory(urlParams);
      } else {
        this.activeGenre = null;
      }
    });
  }

  ngOnDestroy() {
    // ngOnDestroy is needed for untilDestroyed
  }

  handleCategory(urlParams: Params) {
    const requestedGenre = this.codec.decodeValue(urlParams['movieType']);
    const validCategory = this.movieGenres.find((category) => category.name === requestedGenre);
    if (!validCategory) {
      this.router.navigate(['/']);
    } else {
      this.activeGenre = validCategory;
    }
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
}
