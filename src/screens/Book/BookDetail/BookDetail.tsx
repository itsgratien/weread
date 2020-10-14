import React, { FC, useEffect, useCallback, useState } from 'react';
import { Text } from '@ui-kitten/components';
import {
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Layout, Loading } from '../../../components';
import { RootState, listenToSpecificBook } from '../../../redux';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../theme';
import { RootStackParamList } from '../../../utils';
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
  const { routeProps, listenToSpecificBook, currentBook, loading } = props;

  const imageHeight = window.height / 2.5;

  const { params } = useRoute<typeof routeProps>();

  useEffect(() => {
    if (params && params.id) {
      listenToSpecificBook(params.id);
    }
  }, [listenToSpecificBook]);

  if (loading) {
    return <Loading />;
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
            <TouchableOpacity>
              <Ionicons size={40} name='ios-download' />
            </TouchableOpacity>
            <View style={styles.sliderView}>
              <TouchableOpacity>
                <Ionicons
                  size={50}
                  name='ios-play-circle'
                  color={Colors.primary}
                />
              </TouchableOpacity>
              <Slider
                minimumValue={0}
                style={styles.slider}
                thumbTintColor={Colors.primary}
                minimumTrackTintColor={Colors.black}
              />

              <View style={styles.timeView}>
                <Text style={{ marginTop: 5, ...styles.timeText }}>00:00</Text>
                <Text
                  style={{
                    marginBottom: 'auto',
                    bottom: -5,
                    ...styles.timeText,
                  }}
                >
                  06:00
                </Text>
              </View>
            </View>
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
