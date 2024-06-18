//회원가입칸


import React, { useState, useContext } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AppContext } from '../AppContext';
import { Picker } from '@react-native-picker/picker'; // 수정된 부분

const validateId = (id) => {
  const regex = /^[A-Za-z0-9_-]{6,16}$/;
  return regex.test(id);
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password) && !(/(\w)\1\1/.test(password)); // 연속되는 같은 문자 3개 이상 제한
};


const regions = {
  서울: ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
  인천: ["강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"],
  대전: ["대덕구", "동구", "서구", "유성구", "중구"],
  세종: ["세종시"],
  대구: ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],
  울산: ["남구", "동구", "북구", "울주군", "중구"],
  부산: ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
  광주: ["광산구", "남구", "동구", "북구", "서구"],
  경기: ["가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],
  강원: ["강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"],
  충북: ["괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "증평군", "진천군", "청주시", "충주시"],
  충남: ["계룡시", "공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "예산군", "천안시", "청양군", "태안군", "홍성군"],
  경북: ["경산시", "경주시", "고령군", "구미시", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동시", "영덕군", "영양군", "영주시", "영천시", "예천군", "을릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시"],
  경남: ["거제시", "거창군", "고성군", "김해시", "남해군", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "찬녕군", "창원시", "통영시", "하동군", "함안군", "함양군", "합천군"],
  전북: ["고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시", "정읍시", "진안군"],
  전남: ["강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영관군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"],
  제주: ["서귀포시", "제주시"]
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
  const [selectedRegion, setSelectedRegion] = useState(Object.keys(regions)[0]);
  const [selectedSubRegion, setSelectedSubRegion] = useState(regions[Object.keys(regions)[0]][0]);

  const handleRegionChange = (itemValue, itemIndex) => {
    setSelectedRegion(itemValue);
    setSelectedSubRegion(regions[itemValue][0]);
    updateAddress(itemValue, regions[itemValue][0]);
  };

  const handleSubRegionChange = (itemValue, itemIndex) => {
    setSelectedSubRegion(itemValue);
    updateAddress(selectedRegion, itemValue);
  };

  const updateAddress = (region, subRegion) => {
    setAddress(`${region} ${subRegion}`);
  };

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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedRegion}
          onValueChange={handleRegionChange}
          style={styles.picker}>
          {Object.keys(regions).map((region) => (
            <Picker.Item key={region} label={region} value={region} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedSubRegion}
          onValueChange={handleSubRegionChange}
          style={styles.picker}>
          {regions[selectedRegion].map((subRegion) => (
            <Picker.Item key={subRegion} label={subRegion} value={subRegion} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Additional address details"
        value={address}
        onChangeText={setAddress}
        editable={true}
      />
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'M' ? styles.selected : styles.notSelected]}
          onPress={() => setGender('M')}
        >
          <Text style={styles.genderButtonText}>남자</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.genderButton, gender === 'W' ? styles.selected : styles.notSelected]}
            onPress={() => setGender('W')}  // 'W'로 성별 설정하는 이벤트 핸들러 추가
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
    marginBottom: 10, // 간격 줄임
  },
  backButtonText: {
    fontSize: 20,
    color: '#000',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20, // 간격 줄임
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5, // 간격 줄임
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
  },
  picker: {
    flex: 1, // Each picker will take up half of the container width
    height: 50,
    width: '100%',
    //marginBottom: 100, // 추가: Picker 간의 간격을 줄임
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SignUpScreen;