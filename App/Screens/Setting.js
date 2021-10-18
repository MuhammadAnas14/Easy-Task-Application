import React, { useState } from "react";
import {
  Platform,
  FlatList,
  Alert,
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import AccountSettings from "./Data/AccountSettings.json";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [services, setservices] = useState(AccountSettings);
  const OnPress = (event) => {
    console.log("handler working");
    event.preventDefault();
    if (item.title === event.target.value) {
      console.log(event.target.value);
    }
  };

  const handleLogout =  () => {

    AsyncStorage.clear();
    navigation.navigate("SplashScreen")

  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <View style={styles.GridViewContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(item.key, { userName: item.key })
              }
            >
              <Text style={styles.GridViewTextLayout}> {item.key} </Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={1}
      />
      <Pressable
        style={[styles.button1]}
        onPress={handleLogout}
      >
        <Text style={styles.ButtonText}>Logout</Text>
      </Pressable>
      <TouchableOpacity
        style={{
          height: 60,
          width: 150,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", backgroundColor: "red", padding: 9 }}>
          Delete My Account
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          
            <View style={styles.modalView}>
              <Text style= {styles.modalText}>
                Are you sure you want to Logout
              </Text>

            
            <View style={styles.buttonView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleLogout}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </View>
  );
};
export default Settings;

const styles = StyleSheet.create({
  GridViewContainer: {
    flex: 1,
    height: 50,
    margin: 1,
    backgroundColor: "white",
  },
  GridViewTextLayout: {
    fontSize: 20,
    justifyContent: "center",
    color: "#000",
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    marginTop: 300,
    marginBottom:300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
  buttonView:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    margin: 20,
  },
  button: {
    borderRadius: 15,
    padding: 14,
    elevation: 2,
    margin: 25,
  },
  button1: {
    color: 'black',
    backgroundColor: "white",
    height: 50,
    padding: 10,
    justifyContent: "center",
  },
  ButtonText:{
    color: "black",
    fontSize: 20,
    marginLeft:10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
