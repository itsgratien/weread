import { RootEpic } from '.';
import {
  BookTypes,
  setError,
  setCoverImage,
  setPdf,
  setAudioBook,
  setDeleteFile,
} from '..';
import {
  map,
  filter,
  switchMap,
  catchError,
  combineLatest,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { isOfType } from 'typesafe-actions';
import { uploadFile, deleteFile, PathReference } from '../../repos';

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

            default:
              return of(setDeleteFile());
          }
        })
      );
    }),
    catchError((error) => {
      console.log(error);
      return of(setError('Something went wrong. Try again'));
    })
  );
};
