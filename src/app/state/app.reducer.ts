import { moviesReducer } from './../movies/state/movies.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { localStorageSyncReducer } from './local-storage-sync.reducer';
import { AppState } from './app.state';
import { logger } from './logger.reducer';

export const rootReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  movies: moviesReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer, logger];
