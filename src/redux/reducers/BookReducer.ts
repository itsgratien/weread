import { produce } from 'immer';
import { BookTypes, BookAction } from '../actions';

export interface BookState {
  readonly loading?: boolean;
}

const initialState: BookState = {};

export const bookReducer = (state = initialState, action: BookAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case BookTypes.ListenToAllBook:
        draft.loading = true;
        break;
      default:
        return draft;
    }
  });
};
