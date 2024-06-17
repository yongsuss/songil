//모금 건의 화면
/*
import React, { useState, useContext, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'; // 날짜 계산을 위해 moment.js 사용
import { AppContext } from '../AppContext';

function AllFundMake({ navigation }) {
  const { apiUrl, authToken, id } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('7');
  const [endDate, setEndDate] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/weakusers/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const weakUser = data.find(user => user.id === id);
      if (weakUser) {
        setCategory(weakUser.category);
      }
    })
    .catch(error => {
      Alert.alert("오류", "사용자 정보를 가져오는 중 오류 발생: " + error.message);
    });
  }, [apiUrl, authToken, id]);

  const validateFields = () => {
    if (!title.trim() || !amount.trim() || !endDate || !text.trim()) {
      Alert.alert("오류", "모든 필드는 필수로 입력해야 합니다.");
      return false;
    }
    if (isNaN(amount)) {
      Alert.alert("오류", "모금액은 숫자여야 합니다.");
      return false;
    }
    return true;
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === 'ios');
    const dateWithNoon = moment(currentDate).hour(12).minute(0).second(0);
    setStartDate(dateWithNoon.toDate());
    const calculatedEndDate = moment(dateWithNoon).add(parseInt(period), 'days').toDate();
    setEndDate(calculatedEndDate);
  };
  
  const handlePeriodChange = (itemValue) => {
    setPeriod(itemValue);
    const calculatedEndDate = moment(startDate).add(parseInt(itemValue, 10), 'days').toDate();
    setEndDate(calculatedEndDate);
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }
    
    const formattedStartDate = moment(startDate).toISOString();
    const formattedEndDate = moment(endDate).toISOString();

    const fundraisingData = {
      title,
      amount: parseFloat(amount),
      startdate: formattedStartDate,
      enddate: formattedEndDate,
      text,
      image,
      current: 0,
      category,
      prove: false
    };

    try {
      const response = await fetch(`${apiUrl}/fundraisings/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(fundraisingData),
      });

      if (response.ok) {
        Alert.alert("성공", "모금 건의 완료");
        navigation.goBack();
      } else {
        const errorData = await response.json();
        const errors = errorData.detail.map(err => `${err.loc.join(" -> ")}: ${err.msg}`).join("\n");
        Alert.alert("생성 실패", errors);
      }
    } catch (error) {
      Alert.alert("오류", "모금 건의 중 오류 발생: " + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.inputWithIcon}>
          <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder="모금액"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.icon}>원</Text>
        </View>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
          <Text style={styles.buttonText}>시작 날짜 선택</Text>
        </TouchableOpacity>
        <View style={styles.inputWithPicker}>
          <Text style={styles.pickerLabel}>기간 선택:</Text>
          <Picker
            selectedValue={period}
            style={styles.picker}
            onValueChange={handlePeriodChange}>
            <Picker.Item label="7일" value="7" />
            <Picker.Item label="14일" value="14" />
            <Picker.Item label="30일" value="30" />
            <Picker.Item label="90일" value="90" />
          </Picker>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            시작일: {startDate ? moment(startDate).format('YYYY-MM-DD') : '   ~   '}
          </Text>
          <Text style={styles.dateText}>
            종료일: {endDate ? moment(endDate).format('YYYY-MM-DD') : ''}
          </Text>
        </View>
        <TextInput
          style={styles.textArea}
          placeholder="내용"
          value={text}
          onChangeText={setText}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="이미지 URL"
          value={image}
          onChangeText={setImage}
        />
        {showDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>모금 건의</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    form: {
        padding: 20
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 10 // 여백을 일정하게 조절
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginLeft: 10,
        fontSize: 16
    },
    pickerLabel: {
        fontSize: 16,
        marginRight: 10
    },
    inputWithPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    picker: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        fontSize: 16
    },
    textArea: {
        backgroundColor: '#ffffff',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        height: 200,
        textAlignVertical: 'top'
    },
    button: {
        backgroundColor: '#a0a0a0',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10 // 버튼 하단의 여백 추가
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
        padding: 15,
    },
    dateText: {
        fontSize: 16,
    },
});

export default AllFundMake;*/
/*
import React, { useState, useContext, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { AppContext } from '../AppContext';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

function AllFundMake({ navigation }) {
  const { apiUrl, authToken, id, azureUrl, fundraisingToken } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('7');
  const [endDate, setEndDate] = useState('');
  const [text, setText] = useState('');
  const [fundraisingImageFile, setFundraisingImageFile] = useState(''); // 사진 이름
  const [fundraisingImageFileUri, setFundraisingImageFileUri] = useState(''); // 실제 사진 저장 경로
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState(''); // 이미지 URL 상태 추가

  useEffect(() => {
    fetch(`${apiUrl}/weakusers/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${fundraisingToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const weakUser = data.find(user => user.id === id);
      if (weakUser) {
        setCategory(weakUser.category);
      }
    })
    .catch(error => {
      Alert.alert("오류", "사용자 정보를 가져오는 중 오류 발생: " + error.message);
    });
  }, [apiUrl, authToken, id]);

  const validateFields = () => {
    if (!title.trim() || !amount.trim() || !endDate || !text.trim() || !image) {
      Alert.alert("오류", "모든 필드는 필수로 입력해야 합니다.");
      return false;
    }
    if (isNaN(amount)) {
      Alert.alert("오류", "모금액은 숫자여야 합니다.");
      return false;
    }
    return true;
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === 'ios');
    const dateWithNoon = moment(currentDate).hour(12).minute(0).second(0);
    setStartDate(dateWithNoon.toDate());
    const calculatedEndDate = moment(dateWithNoon).add(parseInt(period), 'days').toDate();
    setEndDate(calculatedEndDate);
  };
  
  const handlePeriodChange = (itemValue) => {
    setPeriod(itemValue);
    const calculatedEndDate = moment(startDate).add(parseInt(itemValue, 10), 'days').toDate();
    setEndDate(calculatedEndDate);
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    try {//Azure Storage에 올리기
        const fileContent = await FileSystem.readAsStringAsync(fundraisingImageFileUri, { encoding: FileSystem.EncodingType.Base64 });
        const fileArrayBuffer = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));
        await axios.put(`${azureUrl}/board/${fundraisingImageFile}?${fundraisingToken}`, fileArrayBuffer, {
          headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': 'image/jpeg'
          }
        });
    } catch (error) {
        console.error('Error uploading file:', error);
    }

    const formattedStartDate = moment(startDate).toISOString();
    const formattedEndDate = moment(endDate).toISOString();

    const fundraisingData = {
      title,
      amount: parseFloat(amount),
      startdate: formattedStartDate,
      enddate: formattedEndDate,
      text,
      image: fundraisingImageFile, // 이 부분에서 fundraisingImageFile 사용
      current: 0,
      category,
      prove: false
    };

    try {
      const response = await fetch(`${apiUrl}/fundraisings/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${fundraisingToken}`
        },
        body: JSON.stringify(fundraisingData),
      });

      if (response.ok) {
        Alert.alert("성공", "모금 건의 완료");
        navigation.goBack();
      } else {
        const errorData = await response.json();
        const errors = errorData.detail.map(err => `${err.loc.join(" -> ")}: ${err.msg}`).join("\n");
        Alert.alert("생성 실패", errors);
      }
    } catch (error) {
      Alert.alert("오류", "모금 건의 중 오류 발생: " + error.message);
    }
  };

  const handleChoosePhoto = async () => {//파일에서 사진 선택
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("We need permission to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = result.assets[0].uri;
      const fileName = fileUri.split('/').pop();
      setFundraisingImageFile(fileName);
      setFundraisingImageFileUri(fileUri);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.form}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.inputWithIcon}>
          <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder="모금액"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.icon}>원</Text>
        </View>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
          <Text style={styles.buttonText}>시작 날짜 선택</Text>
        </TouchableOpacity>
        <View style={styles.inputWithPicker}>
          <Text style={styles.pickerLabel}>기간 선택:</Text>
          <Picker
            selectedValue={period}
            style={styles.picker}
            onValueChange={handlePeriodChange}>
            <Picker.Item label="7일" value="7" />
            <Picker.Item label="14일" value="14" />
            <Picker.Item label="30일" value="30" />
            <Picker.Item label="90일" value="90" />
          </Picker>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            시작일: {startDate ? moment(startDate).format('YYYY-MM-DD') : '   ~   '}
          </Text>
          <Text style={styles.dateText}>
            종료일: {endDate ? moment(endDate).format('YYYY-MM-DD') : ''}
          </Text>
        </View>
        <TextInput
          style={styles.textArea}
          placeholder="내용"
          value={text}
          onChangeText={setText}
          multiline
        />
        {showDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {fundraisingImageFileUri && (
        <Image source={{ uri: fundraisingImageFileUri }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
      )}
        <TouchableOpacity onPress={handleChoosePhoto} style={[styles.button, {marginBottom: 10}]}>
            <Text style={styles.buttonText}>이미지 가져오기(선택)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>모금 건의</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    form: {
        padding: 20
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 10 // 여백을 일정하게 조절
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginLeft: 10,
        fontSize: 16
    },
    pickerLabel: {
        fontSize: 16,
        marginRight: 10
    },
    inputWithPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    picker: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        fontSize: 16
    },
    textArea: {
        backgroundColor: '#ffffff',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        height: 200,
        textAlignVertical: 'top'
    },
    button: {
        backgroundColor: '#a0a0a0',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10 // 버튼 하단의 여백 추가
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
        padding: 15,
    },
    dateText: {
        fontSize: 16,
    },
    Image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
      },
      contentContainer: {
        paddingVertical: 20,
        flexGrow: 1
      },
});

export default AllFundMake;*/

import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { AppContext } from '../AppContext';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


function AllFundMake({ navigation }) {
  const { apiUrl, authToken, id, azureUrl, fundraisingToken } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState('7');
  const [endDate, setEndDate] = useState('');
  const [text, setText] = useState('');
  const [fundraisingImageFile, setFundraisingImageFile] = useState(''); // 사진 이름
  const [fundraisingImageFileUri, setFundraisingImageFileUri] = useState(''); // 실제 사진 저장 경로
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState(''); // 이미지 URL 상태 추가
  const scrollViewRef = useRef(); // 추가된 ref

  useEffect(() => {
    fetch(`${apiUrl}/weakusers/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${fundraisingToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const weakUser = data.find(user => user.id === id);
      if (weakUser) {
        setCategory(weakUser.category);
      }
    })
    .catch(error => {
      Alert.alert("오류", "사용자 정보를 가져오는 중 오류 발생: " + error.message);
    });
  }, [apiUrl, authToken, id]);

  const validateFields = () => {
    if (!title.trim() || !amount.trim() || !endDate || !text.trim()) {
      Alert.alert("오류", "모든 필드는 필수로 입력해야 합니다.");
      return false;
    }
    if (isNaN(amount)) {
      Alert.alert("오류", "모금액은 숫자여야 합니다.");
      return false;
    }
    return true;
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === 'ios');
    const dateWithNoon = moment(currentDate).hour(12).minute(0).second(0);
    setStartDate(dateWithNoon.toDate());
    const calculatedEndDate = moment(dateWithNoon).add(parseInt(period), 'days').toDate();
    setEndDate(calculatedEndDate);
  };
  
  const handlePeriodChange = (itemValue) => {
    setPeriod(itemValue);
    const calculatedEndDate = moment(startDate).add(parseInt(itemValue, 10), 'days').toDate();
    setEndDate(calculatedEndDate);
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }
  
    try {
      // 파일을 Azure Storage에 업로드
      const fileContent = await FileSystem.readAsStringAsync(fundraisingImageFileUri, { encoding: FileSystem.EncodingType.Base64 });
      const fileArrayBuffer = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));
      const uploadUrl = `${azureUrl}/fundraising/${fundraisingImageFile}?${fundraisingToken}`;
      
      await axios.put(uploadUrl, fileArrayBuffer, {
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': 'image/jpeg'
        }
      });
    } catch (error) {
      //console.error('Error uploading file:', error);
    }
  
    const formattedStartDate = moment(startDate).toISOString();
    const formattedEndDate = moment(endDate).toISOString();
  
    const fundraisingData = {
      title,
      amount: parseFloat(amount),
      startdate: formattedStartDate,
      enddate: formattedEndDate,
      text,
      image: fundraisingImageFile, // 파일명이 아닌 업로드된 이미지의 URL을 사용해야 할 수도 있습니다.
      count: 0, // 이 값이 정의되지 않았으므로 기본값 0을 설정
      prove: false, // 서버에 맞게 불리언 값 설정
      category, // 카테고리는 정수 형태로 보내야 할 수 있습니다.
      current: 0 // 현재 기부액, 초기값 0
    };
  
    try {
      const response = await fetch(`${apiUrl}/fundraisings/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${fundraisingToken}`
        },
        body: JSON.stringify(fundraisingData),
      });
  
      if (response.ok) {
        Alert.alert("성공", "모금 건의 완료");
        navigation.goBack();
      } else {
        const errorData = await response.json();
        const errors = errorData.detail.map(err => `${err.loc.join(" -> ")}: ${err.msg}`).join("\n");
        Alert.alert("생성 실패", errors);
      }
    } catch (error) {
      Alert.alert("오류", "모금 건의 중 오류 발생: " + error.message);
    }
  };

  const handleChoosePhoto = async () => {//파일에서 사진 선택
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("We need permission to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = result.assets[0].uri;
      const fileName = fileUri.split('/').pop();
      setFundraisingImageFile(fileName);
      setFundraisingImageFileUri(fileUri);
    }
  };

  return (
     <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
      ref={scrollViewRef}
    >
      <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={styles.form}
  keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })} // iOS는 0, Android는 500으로 시작해 조정 가능
>
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.inputWithIcon}>
          <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder="모금액"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.icon}>원</Text>
        </View>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
          <Text style={styles.buttonText}>시작 날짜 선택</Text>
        </TouchableOpacity>
        <View style={styles.inputWithPicker}>
          <Text style={styles.pickerLabel}>기간 선택:</Text>
          <Picker
            selectedValue={period}
            style={styles.picker}
            onValueChange={handlePeriodChange}>
            <Picker.Item label="7일" value="7" />
            <Picker.Item label="14일" value="14" />
            <Picker.Item label="30일" value="30" />
            <Picker.Item label="90일" value="90" />
          </Picker>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            시작일: {startDate ? moment(startDate).format('YYYY-MM-DD') : '   ~   '}
          </Text>
          <Text style={styles.dateText}>
            종료일: {endDate ? moment(endDate).format('YYYY-MM-DD') : ''}
          </Text>
        </View>
        <TextInput
          style={styles.textArea}
          placeholder="내용"
          value={text}
          onChangeText={setText}
          multiline
        />
        {showDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {fundraisingImageFileUri && (
        <Image source={{ uri: fundraisingImageFileUri }} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
      )}
        <TouchableOpacity onPress={handleChoosePhoto} style={[styles.button, {marginBottom: 10}]}>
            <Text style={styles.buttonText}>이미지 가져오기(선택)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>모금 건의</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    form: {
        padding: 20
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 10 // 여백을 일정하게 조절
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginLeft: 10,
        fontSize: 16
    },
    pickerLabel: {
        fontSize: 16,
        marginRight: 10
    },
    inputWithPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    picker: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        fontSize: 16
    },
    textArea: {
        backgroundColor: '#ffffff',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        height: 200,
        textAlignVertical: 'top'
    },
    button: {
        backgroundColor: '#a0a0a0',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10 // 버튼 하단의 여백 추가
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
        padding: 15,
    },
    dateText: {
        fontSize: 16,
    },
    Image: {
        width: '100%',
        height:  '100%',
        resizeMode: 'contain',
      },
});

export default AllFundMake;