import { combineReducers } from 'redux';
import { authReducer, AuthState } from './AuthReducer';
import { BookState, bookReducer } from './BookReducer';

export const rootReducer = combineReducers({
  Auth: authReducer,
  Book: bookReducer,
});

export interface RootState {
  Auth: AuthState;
  Book: BookState;
}
