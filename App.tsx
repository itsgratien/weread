import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GettingStarted, Login, ViewAllBooks } from './src/components';
import { Routes } from './src/utils';
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
        <Stack.Screen
          component={ViewAllBooks}
          name={Routes.ViewAllBooks}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
