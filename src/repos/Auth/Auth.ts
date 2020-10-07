import { FireStoreCollections } from '../../utils';
import firebase from 'firebase';
import { Observable, from } from 'rxjs';

export enum Roles {
  Client = 'Client',
  Admin = 'Admin',
  Manager = 'Manager',
}

export enum Storage {
  Email = 'Email',
  AccessToken = 'AccessToken',
}
export interface User {
  id: string;
  email: string;
  username: string;
  role?: [Roles];
  phoneNumber?: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VerifyAuthentication {
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

export const listenToCurrentUser = (): Observable<User> => {
  const timestamp = firebase.firestore.Timestamp;
  return new Observable((observer) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        const { email } = user;
        return FireStoreCollections.users()
          .where('email', '==', email)
          .onSnapshot((snapShot) => {
            if (snapShot.empty) {
              observer.error('error');
            }
            snapShot.docs.map((doc) => {
              const { createdAt, updatedAt } = doc.data();
              const data = {
                ...(doc.data() as User),
                id: doc.id,
                createdAt:
                  createdAt &&
                  new timestamp(
                    createdAt.seconds,
                    createdAt.nanoseconds
                  ).toDate(),
                updatedAt:
                  updatedAt &&
                  new timestamp(
                    updatedAt.seconds,
                    updatedAt.nanoseconds
                  ).toDate(),
              };
              observer.next(data);
            });
          });
      } else {
        observer.error('Login to proceed');
      }
    });
  });
};

export const logout = () => {
  return from(firebase.auth().signOut());
};
