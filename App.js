 import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RegisterScreen from "./App/Screens/Signup"
import LoginScreen from "./App/Screens/Login"
import SplashScreen from "./App/Screens/Splash.js"
import OtpScreen from './App/Screens/otp';
import ScreenManager from './App/Screens/ScreenManager'
import ForgetPasswordScreen from './App/Screens/ForgetPassword';
import PostTaskMain from './App/Screens/PostTask/Task'
import EmailOtp from './App/Screens/Settings/Verifications/EmailVerify'
import MapsComponent from './App/Screens/Maps/MapsComponent'
import TaskDetails from './App/Screens/PostTask/NewTaskDetails'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
        
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ForgetPasswordScreen"
        component={ForgetPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EmailOtpScreen"
        component={EmailOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScreenManager"
        component={ScreenManager}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostTaskManager"
        component={PostTaskMain}
        options={{headerShown: false}}
      />
        <Stack.Screen
        name="MyLocation"
        component={MapsComponent}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="TaskFields"
        component={TaskDetails}
        options={{headerShown: true}}
      />
      </Stack.Navigator>
      </NavigationContainer>
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
