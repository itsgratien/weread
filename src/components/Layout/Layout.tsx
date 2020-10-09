import React, { FC } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { Routes } from '../../utils';

export const Layout: FC = (props) => {
  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={styles.container} key='base'>
      {props.children}
      <View style={styles.bottomView}>
        <View style={styles.bottomMenuContainer}>
          <TouchableOpacity onPress={() => navigate(Routes.Home)}>
            <Ionicons name='md-home' size={40} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate(Routes.AddBook)}>
            <Ionicons size={40} name='ios-add-circle-outline' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate(Routes.Search)}>
            <Ionicons name='ios-search' size={40} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Layout;
