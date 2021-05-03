import { GenresGuard } from './../shared/guards/genres.guard';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesFeedComponent } from './components/movies-feed/movies-feed.component';
import { MoviesComponent } from './movies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    canActivate: [GenresGuard],
    children: [
      { path: '', component: MoviesFeedComponent },
      { path: 'genre/:movieType', component: MoviesFeedComponent },
      { path: ':movieId', component: MovieDetailsComponent },
    ],
  },
  { path: '', component: MoviesComponent },
  { path: ':movieType', component: MoviesComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
