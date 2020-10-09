import React, { FC, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Input, Text, Spinner } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '../../components';
import { RootState, search } from '../../redux';
import { styles } from './styles';
import { Fonts } from '../../theme';
import { Book } from '../../repos';
import { avatar } from '../../assets';
import { Routes } from '../../utils';

interface Props {
  search: typeof search;
  searchResult?: Book[];
  loading?: boolean;
}

const Search: FC<Props> = (props) => {
  const [query = '', setQuery] = useState<string>();

  const { loading, search, searchResult } = props;

  const { navigate } = useNavigation();

  const searchBook = useCallback(
    (value: string) => {
      setQuery(value);
      search(value);
    },
    [search]
  );

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
          value={query}
          onChangeText={(val) => searchBook(val)}
        />
        {loading && (
          <View style={styles.searchingView}>
            <Spinner size='small' status='basic' />
            <View style={styles.searchingTextView}>
              <Text style={{ fontFamily: Fonts.tomorrow.bold, fontSize: 13 }}>
                Searching for
              </Text>
              <Text style={styles.searchingText}>{query}</Text>
            </View>
          </View>
        )}
        {searchResult && searchResult.length <= 0 && (
          <View style={styles.searchingView}>
            <View style={{ ...styles.searchingTextView, marginLeft: 0 }}>
              <Text style={{ fontFamily: Fonts.tomorrow.bold, fontSize: 13 }}>
                No Result Found
              </Text>
            </View>
          </View>
        )}
      </View>
      {searchResult && searchResult.length > 0 && (
        <ScrollView style={{ padding: 23, paddingTop: 0 }}>
          {searchResult.map((item, index) => (
            <TouchableOpacity
              style={styles.bookItem}
              key={index}
              onPress={() => navigate(Routes.BookDetail, { id: item.id })}
            >
              {item.cover && (
                <Image
                  source={{
                    uri: item.cover,
                  }}
                  style={styles.bookCover}
                />
              )}
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                {item.user && (
                  <View>
                    <View style={styles.authorView}>
                      {item.user.profilePicture ? (
                        <Image
                          source={{ uri: item.user.profilePicture }}
                          style={styles.authorImage}
                        />
                      ) : (
                        <Image source={avatar} style={styles.authorImage} />
                      )}
                      <Text
                        style={{
                          fontFamily: Fonts.tomorrow.regular,
                          fontSize: 12,
                          marginLeft: 8,
                        }}
                      >
                        {item.user.username}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  const { loading, searchResult } = state.Book;
  return { loading, searchResult };
};

export default connect(mapStateToProps, { search })(Search);
