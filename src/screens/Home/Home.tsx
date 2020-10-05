import React, { FC, useEffect } from 'react';
import { Text } from '@ui-kitten/components';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootState, listenToAllBook, listenToAllCategory } from '../../redux';
import { connect } from 'react-redux';
import { Routes } from '../../utils/Routes';
import { Loading, Layout, Header } from '../../components';
import { Category, Book } from '../../repos';
import { styles } from './styles';

interface Props {
  isAuthenticated?: boolean;
  loading?: boolean;
  listenToAllBook: typeof listenToAllBook;
  listenToAllCategory: typeof listenToAllCategory;
  categories?: Category[];
  books?: Book[];
}

const DATA = [
  {
    user: {
      profile: '',
      username: '',
    },
    image:
      'https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    user: {
      profile: '',
      username: '',
    },
    image:
      'https://images.unsplash.com/photo-1517148892120-4d2da39c8dc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    user: {
      profile: '',
      username: '',
    },
    image:
      'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    user: {
      profile: '',
      username: '',
    },
    image:
      'https://images.unsplash.com/photo-1440778303588-435521a205bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
  {
    user: {
      profile: '',
      username: '',
    },
    image:
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  },
];

const Home: FC<Props> = (props) => {
  const {
    isAuthenticated,
    loading,
    listenToAllBook,
    listenToAllCategory,
    categories,
    books,
  } = props;

  const { navigate } = useNavigation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Routes.SocialAuth);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    listenToAllBook();
    listenToAllCategory();
  }, [listenToAllBook, listenToAllCategory]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Header />
      <View style={styles.container}>
        {categories && categories.length > 0 && (
          <FlatList
            data={categories.slice(0, 5)}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryList}>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.category}
          />
        )}

        <FlatList
          data={DATA}
          keyExtractor={(item) => `${Math.random()}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.bookView}>
              <View>
                <Image source={{ uri: item.image }} style={styles.coverImage} />
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.books}
        />
      </View>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  const { isAuthenticated, loading } = state.Auth;
  const { categories, books } = state.Book;

  return { isAuthenticated, loading, categories, books };
};
export default connect(mapStateToProps, {
  listenToAllBook,
  listenToAllCategory,
})(Home);
