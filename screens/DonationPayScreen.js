import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 가져오기

const DonationPayScreen = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const {id, apiUrl} = useContext(AppContext);
  const route = useRoute();
  const fundraisingId = route.params?.fundraisingId;
  const navigation = useNavigation(); // 네비게이션 객체 사용
  const [isSubmitting, setIsSubmitting] = useState(false);  // 추가: 버튼 클릭 상태를 관리하기 위한 상태
  //console.log(fundraisingId)

  const handleDonation = async () => {
    if (!amount) {
      Alert.alert("입력 오류", "액수를 입력하세요.");
      return;
    }

    setIsSubmitting(true);  // 버튼을 비활성화 상태로 설정

    try {
      const response = await axios.post(`${apiUrl}/fundraising_user/add/`, {
        id: fundraisingId,
        user_id: id,
        amount: parseInt(amount, 10) //parseInt(amount, 10)  금액을 정수로 변환
      });

      if (response.status === 200) {
        Alert.alert("감사합니다!", `당신의 ${amount}원이 정상적으로 입금되었습니다.`);
        navigation.goBack(); // 이전 화면으로 돌아가기
      } else {
        throw new Error('Unable to process the donation');
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        
        // 필요한 경우 여기에 로그를 남기거나 상태를 업데이트할 수 있습니다.
        Alert.alert("오류", "한 모금에 두번 기부하실 수 없습니다.");
        console.log('500 Method Not Allowed - The method is not supported for the requested URL.');
        //setRegionBoards([]); // 오류 발생시에도 빈 배열로 설정
      }
      else{
        console.error('Donation failed:', error);
      Alert.alert("오류", "기부에 실패했습니다.");
      //console.log(fundraisingId, id,  amount)
      }
      
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
