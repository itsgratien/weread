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
  setSearchResult,
} from '..';
import {
  map,
  filter,
  switchMap,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import {
  uploadFile,
  deleteFile,
  PathReference,
  listenToAllCategory,
  listenToAllBook,
  addNewBook,
  listenToSpecificUser,
  searchBook,
  Book,
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

export const newBookEpic: RootEpic = ($action, store) => {
  return $action.pipe(
    filter(isOfType(BookTypes.AddBook)),
    withLatestFrom(store),
    switchMap(([action, state]) => {
      const { data } = action.payload;
      const { user } = state.Auth;
      const newData = {
        ...data,
        userId: user && user.id,
      };
      return addNewBook(newData).pipe(
        map(() => setMessage('Book Saved Successfully'))
      );
    }),
    catchError(() => of(setError('Something went wrong. Try again')))
  );
};

export const listenToAllBookEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(BookTypes.ListenToAllBook)),
    switchMap(() => {
      return listenToAllBook().pipe(
        switchMap((res) => {
          if (res.length <= 0) {
            return of(setBooks([]));
          }
          return combineLatest(
            res.map((item) => {
              if (!item.userId) {
                return item;
              }
              return listenToSpecificUser(item.userId).pipe(
                map((user) => ({
                  ...item,
                  user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    profilePicture: user.profilePicture,
                  },
                }))
              );
            })
          ).pipe(
            map((response) => {
              return setBooks(response as Book[]);
            })
          );
        })
      );
    }),
    catchError(() => of(setError('Something went wrong. Try again')))
  );
};

export const searchBookEpic: RootEpic = ($action) => {
  return $action.pipe(
    filter(isOfType(BookTypes.Search)),
    switchMap((action) => {
      const { data } = action.payload;
      return searchBook(data).pipe(
        switchMap((response) => {
          if (response.length <= 0) {
            return of(setSearchResult([]));
          }
          return combineLatest(
            response.map((item) => {
              if (!item.userId) {
                return item;
              }
              return listenToSpecificUser(item.userId).pipe(
                map((user) => ({
                  ...item,
                  user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    profilePicture: user.profilePicture,
                  },
                }))
              );
            })
          ).pipe(
            map((response) => {
              return setSearchResult(response as Book[]);
            })
          );
        })
      );
    }),
    catchError((error) => {
      console.log(error);
      return of(setError('Something went wrong try again'));
    })
  );
};
