import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


import Loader from '../Components/Loader';

const styles = StyleSheet.create({
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: '#7DE24E',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
    inputStyle: {
      flex: 1,
      color: 'white',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'center',
      fontSize: 14,
    },
    successTextStyle: {
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
      padding: 30,
    },
  });

const RegisterScreen = () => {

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPhoneNo, setUserPhoneNo] = useState('');
    const [userRePassword,setUserRePassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');

    const lastNameInputRef = createRef();
    const emailInputRef = createRef();
    const phoneInputRef = createRef();
    const passwordInputRef = createRef();
    
    const handleSubmitButton = () => {
        setErrorText('');
        if (!userFirstName) {
          alert('Please fill First Name');
          return;
        }
        if (!userLastName) {
            alert('Please fill First Name');
            return;
          }
        if (!userEmail) {
          alert('Please fill Email');
          return;
        }
        if (!userPhoneNo) {
          alert('Please fill phone no');
          return;
        }
        if (!userRePassword) {
          alert('Please fill Re password');
          return;
        }
        if (!userPassword) {
          alert('Please fill Password');
          return;
        }
        //Show Loader
        setLoading(true);
        
        var dataToSend = {
          firstName : userFirstName,
          lastName : userLastName,
          phoneNo: userPhoneNo,
          email: userEmail,
          password: userPassword,
        };

        console.log(dataToSend)

        if (dataToSend){
            setLoading(false)
            return (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../assets/success.png')}
                    style={{
                      height: 150,
                      resizeMode: 'contain',
                      alignSelf: 'center'
                    }}
                  />
                  <Text style={styles.successTextStyle}>
                    Registration Successful
                  </Text>
                </View>
              );
        }

    }

    return (
        <View style={{flex: 1, backgroundColor: '#307ecc'}}>
          <Loader loading={loading} />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/EasyAppLogo.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <KeyboardAvoidingView enabled>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(userFirstName) => setUserFirstName(userFirstName)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter First Name"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    lastNameInputRef.current && lastNameInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(userLastName) => setUserLastName(userLastName)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter Last Name"
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="sentences"
                  ref={lastNameInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    emailInputRef.current && emailInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter Email"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="email-address"
                  ref={emailInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    phoneInputRef.current &&
                    phoneInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPhoneNo) => setUserPhoneNo(UserPhoneNo)}
                  underlineColorAndroid="#f000"
                  placeholder="Enter Phone No"
                  placeholderTextColor="#8b9cb5"
                  keyboardType="phone-pad"
                  ref={phoneInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current &&
                    passwordInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPassword) =>
                    setUserPassword(UserPassword)
                  }
                  underlineColorAndroid="#f000"
                  placeholder="Enter Password"
                  placeholderTextColor="#8b9cb5"
                  ref={passwordInputRef}
                  returnKeyType="next"
                  secureTextEntry={true}
                  onSubmitEditing={() =>
                    ageInputRef.current &&
                    ageInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserRePassword) =>
                    setUserRePassword(UserRePassword)
                  }
                  underlineColorAndroid="#f000"
                  placeholder="Enter Re Password"
                  placeholderTextColor="#8b9cb5"
                  ref={passwordInputRef}
                  returnKeyType="next"
                  secureTextEntry={true}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </View>
              {errorText != '' ? (
                <Text style={styles.errorTextStyle}>
                  {errorText}
                </Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitButton}>
                <Text style={styles.buttonTextStyle}>REGISTER</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      );
}
export default RegisterScreen

