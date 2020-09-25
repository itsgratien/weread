import { RootEpic } from '.';
import { AuthTypes, setMessage, setError } from '..';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isOfType } from 'typesafe-actions';

import { signInWithGoogle } from '../../repos';

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
        map((res) => {
          console.log(res);
          return setMessage('logged in');
        }),
        catchError((error) => {
          console.log(error);
          return of(setError(error));
        })
      );
    })
  );
};
