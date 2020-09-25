import { firestore } from 'firebase';
import 'firebase/firestore';

export enum firebaseCollection {
  users = 'users',
  books = 'books',
  categories = 'categories',
}

export const firebaseConfig = {
  apiKey: 'AIzaSyCgcFcg4JHM7y8WCKWJ22bVa3ViN7P5C0Q',
  authDomain: 'weread-2f25e.firebaseapp.com',
  databaseURL: 'https://weread-2f25e.firebaseio.com',
  projectId: 'weread-2f25e',
  storageBucket: 'weread-2f25e.appspot.com',
  messagingSenderId: '416068594531',
  appId: '1:416068594531:web:df0acd574ca7c14e07c156',
};

export const FirebaseCollectionReference = {
  users: () => firestore().collection(firebaseCollection.users),
  books: () => firestore().collection(firebaseCollection.books),
  categories: () => firestore().collection(firebaseCollection.categories),
};
