import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../AppContext';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const VulnerableCertificationScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const [d_num1, set_d_num1] = useState('');
  const [d_num2, set_d_num2] = useState('');
  const [d_num3, set_d_num3] = useState('');
  const [d_num4, set_d_num4] = useState('');

  const {
    apiUrl,
    azureUrl,
    documentToken
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
      const fileName = fileUri.split('/').pop();
      setSelectedImage(fileUri);
      await uploadToAzure(fileName);
    }
  };

  const takePhoto = async () => {//사진 촬용
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("We need permission to access your camera!");
      return;
    }

    // Show message before launching the camera
    setShowMessage(true);
    setTimeout(async () => {
      setShowMessage(false);
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        const fileUri = result.assets[0].uri;
        setSelectedImage(fileUri);
        await uploadToAzure(fileUri);
      }
    }, 2000); // Show message for 2 seconds
  };

  const uploadToAzure = async (uri) => {//storage 이미지 업로드
    const fileName = uri.split('/').pop();
    const storageUrl = `${azureUrl}/document/${fileName}?${documentToken}`;

    const file = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const fileArrayBuffer = Uint8Array.from(atob(file), c => c.charCodeAt(0));

    setDocument(fileName);

    try {
      await axios.put(storageUrl, fileArrayBuffer, { 
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': 'image/jpeg',
        },
      });
      console.log('Upload successful');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const recognizeText = async () => {
    // 문서번호 추출
    const requestBody = {
      image_url: `${azureUrl}/document/${document}`, // 전달된 URL을 requestBody의 image_url에 설정
    };
  
    try {
      const response = await axios.post(`${apiUrl}/ocr`, requestBody);
      const { document_number1, document_number2, document_number3, document_number4 } = response.data;
  
      if (document_number1 && document_number2 && document_number3 && document_number4) {
        set_d_num1(document_number1);
        set_d_num2(document_number2);
        set_d_num3(document_number3);
        set_d_num4(document_number4);
      } else {
        console.error('Incomplete data received:', response.data);
        throw new Error('Incomplete data received from OCR API');
      }
  
      return response.data;
    } catch (error) {
      console.error('Error recognizing text:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
      throw error;
    }
  };
  
  const handleOCR = async () => {
    if (selectedImage) {
      setLoading(true);
      try {
        const result = await recognizeText();
        setOcrResult(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const authDocument = async () => {
    const requestBody = {
      doc_ref_no1: d_num1,
      doc_ref_no2: d_num2,
      doc_ref_no3: d_num3,
      doc_ref_no4: d_num4,
      resident_number_front: "670108"
    };
  
    console.log(requestBody);
  
    try {
      const response = await axios.post(`${apiUrl}/verify-document`, requestBody);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error verifying document:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
      throw error;
    }
  };
  3
  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={choosePhoto}>
          <Text style={styles.buttonText}>사진 가져오기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>촬영하기</Text>
        </TouchableOpacity>
      </View>
      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>화면에 맞춰 촬영해 주세요</Text>
        </View>
      )}
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          <TouchableOpacity style={styles.button} onPress={handleOCR}>
            <Text style={styles.buttonText}>문서 번호 가져오기</Text>
            <Text style={styles.buttonSubText}>*촬영 완료 후 1초 후 눌러주세요*</Text>
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" />}
          {ocrResult && <Text style={styles.resultText}>{JSON.stringify(ocrResult, null, 2)}</Text>}
          <Button title="다시 촬영하기" onPress={() => setSelectedImage(null)} />
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={authDocument}>
          <Text style={styles.buttonText}>인증하기</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-around',
    marginVertical: 20,
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
  messageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  messageText: {
    color: 'red',
    fontSize: 18,
  },
  selectedImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    marginTop: 20,
  },
  resultText: {
    marginTop: 16,
    textAlign: 'center',
  },
});

export default VulnerableCertificationScreen;
