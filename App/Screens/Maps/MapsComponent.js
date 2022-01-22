import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Touchable,
  TouchableOpacity,
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

  const [location, setLocation] = useState({
    latitude: 24.9416,
    longitude: 67.0696,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getLocation = async () => {
    // console.log("errrrr")
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      console.log("errrrr", latitude ,latitude);
      setLocation({ latitude:latitude, longitude :longitude,latitudeDelta: 0.0922,
        longitudeDelta: 0.0421, });
    } catch (error) {
      console.log(error);
    }
  };

  let locationDetails;

  const getLocationAddress = async (e) => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const Address = await Location.reverseGeocodeAsync(e);
      let TaskAddress = Address[0]
      delete TaskAddress["street"]
      delete TaskAddress["isoCountryCode"]
      delete TaskAddress["postalCode"]
      delete TaskAddress["timezone"]
      delete TaskAddress["street"]
      delete TaskAddress["subregion"]
      locationDetails = { ...e, ...TaskAddress };
      setLocationName(locationDetails);
    } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handlerSubmitLocation = (flag) => {
    console.log(route.params.NewTaskData)
    let TaskDetails = {
      ...route.params.NewTaskData,
      Location: LocationName,
      method: flag,
    };
    console.log(TaskDetails.method);

  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={mapRegion}>
        <Marker
          draggable
          coordinate={location}
          title="Marker"
          onDragEnd={(e) => {
            getLocationAddress(e.nativeEvent.coordinate);
          }}
        ></Marker>
      </MapView>
      <Callout style={styles.buttonCallout}>
          <TouchableOpacity
            style={[styles.touchable]}
            onPress={()=> handlerSubmitLocation("live")}
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
});
