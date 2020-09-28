import { StyleSheet } from 'react-native';
import { Fonts } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingView: {
    flexDirection: 'row',
  },
  loadingText: {
    fontFamily: Fonts.tomorrow.medium,
    fontSize: 15,
    marginLeft: 10
  },
});
