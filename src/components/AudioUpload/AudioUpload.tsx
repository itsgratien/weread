import React, { FC, useCallback } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootState, uploadAudioBook, deleteFile } from '../../redux';
import { styles } from './styles';
import { UploadPath, PathReference } from '../../repos';
import { BottomUploadMenu } from '../BottomUploadMenu';

interface Props {
  uploadAudioBook: typeof uploadAudioBook;
  deleteFile: typeof deleteFile;
  loading?: boolean;
  audioBook?: UploadPath;
}

const AudioUpload: FC<Props> = (props) => {
  const { audioBook, loading, uploadAudioBook, deleteFile } = props;

  const { goBack } = useNavigation();

  const accept = useCallback(() => {
    if (loading === false && audioBook) {
      return goBack();
    }
  }, [loading, audioBook, goBack]);

  const reject = useCallback(() => {
    if (loading === false && audioBook) {
      return deleteFile({
        type: PathReference.Audio,
        filePath: audioBook.path,
      });
    }
  }, [audioBook, loading, deleteFile]);
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
      >
        {() => (
          <Text style={styles.selectBtnText}>
            Select audio from your device
          </Text>
        )}
      </Button>
      <View style={styles.audioView}>
        <TouchableOpacity style={styles.playAndPauseView}>
          <Ionicons size={40} color='white' name='ios-play' />
        </TouchableOpacity>
      </View>
      <BottomUploadMenu
        loading={loading ? loading : false}
        accept={accept}
        reject={reject}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: RootState) => {
  const { audioBook, loading } = state.Book;
  return { audioBook, loading };
};

export default connect(mapStateToProps, { uploadAudioBook, deleteFile })(
  AudioUpload
);
