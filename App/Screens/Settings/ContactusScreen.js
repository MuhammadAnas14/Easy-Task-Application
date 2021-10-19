import StarRating from "react-native-star-rating";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

const ContactUs = () => {
  const [StarRatings, setStarRatings] = useState(2);
  const [textInputValue, setTextInputValue] = useState("");

  const changeRating = (rating) => {
    setStarRatings(rating);
  };

  return (
    <View style={styles.mainBody}>
      <View style={styles.ImageView}>
      <Image
        source={require('../../../assets/logo.png')}
        style={{width: '35%', resizeMode: 'contain'}}
      />
      </View>
      <Text style={styles.titleStyle2}>WE'D LOVE TO HELP YOU IN EMAIL OR VIA CALL!</Text>
      <Text style={styles.titleStyle}>Contact Us At: +92310254638</Text>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(UserEmail) => setUserEmail(UserEmail)}
          placeholder="Enter Full Name" //dummy@abc.com
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(UserEmail) => setUserEmail(UserEmail)}
          placeholder="Enter Email" //dummy@abc.com
          placeholderTextColor="#8b9cb5"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current && passwordInputRef.current.focus()
          }
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Your Message"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
        <Text style={styles.buttonTextStyle}>SUBMIT</Text>
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
  ImageView:{
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    marginBottom:10,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#3CAABB',
  },
  titleStyle: {
    marginBottom: 10,
    fontSize: 15,
    textAlign: "center",
    color: "grey",
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

export default ContactUs;
