import React, { FC, useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './src/utils';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button } from '@ui-kitten/components';
import { default as theme } from './theme.json';
import { configureStore, RootState, welcome } from './src/redux';
import { connect } from 'react-redux';

interface Props {
  welcome: typeof welcome;
  message?: string;
}
const Stack = createStackNavigator();

const App: FC<Props> = (props) => {
  const { welcome, message } = props;

  useEffect(() => {
    welcome();
  });

  console.log(message);
  
  return (
    <Provider store={configureStore()}>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Button>Welcome</Button>
      </ApplicationProvider>
    </Provider>
  );
};

const mapStateToProps = (state: RootState) => {
  const { message } = state.Auth;
  return { message };
};

export default connect(mapStateToProps, { welcome })(App);
