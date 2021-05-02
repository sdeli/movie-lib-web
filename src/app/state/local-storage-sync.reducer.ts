import { MOVIES_FEATURE_KEY } from './../movies/state/movies.reducer';
import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from './app.state';

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<any> {
  return localStorageSync({ keys: [MOVIES_FEATURE_KEY], rehydrate: true })(reducer);
}
