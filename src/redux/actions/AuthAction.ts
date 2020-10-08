import { action, ActionType } from 'typesafe-actions';
import { VerifyAuthentication, User } from '../../repos';

export enum AuthTypes {
  Welcome = 'AuthTypes/Welcome',
  SetMessage = 'AuthTypes/SetMessage',
  Loading = 'AuthTypes/Loading',
  LoginWithGoogle = 'AuthTypes/LoginWithGoogle',
  SetError = 'AuthTypes/SetError',
  SetAuthentication = 'AuthTypes/SetAuthentication',
  Logout = 'AuthTypes/Logout',
  VerifyAuthentication = 'AuthTypes/VerifyAuthentication',
  SetCurrentUser = 'AuthTypes/SetCurrentUser',
}

export const welcome = () => action(AuthTypes.Welcome);

export const setMessage = (message: string) =>
  action(AuthTypes.SetMessage, { message });

export const setError = (message: string) =>
  action(AuthTypes.SetError, { message });

export const loginWithGoogle = (accessToken: string) =>
  action(AuthTypes.LoginWithGoogle, { accessToken });

export const setAuthentication = ({
  message,
  isAuthenticated,
}: VerifyAuthentication) =>
  action(AuthTypes.SetAuthentication, { message, isAuthenticated });

export const logout = () => action(AuthTypes.Logout);

export const verifyAuthentication = () =>
  action(AuthTypes.VerifyAuthentication);

export const setCurrentUser = (user: User) =>
  action(AuthTypes.SetCurrentUser, { user });

const authActions = {
  welcome,
  setMessage,
  loginWithGoogle,
  setError,
  setAuthentication,
  logout,
  verifyAuthentication,
  setCurrentUser,
};

export type AuthAction = ActionType<typeof authActions>;
