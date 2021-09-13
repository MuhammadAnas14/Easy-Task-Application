import React from "react";
import {View, Text, StyleSheet,} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PostTask from "./PostStack";
import HomeStack from "./PostedTask";
import MyTaskStack from "./MyTask";
import MessageStack from './ChatRoom'
import SettingsStack from './Setting'

const Tab = createBottomTabNavigator();


const MainPage = () => {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#3cbbac',
          tabBarInactiveTintColor: '#f4f1de',
          tabBarActiveBackgroundColor: '#fff',
          tabBarInactiveBackgroundColor: '#3cbbac',
  
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#3CAABB",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="My Tasks"
          component={MyTaskStack}
          options={{
            title: "My Tasks",
            headerStyle: {
              backgroundColor: "#3CAABB",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarLabel: "My Tasks",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="PostStack"
          component={PostTask}
          options={{
            title: "Select task category",
            headerStyle: {
              backgroundColor: "#3CAABB",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarLabel: "Post a Task",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="folder-image"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessageStack}
          options={{
            title: "Messages",
            headerStyle: {
              backgroundColor: "#3CAABB",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarLabel: "Messages",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="android-messages"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            title: "Account Settings",
            headerStyle: {
              backgroundColor: "#3CAABB",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-settings"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
};


export default MainPage;



const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignContent: "center",
    textAlign: "center",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
});
