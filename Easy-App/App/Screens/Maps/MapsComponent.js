import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker, PROVIDER_GOOGLE  } from "react-native-maps";
import Feather from "react-native-vector-icons/Feather";
import Url from "../../Components/Url";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Touchable,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import * as Location from "expo-location";

export default function App({ navigation, route }) {
  const [mapRegion, setmapRegion] = useState({
    latitude: 24.9416,
    longitude: 67.0696,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [LocationName, setLocationName] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [location, setLocation] = useState({
    latitude: 24.9416,
    longitude: 67.0696,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  let locationDetails;

  const getLocationAddress = async (e) => {
    // console.log(e)
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const Address = await Location.reverseGeocodeAsync(e);
      let TaskAddress = Address[0];
      delete TaskAddress["street"];
      delete TaskAddress["isoCountryCode"];
      delete TaskAddress["postalCode"];
      delete TaskAddress["timezone"];
      delete TaskAddress["street"];
      delete TaskAddress["subregion"];
      locationDetails = { ...e, ...TaskAddress };
      setLocationName(locationDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      console.log("swdn", latitude, longitude);
      setLocation({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      getLocationAddress({
        latitude: latitude,
        longitude: longitude,
      })
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    getLocation();
  }, []);

  let TaskDetails;

  const handlerSubmitLocation = async (flag) => {
    // console.log(route.params.NewTaskData);

    console.log(flag)
    if (flag === "Scheduled") {
      TaskDetails = {
        ...route.params.NewTaskData,
        ...LocationName,
        method: flag,
      };

      await fetch(`${Url}/task/ScheduledTask`, {
        method: "POST",
        body: JSON.stringify(TaskDetails),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          // console.log(response.success);
          setModalVisible(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if(flag === "live") {

      console.log("ddd",LocationName)
      TaskDetails = {
        ...route.params.NewTaskData,
        ...LocationName,
        method: flag,
      };
      
      console.log(TaskDetails.city)

      await fetch(`${Url}/task/LiveTask`, {
        method: "POST",
        body: JSON.stringify(TaskDetails),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          // console.log(response.success);
          setModalVisible(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePostedTask = () => {
    setModalVisible(!modalVisible);
    navigation.replace("ScreenManager");
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={mapRegion} provider={ PROVIDER_GOOGLE }>
        <Marker
          draggable
          coordinate={location}
          title="Location"
          onDragEnd={(e) => {
            getLocationAddress(e.nativeEvent.coordinate);
          }}
        ></Marker>
      </MapView>
      <Callout style={styles.buttonCallout}>
        <TouchableOpacity
          style={[styles.touchable]}
          onPress={() => handlerSubmitLocation("live")}
        >
          <Text style={styles.touchableText}>Live</Text>
        </TouchableOpacity>
      </Callout>
      <Callout style={styles.buttonCallout1}>
        <TouchableOpacity
          style={[styles.touchable1]}
          onPress={() => handlerSubmitLocation("Scheduled")}
        >
          <Text style={styles.touchableText1}>Scheduled</Text>
        </TouchableOpacity>
      </Callout>
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
            <Feather
              style={styles.icons}
              name="check-circle"
              size={50}
              color="#3dabbc"
            />
            <Text style={styles.modalText}>Your Task have been posted</Text>

            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handlePostedTask}
              >
                <Text style={styles.textStyle}>Go to Home</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    margin: 40,
  },
  buttonCallout: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    bottom: 0,
    zIndex: 100,
  },
  touchable: {
    color: "white",
    fontSize: 16,
    backgroundColor: "#3CAABB",
    borderWidth: 0,
    borderColor: "#7AC4CF",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 40,
  },
  touchableText: {
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 45,
  },
  buttonCallout1: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  touchable1: {
    color: "white",
    fontSize: 16,
    backgroundColor: "#3CAABB",
    borderWidth: 0,
    borderColor: "#7AC4CF",
    alignItems: "center",
    borderRadius: 10,
  },
  touchableText1: {
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 25,
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
  icons: {
    marginBottom: 10,
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
});
