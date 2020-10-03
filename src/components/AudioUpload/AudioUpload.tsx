import React, { FC, useCallback, useEffect, useState, useMemo } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';
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

const AudioUpload: FC<Props> = (props) => {
  const [isPlaying = false, setIsPlaying] = useState<boolean>();

  const [playBackInstance, setPlayBackInstance] = useState<
    Audio.Sound | undefined
  >();

  const [position = 0, setPosition] = useState<number>();

  const [duration = 0, setDuration] = useState<number>();

  const { audioBook, loading, uploadAudioBook, deleteFile, setError } = props;

  const { goBack } = useNavigation();

  const accept = () => {
    if (audioBook) {
      return goBack();
    }
  };

  const reject = useCallback(() => {
    if (audioBook) {
      deleteFile({
        type: PathReference.Audio,
        filePath: audioBook.path,
      });
    }
  }, [audioBook]);

  const selectFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: 'audio/mpeg' });
    if (result.type === 'success') {
      if (playBackInstance) {
        await playBackInstance.unloadAsync();
      }
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
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });
      const soundObject = new Audio.Sound();
      const track = await soundObject.loadAsync(
        { uri },
        { shouldPlay: true },
        false
      );
      if (track.isLoaded) {
        setIsPlaying(true);
        setDuration(track.durationMillis);
        setPlayBackInstance(soundObject);
      }
      return;
    } catch (error) {}
  };

  const trackStatus = async () => {
    try {
      if (playBackInstance) {
        const status = await playBackInstance.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (audioBook) {
      setupAudio(audioBook.url);
    }
  }, [audioBook]);

  useEffect(() => {
    trackStatus();
  }, [setupAudio]);

  const handleChange = useCallback(
    async (val: number) => {
      try {
        if (playBackInstance) {
          await playBackInstance.setPositionAsync(val);
          await trackStatus();
        }
      } catch (error) {}
    },
    [audioBook, trackStatus]
  );

  const playAndPause = useCallback(async () => {
    try {
      if (playBackInstance) {
        isPlaying
          ? await playBackInstance.pauseAsync()
          : await playBackInstance.playAsync();
        setIsPlaying(!isPlaying);
        return;
      }
    } catch (error) {}
  }, [setupAudio]);

  const audioPlayer = useMemo(() => {
    if (!audioBook) {
      return null;
    }
    return (
      <View style={styles.audioView}>
        <TouchableOpacity
          style={styles.playAndPauseView}
          onPress={() => playAndPause()}
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
          onSlidingComplete={handleChange}
          onValueChange={handleChange}
          value={position}
        />
        <View style={styles.timeView}>
          <Text style={styles.timeText}>{convertToTime(position)}</Text>
          <Text style={styles.timeText}>{convertToTime(duration)}</Text>
        </View>
      </View>
    );
  }, [audioBook, setupAudio]);

  const bottom = useMemo(() => {
    if (audioBook) {
      return <BottomUploadMenu accept={() => goBack()} reject={reject} />;
    }
    return null;
  }, [audioBook]);

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
            onPress={selectFile}
            disabled={loading ? loading : false}
          >
            {() => (
              <Text style={styles.selectBtnText}>
                Select audio from your device
              </Text>
            )}
          </Button>
          {audioBook && (
            <>
              {audioPlayer}
              {bottom}
            </>
          )}
        </>
      )}
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
