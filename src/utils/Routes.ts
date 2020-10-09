export const Routes = {
  Home: 'Home',
  SocialAuth: 'SocialAuth',
  ViewAllBooks: 'ViewAllBooks',
  AddBook: 'AddBook',
  ImageUpload: 'ImageUpload',
  AudioUpload: 'AudioUpload',
  PdfUpload: 'PdfUpload',
  Search: 'Search',
  BookDetail: 'BookDetail',
};

export type RootStackParamList = {
  BookDetail: {
    id: string;
  };
};
