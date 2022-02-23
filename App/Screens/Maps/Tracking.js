import React, {useState,useEffect} from 'react';
import MapView ,{Callout, Marker}  from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions ,Button, Touchable, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';
import Url from '../../Components/Url';

export default function TrackLocation({route,navigation}) {

  const PosterLocation = route.params.item;
  const [LocationName, setLocationName] = useState([]);
  const [location, setLocation] = useState({
    latitude: 24.935529799106686,
    longitude: 67.0970856025815,
  });
  const [test, setTest] =useState("")
  const [ArrivedButton, setArrivedButton] = useState(<View></View>);

  
  const [mapRegion, setmapRegion] = useState({
    latitude:24.9156, 
    longitude:67.0921,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    setLocation({latitude: PosterLocation.latitude,
      longitude:PosterLocation.longitude})
  },[])
  
  const [DestinationLocation, setDestinationLocation] = useState({droplocationCords:{
        latitude: PosterLocation.DestinationLatitude,
        longitude:PosterLocation.DestinationLongitude,
      }});

  const [marker,setmarker]=useState({
    latitude:24.9156, 
    longitude:67.0921,
  })

  const getLocation = async () => {
    let uiD;

    uiD = await AsyncStorage.getItem("user").then((value) => {
      const getUser = JSON.parse(value);

  
      return getUser._id;
    });

    const userID =uiD;
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      if (PosterLocation.assingTo === userID ){
        setLocation({latitude,longitude})
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  const handleArrived = async () => {

    let dataToSend;
    dataToSend = {
      TaskId: PosterLocation.taskId,
      Arrived : "Yes",
      workerId: PosterLocation.assingTo,
      posterId: PosterLocation.userID,
    };

    console.log("Data to send",dataToSend)

    await fetch(`${Url}/Locations/ArrivedTask`, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        navigation.replace("ScreenManager")
      })
      .catch((error) => {
        console.log(error);
      });
  }

      
      let newmarkerpos = {
        latitude:PosterLocation.latitude,
        longitude: PosterLocation.longitude,
      }
      
  
  // useEffect(() => {
  //   setTimeout(()=>{
        
  //   },50000)
  //   // setmarker(newmarkerpos);
  // });
  
  useEffect(() => {
    setTimeout(()=>{
      WorkerLocationUpdate();
      getLocation()
     }, 20000)
  });

  
  
  const WorkerLocationUpdate = async () => {

    
    let userID;

    userID = await AsyncStorage.getItem("user").then((value) => {
      const getUser = JSON.parse(value);

  
      return getUser._id;
    });

    if (PosterLocation.assingTo === userID ){
    
      setArrivedButton(<Callout style={styles.buttonCallout}>
        <TouchableOpacity
          style={[styles.touchable]}
          onPress={handleArrived}
        >
          <Text style={styles.touchableText}>Arrived</Text>
        </TouchableOpacity>
      </Callout>)

    // if (location){
      let dataToSend = {
        workerId: PosterLocation.assingTo,
        posterId: PosterLocation.UserID,
        TaskId: PosterLocation.taskId,
        ...location, 
      }
      console.log("dataToSend",dataToSend);
      await fetch(`${Url}/Locations/LiveLocation`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("response",response); //location Updated
        })
        .catch((error) => {
          console.log(error);
        });
  //     // }
      } 

  if (PosterLocation.UserID===userID){

    let dataToSend = {
      workerId: PosterLocation.assingTo,
      posterId: PosterLocation.UserID,
      TaskId: PosterLocation.taskId,
    }

    await fetch(`${Url}/Locations/GetTracking`, {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.foundLocation)
         if (response.foundLocation){
          setLocation(response.foundLocation)
        }
      })
      .catch((error) => {
        console.log(error);
      }); 
  }
  }
  
  
  
  
  return (
    <View style={styles.container}>
          <MapView style={styles.map} initialRegion={mapRegion}>
            {/* <Marker 
            coordinate={location}
            /> */}
            {/* <Marker
            coordinate={marker}
            /> */}
            <MapViewDirections
            lineDashPattern={[4]}
            origin={location}
            destination={DestinationLocation.droplocationCords}
            apikey="AIzaSyCQ6bLlYFdutqT8MS7rVwvAY9LTQxqrpC8"
            strokeWidth={4}
            strokeColor="blue"
            />
          </MapView>
          {ArrivedButton}
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
    alignSelf: "center",
    justifyContent: "center",
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
  },
  touchableText: {
    fontSize: 20,
    padding:10,
    paddingHorizontal:45
  },

});