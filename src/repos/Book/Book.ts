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
    title: string().required('title is required'),
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
    userId: string().optional(),
    user: object()
      .shape({
        username: string().optional(),
        email: string().optional(),
        profilePicture: string().optional(),
      })
      .optional(),
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
  const { userId, category, pdf, audio, cover, title } = data;
  return from(
    FireStoreCollections.books().add({
      title,
      userId,
      category,
      pdf,
      audio,
      cover,
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

export const searchBook = (value: string): Observable<Book[]> => {
  return new Observable((observer) => {
    return FireStoreCollections.books()
      .where('title', '>=', value)
      .where('title', '<=', value + '\uf8ff')
      .onSnapshot((data) => {
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

export const listenToSpecificBook = (id: string): Observable<Book>=>{
  return new Observable((observer)=>{
    return FireStoreCollections.books().doc(id).onSnapshot((snapShot)=>{
      const { createdAt, updatedAt } = snapShot.data();
      observer.next({
        ...snapShot.data() as Book,
        id: snapShot.id,
        createdAt: createdAt && new firestore.Timestamp(createdAt.seconds, createdAt.nanoseconds).toDate(),
        updatedAt: updatedAt && new firestore.Timestamp(updatedAt.seconds, updatedAt.nanoseconds).toDate(),
      })
    })
  })
}