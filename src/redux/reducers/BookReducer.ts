import { produce } from 'immer';
import { BookTypes, BookAction } from '../actions';
import { UploadPath } from '../../repos';

export interface BookState {
  readonly loading?: boolean;
  readonly coverImage?: UploadPath;
  readonly audioBook?: UploadPath;
  readonly pdfBook?: UploadPath;
}

const initialState: BookState = {};

export const bookReducer = (state = initialState, action: BookAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case BookTypes.ListenToAllBook:
        draft.loading = true;
        break;

      case BookTypes.UploadCoverImage:
      case BookTypes.UploadAudioBook:
      case BookTypes.UploadPdf:
      case BookTypes.DeleteFile:
        draft.loading = true;
        break;

      case BookTypes.SetCoverImage:
        draft.loading = false;
        draft.coverImage = action.payload.data;
        break;

      case BookTypes.SetAudioBook:
        draft.loading = false;
        draft.audioBook = action.payload.data;
        break;

      case BookTypes.SetPdf:
        draft.loading = false;
        draft.pdfBook = action.payload.data;
        break;

      case BookTypes.SetDeleteFile:
        draft.loading = false;
        break;

      default:
        return draft;
    }
  });
};
