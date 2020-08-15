import React, { Fragment, FC, useState, useEffect } from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

type CustomTextProps<T = any> = {
  style: T;
  fontWeight: string;
};
export enum FontWeight {
  bold = 'bold',
  regular = 'regular',
  extraBold = 'extraBold',
}
export const font = (name: string) => {
  switch (name) {
    case FontWeight.bold:
      return 'BalooTamma_Bold';
    case FontWeight.regular:
      return 'BalooTamma_Regular400';
    case FontWeight.extraBold:
      return 'BalooTamma_ExtraBold';
    default:
      return 'BalooTamma_Regular400';
  }
};

export const fontFamily = {
  BalooTamma_Regular400: require('../../assets/fonts/BalooTamma2-Regular.ttf'),
  BalooTamma_Bold: require('../../assets/fonts/BalooTamma2-Bold.ttf'),
  BalooTamma_ExtraBold: require('../../assets/fonts/BalooTamma2-ExtraBold.ttf'),
};
const CustomText: FC<CustomTextProps> = (props) => {
  const { children, style, fontWeight } = props;
  const [activeFont = 'BalooTamma_Regular400', setActiveFont] = useState<
    string
  >();
  useEffect(() => {
    const findFont = font(fontWeight);
    setActiveFont(findFont);
  }, [fontWeight]);
  const [loadedFont] = useFonts(fontFamily);
  const styles = Object.assign({}, { fontFamily: activeFont }, style);
  return (
    <Fragment>{loadedFont && <Text style={styles}>{children}</Text>}</Fragment>
  );
};

export default CustomText;
