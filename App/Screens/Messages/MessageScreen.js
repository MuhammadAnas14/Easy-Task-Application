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
import DefaultImage from "../../../assets/default-pic.jpg";
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

const MessagesScreen = ({ navigation }) => {
  let [logs,setlogs] =useState(MessageData) ;
  const [TaskData, setTaskData] = useState(MessageData);//api data
    
  // Getting Data from Backend
    const data = async () => {
      let UserId;

      UserId = await AsyncStorage.getItem("user").then((value) => {
        const getUser = JSON.parse(value);
        return getUser._id;
      });
      console.log(UserId);
      await fetch(`${Url}/Chats/GetLog`,{
        method: 'POST',
        body: JSON.stringify({UserId:UserId}),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(response=> {
        console.log(response.success)
        if(response.success){
          // setTaskData(response);
          let data = response.ChatLogs;
          let tosave = [];
          let logs1 = [];
          for(let X in data){
            if(data[X].PosterId === UserId){
              let tosave = {
                id: data[X].workerId,
                name: data[X].workername,
                messageTime: data[X].ChatTime,
                userPhoto: data[X].workerpic
              }
              console.log("as an poster",tosave)
              logs1.push(tosave);
            }
            else{
              let tosave={
                id: data[X].PosterId,
                name: data[X].postername,
                messageTime: data[X].ChatTime,
                userPhoto: data[X].posterpic,
              }
              console.log("as an worker",tosave);
              logs1.push(tosave);
            }
            
          }
          setlogs(logs1);
          console.log(response.ChatLogs);
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
          data={logs}
          keyExtractor={(item) => item.messageTime}
          renderItem={({ item }) => ( 
            <Card onPress={() => navigation.navigate("Chat", {data: item})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userPhoto  === "" ?  DefaultImage :{ uri: `data:image/jpg;base64,${item.userPhoto}` }} />
                </UserImgWrapper> 
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.name}</UserName>
                    <PostTime>{item.messageTime.slice(11,16)}             </PostTime>
                  </UserInfoText>
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
