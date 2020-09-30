import React, { FC } from 'react';
import { TouchableOpacity, SafeAreaView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
interface Props {}

const BottomUploadMenu: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.bottomView}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <Ionicons name='ios-close-circle-outline' size={40} color='black' />
        </TouchableOpacity>
        <TouchableOpacity>
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
