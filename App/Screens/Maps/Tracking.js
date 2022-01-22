import React, {useState,useEffect} from 'react';
import MapView ,{Callout, Marker}  from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions ,Button, Touchable, TouchableOpacity} from 'react-native';
import * as Location from "expo-location";
import MapViewDirections from 'react-native-maps-directions';


export default function TrackLocation({navigation}) {

  // const [state, setstate] = useState({
  //   pickupCords:{
  //     latitude: 24.935529799106686,
  //     longitude: 67.0970856025815,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   },
  //   droplocationCords:{
  //     latitude: 24.935529799106686,
  //     longitude: 67.0970856025815,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   }
  // }) 

  

  const [mapRegion, setmapRegion] = useState({
    latitude: 24.9416,
    longitude: 67.0696,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [LocationName, setLocationName] = useState([]);

  const [location, setLocation] = useState();

  const [DestinationLocation, setDestinationLocation] = useState({droplocationCords:{
        latitude: 24.935529799106686,
        longitude: 67.0970856025815,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }});

  // const [pickupCords,droplocationCords] = state;

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

  const getLocationAddress = async (e) => {
    console.log(e)
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (!granted) return;
      const name = await Location.reverseGeocodeAsync(e);
      setLocationName([
        e,
        name[0]
      ])
    } 
    catch (error) {
      console.log(error);
    }
  };

  console.log(LocationName)

  useEffect(() => {
    getLocation();
  }, []);

  const handlerSubmitLocation = (flag) => {

    setLocationName([...LocationName,{method:flag}])

    navigation.replace('ScreenManager',{location:LocationName})
  }

  // console.log(LocationName)
  
  
  return (
    <View style={styles.container}>
      {/* <MapView style={styles.map}
          region={mapRegion}>
            <Marker draggable coordinate={mapRegion} title='Marker' onDragEnd={(e)=> {getLocationAddress(e.nativeEvent.coordinate)}}></Marker>
          </MapView> */}
          <MapView style={styles.map} initialRegion={mapRegion}>
            <MapViewDirections
            origin={mapRegion}
            destination={DestinationLocation}
            apikey="AIzaSyCQ6bLlYFdutqT8MS7rVwvAY9LTQxqrpC8"
            strokeWidth={4}
            strokeColor="hotPink"
            />
          </MapView>
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