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

import Loader from '../Components/Loader';
import Url from '../Components/Url';

const ForgetPasswordScreen = ({ route,navigation}) => {
    const [userNewPassword, setUserNewPassword] = useState('');
    const [userReNewPassword, setUserReNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrorText] = useState('');
  
    const passwordInputRef = createRef();
  
    const handleSubmitPress = async () => {
      setErrorText('');
      setLoading(true);
      if (userNewPassword.length <= 5) {
        setErrorText('Password must be of 6 letters');
        return;
      }
      if(userNewPassword != userReNewPassword){
        setErrorText('Password not matched')
        return;
      }

      let dataToSend = {Email: route.params.email,NewPassword:userNewPassword}

      await fetch(`${Url}/auth/forgetPassword`,{
        method:'PUT',
        body:JSON.stringify(dataToSend),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then((response)=>{

        if (response.success){
          navigation.replace('LoginScreen')
        }
        else{
          setErrorText(response.error);
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false)
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
              <Text style= {styles.titleStyle}>{"FORGET PASSWORD"}</Text>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserNewPassword) =>
                    setUserNewPassword(UserNewPassword)
                  }
                  placeholder="New Password" //12345
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
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) =>
                    setUserReNewPassword(UserPassword)
                  }
                  placeholder="Re Password" //12345
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
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>SUBMIT</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    );
  };
  export default ForgetPasswordScreen;
  
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
      fontWeight: 'normal',
      fontSize: 10,
      alignSelf: 'center',
      padding: 5,
      marginTop: 70, 
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
    },
    titleStyle: {
        marginTop:20,
        marginBottom :25,
        fontSize:20,
        textAlign:"center",
        fontWeight: 'bold',
        color:"#5c5c5c"
    },
  });