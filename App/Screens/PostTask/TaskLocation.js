import React, {useState} from "react";
import { Text, TouchableOpacity, View,StyleSheet,TextInput } from "react-native";
import RadioGroup from 'react-native-radio-buttons-group';



const TaskLocation = ({ navigation }) => {
  const radioButtonsData = [{
    id: '1', // acts as primary key, should be unique and non-empty string
    label: 'Option 1',
    value: 'option1'
}, {
    id: '2',
    label: 'Option 2',
    value: 'option2'
}]
const [radioButtons, setRadioButtons] = useState(radioButtonsData);

function onPressRadioButton(radioButtonsArray) {
  setRadioButtons(radioButtonsArray);
}
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
  }
});