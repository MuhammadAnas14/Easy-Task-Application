import React,{useState} from 'react'
import {View ,Text,TextInput,StyleSheet,FlatList,Image,TouchableOpacity} from 'react-native'
import Data from '../Data/MyTaskData.json'


function LiveTaskItem({item}){

    return(
        <View style={styles.listItem}>
        <View style={{alignItems:"center",flex:1,}}>
          <Text style={{fontWeight:"bold",}}>{item.name}</Text>
          <Text>{item.comments} Comments</Text>
        </View>
        <View style={styles.bugget}>
        <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"white",backgroundColor:"#3CAABB",padding:5}}>Open</Text>
        </TouchableOpacity>
        <Text style={{color:"#3CAABB",paddingRight:5}}>Rs.{item.cost}</Text>
        </View>
      </View>
    )
}

const LiveTasks = () => {

    const [TaskData, setTaskData] = useState(Data)
    return(
        <View style={styles.container}>
            <FlatList
              style={{flex:1}}
              data={TaskData}
              renderItem={({ item }) => <LiveTaskItem item={item}/>}
              keyExtractor={item => item._id}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
      marginTop:10
    },
    listItem:{
      marginTop:10,
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

export default LiveTasks