import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Data from "../Data/MyTaskData.json";

function LiveTaskItem({ item }) {
  return (
    <View style={styles.listItem}>
      <View style={styles.mainDetails}>
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.OfferName}>{item.name}</Text>
        </View>
        <View>
          <Text style={styles.Offer}>RS. {item.comments} </Text>
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

        <TouchableOpacity style={styles.buttonView}>
          <Text style={styles.buttonTextReject}>REJECT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const LiveTasks = () => {
  const [TaskData, setTaskData] = useState(Data);
  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={TaskData}
        renderItem={({ item }) => <LiveTaskItem item={item} />}
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
