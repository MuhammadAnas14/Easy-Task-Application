import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StarRating from "react-native-star-rating";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Url from '../../Components/Url';
import DefaultImage from "../../../assets/default-pic.jpg";

const Profile = () => {
  const [StarRatings, setStarRatings] = useState(0);
  const [UserData, setUserData] = useState({});
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [ImgBase64, setImageBase64] = useState("");
  const [TotalReviews, setTotalReviews] = useState(0);
  const [imageUserData,setImageUserData] = useState("");

  const GetMyTask = async () => {

    let userID;
    userID = await AsyncStorage.getItem("user").then((value) => {
      const getUser= JSON.parse(value);
      // console.log("user = ",getUser)
      return getUser._id
    });
    let userImage;
    userImage=await AsyncStorage.getItem("user").then((value) => {
      const getUser= JSON.parse(value);
      return getUser.picture
    });
    console.log("userImage = ",userImage)

    if (userImage=== ""){
      setImageUserData(DefaultImage)
    }
    else{
    setImageUserData({uri:`data:image/jpg;base64,${userImage}`});
    }

    

    const Id = {UserId: userID}
    console.log("userID = ",userID)
    
    await fetch(`${Url}/feedback/GetRating`, {
      method: "POST",
      body: JSON.stringify(Id),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res) => 
      res.json()
    )
    .then((response) => {
      setStarRatings(response.UserRating)
      setTotalReviews(response.TotalReviews)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  useEffect(() => {
    AsyncStorage.getItem("user").then((value) =>
      setUserData(JSON.parse(value)),
    );
    GetMyTask();
  },[]);

  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({base64:true,    aspect:[4,3],
      quality:0.2});

    // Explore the Base64

    const imagecode = result.base64;

    if(imagecode.length !== 0){
      setImageBase64(imagecode);
    }
    else{
      alert("please try again")
    }


    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      // console.log(result.uri);
    }

    const ImgObj = {Id: UserData._id, Img: imagecode}
  
    //Sending Base 64 to backend
    await fetch(`${Url}/settings/Images`,{
      method:'PUT',
      body:JSON.stringify(ImgObj),
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
    })
    .then(res=> res.json())
    .then((response)=>{
      if(response.success)
      alert("Your Image is Upload");
      UserData.picture = imagecode;
      
      AsyncStorage.setItem('user',JSON.stringify(UserData))
      setImageUserData({uri:`data:image/jpg;base64,${imagecode}`});
    })
    .catch((error)=>{
      console.log(error);
      alert("Server Error")
    })
  };
  const base64Icon = `data:image/jpg;base64,${UserData.picture}`

  return (
    <View style={styles.container}>
      <ScrollView>
      <TouchableOpacity onPress={() => showImagePicker()}>
        <View style={styles.header}>
          
            <Image
              style={styles.avatar}
              source={imageUserData}
            />
        
        </View>
        </TouchableOpacity>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>
              {UserData.firstName} {UserData.lastName}
            </Text>
          </View>
        </View>
        <View style={styles.star}>
          <StarRating
            disabled={false}
            maxStars={5}
            fullStarColor={"#3CAABB"}
            rating={StarRatings}
          />
        </View>
        <Text style={styles.description}>({TotalReviews} Reviews )</Text>

        <View style={{ flex: 1 }}>
          <View style={styles.Heading}>
            <Text style={styles.headText}>About</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.aboutSection}>
              I am a software developer and had experience in developing web and
              mobile{" "}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Entypo
                style={styles.icons}
                size={20}
                color="#3CAABB"
                name="location-pin"
              />
              <Text style={{ fontSize: 16, marginTop: 3 }}>Karachi</Text>
            </View>
          </View>
          <View style={styles.Heading}>
            <Text style={styles.headText}>Contact Info</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.location}>
              <Entypo
                style={styles.icons}
                size={20}
                color="#3CAABB"
                name="mail"
              />
              <Text style={{ fontSize: 16, marginTop: 4 }}>
                {UserData.email}
              </Text>
            </View>
            <View style={styles.location}>
              <Entypo
                style={styles.icons}
                size={20}
                color="#3CAABB"
                name="phone"
              />
              <Text style={{ fontSize: 16, marginTop: 4 }}>
                {UserData.phone}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    marginTop: 0,
    textAlign: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 100,
  },
  star: {
    textAlign: "center",
    marginRight: 90,
    marginLeft: 90,
    marginTop: -15,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 35,
  },
  name: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
    fontFamily: "",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  Heading: {
    backgroundColor: "#FFF",
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    display: "flex",
  },
  headText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#696969",
  },
  listItem: {
    padding: 5,
    width: "100%",
    flex: 1,
    borderRadius: 5,
    flexDirection: "column",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
  location: {
    flexDirection: "row",
    padding: 10,
  },
  icons: {
    margin: 5,
    marginRight: 20,
  },
  aboutSection: {
    padding: 4,
    margin: 7,
    marginBottom: 10,
  },
});
