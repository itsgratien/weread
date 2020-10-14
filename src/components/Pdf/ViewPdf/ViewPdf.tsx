import React, { FC, useState } from 'react';
import PdfReader from 'rn-pdf-reader-js';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../utils';
import { Colors, Fonts } from '../../../theme';

interface Props {
  routeParams: RouteProp<RootStackParamList, 'ViewPdf'>;
}

const ViewPdf: FC<Props> = (props) => {
  const [fileError, setFileError] = useState<string>();

  const { routeParams } = props;

  const { params } = useRoute<typeof routeParams>();

  if (!params.uri) {
    return null;
  }
  
  return (
    <SafeAreaView key='base' style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ backgroundColor: 'white' }}>
        {fileError && (
          <Text
            style={{ fontFamily: Fonts.tomorrow.medium, color: Colors.primary }}
          >
            {fileError}
          </Text>
        )}
        {!fileError && (
          <PdfReader
            source={{ uri: params.uri }}
            style={{ backgroundColor: 'white' }}
            noLoader={true}
            onError={(error) => {
              if (error) setFileError('Failed to display file');
            }}
            onLoad={() => {
              setFileError(undefined);
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPdf;
