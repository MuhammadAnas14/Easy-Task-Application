import React, { Suspense, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const TaskLocation = ({ route, navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Date, setDate] = useState("");

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

  // console.log(route.params)

  
  const radioButtonsData = [
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Online",
      selected: false,
      labelStyle: { fontSize: 20 },
    },
    {
      id: "2",
      label: "Onsite",
      selected: false,
      labelStyle: { fontSize: 20 },
      containerStyle: { paddingHorizontal: 15 },
    },
  ];
  // const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [taskBudget, setTaskBudget] = useState("")
  const [TaskType,setTaskType] =useState("")

  function onPressRadioButton(radioButtonsArray) {
    // alert("Please Select Again to Confirm (Online)")
    // alert("Please Select Again to Confirm (Onsite)")


    if (radioButtonsArray[0].selected) {
      // radioButtonsData[0].selected(true)
      setTaskType("Online")
      
    }
    if(radioButtonsArray[1].selected){
      // radioButtonsData[1].selected(true)
      setTaskType("Onsite")
      
    }

  }

  const OrderConfirmed = () => {
    
    const TaskData = {
      ...route.params.TaskInitial,
      TaskBudget : taskBudget,
      TaskDate : Date,
      Type : taskType
 
    }
    navigation.navigate("MyLocation",{NewTaskData: TaskData})
  };

  // //Making the Ui
  // let Ui;
  // if (radioButtons[0].selected) {
  //   Ui = (
  //     <View>
  //       <Text>Please confirm the Order by clicking on the confirm button</Text>
  //     </View>
  //   );
  // }

  // if (radioButtons[1].selected === true) {
  //   Ui = (
  //     <View style={styles.BorderColor}>
  //       <TouchableOpacity
  //         style={styles.buttonStyle}
  //         activeOpacity={0.5}
  //         onPress={handleAddressButton}
  //       >
  //         <Text style={styles.buttonTextStyle}>Please Select Address</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.mainBody}>
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
