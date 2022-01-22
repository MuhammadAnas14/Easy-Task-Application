import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const TaskDetails = () => {

  return (
    <View style={styles.container}>
      <View style={[styles.listItem]}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: "bold", padding: 10 }}>Task Budget Estimate</Text>
          <Text style={{ fontWeight: "bold", padding: 10 }}>Rs. 3000</Text>
        </View>
        <View style={styles.verifyButton}>
          <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          // onPress={handlerEmailOtp}
          >
            <Text style={[styles.buttoncolor && styles.warning]}>
             OFFER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  listItem: {
    padding: 10,
    backgroundColor: "yellow",
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
    margin: 10,
  },
  verifyButton: {
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    padding: 10,
  },
  buttoncolor:{
    color: "white", 
    fontWeight: "bold",
    backgroundColor: "red",
    padding: 10,
  },
  warning:{
    backgroundColor: "green",
    color: "white", 
    marginTop: 80,
    padding: 10,
  }
});
export default TaskDetails;
