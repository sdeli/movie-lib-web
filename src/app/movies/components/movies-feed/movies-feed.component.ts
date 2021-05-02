import { Movie } from '../../movies.types';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { uniq as _uniq } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';

@Component({
  selector: 'ml-movies-feed',
  templateUrl: './movies-feed.component.html',
  styleUrls: ['./movies-feed.component.scss'],
})
export class MoviesFeedComponent implements OnInit, OnDestroy {
  @Input() movies: Movie[] = [];

  constructor(readonly dialog: MatDialog) {}

  async ngOnInit() {
    // console.log(environment.production);
  }

  ngOnDestroy() {
    // ngOnDestroy is needed for untilDestroyed
  }

  openDescriptionDialog() {
    this.dialog.open(DescriptionDialogComponent, {
      autoFocus: false,
      panelClass: 'dialog-responsive',
    });
  }
}
