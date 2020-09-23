import { produce } from 'immer';
import { AuthTypes, AuthAction } from '..';

export interface AuthState {
  readonly message?: string;
}

const initialState: AuthState = {};

export const authReducer = (state = initialState, action: AuthAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      // case AuthTypes.SetMessage:
      //   draft.message = action.payload.message;
      //   break;

      default:
        return draft;
    }
    return draft;
  });
};
