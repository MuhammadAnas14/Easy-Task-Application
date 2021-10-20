import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const AboutUs = () => {

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
      <View style={{marginLeft:30,marginRight:30}}>
        <Text style={styles.pargraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra nibh quis posuere dictum. Cras finibus nulla non odio suscipit, et varius felis ullamcorper. Donec id urna posuere, fermentum justo hendrerit, volutpat orci.
    {"\n"}{"\n"}
Ut nec tellus risus. Praesent facilisis ultrices quam, vel ornare risus aliquet id. Nunc sagittis mi id mauris pharetra hendrerit. Phasellus at neque vitae velit posuere aliquam. Ut sagittis lobortis nisl a mattis. Mauris consequat sit amet erat eu maximus. Duis non est finibus, laoreet diam et, tempus risus. Sed sit amet eros non ex volutpat rhoncus. Duis auctor quis est ut mattis.</Text>
      </View>
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
  paragraph:{
    margin:50,
  },
  listItem: {
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    borderRadius: 5,
    margin: 10,
  },
  icons: {
    margin: 5,
  },
  ImageView: {
    marginTop: -40,
    flexDirection: "row",
    justifyContent: "center",
  },
  verifButton: {
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    padding: 10,
  },
});
export default AboutUs;
