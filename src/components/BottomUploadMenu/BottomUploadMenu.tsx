import React, { FC } from 'react';
import { TouchableOpacity, SafeAreaView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

interface Props {
  accept: () => void;
  reject: () => void;
}

const BottomUploadMenu: FC<Props> = (props) => {
  const { accept, reject } = props;

  return (
    <SafeAreaView style={styles.bottomView}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => reject()}>
          <Ionicons name='ios-close-circle-outline' size={40} color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => accept()}>
          <Ionicons
            name='ios-checkmark-circle-outline'
            size={40}
            color='black'
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BottomUploadMenu;
