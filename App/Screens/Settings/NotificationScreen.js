import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { color } from "react-native-elements/dist/helpers";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function Item({ item }) {
  return (
    <View style={styles.listItem}>
        <Entypo style={styles.icons}  name="pin" />
      <View style={{flex: 1 }}>
        <Text style={{ padding: 10 }}>{item.notification}</Text>
      </View>
    </View>
  );
}

const NotificationScreen = () => {
  const Data = [
    {
      id: "1",
      notification: "You previous task was completed",
      icons: "email",
      obj: "Email",
    },
    {
      id: "2",
      notification: "Are you looking for a Carpenter? Check this",
      icons: "phone",
      obj: "Phone Number",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.ImageView}>
        <Image
          source={require("../../../assets/logo.png")}
          style={{ width: "35%", resizeMode: "contain" }}
        />
      </View>
      <View style={styles.SloganParent}>
      <Text style={styles.slogan}>Everything within your area</Text>
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={Data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  slogan: {
    color: "black",
    flex:1,
    justifyContent: "center",
    textAlign: "center",
    marginTop: -40,
  },
  SloganParent:{
    justifyContent: "center",
    textAlign: "center",
  },
  icons:{
    margin:7,
    marginTop:14, 
},
  listItem: {
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    borderRadius: 5,
    margin: 10,
    flexDirection: 'row',
  },
  ImageView: {
    marginTop: -40,
    flexDirection: "row",
    justifyContent: "center",
  }
});
export default NotificationScreen;
