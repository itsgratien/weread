export const Routes = {
  Home: 'Home',
  SocialAuth: 'SocialAuth',
  ViewAllBooks: 'ViewAllBooks',
  AddBook: 'AddBook',
  ImageUpload: 'ImageUpload',
};

export type RootStackParamList = {
  // Home: undefined;
  // SocialAuth: undefined;
  // ViewAllBooks: undefined;
  AddBook: {
    imageUrl?: string;
    audioUrl?: string;
    pdfUrl?: string;
  };
  // ImageUpload: undefined;
};
