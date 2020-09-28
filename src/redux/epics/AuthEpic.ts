import { RootEpic } from '.';
import { AuthTypes, setMessage, setError, setAuthentication } from '..';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import AsyncStorage from '@react-native-community/async-storage';
import { signInWithGoogle, Storage } from '../../repos';

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
        switchMap((res) => {
          return from(AsyncStorage.setItem(Storage.Email, res as string)).pipe(
            switchMap(() => {
              return from(
                AsyncStorage.setItem(Storage.AccessToken, accessToken)
              ).pipe(
                map(() =>
                  setAuthentication({
                    message: 'Logged in successfully',
                    isAuthenticated: true,
                  })
                )
              );
            })
          );
        }),
        catchError((error) => {
          console.log(error);
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
      return from(AsyncStorage.removeItem(Storage.AccessToken)).pipe(
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
      return from(AsyncStorage.getItem(Storage.AccessToken)).pipe(
        map(() => setAuthentication({ isAuthenticated: true }))
      );
    }),
    catchError(() => of(setAuthentication({ isAuthenticated: false })))
  );
};
