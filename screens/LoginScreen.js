// 로그인 화면
/*import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { AppContext } from '../AppContext';
import React, { useState, useContext } from "react";
import axios from "axios";

const LoginScreen = ({ onLoginSuccess }) => {
    const navigation = useNavigation(); // useNavigation 훅을 사용하여 네비게이션 객체를 가져옴
    
    const { apiUrl } = useContext(AppContext);//전역변수
    const [id, setId] = useState();// 사용자가 입력한 id
    const [pw, setPw] = useState();// 사용자가 입력한 password


    const handleLogin = async () => {//로그인 api
      onLoginSuccess(true);
        const url = apiUrl+"/user/login/?id="+id+"&pw="+pw;

        try {
          const response = await axios.get(url);
          console.log(response.data);
    
          if (response.data) {
            onLoginSuccess(true);
          }
          else{
            alert("No user information");
          }
        } catch (error) {
          // API 호출 중 에러가 발생한 경우
          console.log(error);
          alert('ID 또는 비밀번호가 올바르지 않습니다.')
        }
    };


  //로그인 함수
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.brandName}>songil</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="id or email" style={styles.input} onChangeText={setId}/>
        <TextInput placeholder="password" style={styles.input} onChangeText={setPw} secureTextEntry />
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

export default LoginScreen;*/

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { AppContext } from '../AppContext';
import React, { useState, useContext } from "react";
import axios from "axios";

const LoginScreen = ({ onLoginSuccess }) => {
    const navigation = useNavigation(); // useNavigation 훅을 사용하여 네비게이션 객체를 가져옴
    
    const { apiUrl } = useContext(AppContext);//전역변수
    const [id, setId] = useState();// 사용자가 입력한 id
    const [pw, setPw] = useState();// 사용자가 입력한 password


    const handleLogin = async () => {//로그인 api
      onLoginSuccess(true);
        const url = apiUrl+"/user/login/?id="+id+"&pw="+pw;

        try {
          const response = await axios.get(url);
          console.log(response.data);
    
          if (response.data) {
            
            onLoginSuccess(true);
          }
          else{
            alert("No user information");
          }
        } catch (error) {
          // API 호출 중 에러가 발생한 경우
          console.log(error);
          alert('ID 또는 비밀번호가 올바르지 않습니다.')
        }
    };


  //로그인 함수
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.brandName}>songil</Text>
      <View style={styles.inputContainer}>
        <TextInput placeholder="id or email" style={styles.input} onChangeText={setId}/>
        <TextInput placeholder="password" style={styles.input} onChangeText={setPw} secureTextEntry />
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