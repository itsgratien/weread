import { firestore } from 'firebase';
import { FireStoreCollections } from '../../utils';
import { Observable, from } from 'rxjs';
import { object, string, date, InferType } from 'yup';

export interface Category {
  id: string;
  name: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

export const BookSchema = object()
  .shape({
    title: string()
      .required('title is required'),
    category: object()
      .shape({
        id: string().required('category id is required'),
        name: string().required('category name is required'),
      })
      .required('category is required'),
    cover: string().required('cover is required'),
    audio: string().required('audio is required'),
    pdf: string().optional(),
    id: string().optional(),
    createdAt: date().optional(),
    updatedAt: date().optional(),
  })
  .defined();

export type Book = InferType<typeof BookSchema>;

export const listenToAllCategory = (): Observable<Category[]> => {
  return new Observable((observer) => {
    return FireStoreCollections.categories().onSnapshot((snapShot) => {
      const data = snapShot.docs.map((item) => {
        const { name, createdAt, updatedAt } = item.data();
        return {
          id: item.id,
          name,
          createdAt,
          updatedAt,
        };
      });
      observer.next(data);
    });
  });
};

export const addNewBook = (data: Book) => {
  return from(
    FireStoreCollections.books().add({
      ...data,
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    })
  );
};

export const listenToAllBook = (): Observable<Book[]> => {
  return new Observable((observer) => {
    return FireStoreCollections.books().onSnapshot((data) => {
      const items = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...(doc.data() as Book),
        };
      });
      observer.next(items);
    });
  });
};
