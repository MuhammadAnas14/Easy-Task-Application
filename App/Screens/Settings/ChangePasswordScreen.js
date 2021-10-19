import StarRating from "react-native-star-rating";
import React, { useState,createRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";

const Password = () => {
  const [userOldPassword, setUserOldPassword] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userReNewPassword, setUserReNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrorText] = useState("");

  const newPasswordInputRef = createRef();
  const reNewPasswordInputRef = createRef();

  return (
    <View style={styles.mainBody}>
      <Text style={styles.titleStyle}>{"CHANGE PASSWORD"}</Text>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(oldPassword) => setUserOldPassword(oldPassword)}
          underlineColorAndroid="#f000"
          placeholder="Enter Old Password"
          placeholderTextColor="#8b9cb5"
          returnKeyType="next"
          secureTextEntry={true}
          onSubmitEditing={() =>
            newPasswordInputRef.current && newPasswordInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(newPassword) => setUserNewPassword(newPassword)}
          underlineColorAndroid="#f000"
          placeholder="Enter New Password"
          placeholderTextColor="#8b9cb5"
          returnKeyType="next"
          ref= {newPasswordInputRef}
          secureTextEntry={true}
          onSubmitEditing={() =>
            reNewPasswordInputRef.current && reNewPasswordInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
        </View>
        <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(reNewPassword) => setUserReNewPassword(reNewPassword)}
          underlineColorAndroid="#f000"
          placeholder="Re-Enter Password"
          placeholderTextColor="#8b9cb5"
          returnKeyType="next"
          ref= {newPasswordInputRef}
          secureTextEntry={true}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
        <Text style={styles.buttonTextStyle}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    marginTop: 0,
    textAlign: "center",
    justifyContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#3CAABB",
  },
  titleStyle: {
    marginBottom: 25,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#5c5c5c",
  },
  titleStyle2: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  textAreaContainer: {
    borderColor: "#3CAABB",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
  buttonStyle: {
    backgroundColor: "#3CAABB",
    borderWidth: 0,
    color: "#000000",
    borderColor: "#7AC4CF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Password;
