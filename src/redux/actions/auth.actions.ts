import { action, ActionType } from 'typesafe-actions';

export enum AuthTypes {
  Welcome = 'AuthTypes/Welcome',
  SetMessage = 'AuthTypes/SetMessage',
  Loading = 'AuthTypes/Loading',
}

export const welcome = () => action(AuthTypes.Welcome);

export const setMessage = (message: string) =>
  action(AuthTypes.SetMessage, { message });

const authActions = {
  welcome,
  setMessage,
};

export type AuthAction = ActionType<typeof authActions>;
