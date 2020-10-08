import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Input, Text, Spinner } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { Layout } from '../../components';
import { RootState } from '../../redux';
import { styles } from './styles';
import { Fonts } from '../../theme';
interface Props {}

const image =
  'https://images.unsplash.com/photo-1593642531955-b62e17bdaa9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
const Search: FC<Props> = (props) => {
  return (
    <Layout>
      <View style={{ padding: 23 }}>
        <Input
          placeholder='Search'
          accessoryRight={() => (
            <Ionicons name='ios-search' size={30} color='black' />
          )}
          style={styles.searchInput}
          textStyle={styles.searchInputTextStyle}
        />
        <View style={styles.searchingView}>
          <Spinner size='small' status='basic' />
          <View style={styles.searchingTextView}>
            <Text style={{ fontFamily: Fonts.tomorrow.bold, fontSize: 13 }}>
              Searching for
            </Text>
            <Text style={styles.searchingText}>The sun and flower</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ padding: 23, paddingTop: 0 }}>
        <TouchableOpacity style={styles.bookItem}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.bookCover}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.bookTitle}>The sun and flowers</Text>
            <View>
              <View style={styles.authorView}>
                <Image source={{ uri: image }} style={styles.authorImage} />
                <Text
                  style={{
                    fontFamily: Fonts.tomorrow.regular,
                    fontSize: 12,
                    marginLeft: 8,
                  }}
                >
                  gratien
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  const { loading } = state.Book;
  return { loading };
};

export default connect(mapStateToProps, {})(Search);
