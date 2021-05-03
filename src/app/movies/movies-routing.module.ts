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
    children: [
      { path: '', component: MoviesFeedComponent },
      { path: 'genre/:movieType', component: MoviesFeedComponent, canActivate: [GenresGuard] },
      { path: 'movie/:movieId', component: MovieDetailsComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
