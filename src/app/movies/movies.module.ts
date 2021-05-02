import { MoviesFeedComponent } from './components/movies-feed/movies-feed.component';
import { MoviesService } from '@app/movies/movies.service';
import { MaterialModule } from '@app/shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MoviesRoutingModule } from './movies-routing.module';
import { DescriptionDialogComponent } from './components/movies-feed/components/description-dialog/description-dialog.component';
import { MovieCardComponent } from './shared/components/movie-card/movie-card.component';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule, MoviesRoutingModule],
  declarations: [MoviesComponent, MoviesFeedComponent, DescriptionDialogComponent, MovieCardComponent],
  providers: [MoviesService],
})
export class MoviesModule {}
