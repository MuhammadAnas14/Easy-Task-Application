import React, { Suspense, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Url from "../../Components/Url";

const TaskLocation = ({ route, navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Date, setDate] = useState("");
  const [UserData, setUserData] = useState("");
  // const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [taskBudget, setTaskBudget] = useState("");
  const [TaskType, setTaskType] = useState("");
  const [errorText, setErrorText] = useState("");

  AsyncStorage.getItem("user").then((value) => setUserData(JSON.parse(value)));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const UserDetails = {
    UserId: UserData._id,
    UserName: UserData.firstName + " " + UserData.lastName,
    UserPhoto: UserData.picture,
  };

  const radioButtonsData = [
    {
      id: "1",
      label: "Online",
      labelStyle: { fontSize: 20 },
      selected: false,
    },
    {
      id: "2",
      label: "Onsite",
      labelStyle: { fontSize: 20 },
      selected: false,
      containerStyle: { paddingHorizontal: 15 },
    },
  ];

  function onPressRadioButton(radioButtonsArray) {
    if (radioButtonsArray[0].selected) {
      setTaskType("Online");
    }
    if (radioButtonsArray[1].selected) {
      setTaskType("Onsite");
    }
  }

  const TaskData =""

  const OrderConfirmed = async () => {

    if (!taskBudget) {
      setErrorText("Please fill Task Budget");
      return;
    }
    if (!Date) {
      setErrorText("Please fill Task Budget");e
      return;
    }
    if (!TaskType) {
      setErrorText("Please fill Task Budget");
      return;
    }

    if (TaskType === "Online") {  

      TaskData = {
        ...route.params.TaskInitial,
        TaskBudget: taskBudget,
        TaskDate: Date,
        Type: TaskType,
        ...UserDetails,
      };

      await fetch(`${Url}/task/OnlineTask`, {
        method: "POST",
        body: JSON.stringify(TaskData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {res.json})
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        setErrorText("something went wrong ");
        console.log(error)
      })
  }
    if(TaskType === "Onsite"){
      
      TaskData = {
        ...route.params.TaskInitial,
        TaskBudget: taskBudget,
        TaskDate: Date,
        Type: TaskType,
        ...UserDetails,
      };

      navigation.navigate("MyLocation", { NewTaskData: TaskData });
  }
  };

  return (
    <View style={styles.mainBody}>
      {errorText != "" ? (
            <Text style={styles.errorTextStyle}>{errorText}</Text>
          ) : null}
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(budget) => setTaskBudget(budget)}
          underlineColorAndroid="#f000"
          keyboardType="numeric"
          placeholder="Enter Your Budget"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          returnKeyType="next"
          onSubmitEditing={() =>
            descriptionRef.current && descriptionRef.current.focus()
          }
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.ButtonStyle}>
        <Button
          title={Date ? Date.toDateString() : "Please Select Date"}
          onPress={showDatePicker}
          color="#3caabb"
        />
      </View>
      <View style={styles.toMid}>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={styles.RadioButton}>
        <RadioGroup
          radioButtons={radioButtonsData}
          onPress={onPressRadioButton}
          layout="row"
        />
      </View>
      <View style={styles.bottomView}>
        <Button
          style={{ paddingHorizontal: 50 }}
          title={"Confirm Your Order"}
          onPress={OrderConfirmed}
          color="red"
        />
      </View>
    </View>
  );
};

export default TaskLocation;

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
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
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
  RadioButton: {
    flexDirection: "row",
    padding: 40,
    justifyContent: "space-between",
    marginTop: 0,
  },
  ButtonStyle: {
    marginLeft: 40,
    marginRight: 40,
    justifyContent: "center",
    alignContent: "center",
    marginBottom: -150,
  },
  toMid: {
    margin: 80,
  },
  bottomView: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
  },
  buttonStyle: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 30,
  },
  buttonTextStyle: {
    color: "grey",
    backgroundColor: "transparent",
    paddingHorizontal: 50,
    borderRadius: 5,
    padding: 15,
  },
  BorderColor: {
    borderRadius: 5,
    padding: 30,
  },
});
