import { action, ActionType } from 'typesafe-actions';
import { AuthTypes } from '..';

export const welcome = () => action(AuthTypes.Welcome);

export const setMessage = (message: string)=> action(AuthTypes.SetMessage, { message });

const AuthAction = {
    welcome,
    setMessage,
};

export type AuthActionType = ActionType<typeof AuthAction>;
