import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TaskDetails from './TaskDetails'
import TaskBudget  from "./TaskBudget";

const Tab = createMaterialTopTabNavigator();



const MainTaskScreen = ({ navigation }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="TaskDetails" component={TaskDetails} />
      <Tab.Screen name="Budget" component={TaskBudget} />
   </Tab.Navigator>
  );
};

export default MainTaskScreen;
