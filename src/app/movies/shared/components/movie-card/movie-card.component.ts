import { Component, Input } from '@angular/core';
import { Movie } from '@app/movies/movies.types';

@Component({
  selector: 'ml-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() movie: Movie;
}
