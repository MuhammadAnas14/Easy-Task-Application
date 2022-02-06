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
      <View style={styles.TotalPayment}>
        <Text style={styles.TotalPaymentText}>
          Your Task Has Been Completed
        </Text>
        <Text style={styles.TotalPaymentText}>Please Pay Rs.{UserData.acceptedBid}</Text>
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={(money) => setMoney(money)}
          underlineColorAndroid="#f000"
          keyboardType="numeric"
          placeholder="Enter Your Amount"
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
          returnKeyType="next"
          blurOnSubmit={false}
        />
      </View>
      <CreditCard ref={creditCardRef} labels={{ holder: 'Name', expiration: 'Expiry', cvv: 'CVV' }}/>
      <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(money) => setMoney(money)}
            underlineColorAndroid="#f000"
            keyboardType="numeric"
            placeholder="Enter Your Amount"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            returnKeyType="next"
            blurOnSubmit={false}
          />
        </View>
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
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 55,
    marginRight: 55,
    marginBottom: 20,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#3CAABB",
  },
});