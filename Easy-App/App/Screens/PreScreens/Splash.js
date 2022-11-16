import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({navigation}) => {

  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('token').then((value) =>
        navigation.replace(
          value === null ? 'LoginScreen' : 'ScreenManager'
        ),
      );
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/logo.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 0}}
      />
      <ActivityIndicator
        animating={animating}
        color="#171717"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
    backgroundColor: '#FFFFFF',
  },
});