import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext';
import { useRoute } from '@react-navigation/native';

const DonationPayScreen = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const {id, apiUrl} = useContext(AppContext);
  const route = useRoute();
  const fundraisingId = route.params?.fundraisingId;
  console.log(fundraisingId)

  const handleDonation = async () => {
    
    try {
      const response = await axios.post(`${apiUrl}/fundraising_user/add/`, {
        id: fundraisingId,
        user_id: id,
        amount: parseInt(amount, 10) //parseInt(amount, 10)  금액을 정수로 변환
      });

      if (response.status === 200) {
        Alert.alert("감사합니다!", `당신의 $${amount}원이 정상적으로 입금되었습니다.`);
      } else {
        throw new Error('Unable to process the donation');
      }
    } catch (error) {
      console.error('Donation failed:', error);
      Alert.alert("Error", "Failed to process donation.");
      console.log(fundraisingId, id,  amount)
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Donate Now</Text>

      <TextInput
        style={styles.input}
        placeholder="액수/원"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="MM/YY"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="CVV"
          keyboardType="numeric"
          secureTextEntry
          value={cvv}
          onChangeText={setCvv}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleDonation}>
        <Text style={styles.buttonText}>Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default DonationPayScreen;
