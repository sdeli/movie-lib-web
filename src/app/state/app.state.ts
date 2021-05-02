import { MOVIES_FEATURE_KEY } from './../movies/state/movies.reducer';
import { RouterReducerState } from '@ngrx/router-store';
import { MovieState } from '@app/movies/state';

export interface AppState {
  router: RouterReducerState;
  [MOVIES_FEATURE_KEY]: MovieState;
}
