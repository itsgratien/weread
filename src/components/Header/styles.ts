import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../theme';

export const styles = StyleSheet.create({
  headerView: {
    paddingLeft: 23,
    paddingRight: 23,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingBottom: 10
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  logo: {
    marginLeft: 'auto',
  },
  logout: {
    marginLeft: 'auto',
  },
});
