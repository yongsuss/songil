import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../AppContext';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const VulnerableCertificationScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);//사진이름
  const [selectedImageUri, setSelectedImageUri] = useState(null);//사진파일 경로
  const [document, setDocument] = useState(null);//업로드된 문서
  const [loading, setLoading] = useState(false);//인증하는동안 로딩화면

  const [d_num1, set_d_num1] = useState(null);
  const [d_num2, set_d_num2] = useState('');
  const [d_num3, set_d_num3] = useState('');
  const [d_num4, set_d_num4] = useState('');

  const {
    apiUrl,
    azureUrl,
    documentToken,
    id,
    name
  } = useContext(AppContext);

  const choosePhoto = async () => {//사진 선택
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "We need permission to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = result.assets[0].uri;
      setSelectedImageUri(fileUri);
      const fileName = fileUri.split('/').pop();
      setSelectedImage(fileName);
    }
  };

  const takePhoto = async () => {//사진 촬영
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("We need permission to access your camera!");
      return;
    }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        const fileUri = result.assets[0].uri;
        setSelectedImageUri(fileUri);
        const fileName = fileUri.split('/').pop();
        setSelectedImage(fileName);
      }
  };

  const authDocument = async () => {//문서 인증 시작함수 storage 업로드 > ocr 문서번호 추출 > 정부24 인증 순으로
    if(selectedImage){
      setLoading(true);
      try {
        await uploadToAzure();//storage 업로드
      } catch (error) {
        console.log(error);
      }
    }
    else {
      Alert.alert("사진이 없습니다", "문서 사진을 찍어주세요");
    }
  };

  useEffect(() => {//document 값이 한박자 늦게들어옴;;;
    const documentRecognize = async () => {//문서번호 추출
      try {
        await recognizeText();
      } catch (error) {
        console.log(error);
      }
    };
  
    if (document) {
      setTimeout(() => {//storage 업로드 시간때문에 0.5초를 기다려야함
        documentRecognize();
      }, 500);
    }
  }, [document]);

  const uploadToAzure = async () => {//storage 이미지 업로드
    const storageUrl = `${azureUrl}/document/${selectedImage}?${documentToken}`;

    const file = await FileSystem.readAsStringAsync(selectedImageUri, { encoding: FileSystem.EncodingType.Base64 });
    const fileArrayBuffer = Uint8Array.from(atob(file), c => c.charCodeAt(0));

    try {
      await axios.put(storageUrl, fileArrayBuffer, { 
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': 'image/jpeg',
        },
      });
      setDocument(selectedImage);
      console.log('Upload successful');
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  const recognizeText = async () => {//문서번호 추출
    const requestBody = {
      image_url: azureUrl+'/document/'+document // 전달된 url을 requestBody의 image_url에 설정
    };
  
    try {
      const response = await axios.post(apiUrl+'/ocr', requestBody);
      if(response.data){
        set_d_num1(response.data.document_number1);
        set_d_num2(response.data.document_number2);
        set_d_num3(response.data.document_number3);
        set_d_num4(response.data.document_number4);
        setLoading(false);//로딩 일단 종료
      }
    } catch (error) {
      Alert.alert("사진 오류", "문서 번호를 찾을 수 없습니다. 사진을 다시 올려주세요.");
    }
  };

  const verifyDocument = async () => {//문서번호 인증
    const requestBody = {
      doc_ref_no1: d_num1,
      doc_ref_no2: d_num2,
      doc_ref_no3: d_num3,
      doc_ref_no4: d_num4,
      resident_number_front: '670108'
    };

    setLoading(true);

    try {
      const response = await axios.post(apiUrl+'/verify-document', requestBody);
      
      if(response.data){
        await checkWeakUser();//원래 취약계층이었는지 확인
      }
    } catch (error) {
      console.log('문서번호 인증 오류:', error);
    }
  };

  const checkWeakUser = async () => {//원래 취약계층이었는지 확인
    try {
      const response = await axios.get(apiUrl+`/weakuser/check/id/${id}`);
      
      if(response.data.status){
        await updateWeakUser();//문서 업데이트
        console.log('문서 업뎃');
      }
      else{
        await addWeakUser();//취약계층 추가
        console.log('취약 추가');
      }
      setLoading(false);
    } catch (error) {
      console.log('취약계층 인증 불가', error);
    }
  };

  const addWeakUser = async () => {//취약계층 추가
    const requestBody = {
      id: id,
      name: name,
      image: document,
      category: 2
    };

    try {
      const response = await axios.post(apiUrl+'/weakuser/add/', requestBody);
      
      if(response.data){
        Alert.alert("성공!", "취약계층 대상이 되었습니다.");
      }
    } catch (error) {
      console.log('취약계층 추가 오류:', error);
    }
  };

  const updateWeakUser = async () => {//취약계층 문서 업데이트
    const requestBody = {
      id: id,
      new_image: document
    };

    try {
      const response = await axios.patch(apiUrl+'/weakuser/update/document/', requestBody);
      console.log(response.data);
      
      if(response.data){
        Alert.alert("성공!", "문서가 갱신되었습니다.");
      }
    } catch (error) {
      console.log('문서 갱신 오류 : ', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: "column"}}>
        <View style={styles.documentTextContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImageUri }} style={styles.selectedImage} />
        ) : (
            <Text style={styles.documentText}>가장자리에 맞춰주세요</Text>
        )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={choosePhoto}>
          <Text style={styles.buttonText}>사진 선택</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>촬영하기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={authDocument}>
        <Text style={styles.buttonText}>문서 번호 가져오기</Text>
      </TouchableOpacity>
      {loading && (
          <View>
            <ActivityIndicator size="large" />
          </View>
        )}
      {d_num1 && (
        <View>
        <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
          <TextInput style={styles.input} keyboardType="numeric" value={d_num1} onChangeText={set_d_num1} maxLength={4} />
          <Text style={{marginRight: 5, marginLeft: 5}}>-</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={d_num2} onChangeText={set_d_num2} maxLength={4} />
          <Text style={{marginRight: 5, marginLeft: 5}}>-</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={d_num3} onChangeText={set_d_num3} maxLength={4} />
          <Text style={{marginRight: 5, marginLeft: 5}}>-</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={d_num4} onChangeText={set_d_num4} maxLength={4} />
        </View>
        <TouchableOpacity style={styles.button} onPress={verifyDocument}>
        <Text style={styles.buttonText}>정부24 인증하기</Text>
      </TouchableOpacity>
      </View>
      )}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  buttonSubText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center'
  },
  resultText: {
    marginTop: 16,
    textAlign: 'center',
  },
  selectedImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    borderRadius: 8
  },
  documentTextContainer: {
    borderWidth: 2, // 테두리 두께 2
    borderColor: 'black', // 테두리 색상 검정
    borderRadius: 8, // 테두리 둥글기 8
    height: 400,
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20
  },
  documentText: {
    fontSize: 24, // 글자 크기 24
    fontWeight: 'bold', // 글자 굵기 bold
    textAlign: 'center', // 가운데 정렬
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 20
  },
});

export default VulnerableCertificationScreen;
