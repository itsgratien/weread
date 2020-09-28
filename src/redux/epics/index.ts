import { Epic, combineEpics } from 'redux-observable';
import { RootState, RootAction } from '..';
import { welcomeEpic, loginWithGoogleEpic, logoutEpic } from './auth.epic';

export default combineEpics(welcomeEpic, loginWithGoogleEpic, logoutEpic);

export type RootEpic = Epic<RootAction, RootAction, RootState>;
