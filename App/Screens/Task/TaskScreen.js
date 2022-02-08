import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Progress from "react-native-progress";
// import Data from '../Data/TaskDetails.json'
import Entypo from "react-native-vector-icons/Entypo";
import Url from "../../Components/Url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";


const TaskDetails = ({ route, navigation }) => {

  const Data = route.params.item;
  // console.log(Data.bids)
  const [BidOffer, setBidOffer] = useState();
  const [errorText, setErrorText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [UserData, setUserData] = useState("");
  const [AcceptButton, setAcceptButton] = useState(true);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  })

  
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      console.log("ss",latitude)
      setLocation({
        latitude: latitude,
        longitude: longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // getLocation();
  // console.log('hehehe',location)
  //   useEffect(() => {
  //     if(Data.taskMethod === 'live'){  
  //     getLocation();
  //     return;
  //     }
  //   }, []);
  //   console.log('extracted location is',location);
  

  const Offerhandler = () => {
    setModalVisible(true);
    if(Data.taskMethod === 'live'){
    getLocation();
  } 
  };

  const completeHandler = async() => {
    
    let dataToSend;
    dataToSend = {
      TaskId: Data._id,
    };

    await fetch(`${Url}/task/CompleteTask`, {
      method: "PUT",
      body: JSON.stringify(dataToSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        navigation.replace("ScreenManager");
      })
      .catch((error) => {
        console.log(error);
      });
    
    
  }

  const paymentTransferHandler = () => {
    if (Data.paymentMethod === "Card"){
      navigation.navigate("Card Payment",{Data})
    }
    else{
      navigation.navigate("Cod Payment",{Data})
    }
  }

  const feedBackHandler =  () => {
    navigation.navigate("Feedback",{UserData:Data})
  }
  const [StatusButton, setStatusButton] = useState(
    <TouchableOpacity
      style={{ justifyContent: "center", alignItems: "center" }}
      onPress={Offerhandler}
    >
      <Text style={styles.buttoncolor}>MAKE OFFER</Text>
    </TouchableOpacity>
  );

  AsyncStorage.getItem("user").then((value) => setUserData(JSON.parse(value)));

  const getOffers = async () => {
    let userID;

    userID = await AsyncStorage.getItem("user").then((value) => {
      const getUser = JSON.parse(value);

      return getUser._id;
    });

    console.log("from aync",userID)
    console.log("data",Data.userId)

    if (Data.userId === userID) {
      setAcceptButton(false);
    }
    if (Data.status === "0.25" || Data.status === "0.60") {
      setStatusButton(<Text style={styles.StatusButtonText}>ASSIGNED</Text>);
    }
    if (Data.userId === userID && (Data.status === "0.25" || Data.paymentStatus === "pending" || Data.paymentStatus === "paid" || Data.paymentStatus === "Completed")) {
      setAcceptButton(true);
    }
    if (Data.taskAssignTo === userID  && Data.status === "0.25"){
      setStatusButton(<TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={completeHandler}
      >
        <Text style={styles.buttoncolor}>Completed</Text>
      </TouchableOpacity>)
    }
    if (Data.userId === userID && Data.paymentStatus === "pending") {
      setStatusButton(<TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={paymentTransferHandler}
      >
        <Text style={styles.buttoncolor}>PAY The MONEY</Text>
      </TouchableOpacity>)
    }
    if (Data.taskAssignTo === userID  && Data.paymentStatus === "pending"){
      setStatusButton(<Text style={styles.StatusButtonText}>Payment Pending</Text>);
    }
    if (Data.taskAssignTo === userID  && Data.paymentStatus === "paid"){
      setStatusButton(<Text style={styles.StatusButtonText}>Completed</Text>)
    }
    if (Data.userId === userID  && Data.paymentStatus === "paid"){
      setStatusButton(<TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={feedBackHandler}
      >
        <Text style={styles.buttoncolor}>FeedBack</Text>
      </TouchableOpacity>)
    }
    if (Data.taskAssignTo === userID  && Data.paymentStatus === "Completed"){
      setStatusButton(<Text style={styles.StatusButtonText}>Completed</Text>);
    };
    if (Data.userId === userID  && Data.paymentStatus === "Completed"){
      setStatusButton(<Text style={styles.StatusButtonText}>Completed</Text>);
    }

  };

  useEffect(() => {
    getOffers();
  }, []);



  //Handler for offer
  const handleSubmitOffer = async () => {
    console.log('heheheh2',location);
    let datatoSend;
    datatoSend = {
      TaskId: Data._id,
      UserId: UserData._id,
      Username: UserData.firstName + " " + UserData.lastName,
      Bid: BidOffer,
      latitude: location.latitude,
      longitude:location.longitude
    };
    if (!BidOffer) {
      setErrorText("Please Enter Some Amount");
      return;
    }
    console.log(BidOffer);
    console.log("data sending", datatoSend);

    await fetch(`${Url}/task/Bids`, {
      method: "PUT",
      body: JSON.stringify(datatoSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.UserTask.totalbids);
        Data.totalbids = response.UserTask.totalbids;
        setModalVisible(false);
        navigation.replace("ScreenManager");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  const handleAcceptOffer = async (item) => {
    let BidToSend = {
      UserId: item.UserId,
      TaskId: item.TaskId,
      Bid: item.Bid,
    };
    console.log(BidToSend);

    await fetch(`${Url}/task/AcceptBid`, {
      method: "PUT",
      body: JSON.stringify(BidToSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        navigation.replace("ScreenManager");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" scrollEnabled>
        {/* TAsk Bar */}
        <View style={styles.BarContainer}>
          <Progress.Bar
            progress={parseFloat(Data.status)}
            width={350}
            height={30}
          />
          <Text style={styles.BarText}>OPEN ASSIGNED COMPLETED REVIEWED</Text>
        </View>

        {/* Heading */}
        <View>
          <Text style={styles.heading}>{Data.taskName}</Text>
        </View>
        {/* Profile of the Poster */}
        <View style={styles.ProfCont}>
          <Image
            source={{ uri: `data:image/jpg;base64,${Data.userPhoto}` }}
            style={{ width: 60, height: 60, borderRadius: 30, marginTop: 10 }}
          />
          <View style={{ flex: 1, padding: 15 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Posted By</Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>{Data.userName}</Text>
          </View>
        </View>
        <View style={styles.ProfCont}>
          <Entypo style={styles.icons} size={35} name="location-pin" />
          <View style={{ flex: 1, padding: 15 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Location</Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>
              {Data.taskLocation}
            </Text>
          </View>
        </View>
        <View style={styles.ProfCont}>
          <Entypo style={styles.icons} size={35} name="calendar" />
          <View style={{ flex: 1, padding: 15 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Due Date</Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>
              {Data.taskCompletionDate}
            </Text>
          </View>
        </View>
        {/* This is For the MAKE OFFER BOX */}
        <View style={[styles.listItem]}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", padding: 10 }}>
              Task Budget Estimate
            </Text>
            <Text style={{ fontWeight: "bold", textAlign: "right" }}>
              Total Bids : {Data.totalbids}
            </Text>
            <Text style={{ fontWeight: "bold", padding: 10 }}>
              {Data.taskBudget}
            </Text>
            {/* <TouchableOpacity
              style={{ justifyContent: "center", alignItems: "center" }}
              onPress={Offerhandler}
            >
              <Text style={styles.buttoncolor}>MAKE OFFER</Text>
            </TouchableOpacity> */}
            {StatusButton}
          </View>
        </View>
        {/* BIDS OFFER BOX */}
        <View style={{ marginLeft: 30, marginTop: -10 }}>
          <View style={styles.bottomrad}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 13,
                marginTop: 10,
              }}
            >
              Offers
            </Text>
          </View>
          <View style={styles.container}>
            <FlatList
              style={{ marginTop: 10, flex: 1 }}
              data={Data.bids}
              renderItem={({ item }) => (
                <View style={styles.listItem2}>
                  <View style={styles.Main}>
                    <View style={styles.mainDetails}>
                      <View style={{ marginBottom: 10 }}>
                        <Text style={styles.OfferName}>{item.Username}</Text>
                      </View>
                      <View style={{ marginLeft: -5 }}>
                        <Text style={styles.Rating}>⭐ {item.userRating} ({item.totalReviews} Review)</Text>
                      </View>
                    </View>
                    <View style={styles.OffersButton}>
                      <Pressable
                        disabled={AcceptButton}
                        onPress={() => handleAcceptOffer(item)}
                        style={[
                          styles.buttonView2,
                          {
                            backgroundColor: !AcceptButton ? "green" : "gray",
                          },
                        ]}
                      >
                        <Text style={styles.buttonTextAccept}>ACCEPT</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={styles.OfferedBid}>
                    <Text style={styles.OfferedBidText}>
                      Offer Rs. {item.Bid}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
        {/* Task Details */}
        <View style={{ marginLeft: 30 }}>
          <View style={styles.bottomrad}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 13,
                marginTop: 10,
              }}
            >
              Task Details
            </Text>
          </View>
          <Text style={{ fontSize: 14, margin: 10, marginBottom: 50 }}>
            {Data.taskDescription}
          </Text>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Your Offer</Text>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(budget) => setBidOffer(budget)}
                underlineColorAndroid="#f000"
                keyboardType="numeric"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  descriptionRef.current && descriptionRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleSubmitOffer}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  listItem: {
    padding: 10,
    backgroundColor: "lightgrey",
    width: "80%",
    borderRadius: 5,
    margin: 40,
  },
  listItem2: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "lightgrey",
    marginRight: 20,
    alignSelf: "center",
    flexDirection: "column",
    borderRadius: 10,
  },
  Main: {
    flexDirection: "row",
    width: "93%",
  },
  buttoncolor: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "green",
    padding: 10,
  },
  warning: {
    backgroundColor: "green",
    color: "white",
    marginTop: 80,
    padding: 10,
  },
  BarContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    padding: 10,
  },
  BarText: {
    width: "90%",
    fontSize: 15,
    alignSelf: "center",
    marginTop: -25,
    color: "black",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    margin: 10,
    borderRadius: 12,
    padding: 20,
    borderColor: "white",
    backgroundColor: "lightblue",
    borderWidth: 2,
  },
  location: {
    flexDirection: "row",
  },
  icons: {
    margin: 5,
    padding: 10,
  },
  ProfCont: {
    marginLeft: 30,
    flexDirection: "row",
    textDecorationLine: "underline",
    borderBottomColor: "black",
    borderBottomEndRadius: 35,
    borderBottomWidth: 2,
  },
  bottomrad: {
    borderBottomColor: "black",
    borderBottomEndRadius: 35,
    borderBottomWidth: 2,
    paddingBottom: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    flexDirection: "row",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    marginTop: 300,
    marginBottom: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    marginBottom: 6,
  },
  textStyle: {
    textDecorationLine: "underline",
    fontSize: 15,
    color: "#3dabbc",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#3CAABB",
  },
  button: {
    borderRadius: 15,
    padding: 15,
    backgroundColor: "#219653",
  },
  textStyle: {
    color: "white",
    fontSize: 20,
  },
  buttonView: {
    margin: 10,
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
  OffersButton: {
    justifyContent: "center",
    marginRight: 20,
    marginTop: 5,
  },
  buttonView2: {
    backgroundColor: "green",
    padding: 10,
  },
  buttonTextAccept: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
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
  StatusButtonText: {
    fontSize: 25,
    fontWeight: "bold",
  }
});
export default TaskDetails;
