import React, { useState, FC } from 'react';
import { Text, Input, Button } from '@ui-kitten/components';
import { Image, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';
import { BottomUploadMenu } from '..';
interface Props {}

const ImageUpload: FC<Props> = () => {
  const [imageUrl, setImageUrl] = useState<string>();

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 6],
      quality: 1,
    });
    if (result.cancelled === false) {
      setImageUrl(result.uri);
    }
  };

  return (
    <SafeAreaView key='base' style={styles.container}>
      <Button
        accessoryRight={() => (
          <Ionicons
            name='ios-cloud-upload'
            size={30}
            color='black'
            style={styles.selectBtnIcon}
          />
        )}
        style={styles.selectBtn}
        onPress={selectImage}
      >
        {() => (
          <Text style={styles.selectBtnText}>
            Select Image from your device
          </Text>
        )}
      </Button>
      <View style={styles.imageView}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      </View>
      <BottomUploadMenu />
    </SafeAreaView>
  );
};

export default ImageUpload;
