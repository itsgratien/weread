import { Epic, combineEpics } from 'redux-observable';
import { RootState, RootAction } from '..';
import { welcomeEpic, loginWithGoogleEpic } from './auth.epics';

export default combineEpics(welcomeEpic, loginWithGoogleEpic);

export type RootEpic = Epic<RootAction, RootAction, RootState>;
