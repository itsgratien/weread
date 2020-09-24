import React, { FC, useState } from 'react';
import { SafeAreaView, Image, View, TouchableOpacity } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { styles } from './styles';
import { logoBlack } from '../../../assets';
import { Ionicons } from '@expo/vector-icons';
interface Props {}

const Login: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoView}>
        <Image source={logoBlack} style={styles.logo} />
      </View>
      <View style={styles.sloganView}>
        <Text style={styles.sloganText}>
          a place to read and listen to audio books
        </Text>
      </View>
      <View style={{ marginTop: 95, width: 243 }}>
        <Button
          accessoryLeft={() => (
            <Ionicons size={25} name='logo-google' style={{ color: 'white' }} />
          )}
          style={{ borderRadius: 20 }}
        >
          {() => <Text style={styles.btnText}>Sign in with google</Text>}
        </Button>
      </View>
      <TouchableOpacity style={styles.githubFollow}>
        <Ionicons size={26.25} name='logo-github' />
        <Text style={styles.githubFollowText}>gratien</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>All right reserved {new Date().getFullYear()}</Text>
    </SafeAreaView>
  );
};
export default Login;
