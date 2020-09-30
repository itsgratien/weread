import { StorageReference } from '../../utils';
import { from, Observable } from 'rxjs';

export enum PathReference {
  Images = 'images',
  Audio = 'audio',
}

export const uploadFile = (data: Blob, path: string): Observable<string> => {
  return new Observable((observer) => {
    StorageReference.images(path)
      .put(data)
      .then((snapShot) => {
        snapShot.ref.getDownloadURL().then((url) => {
          observer.next(url);
        });
      });
  });
};
