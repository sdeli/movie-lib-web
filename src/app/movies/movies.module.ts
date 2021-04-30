import { MoviesFeedComponent } from './components/movies-feed/movies-feed.component';
import { MoviesService } from '@app/movies/movies.service';
import { MaterialModule } from '@app/shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule, MoviesRoutingModule],
  declarations: [MoviesComponent, MoviesFeedComponent],
  providers: [MoviesService],
})
export class MoviesModule {}
