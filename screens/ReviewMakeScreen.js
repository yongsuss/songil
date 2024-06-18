// 리뷰 적는 화면


import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { AppContext } from '../AppContext';
import { useRoute } from '@react-navigation/native';

function ReviewMakeScreen({ navigation }) {
    const { apiUrl, id, azureUrl, reviewToken } = useContext(AppContext);
    //const [boardId, setBoardId] = useState(0);
    const route = useRoute();
    const boardId = route.params?.boardId;
    const [reviewText, setReviewText] = useState('');
    const [reviewImageFile, setReviewImageFile] = useState('');
    const [reviewImageFileUri, setReviewImageFileUri] = useState('');

    const handleChoosePhoto = async () => {//파일에서 사진 선택
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();//파일 접근 권한
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
          setReviewImageFile(fileName);
          setReviewImageFileUri(fileUri);
        }
      };

    const handleSubmit = async () => {
        if (!reviewText.trim() || !reviewImageFileUri) {
            Alert.alert("입력 오류", "후기 내용과 이미지를 모두 입력해주세요.");
            return;
        }

        try {//Azure Storage에 올리기
            const fileContent = await FileSystem.readAsStringAsync(reviewImageFileUri, { encoding: FileSystem.EncodingType.Base64 });
            const fileArrayBuffer = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));
            await axios.put(`${azureUrl}/review/${reviewImageFile}?${reviewToken}`, fileArrayBuffer, {
              headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': 'image/jpeg'
              }
            });
          } catch (error) {
            console.error('Error uploading file:', error);
          }

        
            const postData = {
                board_id: boardId,
                id: id, // 이 부분은 실제 사용 환경에 맞게 조정 필요
                text: reviewText,
                image: reviewImageFile
            };

            console.log(postData);
        try {
            await axios.post(`${apiUrl}/reviews/add/`, postData)
            .then(response => {
                Alert.alert("성공", "후기가 성공적으로 추가되었습니다.");
                navigation.goBack();
                console.log(postData);
            })
            .catch(error => {
                
                  //console.error('POST 요청 실패:', error);
                  Alert.alert("생성 실패", "아직 물품을 받지 못하셨습니다.");
                console.log(postData);
            });
        } catch (error) {
            Alert.alert("오류", "후기 추가 중 오류 발생: " + error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.form}>
                <TextInput
                    style={styles.textArea}
                    placeholder="후기 내용"
                    value={reviewText}
                    onChangeText={setReviewText}
                    multiline
                />
                {reviewImageFileUri && <Image source={{ uri : reviewImageFileUri}} style={styles.image}/>}
                <TouchableOpacity onPress={handleChoosePhoto} style={[styles.button, {marginBottom: 10}]}>
                    <Text style={styles.buttonText}>이미지 가져오기(선택)</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[styles.button, (!reviewText.trim() || !reviewImageFileUri) ? styles.buttonDisabled : {}]}
                    disabled={!reviewText.trim() || !reviewImageFileUri}>
                    <Text style={styles.buttonText}>후기 추가</Text>
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
        marginBottom: 12,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16
    },
    textArea: {
        backgroundColor: '#ffffff',
        marginBottom: 12,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        height: 200,
        textAlignVertical: 'top'
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10
    },
    button: {
        backgroundColor: '#a0a0a0',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonDisabled: {
        backgroundColor: '#ccc' // Light grey color to indicate disabled state
    }
});

export default ReviewMakeScreen;


