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

const Payment = ({navigation}) => {
  const OnPress = (event) => {
    console.log("handler working");
    event.preventDefault();
    if (item.title === event.target.value){
      console.log(event.target.value);}
  }
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={(
          <View style={styles.GridViewContainer}>
            <TouchableOpacity>
            <Text style={styles.GridViewTextLayout}> 1st Payment</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={1}
      />
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
