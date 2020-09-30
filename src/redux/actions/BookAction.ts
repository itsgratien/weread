import { ActionType, action } from 'typesafe-actions';

export enum BookTypes {
  ListenToAllBook = 'BookActionType/ListenToAllBook',
}

export const listenToAllBook = () => action(BookTypes.ListenToAllBook);

const bookActions = {
  listenToAllBook,
};

export type BookAction = ActionType<typeof bookActions>;
