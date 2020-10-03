import React, { FC, useCallback, useMemo } from 'react';
import { Text, Button } from '@ui-kitten/components';
import { Image, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { BottomUploadMenu } from '../BottomUploadMenu';
import { PathReference, UploadPath } from '../../repos';
import { setError, uploadCoverImage, RootState, deleteFile } from '../../redux';
import { Loading } from '../Loading';

interface Props {
  setError: typeof setError;
  uploadCoverImage: typeof uploadCoverImage;
  deleteFile: typeof deleteFile;
  loading?: boolean;
  coverImage?: UploadPath;
}

const ImageUpload: FC<Props> = (props) => {
  const { setError, coverImage, uploadCoverImage, loading, deleteFile } = props;

  const { goBack } = useNavigation();

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 6],
      quality: 1,
    });
    if (result.cancelled === false) {
      upload(result.uri);
    }
  };

  const upload = useCallback(
    async (imageUrl: string) => {
      try {
        if (imageUrl) {
          const fetchResponse = await fetch(imageUrl);
          const blob = await fetchResponse.blob();
          return uploadCoverImage(
            blob,
            `${PathReference.Images}/${Math.random()}`
          );
        }
      } catch (error) {
        return setError('Something went wrong. Try again');
      }
    },
    [uploadCoverImage]
  );

  const reject = useCallback(
    (path: string) => {
      deleteFile({
        filePath: path,
        type: PathReference.Images,
      });
    },
    [deleteFile]
  );

  const image = useMemo(() => {
    if (!coverImage) {
      return null;
    }
    return (
      <>
        <View style={styles.imageView}>
          <Image
            source={{
              uri: coverImage.url,
            }}
            style={styles.image}
          />
        </View>
        <BottomUploadMenu
          accept={() => goBack()}
          reject={() => reject(coverImage.path)}
        />
      </>
    );
  }, [coverImage]);

  return (
    <SafeAreaView key='base' style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
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
            disabled={loading}
          >
            {() => (
              <Text style={styles.selectBtnText}>
                Select Image from your device
              </Text>
            )}
          </Button>
          {image}
        </>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state: RootState) => {
  const { loading, coverImage } = state.Book;
  return { loading, coverImage };
};

export default connect(mapStateToProps, {
  setError,
  uploadCoverImage,
  deleteFile,
})(ImageUpload);
