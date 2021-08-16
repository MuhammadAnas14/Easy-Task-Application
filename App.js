import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from "./App/Screens/Signup"
import Login from "./App/Screens/Login"
import SplashScreen from "./App/Screens/Splash.js"
import OtpScreen from './App/Screens/otp';

export default function App() {
  return (

      <OtpScreen/>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
