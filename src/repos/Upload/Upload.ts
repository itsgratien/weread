import { StorageReference } from '../../utils';
import { from, Observable } from 'rxjs';
import firebase from 'firebase';

export enum PathReference {
  Images = 'images',
  Audio = 'audio',
  Pdf = 'Pdf',
}

export interface UploadPath {
  url: string;
  path: string;
}

export interface DeleteParams{
  type: string;
  filePath: string;
}
export const uploadFile = (
  data: Blob,
  path: string
): Observable<UploadPath> => {
  return new Observable((observer) => {
    StorageReference.images(path)
      .put(data)
      .then((snapShot) => {
        snapShot.ref.getDownloadURL().then((url) => {
          observer.next({ url, path: snapShot.ref.fullPath });
        });
      });
  });
};

export const deleteFile = (path: string): Observable<string> => {
  return new Observable((observer) => {
    firebase
      .storage()
      .ref()
      .child(path)
      .delete()
      .then(() => {
        observer.next('deleted successfully');
      })
      .catch((error) => observer.error(error));
  });
};
