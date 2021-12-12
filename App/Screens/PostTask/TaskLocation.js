import React, {useState} from "react";
import { Text, TouchableOpacity, View,StyleSheet,TextInput,Button } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const TaskLocation = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Date,setDate] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker()}
  const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Online',
    selected: true,
    labelStyle:{fontSize:20}
}, {
    id: '2',
    label: 'Onsite',
    selected: false,
    labelStyle:{fontSize:20},
    containerStyle: {paddingHorizontal:15}
}]
const [radioButtons, setRadioButtons] = useState(radioButtonsData);

function onPressRadioButton(radioButtonsArray) {
  setRadioButtons(radioButtonsArray);
  console.log(radioButtons)
}

//Making the Ui
let Ui
if(radioButtons[0].selected === true){
  Ui=(
    <View>
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
      </View>
  )
}
if(radioButtons[1].selected === true){
  Ui=(
    <View>
      <Text>For the Onsite Ui</Text>
    </View>
  )
}
else{}

  return (
    <View style={styles.mainBody}>
    <View style={styles.SectionStyle}>
    <TextInput
      style={styles.inputStyle}
      onChangeText={(taskName) => setTaskName(taskName)}
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
    <View style={styles.RadioButton}>
    <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
            layout='row'
    />
    </View>
    {Ui}
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
  RadioButton:{
    flexDirection:"row",
    padding:40,
    justifyContent: "space-between"
  },
  ButtonStyle:{
    marginLeft:40,
    marginRight:40,
    justifyContent:'center',
    alignContent:'center',
  },
  toMid:{
    margin:80,
    
  },
});