import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Data from "../Data/MyTaskData.json";
import Url from "../../Components/Url";


const LiveTasks = ({route,navigation}) => {
  const [TaskData, setTaskData] = useState(Data);
  
  const Data1 = route.params.item;
  // console.log("Route Data",Data1);

  const [BidsData, setBidsData] = useState(Data1.bids);



const handleRejection = async(item) => {
    console.log("Selected item to delete",item);
    let NewBids = BidsData.filter(value => value !== item)
    setBidsData(NewBids);    

    const DeleteItem = item
    // let userID;
    // userID = await AsyncStorage.getItem("user").then((value) => {
    //   const getUser= JSON.parse(value);
    //   console.log("user = ",getUser)
    //   return getUser._id
    // });
  
    // const Id = {UserId: userID}
  
    // console.log(Id)
  
  await fetch(`${Url}/task/DeleteBid`, {
    method: "POST",
    body: JSON.stringify(DeleteItem),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  .then((res) => 
    res.json()
  )
  .then((response) => {
    console.log(response.success)
  })
  .catch((error) => {
    console.log(error)
  })

useEffect(()=> {
  DeleteBid()
},[]);

}

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={BidsData}
        renderItem={({ item }) =>(
          <View style={styles.listItem}>
          <View style={styles.mainDetails}>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.OfferName}>{item.Username}</Text>
            </View>
            <View>
              <Text style={styles.Offer}>RS. {item.Bid} </Text>
            </View>
          </View>
    
          <View style={styles.bugget}>
            <TouchableOpacity style={styles.buttonView}>
              <Text
                style={styles.buttonTextAccept}
              >
                ACCEPT
              </Text>
            </TouchableOpacity>
    
            <TouchableOpacity style={styles.buttonView} onPress={()=>handleRejection(item)}>
              <Text style={styles.buttonTextReject}>REJECT</Text>
            </TouchableOpacity>
          </View>
        </View>
        ) }
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  listItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F7F7F8",
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  bugget: {
    flexDirection: "column",
  },
  mainDetails: {
    flex: 1,
    padding: 10,
  },
  OfferName: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "sans-serif-light",
  },
  buttonView: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextReject: { 
    color: "white", 
    backgroundColor: "red", 
    padding: 8,
    textAlign: "center", 
  },
  buttonTextAccept: { 
    color: "white", 
    backgroundColor: "green",
    padding: 5
  },
  Offer: {
    fontSize: 16,

  }
});

export default LiveTasks;
