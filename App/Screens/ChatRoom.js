import React ,{useState}from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import MessageData from './Data/Chat.json'

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30}} />
      <View style={{margin:4,flex:1}}>
        <Text style={{fontWeight:"bold",margin:3}}>{item.name}</Text>
        <Text style={{margin:3}}>{item.chat} </Text>
      </View>
    </View>
  );
}

const PostedTask  = () => {
    
    const [TaskData, setTaskData] = useState(MessageData)


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
    width:"90%",
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