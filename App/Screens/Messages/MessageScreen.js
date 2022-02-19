import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  button,
} from "react-native";
import MessageData from "../Data/Chat.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../Styles/Messagestyle";
import Url from '../../Components/Url'

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      {/* <Image
        source={{ uri: item.photo }}
        style={{ width: 60, height: 60, borderRadius: 30 }}
      />
      <View style={{ margin: 4, flex: 1 }}>
        <Text style={{ fontWeight: "bold", margin: 3 }}>{item.name}</Text>
        <Text style={{ margin: 3 }}>{item.chat} </Text>
      </View> */}

      <UserInfo>
        <UserImgWrapper>
          <UserImg source={{ uri: item.photo }} />
        </UserImgWrapper>
        <TextSection>
          <UserInfoText>
            <UserName>{item.name}</UserName>
            <PostTime>{item.messageTime}</PostTime>
          </UserInfoText>
          <MessageText>{item.chat}</MessageText>
        </TextSection>
      </UserInfo>
    </View>
  );
}

const MessagesScreen = ({ navigation }) => {
  const [TaskData, setTaskData] = useState(MessageData);//api data
    
  // Getting Data from Backend
    const data = async () => {
      let userId;

      userId = await AsyncStorage.getItem("user").then((value) => {
        const getUser = JSON.parse(value);
        return getUser._id;
      });
      console.log(userId);
      await fetch(`${Url}/Chats/GetLog`,{
        method: 'POST',
        body: JSON.stringify(userId),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(response=> {
        console.log(response.success)
        if(response.success){
          // setTaskData(response);
          console.log("successful")
        }
      })
      .catch(response => console.log(response))
    }

      useEffect(() =>  {
        data();  
      }, []);
      
  return (
    <View style={styles.container}>
      <Container>
        <FlatList
          style={{ flex: 1 }}
          data={TaskData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card onPress={() => navigation.navigate("Chat", {userName: item.name})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={{ uri: item.photo }} />
                </UserImgWrapper> 
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.name}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.chat}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
