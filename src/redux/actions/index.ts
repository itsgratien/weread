import { AuthAction } from './AuthAction';
import { BookAction } from './BookAction';

export * from './AuthAction';
export * from './BookAction';

export type RootAction = AuthAction | BookAction;
