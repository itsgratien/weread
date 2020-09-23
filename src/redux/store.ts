import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, RootState, RootAction } from './';
import epics from './epics';

const epicMiddleware = createEpicMiddleware<RootAction,RootAction,RootState>();

export const store: Store<RootState, RootAction> = createStore(
  rootReducer,
  composeWithDevTools({})(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epics);
