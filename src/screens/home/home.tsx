import React, { FC } from 'react';
import { Text, Button } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { styles } from './styles';

const Home: FC = () => {
  return (
    <SafeAreaView key='base' style={styles.container}>
      <Text>Welcome home</Text>
      <Button>Logout</Button>
    </SafeAreaView>
  );
};

export default Home;
