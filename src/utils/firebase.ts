import firebase from './firebase.config';

const { firestore } = firebase;
export enum firebaseCollection {
  users = 'users',
  books = 'books',
  categories = 'categories',
}

export const FirebaseCollectionReference = {
  users: () => firestore().collection(firebaseCollection.users),
  books: () => firestore().collection(firebaseCollection.books),
  categories: () => firestore().collection(firebaseCollection.categories),
};
