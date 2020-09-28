import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../../utils';
import { Home, AddBook, SocialAuth } from '../../screens';
import { Image } from 'react-native';
import { arrowBack } from '../../assets';
import { styles } from '../../styles';

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        name={Routes.Home}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export const AddBookNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={AddBook}
        name={Routes.AddBook}
        options={{
          title: 'New book',
          headerTitleStyle: styles.headerTitle,
          headerBackImage: () => <Image source={arrowBack} />,
          headerStyle: styles.headerStyle,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export const SocialAuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.SocialAuth}>
      <Stack.Screen
        component={SocialAuth}
        name={Routes.SocialAuth}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
