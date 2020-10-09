import React, { FC, useEffect } from 'react';
import 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { default as theme } from '../theme.json';
import { default as mapping } from '../mapping.json';
import { RootState, verifyAuthentication } from './redux';
import { Routes } from './utils';
import { SocialAuth, Home, AddBook, Search, BookDetail } from './screens';
import { ImageUpload, AudioUpload, PdfUpload } from './components';
import { styles } from './styles';
import { arrowBack } from './assets';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props {
  message?: string;
  isAuthenticated?: boolean;
  verifyAuthentication: typeof verifyAuthentication;
}

const { Navigator, Screen } = createStackNavigator();

const Main: FC<Props> = (props) => {
  const { isAuthenticated, verifyAuthentication } = props;

  useEffect(() => {
    verifyAuthentication();
  }, [verifyAuthentication]);

  return (
    <ApplicationProvider
      {...eva}
      theme={{ ...eva.light, ...theme }}
      customMapping={{ ...eva.mapping, ...mapping }}
    >
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
                  title: 'Cover Image',
                  headerTitleStyle: styles.headerTitle,
                  headerBackImage: () => <Image source={arrowBack} />,
                  headerStyle: styles.headerStyle,
                }}
              />
              <Screen
                name={Routes.AudioUpload}
                component={AudioUpload}
                options={{
                  title: 'Audio Version',
                  headerTitleStyle: styles.headerTitle,
                  headerBackImage: () => <Image source={arrowBack} />,
                  headerStyle: styles.headerStyle,
                }}
              />
              <Screen
                name={Routes.PdfUpload}
                component={PdfUpload}
                options={{
                  title: 'Pdf Version',
                  headerTitleStyle: styles.headerTitle,
                  headerBackImage: () => <Image source={arrowBack} />,
                  headerStyle: styles.headerStyle,
                }}
              />
              <Screen
                name={Routes.BookDetail}
                component={BookDetail}
                options={{
                  title: '',
                  headerTitleStyle: styles.headerTitle,
                  headerBackImage: () => <Image source={arrowBack} />,
                  headerStyle: styles.headerStyle,
                  headerRight: () => (
                    <TouchableOpacity style={styles.headerRightStyle}>
                      <Ionicons size={30} name='md-open' />
                    </TouchableOpacity>
                  ),
                }}
              />
              <Screen
                name={Routes.Search}
                component={Search}
                options={{
                  title: 'Search',
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

export default connect(mapStateToProps, { verifyAuthentication })(Main);
