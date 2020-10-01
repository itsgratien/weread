export const Routes = {
  Home: 'Home',
  SocialAuth: 'SocialAuth',
  ViewAllBooks: 'ViewAllBooks',
  AddBook: 'AddBook',
  ImageUpload: 'ImageUpload',
};

export type RootStackParamList = {
  AddBook: {
    imageUrl?: string;
    audioUrl?: string;
    pdfUrl?: string;
  };
};
