
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Clipboard from '@react-native-community/clipboard'; // 복사 기능을 위한 모듈 가져오기
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Icon 추가

const SearchPasswordScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState(''); // 비밀번호 상태

  // 뒤로가기 핸들러
  const handleBack = () => {
    navigation.goBack();
  };

  // 비밀번호 확인 핸들러
  const handleConfirm = () => {
    // 비밀번호 검색 로직 구현 부분
    setPassword('YourPassword'); // 예시 비밀번호 설정
  };

  // 클립보드에 복사 핸들러
  const copyToClipboard = () => {
    Clipboard.setString(password); // 비밀번호 클립보드에 복사
    alert('비밀번호가 클립보드에 복사되었습니다.'); // 사용자에게 알림
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>비밀번호찾기</Text>
      <TextInput placeholder="id" style={styles.input} />
      <TextInput placeholder="휴대전화" style={styles.input} />
      <View style={styles.passwordContainer}>
        {password !== '' && (
          <>
            <TextInput placeholder="password" style={styles.input} value={password} editable={false} />
            <TouchableOpacity onPress={copyToClipboard} >
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
  // ... 이전 스타일
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
