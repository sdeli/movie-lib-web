import { HttpClient } from '@angular/common/http';
import { Game, MovieGenre } from '../../movies.types';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { uniq as _uniq } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from './components/create-user/description-dialog.component';

@Component({
  selector: 'ml-movies-feed',
  templateUrl: './movies-feed.component.html',
  styleUrls: ['./movies-feed.component.scss'],
})
export class MoviesFeedComponent implements OnInit, OnDestroy {
  numb = 123123;
  allGames: Game[] = [];
  gamesInCurrentCategory: Game[] = [];
  currentCategory: MovieGenre;
  allCategories: MovieGenre[];
  constructor(readonly dialog: MatDialog, private readonly http: HttpClient) {}

  async ngOnInit() {
    // console.log(environment.production);

    this.http.get<string>('/').subscribe((thing) => {
      console.log('thing');
      console.log(thing);
    });
  }

  ngOnDestroy() {
    // ngOnDestroy is needed for untilDestroyed
  }

  openDescriptionDialog() {
    this.dialog.open(DescriptionDialogComponent, {
      autoFocus: false,
    });
  }
}
