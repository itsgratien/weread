import { combineReducers } from 'redux';
import { authReducer, AuthState } from './AuthReducer';

export const rootReducer = combineReducers({
  Auth: authReducer,
});

export interface RootState{
  Auth: AuthState
};