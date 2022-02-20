import React, { useState, useCallback, useEffect } from 'react'
import {View, Text, StyleSheet,} from "react-native";
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Url from '../../Components/Url';

const ChatScreen = ({navigation,route}) =>{
    const metadata = route.params.data;

    const [messages, setMessages] = useState([]);

    useEffect(()=>{
      getMessages();
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
        setMessages(response.MessLogs.messages);
      })
      .catch((error) => {
        console.log(error)
      })
    }

    const sentMessages = async (newMess) => {
      let userID;
    
      userID = await AsyncStorage.getItem("user").then((value) => {
        const getUser = JSON.parse(value);
  
        return getUser._id;
      });
      const chat = {
        sender: userID,
        reciever: metadata.id,
        messages: newMess,
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
    }


    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello World',
            createdAt: "2022-02-20T18:45:24.479Z",
            user: {
              _id: 2,//worker =2 
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ],)
      }, [])
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        console.log("im the messages",messages);
        sentMessages(messages);
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
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 2,
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