import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
  
const TaskLocation = ({navigation}) => {
  return (
    <View style={{ flex: 1, 
                   alignItems: "center",
                   justifyContent: "center" }}>
      <TouchableOpacity
      onPress={()=> navigation.replace("TaskFields")}
      >
      <Text style={{ color: "#006600", fontSize: 40 }}>
         Online Task
      </Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=> navigation.replace("MyLocation")}
      >
      <Text style={{ color: "#006600", fontSize: 40 }}>
         Onsite Task
      </Text>
      </TouchableOpacity>
    </View>
  );
};
  
export default TaskLocation;