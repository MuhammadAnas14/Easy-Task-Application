import React, {useState} from 'react';
import {Platform, FlatList, Alert ,View,Text,StyleSheet} from 'react-native';

const PostTask = () => {
    const[services,setservices]=useState([])
    return (
       <View style={styles.container}>
         <FlatList
            data={ }
            renderItem={ ({item}) =>
              <View style={styles.GridViewContainer}>
               <Text style={styles.GridViewTextLayout} > {item.key} </Text>
              </View> }
            numColumns={3}
         />
       </View>
    );
}
export default PostTask;

const styles = StyleSheet.create({
headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  GridViewContainer: {
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
   height: 100,
   margin: 5,
   backgroundColor: '#7B1FA2'
},
GridViewTextLayout: {
   fontSize: 20,
   fontWeight: 'bold',
   justifyContent: 'center',
   color: '#fff',
   padding: 10,
 },
})