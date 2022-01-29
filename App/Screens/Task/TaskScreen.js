import React, { useState } from "react";
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
import * as Progress from 'react-native-progress';
// import Data from '../Data/TaskDetails.json'
import Entypo from 'react-native-vector-icons/Entypo';
import Url from '../../Components/Url'

const TaskDetails = ({route,navigation}) => {
  // console.log(route.params.item);
  const Data = route.params.item;
  const [BidOffer,setBidOffer] = useState();
  const [errorText, setErrorText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  let datatoSend;
  datatoSend={
    TaskId:Data._id,
    UserId:Data.userId,
    Username:Data.userName,
    Bid: BidOffer
  }
  //Handler for offer
  const handleSubmitOffer = async() =>{
    if(!BidOffer){
      setErrorText("Please Enter Some Amount");
      return;
    }
    console.log(BidOffer);
    console.log("data sending",datatoSend)
  
    await fetch(`${Url}/task/Bids`,{
      method:'PUT',
      body: JSON.stringify(datatoSend),
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
    })
    .then(res=>res.json())
    .then((response)=>{
        console.log(response.UserTask.totalbids)
        Data.offers = response.UserTask.totalbids
        setModalVisible(false);
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const Offerhandler = () =>{
    setModalVisible(true);
  }


  return (
    <View style={styles.container}>
                   <ScrollView
          keyboardShouldPersistTaps="handled">
      {/* TAsk Bar */}
      <View style={styles.BarContainer}>
      <Progress.Bar progress={parseFloat(Data.status)} width={350} height={30} />
      <Text style={styles.BarText}>OPEN     ASSIGNED     COMPLETED     REVIEWED</Text>
      </View>

      {/* Heading */}
      <View>
        <Text style={styles.heading}>{Data.taskName}</Text>
      </View>
      {/* Profile of the Poster */}
      <View style={styles.ProfCont}>
      <Image source={{uri:`data:image/jpg;base64,${Data.userPhoto}`}}  style={{width:60, height:60,borderRadius:30,marginTop:10}} />
      <View style={{flex:1,padding:15}}>
        <Text style={{fontWeight:"bold",fontSize:18}}>Posted By</Text>
        <Text style={{fontSize:15,marginTop:10}}>{Data.userName}</Text>
        </View>
        </View>
        <View style={styles.ProfCont}>
        <Entypo style={styles.icons} size={35} name="location-pin" />
      <View style={{flex:1,padding:15}}>
        <Text style={{fontWeight:"bold",fontSize:18}}>Location</Text>
        <Text style={{fontSize:15,marginTop:10}}>{Data.taskLocation}</Text>
        </View>
        </View>
        <View style={styles.ProfCont}>
        <Entypo style={styles.icons} size={35} name="calendar" />
      <View style={{flex:1,padding:15}}>
        <Text style={{fontWeight:"bold",fontSize:18}}>Due Date</Text>
        <Text style={{fontSize:15,marginTop:10}}>{Data.taskCompletionDate}</Text>
        </View>
        </View>
      {/* This is For the OFFER BOX */}
      <View style={[styles.listItem]}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: "bold", padding: 10 }}>Task Budget Estimate</Text>
          <Text style={{ fontWeight: "bold", textAlign: 'right' }}>Total Bids : {Data.offers}</Text>
          <Text style={{ fontWeight: "bold", padding: 10 }}>{Data.taskBudget}</Text>
        </View>
        <View style={styles.verifyButton}>
          <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={Offerhandler}
          >
            <Text style={styles.buttoncolor}>
             MAKE OFFER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Task Details */}
      <View style={{marginLeft:30}}>
        <View style={styles.bottomrad}>
        <Text style={{fontSize:20, fontWeight:"bold", marginLeft:13,marginTop:10}}>Task Details</Text>
        </View>
        <Text style={{fontSize:14,margin:10,marginBottom:50}}>{Data.taskDescription}</Text>
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
          <Text style={{color:"red"}}>{errorText}</Text>
            <Text style={styles.modalText}>Select Your Offer</Text>
            <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(budget) => setBidOffer(budget)}
          underlineColorAndroid="#f000"
          keyboardType="numeric"
          placeholder="Enter Your Budget"
          placeholderTextColor="#8b9cb5"
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
    alignSelf: "center",
    borderRadius: 5,
    margin: 40,
  },
  verifyButton: {
    flex:1,
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "row",
    padding: 10,
  },
  buttoncolor:{
    color: "white", 
    fontWeight: "bold",
    backgroundColor: "green",
    padding: 10,
  },
  warning:{
    backgroundColor: "green",
    color: "white", 
    marginTop: 80,
    padding: 10,
  },
  BarContainer:{
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    padding:10,
  },
  BarText:{
    width: "90%",
    fontSize: 15,
    alignSelf: "center",
    marginTop: -25,
    color: "black"
  },
  heading:{
  fontSize: 20,
  fontWeight: "bold",
  color:'black',
  textAlign: "center",
  margin: 10,
  borderRadius: 12,
  padding:20,
  borderColor: 'white',
  backgroundColor:'lightblue',
  borderWidth: 2
  },
  location:{
    flexDirection:'row'
  },
  icons:{
      margin:5,
      padding:10,
  },
  ProfCont:{
    marginLeft:30,
    flexDirection:'row',
    textDecorationLine:'underline',
    borderBottomColor: 'black',
    borderBottomEndRadius: 35,
    borderBottomWidth: 2,
  },
  bottomrad:{
    borderBottomColor: 'black',
    borderBottomEndRadius: 35,
    borderBottomWidth: 2,
    paddingBottom:10,
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
  button:{
    borderRadius:15,
    padding:15,
    backgroundColor:'#219653'
  },
  textStyle:{
    color:'white',
    fontSize:20,
  },
  buttonView:{
    margin:10,
  }
});
export default TaskDetails;
