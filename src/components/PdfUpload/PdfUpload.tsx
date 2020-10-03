import React, { FC, useCallback, useMemo } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as DocumentPicker from 'expo-document-picker';
import { RootState, uploadPdf, deleteFile, setError } from '../../redux';
import { styles } from './styles';
import { UploadPath, PathReference } from '../../repos';
import { BottomUploadMenu } from '../BottomUploadMenu';
import { Loading } from '../Loading';

interface Props {
  uploadPdf: typeof uploadPdf;
  deleteFile: typeof deleteFile;
  setError: typeof setError;
  loading?: boolean;
  pdfBook?: UploadPath;
}

const PdfUpload: FC<Props> = (props) => {
  const { loading, uploadPdf, setError, pdfBook, deleteFile } = props;

  const { goBack } = useNavigation();

  const upload = useCallback(
    async (audioUrl: string) => {
      try {
        if (audioUrl) {
          const fetchResponse = await fetch(audioUrl);
          const blob = await fetchResponse.blob();
          return uploadPdf(blob, `${PathReference.Pdf}/${Math.random()}`);
        }
      } catch (error) {
        return setError('Something went wrong. Try again');
      }
    },
    [uploadPdf]
  );

  const selectFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });
    if (result.type === 'success') {
      await upload(result.uri);
    }
  };

  const reject = useCallback(() => {
    if (pdfBook) {
      deleteFile({
        type: PathReference.Audio,
        filePath: pdfBook.path,
      });
    }
  }, [pdfBook]);

  const pdf = useMemo(() => {
    if (!pdfBook) {
      return null;
    }
    return (
      <>
        <View style={styles.pdfView}>
          <WebView source={{ uri: pdfBook.url }} />
        </View>
        <BottomUploadMenu accept={() => goBack()} reject={() => reject()} />
      </>
    );
  }, [pdfBook]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView key='base' style={styles.container}>
      <Button
        accessoryRight={() => (
          <Ionicons
            name='ios-cloud-upload'
            size={30}
            color='black'
            style={styles.selectBtnIcon}
          />
        )}
        style={styles.selectBtn}
        onPress={selectFile}
        disabled={loading ? loading : false}
      >
        {() => (
          <Text style={styles.selectBtnText}>Select Pdf from your device</Text>
        )}
      </Button>
      {pdf}
    </SafeAreaView>
  );
};

const mapStateToProps = (state: RootState) => {
  const { loading, pdfBook } = state.Book;
  return { pdfBook, loading };
};
export default connect(mapStateToProps, { uploadPdf, setError, deleteFile })(PdfUpload);
