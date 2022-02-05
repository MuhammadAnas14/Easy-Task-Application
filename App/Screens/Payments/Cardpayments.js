import * as React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  Pressable,
  Text,
} from 'react-native';
import CreditCard from 'react-native-credit-card-form-ui';

export default function CardPayment() {
  const creditCardRef = React.useRef();

  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      console.log('ERROR: ', error);
      console.log('CARD DATA: ', data);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20}
      style={styles.container}
    >
      <CreditCard ref={creditCardRef} labels={{ holder: 'Name', expiration: 'Expiry', cvv: 'CVV' }}/>
      <View style = {styles.ButtonView}>
        <Pressable title="Submit" onPress={handleSubmit}>
            <Text style={styles.ButtonInside}>Submit</Text>

        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonView:{
    marginTop:50,
    padding:15,
    backgroundColor:"#3CAABB",
    borderRadius:10,
  },
  ButtonInside:{
      paddingHorizontal:80,
      color:"white",
      fontWeight:"bold",
      fontSize:20,
  }
});