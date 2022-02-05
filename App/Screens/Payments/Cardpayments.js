import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CreditCard from "react-native-credit-card";

const CardPayment = () => {
  return (
    <View style={styles.container}>
      <CreditCard
        type={this.state.type}
        imageFront={require("./images/card-front.png")}
        imageBack={require("./images/card-back.png")}
        shiny={false}
        bar={false}
        focused={this.state.focused}
        number={this.state.number}
        name={this.state.name}
        expiry={this.state.expiry}
        cvc={this.state.cvc}
      />
    </View>
  );
};

export default CardPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    marginTop: 10,
  },
});
