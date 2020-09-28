import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeNavigator, AddBookNavigator } from '../StackNavigator';
import { Routes } from '../../utils';

const Bottom = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Bottom.Navigator initialRouteName={Routes.Home}>
      <Bottom.Screen name={Routes.Home} component={HomeNavigator} />
      <Bottom.Screen name={Routes.AddBook} component={AddBookNavigator} />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;