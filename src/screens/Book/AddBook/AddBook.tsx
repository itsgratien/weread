import React, { FC, useState, useEffect } from 'react';
import { Input, Button, Text } from '@ui-kitten/components';
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
import { RootState } from '../../../redux';
import { UploadPath } from '../../../repos';

interface Props {
  coverImage?: UploadPath;
  audioBook?: UploadPath; 
  pdfBook?: UploadPath;
}

const AddBook: FC<Props> = (props) => {
  const [title = '', setTitle] = useState<string>();

  const [category, setCategory] = useState<string>();

  const { coverImage, pdfBook, audioBook } = props;

  const navigation = useNavigation();

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
                />
              </View>
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
                    <TouchableOpacity>
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
                    <TouchableOpacity>
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
              <Button style={styles.saveBtn}>
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
  const { coverImage, audioBook, pdfBook } = state.Book;
  return { coverImage, audioBook, pdfBook };
};
export default connect(mapStateToProps)(AddBook);
