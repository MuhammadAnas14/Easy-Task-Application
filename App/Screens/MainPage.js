import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

  

function HomeStack() {
    return (
        <View style={styles.mainBody}>
        <Text>Hello, Peter</Text>
        <Text>ALL CATEGOORIES WITH ICON and add other stacks</Text>
        </View>
    );
}
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
          tabBarOptions={{
            activeTintColor: '#42f44b',
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
            //   tabBarIcon: ({ color, size }) => (
            //     <MaterialCommunityIcons
            //       name="home"
            //       color={color}
            //       size={size}
            //     />
            //   ),
            }}  />
          <Tab.Screen
            name="SettingsStack"
            component={SettingsStack}
            options={{
              tabBarLabel: 'Settings',
            //   tabBarIcon: ({ color, size }) => (
            //     <MaterialCommunityIcons
            //       name="settings"
            //       color={color}
            //       size={size}
            //     />
            //   ),
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
})