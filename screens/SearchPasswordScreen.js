//비밀번호 찾기 화면


import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchPasswordScreen = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch('http://20.39.190.194/users/');
      const users = await response.json();

      const user = users.find(user => user.id === id && user.phone === phone);
      if (user) {
        setPassword(user.password);
      } else {
        Alert.alert("사용자를 찾을 수 없습니다", "ID와 휴대전화 번호를 다시 확인해주세요.");
        setPassword('');
      }
    } catch (error) {
      Alert.alert("Error", "데이터를 가져오는 데 문제가 발생했습니다.");
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    if (password) {
      Clipboard.setString(password);
      Alert.alert('알림', '비밀번호가 클립보드에 복사되었습니다.');
    } else {
      Alert.alert('알림', '복사할 비밀번호가 없습니다.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>비밀번호 찾기</Text>
      <TextInput
        placeholder="ID"
        style={styles.input}
        onChangeText={setId}
        value={id}
      />
      <TextInput
        placeholder="휴대전화"
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
      />
      <View style={styles.passwordContainer}>
        {password !== '' && (
          <>
            <TextInput placeholder="Password" style={styles.input} value={password} editable={false} />
            <TouchableOpacity onPress={copyToClipboard}>
              <Icon name="content-copy" size={20} color="#000" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>확인</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row', // 수평 정렬
    justifyContent: 'space-between', // 요소들 사이의 공간 분배
    alignItems: 'center', // 세로축 가운데 정렬
    marginBottom: 20,
  },
  copyButton: {
    marginLeft: 10,
    backgroundColor: '#a0a0a0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5, // 버튼 둥근 모서리
  },
  copyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold', // 버튼 내 텍스트 굵기
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 20,
    color: '#000000',
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
    borderColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor:'#a0a0a0',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchPasswordScreen;


