import React, { useState, createRef, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from "expo-google-app-auth";
import * as AppAuth from 'expo-app-auth';
import * as Facebook from 'expo-facebook';
import envs from "../../../Config/env";
import Url from '../../Components/Url';
import Loader from '../../Components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome5';


const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [hidePass, setHidePass] = useState(true);

  const passwordInputRef = createRef();

  const GoogleSignIn = async () => {

    try {
      const result = await Google.logInAsync({
        clientId: `${envs.GOOGLE_ID}`,
        androidClientId: `${envs.GOOGLE_ID}`,
        androidStandaloneAppClientId: `${envs.GOOGLE_ID}`,
        scopes: ['profile', 'email'],
        redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`
      });

      if (result.type == "success"){
        
        let SendGoogleData = result.user

        await fetch(`${Url}/auth/GoogleLogin`, {
        method: 'POST',
        body: JSON.stringify(SendGoogleData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        })
      .then(res => res.json())
      .then((response) => {
          if (response.success) {
            AsyncStorage.setItem('token', response.token);
            AsyncStorage.setItem('user',JSON.stringify(response.user))
            navigation.replace('ScreenManager');
          } else {
            setErrortext(response.error);
            console.log('Please check your email id or password');
            setLoading(false);
          }
      })
      .catch((error) => {
        
        console.error(error);
      });
    }
  }

    catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
      return { error: error };
    }
  };


  const initFbLogin = async () => {
    try {
      await Facebook.initializeAsync({ appId: "166792142307456" });
    } catch (e) {
      console.log(e);
    }
  };

  const fbLogin = async () => {

    initFbLogin();

    try {
      const { token, type } = await Facebook.logInWithReadPermissionsAsync(
        {
          appId: "166792142307456",
          permissions: ['public_profile', 'email'],
        }
      );
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,email,first_name,last_name`
      );
      const user = await response.json();

      const pictureResponse = await fetch(
        `https://graph.facebook.com/v8.0/${user.id}/picture?width=500&redirect=false&access_token=${token}`
      );
      const pictureOBject = await pictureResponse.json();
      const userObject = {
        ...user,
        photoUrl: pictureOBject.data.url,
      };
      
      const SendFacebookData = userObject

      if (type == "success"){
        

        await fetch(`${Url}/auth/FacebookLogin`, {
        method: 'POST',
        body: JSON.stringify(SendFacebookData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        })
      .then(res => res.json())
      .then((response) => {
          if (response.success) {
            AsyncStorage.setItem('token', response.token);
            AsyncStorage.setItem('user',JSON.stringify(response.user))
            navigation.replace('ScreenManager');
          } else {
            setErrortext(response.error);
            console.log('Please check your email id or password');
            setLoading(false);
          }
      })
      .catch((error) => {
        
        console.error(error);
      });
    }
      
    } catch (e) {
      return { error: e };
    }
  };


  const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
  }

  const handleForgetScreen = async () => {

    setErrortext('');

    if (!userEmail || !validate(userEmail)) {
      // alert('Please fill Email');
      setErrortext("Please fill with correct email for continue to forget screen")
      return;
    }

    navigation.navigate('ForgetPasswordScreen',{email:userEmail})
  }


  

  const handleSubmitPress = async () => {
    setErrortext('');

    setLoading(true)

    if (!userEmail || !validate(userEmail)) {
      // alert('Please fill Email');
      setErrortext("Please fill with correct email")
      return;
    }
    if (!userPassword) {
      setErrortext("Please fill with correct password")
      return;
    };
    
    let dataToSend = {Email: userEmail, Password: userPassword};
    console.log(JSON.stringify(dataToSend))
  
    await fetch(`${Url}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then((response) => {
        if (response.success) {
          AsyncStorage.setItem('token', response.token);
          AsyncStorage.setItem('user',JSON.stringify(response.user))
          // console.log("Responseeeee",response);
          navigation.replace('ScreenManager');
        } else {
          setErrortext(response.error);
          setLoading(false);
        }
      })
      .catch((error) => {
        
        console.error(error);
        setLoading(false);
      });
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
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../assets/logo.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
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
                secureTextEntry={hidePass ? true : false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
                 <Icon
              style={styles.iconStyle}
              name={hidePass ? 'eye-slash' : 'eye'}
              size={15}
              color="black"
              onPress={() => setHidePass(!hidePass)}
            />
            </View>           
            
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleForgetScreen}>
              <Text style={styles.forgetTextStyle}>Forget Password ?</Text>
            </TouchableOpacity>
            <Text style={styles.option}>LOGIN WITH</Text>
            <View style={styles.cont}>
              <SocialIcon style={styles.icons} onPress={GoogleSignIn} type='google' />
              <SocialIcon style={styles.icons} onPress={fbLogin} type='facebook' />
            </View>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}
              // onPress={() => navigation.navigate('OtpScreen')}
              >
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
  iconStyle:{
    color: '#3CAABB',
    position: 'absolute',
    marginLeft: 300,
    marginTop: 10
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
  forgetTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 15,
    padding: 5,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },

  icons: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 80,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

  },
  cont: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
  }
});