import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  Pressable,
  Text,
  TextInput,
  Modal,
} from "react-native";
import CreditCard from "react-native-credit-card-form-ui";
import Feather from "react-native-vector-icons/Feather";
import Url from "../../Components/Url";

const CardPayment = ({ navigation, route }) => {
  const creditCardRef = React.useRef();
  const [Money, setMoney] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const UserData = route.params.Data;

  const handleSubmit = React.useCallback(() => {
    let cardData;
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      // console.log("ERROR: ", error);
      // console.log("CARD DATA: ", data);
      cardData = data;
    }
    // console.log(cardData);

    if (!Money || Money != UserData.acceptedBid) {
      console.log("Error")
      return;
         }

    const paymentDataToSend = {
      TaskID: UserData._id,
      UserId: UserData.userId,
      UserName: UserData.userName,
      AssignedToId: UserData.taskAssignTo,
      amount: UserData.acceptedBid,
      method: UserData.paymentMethod,
      cardName: cardData.holder,
      cardNumber: cardData.number,
      cardExpiry: cardData.expiration,
    };
    console.log(paymentDataToSend);

    fetch(`${Url}/payment/CardPayment`, {
      method: "POST",
      body: JSON.stringify(paymentDataToSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setModalVisible(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePostedTask = () => {
    setModalVisible(!modalVisible);
    navigation.replace("Feedback", {UserData});
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={20}
      style={styles.container}
    >
      <View style={styles.TotalPayment}>
        <Text style={styles.TotalPaymentText}>
          Your Task Has Been Completed
        </Text>
        <Text style={styles.TotalPaymentText}>
          Please Enter your Card Details and Pay Rs.{UserData.acceptedBid}
        </Text>
      </View>
      <CreditCard
        ref={creditCardRef}
        labels={{ holder: "Name", expiration: "Expiry", cvv: "CVV" }}
      />
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(money) => setMoney(money)}
          underlineColorAndroid="#f000"
          keyboardType="numeric"
          placeholder="Enter Your Amount"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          returnKeyType="next"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.ButtonView}>
        <Pressable title="Submit" onPress={handleSubmit}>
          <Text style={styles.ButtonInside}>Submit</Text>
        </Pressable>
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
            <Feather
              style={styles.icons}
              name="check-circle"
              size={50}
              color="#3dabbc"
            />
            <Text style={styles.modalText}>
              Your Payment has been paid successfully
            </Text>
            <Text style={styles.modalText}>Please Give the FeedBack</Text>
            <View style={styles.buttonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handlePostedTask}
              >
                <Text style={styles.textStyle}>FeedBack</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
    </KeyboardAvoidingView>
  );
};

export default CardPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  ButtonView: {
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3CAABB",
    borderRadius: 10,
  },
  ButtonInside: {
    paddingHorizontal: 80,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
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
  TotalPayment: {
    margin: 20,
    padding: 10,
  },
  TotalPaymentText: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  mainBody: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "white",
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
