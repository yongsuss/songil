// 리뷰 적는 화면
import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AppContext } from '../AppContext';

function ReviewMakeScreen({ navigation }) {
    const { apiUrl, id, azureUrl, reviewToken } = useContext(AppContext);
    const [boardId, setBoardId] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewImage, setReviewImage] = useState('');
    const [reviewImageUri, setReviewImageUri] = useState('');

    const handleChoosePhoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert("권한 오류", "사진에 접근하려면 권한이 필요합니다.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.cancelled) {
            setReviewImageUri(result.uri);
            setReviewImage(result.uri.split('/').pop());
        }
    };

    const handleSubmit = async () => {
        if (!reviewText.trim() || !boardId) {
            Alert.alert("입력 오류", "모든 필드를 채워주세요.");
            return;
        }

        try {
            const postData = {
                board_id: boardId,
                id: "unique-string-identifier", // 이 부분은 실제 사용 환경에 맞게 조정 필요
                text: reviewText,
                image: reviewImage
            };

            await axios.post(`${apiUrl}/reviews/add/`, postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                Alert.alert("성공", "리뷰가 성공적으로 추가되었습니다.");
                navigation.goBack();
            })
            .catch(error => {
                console.error('POST 요청 실패:', error);
                Alert.alert("생성 실패", "리뷰 추가 실패");
            });
        } catch (error) {
            Alert.alert("오류", "리뷰 추가 중 오류 발생: " + error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="게시판 ID"
                    value={String(boardId)}
                    onChangeText={text => setBoardId(Number(text))}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="리뷰 내용"
                    value={reviewText}
                    onChangeText={setReviewText}
                    multiline
                />
                {reviewImageUri && <Image source={{ uri: reviewImageUri }} style={styles.image} />}
                <TouchableOpacity onPress={handleChoosePhoto} style={styles.button}>
                    <Text style={styles.buttonText}>이미지 선택</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>리뷰 추가</Text>
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
    }
});

export default ReviewMakeScreen;

