import StarRating from "react-native-star-rating";
import React, { useState, createRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native";
import Loader from "../../Components/Loader";
import Url from "../../Components/Url";

const ContactUs = (navigation) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMassage, setUserMassage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrorText] = useState("");
  const emailInputRef = createRef();
  const massageInputRef = createRef();

  const validate = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
  };

  const handlerSubmitButton = async () => {
    setErrorText("");
    setLoading(true);

    if (!userName) {
      setErrorText("Please fill Name");
      return;
    }
    if (!userEmail || !validate(userEmail)) {
      setErrorText("Please fill with correct email");
      return;
    }
    if (!userMassage) {
      setErrorText("Please fill Massage");
      return;
    }

    let dataSend = { 
      UserId : "616e85c9b413249971dd3ddc",
      Name: userName, 
      Email: userEmail, 
      Massage: userMassage 
    };

    await fetch(`${Url}/settings/contactUsMassage`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          // navigation.navigate('Settings');
          setErrorText("Massage Sended");
        } else {
          setErrorText(response.error);
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
      <View style={styles.ImageView}>
        <Image
          source={require("../../../assets/logo.png")}
          style={{ width: "35%", resizeMode: "contain" }}
        />
      </View>
      <Text style={styles.titleStyle2}>
        WE'D LOVE TO HELP YOU {"\n"} IN EMAIL OR VIA CALL!
      </Text>
      <Text style={styles.titleStyle}>Contact Us At: +92310254638</Text>
      {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(Name) => setUserName(Name)}
          underlineColorAndroid="#f000"
          placeholder="Enter Full Name"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
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
          onChangeText={(Email) => setUserEmail(Email)}
          underlineColorAndroid="#f000"
          placeholder="Enter Email"
          placeholderTextColor="#8b9cb5"
          keyboardType="email-address"
          ref={emailInputRef}
          returnKeyType="next"
          onSubmitEditing={() =>
            massageInputRef.current && massageInputRef.current.focus()
          }
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          onChangeText={(Massage) => setUserMassage(Massage)}
          placeholder="Your Message"
          placeholderTextColor="grey"
          numberOfLines={6}
          multiline={true}
          onSubmitEditing={Keyboard.dismiss}
          ref={massageInputRef}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={handlerSubmitButton}
      >
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
  ImageView: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: -20,
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
    borderRadius: 10,
    borderColor: "#3CAABB",
  },
  titleStyle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  titleStyle2: {
    marginTop: -10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#5c5c5c",
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
    height: 120,
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
