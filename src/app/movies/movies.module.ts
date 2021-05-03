import { MovieActions } from './state/movies.actions';
import { MovieEffects } from './state/movies.effects';
import { MOVIES_FEATURE_KEY, moviesReducer } from './state/movies.reducer';
import { MoviesFeedComponent } from './components/movies-feed/movies-feed.component';
import { MoviesService } from '@app/movies/state/movies.service';
import { MaterialModule } from '@app/shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MoviesComponent } from './movies.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MoviesRoutingModule } from './movies-routing.module';
import { DescriptionDialogComponent } from './components/movies-feed/components/description-dialog/description-dialog.component';
import { MovieCardComponent } from './shared/components/movie-card/movie-card.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GenresGuard } from '@app/shared/guards/genres.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    MoviesRoutingModule,
    StoreModule.forFeature(MOVIES_FEATURE_KEY, moviesReducer),
    EffectsModule.forFeature([MovieEffects]),
  ],
  declarations: [MoviesComponent, MoviesFeedComponent, DescriptionDialogComponent, MovieCardComponent, MovieDetailsComponent],
  providers: [MoviesService, MovieActions, GenresGuard],
})
export class MoviesModule {}
