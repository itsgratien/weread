import { produce } from 'immer';
import { AuthTypes, AuthAction } from '../actions';

export interface AuthState {
  readonly message?: string;
  readonly loading?: boolean;
  readonly error?: string;
  readonly isAuthenticated?: boolean;
}

const initialState: AuthState = {};

export const authReducer = (state = initialState, action: AuthAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case AuthTypes.SetMessage:
        draft.message = action.payload.message;
        break;

      case AuthTypes.SetError:
        draft.error = action.payload.message;
        break;

      case AuthTypes.LoginWithGoogle:
        draft.loading = true;
        break;

      case AuthTypes.SetAuthentication:
        draft.isAuthenticated = action.payload.isAuthenticated;
        draft.message = action.payload.message;
        draft.loading = false;
        break;
      
      default:
        return draft;
    }
  });
};
