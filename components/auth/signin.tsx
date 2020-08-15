import React, { useState, useEffect, FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from '../layouts';
import { useNavigation } from '@react-navigation/native';

const GettingStarted: FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.appIntro}>
        <CustomText style={styles.appName} fontWeight='extraBold'>
          weread
        </CustomText>
        <CustomText style={styles.slogan} fontWeight='regular'>
          a place we share and read book
        </CustomText>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={1}
        >
          <CustomText fontWeight='regular' style={styles.loginText}>
            Login
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appIntro: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  appName: {
    fontSize: 40,
  },
  slogan: {
    fontSize: 15,
    textTransform: 'capitalize',
  },
  actions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtn: {
    textTransform: 'capitalize',
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

    elevation: 24,
  },
  loginText: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
export default GettingStarted;
