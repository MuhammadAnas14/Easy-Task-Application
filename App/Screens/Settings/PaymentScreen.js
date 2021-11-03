import React, { useState } from "react";
import {
  Platform,
  FlatList,
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
// import CreditCardInput from 'react-credit-card-input';


const Payment = ({navigation}) => {
  const OnPress = (event) => {
    console.log("handler working");
    event.preventDefault();
  }
  return (
    <View>
      {/* <CreditCardInput
        autoFocus
        requiresName
        requiresCVC
        labelStyle={String}
        inputStyle={String}
        validColor={"black"}
        invalidColor={"red"}
        placeholderColor={"darkgray"}
        onChange={OnPress}
        /> */}
    <Text>Hello World</Text>
    </View>
  );
};
export default Payment;

const styles = StyleSheet.create({
  GridViewContainer: {
    flex: 1,
    height: 50,
    margin: 1,
    backgroundColor: "white",

  },
  GridViewTextLayout: {
    fontSize: 20,
    justifyContent: "center",
    color: "#000",
    padding: 10,
  },
});
