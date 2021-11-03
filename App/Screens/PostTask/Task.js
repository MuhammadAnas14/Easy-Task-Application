import React from "react";

import { createMaterialTopTabNavigator } from "react-navigation-tabs";


const TabNavigator = createMaterialTopTabNavigator();



const MainTaskScreen = ({ navigation }) => {
  return (
    <Tab.Navigator
    initialRouteName = "TaskDetails">
      <TabNavigator.Screen name="TaskDetails" component={TaskDetail} />
      <TabNavigator.Screen name="Budget" component={TaskBudget} />
    </Tab.Navigator>
  );
};

export default MainTaskScreen;
