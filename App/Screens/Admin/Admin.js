import React, { useEffect, useState } from "react";
import {
  Platform,
  FlatList,
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Url from "../../Components/Url";
import AsyncStorage from '@react-native-async-storage/async-storage';

const adminPanel = ({ navigation }) => {
  const [UsersData, setUsersData] = useState("");

  const getAllUser = async() => {


    await fetch(`${Url}/admin/getUser`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        let temp = response?.user?.filter((item)=> {return item.email != "Vahajab@gmail.com" })
        console.log("temp = ",temp)
        setUsersData(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout =  () => {

    AsyncStorage.clear();
    navigation.replace("SplashScreen");

  }

  const deletemyaccount = async(id) => {
    
    const userID = id 

    await fetch(`${Url}/auth/deleteAccount`, {
      method: "POST",
      body: JSON.stringify({userId: userID}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          AsyncStorage.clear();
          navigation.replace("Admin Panel");
          console.log("success")
        }
        else{
          console.log(response.error)
        }
      })
      .catch((err) => console.log(err));
  }


  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <View style={styles.container}>
    <View style={{marginTop: 20 ,alignItems:"center" }}>
        <View style={styles.bottomrad}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          >
            User List
          </Text>
        </View>
    </View>
      <FlatList
        style={{ marginTop: 20, flex: 1 }}
        data={UsersData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.listItem2}>
            <View style={styles.Main}>
              <View style={styles.mainDetails}>
                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.OfferName}>
                    <Text style={{ fontWeight: "bold" }}>User Name </Text>
                    {item.firstName + " " + item.lastName}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ fontSize: 15, fontFamily: "sans-serif-light" }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      User Email :{" "}
                    </Text>
                    {item.email}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{ fontSize: 15, fontFamily: "sans-serif-light" }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      User Phone NO :{" "}
                    </Text>
                    {item.phone}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => deletemyaccount(item._id)} style={styles.OfferedBid}>
              <Text style={styles.OfferedBidText}>
                  Delete User
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleLogout} style={styles.OfferedBid }>
              <Text style={styles.OfferedBidText}>
                  LOGOUT
              </Text>
      </TouchableOpacity>
      </View>
  );
};

export default adminPanel;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F7F7F7",
    },
    bottomrad: {
      borderBottomColor: "black",
      borderBottomEndRadius: 35,
    },
    listItem2: {
      marginTop: 10,
      padding: 10,
      backgroundColor: "lightgrey",
      marginRight: 20,
      marginLeft:20,
      alignSelf: "center",
      flexDirection: "column",
      borderRadius: 10,
    },
    Main: {
      flexDirection: "row",
      width: "93%",
    },
    mainDetails: {
      flex: 1,
      padding: 10,
    },
    OfferName: {
      fontSize: 15,
      fontFamily: "sans-serif-light",
    },
    OfferedBid: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      padding: 10,
      backgroundColor: "#C7E2E4",
      borderRadius: 40,
      marginBottom: 10,
    },
    OfferedBidText: {
      fontSize: 15,
      fontWeight: "bold",
    },
  
  });
