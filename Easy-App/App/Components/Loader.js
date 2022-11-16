import { requestBackgroundPermissionsAsync } from 'expo-location';
import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator, Text} from 'react-native';

const Loader = (props) => {
  const {loading, ...attributes} = props;

  return (
    <Modal
      transparent={true}
      backgroundColor = "White"
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color="#3CAABB"
            size="large"
            style={styles.activityIndicator}
          />
          <Text style={styles.textstyle}>Loading</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor:'rgba(255,255,255,0.4)',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    height: 80,
    width: 80,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 120,
  },
  textstyle:{
    color:"#3CAABB",
    fontSize:16
  }
});