import StarRating from "react-native-star-rating";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import Url from "../Components/Url";
import Feather from "react-native-vector-icons/Feather";

const Feedback = ({ navigation, route }) => {
  const [StarRatings, setStarRatings] = useState(0);
  const [textInputValue, setTextInputValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const changeRating = (rating) => {
    setStarRatings(rating);
  };

  const UserData = route.params.Data;

  const handleSubmitFeedBack = async () => {
    const dataToSend = {
      FeedbackFrom: UserData.userId,
      Rating: StarRatings,
      feedback: textInputValue,
      TaskID: UserData._id,
      FeedbackTo: UserData.taskAssignTo,
    };
    // console.log(dataToSend)

    await fetch(`${Url}/feedback/GiveFeedback`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.success) {
          setModalVisible(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePostedTask = () => {
    setModalVisible(!modalVisible);
    navigation.replace("ScreenManager");
  };

  return (
    <View style={styles.mainBody}>
      <Text style={styles.titleStyle}>Feedback</Text>
      <Text style={styles.titleStyle}>Rating</Text>
      <View style={styles.star}>
        <StarRating
          disabled={false}
          maxStars={5}
          fullStarColor={"#3CAABB"}
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
            <Feather
              style={styles.icons}
              name="check-circle"
              size={50}
              color="#3dabbc"
            />
            <Text style={styles.modalText}>
              Your FeedBack has been recorded
            </Text>
            <Text style={styles.modalText}>Thank you for using Easy App</Text>
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
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
  textAreaContainer: {
    borderColor: "#3CAABB",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
  buttonStyle: {
    backgroundColor: "#3CAABB",
    borderWidth: 0,
    color: "#000000",
    borderColor: "#7AC4CF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    flexDirection: "row",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    marginTop: 300,
    marginBottom: 300,
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
  icons: {
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    marginBottom: 6,
  },
  textStyle: {
    textDecorationLine: "underline",
    fontSize: 15,
    color: "#3dabbc",
  },
});

export default Feedback;
