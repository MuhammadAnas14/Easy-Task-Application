// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Sample from "../Settings/AboutusScreen"


// const Stack = createNativeStackNavigator();


// const VerificationStack = ({navigation}) => (
//   <Stack.Navigator>
//     <Stack.Screen name="VerifyHome" component={Sample}/>
//   </Stack.Navigator>
// )




const VerificationScreen = ({navigation}) => {
  const [PhoneVerify,SetPhoneVerify] = useState(true)
  const [EmailVerify,SetEmailVerify] = useState(false)

  function Item({ item }) {
    return (
      <View style={[styles.listItem, item.verification && styles.disable]}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30 }}>
            <MaterialCommunityIcons name={item.icons} size={60} color="#3CAABB" />
          </View>
          <Text style={{ fontWeight: "bold", padding: 10 }}>{item.title}</Text>
        </View>
        <View style={styles.verifyButton}>
          <TouchableOpacity
          disabled={item.verification}
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={handlerEmailOtp}
          >
            <Text
              style={[styles.buttoncolor, item.verification && styles.warning]}
            >
             {item.object}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handlerEmailOtp =() =>{
    navigation.navigate("OTP Screen")
  }

 
  let Data = [
    {
      id: "1",
      key:"VerifyHome",
      title: "Please Verify your Email",
      icons: "email",
      object: "VERIFY EMAIL",
      verification: EmailVerify,
    },
    {
      id: "2",
      key:"VerifyHome",
      title: "Please Verify your Phone number",
      icons: "phone",
      object: "VERIFY PHONE NUMBER",
      verification: PhoneVerify,
    },
  ];
  if(PhoneVerify==true){
    Data[1].object = "VERIFIED"
  }
  if(EmailVerify==true){
    Data[0].object = "VERIFIED"
  }
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
  disable:{
  },
  warning:{
    backgroundColor: "green",
    color: "white", 
    padding: 10,
  }
});
export default VerificationScreen;
