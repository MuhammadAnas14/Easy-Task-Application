import React, { useState, useCallback, useEffect } from 'react'
import {View, Text, StyleSheet,} from "react-native";
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Url from '../../Components/Url';

const ChatScreen = ({navigation,route}) =>{
    const metadata = route.params.data;
    const [UserData, setUserData] = useState({});

    const [Messages, setMessages] = useState([]);
    
    useEffect(() => {
      AsyncStorage.getItem("user").then((value) =>
        setUserData(JSON.parse(value)),
      );
    },[]);

    useEffect(()=>{
      const timer = setTimeout(()=>{
        getMessages()
    },5000)
    return () => clearTimeout(timer);
    })

    const getMessages = async () => {
      let userID;
    
      userID = await AsyncStorage.getItem("user").then((value) => {
        const getUser = JSON.parse(value);
  
        return getUser._id;
      });
      const chat = {
        sender: userID,
        reciever: metadata.id,
      }
      await fetch(`${Url}/Chats/GetMessages`, {
        method: "POST",
        body: JSON.stringify(chat),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => 
        res.json()
      )
      .then((response) => {
        console.log("hello",response.MessLogs.messages)
        let arrMsg = GiftedChat.append([], response.MessLogs.messages);
        arrMsg = arrMsg.sort((a,b)=> 
          Date.parse(b.createdAt) - Date.parse(a.createdAt)
        )
        setMessages(arrMsg)
      })
      .catch((error) => {
        console.log(error)
      })
    }


    useEffect(() => {
        setMessages([],)
      }, [])
      console.log("efhew",Messages)
      const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        console.log("im the messages",messages);
        let userID;
        
    
      userID = await AsyncStorage.getItem("user").then((value) => {
        const getUser = JSON.parse(value);
  
        return getUser._id;
      });
      const chat = {
        sender: userID,
        reciever: metadata.id,
        messages: messages,
      }
      await fetch(`${Url}/Chats/MessageLogs`, {
        method: "POST",
        body: JSON.stringify(chat),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => 
        res.json()
      )
      .then((response) => {
        
      })
      .catch((error) => {
        console.log(error)
      })
      }, [])
    
    const renderSend = (props) =>{
        return(
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons name='send-circle' size={32} color='#7AC4CF'
                    style={{marginBottom:5, marginRight:5}}/>
                </View>
            </Send>
        )
    }
    const renderBubble = (props) =>{
        return(
        <Bubble 
            {...props}
            wrapperStyle={{
                right:{
                    backgroundColor: '#7AC4CF'
                }
            }}
            textStyle={{
                right:{
                    color: '#fff'
                }
            }}
        />
        )
    }
    const scrollToBottomComponent = () => {
        return(
          <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
      }


      return(
        <GiftedChat
        messages={Messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: UserData._id,
          name:UserData.firstName,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    }
})