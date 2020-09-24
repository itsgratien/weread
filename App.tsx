import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Main from './src/main';
import { useFonts } from 'expo-font';
import { tomorrowFonts } from './src/assets';

const App: FC = () => {
  const [fontsLoaded] = useFonts({
    'Tomorrow-Regular': tomorrowFonts.regular,
    'Tomorrow-Bold': tomorrowFonts.bold,
    'Tomorrow-Medium': tomorrowFonts.medium,
    'Tomorrow-SemiBold': tomorrowFonts.semiBold,
    'Tomorrow-ExtraBold': tomorrowFonts.extraBold,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
