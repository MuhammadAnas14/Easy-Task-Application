import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TaskDetails from './TaskDetails' 
import TaskLocation from './TaskLocation'

const Tab = createMaterialTopTabNavigator();



const MainTaskScreen = ({ route, navigation }) => {
  return (
    <Tab.Navigator
    initialRouteName="TaskDetails"
      screenOptions={{
        tabBarActiveTintColor: '#163F45',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {margin:20 ,marginTop:50},
      }}>
      <Tab.Screen name="TaskDetails" component={TaskDetails} initialParams={{Category:route.params.Category}}/>
      <Tab.Screen name="TaskLocation" component={TaskLocation} />
   </Tab.Navigator>
  );
};

export default MainTaskScreen;
