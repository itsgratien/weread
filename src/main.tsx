import React, { FC, useEffect } from 'react';
import 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button } from '@ui-kitten/components';
import { default as theme } from '../theme.json';
import { welcome, RootState } from './redux';
import { Routes } from './utils';
import { Login } from './screens';

interface Props {
  welcome: typeof welcome;
  message?: string;
}
const { Navigator, Screen } = createStackNavigator();

const Main: FC<Props> = (props) => {
  const { message, welcome } = props;

  useEffect(() => {
    welcome();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <NavigationContainer>
        <Navigator initialRouteName={Routes.Login}>
          <Screen
            name={Routes.Login}
            component={Login}
            options={{ headerShown: false }}
          />
        </Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  const { message } = state.Auth;
  return { message };
};

export default connect(mapStateToProps, { welcome })(Main);
