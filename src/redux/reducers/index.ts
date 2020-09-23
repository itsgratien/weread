import { combineReducers } from 'redux';
import { authReducer, AuthState } from './auth.reducer';

export const rootReducer = combineReducers({
  Auth: authReducer,
});

export type RootState = {
  Auth: AuthState
};