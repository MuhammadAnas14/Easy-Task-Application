import React, { Suspense, useState } from "react";
<<<<<<< HEAD
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Button } from "react-native";
import Url from '../../Components/Url'
import RadioGroup from 'react-native-radio-buttons-group';
=======
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TaskLocation = ({ route, navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
<<<<<<< HEAD
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [Date, setDate] = useState("");


=======
  const [Date, setDate] = useState("");

>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
<<<<<<< HEAD
    hideDatePicker()
  }
=======
    hideDatePicker();
  };
>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869

  console.log(route.params)

<<<<<<< HEAD
  const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Online',
    selected: false,
    labelStyle: { fontSize: 20 }
  }, {
    id: '2',
    label: 'Onsite',
    selected: false,
    labelStyle: { fontSize: 20 },
    containerStyle: { paddingHorizontal: 15 }
  }]
  


  function onPressRadioButton(radioButtonsArray) {
    console.log("hello", radioButtonsArray)
    setRadioButtons(radioButtonsArray);
    console.log(radioButtons)
  }

  const OrderConfirmed = async () => {
    console.log("make schema send data");


    // Api to Send Data to Backend 
    await fetch(`${Url}/auth/OrderPlaced`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

      .then(response => response.success)
      .then(response => {
        console.log(response.success)
        if (response.success) {
          alert("Order Placed")
          navigation.replace("PostTask")
        }
      })
      .catch(response => console.log(response))
  }

  //Making the Ui
  let Ui
=======
  
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
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    console.log("hello", radioButtonsArray);
    setRadioButtons(radioButtonsArray);
    console.log(radioButtons);
  }

  const OrderConfirmed = () => {
    console.log("make schema send data");
  };

  //Making the Ui
  let Ui;
>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869
  if (radioButtons[0].selected) {
    Ui = (
      <View>
        <Text>Please confirm the Order by clicking on the confirm button</Text>
      </View>
<<<<<<< HEAD
    )
=======
    );
>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869
  }

  if (radioButtons[1].selected === true) {
    Ui = (
      <View style={styles.BorderColor}>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
<<<<<<< HEAD
        // onPress={handleSubmitButton}
=======
          onPress={handleAddressButton}
>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869
        >
          <Text style={styles.buttonTextStyle}>Please Select Address</Text>
        </TouchableOpacity>
      </View>
<<<<<<< HEAD
    )
=======
    );
>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869
  }

  return (
    <View style={styles.mainBody}>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          // onChangeText={(taskName) => setTaskName(taskName)}
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
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
<<<<<<< HEAD
          layout='row'
=======
          layout="row"
>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869
        />
      </View>
      {Ui}
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
<<<<<<< HEAD
    justifyContent: 'center',
    alignContent: 'center',
=======
    justifyContent: "center",
    alignContent: "center",
>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869
    marginBottom: -150,
  },
  toMid: {
    margin: 80,
  },
  bottomView: {
<<<<<<< HEAD
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  buttonStyle: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 30,

  },
  buttonTextStyle: {
    color: 'grey',
    backgroundColor: 'transparent',
=======
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
>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869
    paddingHorizontal: 50,
    borderRadius: 5,
    padding: 15,
  },
  BorderColor: {
    borderRadius: 5,
    padding: 30,
<<<<<<< HEAD
  }
});
=======
  },
});
>>>>>>> 8789976f6795d4e4eeccd12d75502638aed7a869
