import { RootEpic } from '.';
import {
  BookTypes,
  setError,
  setCoverImage,
  setPdf,
  setAudioBook,
  setDeleteFile,
  setCategories,
  setBooks,
  setMessage,
} from '..';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import {
  uploadFile,
  deleteFile,
  PathReference,
  listenToAllCategory,
  listenToAllBook,
  addNewBook,
} from '../../repos';

export const uploadImageEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(BookTypes.UploadCoverImage)),
    switchMap((action) => {
      const { data, path } = action.payload;
      return uploadFile(data, path).pipe(map((res) => setCoverImage(res)));
    }),
    catchError(() => of(setError('Something went wrong. Try again')))
  );
};

export const uploadPdfEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(BookTypes.UploadPdf)),
    switchMap((action) => {
      const { data, path } = action.payload;
      return uploadFile(data, path).pipe(map((res) => setPdf(res)));
    }),
    catchError(() => of(setError('Something went wrong. Try again')))
  );
};

export const uploadAudioBookEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(BookTypes.UploadAudioBook)),
    switchMap((action) => {
      const { data, path } = action.payload;
      return uploadFile(data, path).pipe(map((res) => setAudioBook(res)));
    }),
    catchError(() => of(setError('Something went wrong. Try again')))
  );
};

export const deleteBookFileEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(BookTypes.DeleteFile)),
    switchMap((action) => {
      const { type, filePath } = action.payload;
      return deleteFile(filePath).pipe(
        switchMap(() => {
          switch (type) {
            case PathReference.Images:
              return of(setCoverImage());

            case PathReference.Audio:
              return of(setAudioBook());

            case PathReference.Pdf:
              return of(setPdf());

            default:
              return of(setDeleteFile());
          }
        })
      );
    }),
    catchError((error) => {
      return of(setError('Something went wrong. Try again'));
    })
  );
};

export const listenToAllCategoryEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(BookTypes.ListenToAllCategory)),
    switchMap(() => {
      return listenToAllCategory().pipe(map((res) => setCategories(res)));
    }),
    catchError(() => of(setError('Something went wrong. Try again')))
  );
};

export const newBookEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(BookTypes.AddBook)),
    switchMap((action) => {
      const { data } = action.payload;
      return addNewBook(data).pipe(
        map(() => setMessage('Book Saved Successfully'))
      );
    }),
    catchError(() => of(setError('Something went wrong. Try again')))
  );
};

export const listenToAllBookEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(BookTypes.ListenToAllBook)),
    switchMap((action) => {
      return listenToAllBook().pipe(map((res) => setBooks(res)));
    }),
    catchError(() => of(setError('Something went wrong. Try again')))
  );
};
