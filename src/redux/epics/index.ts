import { Epic, combineEpics } from 'redux-observable';
import { RootState, RootAction } from '..';
import { welcomeEpic } from './auth.epics';

export const rootEpic = combineEpics(welcomeEpic);

export type RootEpic = Epic<RootAction, RootAction, RootState>;
