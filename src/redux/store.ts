import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware } from 'redux-observable';
import epics from './epics';
import { RootState, rootReducer, RootAction } from '.';

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

export const store: Store<RootState, RootAction> = createStore(
  rootReducer,
  composeWithDevTools({})(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epics);
