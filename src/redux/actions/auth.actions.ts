import { action, ActionType } from 'typesafe-actions';

export enum AuthTypes {
  Welcome = 'AuthTypes/Welcome',
  SetMessage = 'AuthTypes/SetMessage',
  Loading = 'AuthTypes/Loading',
  LoginWithGoogle = 'AuthTypes/LoginWithGoogle',
  SetError = 'AuthTypes/SetError',
}

export const welcome = () => action(AuthTypes.Welcome);

export const setMessage = (message: string) => action(AuthTypes.SetMessage, { message });

export const setError = (message: string) => action(AuthTypes.SetError, { message });

export const loginWithGoogle = (accessToken: string) => action(AuthTypes.LoginWithGoogle, { accessToken });

const authActions = {
  welcome,
  setMessage,
  loginWithGoogle,
  setError,
};

export type AuthAction = ActionType<typeof authActions>;
