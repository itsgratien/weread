import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../theme';
import { styles as ImageUploadStyles } from '../ImageUpload/styles';

export const styles = StyleSheet.create({
  ...ImageUploadStyles,
  pdfView: {
    flexGrow: 1,
    marginTop: 14,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
});
