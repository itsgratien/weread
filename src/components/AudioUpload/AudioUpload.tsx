import React, { FC, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { Audio, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
import { RootState, uploadAudioBook, deleteFile, setError } from '../../redux';
import { styles } from './styles';
import { UploadPath, PathReference } from '../../repos';
import { BottomUploadMenu } from '../BottomUploadMenu';
import { Loading } from '../Loading';
import { Colors } from '../../theme';
import { convertToTime } from '../../utils';

interface Props {
  uploadAudioBook: typeof uploadAudioBook;
  deleteFile: typeof deleteFile;
  setError: typeof setError;
  loading?: boolean;
  audioBook?: UploadPath;
}
const testAudio =
  'https://firebasestorage.googleapis.com/v0/b/weread-2f25e.appspot.com/o/audio%2F0.7063150203123246?alt=media&token=4c4c8bfe-6ecb-4d1a-a7ec-d20281b868c7';
const AudioUpload: FC<Props> = (props) => {
  const [isPlaying = false, setIsPlaying] = useState<boolean>();

  const [playBackInstance, setPlayBackInstance] = useState<any>();

  const [position = 0, setPosition] = useState<number>();

  const [duration = 0, setDuration] = useState<number>();

  const [currentTrack, setCurrentTrack] = useState<AVPlaybackStatus>();

  const { audioBook, loading, uploadAudioBook, deleteFile, setError } = props;

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

  const selectFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: 'audio/mpeg' });
    if (result.type === 'success') {
      await upload(result.uri);
    }
  };

  const upload = useCallback(
    async (audioUrl: string) => {
      try {
        if (audioUrl) {
          const fetchResponse = await fetch(audioUrl);
          const blob = await fetchResponse.blob();
          return uploadAudioBook(
            blob,
            `${PathReference.Audio}/${Math.random()}`
          );
        }
      } catch (error) {
        return setError('Something went wrong. Try again');
      }
    },
    [uploadAudioBook]
  );

  const setupAudio = async (uri: string) => {
    try {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: false,
      });
      const soundObject = new Audio.Sound();
      const track = await soundObject.loadAsync(
        { uri },
        { shouldPlay: true },
        false
      );
      if (track.isLoaded) {
        setIsPlaying(true);
        setPosition(track.positionMillis);
        setDuration(track.durationMillis);
        setCurrentTrack(track);
        setPlayBackInstance(soundObject);
      }
    } catch (error) {}
  };

  const trackStatus = async () => {
    if (playBackInstance) {
      const status = await playBackInstance.getStatusAsync();
      if (status.isLoaded) {
        console.log(status);
        setPosition(status.positionMillis);
      }
    }
  };

  useEffect(() => {
    setupAudio(testAudio);
  }, []);

  useEffect(() => {
    trackStatus();
  }, [playBackInstance, setupAudio]);

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
        onPress={selectFile}
      >
        {() => (
          <Text style={styles.selectBtnText}>
            Select audio from your device
          </Text>
        )}
      </Button>
      <View style={styles.audioView}>
        {!loading && (
          <>
            <TouchableOpacity
              style={styles.playAndPauseView}
              onPress={async () => {
                try {
                  if (playBackInstance) {
                    isPlaying
                      ? await playBackInstance.pauseAsync()
                      : await playBackInstance.playAsync();
                    setIsPlaying(!isPlaying);
                  }
                } catch (error) {}
              }}
            >
              <Ionicons
                size={40}
                color='white'
                name={isPlaying ? 'ios-pause' : 'ios-play'}
              />
            </TouchableOpacity>
            <Slider
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor={Colors.black}
              maximumTrackTintColor={Colors.primary}
              thumbTintColor={Colors.primary}
              style={{ width: '100%', marginTop: 27 }}
              onValueChange={async (val) => {
                try {
                  if (playBackInstance) {
                    await playBackInstance.setStatusAsync({
                      positionMillis: val,
                    });
                    setPosition(val);
                    return;
                  }
                } catch (error) {}
              }}
              value={position}
            />
            <View style={styles.timeView}>
              <Text style={styles.timeText}>{convertToTime(position)}</Text>
              <Text style={styles.timeText}>{convertToTime(duration)}</Text>
            </View>
          </>
        )}
        {/* {loading && <Loading />} */}
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

export default connect(mapStateToProps, {
  uploadAudioBook,
  deleteFile,
  setError,
})(AudioUpload);
