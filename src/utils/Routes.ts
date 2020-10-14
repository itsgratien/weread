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
  ViewPdf: 'ViewPdf'
};

export type RootStackParamList = {
  BookDetail: {
    id: string;
  };
  ViewPdf: {
    uri: string;
  }
};
