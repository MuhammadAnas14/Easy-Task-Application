import React ,{useState,useEffect}from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { color } from 'react-native-elements/dist/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Url from '../../Components/Url'
import Loader from '../../Components/Loader'
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import DefaultImage from '../../../assets/default-pic.jpg'

function Item({ item}) {

  const navigation = useNavigation();
  const [locationMethod,setLocationMethod] = useState("Online");
  const [imageDefault, setImageDefault] = useState(DefaultImage);

  const tracklocation = () => {
    navigation.navigate('Task Details',{item})
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
        <Text>Total Bids: {item.totalbids}</Text>
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

    const [TaskData, setTaskData] = useState("")
    const [LoginData,setLoginData] = useState("");
    const [loading, setLoading] = useState(true);

    //Refresh Data
    const Refresh = () => {
      data();
    }
    

    // Getting Data from Backend
    const data = async () => {

      await fetch(`${Url}/task/Collection`,{
        method:'GET',
      })
      .then(response => response.json())
      .then(response=> {
        // console.log(response.success)
        if(response.success){
          console.log(response.success)
        }
        setTaskData(response.data)
        setLoading(false);
      })
      .catch(error => console.log(error))
      }
  
   useEffect(() =>  {
    data();  
  }, []);
  

    return (
      <View style={styles.container}>
      <Loader loading={loading} />
        <FlatList
          style={{flex:1}}
          data={TaskData}
          renderItem={({ item}) => <Item item={item}/>}
          keyExtractor={item => item._id}
          // onRefresh={Refresh}
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