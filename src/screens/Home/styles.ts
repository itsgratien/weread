import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, Colors } from '../../theme';

const window = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  category: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    position: 'relative'
  },
  book: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.f8,
    paddingBottom: 10,
    paddingLeft: 23,
    paddingRight: 23,
    paddingTop: 10,
  },
  bookContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookImageView: {
    width: window.width - 120,
    height: 130,
    borderRadius: 30,
  },
  bookImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    resizeMode: 'cover',
  },
  authorView: {
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  authorName: {
    fontFamily: Fonts.tomorrow.medium,
    fontSize: 12,
    textAlign: 'center'
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: Fonts.tomorrow.medium,
  },
});
