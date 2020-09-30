import React, { FC } from 'react';
import { TouchableOpacity, SafeAreaView, View } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface Props {
  upload: ()=> void;
  loading: boolean;
}

const BottomUploadMenu: FC<Props> = (props) => {

  const { upload, loading } = props;

  return (
    <SafeAreaView style={styles.bottomView}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <Ionicons name='ios-close-circle-outline' size={40} color='black' />
        </TouchableOpacity>
        {loading === false ? (
          <TouchableOpacity onPress={() => upload()}>
            <Ionicons
              name='ios-checkmark-circle-outline'
              size={40}
              color='black'
            />
          </TouchableOpacity>
        ) : (
          <Spinner />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BottomUploadMenu;
