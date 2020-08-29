import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GettingStarted, Login } from './components';
import { Routes } from './utils';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          component={GettingStarted}
          name={Routes.Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Login}
          name={Routes.Login}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
