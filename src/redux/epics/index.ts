import { Epic, combineEpics } from 'redux-observable';
import { RootState, RootAction } from '..';
import {
  welcomeEpic,
  loginWithGoogleEpic,
  logoutEpic,
  verifyAuthenticationEpic,
} from './auth.epic';

export default combineEpics(
  welcomeEpic,
  loginWithGoogleEpic,
  logoutEpic,
  verifyAuthenticationEpic
);

export type RootEpic = Epic<RootAction, RootAction, RootState>;
