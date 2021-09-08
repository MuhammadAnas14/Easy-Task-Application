import React ,{useState}from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import Data from './Data/Data.json'
import Entypo from 'react-native-vector-icons/Entypo';
import { color } from 'react-native-elements/dist/helpers';

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
    
    const [TaskData, setTaskData] = useState(Data)


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