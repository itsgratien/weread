import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes, fontFamily, fonts } from '../../utils';
import { Formik } from 'formik';
import { loginSchema } from '../../repos';
import { useFonts } from 'expo-font';

const Login: FC = () => {
  const navigation = useNavigation();
  const [fontLoading] = useFonts(fonts);

  if (!fontLoading) {
    return null;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={Styles.loginScreen}>
        <Text style={Styles.loginText}>Signin</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={() => {
            alert('yes man');
          }}
        >
          {({ handleChange, values, handleSubmit, errors }) => {
            const { email, password } = values;
            return (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={Styles.loginInput}>
                  <View style={Styles.inputGroup}>
                    <TextInput
                      placeholder='email'
                      onChangeText={handleChange('email')}
                      value={email}
                      style={Styles.inputText}
                    />
                    {errors && errors.email && (
                      <Text style={Styles.inputError}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={Styles.inputGroup}>
                    <TextInput
                      placeholder='password'
                      onChangeText={handleChange('password')}
                      value={password}
                      style={Styles.inputText}
                    />
                    {errors && errors.email && (
                      <Text style={Styles.inputError}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={Styles.inputButton}>
                    <TouchableOpacity onPress={() => handleSubmit()}>
                      <Text style={Styles.buttonText}>Signin</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        </Formik>

        <TouchableOpacity onPress={() => navigation.navigate(Routes.Home)}>
          <Text style={Styles.goBackText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const Styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: 'white',
  },
  loginText: {
    fontSize: 30,
    marginLeft: 10,
    textTransform: 'capitalize',
    marginBottom: 30,
    fontFamily: fontFamily.balloTammaBold,
  },
  loginInput: {
    marginTop: 20,
  },
  inputGroup: {
    marginTop: 10,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderColor: 'white',
  },
  inputText: {
    height: 65,
    backgroundColor: '#f8f8f8',
    paddingLeft: 15,
    borderRadius: 20,
    fontFamily: fontFamily.balloTammaRegular,
  },
  inputButton: {
    marginTop: 20,
    borderRadius: 20,
    height: 65,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: fontFamily.balloTammaExtraBold,
  },
  goBackText: {
    marginTop: 30,
    fontFamily: fontFamily.balloTammaExtraBold,
  },
  inputError: {
    color: '#ea4c89',
    marginLeft: 10,
    marginTop: 2,
    fontFamily: fontFamily.balloTammaRegular,
  },
});
