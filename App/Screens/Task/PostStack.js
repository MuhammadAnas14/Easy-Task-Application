import React, {useState} from 'react';
import {Platform, FlatList, Alert ,View,Text,StyleSheet, Pressable,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import Categories from '../Data/Categories.json'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PostTask = ({navigation}) => {
    const[services,setservices]=useState(Categories)

    const postTaskDetailHandler = (selectedCategory) => {
      navigation.navigate("PostTaskManager",{Category:selectedCategory})
    }
    return (
       <View style={styles.container}>
         <FlatList
            data={services}
            renderItem={ ({item}) =>
              <View style={styles.GridViewContainer}>
                <Pressable onPress={() => postTaskDetailHandler(item.key)}>
               <MaterialCommunityIcons  
              name={item.icon}
              size= {60}
              color= "#3CAABB"/>
               <Text style={styles.GridViewTextLayout} > {item.key} </Text>
               </Pressable>
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