import React, { FC, useState, useEffect } from 'react';
import {
  Input,
  Button,
  Text,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';
import { Layout } from '../../../components';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../theme';
import { Routes } from '../../../utils';
import {
  RootState,
  addBook,
  listenToAllCategory,
  setError,
} from '../../../redux';
import { UploadPath, BookSchema, Category } from '../../../repos';
import { Loading } from '../../../components';

interface Props {
  coverImage?: UploadPath;
  audioBook?: UploadPath;
  pdfBook?: UploadPath;
  addBook: typeof addBook;
  listenToAllCategory: typeof listenToAllCategory;
  categories?: Category[];
  setError: typeof setError;
  message?: string;
}

const AddBook: FC<Props> = (props) => {
  const [title = '', setTitle] = useState<string>();

  const [categoryId = '', setCategoryId] = useState<string>();

  const [categoryName, setCategoryName] = useState<string>();

  const [loading = false, setLoading] = useState<boolean>();

  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0)
  );

  const {
    coverImage,
    pdfBook,
    audioBook,
    addBook,
    listenToAllCategory,
    categories,
    setError,
  } = props;

  const navigation = useNavigation();

  useEffect(() => {
    listenToAllCategory();
  }, [listenToAllCategory]);

  const saveBook = async () => {
    setLoading(true);
    try {
      const validate = await BookSchema.validate({
        title,
        category: {
          id: categoryId,
          name: categoryName,
        },
        cover: coverImage?.url,
        audio: audioBook?.url,
        pdf: pdfBook?.url,
      });
      return addBook({ ...validate });
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  if (!categories) {
    return <Loading />;
  }

  return (
    <Layout>
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <View>
                <Text style={styles.label}>Title</Text>
                <Input
                  placeholder='title of book'
                  style={styles.input}
                  textStyle={styles.textInput}
                  value={title}
                  onChangeText={(val) => setTitle(val)}
                />
              </View>
              {categories && categories.length > 0 && (
                <View style={styles.inputView}>
                  <Text style={styles.label}>Category</Text>
                  <Select
                    placeholder='Category'
                    onSelect={(index) => {
                      const selectIndexPath = index as IndexPath;
                      const find = categories.find(
                        (item, i) => i === selectIndexPath.row
                      );
                      if (find) {
                        setCategoryId(find.id);
                        setCategoryName(find.name);
                        setSelectedIndex(selectIndexPath);
                      }
                    }}
                    selectedIndex={selectedIndex}
                    value={() => (
                      <Text style={styles.selectInputText}>
                        {categoryName ? categoryName : 'Select category'}
                      </Text>
                    )}
                    size='large'
                  >
                    {categories.map((item) => (
                      <SelectItem
                        title={() => (
                          <Text style={styles.selectInputText}>
                            {item.name}
                          </Text>
                        )}
                        key={item.id}
                      />
                    ))}
                  </Select>
                </View>
              )}
              <View style={styles.inputView}>
                <Input
                  placeholder='Cover'
                  style={styles.input}
                  textStyle={styles.textInput}
                  accessoryRight={() => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate(Routes.ImageUpload)}
                    >
                      <Ionicons
                        size={40}
                        name={
                          coverImage
                            ? 'ios-checkmark-circle-outline'
                            : 'ios-add-circle-outline'
                        }
                        color={coverImage ? Colors.primary : Colors.rgbBlack}
                      />
                    </TouchableOpacity>
                  )}
                  disabled={true}
                />
              </View>
              <View style={styles.inputView}>
                <Input
                  placeholder='Audio Book (MP3)'
                  style={styles.input}
                  textStyle={styles.textInput}
                  accessoryRight={() => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate(Routes.AudioUpload)}
                    >
                      <Ionicons
                        size={40}
                        name={
                          audioBook
                            ? 'ios-checkmark-circle-outline'
                            : 'ios-add-circle-outline'
                        }
                        color={audioBook ? Colors.primary : Colors.rgbBlack}
                      />
                    </TouchableOpacity>
                  )}
                  disabled={true}
                />
              </View>
              <View style={styles.inputView}>
                <Input
                  placeholder='PDF Version'
                  style={styles.input}
                  textStyle={styles.textInput}
                  accessoryRight={() => (
                    <TouchableOpacity
                      onPress={() => navigation.navigate(Routes.PdfUpload)}
                    >
                      <Ionicons
                        size={40}
                        name={
                          pdfBook
                            ? 'ios-checkmark-circle-outline'
                            : 'ios-add-circle-outline'
                        }
                        color={pdfBook ? Colors.primary : Colors.rgbBlack}
                      />
                    </TouchableOpacity>
                  )}
                  disabled={true}
                />
              </View>
              <Button
                style={styles.saveBtn}
                onPress={() => saveBook()}
                disabled={loading ? loading : false}
              >
                {() => <Text style={styles.btnText}>Save</Text>}
              </Button>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </Layout>
  );
};

const mapStateToProps = (state: RootState) => {
  const { coverImage, audioBook, pdfBook, categories } = state.Book;
  const { message } = state.Auth;
  return { coverImage, audioBook, pdfBook, categories, message };
};
export default connect(mapStateToProps, {
  addBook,
  listenToAllCategory,
  setError,
})(AddBook);
