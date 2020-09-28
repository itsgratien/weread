import { FireStoreCollections } from '../../utils';
import firebase from 'firebase';
import { Observable } from 'rxjs';

export enum Roles {
  Client = 'Client',
  Admin = 'Admin',
  Manager = 'Manager',
}

export enum Storage {
  Email = 'Email',
  AccessToken = 'AccessToken'
}
export interface User {
  id: string;
  email: string;
  username: string;
  role?: [Roles];
  phoneNumber?: string;
  avatar?: string;
}

export interface VerifyAuthentication{
  message?: string;
  isAuthenticated: boolean;
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
      .then((res) => {
        if (res.user) {
          const { email, displayName, photoURL, uid } = res.user;
          FireStoreCollections.users()
            .doc(uid)
            .set(
              {
                email,
                username: displayName,
                profilePicture: photoURL,
                role: [Roles.Client],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
            .then(() => {
              observer.next(email);
            })
            .catch(() => {
              observer.error('Something went wrong. Try again');
            });
        }
      })
      .catch(() => {
        observer.error('Something went wrong. Try again');
      });
  });
};
