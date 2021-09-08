import React from 'react'
import {Platform, FlatList, Alert ,View,Text,StyleSheet} from 'react-native';


const HomeStack = () => {
    return (
        <View style={styles.mainBody}>
        <Text>Hello, Peter</Text>
        <Text>ALL CATEGORIES WITH ICON and add other stacks</Text>
        </View>
    );
}
export default HomeStack;

const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
      alignContent: 'center',
      textAlign: 'center',
    },
})