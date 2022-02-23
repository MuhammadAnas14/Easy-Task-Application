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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Url from "../../Components/Url";


const Payment = ({navigation}) => {
  
  const [paymentData , setPaymentData] = useState("");

  const pay = [{
    "_id": "62125ec7a15d588630a2eaa4",
    "paymentAmount": "500",
    "paymentMethod": "Cash On Delivery",
  }]

  
  const getPaymentData = async () => {
    let userID;
    
    userID = await AsyncStorage.getItem("user").then((value) => {
      const getUser = JSON.parse(value);

      return getUser._id;
    });

    const Id = { userId: userID };

    await fetch(`${Url}/payment/GetPayment`, {
      method: "POST",
      body: JSON.stringify(Id),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        setPaymentData(response.payment);
      })
      .catch((error) => {
        console.log(error);
      });
    }

  useEffect(() => {
    getPaymentData()
  },[])
  console.log(paymentData)

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
              Payments History
            </Text>
          </View>
      </View>
      <FlatList
              style={{ marginTop: 20, flex: 1 }}
              data={paymentData}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <View style={styles.listItem2}>
                  <View style={styles.Main}>
                    <View style={styles.mainDetails}>
                      <View style={{ marginBottom: 10 }}>
                        <Text style={styles.OfferName}><Text style={{fontWeight:"bold"}}>Payment To : </Text>{item.paymentToName}</Text>
                      </View>
                      <View>
                        <Text style={{fontSize:15,fontFamily: "sans-serif-light",}}>
                          <Text style={{fontWeight:"bold"}}>Payment Method : </Text>{item.paymentMethod}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.OfferedBid}>
                    <Text style={styles.OfferedBidText}>
                      Rs. {item.paymentAmount}
                    </Text>
                  </View>
                </View>
              )}
            />
      
      </View>
  )
};
export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  bottomrad: {
    borderBottomColor: "black",
    borderBottomEndRadius: 35,
    borderBottomWidth: 2,
    paddingBottom: 10,
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
    fontSize: 20,
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
