import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Pressable,
} from "react-native";
import Url from "../../Components/Url";

const CodPayment = () => {

    const [Money,setMoney] =useState("")
    

    return(
      <View style={styles.mainBody}>
          <View style={styles.TotalPayment}>
        <Text style={styles.TotalPaymentText}>Your Task Has Been Completed</Text>
        <Text style={styles.TotalPaymentText}>Please Pay Rs.400</Text>
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(money) => setMoney(money)}
            underlineColorAndroid="#f000"
            keyboardType="numeric"
            placeholder="Enter Your Amount"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.bottomView}>
        <Button
          style={{ paddingHorizontal: 50 }}
          title={"Confirm Your Order"}
        //   onPress={OrderConfirmed}
          color="#3CAABB"
        />
      </View>
      </View>
    )
};

export default CodPayment;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "white",
  },
  TotalPayment:{
    margin:20,
    padding:10,
  },
  TotalPaymentText:{
    textAlign:"center",
    fontSize:30,
    fontFamily:"sans-serif",
    fontWeight:"bold"
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 55,
    marginRight: 55,
    marginBottom: 20,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#3CAABB",
  },
  bottomView: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
