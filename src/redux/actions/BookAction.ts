import { ActionType, action } from 'typesafe-actions';
import { UploadPath, DeleteParams, Category, Book } from '../../repos';

export enum BookTypes {
  ListenToAllBook = 'BookActionType/ListenToAllBook',
  SetBooks = 'BookActionType/SetBooks',
  AddBook = 'BookActionType/AddBook',
  UploadCoverImage = 'BookActionType/UploadCoverImage',
  SetCoverImage = 'BookActionType/SetCoverImage',
  UploadPdf = 'BookActionType/UploadPdf',
  SetPdf = 'BookActionType/SetPdf',
  UploadAudioBook = 'BookActionType/UploadAudioBook',
  SetAudioBook = 'BookActionType/SetAudioBook',
  DeleteFile = 'BookActionType/DeleteFile',
  SetDeleteFile = 'BookActionType/SetDeleteFile',
  ListenToAllCategory = 'BookActionType/ListenToAllCategory',
  SetCategories = 'BookActionType/SetCategories',
}

export const listenToAllBook = () => action(BookTypes.ListenToAllBook);

export const setBooks = (data: Book[]) => action(BookTypes.SetBooks, { data });

export const addBook = (data: Book) => action(BookTypes.AddBook, { data });

export const uploadCoverImage = (data: Blob, path: string) =>
  action(BookTypes.UploadCoverImage, { data, path });

export const setCoverImage = (data?: UploadPath) =>
  action(BookTypes.SetCoverImage, { data });

export const uploadPdf = (data: Blob, path: string) =>
  action(BookTypes.UploadPdf, { data, path });

export const setPdf = (data?: UploadPath) => action(BookTypes.SetPdf, { data });

export const uploadAudioBook = (data: Blob, path: string) =>
  action(BookTypes.UploadAudioBook, { data, path });

export const setAudioBook = (data?: UploadPath) =>
  action(BookTypes.SetAudioBook, { data });

export const deleteFile = ({ type, filePath }: DeleteParams) =>
  action(BookTypes.DeleteFile, { filePath, type });

export const setDeleteFile = () => action(BookTypes.SetDeleteFile);

export const listenToAllCategory = () => action(BookTypes.ListenToAllCategory);

export const setCategories = (data: Category[]) =>
  action(BookTypes.SetCategories, { data });

const bookActions = {
  listenToAllBook,
  setBooks,
  addBook,
  uploadCoverImage,
  setCoverImage,
  uploadPdf,
  setPdf,
  uploadAudioBook,
  setAudioBook,
  deleteFile,
  setDeleteFile,
  listenToAllCategory,
  setCategories,
};

export type BookAction = ActionType<typeof bookActions>;
