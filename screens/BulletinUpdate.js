// 게시글 수정화면
import React, { useState, useContext, useRef } from 'react';
import {
    View, Text, TextInput, ScrollView, StyleSheet,
    TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Image
} from 'react-native';
import { AppContext } from '../AppContext';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

function BulletinUpdate({ route, navigation }) {
    const { post } = route.params;
    const { apiUrl } = useContext(AppContext);
    const [title, setTitle] = useState(post.title);
    const [text, setText] = useState(post.text);
    const [item, setItem] = useState(post.item);
    const [boardImageFile, setBoardImageFile] = useState(post.image);
    const [boardImageFileUri, setBoardImageFileUri] = useState('');
    const scrollViewRef = useRef();

    const validateFields = () => {
        if (!title.trim() || !text.trim() || !item.trim()) {
            Alert.alert("오류", "제목, 내용 및 필요한 물품은 필수 입력 사항입니다.");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }

        const updatedData = {
            title: title,
            text: text,
            item: item,
            image: boardImageFile
        };

        try {
            await axios.put(`${apiUrl}/board/${post.board_id}`, updatedData);
            Alert.alert("성공", "게시글이 성공적으로 수정되었습니다.");
            navigation.goBack();
        } catch (error) {
            console.error('게시글 수정 실패:', error);
            Alert.alert("오류", "게시글 수정 중 오류 발생: " + error.message);
        }
    };

    const handleChoosePhoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("오류", "사진 접근 권한이 필요합니다!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.cancelled) {
            const fileUri = result.uri;
            const fileName = fileUri.split('/').pop();
            setBoardImageFile(fileName);
            setBoardImageFileUri(fileUri);
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
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
            >
                <TextInput
                    style={styles.input}
                    placeholder="제목"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="필요한 물품"
                    value={item}
                    onChangeText={setItem}
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="내용"
                    value={text}
                    onChangeText={setText}
                    multiline
                />
                {boardImageFileUri && (
                    <Image source={{ uri: boardImageFileUri }} style={{ width: '100%', height: 200, resizeMode: 'cover', marginBottom: 10 }} />
                )}
                <TouchableOpacity onPress={handleChoosePhoto} style={styles.button}>
                    <Text style={styles.buttonText}>이미지 수정하기</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>게시글 수정</Text>
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
        marginBottom: 10
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
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default BulletinUpdate;