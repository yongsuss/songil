/*import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const LoginScreen = ({ onLoginSuccess }) => {
    const navigation = useNavigation(); // useNavigation 훅을 사용하여 네비게이션 객체를 가져옴
  //로그인 함수
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.brandName}>songil</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="id or email" style={styles.input} />
        <TextInput placeholder="password" style={styles.input} secureTextEntry />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={() => onLoginSuccess()}>
        <Text style={styles.loginButtonText}>login</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText} onPress={() => navigation.navigate('SignUp')}>회원가입하기</Text>
        <Text style={styles.footerText} onPress={() => navigation.navigate('SearchPassword')}>비밀번호찾기</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logo: {
    height: 150, // 로고의 크기에 맞게 조절하세요.
    resizeMode: 'contain',
    marginBottom: 30,
  },
  brandName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    fontSize: 16,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#a0a0a0',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  footerText: {
    color: '#000000', // 텍스트 색상을 검은색으로 설정
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
*/

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

const LoginScreen = ({ onLoginSuccess }) => {
    const navigation = useNavigation(); // useNavigation 훅을 사용하여 네비게이션 객체를 가져옴
    
    // 로그인 상태와 업데이트 함수를 가져옵니다 (props 추가 필요)
  
    // 이 함수는 id와 password가 올바를 때 호출됩니다.
    const handleLogin = () => {
        // TODO: 여기에 로그인 검증 로직을 추가합니다.
        // 예: id === 'expectedId' && password === 'expectedPassword'
        const id = 'user_id'; // 사용자가 입력한 id
        const password = 'user_password'; // 사용자가 입력한 password

        onLoginSuccess(true); //임시로 로그인 성공 


        // 임시로 항상 로그인 성공으로 가정
        if (id === 'expectedId' && password === 'expectedPassword') {
            onLoginSuccess(true); // 로그인 상태를 true로 업데이트
        } else {
            // 로그인 실패 처리
            alert('ID 또는 비밀번호가 올바르지 않습니다.');
        }
    };
  //로그인 함수
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.brandName}>songil</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="id or email" style={styles.input} />
        <TextInput placeholder="password" style={styles.input} secureTextEntry />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
      <Text style={styles.loginButtonText}>login</Text>
    </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText} onPress={() => navigation.navigate('SignUp')}>회원가입하기</Text>
        <Text style={styles.footerText} onPress={() => navigation.navigate('SearchPassword')}>비밀번호찾기</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logo: {
    height: 150, // 로고의 크기에 맞게 조절하세요.
    resizeMode: 'contain',
    marginBottom: 30,
  },
  brandName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    fontSize: 16,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#a0a0a0',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  footerText: {
    color: '#000000', // 텍스트 색상을 검은색으로 설정
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;