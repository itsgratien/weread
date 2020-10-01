import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../theme';
import { styles as ImageUploadStyles } from '../ImageUpload/styles';

export const styles = StyleSheet.create({
  ...ImageUploadStyles,
  audioView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  playAndPauseView: {
    width: 70,
    height: 70,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
