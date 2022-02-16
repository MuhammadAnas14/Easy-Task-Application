import React ,{useEffect, useState}from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Url from '../../Components/Url';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../Components/Loader';
import DefaultImage from '../../../assets/default-pic.jpg'

function Item({ item }) {

  const navigation = useNavigation();
  const [locationMethod,setLocationMethod] = useState("Online");
  const [imageDefault, setImageDefault] = useState("");


  const tracklocation = () => {

    if(item.taskMethod == "live" && item.status == "0.17"){
      navigation.navigate('Live Tracking',{item})
    }
    if(item.taskMethod == "live" && item.status == "0.25"){
      const toSendData={
        latitude:item.latitude,
        longitude:item.longitude,
        assignTo:item.taskAssignTo
      }
      console.log("Data",toSendData)
       navigation.navigate('Track Location',{item:toSendData})
    }
    if(item.taskMethod == "Online" || item.taskMethod== "Scheduled"){
      navigation.navigate('Task Details',{item})
    }
  }  

  useEffect(() => {
  
    if (item.taskLocation){
      setLocationMethod(item.taskLocation)
    }
    else{
      setLocationMethod("Online")
      item.taskLocation= "Online"
    }
    if (item.userPhoto === ""){
      setImageDefault(DefaultImage)
    }
    else{
      setImageDefault({uri:`data:image/jpg;base64,${item.userPhoto}`})
    }
    }, [])

  return (
    <View style={styles.listItem}>
      {/* <Image source={{uri:`data:image/jpg;base64,${item.userPhoto}`}}  style={{width:60, height:60,borderRadius:30}} /> */}
      <Image source={imageDefault}  style={{width:60, height:60,borderRadius:30}} />
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{item.taskName}</Text>
        <View style={styles.location}>
            <Entypo style={styles.icons}  name="location-pin" />
            <Text>{locationMethod}</Text>
        </View>
        <Text>{item.comments} Comments</Text>
      </View>
      <View style={styles.bugget}>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}} onPress={tracklocation}>
        <Text style={{color:"white",backgroundColor:"#3CAABB",padding:5}}>Open</Text>
      </TouchableOpacity>    
      <Text style={{color:"#3CAABB",paddingRight:5}}>Rs.{item.taskBudget}</Text>
      </View>
    </View>
  );
}

const PostedTask  = () => {
    
    const [TaskData, setTaskData] = useState("");
    const [UserData, setUserData] = useState("");
    const [Loading, setLoading] = useState(true);
    

    const GetMyTask = async () => {

      let userID;
      userID = await AsyncStorage.getItem("user").then((value) => {
        const getUser= JSON.parse(value);
        console.log("user = ",getUser)
        return getUser._id
      });
      const Id = {UserId: userID}
      
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
        setTaskData(response.UserTask)
      })
      .catch((error) => {
        console.log(error)
      })
    }

    useEffect(()=> {
      GetMyTask();
      setLoading(false);
      
    },[]);

    console.log(TaskData)
    return (
      <View style={styles.container}>
        <Loader loading={Loading} />
        <FlatList
          style={{flex:1}}
          data={TaskData}
          renderItem={({ item }) => <Item item={item}/>}
          keyExtractor={item => item.taskName}
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