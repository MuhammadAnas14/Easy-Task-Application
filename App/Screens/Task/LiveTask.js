import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import Url from "../../Components/Url";


const LiveTasks = ({route,navigation}) => {
  
  const Data1 = route.params.item;

  const [BidsData, setBidsData] = useState(Data1.bids);

  const handleRejection = async(item) => {

        let NewBids = BidsData.filter(value => value !== item)
    
        setBidsData(NewBids);    

        const DeleteItem = item
  
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

  const handleAcceptance = (item) =>{
    console.log('Acceptance done',item)
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
            <TouchableOpacity style={styles.buttonView} onPress={()=>handleAcceptance(item)}>
              <Text style={styles.buttonTextAccept}> ACCEPT
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
