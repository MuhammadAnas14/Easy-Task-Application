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
import AccountSettings from "./Data/AccountSettings.json";

const PostTask = () => {
  const [services, setservices] = useState(AccountSettings);
  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <View style={styles.GridViewContainer}>
            <Text style={styles.GridViewTextLayout}> {item.key} </Text>
          </View>
        )}
        numColumns={1}
      />
      <TouchableOpacity style={{height:60,width:150, justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"white",backgroundColor:"red",padding:9}}>Delete My Account</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PostTask;

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
