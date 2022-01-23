import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Progress from 'react-native-progress';
import Data from '../Data/TaskDetails.json'
import Entypo from 'react-native-vector-icons/Entypo';


const TaskDetails = () => {

  return (
    <View style={styles.container}>
                   <ScrollView
          keyboardShouldPersistTaps="handled">
      {/* TAsk Bar */}
      <View style={styles.BarContainer}>
      <Progress.Bar progress={0.43} width={350} height={30} />
      <Text style={styles.BarText}>OPEN     ASSIGNED     COMPLETED     REVIEWED</Text>
      </View>

      {/* Heading */}
      <View>
        <Text style={styles.heading}>{Data.title}</Text>
      </View>
      {/* Profile of the Poster */}
      <View style={styles.ProfCont}>
      <Image source={{uri:Data.photo}}  style={{width:60, height:60,borderRadius:30,marginTop:10}} />
      <View style={{flex:1,padding:15}}>
        <Text style={{fontWeight:"bold",fontSize:18}}>Posted By</Text>
        <Text style={{fontSize:15,marginTop:10}}>{Data.name}</Text>
        </View>
        </View>
        <View style={styles.ProfCont}>
        <Entypo style={styles.icons} size={35} name="location-pin" />
      <View style={{flex:1,padding:15}}>
        <Text style={{fontWeight:"bold",fontSize:18}}>Location</Text>
        <Text style={{fontSize:15,marginTop:10}}>{Data.location}</Text>
        </View>
        </View>
        <View style={styles.ProfCont}>
        <Entypo style={styles.icons} size={35} name="calendar" />
      <View style={{flex:1,padding:15}}>
        <Text style={{fontWeight:"bold",fontSize:18}}>Due Date</Text>
        <Text style={{fontSize:15,marginTop:10}}>{Data.duedate}</Text>
        </View>
        </View>
      {/* This is For the OFFER BOX */}
      <View style={[styles.listItem]}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: "bold", padding: 10 }}>Task Budget Estimate</Text>
          <Text style={{ fontWeight: "bold", textAlign: 'right' }}>Total Bids : {Data.offers}</Text>
          <Text style={{ fontWeight: "bold", padding: 10 }}>{Data.cost}</Text>
        </View>
        <View style={styles.verifyButton}>
          <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          // onPress={handlerEmailOtp}
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
        <Text style={{fontSize:14,margin:10,marginBottom:50}}>{Data.details}</Text>
      </View>
      </ScrollView>
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
  }
});
export default TaskDetails;
