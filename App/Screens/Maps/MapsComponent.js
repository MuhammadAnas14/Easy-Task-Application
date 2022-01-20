import React, {useState,useEffect} from 'react';
import MapView ,{Callout, Marker}  from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions ,Button, Touchable, TouchableOpacity} from 'react-native';
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App({navigation,route}) {

  const [UserData, setUserData] = useState("");

  AsyncStorage.getItem("user").then((value) => setUserData(JSON.parse(value)));

  const UserDetails = {
    UserId: UserData._id,
    name: UserData.firstName + UserData.lastName,
    UserPhoto: UserData.picture

  }

  const [mapRegion, setmapRegion] = useState({
    latitude: 24.9416,
    longitude: 67.0696,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [LocationName, setLocationName] = useState([])

  const [location, setLocation] = useState();

  const getLocation = async () => {   
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLocation({ latitude, longitude });
    } 
    catch (error) {
      console.log(error);
    }
  };

  let locationDetails ;

  const getLocationAddress = async (e) => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (!granted) return;
      const name = await Location.reverseGeocodeAsync(e);
      locationDetails = { ...e,...name[0]}
      setLocationName(locationDetails)
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handlerSubmitLocation = (flag) => {

    let TaskDetails ={...route.params.NewTaskData,...LocationName,method:flag,...UserDetails}
    console.log(TaskDetails)

  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
          region={mapRegion}>
            <Marker draggable coordinate={mapRegion} title='Marker' onDragEnd={(e)=> {getLocationAddress(e.nativeEvent.coordinate)}}></Marker>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    margin:40,
  },
  buttonCallout: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    bottom: 0,
    zIndex: 100,
  },
  touchable: {
    color: 'white',
    fontSize: 16,
    backgroundColor: '#3CAABB',
    borderWidth: 0,
    borderColor: '#7AC4CF',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft:40,
  },
  touchableText: {
    fontSize: 20,
    padding:10,
    paddingHorizontal:45
  },
  buttonCallout1: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "space-between",
    bottom: 0,
    left:0,
    zIndex: 100,
  },
  touchable1: {
    color: 'white',
    fontSize: 16,
    backgroundColor: '#3CAABB', 
    borderWidth: 0,
    borderColor: '#7AC4CF',
    alignItems: 'center',
    borderRadius: 10,
 
  },
  touchableText1: {
    fontSize: 20,
    padding:10,
    paddingHorizontal:25
  },
});