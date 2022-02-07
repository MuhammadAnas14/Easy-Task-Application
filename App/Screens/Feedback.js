import StarRating from "react-native-star-rating";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import Url from '../Components/Url'

const Feedback = ({navigation,route}) => {
  const [StarRatings, setStarRatings] = useState(2);
  const [textInputValue, setTextInputValue] = useState("");

  const changeRating = (rating) => {
    setStarRatings(rating);
  };

  const UserData = route.params.Data

  const handleSubmitFeedBack = () => {
    
    const dataToSend= {
      FeedbackFrom:UserData.userId,
      Rating: StarRatings,
      feedback: textInputValue,
      TaskID: UserData._id,
      FeedbackTo: UserData.taskAssignTo,
    }
    // console.log(dataToSend)

    await fetch(`${Url}/task/CompleteTask`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
    .then((res) => res.json())
    .then((response) => {
      console.log(response)
      if(response.success){
        navigation.navigate("ScreenManager")
      }
    }
    )
    .catch((error) => {
      console.log(error);
    });
  };


  return (
    <View style={styles.mainBody}>
      <Text style={styles.titleStyle}>Feedback</Text>
      <Text style={styles.titleStyle}>Rating</Text>
      <View style={styles.star}>
        <StarRating
          disabled={false}
          maxStars={5}
          fullStarColor={'#3CAABB'}
          rating={StarRatings}
          selectedStar={(rating) => changeRating(rating)}
        />
      </View>
      <Text style={styles.titleStyle2}>Write a Review</Text>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type something"
          placeholderTextColor="grey"
          numberOfLines={10}
          multiline={true}
          onChangeText={(feedback) => setTextInputValue(feedback)}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={handleSubmitFeedBack}
      >
        <Text style={styles.buttonTextStyle}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  star: {
    textAlign: "center",
    marginRight: 40,
    marginLeft: 40,
  },
  titleStyle: {
    marginTop: 10,
    marginBottom: 25,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  titleStyle2: {
    marginTop: 20,
    marginBottom: 25,
    fontSize: 30,
    textAlign:"center",
    fontWeight: "bold",
    color: "black",
  },
  textAreaContainer: {
    borderColor: "#3CAABB",
    borderWidth: 1,
    borderRadius:10,
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
  buttonStyle: {
    backgroundColor: '#3CAABB',
    borderWidth: 0,
    color: '#000000',
    borderColor: '#7AC4CF',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Feedback;
