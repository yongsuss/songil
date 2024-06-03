import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const SAS_TOKEN = "sp=racwdl&st=2024-05-29T06:44:54Z&se=2024-07-01T14:44:54Z&sv=2022-11-02&sr=c&sig=ImfE%2BtbeioOJiDquqKvYeon1CobFlfqkrWUz6pXSfw4%3D";
const AZURE_URL = "https://songilstorage.blob.core.windows.net/document/";

const VulnerableCertificationScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const choosePhoto = async () => {
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
      setSelectedImage(fileUri);
      await uploadToAzure(fileUri);
    }
  };

  const takePhoto = async () => {
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

  const uploadToAzure = async (uri) => {
    const fileName = uri.split('/').pop();
    const azureUrl = `${AZURE_URL}${fileName}?${SAS_TOKEN}`;

    const file = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const fileArrayBuffer = Uint8Array.from(atob(file), c => c.charCodeAt(0));

    setDocument(fileName);

    try {
      await axios.put(azureUrl, fileArrayBuffer, { 
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

  const recognizeText = async (url) => {
    const requestBody = {
      image_url: AZURE_URL+document // 전달된 url을 requestBody의 image_url에 설정
    };
  
    try {
      const response = await axios.post('http://20.39.190.194/ocr/', requestBody);
      return response.data;
    } catch (error) {
      console.error('Error recognizing text:', error);
      throw error;
    }
  };

  const handleOCR = async () => {
    if (selectedImage) {
      setLoading(true);
      try {
        const result = await recognizeText(document);
        setOcrResult(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

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
