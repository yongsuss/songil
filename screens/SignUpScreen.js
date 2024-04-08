/*import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image,
  StatusBar,
} from 'react-native';

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.backIcon} />
        <Text style={styles.headerTitle}>회원가입</Text>
      </TouchableOpacity>
      <View style={styles.form}>
        <TextInput placeholder="id" style={styles.input} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>중복확인</Text>
        </TouchableOpacity>
        <TextInput placeholder="password" secureTextEntry style={[styles.input, styles.inputWithMargin]} />
        <TextInput placeholder="이름" style={[styles.input, styles.inputWithMargin]} />
        <TextInput placeholder="닉네임" style={[styles.input, styles.inputWithMargin]} />
        <TextInput placeholder="전화번호" style={[styles.input, styles.inputWithMargin]} />
        <TextInput placeholder="주소 입력" style={[styles.input, styles.inputWithMargin]} />
      </View>
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>가입</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>취소</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  form: {
    margin: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  inputWithMargin: {
    marginTop: 16,
  },
  button: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#56CCF2',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 32,
    marginHorizontal: 16,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: '#grey',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 16,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SignUpScreen;
//{ navigation }*/
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const SignUpScreen = ({ navigation }) => {
  //const navigation = useNavigation();

  // 뒤로 가기 버튼 핸들러
  const handleBack = () => {
    navigation.goBack();
  };

  // 중복 확인 버튼 핸들러
  const checkDuplicate = () => {
    // 중복 확인 로직 구현
  };
  const checkAdress = () => {
    // 중복 확인 로직 구현
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
      <TextInput placeholder="휴대전화" style={styles.input} />
      <View style={styles.inputContainer}>
        <TextInput placeholder="주소찾기" style={styles.input} />
        <TouchableOpacity onPress={checkAdress} style={styles.checkButton}>
          <Text style={styles.checkButtonText}>주소찾기</Text>
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
    backgroundColor: '#F5F5F5', // 배경 색상을 이미지 배경 색상과 일치시킵니다.
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20, // 뒤로 가기 버튼 위치 조정
  },
  backButtonText: {
    fontSize: 20, // 뒤로 가기 텍스트 크기 조정
    color: '#000', // 뒤로 가기 텍스트 색상
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40, // 회원가입 헤더 스타일
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // 입력 필드와 중복 확인 버튼 컨테이너
  },
  input: {
    borderWidth: 0, // 테두리 없음
    borderBottomWidth: 1, // 밑줄만 표시
    borderColor: '#D3D3D3', // 밑줄 색상
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    flex: 1, // 너비 100% 사용
  },
  
  checkButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#C0C0C0', // 중복 확인 버튼 배경색
    borderRadius: 4, // 중복 확인 버튼 둥근 모서리
  },
  checkButtonText: {
    fontSize: 14, // 중복 확인 버튼 텍스트 크기
    color: '#000', // 중복 확인 버튼 텍스트 색상
  },
  confirmButton: {
    backgroundColor: '#a0a0a0',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#FFFFFF', // 확인 버튼 텍스트 색상
    fontWeight: 'bold', // 확인 버튼 텍스트 굵기
  }
});


export default SignUpScreen;
