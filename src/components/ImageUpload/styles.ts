import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 34,
  },
  selectBtn: {
    backgroundColor: Colors.white,
    borderColor: Colors.f8,
    textAlign: 'justify',
    justifyContent: 'flex-start',
    borderRadius: 10,
    position: 'relative',
    paddingLeft: 15,
    paddingRight: 15,
  },
  selectBtnText: {
    fontFamily: Fonts.tomorrow.regular,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  selectBtnIcon: {
    marginLeft: 'auto',
  },
  imageView: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.f8,
    flexGrow: 1,
    marginTop: 14,
    marginBottom: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 20,
    flexGrow: 1,
  }
});
