import { FirebaseCollectionReference } from '../../utils';
import firebase from 'firebase';
import { Observable, from, combineLatest } from 'rxjs';
export interface User {
  id: string;
  email: string;
  username: string;
  role?: [string];
  phoneNumber?: string;
}

export const signInWithGoogle = (accessToken: string) => {
  return new Observable((observer) => {
    const credential = firebase.auth.GoogleAuthProvider.credential(
      null,
      accessToken
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((res) => observer.next(res))
      .catch(() => observer.error('Something went wrong. Try again'));
  });
};
