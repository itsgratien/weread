import React, { FC, useState } from 'react';
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
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../theme';
import { Routes } from '../../../utils';

interface Props {
  imageUrl?: string;
}

const AddBook: FC<Props> = () => {
  const [title = '', setTitle] = useState<string>();

  const [category, setCategory] = useState<string>();

  const [audio, setAudio] = useState<string>();

  const [pdf, setPdf] = useState<string>();

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
                        name='ios-add-circle-outline'
                        color={Colors.rgbBlack}
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
                        name='ios-add-circle-outline'
                        color={Colors.rgbBlack}
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
                        name='ios-add-circle-outline'
                        color={Colors.rgbBlack}
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

export default AddBook;
