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
import { Layout } from '../../../components';
import { RootState } from '../../../redux';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../theme';

interface Props {}

const window = Dimensions.get('window');

const image =
  'https://images.unsplash.com/photo-1602185594992-bbd71355674f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80';
const BookDetail: FC<Props> = (props) => {
  const [imageHeight = window.height / 2.5, setImageHeight] = useState<
    number
  >();

  const imageSize = (uri: string) => {
    Image.getSize(
      uri,
      (width, height) => {
        setImageHeight(height);
      },
      (error) => {
        setImageHeight(window.height / 2.5);
      }
    );
  };
  return (
    <Layout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>The Sun and Flowers</Text>
        <View style={{ ...styles.bookCoverView, height: imageHeight }}>
          <Image
            source={{ uri: image }}
            style={{ width: window.width, height: '100%' }}
            resizeMode='cover'
          />
        </View>
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
            <Text style={styles.authorName}>
              Published on {new Date().toDateString()}
            </Text>
            <View style={styles.author}>
              <Image
                source={{ uri: image }}
                style={styles.profilePicture}
                resizeMode='cover'
              />
              <Text style={{ marginLeft: 10, ...styles.authorName }}>
                by Gratien
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  const {} = state.Book;
  return {};
};

export default connect(mapStateToProps, {})(BookDetail);
