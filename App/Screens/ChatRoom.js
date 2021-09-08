import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatRoom = () => {
  return (
    <View style={styles.mainBody}>
      <Text>Hello, Peter 2</Text>
      <Text>USER AVAILABLE</Text>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "white",
      alignContent: "center",
      textAlign: "center",
    },
    headerText: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
      fontWeight: "bold",
    },
});
  