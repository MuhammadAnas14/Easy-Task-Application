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

const Profile = () => {
  const [StarRatings, setStarRatings] = useState(0);
  const [UserData, setUserData] = useState({});
  const [pickedImagePath, setPickedImagePath] = useState("");

  //   const changeRating = (rating) => {
  //   setStarRatings(rating);
  // }

  useEffect(() => {
    AsyncStorage.getItem("user").then((value) =>
      setUserData(JSON.parse(value))
    );
    return () => console.log("unmounting...");
  },[]);
  console.log(pickedImagePath)

  const showImagePicker = async () => {
    console.log("sss")
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  console.log(UserData);

  return (
    <View style={styles.container}>
      <ScrollView>
      <TouchableOpacity onPress={() => showImagePicker()}>
        <View style={styles.header}>
          
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
              }}
            />
          
        </View>
        </TouchableOpacity>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>
              {UserData.firstName} {UserData.lastName}
            </Text>
            <Text style={styles.info}>Away / Online</Text>
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
        <Text style={styles.description}>No Completion Rate </Text>

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
