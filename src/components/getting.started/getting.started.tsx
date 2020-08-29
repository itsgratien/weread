import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes, fonts, fontFamily } from '../../utils';
import { useFonts } from 'expo-font';
const GettingStarted: FC = () => {
  const navigation = useNavigation();
  const [loadingFont] = useFonts(fonts);
  if (!loadingFont) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.appIntro}>
        <Text style={styles.appName}>weread</Text>
        <Text style={styles.slogan}>a place we share and read book</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate(Routes.Login)}
          activeOpacity={1}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.getStarted} activeOpacity={1}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appIntro: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  appName: {
    fontSize: 40,
    fontFamily: fontFamily.balloTammaExtraBold,
  },
  slogan: {
    fontSize: 15,
    textTransform: 'capitalize',
    fontFamily: fontFamily.balloTammaBold,
  },
  getStarted: {
    textTransform: 'capitalize',
    backgroundColor: '#000',
    borderRadius: 20,
    width: 250,
    marginTop: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: fontFamily.balloTammaBold,
  },
  actions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    borderRadius: 20,
    width: 250,
    marginTop: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 20,
  },
  loginText: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: fontFamily.balloTammaBold,
  },
});
export default GettingStarted;
