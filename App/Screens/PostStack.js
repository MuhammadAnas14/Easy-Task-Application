import React, {useState} from 'react';
import {Platform, FlatList, Alert ,View,Text,StyleSheet} from 'react-native';
import Categories from './Data/Categories.json'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PostTask = () => {
    const[services,setservices]=useState(Categories)
    return (
       <View style={styles.container}>
         <FlatList
            data={services}
            renderItem={ ({item}) =>
              <View style={styles.GridViewContainer}>
               <MaterialCommunityIcons  
              name={item.icon}
              size= {60}
              color= "#3CAABB"/>
               <Text style={styles.GridViewTextLayout} > {item.key} </Text>
              </View>  
              
            }
            numColumns={3}
         />
       </View>
    );
}
export default PostTask;

const styles = StyleSheet.create({
  GridViewContainer: {
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
   height: 150,
   margin: 0,
   backgroundColor: 'white'
},
GridViewTextLayout: {
   fontSize: 10,
   fontWeight: 'bold',
   justifyContent: 'center',
   color: '#000',
   padding: 10,
 },
})