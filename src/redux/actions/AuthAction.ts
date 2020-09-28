import { action, ActionType } from 'typesafe-actions';
import { VerifyAuthentication } from '../../repos';

export enum AuthTypes {
  Welcome = 'AuthTypes/Welcome',
  SetMessage = 'AuthTypes/SetMessage',
  Loading = 'AuthTypes/Loading',
  LoginWithGoogle = 'AuthTypes/LoginWithGoogle',
  SetError = 'AuthTypes/SetError',
  SetAuthentication = 'AuthTypes/SetAuthentication',
  Logout = 'AuthTypes/Logout',
  VerifyAuthentication = 'AuthTypes/VerifyAuthentication',
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

const authActions = {
  welcome,
  setMessage,
  loginWithGoogle,
  setError,
  setAuthentication,
  logout,
  verifyAuthentication,
};

export type AuthAction = ActionType<typeof authActions>;
