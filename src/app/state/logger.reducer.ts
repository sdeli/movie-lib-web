import { ActionReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { AppState } from './app.state';

export function logger(reducer: ActionReducer<AppState>) {
  // default, no options
  return storeLogger({ collapsed: true })(reducer);
}
