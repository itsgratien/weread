import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../theme';

export const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  searchInputTextStyle: {
    fontFamily: Fonts.tomorrow.regular,
    color: Colors.black,
    height: 40,
    paddingLeft: 10,
  },
  searchingView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchingTextView: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchingText: {
    marginLeft: 5,
    fontFamily: Fonts.tomorrow.regular,
    fontSize: 13,
  },
  bookItem: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(196, 196, 196, 0.08)',
    alignItems: 'center',
    marginTop: 10
  },
  bookCover: {
    width: 70,
    height: 70,
    borderRadius: 100,
    resizeMode: 'cover',
  },
  bookTitle: {
    fontFamily: Fonts.tomorrow.bold,
    fontSize: 14,
  },
  authorView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});
