import { StyleSheet, Dimensions } from 'react-native';
import { Fonts, Colors } from '../../../theme';

const wind = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    paddingBottom: 23,
  },
  title: {
    fontFamily: Fonts.tomorrow.bold,
    fontSize: 15,
    padding: 23,
  },
  bookCoverView: {
    position: 'relative',
    width: '100%',
  },
  details: {
    marginTop: 24,
    paddingLeft: 23,
    paddingRight: 23,
  },
  sliderView: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    width: wind.width - 70,
  },
  timeView: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  timeText: {
    fontFamily: Fonts.tomorrow.regular,
    fontSize: 12,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  authorName: {
    fontFamily: Fonts.tomorrow.regular,
    fontSize: 12,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});
