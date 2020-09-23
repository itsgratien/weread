import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, RootState, RootAction } from '.';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

export const configureStore = () => {
  const store: Store<RootState, RootAction> = createStore(rootReducer, composeWithDevTools({})(applyMiddleware(epicMiddleware)));

  epicMiddleware.run(rootEpic);

  return store;
};
