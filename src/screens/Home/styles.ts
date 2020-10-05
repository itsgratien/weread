import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, Colors } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 23,
    paddingRight: 23,
  },
  category: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryList: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    margin: 5,
    padding: 10,
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#0000001c',
  },
  categoryName: {
    color: Colors.black,
    fontFamily: Fonts.tomorrow.medium,
    fontSize: 10,
    textTransform: 'lowercase',
  },
  books: {
    marginTop: 30,
    flexDirection: 'row',
  },
  bookView: {
    flex: 1,
    flexGrow: 1,
    flexBasis: 1
  },
  coverImage: {
    alignSelf: 'stretch',
    width: '100%',
    height: 200,
  },
});
