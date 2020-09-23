import { combineReducers } from 'redux';
import { authReducer, AuthState } from './auth.reducers';

export const rootReducer = combineReducers({
  Auth: authReducer,
});

export interface RootState{
  Auth: AuthState
};