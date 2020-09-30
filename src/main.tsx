import React, { FC, useEffect } from 'react';
import 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '../theme.json';
import { welcome, RootState, verifyAuthentication } from './redux';
import { Routes } from './utils';
import { SocialAuth, Home, AddBook } from './screens';
import { ImageUpload } from './components';
import { styles } from './styles';
import { Image } from 'react-native';
import { arrowBack } from './assets';
interface Props {
  welcome: typeof welcome;
  message?: string;
  isAuthenticated?: boolean;
  verifyAuthentication: typeof verifyAuthentication;
}

const { Navigator, Screen } = createStackNavigator();

const Main: FC<Props> = (props) => {
  const { welcome, isAuthenticated, verifyAuthentication } = props;

  useEffect(() => {
    welcome();
    verifyAuthentication();
  }, [verifyAuthentication, welcome]);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <NavigationContainer>
        <Navigator initialRouteName={Routes.SocialAuth}>
          {isAuthenticated ? (
            <>
              <Screen
                name={Routes.Home}
                component={Home}
                options={{ headerShown: false }}
              />
              <Screen
                name={Routes.AddBook}
                component={AddBook}
                options={{
                  title: 'New book',
                  headerTitleStyle: styles.headerTitle,
                  headerBackImage: () => <Image source={arrowBack} />,
                  headerStyle: styles.headerStyle,
                }}
              />
              <Screen
                name={Routes.ImageUpload}
                component={ImageUpload}
                options={{
                  title: 'Cover Upload',
                  headerTitleStyle: styles.headerTitle,
                  headerBackImage: () => <Image source={arrowBack} />,
                  headerStyle: styles.headerStyle,
                }}
              />
            </>
          ) : (
            <>
              <Screen
                name={Routes.SocialAuth}
                component={SocialAuth}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const mapStateToProps = (state: RootState) => {
  const { message, isAuthenticated } = state.Auth;
  return { message, isAuthenticated };
};

export default connect(mapStateToProps, { welcome, verifyAuthentication })(
  Main
);
