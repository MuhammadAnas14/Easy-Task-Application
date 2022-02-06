import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Modal,
  Pressable,
} from "react-native";
import Url from "../../Components/Url";
import Feather from "react-native-vector-icons/Feather";

const CodPayment = ({ navigation, route }) => {
  const [Money, setMoney] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const UserData = route.params.Data;

  const paymentSubmitHandler = async () => {
    if (!Money || Money != UserData.acceptedBid) {
      return;
    }

    const paymentDataToSend = {
      TaskID: UserData._id,
      UserId: UserData.userId,
      UserName: UserData.userName,
      AssignedToId: UserData.taskAssignTo,
      amount: UserData.acceptedBid,
      method: UserData.paymentMethod,
    };
    console.log(paymentDataToSend);

    await fetch(`${Url}/payment/CodPayment`, {
      method: "POST",
      body: JSON.stringify(paymentDataToSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if(response.success){
          setModalVisible(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePostedTask = () => {
    setModalVisible(!modalVisible);
    navigation.replace("Feedback", {UserData});
  };

  return (
    <View style={styles.mainBody}>
      <View style={styles.TotalPayment}>
        <Text style={styles.TotalPaymentText}>
          Your Task Has Been Completed
        </Text>
        <Text style={styles.TotalPaymentText}>Please Pay Rs.{UserData.acceptedBid}</Text>
      </View>
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
      <View style={styles.bottomView}>
        <Button
          style={{ paddingHorizontal: 50 }}
          title={"Confirm Your Order"}
          onPress={paymentSubmitHandler}
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
    </View>
  );
};

export default CodPayment;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "white",
  },
  TotalPayment: {
    margin: 20,
    padding: 10,
  },
  TotalPaymentText: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 55,
    marginRight: 55,
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
  bottomView: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
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
