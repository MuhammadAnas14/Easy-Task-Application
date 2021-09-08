import React from 'react';
import {Platform, FlatList, Alert ,View,Text,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostTask from './PostStack';
import HomeStack from './HomeStack'

function SettingsStack() {
    return (
    //   <Stack.Navigator
    //     initialRouteName="Settings"
    //     screenOptions={{
    //       headerStyle: { backgroundColor: '#42f44b' },
    //       headerTintColor: '#fff',
    //       headerTitleStyle: { fontWeight: 'bold' }
    //     }}>
    //   </Stack.Navigator>
    <View style={styles.mainBody}>
    <Text>Hello, Peter 2</Text>
    <Text>USER AVAILABLE</Text>
    </View>
    );
  }
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
  
const MainPage = () => {
    
    return(
        <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
          screenOptions={{
            activeTintColor: '#3CAABB',
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              title: 'Home',
              headerStyle: {
                backgroundColor: '#3CAABB',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="home"
                  color={color}
                  size={size}
                />
              ),
            }}  />
          <Tab.Screen
            name="SettingsStack"
            component={SettingsStack}
            options={{
                title: 'Account Settings',
                headerStyle: {
                  backgroundColor: '#3CAABB',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-settings"
                  color={color}
                  size={size}
                />
              ),
            }} />
        <Tab.Screen
            name="PostStack"
            component={PostTask}
            options={{
                title: 'Select task category',
                headerStyle: {
                  backgroundColor: '#3CAABB',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              tabBarLabel: 'Post a Task',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="folder-image"
                  color={color}
                  size={size}
                />
              ),
            }} />
        </Tab.Navigator>
      </NavigationContainer>
    )
}
export default MainPage;

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
      alignContent: 'center',
      textAlign: 'center',
    },
    headerText: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
      fontWeight: "bold"
    },
})