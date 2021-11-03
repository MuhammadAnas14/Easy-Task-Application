import React, {useState, createRef} from 'react';
import Loader from '../Components/Loader';
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
import Url from '../Components/Url';


const styles = StyleSheet.create({

    // Container: {
    //     height:550,
    //     borderColor:"black",
    //     shadowColor: "#000",
    //     paddingTop:30,
    //     shadowOffset: {
    //         width: 0,
    //         height: 5,
    //     },
    //     shadowOpacity: 0.48,
    //     shadowRadius: 8.0,
    //     elevation: 10,
        

    // },
    Container: {
        flex:3,
        height:500,
        marginLeft: 15,
        marginRight:15,
        justifyContent:"center",
        // borderRadius:30,
        // borderColor:"#95c3ca",
        // shadowOpacity:10,
        // shadowRadius: 8.0,
        // shadowColor: "#95c3ca",
        // borderWidth:5

    },
    SectionStyle: {
      flexDirection: 'row',
      height: 40,
      marginTop: 20,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: '#3dabbc',
      borderWidth: 0,
      color: '#FFFFFF',
      borderColor: '#7DE24E',
      height: 40,
      alignItems: 'center',
      borderRadius: 10,
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
      color: 'black',
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#3CAABB',
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

const RegisterScreen = ({navigation}) => {

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPhoneNo, setUserPhoneNo] = useState('');
    const [userRePassword,setUserRePassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isRegistraionSuccess,setIsRegistraionSuccess] = useState(false);

    const lastNameInputRef = createRef();
    const emailInputRef = createRef();
    const phoneInputRef = createRef();
    const passwordInputRef = createRef();
    const passwordReInputRef = createRef()
    const validate = (email) => {
      const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  
      return expression.test(String(email).toLowerCase())
  }
  
    const handleSubmitButton = async () => {
        setErrorText('');
        // setLoading(true);
        if (!userFirstName) {
          setErrorText('Please fill First Name');
          return;
        }
        if (!userLastName) {
          setErrorText('Please fill Last Name');
            return;
          }
        if (!userEmail || !validate(userEmail)) {
          setErrorText("Please fill with correct email")
          return;
        }
        if (!userPhoneNo || (userPhoneNo.length != 13) || (userPhoneNo.slice(0,3) != +92)) {
          setErrorText('Please fill phone no with correct format \n (i.e +921234567891)');
          return;
        }
        if (!userRePassword) {
          setErrorText('Please fill password');
          return;
        }
        if (!userPassword) {
          setErrorText('Please fill Password');
          return;
        }
        if (userPassword.length <= 5) {
          setErrorText('Password must be of 6 letters');
          return;
        }
        if(userPassword != userRePassword){
          setErrorText('Password not matched')
          return;
        }
        
        let dataSend = { FirstName:userFirstName, LastName:userLastName, Email:userEmail, Password:userPassword, Phone:userPhoneNo };
        console.log(JSON.stringify(dataSend))
  
       await fetch(`${Url}/auth/signUp`, {
          method: 'POST',
          body: JSON.stringify(dataSend),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then(res => res.json())
        .then((response) => {
            if (response.success) {
               
               setIsRegistraionSuccess(true)
               console.log("inside")
              setLoading(false);
            } else {
              console.log('Something in use');
              setLoading(false);

            }
          })
          .catch((error) => {
            
            console.error(error);
          });
        //Show Loader
        
        setIsRegistraionSuccess(true)

        setLoading(false);
        navigation.replace("OtpScreen") 

    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Loader loading={loading} />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              justifyContent: 'center',
              alignContent: 'center',
            }}>
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
            <KeyboardAvoidingView enabled>
            {errorText != '' ? (
                <Text style={styles.errorTextStyle}>
                  {errorText}
                </Text>
              ) : null}
            <View style= {styles.Container}>
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
                  label = "Last Name"
                  mode="outlined"
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
                    passwordReInputRef.current &&
                    passwordReInputRef.current.focus()
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
                  ref={passwordReInputRef}
                  returnKeyType="next"
                  secureTextEntry={true}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                />
              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitButton}>
                <Text style={styles.buttonTextStyle}>REGISTER</Text>
              </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>          
          </ScrollView>
        </View>
      );
}
export default RegisterScreen

