import { NavigationContainer } from '@react-navigation/native';
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { SocialIcon } from 'react-native-elements'
// import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Components/Loader';
import * as Google from "expo-google-app-auth";
import * as AppAuth from 'expo-app-auth';


const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const GoogleSignIn = async () => {
    
    console.log("LoginScreen.js 6 | loggin in");

    try {
      const result = await Google.logInAsync({
        androidClientId: `970167067036-ub30vkj9m0m4mrud6et3lv8hd6ss6uac.apps.googleusercontent.com`,
        scopes: ['profile','email'],
        redirectUrl: "com.muhammadanas14.easyapp:/oauthredirect"
      });
      console.log(result.type)

      if (result.type === "success") {
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");
        navigation.replace('ScreenManager');
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(false);
    navigation.replace('ScreenManager');
    // let dataToSend = {email: userEmail, password: userPassword};
    // let formBody = [];
    // for (let key in dataToSend) {
    //   let encodedKey = encodeURIComponent(key);
    //   let encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    // fetch('http://localhost:3000/api/user/login', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type':
    //     'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status === 'success') {
    //       AsyncStorage.setItem('user_id', responseJson.data.email);
    //       console.log(responseJson.data.email);
    //       navigation.replace('DrawerNavigationRoutes');
    //     } else {
    //       setErrortext(responseJson.msg);
    //       console.log('Please check your email id or password');
    //     }
    //   })
    //   .catch((error) => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/logo.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('ForgetPasswordScreen')}>
              <Text style={styles.forgetTextStyle}>Forget Password ?</Text>
            </TouchableOpacity>
            <Text style={styles.option}>LOGIN WITH</Text>
            <View style={styles.cont}>
            <SocialIcon style={styles.icons} onPress={GoogleSignIn} type='google' />
            <SocialIcon style={styles.icons} onPress={() => {}} type='facebook' />
            </View>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              DON'T HAVE AN ACCOUNT ? CREATE AN ACCOUNT
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 0,
  },
  buttonStyle: {
    backgroundColor: '#3CAABB',
    borderWidth: 0,
    color: '#000000',
    borderColor: '#7AC4CF',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#3CAABB',
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    alignSelf: 'center',
    padding: 5,
    marginTop: 70, 
  },
  forgetTextStyle:{
    color:'black',
    textAlign:'center',
    fontWeight:"bold",
    fontSize: 15,
    padding: 5,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  
  icons:{
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 80,
  },
  option:{
    alignItems:'center',
    justifyContent: 'center',
    alignSelf: 'center',

  }, 
  cont:{
    flex:1,
    flexDirection:'row',
    alignSelf: 'center',
    alignContent: 'center',
  }
});