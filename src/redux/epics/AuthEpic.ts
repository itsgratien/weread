import { RootEpic } from '.';
import {
  AuthTypes,
  setMessage,
  setError,
  setAuthentication,
  setCurrentUser,
  verifyAuthentication,
} from '..';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import AsyncStorage from '@react-native-community/async-storage';
import {
  signInWithGoogle,
  Storage,
  listenToCurrentUser,
  logout,
} from '../../repos';

export const welcomeEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(AuthTypes.Welcome)),
    map(() => setMessage('welcome to our app'))
  );
};

export const loginWithGoogleEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(AuthTypes.LoginWithGoogle)),
    switchMap((action) => {
      const { accessToken } = action.payload;
      return signInWithGoogle(accessToken).pipe(
        switchMap(() => {
          return listenToCurrentUser().pipe(
            map((res) => {
              return setCurrentUser(res);
            })
          );
        }),
        catchError((error) => {
          return of(setError(error));
        })
      );
    })
  );
};

export const logoutEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(AuthTypes.Logout)),
    switchMap(() => {
      return logout().pipe(
        map(() =>
          setAuthentication({ message: 'Logged out', isAuthenticated: false })
        )
      );
    }),
    catchError(() => of(setError('Something Wrong. Try again')))
  );
};

export const verifyAuthenticationEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(AuthTypes.VerifyAuthentication)),
    switchMap(() => {
      return listenToCurrentUser().pipe(
        map((res) => {
          return setCurrentUser(res);
        })
      );
    }),
    catchError(() => of(setAuthentication({ isAuthenticated: false })))
  );
};
