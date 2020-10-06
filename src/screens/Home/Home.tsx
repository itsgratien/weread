import React, { FC, useEffect } from 'react';
import { Text } from '@ui-kitten/components';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { RootState, listenToAllBook, listenToAllCategory } from '../../redux';
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

  if (loading && loading === true) {
    return <Loading />;
  }

  return (
    <Layout>
      <Header />
      <ScrollView style={styles.container}>
        {categories && categories.length > 0 && (
          <View style={styles.category}>
            {categories.map((item, index) => (
              <TouchableOpacity style={styles.categoryList} key={index}>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {books && books.length > 0 && (
          <View style={styles.books}>
            {books.map((item, index) => (
              <TouchableOpacity style={styles.book} key={index}>
                <View style={styles.bookContainer}>
                  <View style={styles.bookImageView}>
                    <Image
                      source={{
                        uri: item.cover,
                      }}
                      style={styles.bookImage}
                    />
                  </View>
                  <View style={styles.authorView}>
                    <Image
                      source={{
                        uri:
                          'https://lh3.googleusercontent.com/a-/AOh14GhRhFDnwC9iQVpcePYJD5KOexy2gXMAEorkX6CYcw',
                      }}
                      style={styles.authorAvatar}
                    />
                    <Text style={styles.authorName}>gratien</Text>
                  </View>
                </View>
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                  <Text style={styles.bookTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  const { isAuthenticated } = state.Auth;
  const { categories, books, loading } = state.Book;

  return { isAuthenticated, loading, categories, books };
};
export default connect(mapStateToProps, {
  listenToAllBook,
  listenToAllCategory,
})(Home);
