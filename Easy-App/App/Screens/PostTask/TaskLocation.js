import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Pressable
} from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from 'react-native-vector-icons/Feather';
import Url from "../../Components/Url";

const radioButtonsData2 = [{
  id: '1', 
  label: 'COD',
  value: 'option1',
  labelStyle: { fontSize: 20 },
}, {
  id: '2',
  label: 'CARD',
  value: 'option2',
  labelStyle: { fontSize: 20 },
  containerStyle: { paddingHorizontal: 15 },
}];

const radioButtonsData = [
  {
    id: "1",
    label: "Online",
    value:"Online",
    labelStyle: { fontSize: 20 },
    selected: false,
  },
  {
    id: "2",
    label: "Onsite",
    value: "Onsite",
    labelStyle: { fontSize: 20 },
    selected: false,
    containerStyle: { paddingHorizontal: 15 },
  },
];

const TaskLocation = ({ route, navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Date, setDate] = useState("");
  const [UserData, setUserData] = useState("");
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [taskBudget, setTaskBudget] = useState("");
  const [TaskType, setTaskType] = useState("");
  const [errorText, setErrorText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [radioButtons2, setRadioButtons2] = useState(radioButtonsData2)
  const [paymentMethod,setPaymentMethod] = useState("")

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

  function onPressRadioButton2(radioButtonsArray) {
    setRadioButtons2(radioButtonsArray);
    if (radioButtonsArray[0].selected) {
      setPaymentMethod("Cash On Delivery");
    }
    if (radioButtonsArray[1].selected) {
      setPaymentMethod("Card");
      console.log("Card")
    }
}

  

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray)
    if (radioButtonsArray[0].selected) {
      setTaskType("Online");
    }
    if (radioButtonsArray[1].selected) {
      setTaskType("Onsite");
    }
  }

  let TaskData;

  const OrderConfirmed = async () => {
    if (!taskBudget) {
      setErrorText("Please fill Task Budget");
      return;
    }
    if (!Date) {
      setErrorText("Please fill Task Budget");
      e;
      return;
    }
    if (!TaskType) {
      setErrorText("Please fill Task Budget");
      return;
    }
    

    if (TaskType === "Online") {
      console.log("dd");

      if(!paymentMethod || paymentMethod === "Cash On Delivery"){
        setErrorText("Online Task can online have CARD method");
        return;
      }

      TaskData = {
        ...route.params.TaskInitial,
        TaskBudget: taskBudget,
        TaskDate: Date,
        Type: TaskType,
        PaymentMethod: paymentMethod,
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
        .then((res) => {
          res.json();
        })
        .then((response) => {
          console.log(response);
          setModalVisible(true)
        })
        .catch((error) => {
          setErrorText("something went wrong ");
          console.log(error);
        });
    }
    
    if (TaskType === "Onsite") {
      TaskData = {
        ...route.params.TaskInitial,
        TaskBudget: taskBudget,
        TaskDate: Date,
        Type: TaskType,
        PaymentMethod: paymentMethod,
        ...UserDetails,
      };

      navigation.replace("MyLocation", { NewTaskData: TaskData });
    }
  };

  const handlePostedTask = () => {

    setModalVisible(!modalVisible)
    navigation.replace("ScreenManager")
  }
  
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
          minimumDate={new window.Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={styles.SelectionHead}>
        <Text style={styles.SelectionHeadText}>Select Task Method</Text>
      </View>
      <View style={styles.RadioButton}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
          layout="row"
        />
      </View>
      <View style={styles.SelectionHead}>
        <Text style={styles.SelectionHeadText}>Select Payment Method</Text>
      </View>
      <View style={styles.RadioButton}>
        <RadioGroup
          radioButtons={radioButtons2}
          onPress={onPressRadioButton2}
          layout="row"
        />
      </View>
      <View style={styles.bottomView}>
        <Button
          style={{ paddingHorizontal: 50 }}
          title={"Confirm Your Order"}
          onPress={OrderConfirmed}
          color="#3CAABB"
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Feather style={styles.icons}  name="check-circle" size={50} color="#3dabbc" />
            <Text style={styles.modalText}>
              Your Task have been posted
            </Text>

            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handlePostedTask}
              >
                <Text style={styles.textStyle}>Go to Home</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  RadioButton: {
    flexDirection: "row",
    paddingLeft: 80,
    padding:20,
    alignItems:"center",
  },
  ButtonStyle: {
    marginLeft: 35,
    marginRight: 35,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    flexDirection: 'row',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    marginTop: 300,
    marginBottom:300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icons:{
    marginBottom:10,
  },
  modalText:{
    fontSize:18,
    color:"black",
    fontWeight: "bold",
    marginBottom:6
  },
  textStyle: {
    textDecorationLine :"underline",
    fontSize:15,
    color: "#3dabbc",
  },
  SelectionHead:{
    alignItems:"center",
    marginTop:20,
  },
  SelectionHeadText:{
    fontSize:20,
    fontWeight:"bold",
  }
});
