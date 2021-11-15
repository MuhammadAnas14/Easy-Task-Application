import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Url from '../../Components/Url'
import Loader from '../../Components/Loader'


const VerificationScreen = ({navigation}) => {
  const [PhoneVerify,SetPhoneVerify] = useState(true)
  const [EmailVerify,SetEmailVerify] = useState(false)
  const [UserData, setUserData] = useState({});


  useEffect(() => { 

    AsyncStorage.getItem("user").then((value) => setUserData(JSON.parse(value)));
    return () => console.log('unmounting...')
    
  },[])
  
  useEffect(()=>{
    SetPhoneVerify(UserData.Phoneverify);
    console.log(PhoneVerify)
    SetEmailVerify(UserData.Emailverify);
  })

  console.log(UserData)

  // const Obj = UserData.email;

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

  const handlerEmailOtp = async () =>{
    console.log("Email Handler Working")
    const dataToSend = {Email: UserData.email, Id: UserData._id}
    await fetch(`${Url}/auth/EmailOTP`,{
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(response=> {
      console.log(response.success)
      if(response.success){
        navigation.replace("EmailOtpScreen")
      }
    })
    .catch(response => console.log(response))
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
