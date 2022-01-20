import React, { createRef, useState } from "react";
import {
  Text,
  Keyboard,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const TaskDetails = ({ route, navigation }) => {
  const [TaskDiscription, setTaskDiscription] = useState("");
  const [TaskName, setTaskName] = useState("");

  const descriptionRef = createRef();

  const handleNextButton = () => {
    const task_detail = {
      task_name: TaskName,
      Category: route.params.Category,
      task_discription: TaskDiscription,
    };

    navigation.navigate("TaskLocation", { TaskInitial: task_detail });
  };

  return (
    <View style={styles.mainBody}>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(taskName) => setTaskName(taskName)}
          underlineColorAndroid="#f000"
          placeholder="Enter Task Name"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          returnKeyType="next"
          onSubmitEditing={() =>
            descriptionRef.current && descriptionRef.current.focus()
          }
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          onChangeText={(description) => setTaskDiscription(description)}
          placeholder="Enter Task Description"
          placeholderTextColor="grey"
          numberOfLines={6}
          multiline={true}
          onSubmitEditing={Keyboard.dismiss}
          ref={descriptionRef}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={handleNextButton}
      >
        <Text style={styles.buttonTextStyle}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "white",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 20,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    color: "black",
    borderColor: "#3CAABB",
  },
  textAreaContainer: {
    borderColor: "#3CAABB",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginLeft: 35,
    marginRight: 35,
  },
  textArea: {
    height: 120,
    justifyContent: "flex-start",
  },
  buttonStyle: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
  },
  buttonTextStyle: {
    color: "black",
    backgroundColor: "green",
    paddingHorizontal: 50,
  },
});

export default TaskDetails;
