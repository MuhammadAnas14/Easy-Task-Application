import React, { useState, createRef, useRef, useEffect } from "react";
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
  Button,
  SegmentedControlIOSComponent,
} from "react-native";
import Loader from "../../../Components/Loader";
import Url from '../../../Components/Url'
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#3dabbc",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
  titleStyle: {
    marginTop: 20,
    marginBottom: 25,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#5c5c5c",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: "center",
    fontSize: 16,
  },
  btnResend: {
    alignItems: "center",
    height: 40,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
  },
  textResend: {
    textAlign: "center",
    fontSize: 16,
    color: "#3dabbc",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});

const EmailOtpScreen = ({ navigation }) => {
  const [internalVal, setInternalVal] = useState("");
  const lengthInput = 5;
  let clockCall = null;
  let textInput = useRef(null);
  const defaultCountdown = 5;
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);
  const [UserData, setUserData] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeText = async (val) => {
    setInternalVal(val);
  };
  AsyncStorage.getItem("user").then((value) => setUserData(JSON.parse(value)));

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });
  //Verify Button
  const RedirectButton = async () => {

    setErrorText("");

    const OtpValue = { userId: UserData._id, otp: internalVal };
    console.log(OtpValue)

    if (internalVal.length < 5) {
      return;
    }
    await fetch(`${Url}/auth/verifyOtp`, {
      method: "POST",
      body: JSON.stringify(OtpValue),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {

          UserData.Emailverify = true
          console.log(UserData)
          AsyncStorage.setItem('user',JSON.stringify(UserData))       
          navigation.replace("ScreenManager");
        }
        else{
          console.log(response.error)
          setErrorText(response.error)
        }
      })
      .catch((err) => console.log(err));
  };

  
  //
  useEffect(() => {
    let timer = setTimeout(() => {
      textInput.current.focus();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);



  const decrementClock = () => {
    if (countdown == 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  

  const ResendOTPhandler = async () => {
    
    if (enableResend) {
      setCountdown(defaultCountdown);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock(0);
      }, 1000);
    }


    //otp replacing
    let DataToSend = {userId: UserData._id, phoneNo: UserData.phone}

    await fetch(`${Url}/auth/otpReplace`, {
      method: "POST",
      body: JSON.stringify(DataToSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.success){
          setErrorText("Otp is Re-send Successfully")
        }
      })
      .catch((res) => console.log(res));
  };

  const inputs = Array(lengthInput).fill("");

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView
            keyboardVerticalOffset={50}
            behavior={"padding"}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../../assets/logo.png")}
                style={{
                  width: "50%",
                  height: 100,
                  resizeMode: "contain",
                  margin: 30,
                }}
              />
            </View>
            <Text style={styles.titleStyle}>{"Enter Your Email OTP Here"}</Text>
            {errorText != "" ? (
            <Text style={styles.errorTextStyle}>{errorText}</Text>
          ) : null}
            <View>
              <View style={styles.containerInput}>
                {inputs.map((data, index) => (
                  <View
                    style={[
                      styles.cellView,
                      {
                        borderBottomColor:
                          index == internalVal.length ? "#3dabbc" : "#c4e6eb",
                      },
                    ]}
                    key={index}
                  >
                    <TextInput
                      key={index.toString()}
                      ref={textInput}
                      onChangeText={onChangeText}
                      style={{ width: 0, height: 0 }}
                      value={internalVal}
                      maxLength={lengthInput}
                      returnKeyType="done"
                      keyboardType="numeric"
                    />
                    <Text
                      style={styles.cellText}
                      onPress={() => textInput.current.focus()}
                      placeholder="0"
                    >
                      {internalVal && internalVal.length > 0
                        ? internalVal[index]
                        : ""}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={RedirectButton}
            >
              <Text style={styles.buttonTextStyle}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnResend,
                {
                  color: enableResend ? "#3dabbc" : "#c4e6eb",
                },
              ]}
              onPress={ResendOTPhandler}
            >
              <Text style={styles.textResend}>Resend OTP</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmailOtpScreen