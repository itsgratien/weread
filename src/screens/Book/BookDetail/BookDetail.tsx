import React, { FC, useEffect, useState } from 'react';
import { Text } from '@ui-kitten/components';
import {
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Layout, Loading } from '../../../components';
import { RootState, listenToSpecificBook } from '../../../redux';
import { styles } from './styles';
import { Colors } from '../../../theme';
import { RootStackParamList, convertToTime } from '../../../utils';
import { Book } from '../../../repos';
import { avatar } from '../../../assets';

interface Props {
  routeProps: RouteProp<RootStackParamList, 'BookDetail'>;
  listenToSpecificBook: typeof listenToSpecificBook;
  loading?: boolean;
  currentBook?: Book;
}

const window = Dimensions.get('window');

const BookDetail: FC<Props> = (props) => {
  const [play = false, setPlay] = useState<boolean>();

  const [position, setPosition] = useState<number>();

  const [duration, setDuration] = useState<number>();

  const [audioInstance, setAudioInstance] = useState<Audio.Sound | undefined>();

  const { routeProps, listenToSpecificBook, currentBook, loading } = props;

  const imageHeight = window.height / 2.5;

  const { params } = useRoute<typeof routeProps>();

  useEffect(() => {
    if (params && params.id) {
      listenToSpecificBook(params.id);
    }
  }, [listenToSpecificBook]);

  useEffect(() => {
    if (currentBook && currentBook.audio) {
      setupAudio(currentBook.audio);
    }
  }, [currentBook]);

  useEffect(() => {
    if (audioInstance) {
      getAudioPosition();
    }
  });

  if (loading) {
    return <Loading />;
  }

  const setupAudio = async (uri: string) => {
    try {
      const soundObject = new Audio.Sound();

      const loadSound = await soundObject.loadAsync(
        { uri },
        { shouldPlay: false }
      );
      if (loadSound.isLoaded) {
        setAudioInstance(soundObject);
        const audioStatus = await soundObject.getStatusAsync();
        if (audioStatus.isLoaded) {
          setDuration(audioStatus.playableDurationMillis);
          setPosition(audioStatus.positionMillis);
        }
      }
    } catch (error) {}
  };

  const getAudioPosition = async () => {
    try {
      if (audioInstance) {
        const audioStatus = await audioInstance.getStatusAsync();
        if (audioStatus.isLoaded) {
          setPosition(audioStatus.positionMillis);
        }
      }
    } catch (error) {}
  };

  const handlePlayPause = async () => {
    try {
      if (audioInstance) {
        if (play === false) {
          await audioInstance.playAsync();
          return;
        } else {
          await audioInstance.pauseAsync();
          return;
        }
        setPlay(!play);
      }
    } catch (error) {}
  };

  const forwardBackwardAudio = async (val: number) => {
    try {
      if (audioInstance) {
        await audioInstance.setPositionAsync(val);
        setPosition(val);
      }
    } catch (error) {}
  };

  if (!audioInstance) {
    return null;
  }

  return (
    <Layout>
      {currentBook && (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{currentBook.title}</Text>
          {currentBook.cover && (
            <View style={{ ...styles.bookCoverView, height: imageHeight }}>
              <Image
                source={{ uri: currentBook.cover }}
                style={{ width: window.width, height: '100%' }}
                resizeMode='cover'
              />
            </View>
          )}
          <View style={styles.details}>
            {currentBook.audio && (
              <View style={styles.sliderView}>
                <TouchableOpacity
                  onPress={handlePlayPause}
                  style={styles.playPause}
                >
                  <Ionicons
                    size={30}
                    name={play ? 'ios-pause' : 'ios-play'}
                    color={Colors.white}
                  />
                </TouchableOpacity>
                <Slider
                  minimumValue={0}
                  style={styles.slider}
                  thumbTintColor={Colors.primary}
                  minimumTrackTintColor={Colors.black}
                  maximumValue={duration ? duration : 0}
                  onSlidingComplete={(val) => forwardBackwardAudio(val)}
                  value={position}
                />

                <View style={styles.timeView}>
                  <Text style={{ marginTop: 5, ...styles.timeText }}>
                    {position && position === 0
                      ? '00:00:00'
                      : convertToTime(position)}
                  </Text>
                  <Text
                    style={{
                      marginBottom: 'auto',
                      bottom: -5,
                      ...styles.timeText,
                    }}
                  >
                    {duration && convertToTime(duration)}
                  </Text>
                </View>
              </View>
            )}
            <View style={{ marginTop: 20 }}>
              {currentBook.createdAt && (
                <Text style={styles.authorName}>
                  Published on {new Date(currentBook.createdAt).toDateString()}
                </Text>
              )}
              {currentBook.user && (
                <View style={styles.author}>
                  {currentBook.user.profilePicture ? (
                    <Image
                      source={{ uri: currentBook.user.profilePicture }}
                      style={styles.profilePicture}
                      resizeMode='cover'
                    />
                  ) : (
                    <Image
                      source={avatar}
                      style={styles.profilePicture}
                      resizeMode='cover'
                    />
                  )}
                  <Text style={{ marginLeft: 10, ...styles.authorName }}>
                    by {currentBook.user.username}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  const { currentBook, loading } = state.Book;
  return { currentBook, loading };
};

export default connect(mapStateToProps, { listenToSpecificBook })(BookDetail);
