//회원가입칸
/*
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [gender, setGender] = useState(null); // 성별 상태 추가

  const handleBack = () => {
    navigation.goBack();
  };

  const checkDuplicate = () => {
    // 중복 확인 로직 구현
  };

  // 성별 선택 핸들러
  const selectGender = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>회원가입</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="id" style={styles.input} />
        <TouchableOpacity onPress={checkDuplicate} style={styles.checkButton}>
          <Text style={styles.checkButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>
      <TextInput placeholder="password" style={styles.input} secureTextEntry />
      <TextInput placeholder="이름" style={styles.input} />
      <View style={styles.inputContainer}>
        <TextInput placeholder="닉네임" style={styles.input} />
        <TouchableOpacity onPress={checkDuplicate} style={styles.checkButton}>
          <Text style={styles.checkButtonText}>중복확인</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="주민등록번호 앞자리"
        style={styles.input}
        keyboardType="numeric"
        maxLength={6} // 주민등록번호는 6자리로 제한
      />
      <TextInput
        placeholder="휴대전화"
        style={styles.input}
        keyboardType="phone-pad"
        maxLength={11} // 휴대전화는 11자리로 제한
      />
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'male' ? styles.selected : styles.notSelected]}
          onPress={() => selectGender('male')}
        >
          <Text style={styles.genderButtonText}>남자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'female' ? styles.selected : styles.notSelected]}
          onPress={() => selectGender('female')}
        >
          <Text style={styles.genderButtonText}>여자</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>확인</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 20,
    color: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    flex: 1,
  },
  checkButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#C0C0C0',
    borderRadius: 4,
  },
  checkButtonText: {
    fontSize: 14,
    color: '#000',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genderButton: {
    padding: 10,
    borderRadius: 4,
    width: '45%',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 10
  },
  genderButtonText: {
    fontSize: 16,
    color: '#000',
  },
  notSelected: {
    backgroundColor: '#FFFFFF',
  },
  selected: {
    backgroundColor: '#a0a0a0',
  },
  confirmButton: {
    backgroundColor: '#a0a0a0',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    //marginTop: 10, // 버튼을 더 아래로 내림
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

export default SignUpScreen;*/


import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AppContext } from '../AppContext';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { apiUrl } = useContext(AppContext);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [resident, setResident] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const user = {
      id,
      nickname,
      name,
      phone,
      gender,
      resident,
      password: pw,
      message
    };

    try {
      const response = await axios.post(`${apiUrl}/user/create/`, user); // API URL 수정
      console.log(response.data);
      alert('회원가입이 완료되었습니다.');
      navigation.goBack(); // 회원가입 후 이전 페이지로 이동
    } catch (error) {
      console.error('Request Error:', error.message);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      if (error.response) {
        // 서버 응답을 받았으나 요청이 2xx 범위를 벗어난 경우
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
      } else if (error.request) {
        // 요청이 이루어졌으나 응답을 받지 못한 경우
        console.error('No response:', error.request);
      } else {
        // 요청 설정 시 문제가 발생한 경우
        console.error('Error Message:', error.message);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>회원가입</Text>
      <TextInput placeholder="id" style={styles.input} onChangeText={setId} />
      <TextInput placeholder="password" style={styles.input} onChangeText={setPw} secureTextEntry />
      <TextInput placeholder="name" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="nickname" style={styles.input} onChangeText={setNickname} />
      <TextInput placeholder="주민등록번호 앞자리" style={styles.input} onChangeText={setResident} keyboardType="numeric" maxLength={6} />
      <TextInput placeholder="휴대전화" style={styles.input} onChangeText={setPhone} keyboardType="phone-pad" maxLength={11} />
      <TextInput placeholder="message" style={styles.input} onChangeText={setMessage} maxLength={100} />
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'M' ? styles.selected : styles.notSelected]}
          onPress={() => setGender('M')}
        >
          <Text style={styles.genderButtonText}>남자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'W' ? styles.selected : styles.notSelected]}
          onPress={() => setGender('W')}
        >
          <Text style={styles.genderButtonText}>여자</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
        <Text style={styles.confirmButtonText}>확인</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 20,
    color: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    flex: 1,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genderButton: {
    padding: 10,
    borderRadius: 4,
    width: '45%',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 10
  },
  genderButtonText: {
    fontSize: 16,
    color: '#000',
  },
  notSelected: {
    backgroundColor: '#FFFFFF',
  },
  selected: {
    backgroundColor: '#a0a0a0',
  },
  confirmButton: {
    backgroundColor: '#a0a0a0',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

export default SignUpScreen;

