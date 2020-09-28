import { StyleSheet } from 'react-native';
import { Fonts } from './theme';

export const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: Fonts.tomorrow.medium,
    fontSize: 20,
    marginTop: -4,
  },
  headerStyle: {
    shadowOpacity: 0,
    elevation: 0,
    borderColor: 'white',
    borderWidth: 0,
  },
});
