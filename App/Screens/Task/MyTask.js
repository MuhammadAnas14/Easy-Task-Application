import React ,{useEffect, useState}from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Data from '../Data/MyTaskData.json'
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Url from '../../Components/Url';

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30}} />
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{item.name}</Text>
        <View style={styles.location}>
            <Entypo style={styles.icons}  name="location-pin" />
            <Text>{item.position}</Text>
        </View>
        <Text>{item.comments} Comments</Text>
      </View>
      <View style={styles.bugget}>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:"white",backgroundColor:"#3CAABB",padding:5}}>Open</Text>
      </TouchableOpacity>
      <Text style={{color:"#3CAABB",paddingRight:5}}>Rs.{item.cost}</Text>
      </View>
    </View>
  );
}

const PostedTask  = () => {
    
    const [TaskData, setTaskData] = useState(Data);
    const [UserData, setUserData] = useState("");

    AsyncStorage.getItem("user").then((value) => setUserData(JSON.parse(value)));

    const GetMyTask = async () => {

      const Id = {UserId: UserData._id}
      
      await fetch(`${Url}/task/MyTask`, {
        method: "POST",
        body: JSON.stringify(Id),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => 
        res.json()
      )
      .then((response) => {
        console.log(response.UserTask)
      })
      .catch((error) => {
        console.log(error)
      })
    }

    useEffect(()=> {
      GetMyTask()
    },[]);

    return (
      <View style={styles.container}>
        <FlatList
          style={{flex:1}}
          data={TaskData}
          renderItem={({ item }) => <Item item={item}/>}
          keyExtractor={item => item.email}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:10
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  },
  location:{
      flexDirection:'row'
  },
  icons:{
      margin:5
  },
  bugget:{
    flexDirection:"column"
},
});
export default PostedTask