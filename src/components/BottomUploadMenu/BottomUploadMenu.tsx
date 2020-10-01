import React, { FC } from 'react';
import { TouchableOpacity, SafeAreaView, View } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface Props {
  accept: () => void;
  reject: () => void;
  loading: boolean;
}

const BottomUploadMenu: FC<Props> = (props) => {
  const { accept, loading, reject } = props;

  return (
    <SafeAreaView style={styles.bottomView}>
      <View style={styles.bottomContainer}>
        {loading === false ? (
          <>
            <TouchableOpacity onPress={() => reject()}>
              <Ionicons
                name='ios-close-circle-outline'
                size={40}
                color='black'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => accept()}>
              <Ionicons
                name='ios-checkmark-circle-outline'
                size={40}
                color='black'
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity>
              <Ionicons
                name='ios-close-circle-outline'
                size={40}
                color='#f8f8f8'
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name='ios-checkmark-circle-outline'
                size={40}
                color='#f8f8f8'
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BottomUploadMenu;
