import React, { useState, FC, useCallback, useEffect } from 'react';
import { Text, Button } from '@ui-kitten/components';
import { Image, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  useNavigation,
  useRoute,
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { BottomUploadMenu } from '../BottomUploadMenu';
import { PathReference, uploadFile } from '../../repos';
import { Routes, RootStackParamList } from '../../utils';
import { setError } from '../../redux';

interface Props {
  setError: typeof setError;
}

const ImageUpload: FC<Props> = (props) => {
  const [imageUrl, setImageUrl] = useState<string>();

  const [loading = false, setLoading] = useState<boolean>();

  const {
    setError,
  } = props;

  const { navigate } = useNavigation();

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

  const upload = useCallback(async () => {
    try {
      if (imageUrl) {
        setLoading(true);
        const fetchResponse = await fetch(imageUrl);
        const blob = await fetchResponse.blob();
        return uploadFile(
          blob,
          `${PathReference.Images}/${Math.random()}`
        ).subscribe((response) => {
          setLoading(false);
          return navigate(Routes.AddBook);
        });
      }
    } catch (error) {
      setLoading(false);
      return setError('Something went wrong. Try again');
    }
  }, [imageUrl, uploadFile, navigate]);

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
        {imageUrl && (
          <Image
            source={{
              uri: imageUrl,
            }}
            style={styles.image}
          />
        )}
      </View>
      <BottomUploadMenu upload={upload} loading={loading} />
    </SafeAreaView>
  );
};

export default connect(null, { setError })(ImageUpload);
