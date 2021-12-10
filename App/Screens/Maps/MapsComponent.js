import React, {useState,useEffect} from 'react';
import MapView ,{Marker}  from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from "expo-location";


export default function App() {

  const [mapRegion, setmapRegion] = useState({
    latitude: 24.9416,
    longitude: 67.0696,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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

  const getLocationAddress = async (e) => {
    console.log(e)
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (!granted) return;
      const name = await Location.reverseGeocodeAsync(e);
      console.log(name)
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
          region={mapRegion}>
            <Marker draggable coordinate={mapRegion} title='Marker' onDragEnd={(e)=> {getLocationAddress(e.nativeEvent.coordinate)}}></Marker>
          </MapView>

      <View>
        <Button 
      </View>
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
});