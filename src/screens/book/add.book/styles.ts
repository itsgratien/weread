import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    marginTop: 42,
    paddingLeft: 18,
    paddingRight: 18,
  },
  inputView: {
    marginTop: 10,
  },
  label: {
    fontFamily: Fonts.tomorrow.regular,
    fontSize: 14,
    color: Colors.black,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.white,
    borderColor: Colors.f8,
    borderRadius: 10,
  },
  textInput: {
    fontFamily: Fonts.tomorrow.regular,
    fontSize: 14,
    height: 42,
  },
  saveBtn: {
    height: 55,
    borderRadius: 10,
    marginTop: 24,
  },
  btnText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.tomorrow.bold,
  },
});
