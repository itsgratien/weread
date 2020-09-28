import React, { FC } from 'react';
import { Spinner, Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import { styles } from './styles';

const Loading = () => {
  return (
    <SafeAreaView style={styles.container} key='base'>
      <Layout style={styles.loadingView}>
        <Spinner />
        <Text style={styles.loadingText}>Loading</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default Loading;
