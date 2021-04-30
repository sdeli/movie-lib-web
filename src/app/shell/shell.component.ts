import { GameCategory } from '../movies-feed/movies-feed.types';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { GameCategoriesLabelMapArr } from '@app/movies-feed/movies-feed.constants';
import { NavigationStart, Router } from '@angular/router';
import { untilDestroyed } from '@app/shared/until-destroyed';

export enum MediaBreakPoints {
  MaxLargeTablet = '(max-width: 1279px)',
}

@Component({
  selector: 'jg-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, AfterViewInit, OnDestroy {
  gameCategories = GameCategoriesLabelMapArr;
  breakPoint$: Observable<BreakpointState>;
  isMaxLargeTablet: boolean;

  @ViewChild('sideNav') sideNav: MatDrawer;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
    this.breakPoint$ = breakpointObserver.observe([
      MediaBreakPoints.MaxLargeTablet,
    ]);
    this.isMaxLargeTablet = this.breakpointObserver.isMatched(
      MediaBreakPoints.MaxLargeTablet,
    );
  }

  ngOnInit() {
    let gameCategory = this.router.url.split('/').pop() as GameCategory;
    this.markActivatedCategory(gameCategory);

    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        gameCategory = event.url.split('/').pop() as GameCategory;
        this.markActivatedCategory(gameCategory);
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

  markActivatedCategory(gameCategory: GameCategory) {
    this.gameCategories.forEach(
      (gameCateg) => (gameCateg.isActive = gameCateg.category === gameCategory),
    );
  }
}
