import { FirebaseCollectionReference } from '../../utils';
import firebase from 'firebase';
import { Observable } from 'rxjs';

export enum Roles {
  Client = 'Client',
  Admin = 'Admin',
  Manager = 'Manager',
}

export enum Storage {
  Email = 'Email',
}
export interface User {
  id: string;
  email: string;
  username: string;
  role?: [Roles];
  phoneNumber?: string;
  avatar?: string;
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
          const { email, displayName, photoURL } = res.user;
          return FirebaseCollectionReference.users()
            .where('email', '==', email)
            .get()
            .then((user) => {
              if (user.empty) {
                return FirebaseCollectionReference.users()
                  .add({
                    ...res.user,
                    email,
                    username: displayName,
                    avatar: photoURL,
                    role: [Roles.Client],
                  })
                  .then(() => observer.next(email));
              } else {
                observer.next(email);
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
        observer.error('Something went wrong. Try again');
      });
  });
};
