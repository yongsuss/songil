//회원가입칸
/*
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    if (!id.trim() || !pw.trim() || !name.trim() || !nickname.trim() || !resident.trim() || !phone.trim()) {
      alert('모든 필드를 채워주세요.');
      return false;
    }
    return true;
  };

  const checkId = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/check/id/${id}`);
      if (response.status === 200) {
        alert('이미 사용 중인 아이디입니다.');
        
      } else {
        alert('사용 가능한 아이디입니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('사용 가능한 아이디입니다.');
      } else {
        alert('아이디 확인 중 오류가 발생했습니다.');
      }
    }
};

const checkNickname = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/check/nickname/${nickname}`);
      if (response.status === 200) {
        alert('이미 사용 중인 닉네임입니다.');
        
      } else {
        alert('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('사용 가능한 닉네임입니다.');
      } else {
        alert('닉네임 확인 중 오류가 발생했습니다.');
      }
    }
};



  
  const handleSubmit = async () => {
    if (!validateInput()) return;

    setLoading(true);
    const user = { id, nickname, name, phone, gender, resident, password: pw, message };
    try {
      const response = await axios.post(`${apiUrl}/user/create/`, user);
      alert('회원가입이 완료되었습니다.');
      navigation.goBack();
    } catch (error) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>회원가입</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="id" style={styles.input} onChangeText={setId} />
        <TouchableOpacity onPress={checkId} style={styles.checkButton}>
          <Text style={styles.checkButtonText}>중복 확인</Text>
        </TouchableOpacity>
      </View>
      <TextInput placeholder="password" style={styles.input} onChangeText={setPw} secureTextEntry />
      <TextInput placeholder="name" style={styles.input} onChangeText={setName} />
      <View style={styles.inputContainer}>
        <TextInput placeholder="nickname" style={styles.input} onChangeText={setNickname} />
        <TouchableOpacity onPress={checkNickname} style={styles.checkButton}>
          <Text style={styles.checkButtonText}>중복 확인</Text>
        </TouchableOpacity>
      </View>
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
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.confirmButtonText}>확인</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 15,
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
    backgroundColor: '#a0a0a0',
    padding: 10,
  },
  checkButtonText: {
    color: '#FFFFFF',
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
    marginTop: 10,
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

export default SignUpScreen;*/

import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AppContext } from '../AppContext';

const validateId = (id) => {
  const regex = /^[A-Za-z0-9_-]{6,16}$/;
  return regex.test(id);
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password) && !(/(\w)\1\1/.test(password)); // 연속되는 같은 문자 3개 이상 제한
};

const validateInput = () => {
  if (!id.trim() || !pw.trim() || !name.trim() || !nickname.trim() || !resident.trim() || !phone.trim()) {
    alert('모든 필드를 채워주세요.');
    return false;
  }
  if (!validateId(id)) {
    alert('아이디는 6~16자의 영문자, 숫자, 특수문자(_, -)만 사용 가능합니다.');
    return false;
  }
  if (!validatePassword(pw)) {
    alert('비밀번호는 8자 이상이며, 대소문자, 숫자, 특수문자를 모두 포함해야 하며, 연속적인 문자나 너무 단순한 패턴을 피해야 합니다.');
    return false;
  }
  return true;
};


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
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    if (!id.trim() || !pw.trim() || !name.trim() || !nickname.trim() || !resident.trim() || !phone.trim()) {
      alert('모든 필드를 채워주세요.');
      return false;
    }
    return true;
  };

  const checkId = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/check/id/${id}`);
      if (response.status === 200) {
        alert('이미 사용 중인 아이디입니다.');
        
      } else {
        alert('사용 가능한 아이디입니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('사용 가능한 아이디입니다.');
      } else {
        alert('아이디 확인 중 오류가 발생했습니다.');
      }
    }
};

const checkNickname = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/check/nickname/${nickname}`);
      if (response.status === 200) {
        alert('이미 사용 중인 닉네임입니다.');
        
      } else {
        alert('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('사용 가능한 닉네임입니다.');
      } else {
        alert('닉네임 확인 중 오류가 발생했습니다.');
      }
    }
};



  
const handleSubmit = async () => {
  if (!validateInput()) return; // 모든 필드가 채워져 있는지 확인

  // 아이디와 비밀번호의 유효성 검사
  if (!validateId(id)) {
    alert('아이디는 6~16자의 영문자, 숫자, 특수문자(_, -)만 사용 가능합니다.');
    return;
  }
  if (!validatePassword(pw)) {
    alert('비밀번호는 8자 이상이며, 대소문자, 숫자, 특수문자를 모두 포함해야 하며, 연속적인 문자나 너무 단순한 패턴을 피해야 합니다.');
    return;
  }

  setLoading(true);
  const user = { id, nickname, name, phone, gender, resident, password: pw, message, address };
  try {
    const response = await axios.post(`${apiUrl}/user/create/`, user);
    alert('회원가입이 완료되었습니다.');
    navigation.goBack();
  } catch (error) {
    alert('회원가입에 실패했습니다. 다시 시도해주세요.');
  } finally {
    setLoading(false);
  }
};


  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>회원가입</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="id" style={styles.input} onChangeText={setId} />
        <TouchableOpacity onPress={checkId} style={styles.checkButton}>
          <Text style={styles.checkButtonText}>중복 확인</Text>
        </TouchableOpacity>
      </View>
      <TextInput placeholder="password" style={styles.input} onChangeText={setPw} secureTextEntry />
      <TextInput placeholder="name" style={styles.input} onChangeText={setName} />
      <View style={styles.inputContainer}>
        <TextInput placeholder="nickname" style={styles.input} onChangeText={setNickname} />
        <TouchableOpacity onPress={checkNickname} style={styles.checkButton}>
          <Text style={styles.checkButtonText}>중복 확인</Text>
        </TouchableOpacity>
      </View>
      <TextInput placeholder="주민등록번호 앞자리" style={styles.input} onChangeText={setResident} keyboardType="numeric" maxLength={6} />
      <TextInput placeholder="휴대전화" style={styles.input} onChangeText={setPhone} keyboardType="phone-pad" maxLength={11} />
      <TextInput placeholder="message" style={styles.input} onChangeText={setMessage} maxLength={100} />
      <TextInput placeholder="address" style={styles.input} onChangeText={setAddress} maxLength={100} />
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'M' ? styles.selected : styles.notSelected]}
          onPress={() => setGender('M')}
        >
          <Text style={styles.genderButtonText}>남자</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'W' ? styles.selected : styles.notSelected]}
        >
          <Text style={styles.genderButtonText}>여자</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.confirmButtonText}>확인</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 15,
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
    backgroundColor: '#a0a0a0',
    padding: 10,
  },
  checkButtonText: {
    color: '#FFFFFF',
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
    marginTop: 10,
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