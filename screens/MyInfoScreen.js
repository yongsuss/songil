
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; 

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

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password) && !(/(\w)\1\1/.test(password)); // 연속되는 같은 문자 3개 이상 제한
};

const SettingsScreen = () => {
  const {
    id, gender, resident, apiUrl, nickname: contextNickname, message: contextMessage,
    address: contextAddress, setMessage, setAddress, setNickname
  } = useContext(AppContext);

  const [nickname, setNewNickname] = useState(contextNickname);
  const [newPassword, setNewPassword] = useState('');
  const [newMessage, setNewMessage] = useState(contextMessage);
  const [newAddress, setNewAddress] = useState(contextAddress);
  const [selectedRegion, setSelectedRegion] = useState('서울');
  const [selectedSubRegion, setSelectedSubRegion] = useState(regions['서울'][0]);
  const [detailAddress, setDetailAddress] = useState('');

  const CustomButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  // Calculate age from the first 6 digits of the resident number
  const calculateAge = () => {
    const yearPrefix = parseInt(resident.substring(0, 2), 10);
    const baseYear = yearPrefix < 22 ? 2000 : 1900; // Assuming the app is used in 2021 or later
    const birthYear = baseYear + yearPrefix;
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const age = calculateAge();

  const handleRegionChange = (itemValue) => {
    setSelectedRegion(itemValue);
    setSelectedSubRegion(regions[itemValue][0]);
    updateDetailAddressField(`${itemValue} ${regions[itemValue][0]}`);
  };

  const handleSubRegionChange = (itemValue) => {
    setSelectedSubRegion(itemValue);
    updateDetailAddressField(`${selectedRegion} ${itemValue}`);
  };

  const updateDetailAddressField = (baseAddress) => {
    setDetailAddress(baseAddress);  // 선택된 주소를 상세 주소 입력 필드에 설정
  };

  const checkNicknameAvailability = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/check/nickname/${nickname}`);
      if (response.data === 'Available') {
        updateNickname(); // 중복이 아니면 닉네임 업데이트 실행
      } else {
        Alert.alert('Error', '닉네임이 이미 사용 중입니다.'); // 중복일 경우 경고 메시지 출력
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        updateNickname(); // 닉네임이 존재하지 않으면 업데이트 실행
      } else {
        Alert.alert('Error', '닉네임 확인 중 오류가 발생했습니다.'); // 그 외 오류 처리
      }
    }
  };

  const updateNickname = async () => {
    try {
      const response = await axios.patch(`${apiUrl}/user/update/nickname/`, {
        id,
        new_nickname: nickname
      });
      if (response.status === 200) {
        setNickname(nickname); // Context 상태 업데이트
        Alert.alert('Success', '닉네임이 성공적으로 업데이트되었습니다.');
      } else {
        throw new Error('업데이트 실패');
      }
    } catch (error) {
      Alert.alert('Error', `닉네임 업데이트 실패: ${error.message}`);
    }
  };

  const updatePassword = async () => {
    if (!validatePassword(newPassword)) {
      Alert.alert('Error', '비밀번호가 규칙에 맞지 않습니다.');
      return;
    }
    try {
      const response = await axios.patch(`${apiUrl}/user/update/password/`, {
        id,
        new_password: newPassword
      });
      Alert.alert('Success', '비밀번호가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      Alert.alert('Error', '비밀번호 업데이트 실패.');
    }
  };

  const updateMessage = async () => {
    try {
      const response = await axios.patch(`${apiUrl}/user/update/message/`, {
        id,
        new_message: newMessage
      });
      setMessage(newMessage);
      Alert.alert('Success', '메시지가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      Alert.alert('Error', '메시지 업데이트 실패.');
    }
  };

  const updateAddress = async () => {
    const fullAddress = `${detailAddress}`; //${selectedRegion} ${selectedSubRegion} 
    setAddress(fullAddress);
    try {
      await axios.patch(`${apiUrl}/user/update/address/`, {
        id,
        new_address: fullAddress
      });
      Alert.alert('Success', '주소가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      Alert.alert('Error', '주소 업데이트 실패.');
    }
  };

  const handleCheckAddress = async () => {
    try {
      const fullAddress = `${selectedRegion} ${selectedSubRegion} ${detailAddress}`;
      const response = await axios.get(`${apiUrl}/check-address/${fullAddress}`);
      if (response.status === 200) {
        Alert.alert("주소 확인", "유효한 주소입니다.");
      } else {
        throw new Error("유효하지 않은 주소입니다.");
      }
    } catch (error) {
      Alert.alert("주소 확인 오류","유효하지 않은 주소입니다.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>아이디:</Text>
        <Text style={styles.value}>{id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>성별:</Text>
        <Text style={styles.value}>{gender}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>나이:</Text>
        <Text style={styles.value}>{age}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>현재 주소:</Text>
        <Text style={styles.value}>{contextAddress}</Text>
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>닉네임:</Text>
        <TextInput style={styles.input} value={nickname} onChangeText={setNewNickname} placeholder="Nickname" />
        <CustomButton title="수정" onPress={updateNickname} />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>비밀번호:</Text>
        <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="New Password" secureTextEntry />
        <CustomButton title="수정" onPress={updatePassword} />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>상태메세지:</Text>
        <TextInput style={styles.input} value={newMessage} onChangeText={setNewMessage} placeholder="Message" />
        <CustomButton title="수정" onPress={updateMessage} />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedRegion}
          style={styles.picker}
          onValueChange={handleRegionChange}>
          {Object.keys(regions).map(region => (
            <Picker.Item key={region} label={region} value={region} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedSubRegion}
          style={styles.picker}
          onValueChange={handleSubRegionChange}>
          {regions[selectedRegion].map(subRegion => (
            <Picker.Item key={subRegion} label={subRegion} value={subRegion} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="주소 작성"
        value={detailAddress}
        onChangeText={setDetailAddress}
      /
      >
      <CustomButton
          title="주소 확인"
          onPress={handleCheckAddress}
          
      />  
      <CustomButton title="주소 수정" onPress={updateAddress} />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  inputLabel: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16
  },
  value: {
    fontSize: 16,
    color: '#666'
  },
  input: {
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  picker: {
    flex: 1,
    height: 50
  },
  button: {
    backgroundColor: '#a0a0a0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default SettingsScreen;