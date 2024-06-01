import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const SAS_TOKEN = "sp=racwdl&st=2024-05-28T15:49:49Z&se=2024-06-30T23:49:49Z&sv=2022-11-02&sr=c&sig=q%2BwvZ6cJc6m7HnmAA%2FgTXn7lBsD1vdVpgZiqLSx4OuE%3D";
const AZURE_URL = "https://songilstorage.blob.core.windows.net/songil/";

const VulnerableCertificationScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [document, setDocument] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const choosePhoto = async () => {
    // 권한 요청
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "We need permission to access your photos!");
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = result.assets[0].uri;
      console.log(fileUri);
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

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      const fileUri = result.assets[0].uri;
      setSelectedImage(fileUri);
      await uploadToAzure(fileUri);
    }
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
      images: [
        {
          format: "jpeg",
          name: "medium",
          data: null,
          //url: "https://songilstorage.blob.core.windows.net/songil/"+ url
          url: "https://songilstorage.blob.core.windows.net/songil/2bd1b7ab-9fe3-4784-902b-61c1eb2a1000.jpeg"
        }
      ],
      lang: "ko",
      requestId: "string",
      resultType: "string",
      timestamp: new Date().toISOString(),
      version: "V1"
    };

    console.log(requestBody);

    try {
      const response = await axios.post(CLOVA_OCR_URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          //'X-OCR-SECRET': API_KEY,
          'X-OCR-SECRET': "cVJaU1NwSld1eE5SVXh3cHptUmxwQnF0bmJoSENhYmk=",
        },
      });
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
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          <Button title="인증 요청" onPress={handleOCR} />
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
