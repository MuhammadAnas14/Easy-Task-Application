import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from "./App/Screens/Signup"
import Login from "./App/Screens/Login"
import SplashScreen from "./App/Screens/Splash.js"
import OtpScreen from './App/Screens/otp';
import ForgetPassword from './App/Screens/ForgetPassword'
import MainPage from './App/Screens/MainPage'
import PostedTask from './App/Screens/PostedTask'
import MyTask from './App/Screens/MyTask'
import Feedback from './App/Screens/Feedback';
import ScreenManager from './App/Screens/ScreenManager'

    


export default function App() {
  return (
      <ScreenManager />
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
